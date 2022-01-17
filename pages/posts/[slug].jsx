import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import fs from 'fs'
import matter from 'gray-matter'
import { DateTime } from 'luxon';
import { Tweet, Gist, Instagram, Strava, Twitch } from 'mdx-embed';
import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import SyntaxHighlighter from 'react-syntax-highlighter'
import Footer from 'src/components/Footer';
import { socialLinks } from 'src/social';


const extLinkName = {
  dev: 'Dev.to',
  hackernoon: 'Hackernoon',
  medium: 'Medium',
}


const PostPage = ({ frontMatter: { title, description, coverSrc, tags, date, extLinks={}, }, extLinkMap, mdxSource }) => {
  const dateStr = DateTime.fromISO(date).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <Container maxWidth="md">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta name="twitter:title" key="twitter:title" content={title} />
        <meta name="twitter:description" key="twitter:description" content={description} />
        <meta property="og:title" key="og:title" content={title} />
        <meta property="og:description" key="og:description" content={description} />
      </Head>
      <Box id="header">
        <CardMedia
          component="img" image={coverSrc || '/img/default-blog-image.webp'}
          alt={title}
          sx={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, boxShadow: 3 }}

        />
        <Typography variant="overline" sx={{ fontSize: 16 }} component='div' textAlign="center">{dateStr}</Typography>
        <Typography variant='h1'>{title}</Typography>
        <Box my={1}>
            {tags.map(tag => (
              <Chip component='a' href={`/posts/tags/${tag}`} clickable label={`#${tag}`} key={tag} size="small" sx={{ mr: .5 }} />
            ))}
            {['dev', 'hackernoon', 'medium'].filter(s => Boolean(extLinks[s])).map(s => (
              <Chip 
                component='a' href={extLinks[s]} clickable label={`Read on ${extLinkMap[s]}`}
                key={s} size="small" sx={{ mr: .5 }} variant='outlined'
              />
            ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button component='a' href='/' startIcon={<ChevronLeftIcon />}>Back Home</Button>
        </Box>
      </Box>
      <Divider sx={{ width: "80%", display: "block", margin: "2rem auto" }} />
      <MDXRemote {...mdxSource} components={{
        a: Link,
        h1: (props) => <Typography variant='h1' sx={{ mt: 3.5, fontWeight: 400 }} {...props} />,
        h2: (props) => <Typography variant='h2' sx={{ mt: 3.5, fontWeight: 400 }} {...props} />,
        h3: (props) => <Typography variant='h3' sx={{ mt: 3.5, fontWeight: 400 }} {...props} />,
        h4: (props) => <Typography variant='h4' sx={{ mt: 3.5, fontWeight: 400 }} {...props} />,
        h5: (props) => <Typography variant='h5' sx={{ mt: 3.5, fontWeight: 400 }} {...props} />,
        h6: (props) => <Typography variant='h6' sx={{ mt: 3.5, fontWeight: 400 }} {...props} />,
        hr: () => <Divider sx={{ width: '50%', display: "block", margin: "24px auto" }} />,
        // code: (props) => <Typography variant='overline' component='code' {...props} />,
        pre: (props) => <SyntaxHighlighter>{props.children.props.children.trim()}</SyntaxHighlighter>,
        // Custom components
        Gist,
        Instagram,
        Strava,
        SyntaxHighlighter,
        Tweet,
        Twitch,
      }} />
      <Footer links={socialLinks} />
    </Container>
  )
}


export const getStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'src/posts')
  const files = fs.readdirSync(postsDirectory)
  const paths = files.filter(f => f.endsWith('.mdx')).map(filename => ({
    params: {
      slug: filename.replace('.mdx', '')
    }
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const markdownWithMeta = fs.readFileSync(path.join(postsDirectory, slug + '.mdx'), 'utf-8')
  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)
  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
      extLinkMap: extLinkName,
    }
  }
}

export default PostPage