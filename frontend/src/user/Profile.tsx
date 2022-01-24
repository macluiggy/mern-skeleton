import React, { useEffect, useState } from "react";
import auth from "../auth/auth-helper";
import { read } from "./api-user";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Divider,
} from "@material-ui/core";
import { Edit, Person } from "@material-ui/icons";
import { Redirect, Link } from "react-router-dom";
const { isAuthenticated } = auth;

const useStyles = makeStyles(({ mixins: { gutters }, spacing, palette }) => ({
  root: gutters({
    maxWidth: 600,
    margin: "auto",
    padding: spacing(3),
    marginTop: spacing(5),
  }),
  title: {
    marginTop: spacing(3),
    col: palette.text.primary,
  },
}));

export default function Profile({
  match: {
    params: { userId },
  },
}) {
  const { root, title } = useStyles();
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read({ userId }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [userId]);

  if (redirectToSignin) return <Redirect to="/signin" />;

  return <Paper className={root}></Paper>;
}
