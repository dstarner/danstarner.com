import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import fs from 'fs'
import matter from 'gray-matter'
import { DateTime } from 'luxon';
import Head from 'next/head'
import path from 'path'
import BlogCard from '../../../src/components/BlogCard';
import Footer from "../../../src/components/Footer";
import { socialLinks } from "../../../src/social";
import externalPosts from '../../../src/extposts';


function TagPage({ tag, posts }) {
  const title = tag;
  const description = `Posts about ${tag}`;
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />

        <meta name="twitter:title" key="twitter:title" content={title} />
        <meta name="twitter:description" key="twitter:description" content={description} />
        <meta property="og:title" key="og:title" content={title} />
        <meta property="og:description" key="og:description" content={description} />
      </Head>
      <Box id="header" mt={10}>
        <Typography variant='h1' textAlign='center'>#{title}</Typography>
        <Typography textAlign='center'>Posts about <Typography color='primary' component='span'>#{title}</Typography> things</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
          <Button component='a' href='/' startIcon={<ChevronLeftIcon />}>Back Home</Button>
        </Box>
      </Box>
      <Divider sx={{ width: "80%", display: "block", margin: "2rem auto" }} />
      <Box sx={{ my: 2 }}>
        <Grid container spacing={2}>
          {posts.map(({ meta, slug }, idx) => (
            <Grid xs={12} sm={6} key={idx} item>
              <BlogCard post={meta} slug={slug} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer links={socialLinks} />
    </Container>
  );
}

export const getStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'src/posts')
  const files = fs.readdirSync(postsDirectory)

  const externalTags = externalPosts.reduce((tags, post) => {
    const newTags = { ...tags };
    post.meta.tags.forEach(t => newTags[t] = true);
    return newTags;
  }, {});

  const tags = Object.keys(files.reduce((tags, filename) => {
    const markdownWithMeta = fs.readFileSync(path.join(postsDirectory, filename), 'utf-8')
    const { data: frontMatter } = matter(markdownWithMeta)
    const postTags = frontMatter.tags || [];
    const newTags = { ...tags };
    postTags.forEach(t => newTags[t] = true);
    return newTags;
  }, externalTags));

  return {
    paths: tags.map(t => `/posts/tags/${t}`),
    fallback: false
  }
}

export const getStaticProps = async ({ params: { tag } }) => {
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const files = fs.readdirSync(postsDirectory)

  const remotePosts = externalPosts.filter(post => post.meta.tags.includes(tag));

  const posts = files.reduce((paths, filename) => {
    const slug = filename.replace('.mdx', '');
    const markdownWithMeta = fs.readFileSync(path.join(postsDirectory, filename), 'utf-8')
    const { data: frontMatter } = matter(markdownWithMeta)
    if (!frontMatter.tags || !frontMatter.tags.includes(tag)) {
      return paths;
    }
    return [...paths, { meta: frontMatter, slug }];
  }, remotePosts).sort((a, b) => DateTime.fromISO(a.meta.date).toMillis() - DateTime.fromISO(b.meta.date).toMillis()).reverse();


  return {
    props: {
      posts,
      tag
    }
  }
}

export default TagPage;