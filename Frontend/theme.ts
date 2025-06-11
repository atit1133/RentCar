import { createTheme, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    add?: {
      primary?: string;
      secondary?: string;
    };
  }
  interface TypeText {
    alert?: string;
    success?: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#4D869C", // Example primary color
      contrastText: "#EEF7FF", // Text color on primary backgrounds
    },
    secondary: {
      main: "#EEF7FF", // Example secondary color
      contrastText: "#CDE8E5", // Text color on secondary backgrounds
    },
    text: {
      primary: "#4D869C",
      secondary: "#5c6bc0",
      alert: "#d32f2f", // Example danger color
      success: "#388e3c", // Example success color
    },
    add: {
      primary: "#7AB2B2",
      secondary: "#CDE8E5",
    },
  },

  typography: {
    fontFamily: "Poppins, Arial, sans-serif", // Set default font
    h1: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontWeight: 700, // Example weight for headings
      fontSize: "2.5rem", // Adjust size as needed
    },
    h2: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontWeight: 500,
      fontSize: "2rem",
      color: "#4D869C",
    },
    body1: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontWeight: 400,
      fontSize: "1rem",
    },
    body2: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontWeight: 400,
      fontSize: "0.875rem",
    },
    // Add more styles as needed
  },
});

export default theme;
