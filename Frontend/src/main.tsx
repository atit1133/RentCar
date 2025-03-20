import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";

import theme from "../theme.ts";

import App from "./App.tsx";
import { AppProvider } from "./AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Container maxWidth="xl">
          <App />
        </Container>        
      </AppProvider>
    </ThemeProvider>
  </StrictMode>
);
