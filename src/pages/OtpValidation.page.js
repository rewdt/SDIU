import { OutlinedInput } from "../components/InputField";
import React, { useState } from "react";
import AuthLayout from "../layouts/Auth.layout";
import { useHistory, useLocation } from "react-router-dom";
import Api from "../utils/api";
import { connect } from "react-redux";
import { setTempToken } from "../redux/actions/currentUser";
import { useAlert } from "react-alert";
import ButtonWithLoader from "../components/ButtonWithLoader";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function OtpValidation(props) {
  let query = useQuery();
  const alert = useAlert();
  const history = useHistory();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const email = query.get("email");

  const validateOTP = async () => {
    const data = { token, email };
    // console.log(data);
    setIsLoading(true);
    await Api()
      .validateOtp(data)
      .then((res) => {
        // console.log(res.data.data.token);
        if (res.data.status !== "success") {
          alert.error(res.data.message);
        } else {
          alert.success(res.data.message);
          history.push("/create-password");
          props.setTempToken(res.data.data.token);
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  return (
    <AuthLayout
      title="OTP Validation"
      description={
        <span>
          A message has been sent to your email <br /> containing your 6 digit
          OTP
        </span>
      }
    >
      <OutlinedInput
        fullWidth
        placeholder="Enter OTP"
        value={token}
        onChange={({ target }) => setToken(target.value)}
      />
      <ButtonWithLoader
        // href="/create-password"
        isloading={isLoading}
        variant="contained"
        color="primary"
        fullWidth
        style={{ height: 54, marginTop: 20 }}
        onClick={validateOTP}
      >
        PROCEED
      </ButtonWithLoader>
    </AuthLayout>
  );
}

const mapDispatchToProps = {
  setTempToken
};

export default connect(null, mapDispatchToProps)(OtpValidation);
