import { makeStyles, Typography } from "@material-ui/core";
import { Lock, Person } from "@material-ui/icons";
import React, { useReducer, useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import ButtonWithLoader from "../components/ButtonWithLoader";
import { BorderedInput, PasswordField } from "../components/InputField";
import AuthLayout from "../layouts/Auth.layout";
import Api from "../utils/api";
import loginValidator from "../utils/validators/login.validator";
import { setUserToken, setUserDetails } from "../redux/actions/currentUser";

const useStyles = makeStyles((theme) => ({
  fgotPassword: {
    width: "100%",
    padding: 0,
    //   backgroundColor: "red",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: theme.spacing(1),
    marginBottom: 30
  },
  errorText: {
    color: "red",
    fontSize: 10
  }
}));

function LoginPage(props) {
  const classes = useStyles();
  const alert = useAlert();
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: ""
    }
  );
  const [inputErrors, setInputErrors] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: null,
      password: null
    }
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputValues({ [name]: value });
  };

  const handleSubmit = async () => {
    const { email, password } = inputValues;
    const data = { email, password };
    const loginErrors = loginValidator(data);
    const { email: emailError, password: passwordError } = loginErrors;
    setInputErrors(loginErrors);
    if (!emailError && !passwordError) {
      setIsLoading(true);
      await Api()
        .login(data)
        .then((res) => {
          if (res.data.status === "success") {
            if (res.data.data.user.role === "admin") {
              props.setUserToken(res.data.data.token);
              props.setUserDetails(res.data.data.user);
              history.replace(from);
            } else {
              alert.error(
                "Sorry This user does not have access to view this page. Contact the admin for more information"
              );
            }
          } else {
            alert.error(res.data.message);
          }
        })
        .catch((error) =>
          alert.error("Sorry! we could not process your request")
        );
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      description="Log in to continue using your account"
      image={true}
    >
      <BorderedInput
        error={inputErrors.email}
        name="email"
        value={inputValues.email}
        placeholder="Email Address"
        startadornment={<Person style={{ color: "#7c869a" }} />}
        onChange={handleChange}
      />
      {inputErrors.email && (
        <Typography variant="subtitle1" className={classes.errorText}>
          The email you entered is invalid
        </Typography>
      )}
      <PasswordField
        error={inputErrors.password}
        name="password"
        value={inputValues.password}
        placeholder="Password"
        style={{ marginBottom: 0 }}
        startadornment={<Lock style={{ color: "#7c869a" }} />}
        onChange={handleChange}
      />
      {inputErrors.password && (
        <Typography variant="subtitle1" className={classes.errorText}>
          The password you entered is too short
        </Typography>
      )}
      <span className={classes.fgotPassword}>
        <Link
          to="/forgot-password"
          style={{ color: "#7c869a", fontSize: 14 }}
          className="link"
        >
          <Typography variant="subtitle1">Forgot Password?</Typography>
        </Link>
      </span>
      <ButtonWithLoader
        isloading={isLoading}
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        fullWidth
        style={{ height: 54 }}
      >
        LOG IN
      </ButtonWithLoader>
    </AuthLayout>
  );
}

const mapDispatchToProps = {
  setUserToken,
  setUserDetails
};

export default connect(null, mapDispatchToProps)(LoginPage);
