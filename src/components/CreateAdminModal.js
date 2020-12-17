import React, { useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useAlert } from "react-alert";
import ButtonWithLoader from "./ButtonWithLoader";
import Api from "../utils/api";
import states from "../utils/constants/states.json";
import getLga from "../helpers/getLga";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    // position: "absolute",
    maxHeight: "90%",
    overflowY: "scroll",
    width: 590,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down("sm")]: {
      width: window.innerWidth - 60,
      padding: theme.spacing(0)
    }
  },
  inputContainer: {
    padding: theme.spacing(0, 8),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4)
    }
  },
  input: {
    marginBottom: theme.spacing(2),
    height: 54
  },
  multilineInput: {
    marginBottom: theme.spacing(2)
  },
  closeButtonContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  titleText: {
    fontFamily: "MuseoSansRounded500",
    fontSize: 33,
    color: "#252D31",
    marginBottom: theme.spacing(4)
  },
  errorText: {
    color: "red",
    fontSize: 10
  }
}));

function CreateAdminModal({ open, handleClose, reloadData, token }) {
  const classes = useStyles();
  const alert = useAlert();
  const [isLoading, setLoading] = React.useState(false);
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      email: "",
      phone_number: "",
      gender: "none",
      password: "",
      state: "none",
      lga: "none"
    }
  );

  const [inputErrors, setInputErrors] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: { error: null, message: "" },
      email: { error: null, message: "" },
      phone_number: { error: null, message: "" },
      gender: { error: null, message: "" },
      password: { error: null, message: "" },
      state: { error: null, message: "" },
      lga: { error: null, message: "" }
    }
  );

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputValues({ [name]: value });
    if (name === "state") {
      setInputValues({ lga: "none" });
    }
  };

  const handleErrors = (errors) => {
    console.log(errors);
    const allErrors = {
      name: {
        error: errors["name"] ? true : false,
        message: errors["name"] ? errors["name"][0] : ""
      },
      email: {
        error: errors["email"] ? true : false,
        message: errors["email"] ? errors["email"][0] : ""
      },
      phone_number: {
        error: errors["phone_number"] ? true : false,
        message: errors["phone_number"] ? errors["phone_number"][0] : ""
      },
      password: {
        error: errors["password"] ? true : false,
        message: errors["password"] ? errors["password"][0] : ""
      },
      gender: {
        error: errors["gender"] ? true : false,
        message: errors["gender"] ? errors["gender"][0] : ""
      },
      state: {
        error: errors["state"] ? true : false,
        message: errors["state"] ? errors["state"][0] : ""
      },
      lga: {
        error: errors["lga"] ? true : false,
        message: errors["lga"] ? errors["lga"][0] : ""
      }
    };
    setInputErrors(allErrors);
  };

  const addAdmin = async (data) => {
    setLoading(true);
    await Api(token)
      .createAdmin(data)
      .then((res) => {
        if (res.data.status === "success") {
          alert.success("A new Admin has been created successfully");
          console.log(res.data);
          handleClose();
          reloadData();
        } else {
          handleErrors(res.data.errors);
          alert.error(res.data.message, {
            position: "top center",
            className: classes.alert
          });
        }
      })
      .catch((error) => console.log(error));
    setLoading(false);
  };

  const handleSubmit = () => {
    const {
      name,
      email,
      phone_number,
      password,
      gender,
      state,
      lga
    } = inputValues;
    const data = {
      name,
      email,
      phone_number,
      password,
      gender,
      state,
      lga
    };
    addAdmin(data);
  };

  const body = (
    <Paper className={classes.paper}>
      <div className={classes.closeButtonContainer}>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </div>
      <div className={classes.inputContainer}>
        <Typography variant="h5" className={classes.titleText}>
          Create Admin
        </Typography>
        <OutlinedInput
          placeholder="Name"
          name="name"
          value={inputValues.name}
          error={inputErrors.name.error}
          fullWidth
          className={classes.input}
          onChange={handleChange}
        />
        {inputErrors.name.error && (
          <Typography variant="subtitle1" className={classes.errorText}>
            {inputErrors.name.message}
          </Typography>
        )}
        <OutlinedInput
          placeholder="Email"
          name="email"
          value={inputValues.email}
          error={inputErrors.email.error}
          fullWidth
          className={classes.input}
          onChange={handleChange}
        />
        {inputErrors.email.error && (
          <Typography variant="subtitle1" className={classes.errorText}>
            {inputErrors.email.message}
          </Typography>
        )}

        <OutlinedInput
          placeholder="Phone Number"
          name="phone_number"
          value={inputValues.phone_number}
          error={inputErrors.phone_number.error}
          fullWidth
          className={classes.input}
          onChange={handleChange}
        />
        {inputErrors.phone_number.error && (
          <Typography variant="subtitle1" className={classes.errorText}>
            {inputErrors.phone_number.message}
          </Typography>
        )}

        <OutlinedInput
          placeholder="Password"
          type="password"
          name="password"
          value={inputValues.password}
          error={inputErrors.password.error}
          fullWidth
          className={classes.input}
          onChange={handleChange}
        />
        {inputErrors.password.error && (
          <Typography variant="subtitle1" className={classes.errorText}>
            {inputErrors.password.message}
          </Typography>
        )}

        <Select
          variant="outlined"
          name="gender"
          value={inputValues.gender}
          error={inputErrors.gender.error}
          fullWidth
          className={classes.input}
          onChange={handleChange}
        >
          <MenuItem value="none">Gender</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="male">Male</MenuItem>
        </Select>
        {inputErrors.gender.error && (
          <Typography variant="subtitle1" className={classes.errorText}>
            {inputErrors.gender.message}
          </Typography>
        )}
        <Select
          variant="outlined"
          name="state"
          value={inputValues.state}
          error={inputErrors.state.error}
          fullWidth
          className={classes.input}
          onChange={handleChange}
        >
          <MenuItem value="none">State</MenuItem>
          {states.map((el) => (
            <MenuItem value={el.id} key={el.id}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
        {inputErrors.state.error && (
          <Typography variant="subtitle1" className={classes.errorText}>
            {inputErrors.state.message}
          </Typography>
        )}
        <Select
          variant="outlined"
          name="lga"
          value={inputValues.lga}
          error={inputErrors.lga.error}
          fullWidth
          className={classes.input}
          onChange={handleChange}
        >
          <MenuItem value="none">Local Government Area</MenuItem>
          <MenuItem value="none" disabled>
            Local Govt. Area
          </MenuItem>
          {inputValues.state !== "none" &&
            getLga(Number(inputValues.state)).map((el) => (
              <MenuItem value={el.id} key={el.id}>
                {el.name}
              </MenuItem>
            ))}
        </Select>
        {inputErrors.lga.error && (
          <Typography variant="subtitle1" className={classes.errorText}>
            {inputErrors.lga.message}
          </Typography>
        )}
        <ButtonWithLoader
          fullWidth
          isloading={isLoading}
          variant="contained"
          color="primary"
          style={{ height: 54 }}
          disabled
          onClick={handleSubmit}
        >
          CREATE ADMIN
        </ButtonWithLoader>
      </div>
    </Paper>
  );

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {body}
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.currentUser.token
});

export default connect(mapStateToProps)(CreateAdminModal);
