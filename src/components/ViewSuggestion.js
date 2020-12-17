import {
  Button,
  IconButton,
  makeStyles,
  Modal,
  Paper,
  Typography
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Api from "../utils/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    // position: "absolute",
    width: 590,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4, 4),
    [theme.breakpoints.down("sm")]: {
      width: window.innerWidth - 60,
      padding: theme.spacing(0)
    }
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
  inputContainer: {
    padding: theme.spacing(0, 5, 0, 5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4)
    }
  }
}));

const ViewSuggestion = ({ message, data, token, reloadData }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  const fetchSuggestion = () => {
    Api(token)
      .viewSuggestion(data.id)
      .then((res) => {
        // console.log(res.data);
        if (res.data.status === "success") {
          reloadData();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (open) {
      fetchSuggestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const body = (
    <Paper className={classes.paper}>
      <div className={classes.closeButtonContainer}>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </div>
      <div className={classes.inputContainer}>
        <Typography variant="h5" className={classes.titleText}>
          Suggestion
        </Typography>
        <div
          style={{
            width: "90%",
            border: "1px solid #243657",
            borderRadius: 4,
            padding: 10
          }}
        >
          <Typography variant="body1">{message}</Typography>
        </div>
      </div>
    </Paper>
  );
  return (
    <div>
      <Button
        style={{ textTransform: "none", textDecorationLine: "underline" }}
        onClick={handleClose}
      >
        View
      </Button>
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
};

const mapStateToProps = (state) => ({
  token: state.currentUser.token
});

export default connect(mapStateToProps)(ViewSuggestion);
