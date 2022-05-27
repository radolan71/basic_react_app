import React, { ReactElement } from "react";
import { CircularProgress, Backdrop, Typography, Box } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      position: "absolute",
      top: "50%",
      left: "50%",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);
export const Loader = (): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
