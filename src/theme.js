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
            fontSize: "3.5rem",
            fontWeight: 400,
        },
        h2: {
            fontSize: "3rem",
            fontWeight: 400,
        },
        h3: {
            fontSize: "2rem",
            fontWeight: 400,
        },
        h4: {
            fontSize: "1.40rem",
            fontWeight: 400,
        },
        h5: {
            fontSize: "1.15rem",
            fontWeight: 400,
        },
        fontSize: 14,
    }
});

export default responsiveFontSizes(theme);
