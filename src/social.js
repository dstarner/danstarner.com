import { faDev, faGithub, faLinkedin, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
import ArticleIcon from '@mui/icons-material/Article';

export const socialLinks = [
    {
        icon: <ArticleIcon />,
        title: 'Resume',
        href: '/Dan_Starner_Resume_Fall_2021.pdf',
        username: 'View Resume',
    },
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