import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { ReactComponent as Spaceman } from "../assets/images/spaceman.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%"
  },
  item: { padding: theme.spacing(0, 3) },
  btn: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1, 5),
    borderWidth: 2,
    borderRadius: 20
  }
}));
function Error404Page() {
  const classes = useStyles();
  return (
    <div>
      <Grid container alignItems="center" className={classes.root}>
        <Grid item xs={12} md={6} lg={6} className={classes.item}>
          <Paper elevation={0}>
            <Spaceman />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6} className={classes.item}>
          <Paper elevation={0}>
            <div>
              <Typography variant="h1">404</Typography>
              <Typography variant="h3">UH OH! You're lost.</Typography>
              <Typography variant="body">
                The page you are looking for does not exist. How you got here is
                a mystery.
                <br />
                But you can click the button below to go back to the homepage
              </Typography>
            </div>
            <Button
              variant="outlined"
              color="primary"
              className={classes.btn}
              href="/"
            >
              HOME
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Error404Page;
