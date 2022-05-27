import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
  Badge,
} from "@material-ui/core";
import * as React from "react";
import { Character } from "../../../apis/rickAndMorty/characters";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import TvRoundedIcon from "@material-ui/icons/TvRounded";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";
import { green, grey, red } from "@material-ui/core/colors";
import { DetailsType } from "../CharacterCardContainer/CharacterCardContainer";

interface CharacterCardProps {
  character: Character;
  showDetails: (type: DetailsType, id: number[]) => void;
}

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export const CharacterCard = ({
  character,
  showDetails,
}: CharacterCardProps): React.ReactElement => {
  const classes = useStyles();

  const statusStyle =
    character.status === "Alive"
      ? { color: green[500] }
      : character.status === "Dead"
      ? { color: red[500] }
      : { color: grey[500] };

  const truncate = (str: string) => {
    return str.length > 14 ? str.substring(0, 11) + "..." : str;
  };

  const onShowDetails = (type: DetailsType, id: number) => {
    if (DetailsType.Location) {
      showDetails(type, [id]);
    } else {
      showDetails(type, extractEpisodeIds(character.episode));
    }
  };

  const extractEpisodeIds = (episodes: string[]): number[] => {
    return episodes
      .map((ep) => parseInt(ep.split("/").pop() ?? ""))
      .filter((ep) => ep !== 0);
  };

  return (
    <Grid item key={character.id} xs={6} sm={6} md={3}>
      <Card>
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
            <Button
              aria-label="origin"
              color="primary"
              startIcon={<FiberManualRecordRoundedIcon style={statusStyle} />}
            >
              {truncate(
                character.status.replace("Unknown", "UNK") +
                  " - " +
                  character.species
              )}
            </Button>
            <Button
              aria-label="origin"
              color="primary"
              startIcon={<HomeRoundedIcon />}
              onClick={() =>
                onShowDetails(
                  DetailsType.Location,
                  parseInt(character.origin.url.split("/").pop() ?? "")
                )
              }
            >
              {truncate(character.origin.name)}
            </Button>
            <Button
              aria-label="location"
              color="primary"
              startIcon={<RoomRoundedIcon />}
              onClick={() =>
                onShowDetails(
                  DetailsType.Location,
                  parseInt(character.location.url.split("/").pop() ?? "")
                )
              }
            >
              {truncate(character.location.name)}
            </Button>
            <Button
              aria-label="episodes"
              color="primary"
              startIcon={
                <Badge badgeContent={character.episode.length} color="primary">
                  <TvRoundedIcon fontSize="small" />
                </Badge>
              }
              onClick={() => onShowDetails(DetailsType.Episodes, character.id)}
            >
              Episodes
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};
