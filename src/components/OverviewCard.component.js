import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
// import { MoreHoriz } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  cont: {
    display: "flex",
    justifyContent: "center",
    position: "relative"
    // top: -20
    // alignItems: "center"
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: 119
    // padding: theme.spacing(1)
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 54,
    width: 54,
    marginRight: theme.spacing(2),
    backgroundColor: "#dedede",
    borderRadius: "50%"
  },
  img: {
    height: 22,
    width: 22
  },
  morebtn: {
    width: "100%",
    position: "relative",
    top: -10,
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: theme.spacing(2)
  }
}));

function OverviewCardComponent({ children, title, color, count = 0 }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={6} lg={3}>
      <Paper className={classes.cardContainer}>
        {/* <span className={classes.morebtn}>
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </span> */}
        <div className={classes.cont}>
          <span
            className={classes.imageContainer}
            style={{ backgroundColor: color }}
          >
            <img src={children} alt="item Label" className={classes.img} />
          </span>
          <span>
            <Typography variant="h5" color="secondary" style={{ fontSize: 20 }}>
              {count}
            </Typography>
            <Typography
              variant="subtitle1"
              color="secondary"
              style={{ fontSize: 14, opacity: 0.6 }}
            >
              {title}
            </Typography>
          </span>
        </div>
      </Paper>
    </Grid>
  );
}

export default OverviewCardComponent;
