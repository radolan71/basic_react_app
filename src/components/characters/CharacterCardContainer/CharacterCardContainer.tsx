import { Box, Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Character } from "../../../apis/rickAndMorty/characters";
import { fetchCharacters } from "../../../application/rickAndMorty/rickAndMortySlice";
import { AppDispatch, RootState } from "../../../application/store";
import { isLoading, isNotRequested } from "../../../helpers/requestHelper";
import { Loader } from "../../common/Loader/Loader";
import { CharacterCard } from "../CharacterCard/CharacterCard";
interface CharacterCardContainerProps {
  children?: React.ReactElement;
}

export const CharacterCardContainer = (
  props: CharacterCardContainerProps
): ReactElement => {
  const characters = useSelector(
    (state: RootState) => state.rickAndMorty.characters
  );
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (isNotRequested(characters)) {
      dispatch(fetchCharacters(page));
    }
  }, []);

  useEffect(() => {
    if (page !== 1) {
      dispatch(fetchCharacters(page));
    }
  }, [page]);

  const hasResults = () => {
    return characters && characters.payload && characters.payload.results;
  };

  const onPageChange = (event: Record<any, any>, page: number) => {
    setPage(page);
    dispatch(fetchCharacters(page));
  };

  if (isNotRequested(characters) || isLoading(characters)) {
    return <Loader />;
  }

  return (
    <Grid container spacing={4}>
      {hasResults() &&
        characters?.payload.results.map((character: Character, idx: number) => (
          <CharacterCard character={character} key={idx} />
        ))}
      {hasResults() && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Pagination
            page={page}
            count={characters?.payload?.info?.pages ?? 0}
            variant="outlined"
            shape="rounded"
            onChange={onPageChange}
          />
        </Box>
      )}
    </Grid>
  );
};
