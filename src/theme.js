import {
    createTheme, responsiveFontSizes
} from '@mui/material/styles';
import {
    red
} from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#007dbb',
        },
    },
    typography: {
        h1: {
            fontSize: "5rem",
            fontWeight: 400,
        },
        fontSize: 14,
    }
});

export default responsiveFontSizes(theme);
