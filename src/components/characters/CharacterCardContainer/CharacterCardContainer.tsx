import { Box, Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Character } from "../../../apis/rickAndMorty/characters";
import { fetchCharactersByPage } from "../../../application/rickAndMorty/rickAndMortySlice";
import { AppDispatch, RootState } from "../../../application/store";
import { isLoading, isNotRequested } from "../../../helpers/requestHelper";
import { Loader } from "../../common/Loader/Loader";
import { Modal } from "../../common/Modal/Modal";
import Episodes from "../../Episodes/Episodes";
import Location from "../../Location/Location";
import { CharacterCard } from "../CharacterCard/CharacterCard";
interface CharacterCardContainerProps {
  children?: React.ReactElement;
}

export enum DetailsType {
  Episodes = "episodes",
  Location = "location",
}

export const CharacterCardContainer = (
  props: CharacterCardContainerProps
): ReactElement => {
  const characters = useSelector(
    (state: RootState) => state.rickAndMorty.characters
  );
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsType, setDetailsType] = useState(DetailsType.Episodes);
  const [detailIds, setDetailIds] = useState<number[]>([]);
  useEffect(() => {
    if (isNotRequested(characters)) {
      dispatch(fetchCharactersByPage(page));
    }
  }, []);

  useEffect(() => {
    if (page !== 1) {
      dispatch(fetchCharactersByPage(page));
    }
  }, [page]);

  const hasResults = () => {
    return characters && characters.payload && characters.payload.results;
  };

  const onPageChange = (event: Record<any, any>, page: number) => {
    setPage(page);
    dispatch(fetchCharactersByPage(page));
  };

  const showDetails = (type: DetailsType, ids: number[]): void => {
    setDetailsType(type);
    setShowDetailsModal(true);
    setDetailIds(ids);
  };

  const hideDetails = () => {
    setShowDetailsModal(false);
  };

  if (isNotRequested(characters) || isLoading(characters)) {
    return <Loader />;
  }

  return (
    <Grid container spacing={4}>
      {hasResults() && (
        <Modal handleClose={hideDetails} open={showDetailsModal}>
          <>
            {detailsType === DetailsType.Location && (
              <Location locationId={detailIds[0]} title={"Location"} />
            )}
            {detailsType === DetailsType.Episodes && <Episodes />}
          </>
        </Modal>
      )}
      {hasResults() &&
        characters?.payload.results.map((character: Character, idx: number) => (
          <CharacterCard
            character={character}
            key={idx}
            showDetails={showDetails}
          />
        ))}
      {hasResults() && (
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Pagination
              page={page}
              count={characters?.payload?.info?.pages ?? 0}
              variant="outlined"
              shape="rounded"
              onChange={onPageChange}
            />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
