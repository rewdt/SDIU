import React, { useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  IconButton,
  OutlinedInput,
  Paper,
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

function SendGroupMessage({ open, handleClose, reloadData, params, token }) {
  const classes = useStyles();
  const alert = useAlert();
  const [isLoading, setLoading] = React.useState(false);
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      message: ""
    }
  );

  const [inputErrors, setInputErrors] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      message: { error: null, message: "" }
    }
  );

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputValues({ [name]: value });
  };

  const handleErrors = (errors) => {
    console.log(errors);
    const allErrors = {
      message: {
        error: errors["message"] ? true : false,
        message: errors["message"] ? errors["message"][0] : ""
      }
    };
    setInputErrors(allErrors);
  };

  const addGroup = async (data) => {
    setLoading(true);
    await Api(token)
      .sendGroupMessage(params.id, data)
      .then((res) => {
        if (res.data.status === "success") {
          // console.log(res.data);
          alert.success(res.data.message);
          setInputValues({
            message: ""
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
    const { message } = inputValues;
    const data = {
      message
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
          Send Message
        </Typography>
        <OutlinedInput
          placeholder="Group Description"
          name="message"
          value={inputValues.message}
          error={inputErrors.message.error}
          fullWidth
          multiline={true}
          rows={10}
          className={classes.multilineInput}
          onChange={handleChange}
        />
        {inputErrors.message.error && (
          <Typography variant="subtitle1" className={classes.errorText}>
            {inputErrors.message.message}
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
          SEND MESSAGE
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

export default connect(mapStateToProps)(SendGroupMessage);
