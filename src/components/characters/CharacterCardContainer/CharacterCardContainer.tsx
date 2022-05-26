import { Grid } from "@material-ui/core";
import React, { useEffect, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../../../application/rickAndMorty/rickAndMortySlice";
import { AppDispatch, RootState } from "../../../application/store";
import { isNotRequested } from "../../../helpers/RequestState";
import { CharacterCard } from "../CharacterCard/CharacterCard";
interface CharacterCardContainerProps {
  children?: React.ReactElement;
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const CharacterCardContainer = (
  props: CharacterCardContainerProps
): ReactElement => {
  const characters = useSelector((state: RootState) => state.rickAndMorty);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (isNotRequested(characters)) {
      dispatch(fetchCharacters());
    }
  }, []);
  return (
    <Grid container spacing={4}>
      {cards.map((card, idx) => (
        <CharacterCard card={card} key={idx} />
      ))}
    </Grid>
  );
};
