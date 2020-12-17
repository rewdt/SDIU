import {
  Button,
  Drawer,
  Hidden,
  List,
  ListItem,
  makeStyles,
  Typography,
  useTheme
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import adminSidebarRoutes from "../routes/AdminSidebar.route";
import { drawerWidth } from "../utils/constants";
import Logo from "./Logo";
import LogoutIcon from "../assets/images/logout_icon.svg";
import { toggleMobileMenu } from "../redux/actions/mobileMenu";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  LogoContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: theme.spacing(1)
  },
  btn: {
    height: 50,
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: theme.spacing(4),
    width: "100%"
  },
  link: {
    textDecorationLine: "none",
    width: "100%"
  },
  listContainer: {
    paddingTop: theme.spacing(5)
  },
  listItemStyle: {
    padding: theme.spacing(0, 3),
    marginBottom: theme.spacing(1)
  },
  logoutContainer: {
    marginTop: theme.spacing(16)
  }
}));

function SideBarComponent({
  route,
  isMenuVisible,
  toggleMobileMenu: showMobileMenu
}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: "USER_LOGOUT" });
    history.push("/");
  };

  const drawer = (
    <div>
      <div className={classes.LogoContainer}>
        <Logo />
      </div>
      <List className={classes.listContainer}>
        {adminSidebarRoutes.map((item, index) => (
          <ListItem key={index} className={classes.listItemStyle}>
            <Link to={item.path} className={classes.link}>
              <Button
                className={classes.btn}
                style={{
                  color: route === item.pathName ? "#ffffff" : "#9EA5B8"
                }}
                variant={route === item.pathName ? "contained" : "text"}
                color="primary"
                // disableElevation
                startIcon={
                  <img
                    src={
                      route === item.pathName
                        ? item.activeIcon
                        : item.inactiveIcon
                    }
                    alt="button icon"
                  />
                }
              >
                <Typography
                  variant="h5"
                  style={{ fontSize: 14, textTransform: "none" }}
                >
                  {item.pathName}
                </Typography>
              </Button>
            </Link>
          </ListItem>
        ))}
        <ListItem
          className={clsx(classes.listItemStyle, classes.logoutContainer)}
        >
          <Button
            onClick={logout}
            className={classes.btn}
            style={{ fontSize: 14, textTransform: "none", color: "#FF3D3D" }}
            color="primary"
            // disableElevation
            startIcon={<img src={LogoutIcon} alt="logout" />}
          >
            Logout
          </Button>
        </ListItem>
      </List>
    </div>
  );
  return (
    <nav className={classes.drawer}>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={isMenuVisible}
          onClose={() => showMobileMenu()}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          open
          variant="permanent"
          style={{ width: "50vw" }}
          classes={{ paper: classes.drawerPaper }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

const mapStateToProps = ({ mobileMenu }) => ({
  isMenuVisible: mobileMenu.isMenuVisible
});

const mapDispatchToProps = { toggleMobileMenu };

export default connect(mapStateToProps, mapDispatchToProps)(SideBarComponent);
