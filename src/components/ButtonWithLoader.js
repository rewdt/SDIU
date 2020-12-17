import { Button, CircularProgress } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

const ButtonWithLoader = (props) => {
  return (
    <Button {...props} disabled={props.isLoading}>
      {props.isloading ? (
        <CircularProgress style={{ color: "grey" }} />
      ) : (
        props.children
      )}
    </Button>
  );
};

ButtonWithLoader.propTypes = {
  isloading: PropTypes.bool
};

export default ButtonWithLoader;
