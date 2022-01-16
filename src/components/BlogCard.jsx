import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
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
        <Typography gutterBottom variant="h5">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
        <Box mt={1}>
            {post.tags.map(tag => (
              <Chip label={`#${tag}`} key={tag} size="small" sx={{ mr: .5 }} />
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