import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function BlogCard({ post, href }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="160"
        image={post.coverSrc || '/img/default-blog-image.webp'}
        alt={post.title}
      />
      <CardContent>
        <Link gutterBottom href={href} underline="hover" variant="h5">
          {post.title}
        </Link>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
        <Box mt={1}>
            {post.tags.map(tag => (
              <Chip label={`#${tag}`} component='a' href={`/posts/tags/${tag}`} clickable key={tag} size="small" sx={{ mr: .5 }} />
            ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}