import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography';


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
                            <FontAwesomeIcon icon={link.icon} />
                        </IconButton>
                    </Tooltip>
                ))}
            </Box>
            <Typography textAlign="center" component='p' variant="caption">Made by Dan</Typography>
        </Box>
    );
}

export default Footer;