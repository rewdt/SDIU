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
import states from "../utils/constants/states.json";
import ButtonWithLoader from "./ButtonWithLoader";
import getLga from "../helpers/getLga";
import Api from "../utils/api";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    // position: "absolute",
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

function CreateGroupModal({ open, handleClose, reloadData, token }) {
  const classes = useStyles();
  const alert = useAlert();
  const [isLoading, setLoading] = React.useState(false);
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      description: "",
      state: "none",
      lga: "none"
    }
  );

  const [inputErrors, setInputErrors] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: { error: null, message: "" },
      description: { error: null, message: "" },
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
      description: {
        error: errors["description"] ? true : false,
        message: errors["description"] ? errors["description"][0] : ""
      },
      name: {
        error: errors["name"] ? true : false,
        message: errors["name"] ? errors["name"][0] : ""
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

  const addGroup = async (data) => {
    setLoading(true);
    await Api(token)
      .createGroup(data)
      .then((res) => {
        if (res.data.status === "success") {
          alert.success(res.data.message);
          // console.log(res.data);
          setInputValues({
            name: "",
            description: "",
            state: "none",
            lga: "none"
          });
          handleClose();
          reloadData();
        } else {
          handleErrors(res.data.errors);
          alert.error(res.data.message, { position: "top center" });
        }
      })
      .catch((error) => console.log(error));
    setLoading(false);
  };

  const handleSubmit = () => {
    const { name, description, state, lga } = inputValues;
    const data = {
      name,
      description,
      state,
      lga
    };
    addGroup(data);
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
          Create Group
        </Typography>
        <OutlinedInput
          placeholder="Group Name"
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
          placeholder="Group Description"
          name="description"
          value={inputValues.description}
          error={inputErrors.description.error}
          fullWidth
          multiline={true}
          rows={6}
          className={classes.multilineInput}
          onChange={handleChange}
        />
        {inputErrors.description.error && (
          <Typography variant="subtitle1" className={classes.errorText}>
            {inputErrors.description.message}
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
          onClick={handleSubmit}
        >
          CREATE GROUP
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

export default connect(mapStateToProps)(CreateGroupModal);
