from collections import Counter
from bs4 import BeautifulSoup
from datetime import datetime
from dataclasses import dataclass, asdict
import feedparser
import frontmatter
import inspect
import json
import os
import requests
from time import mktime
from typing import List

DEFAULT_IMAGE = 'img/default-blog-image.webp'
IMAGE_OVERRIDES = {
    'https://medium.com/@dstarner/exploring-snug-harbor-60f49bc40786': 'https://miro.medium.com/max/4000/1*m60t2-xheDbpcutjclU4lg.jpeg'
}

API_KEY = os.getenv('DEV_TO_TOKEN')


@dataclass
class Article:

    source: str
    title: str
    id: str
    description: str
    published: bool
    page_views_count: int
    tag_list: List[str]
    url: str
    published_timestamp: str
    cover_image: str
    published_dt: datetime = None

    def __str__(self) -> str:
        return self.title

    @classmethod
    def from_dict(cls, env):      
        obj = cls(source='dev', **{
            k: v for k, v in env.items() 
            if k in inspect.signature(cls).parameters
        })
        if not obj.cover_image:
            obj.cover_image = DEFAULT_IMAGE
        if not obj.published_dt:
            obj.published_dt = datetime.strptime(obj.published_timestamp.split('T')[0], '%Y-%m-%d')
        return obj
    
    def to_data(self):
        return {
            'meta': {
                'title': self.title,
                'description': self.description,
                'tags': self.tag_list,
                'date': self.published_dt.strftime('%Y-%m-%d'),
                'coverSrc': self.cover_image,
            },
            'slug': self.url,
        }


def get_local_posts():
    post_directory = 'src/posts'
    post_paths = [f for f in os.listdir(post_directory) if os.path.isfile(os.path.join(post_directory, f)) and f.endswith('.mdx')]
    
    def post_to_article(post_file) -> Article:
        post_path = os.path.join(post_directory, post_file)
        p = frontmatter.load(post_path).metadata
        slug = os.path.basename(post_path).rsplit(".", 1)[0]
        return Article(
            source='local',
            title=p['title'],
            id=slug,
            url=f'/posts/{slug}',
            page_views_count='',
            description={p['description']},
            published=True,
            tag_list=p['tags'],
            cover_image=p.get('coverSrc', DEFAULT_IMAGE),
            published_timestamp='',
            published_dt=datetime.strptime(p['date'], '%Y-%m-%d')
        )
    posts = [post_to_article(path) for path in post_paths]
    return posts


def get_dev_to_articles() -> List[Article]:
    dev_resp = requests.get('https://dev.to/api/articles/me', headers={'api-key': API_KEY}).json()
    dev_articles = [Article.from_dict(data) for data in dev_resp if data['published']]
    return dev_articles


def get_medium_articles() -> List[Article]:
    med_resp = feedparser.parse('https://medium.com/feed/@dstarner')
    med_articles = [Article(
        source='medium',
        title=p['title'],
        id=p['id'],
        url=p['link'].split('?')[0],
        page_views_count='',
        description='',
        published=p['published'],
        tag_list=[t['term'] for t in p['tags']],
        cover_image=DEFAULT_IMAGE,
        published_timestamp='',
        published_dt=datetime.fromtimestamp(mktime(p['published_parsed']))
    ) for p in med_resp.entries]

    for article in med_articles:
        if article.url in IMAGE_OVERRIDES:
            article.cover_image = IMAGE_OVERRIDES[article.url]
            continue
        resp = requests.get(article.url)
        if resp.status_code != 200:
            print(f'could not load {article.url}')
            continue
        soup = BeautifulSoup(resp.text, 'html.parser').find('article')
        img = soup.find('img', {'role': 'presentation'})
        if img:
            article.cover_image = img['src']
    return med_articles


def get_posts():
    local_posts = get_local_posts()

    dev_posts = get_dev_to_articles()
    medium_posts = get_medium_articles()

    post_articles = local_posts + dev_posts + medium_posts
    post_map = {}

    for article in post_articles:
        post = post_map.get(article.title, {
            'meta': {
                'title': article.title,
                'description': article.description,
                'date': article.published_dt.strftime('%Y-%m-%d'),
                'coverSrc': article.cover_image,
                'tags': set(article.tag_list),
                'extLinks': dict(),
            },
            'slug': article.url,
        })

        if post['slug'] != article.url:
            post['meta']['tags'] = post['meta']['tags'].union(set(article.tag_list))
        
        if not article.url.startswith('/'):
            post['meta']['extLinks'][article.source] = article.url

        post_map[article.title] = post

    return sorted(
        list(post_map.values()),
        key=lambda a: datetime.strptime(a['meta']['date'], '%Y-%m-%d'), reverse=True,
    )

posts = get_posts()

tag_counter = Counter()
for post in posts:
    tag_counter.update(post['meta']['tags'])

import pprint
pprint.pprint(tag_counter.most_common())

def set_default(obj):
    if isinstance(obj, set):
        return list(obj)
    raise TypeError

data = json.dumps(posts, indent=2, default=set_default)

with open('src/posts.json', 'w') as f:
    f.write(data)
