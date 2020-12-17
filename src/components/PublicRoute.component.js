import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ children, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.currentUser.token
});
export default connect(mapStateToProps)(PublicRoute);
