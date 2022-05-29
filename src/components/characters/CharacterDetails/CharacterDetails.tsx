import { ReactElement } from "react";
import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Character } from "../../../apis/rickAndMorty/characters";
import Location from "../../Location/Location";
import { LocationTypes } from "../../../apis/rickAndMorty/locations";
import Episodes from "../../Episodes/Episodes";
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
        <Typography variant="body1" component="p">
          Species: {character.species}
        </Typography>
        <Typography variant="body1" component="p">
          Type: {character.type}
        </Typography>
        <Typography variant="body1" component="p">
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
        <Episodes episodesUris={character.episode} characterId={character.id} />
      </Grid>
    </Grid>
  );
};

export default CharacterDetails;
