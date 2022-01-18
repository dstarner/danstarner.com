import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';


const extLinkName = {
  dev: 'Dev.to',
  hackernoon: 'Hackernoon',
  medium: 'Medium',
}


export default function BlogCard({ post, slug }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <CardMedia
        component="img"
        height="160"
        image={post.coverSrc || '/img/default-blog-image.webp'}
        alt={post.title}
      />
      <Box sx={{ background: '#FFF', position: 'absolute', borderBottomRightRadius: 5, py: .3, px: 1 }}>
        <Typography variant='caption'>
          {DateTime.fromISO(post.date).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}
        </Typography>
      </Box>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Link gutterBottom href={slug} underline="hover" color="inherit" variant="h5">
          {post.title}
        </Link>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          {post.description || "There is no description, so I guess you will just have to trust it's a good one!"}
        </Typography>
        <Box mt={1}>
            {post.tags.map(tag => (
              <Chip 
                label={`#${tag}`} component='a' href={`/posts/tags/${tag}`}
                clickable key={tag} size="small" sx={{ mr: .5 }}
              />
            ))}
        </Box>
      </CardContent>
      {post.extLinks && (
        <CardActions>
          {['dev', 'hackernoon', 'medium'].filter(s => Boolean(post.extLinks[s])).map(s => (
            <Button component='a' key={s} href={post.extLinks[s]} size="small">{extLinkName[s]}</Button>

          ))}
        </CardActions>
      )}
    </Card>
  );
}