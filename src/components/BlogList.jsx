import ListIcon from '@mui/icons-material/List';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';

import BlogCard from './BlogCard';
import BlogListItem from './BlogListItem';


const localStorageKey = "blog-list-view";


function BlogList({ posts, title }) {
  const [viewType, setRawViewType] = useState("comfort");
  function setViewType(_, value) {
    const newValue = value || viewType;
    window.localStorage.setItem(localStorageKey, newValue);
    setRawViewType(newValue);
  }

  useEffect(function() {
    const value = window.localStorage.getItem(localStorageKey);
    if (value) {
      setRawViewType(value);
    }
  }, [])

  return (
    <Box sx={{ my: 3 }}>
      <CardHeader
        title={title} titleTypographyProps={{ variant: 'h4' }} sx={{ py: 1, px: 0 }}
        action={(
          <ToggleButtonGroup
            value={viewType} onChange={setViewType}
            exclusive size="small" aria-label='determine blog list layout'
          >
            <ToggleButton value="dense" aria-label="dense">
              <ListIcon />
            </ToggleButton>
            <ToggleButton value="comfort" aria-label="comfortable">
              <DashboardIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      />
      {viewType === 'comfort' ? (
        <Grid container spacing={2}>
          {posts.map(({ meta, slug }, idx) => (
            <Grid xs={12} sm={6} key={idx} item>
              <BlogCard post={meta} slug={slug} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <List>
          {posts.map(({ meta, slug }, idx) => (
            <BlogListItem divider={idx !== posts.length - 1} meta={meta} slug={slug} key={idx} />
          ))}
        </List>
      )}
    </Box>
  );
}

export default BlogList;