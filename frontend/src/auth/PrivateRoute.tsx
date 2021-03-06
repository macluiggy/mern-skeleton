import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth-helper";
const { isAuthenticated } = auth;

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
