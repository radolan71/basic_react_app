import { AppBar, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";

export const Header = (): React.ReactElement => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Rick And Morty
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
