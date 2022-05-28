import { Box, Typography } from "@material-ui/core";
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResidents } from "../../application/rickAndMorty/rickAndMortySlice";
import { AppDispatch, RootState } from "../../application/store";
import { isLoading, isNotRequested } from "../../helpers/requestHelper";

import { useLocation } from "../../hooks/useLocation";
import { Loader } from "../common/Loader/Loader";

interface LocationProps {
  locationId?: number;
  title: string;
}

const Location = ({ locationId, title }: LocationProps): ReactElement => {
  if (!locationId) {
    return (
      <Typography component="p" variant="h3">
        N/A
      </Typography>
    );
  }
  const location = useLocation(locationId);
  const dispatch: AppDispatch = useDispatch();
  const residents = useSelector(
    (state: RootState) => state.rickAndMorty.residents
  );

  //   useEffect(() => {
  //     if (isNotRequested(residents)) {
  //       if (location) {
  //         const residentIds = location.residents
  //           .map((r) => parseInt(r.split("/").pop() ?? ""))
  //           .filter((r) => r !== 0);
  //         dispatch(fetchResidents({ ids: residentIds, locationId }));
  //       }
  //     }
  //   }, []);

  useEffect(() => {
    if (isNotRequested(residents) || residents?.locationId !== locationId) {
      if (location) {
        const residentIds = location.residents
          .map((r) => parseInt(r.split("/").pop() ?? ""))
          .filter((r) => r !== 0);
        dispatch(fetchResidents({ ids: residentIds, locationId }));
      }
    }
  }, [locationId, location]);

  if (
    // isLoading(location) ||
    isNotRequested(residents) ||
    isLoading(residents)
  ) {
    return <Loader />;
  }

  //   TODO get the residents
  return (
    <>
      <Typography component="p" variant="h3">
        {title}
      </Typography>
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
          <b>Residents ({location?.residents.length}) :</b>
        </Typography>
      </Box>
    </>
  );
};

export default Location;
