import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography';
import React from 'react';


function Footer({ links }) {
    return (
        <Box mb={15}>
            <Box
                component='footer' sx={{
                    justifyContent: 'center', alignItems: 'center',
                    display: 'flex', flex: 1, mt: 2, py: 2, paddingX: 2,
                    borderTop: "1px solid #eaeaea",
                }}
            >
                {links.map((link, idx) => (
                    <Tooltip title={link.title} key={idx}>
                        <IconButton component='a' href={link.href} sx={{ mr: .5 }}>
                            {React.isValidElement(link.icon) ? link.icon : (
                                <FontAwesomeIcon icon={link.icon} />
                            )}
                        </IconButton>
                    </Tooltip>
                ))}
            </Box>
            <Typography textAlign="center" component='p' variant="caption">
                Made by Dan using <Link href='https://mui.com/'>MUI</Link> and <Link href='https://nextjs.org/'>Nextjs</Link>
            </Typography>
        </Box>
    );
}

export default Footer;