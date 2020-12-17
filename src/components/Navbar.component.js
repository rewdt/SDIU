import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { drawerWidth } from "../utils/constants";
import { Avatar, Hidden, IconButton } from "@material-ui/core";
import { KeyboardArrowDown, Menu } from "@material-ui/icons";
import Logo from "./Logo";
import { toggleMobileMenu } from "../redux/actions/mobileMenu";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#FDFEFF",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end"
  },
  toolbarMobile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  profilebtn: {
    color: "#737A89",
    textTransform: "none"
  },
  avatar: {
    width: 34,
    height: 34
  }
}));

const NavbarComponent = (props) => {
  const classes = useStyles();
  // const User = JSON.parse(localStorage.getItem("user"));
  const { User } = props;

  return (
    <div>
      <AppBar position="fixed" elevation={0} className={classes.appBar}>
        <Hidden smDown>
          <Toolbar className={classes.toolbar}>
            <Button
              className={classes.profilebtn}
              startIcon={
                <Avatar
                  alt="Profile Picture"
                  src="https://icon-library.net//images/default-user-icon/default-user-icon-6.jpg"
                  className={classes.avatar}
                />
              }
              endIcon={<KeyboardArrowDown />}
            >
              {User ? User.name : null}
            </Button>
          </Toolbar>
        </Hidden>
        <Hidden mdUp>
          <Toolbar className={classes.toolbarMobile}>
            <Logo />
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={() => props.toggleMobileMenu()}
            >
              <Menu style={{ color: "black" }} />
            </IconButton>
          </Toolbar>
        </Hidden>
      </AppBar>
    </div>
  );
};
const mapDispatchToProps = { toggleMobileMenu };

const mapStateToProps = (state) => ({
  User: state.currentUser.user
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
