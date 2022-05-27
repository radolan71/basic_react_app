import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CustomContainer } from "../CustomContainer/CustomContainer";
import { CharacterCardContainer } from "../../characters/CharacterCardContainer/CharacterCardContainer";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../application/store";
import { fetchConfig } from "../../../application/config";
import { isNotRequested } from "../../../helpers/requestHelper";

export default function App() {
  const config = useSelector((state: RootState) => state.config);
  const dispatch: AppDispatch = useDispatch();

  //load app config
  useEffect(() => {
    if (isNotRequested(config)) {
      dispatch(fetchConfig());
    }
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <CustomContainer>
        <CharacterCardContainer />
      </CustomContainer>
      <Footer />
    </React.Fragment>
  );
}
