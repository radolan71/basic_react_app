import { createTheme, Theme, withStyles } from "@material-ui/core/styles";

export const CustomColors = {
  background: "#f4f6f8",
  //   heading: "#38637e",
  //   text: {
  //     light: "#333",
  //     link: "#38637E",
  //   },
  //   navHover: "rgba(216, 216, 216, 0.5)",
  //   subTitle: "#38637e",
  //   border: "#ccc",
};

// To extend this, check out:
// https://material-ui.com/customization/default-theme/
export const CustomTheme = createTheme({
  palette: {
    primary: {
      main: "#003952",
    },
    secondary: {
      light: "#fff",
      main: "#fff",
      contrastText: "#003952",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      default: CustomColors.background,
    },
    info: {
      main: "#2D81B0",
    },
  },
});
