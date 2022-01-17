import Link from '@mui/material/Link'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { DateTime } from 'luxon';


function BlogListItem({ meta, slug, divider }) {
  return (
    <ListItem divider={divider}>
      <ListItemText
        primary={meta.title}
        primaryTypographyProps={{
          component: Link, href: slug, underline: 'hover', color: 'inherit'
        }}
        secondary={DateTime.fromISO(meta.date).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}
      />
    </ListItem>
  );
}

export default BlogListItem;