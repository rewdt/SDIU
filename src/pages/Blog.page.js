import {
  Button,
  Grid,
  makeStyles,
  OutlinedInput,
  Paper,
  Typography
} from "@material-ui/core";
import { AttachFile } from "@material-ui/icons";
import React, { useReducer, useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ButtonWithLoader from "../components/ButtonWithLoader";
import AdminLayout from "../layouts/Admin.layout";
import Api from "../utils/api";

const useStyles = makeStyles((theme) => ({
  root: {
    height: window.innerHeight - 150,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: theme.spacing(2)
  },
  formContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "red",
    padding: 0,
    margin: theme.spacing(3, 0, 2, 0)
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end"
  },
  button: {
    width: 300,
    height: 54
  },
  sect1: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // height: 36,
    padding: theme.spacing(1, 0, 1, 1)
  },
  uploadbtn: {
    border: "1px solid #31A05F",
    color: "#31A05F",
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 5,
    height: 31,
    width: 115
  },
  imgLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  errorText: {
    color: "red",
    fontSize: 10
  }
}));

function BlogPage({ User, token }) {
  const classes = useStyles();
  const alert = useAlert();
  const history = useHistory();

  const [isLoading, setLoading] = useState(false);
  const [featured_image, setFeaturedImage] = useState(null);
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: "",
      content: ""
    }
  );

  const [inputErrors, setInputErrors] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: "",
      content: ""
    }
  );

  const handleErrors = (errors) => {
    const allErrors = {
      title: {
        error: errors["title"] ? true : false,
        message: errors["title"] ? errors["title"][0] : ""
      },
      content: {
        error: errors["content"] ? true : false,
        message: errors["content"] ? errors["content"][0] : ""
      }
    };
    setInputErrors(allErrors);
  };

  const handleSubmit = async () => {
    var formData = new FormData();
    const { id } = User;
    console.log({ User });
    let slug =
      inputValues.title.toLowerCase().replace(/ /gi, "_") +
      Date.now().toString();
    formData.append("author", id);
    formData.append("title", inputValues.title);
    formData.append("slug", slug);
    formData.append("content", inputValues.content);
    if (featured_image) {
      formData.append("featured_image", featured_image);
    }
    setLoading(true);
    await Api(token)
      .createBlog(formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          // console.log(res.data);
          history.push("/blog");
        } else {
          if (res.data.errors) {
            handleErrors(res.data.errors);
            alert.error(res.data.message);
          }
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputValues({ [name]: value });
  };

  const handleImageSelect = ({ target }) => {
    var fileName = target.value;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
      setFeaturedImage(target.files[0]);
    } else {
      alert.error("Only jpg/jpeg and png files are allowed!");
    }
  };
  return (
    <AdminLayout route="Blog">
      <Paper className={classes.root}>
        <div>
          <Typography variant="h6" style={{ marginBottom: 20 }}>
            Add New Post
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <OutlinedInput
                name="title"
                value={inputValues.title}
                error={inputErrors.title.error}
                placeholder="Blog post title"
                fullWidth
                onChange={handleChange}
              />
              {inputErrors.title.error && (
                <Typography variant="subtitle1" className={classes.errorText}>
                  {inputErrors.title.message}
                </Typography>
              )}
            </Grid>
            {/* <Grid item xs={12} md={3} lg={3}>
              <Select variant="outlined" fullWidth value="author">
                <MenuItem value="author">Author</MenuItem>
              </Select>
            </Grid> */}
          </Grid>
        </div>
        <div className={classes.formContainer}>
          <div className={classes.sect1}>
            <input
              id="actual-btn"
              variant="outlined"
              placeholder="Add Media"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageSelect}
            />
            <label htmlFor="actual-btn" className={classes.uploadbtn}>
              <AttachFile />
              Add media
            </label>
            {featured_image && (
              <div className={classes.imgLabel}>
                <Typography>{featured_image.name}</Typography>
                <Button
                  style={{ color: "#fb0201" }}
                  onClick={() => setFeaturedImage(null)}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
          <OutlinedInput
            name="content"
            value={inputValues.content}
            error={inputErrors.content.error}
            multiline
            rows={12}
            // style={{ height: "100%" }}
            onChange={handleChange}
          />
          {inputErrors.content.error && (
            <Typography variant="subtitle1" className={classes.errorText}>
              {inputErrors.content.message}
            </Typography>
          )}
        </div>
        <div className={classes.buttonContainer}>
          <ButtonWithLoader
            isloading={isLoading}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
          >
            Publish
          </ButtonWithLoader>
        </div>
      </Paper>
    </AdminLayout>
  );
}

const mapStateToProps = (state) => ({
  User: state.currentUser.user,
  token: state.currentUser.token
});

export default connect(mapStateToProps)(BlogPage);
