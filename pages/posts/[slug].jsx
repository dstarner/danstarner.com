import Box from '@mui/material/Box'
import { grey } from '@mui/material/colors';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import fs from 'fs'
import matter from 'gray-matter'
import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import SyntaxHighlighter from 'react-syntax-highlighter'


const PostPage = ({ frontMatter: { title, description, coverSrc, tags }, mdxSource }) => {
  return (
    <Container maxWidth="md">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box id="header">
        <CardMedia
          component="img" image={coverSrc || '/img/default-blog-image.webp'}
          alt={title}
          sx={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, boxShadow: 3 }}

        />
        <Typography variant='h1'>{title}</Typography>
        <Box mt={1}>
            {tags.map(tag => (
              <Chip label={`#${tag}`} key={tag} size="small" sx={{ mr: .5 }} />
            ))}
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
        pre: (props) => console.log(props) || <SyntaxHighlighter>{props.children.props.children.trim()}</SyntaxHighlighter> || (
          <Box sx={{ background: grey[200], width: '100%', overflowX: 'scroll' }}>
            <Typography variant='inherit' component='pre' sx={{ p: 2 }} {...props} />
          </Box>
        ),
        SyntaxHighlighter
      }} />
    </Container>
  )
}


export const getStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'src/posts')
  const files = fs.readdirSync(postsDirectory)
  const paths = files.map(filename => ({
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
      mdxSource
    }
  }
}

export default PostPage