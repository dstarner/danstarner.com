import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ArticleIcon from '@mui/icons-material/Article';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import React from 'react';
import BlogList from 'src/components/BlogList'
import Footer from 'src/components/Footer';
import { socialLinks } from 'src/social';
import posts from 'src/posts';


export default function Home({ posts }) {

  return (
    <Container maxWidth="md">
      <Head>
        <title>Dan Starner</title>
        <meta name="description" content="My Head is in the Clouds 24/7" />
      </Head>

      <Box id="header" mt={10}>
        <Box id="title">
          <Avatar src='/img/profile.webp' alt='Dan Starner' sx={{ width: 150, height: 150, mr: 2, border: 2, borderColor: 'primary.main' }}>DS</Avatar>
          <Typography variant='h1' textAlign='center'>
            Hi, I&apos;m <Typography component='span' variant='inherit' color='primary'>Dan</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Tooltip title="I code">
                <div>💻</div>
              </Tooltip>
              <Tooltip title="I play iRacing">
                <div>🏎</div>
              </Tooltip>
              <Tooltip title="I bike">
                <div>🚴🏼‍♂️</div>
              </Tooltip>
                
            </Box>
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ width: "80%", display: "block", margin: "16px auto" }} />
      <Box my={2}>
        <Grid container spacing={4}>
          <Grid xs={12} sm={6} item>
            <Typography textAlign='justify'>
              Hi there! 👋🏼  I&apos;m someone who&apos;s just trying to get through this crazy world while
              having some fun and learning a thing or two along the way. I&apos;m a software engineer by
              profession, but my interests and goals are much larger than just code. I want to make
              a positive impact in the world, and code is just one avenue that I use to achieve that.
              Outside of work, I enjoy hiking 🥾,&nbsp;
              <Typography component='a' color='primary' href="https://www.strava.com/athletes/41276691">road cycling 🚴‍♂️</Typography>
              , and&nbsp;
              <Typography component='a' color='primary' href="https://alumiboti5590.com/">mentoring FIRST Robotics 🤖</Typography> .
            </Typography>
            <Box my={2} sx={{ display: 'flex', justifyContent: "center" }}>
              <Button
                component='a' size="small" href='https://newsletter.danstarner.com'
                variant="outlined" sx={{ mr: 1 }} startIcon={<MailIcon />}
              >
                SUBSCRIBE
              </Button>
              <Button
                component='a' size="small" href='https://newsletter.danstarner.com/archive'
                startIcon={<ArticleIcon />} variant="contained"
              >
                READ NEWSLETTER
              </Button>
            </Box>
          </Grid>
          <Grid xs={12} sm={6} item>
            <List disablePadding>
              {socialLinks.map((link, idx) => (
                <ListItem disablePadding key={idx} sx={{
                  py: 1, borderBottom: 1, borderBottomColor: 'common.black',
                  '&:last-child': { borderBottom: 0 }
                }}>
                  <ListItemIcon sx={{ minWidth: 30, maxWidth: "1em" }}>
                    {React.isValidElement(link.icon) ? React.cloneElement(link.icon, { fontSize: '20px', sx: { marginLeft: -.1 } }) : (
                      <FontAwesomeIcon size='sm' style={{ maxWidth: 30 }} icon={link.icon} />
                    )}
                    
                  </ListItemIcon>
                  <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 500 }}>{link.title}</Typography>
                    <Link sx={{ fontWeight: 500, color: 'primary.main', }} underline='none' href={link.href}>{link.username}</Link>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>

      <BlogList title="My Writing" posts={posts} />

      <Footer links={socialLinks} />
    </Container>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      posts
    }
  }
}