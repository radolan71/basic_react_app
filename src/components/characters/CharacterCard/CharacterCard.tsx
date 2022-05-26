import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import * as React from "react";
interface CharacterCardProps {
  card: any;
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

export const CharacterCard = (
  props: CharacterCardProps
): React.ReactElement => {
  const classes = useStyles();
  return (
    <Grid item key={props.card} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        {/* <CardMedia
            className={classes.cardMedia}
            image="https://source.unsplash.com/random"
            title="Image title"
          /> */}
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            Heading
          </Typography>
          <Typography>
            This is a media card. You can use this section to describe the
            content.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            View
          </Button>
          <Button size="small" color="primary">
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
