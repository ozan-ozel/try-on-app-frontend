import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createTheme, ThemeProvider } from "@mui/material";

import "./index.css";
import App from "./pages/App.jsx";
import ImageStepperWrapper from "./components/ImageStepperWrapper.jsx";

const theme = createTheme(); // Create a default theme

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ImageStepperWrapper>
        <App />
      </ImageStepperWrapper>
    </ThemeProvider>
  </StrictMode>
);
