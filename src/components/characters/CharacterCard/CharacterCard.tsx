import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Badge,
  CardActionArea,
} from "@material-ui/core";
import * as React from "react";
import {
  Character,
  CharacterStatusEnum,
} from "../../../apis/rickAndMorty/characters";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import TvRoundedIcon from "@material-ui/icons/TvRounded";
import AccessibilityNewRoundedIcon from "@material-ui/icons/AccessibilityNewRounded";
import CharacterStatus from "../CharacterStatus/CharacterStatus";
import { truncate } from "../../../helpers/stringHelper";
interface CharacterCardProps {
  character: Character;
  showDetails: (character: Character) => void;
}

export const CharacterCard = ({
  character,
  showDetails,
}: CharacterCardProps): React.ReactElement => {
  return (
    <Grid item key={character.id} xs={6} sm={6} md={3}>
      <Card>
        <CardActionArea onClick={() => showDetails(character)}>
          <CardMedia
            component="img"
            image={character.image}
            alt={character.name}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent>
              <Typography component="div" variant="h6">
                {truncate(character.name)}
              </Typography>
              <Grid container spacing={1}>
                {/* Status */}
                <Grid container item xs={12}>
                  <CharacterStatus
                    status={character.status as CharacterStatusEnum}
                  />
                </Grid>
                {/* Species */}
                <Grid item xs={3}>
                  <AccessibilityNewRoundedIcon color="primary" />
                </Grid>
                <Grid item xs={9}>
                  <Typography>{truncate(character.species)}</Typography>
                </Grid>
                {/* Origin */}
                <Grid item xs={3}>
                  <HomeRoundedIcon color="primary" />
                </Grid>
                <Grid item xs={9}>
                  <Typography>{truncate(character.origin.name)}</Typography>
                </Grid>
                {/* Location */}
                <Grid item xs={3}>
                  <RoomRoundedIcon color="primary" />
                </Grid>
                <Grid item xs={9}>
                  <Typography>{truncate(character.location.name)}</Typography>
                </Grid>
                {/* Episodes */}
                <Grid item xs={3}>
                  <Badge
                    badgeContent={character.episode.length}
                    color="primary"
                  >
                    <TvRoundedIcon fontSize="small" color="primary" />
                  </Badge>
                </Grid>
                <Grid item xs={9}>
                  <Typography>Episodes</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
