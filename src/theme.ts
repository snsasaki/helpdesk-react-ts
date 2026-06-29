import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb",
    },
    secondary: {
      main: "#f97316",
    },
    background: {
      default: "#f6f8fb",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      '"Noto Sans JP"',
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "sans-serif",
    ].join(","),
  },
  shape: {
    borderRadius: 10,
  },
});
