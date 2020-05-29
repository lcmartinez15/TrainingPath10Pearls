import React, { Fragment } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../redux/actions/auth";

import { makeStyles } from "@material-ui/core/styles";
import {
  BottomNavigation,
  AppBar,
  BottomNavigationAction,
} from "@material-ui/core";
import {
  Dashboard,
  LocalLibrary,
  People,
  Person,
  Category,
  ExitToApp,
} from "@material-ui/icons";

const useStyles = makeStyles({
  root: {},
});

const Navbar = ({ logout, isAuthenticated, user }) => {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const onClick = (e) => {
    console.log("onclick");
    e.preventDefault();
    history.push(`/${e.currentTarget.name}`);
  };
  const validateRoleOptions = () => {
    console.log(user);
    return user && user.role == "admin" ? (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="Dasboard"
          name="dashboard"
          onClick={(e) => onClick(e)}
          icon={<Dashboard />}
        />{" "}
        <BottomNavigationAction
          label="courses"
          name="courses"
          onClick={(e) => onClick(e)}
          icon={<LocalLibrary />}
        />{" "}
        <BottomNavigationAction
          label="users"
          name="users"
          onClick={(e) => onClick(e)}
          icon={<People />}
        />{" "}
        <BottomNavigationAction
          label="categories"
          name="categories"
          onClick={(e) => onClick(e)}
          icon={<Category />}
        />{" "}
        <BottomNavigationAction
          label="profile"
          name="profile"
          onClick={(e) => onClick(e)}
          icon={<Person />}
        />{" "}
        <BottomNavigationAction
          label="Logout"
          href="#!"
          onClick={logout}
          icon={<ExitToApp />}
        />{" "}
      </BottomNavigation>
    ) : (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="Dasboard"
          name="dashboard"
          onClick={(e) => onClick(e)}
          icon={<Dashboard />}
        />{" "}
        <BottomNavigationAction
          label="profile"
          name="profile"
          onClick={(e) => onClick(e)}
          icon={<Person />}
        />{" "}
        <BottomNavigationAction
          label="Logout"
          href="#!"
          onClick={logout}
          icon={<ExitToApp />}
        />{" "}
      </BottomNavigation>
    );
  };
  const authLinks = validateRoleOptions();
  const guestLinks = <div> </div>;
  return (
    <Fragment>
      <AppBar position="static">
        {isAuthenticated ? authLinks : guestLinks}
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
