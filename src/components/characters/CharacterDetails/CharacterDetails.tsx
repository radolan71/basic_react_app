import { ReactElement } from "react";
import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import {
  Character,
  CharacterStatusEnum,
} from "../../../apis/rickAndMorty/characters";
import Location from "../../Location/Location";
import { LocationTypes } from "../../../apis/rickAndMorty/locations";
import Episodes from "../../Episodes/Episodes";
import CharacterStatus from "../CharacterStatus/CharacterStatus";
interface CharacterDetailsProps {
  character: Character;
}

const CharacterDetails = ({
  character,
}: CharacterDetailsProps): ReactElement => {
  const originId = parseInt(character.origin.url.split("/").pop() ?? "");
  const locationId = parseInt(character.location.url.split("/").pop() ?? "");

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <img
          src={character.image}
          title={character.name}
          alt={character.name}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Typography variant="h3">{character.name}</Typography>
        <Grid container item xs={4}>
          <CharacterStatus status={character.status as CharacterStatusEnum} />
        </Grid>
        <Typography variant="body1" component="p">
          <b>Species:</b> {character.species}
        </Typography>
        <Typography variant="body1" component="p">
          <b>Type:</b> {character.type.trim().length ? character.type : "N/A"}
        </Typography>
        <Typography variant="body1" component="p">
          <b>Gender:</b> {character.gender}
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
        <Episodes episodesUris={character.episode} characterId={character.id} />
      </Grid>
    </Grid>
  );
};

export default CharacterDetails;
