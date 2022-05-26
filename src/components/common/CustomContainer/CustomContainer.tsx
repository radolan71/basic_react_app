import { Container, makeStyles } from "@material-ui/core";
import * as React from "react";

interface ContainerProps {
  children: React.ReactElement;
}

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export const CustomContainer = ({
  children,
}: ContainerProps): React.ReactElement => {
  const classes = useStyles();
  return (
    <main>
      <Container className={classes.cardGrid} maxWidth="md">
        {children}
      </Container>
    </main>
  );
};
