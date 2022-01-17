import { faDev, faMedium } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip';
import { DateTime } from 'luxon';


function BlogListItem({ meta, slug, divider }) {
  return (
    <ListItem href={slug} divider={divider}>
      <ListItemText
        primary={meta.title} primaryTypographyProps={{
          component: Link, href: slug, color: 'inherit', underline: 'hover',
        }}
        secondary={DateTime.fromISO(meta.date).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}
      />
      <Box sx={{ ml: 1, display: 'flex', flexDirection: 'row' }}>
        {Object.keys(meta.extLinks || {}).map(key =>
          <Tooltip key={key} title={`Read on ${{dev: 'Dev.to', medium: 'Medium', hackernoon: 'Hackernoon'}[key]}`}>
            <IconButton component='a' href={meta.extLinks[key]}>
              {{
                dev: <FontAwesomeIcon size='sm' icon={faDev} />,
                medium: <FontAwesomeIcon size='sm' icon={faMedium} />,
              }[key]}
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </ListItem>
  );
}

export default BlogListItem;