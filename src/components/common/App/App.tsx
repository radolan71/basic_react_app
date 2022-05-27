import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CustomContainer } from "../CustomContainer/CustomContainer";
import { CharacterCardContainer } from "../../characters/CharacterCardContainer/CharacterCardContainer";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../application/store";
import { fetchConfig } from "../../../application/config";
import { isLoading, isNotRequested } from "../../../helpers/requestHelper";
import { Loader } from "../Loader/Loader";
import { ThemeProvider } from "@material-ui/core";
import { CustomTheme } from "../CustomTheme/CustomTheme";

export default function App() {
  const config = useSelector((state: RootState) => state.config);
  const dispatch: AppDispatch = useDispatch();

  //load app config
  useEffect(() => {
    if (isNotRequested(config)) {
      dispatch(fetchConfig());
    }
  }, []);

  if (isNotRequested(config) || isLoading(config)) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={CustomTheme}>
      <CssBaseline />
      <Header />
      <CustomContainer>
        <CharacterCardContainer />
      </CustomContainer>
      <Footer />
    </ThemeProvider>
  );
}
