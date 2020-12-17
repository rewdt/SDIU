import { makeStyles, Typography } from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import React, { useReducer, useState } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ButtonWithLoader from "../components/ButtonWithLoader";
import { BorderedInput } from "../components/InputField";
import AuthLayout from "../layouts/Auth.layout";
import Api from "../utils/api";

const useStyles = makeStyles((theme) => ({
  errorText: {
    color: "red",
    fontSize: 10
  }
}));

const CreatePasswordPage = ({ token }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const alert = useAlert();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      password: "",
      password_confirmation: ""
    }
  );

  const [inputErrors, setInputErrors] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      password: { error: null, message: "" },
      password_confirmation: { error: null, message: "" }
    }
  );

  const handleErrors = (errors) => {
    // console.log(errors);
    const allErrors = {
      password: {
        error: errors["password"] ? true : false,
        message: errors["password"] ? errors["password"][0] : ""
      },
      password_confirmation: {
        error: errors["password_confirmation"] ? true : false,
        message: errors["password_confirmation"]
          ? errors["password_confirmation"][0]
          : ""
      }
    };
    setInputErrors(allErrors);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputValues({ [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // console.log({ inputValues, token });
    await Api(token)
      .setPassword(inputValues)
      .then((res) => {
        // console.log(res.data);
        if (res.data.errors) {
          handleErrors(res.data.errors);
          alert.error(res.data.message);
        } else {
          dispatch({ type: "USER_LOGOUT" });
          alert.success(res.data.message);
          history.push("/login");
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };
  return (
    <AuthLayout
      title="Create New Password"
      description="Kindly create a new password for your account"
    >
      <BorderedInput
        placeholder="New Password"
        startadornment={<Lock style={{ color: "#7c869a" }} />}
        name="password"
        error={inputErrors.password.error}
        onChange={handleChange}
        type="password"
      />
      {inputErrors.password.error && (
        <Typography variant="subtitle1" className={classes.errorText}>
          {inputErrors.password.message}
        </Typography>
      )}
      <BorderedInput
        placeholder="Confirm New Password"
        startadornment={<Lock style={{ color: "#7c869a" }} />}
        name="password_confirmation"
        onChange={handleChange}
        type="password"
      />
      {inputErrors.password_confirmation.error && (
        <Typography variant="subtitle1" className={classes.errorText}>
          {inputErrors.password_confirmation.message}
        </Typography>
      )}
      <ButtonWithLoader
        variant="contained"
        color="primary"
        fullWidth
        style={{ height: 54, marginTop: 20 }}
        isloading={isLoading}
        onClick={handleSubmit}
      >
        CREATE NEW PASSWORD
      </ButtonWithLoader>
    </AuthLayout>
  );
};

const mapStateToProps = (state) => ({
  token: state.currentUser.temp_token
});

export default connect(mapStateToProps)(CreatePasswordPage);
