import { ReactElement } from "react";
import * as React from "react";
import { Badge, Grid, Typography } from "@material-ui/core";
import { Character } from "../../../apis/rickAndMorty/characters";
import Location from "../../Location/Location";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import TvRoundedIcon from "@material-ui/icons/TvRounded";
import { LocationTypes } from "../../../apis/rickAndMorty/locations";
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

  const originId = parseInt(character.origin.url.split("/").pop() ?? "");
  const locationId = parseInt(character.location.url.split("/").pop() ?? "");

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5}>
        <img
          src={character.image}
          title={character.name}
          alt={character.name}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={7}>
        <Typography variant="h3">{character.name}</Typography>
        <Typography variant="body1" paragraph={true}>
          Species: {character.species}
        </Typography>
        <Typography variant="body1" paragraph={true}>
          Type: {character.type}
        </Typography>
        <Typography variant="body1" paragraph={true}>
          Gender: {character.gender}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Typography variant="h6">Origin</Typography>
        {originId ? (
          <Location locationId={originId} locationType={LocationTypes.Origin} />
        ) : (
          "N/A"
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Location</Typography>
        {locationId ? (
          <Location locationId={locationId} locationType={LocationTypes.Home} />
        ) : (
          "N/A"
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          Episodes ({character.episode.length}){" "}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CharacterDetails;
