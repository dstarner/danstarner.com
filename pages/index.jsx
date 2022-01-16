import { faDev, faGithub, faLinkedin, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
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
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import fs from 'fs'
import matter from 'gray-matter'
import Head from 'next/head'
import path from "path"
import BlogCard from '../src/components/BlogCard'


const links = [
  {
    icon: faDev,
    title: 'Dev Profile',
    href: 'https://dev.to/dan_starner',
    username: '@dan_starner',
  },
  {
    icon: faGithub,
    title: 'GitHub',
    href: 'https://github.com/dstarner/',
    username: '@dstarner',
  },
  {
    icon: faLinkedin,
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/danstarner/',
    username: 'danstarner',
  },
  {
    icon: faStackOverflow,
    title: 'Stack Overflow',
    href: 'https://stackoverflow.com/users/17758344/dan-starner',
    username: '@dan_starner'
  },
  {
    icon: faTwitter,
    title: 'Twitter',
    href: 'https://twitter.com/dan_starner/',
    username: '@dan_starner'
  },
];


export default function Home({ posts }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Container maxWidth="md">
      <Head>
        <title>Dan Starner</title>
        <meta name="description" content="My Head is in the Clouds 24/7" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box id="header" mt={10}>
        <Box id="title" sx={{ display: "flex", justifyContent: "center", alignItems: isMobile ? "center" : "flex-end", flexDirection: isMobile ? "column" : "row" }}>
          <Avatar src={'/img/profile.webp'} sx={{ width: 150, height: 150, mr: 2, border: 2, borderColor: 'primary.main' }}>DS</Avatar>
          <Typography variant='h1' textAlign='center'>
            Hi I&apos;m <Typography component='span' variant='inherit' color='primary'>Dan</Typography>
            <Typography component='span' display="block" textAlign={isMobile ? "center" : "left"} variant="h2">💻 🚴🏼‍♂️ 🏎</Typography>
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
            </Typography>
            <Box my={1} sx={{ display: 'flex', justifyContent: "center" }}>
              <Button
                component='a' href='https://buttondown.email/dan_starner'
                startIcon={<MailIcon />} variant="outlined" sx={{ mr: 1 }}
              >
                Subscribe
              </Button>
              <Button
                component='a' href='/Dan_Starner_Resume_Fall_2021.pdf'
                startIcon={<ArticleIcon />} variant="contained"
              >
                Resume
              </Button>
            </Box>
          </Grid>
          <Grid xs={12} sm={6} item>
            <List disablePadding>
              {links.map((link, idx) => (
                <ListItem disablePadding key={idx} sx={{
                  py: 1, borderBottom: 1, borderBottomColor: 'common.black',
                  '&:last-child': { borderBottom: 0 }
                }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <FontAwesomeIcon width="1rem" icon={link.icon} />
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

      <Box sx={{ my: 2 }}>
        <Typography variant="h4" mb={1}>My Writing</Typography>
        <Grid container spacing={2}>
          {posts.map(({ meta, slug }, idx) => (
            <Grid xs={12} sm={6} key={idx} item>
              <BlogCard post={meta} href={`/posts/${slug}`} />
            </Grid>
          ))}
        </Grid>
      </Box>


      <Box
        component='footer' sx={{
          justifyContent: 'center', alignItems: 'center',
          display: 'flex', flex: 1, my: 2, py: 2, paddingX: 2,
          borderTop: "1px solid #eaeaea",
        }}
      >
        {links.map((link, idx) => (
          <Tooltip title={link.title} key={idx}>
            <IconButton component='a' href={link.href} sx={{ mr: .5 }}>
              <FontAwesomeIcon icon={link.icon} />
            </IconButton>
          </Tooltip>
        ))}
        
      </Box>
    </Container>
  )
}

export const getStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join(postsDirectory, filename), 'utf-8')
    const { data: meta } = matter(markdownWithMeta)
    return {
      meta,
      slug: filename.split('.')[0]
    }
  })
  return {
    props: {
      posts,
    }
  }
}