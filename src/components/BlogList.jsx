import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import BlogCard from './BlogCard';

function BlogList({ posts, title }) {
  return (
    <Box sx={{ my: 2 }}>
      <CardHeader title={title} titleTypographyProps={{ variant: 'h4' }} sx={{ py: 1, px: 0 }}/>
      <Grid container spacing={2}>
        {posts.map(({ meta, slug }, idx) => (
          <Grid xs={12} sm={6} key={idx} item>
            <BlogCard post={meta} slug={slug} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BlogList;