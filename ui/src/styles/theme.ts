import { blue, green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
    palette: {
        // mode: "dark", // maybe implement later
        primary: {
            light: blue[300],
            main: blue[500],
            dark: blue[700],
        },
        secondary: {
            light: blue[300],
            main: green[500],
            dark: blue[700],
        },
    },
});