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
            main: '#089cd2',
        },
        error: {
            main: red.A400,
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
