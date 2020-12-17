import {
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import { Room } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import lodash from "lodash";
import {
  LineSegment,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryTheme
} from "victory";
import OverviewCardComponent from "../components/OverviewCard.component";
import AdminLayout from "../layouts/Admin.layout";
import RegisteredUser from "../assets/images/registered_user.png";
import ActiveGroup from "../assets/images/active_group.png";
import InactiveGroup from "../assets/images/inactive_group.png";
import Suggestions from "../assets/images/suggestions.png";
import HollowImage from "../assets/images/hollow_image.svg";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "../assets/styles/progress-bar.css";
import Api from "../utils/api";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container1: { marginBottom: theme.spacing(2) },
  container2: {
    [theme.breakpoints.up("md")]: {
      height: 302
    }
    // overflow: "hidden"
  },
  topSection: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 3),
    justifyContent: "space-between",
    flexDirection: "row",
    height: 59,
    borderBottom: "1px solid #e9eaea"
  },
  mnthBtn: {
    fontSize: 14,
    textTransform: "none",
    fontFamily: "MuseoSansRounded500"
  },
  topSectionTitle: {
    color: "#243657",
    fontSize: 16
  },
  barContainer: {
    height: 242,
    width: "100%"
    // display: 'none'
    // backgroundColor: "red"
  },
  stateItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1)
  },
  stateItemContainer: {
    height: 242,
    padding: theme.spacing(3, 3, 2, 3),
    overflowY: "scroll"
  },
  room: {
    color: "#252D31",
    opacity: 0.5
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    marginRight: 20
  },
  legendIndicator: {
    borderRadius: "50%",
    height: 7,
    width: 7,
    marginLeft: 10
  }
}));

const UserStateItem = ({ item }) => {
  const classes = useStyles();

  return (
    <div className={classes.stateItem}>
      <Room className={classes.room} />
      <Typography
        variant="body1"
        className={classes.room}
        style={{ fontSize: 14 }}
      >
        {item.state.name}
      </Typography>
      <Typography variant="body1" style={{ fontSize: 14, color: "#252d31" }}>
        {item.user_count}
      </Typography>
    </div>
  );
};

function OverviewPage({ token }) {
  const classes = useStyles();
  const [details, setDetails] = useState({});
  useEffect(() => {
    Api(token)
      .getAdminDetails()
      .then((res) => {
        // console.log(res.data);
        if (res.data.status === "success") {
          setDetails(res.data.data);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!lodash.isEmpty(details)) {
    return (
      <AdminLayout route="Overview">
        <Grid container spacing={2} className={classes.container1}>
          <OverviewCardComponent
            color="#eff7fc"
            title="Total Registered"
            count={details.totalRegistered}
          >
            {RegisteredUser}
          </OverviewCardComponent>
          <OverviewCardComponent
            color="#ecf9ff"
            title="Active Groups"
            count={details.activeGroups}
          >
            {ActiveGroup}
          </OverviewCardComponent>
          <OverviewCardComponent
            color="#fdf3ef"
            title="Inactive Groups"
            count={details.inactiveGroups}
          >
            {InactiveGroup}
          </OverviewCardComponent>
          <OverviewCardComponent
            color="#feeff3"
            title="Suggestions"
            count={details.totalSuggestions}
          >
            {Suggestions}
          </OverviewCardComponent>
        </Grid>
        <Grid container spacing={2} className={classes.container2}>
          <Grid item xs={12} sm={12} md={12} lg={9}>
            <Paper style={{ width: "100%", height: "100%" }}>
              <div className={classes.topSection}>
                <Typography
                  variant="h5"
                  className={classes.topSectionTitle}
                  style={{ fontSize: 18 }}
                >
                  Male Vs. Female Statistic
                </Typography>
                <span className="row">
                  {/* <Typography variant="body1" className="text">
                    Show
                  </Typography> */}
                  {/* <Button
                    color="secondary"
                    className={classes.mnthBtn}
                    endIcon={<KeyboardArrowDown />}
                  >
                    by months
                  </Button> */}
                </span>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <Paper className={classes.barContainer} elevation={0}>
                    <VictoryChart
                      theme={VictoryTheme.material}
                      width={800}
                      padding={{ left: 80, right: 80, top: 40, bottom: 40 }}
                    >
                      <VictoryAxis
                        style={{
                          grid: { strokeWidth: 0 },
                          ticks: { strokeWidth: 0 },
                          axis: {
                            strokeWidth: 1,
                            stroke: "#252D31",
                            opacity: 0.3
                          }
                        }}
                      />
                      <VictoryAxis
                        dependentAxis
                        gridComponent={<LineSegment type="dot" />}
                        style={{
                          grid: { stroke: "#818e99", strokeWidth: 0.5 },
                          axis: { strokeWidth: 0 },
                          ticks: { strokeWidth: 0 }
                        }}
                      />
                      <VictoryGroup
                        offset={20}
                        colorScale={["#FC9E12", "#31A05F"]}
                      >
                        <VictoryBar
                          barWidth={15}
                          cornerRadius={{ top: 6 }}
                          data={details["maleVsFemaleBarchart"].female}
                          x="month_year"
                          y="total"
                        />
                        <VictoryBar
                          barWidth={15}
                          cornerRadius={{ top: 6 }}
                          data={details["maleVsFemaleBarchart"].male}
                          x="month_year"
                          y="total"
                        />
                      </VictoryGroup>
                    </VictoryChart>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Paper
                    className={classes.barContainer}
                    elevation={0}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around"
                    }}
                  >
                    <div
                      style={{
                        height: 120,
                        width: 120,
                        marginTop: 20
                      }}
                    >
                      <CircularProgressbarWithChildren
                        value={
                          details.maleVsFemaleDougnut.find(
                            (user) => user.gender === "male"
                          ).percentage
                        }
                        // text={`${percentage}%`}
                      >
                        <img
                          style={{ marginTop: -5 }}
                          src={HollowImage}
                          alt="pie"
                        />
                      </CircularProgressbarWithChildren>
                    </div>
                    <div className="row">
                      <div className={classes.legendItem}>
                        <Typography>Male</Typography>
                        <div
                          className={classes.legendIndicator}
                          style={{
                            backgroundColor: "#31A05F"
                          }}
                        />
                      </div>
                      <div className={classes.legendItem}>
                        <Typography>Female</Typography>
                        <div
                          className={classes.legendIndicator}
                          style={{
                            backgroundColor: "#FC9E12"
                          }}
                        />
                      </div>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Paper style={{ width: "100%", height: "100%" }}>
              <div className={classes.topSection}>
                <Typography variant="h5" className={classes.topSectionTitle}>
                  Users by State
                </Typography>
                <div>
                  {/* <IconButton>
                    <KeyboardArrowDown />
                  </IconButton> */}
                </div>
              </div>
              <div className={classes.stateItemContainer}>
                {details.usersCount.map((el, i) => (
                  <UserStateItem key={i} item={el} />
                ))}
              </div>
            </Paper>
          </Grid>
        </Grid>
        {/* What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and
      typesetting industry Lorem Ipsum has been the industry's standard dummy
      text ever since the 1500s when an unknown printer took a galley of type
      and scrambled it to make a type specimen book it has? */}
      </AdminLayout>
    );
  }
  return (
    <AdminLayout route="Overview">
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          paddingTop: "40vh",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CircularProgress />
      </div>
    </AdminLayout>
  );
}

const mapStateToProps = (state) => ({
  token: state.currentUser.token
});

export default connect(mapStateToProps)(OverviewPage);
