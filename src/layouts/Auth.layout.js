import { Grid, Hidden, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import LoginIllustration from "../assets/images/Illustration.svg";

const useStyles = makeStyles((theme) => ({
  section1: {
    height: "100vh",
    backgroundColor: "#e5e5e5"
  },
  section2: {
    height: "100vh",
    backgroundColor: "#31A05F"
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: theme.spacing(0, 8)
    // backgroundColor: "green"
  },
  img: {
    objectFit: "contain",
    marginBottom: theme.spacing(1)
  },
  subtitleCont: { fontSize: 16, marginBottom: theme.spacing(2) }
}));

function AuthLayout({ children, title, description, image }) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6} className={classes.section1}>
        <Paper elevation={0} className={classes.content}>
          {image && (
            <img
              src={LoginIllustration}
              alt="login illustration"
              className={classes.img}
            />
          )}
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle1" className={classes.subtitleCont}>
            {description}
          </Typography>
          {children}
        </Paper>
      </Grid>
      <Hidden smDown>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          className={classes.section2}
        ></Grid>
      </Hidden>
    </Grid>
  );
}

export default AuthLayout;
