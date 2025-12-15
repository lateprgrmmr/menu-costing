import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "../styles/theme";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <CssBaseline enableColorScheme />
        <AppRouter/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;