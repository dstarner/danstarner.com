import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import BlogCard from '../../../src/components/BlogCard';
import Footer from "../../../src/components/Footer";
import { socialLinks } from "../../../src/social";
import posts from '../../../src/posts';


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
  const tags = posts.reduce((tags, post) => {
    const newTags = { ...tags };
    post.meta.tags.forEach(t => newTags[t] = true);
    return newTags;
  }, {});

  return {
    paths: Object.keys(tags).map(t => `/posts/tags/${t}`),
    fallback: false
  }
}

export const getStaticProps = async ({ params: { tag } }) => {
  return {
    props: {
      posts: posts.filter(post => post.meta.tags.includes(tag)),
      tag
    }
  }
}

export default TagPage;