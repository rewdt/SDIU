import validator from "validator";

const loginValidator = ({ email, password }) => {
  return {
    email: !validator.isEmail(email),
    password: !validator.isLength(password, { min: 6 })
  };
};

export default loginValidator;
