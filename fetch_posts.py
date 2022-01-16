from bs4 import BeautifulSoup
from datetime import datetime
from dataclasses import dataclass, asdict
import feedparser
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
        obj = cls(**{
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


def get_articles():
    dev_resp = requests.get('https://dev.to/api/articles/me', headers={'api-key': API_KEY}).json()
    dev_articles = [Article.from_dict(data) for data in dev_resp if data['published']]

    med_resp = feedparser.parse('https://medium.com/feed/@dstarner')
    med_articles = [Article(
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

    return sorted(
        dev_articles + med_articles,
        key=lambda a: a.published_dt, reverse=True,
    )

articles = get_articles()
article_data = [article.to_data() for article in articles]
data = json.dumps(article_data, indent=2)

with open('src/extposts.json', 'w') as f:
    f.write(data)
