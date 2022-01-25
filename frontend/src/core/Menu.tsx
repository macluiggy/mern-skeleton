import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { Home as HomeIcon } from "@material-ui/icons";
import React from "react";
import { withRouter } from "react-router-dom";

export const Menu = withRouter(({ history }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          MERN Skeleton
        </Typography>
      </Toolbar>
    </AppBar>
  );
});
