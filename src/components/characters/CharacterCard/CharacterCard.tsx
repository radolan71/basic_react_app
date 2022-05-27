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
} from "@material-ui/core";
import * as React from "react";
import { Character } from "../../../apis/rickAndMorty/characters";
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

  return (
    <Grid item key={character.id} xs={6} sm={6} md={3}>
      <Card>
        <CardMedia
          component="img"
          // sx={{ width: 151 }}
          image={character.image}
          alt={character.name}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent>
            <Typography component="div" variant="h6">
              {character.name}
            </Typography>
            <Typography variant="subtitle1" color="secondary" component="div">
              {character.species}
            </Typography>
            <Chip label={character.status} size="small" />
          </CardContent>
        </Box>
        <CardActions>
          <Button size="small">Details</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
