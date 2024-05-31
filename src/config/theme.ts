import { PaletteOptions, createTheme } from "@mui/material";
import { green, grey, indigo } from "@mui/material/colors";

interface CustomPaletteOptions extends PaletteOptions {
  green?: {
    main: string;
  };
}

let theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      normal: indigo[100], // Utilisez 'light' pour définir une teinte plus claire
      dark: indigo[700], // Utilisez 'dark' pour définir une teinte plus foncée
      green :"linear-gradient(98deg, #89B77C, #0a713f 94%)"
    },
    secondary: {
      main: indigo[50],
      dark: grey[700],
      light: "#F4F5FA",
    },
    neutral: {
      main: grey[700],
      // light: grey[200], // Utilisez 'light' pour définir une teinte plus claire
      light: "#F4F5FA",
      // dark: grey[700],
      dark: "#001433",
      medium: grey[900],
      grey : "#f3f4f8", 
      
    },
    green: {
      main: green[800],
    },
    white: {
      light: "#ffffff"
    }
  } as CustomPaletteOptions,
});

theme = createTheme(theme, {
  typography: {
    link: {
      fontSize: "0.8rem",
      [theme.breakpoints.up("md")]: {
        fontSize: "0.9rem",
      },
      fontWeight: 500,
      color: theme.palette.primary.main,
      display: "block",
      cursor: "pointer",
    },
    cardTitle: {
      fontSize: "1.2rem",
      display: "block",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
    },
    h7: {
      fontSize: "0.8rem",
    },
    h8: {
      fontSize: "1.7rem",
    },
  },
});

export default theme;
