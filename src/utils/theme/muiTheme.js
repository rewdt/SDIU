import { createMuiTheme } from "@material-ui/core";

const muiTheme = createMuiTheme({
  typography: {
    fontFamily: `"MuseoSansRounded", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 100,
    fontWeightRegular: 300,
    fontWeightMedium: 500,
    fontWeightBold: 1000,
    h5: {
      fontFamily: `"MuseoSansRounded500"`
    },
    subtitle1: {
      fontFamily: `"MuseoSansRounded100"`,
      fontWeight: "400"
    },
    body1: {
      fontFamily: `"MuseoSansRounded100"`,
      fontSize: 14
    }
  },
  palette: {
    primary: { main: "#31A05F" },
    secondary: { main: "#243657" }
  }
});

export default muiTheme;
