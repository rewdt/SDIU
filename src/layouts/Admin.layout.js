import { makeStyles } from "@material-ui/core";
import React from "react";
import NavbarComponent from "../components/Navbar.component";
import SideBarComponent from "../components/SideBar.component";
import { drawerWidth } from "../utils/constants";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    [theme.breakpoints.up("md")]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    padding: theme.spacing(3, 3, 3, 3),
    minHeight: "92vh",
    backgroundColor: "#f3f7fa"
  }
}));

function AdminLayout({ children, route }) {
  const classes = useStyles();
  return (
    <div>
      <SideBarComponent route={route} />
      <NavbarComponent />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
