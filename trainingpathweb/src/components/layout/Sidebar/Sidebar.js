import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, Drawer } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ImageIcon from "@material-ui/icons/Image";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import {
  Dashboard,
  LocalLibrary,
  People,
  Person,
  Category,
  ExitToApp,
} from "@material-ui/icons";

import Profile from "./components/Profile/Profile";
import SidebarNav from "./components/SidebarNav/SidebarNav";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
    background: "linear-gradient(25deg, #607D8B 0%, #3A454A  100%)", //"url(logobanner.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const Sidebar = ({ open, variant, onClose, className,auth: { isAuthenticated, loading, user }, ...rest }) => {
  
console.log(user);
  const classes = useStyles();

  const pagesAdmin = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Dashboard />,
    },
    {
      title: "Users",
      href: "/users",
      icon: <People />,
    },
    {
      title: "Categories",
      href: "/categories",
      icon: <Category />,
    },
    {
      title: "Courses",
      href: "/courses",
      icon: <LocalLibrary />,
    },
  ];

  const pages = [
    {
      title: "Dashboard",
      href: "/userdashboard",
      icon: <Dashboard />,
    },
    {
      title: "Courses",
      href: "/courses",
      icon: <LocalLibrary />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={user && user.role==="admin" ? pagesAdmin:pages} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Sidebar);
