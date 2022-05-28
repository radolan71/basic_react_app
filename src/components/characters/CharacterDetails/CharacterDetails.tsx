import { ReactElement } from "react";
import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Character } from "../../../apis/rickAndMorty/characters";

interface CharacterDetailsProps {
  character: Character;
}

const CharacterDetails = ({
  character,
}: CharacterDetailsProps): ReactElement => {
  // const extractEpisodeIds = (episodes: string[]): number[] => {
  //   return episodes
  //     .map((ep) => parseInt(ep.split("/").pop() ?? ""))
  //     .filter((ep) => ep !== 0);
  // };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}></Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h1">{character.name}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Origin</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Location</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Episodes</Typography>
      </Grid>
    </Grid>
  );
};

export default CharacterDetails;
