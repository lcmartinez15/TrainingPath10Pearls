import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import clsx from "clsx";
import { Button } from "@material-ui/core";

import User from "../components/users/user";
import Filter from "../components/users/filter";

import { getUsers } from "../redux/actions/users";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  spacer: {
    flexGrow: 1,
  },
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  addButton: {
    marginRight: theme.spacing(5),
  },
}));

const Users = ({ getUsers, user: { users, loading }, history }) => {
  const classes = useStyles();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onClick = (e) => {
    console.log("register user");
    history.push("/registerUser");
  };

  return (
    <div>
      <div className={clsx(classes.root)}>
        <div className={classes.row}>
          <Button
            className={classes.addButton}
            color="primary"
            variant="contained"
            onClick={(e) => onClick(e)}
          >
            Add User
          </Button>
        </div>
      </div>
      <div className={classes.content}>
        <h1> Users </h1> <Filter />
        <Grid container spacing={2}>
          {" "}
          {users.map((value) => (
            <Grid key={value._id} item>
              <User user={value} />{" "}
            </Grid>
          ))}{" "}
        </Grid>{" "}
      </div>
    </div>
  );
};
Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUsers })(Users);
