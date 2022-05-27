import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  makeStyles,
  Typography,
  IconButton,
  Badge,
} from "@material-ui/core";
import * as React from "react";
import { Character } from "../../../apis/rickAndMorty/characters";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import TvRoundedIcon from "@material-ui/icons/TvRounded";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";
import { green, red } from "@material-ui/core/colors";

interface CharacterCardProps {
  character: Character;
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
}: CharacterCardProps): React.ReactElement => {
  const classes = useStyles();

  const statusStyle =
    character.status === "Alive"
      ? { color: green[500] }
      : character.status === "Dead"
      ? { color: red[500] }
      : {};

  const truncate = (str: string) => {
    return str.length > 14 ? str.substring(0, 13) + "..." : str;
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
              {truncate(character.status + " - " + character.species)}
            </Button>
            <Button
              aria-label="origin"
              color="primary"
              startIcon={<HomeRoundedIcon />}
            >
              {truncate(character.origin.name)}
            </Button>
            <Button
              aria-label="location"
              color="primary"
              startIcon={<RoomRoundedIcon />}
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
            >
              Episodes
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};
