import {
  IconButton,
  makeStyles,
  OutlinedInput as Input,
  withStyles
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";

export const OutlinedInput = withStyles({
  //   root: {
  //     "&:hover $notchedOutline": {
  //       borderColor: "#7c869a",
  //       borderWidth: 1
  //     }
  //   },
  notchedOutline: {
    borderColor: "#7c869a",
    borderWidth: 1
  }
})(Input);

const useStyles = makeStyles((theme) => ({
  input: {
    // border: "1px solid blue",
    marginBottom: theme.spacing(2)
  },
  inputText: {
    fontSize: 14,
    fontFamily: "MuseoSansRounded",
    "&::placeholder": {
      color: "#7c869a"
    }
  },
  startAdornment: {
    borderRight: "1px solid #7c869a",
    height: 54,
    display: "flex",
    alignItems: "center",
    paddingRight: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export const BorderedInput = (props) => {
  const classes = useStyles();
  return (
    <OutlinedInput
      {...props}
      startAdornment={
        <div className={classes.startAdornment}>{props.startadornment}</div>
      }
      className={classes.input}
      fullWidth
      variant="outlined"
      inputProps={{ className: classes.inputText }}
    />
  );
};

export const PasswordField = (props) => {
  const [visible, setVisibility] = useState(false);

  const handleChange = () => {
    setVisibility(!visible);
  };

  return (
    <BorderedInput
      {...props}
      type={visible ? "text" : "password"}
      endAdornment={
        !visible ? (
          <IconButton onClick={handleChange}>
            <Visibility />
          </IconButton>
        ) : (
          <IconButton onClick={handleChange}>
            <VisibilityOff />
          </IconButton>
        )
      }
    />
  );
};
