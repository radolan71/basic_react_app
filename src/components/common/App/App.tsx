import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CustomContainer } from "../CustomContainer/CustomContainer";
import { CharacterCardContainer } from "../../characters/CharacterCardContainer/CharacterCardContainer";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export default function App() {
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
