import { Typography } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import validator from "validator";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { BorderedInput } from "../components/InputField";
import AuthLayout from "../layouts/Auth.layout";
import Api from "../utils/api";
import ButtonWithLoader from "../components/ButtonWithLoader";

function ForgotPasswordPage() {
  const alert = useAlert();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({ error: null, message: "" });

  const handleChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSubmit = async () => {
    const data = { email };
    const validateEmail = !validator.isEmail(email);
    setEmailError({
      error: validateEmail,
      message: validateEmail ? "The email you entered is invalid" : ""
    });
    if (!validateEmail) {
      setIsLoading(true);
      await Api()
        .forgotPassword(data)
        .then((res) => {
          // console.log(res.data);
          if (res.data.status === "success") {
            alert.success(res.data.message);
            history.push(`/validate-otp?email=${email}`);
          } else {
            alert.error(res.data.message);
            if (res.data.data["email"]) {
              setEmailError({
                error: true,
                message: res.data.data["email"][0]
              });
            }
          }
        })
        .catch((error) => console.log({ error }));
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout
      title="Forgot Password?"
      description={
        <span>
          Kindly enter the email address registered <br /> with your account
        </span>
      }
    >
      <BorderedInput
        placeholder="Email Address"
        error={emailError.error}
        startadornment={<Person style={{ color: "#7c869a" }} />}
        value={email}
        onChange={handleChange}
      />
      {emailError.error && (
        <Typography variant="subtitle1" className="errorText">
          {emailError.message}
        </Typography>
      )}
      <ButtonWithLoader
        onClick={handleSubmit}
        isloading={isLoading}
        // href="/validate-otp"
        variant="contained"
        color="primary"
        fullWidth
        style={{ height: 54, marginTop: 20 }}
      >
        SEND OTP
      </ButtonWithLoader>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
