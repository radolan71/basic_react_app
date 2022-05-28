import { Box, Typography } from "@material-ui/core";
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocationTypes } from "../../apis/rickAndMorty/locations";
import { fetchResidents } from "../../application/rickAndMorty/rickAndMortySlice";
import { AppDispatch, RootState } from "../../application/store";
import { isLoading, isNotRequested } from "../../helpers/requestHelper";

import { useLocation } from "../../hooks/useLocation";
import { useOrigin } from "../../hooks/useOrigin";
import { Loader } from "../common/Loader/Loader";

interface LocationProps {
  locationId: number;
  locationType: LocationTypes;
}

const Location = ({
  locationId,
  locationType,
}: LocationProps): ReactElement => {
  if (!locationId) {
    return (
      <Typography component="p" variant="h3">
        N/A
      </Typography>
    );
  }
  const location =
    locationType === LocationTypes.Home
      ? useOrigin(locationId)
      : useLocation(locationId);

  return (
    <>
      <Box m={2}>
        <Typography component="p" variant="body1">
          <b>Name:</b> {location?.name}
        </Typography>
        <Typography component="p" variant="body1">
          <b>Dimension:</b> {location?.dimension}
        </Typography>
        <Typography component="p" variant="body1">
          <b>Type:</b> {location?.type}
        </Typography>
        <Typography component="p" variant="body1">
          <b>Residents:</b> {location?.residents.length}
        </Typography>
      </Box>
    </>
  );
};

export default Location;
