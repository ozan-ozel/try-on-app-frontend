import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createTheme, ThemeProvider } from "@mui/material";

import ImageStepperWrapper from "./components/ImageStepperWrapper.jsx";
import "./index.css";
import App from "./pages/App.jsx";

const baseTheme = createTheme(); // Create a default theme

const extendedTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    white: {
      main: "#FFFFFF",
      light: "#F5F5F5",
      dark: "#E0E0E0",
      contrastText: "#000000",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={extendedTheme}>
      <ImageStepperWrapper>
        <App />
      </ImageStepperWrapper>
    </ThemeProvider>
  </StrictMode>
);
