import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import auth from "../auth/auth-helper";
import { read, update } from "./api-user";
import { signin } from "../auth/api-auth";
const useStyles = makeStyles(({ spacing, palette }) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: spacing(5),
    paddingBottom: spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: spacing(2),
    color: palette.primary.main,
  },
  textField: {
    marginLeft: spacing(1),
    marginRight: spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: spacing(2),
  },
}));

export default function EditProfile({ match }) {
  const { card, title, textField, submit, error } = useStyles();
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
    redirectToProfile: false,
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      ({ error, email, name }) => {
        if (error) {
          setValues({ ...values, error });
        } else {
          setValues({ ...values, name, email });
        }
      }
    );
    //
    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    // update();
  };

  return <div></div>;
}
