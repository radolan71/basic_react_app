import { Box, Typography } from "@material-ui/core";
import React, { ReactElement } from "react";

import { useLocation } from "../../hooks/useLocation";

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
          <b>Residents:</b>
        </Typography>
      </Box>
    </>
  );
};

export default Location;
