import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material";
import { grey, purple, red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const theme = (prefersDarkMode = false) =>
  createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
      primary: {
        main: prefersDarkMode ? "#CEF09D" : "#1F0802",
      },
      secondary: {
        main: prefersDarkMode ? "#1C646D" : "#38184C",
      },
      info: {
        main: prefersDarkMode ? "#1C646D" : "#38184C",
      },
      error: {
        main: prefersDarkMode ? "#38184C" : "#A6BC09",
      },
      warning: {
        main: prefersDarkMode ? "#1F0802" : "#CEF09D",
      },
      success: {
        main: prefersDarkMode ? "#A0CD60" : "#1C646D",
      },
    },
  });
