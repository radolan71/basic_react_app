import * as React from "react";
import { CharacterStatusEnum } from "../../../apis/rickAndMorty/characters";
import { green, grey, red } from "@material-ui/core/colors";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";
import { Grid, Typography } from "@material-ui/core";
import { truncate } from "../../../helpers/stringHelper";

interface CharacterStatusProps {
  status: CharacterStatusEnum;
}

const CharacterStatus = ({
  status,
}: CharacterStatusProps): React.ReactElement => {
  const statusStyle =
    status === CharacterStatusEnum.Alive
      ? { color: green[500] }
      : status === CharacterStatusEnum.Dead
      ? { color: red[500] }
      : { color: grey[500] };
  return (
    <>
      <Grid item xs={3}>
        <FiberManualRecordRoundedIcon style={statusStyle} />
      </Grid>
      <Grid item xs={9}>
        <Typography>{truncate(status)}</Typography>
      </Grid>
    </>
  );
};

export default CharacterStatus;
