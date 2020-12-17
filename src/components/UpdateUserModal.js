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

function UpdateUserModal({ open, params, handleClose, reloadData, token }) {
  //   console.log(params);
  const classes = useStyles();
  const alert = useAlert();
  const [isLoading, setLoading] = React.useState(false);
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: params.name,
      email: params.email,
      phone_number: params.phone_number,
      gender: params.gender,
      status: params.status ? "1" : "0"
    }
  );

  const [inputErrors, setInputErrors] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: { error: null, message: "" },
      email: { error: null, message: "" },
      phone_number: { error: null, message: "" },
      gender: { error: null, message: "" },
      status: { error: null, message: "" }
    }
  );

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputValues({ [name]: value });
  };

  const handleErrors = (errors) => {
    // console.log(errors);
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
      gender: {
        error: errors["gender"] ? true : false,
        message: errors["gender"] ? errors["gender"][0] : ""
      },
      status: {
        error: errors["status"] ? true : false,
        message: errors["status"] ? errors["status"][0] : ""
      }
    };
    setInputErrors(allErrors);
  };

  const addAdmin = async (data) => {
    setLoading(true);
    await Api(token)
      .updateUser(params.id, data)
      .then((res) => {
        // console.log(res.data);
        if (res.data.status === "success") {
          alert.success("User has been updated successfully");
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
    const { name, email, phone_number, gender, status } = inputValues;
    const data = {
      name,
      email,
      phone_number,
      gender,
      status
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
          Edit User
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
          name="status"
          value={inputValues.status}
          error={inputErrors.status.error}
          fullWidth
          className={classes.input}
          onChange={handleChange}
        >
          <MenuItem value="none">Status</MenuItem>
          <MenuItem value="1">Enabled</MenuItem>
          <MenuItem value="0">Disabled</MenuItem>
        </Select>
        {inputErrors.status.error && (
          <Typography variant="subtitle1" className={classes.errorText}>
            {inputErrors.status.message}
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
          EDIT USER
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

export default connect(mapStateToProps)(UpdateUserModal);
