import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import User from "../components/users/user";
import Filter from "../components/users/filter";

import { getUsers } from "../redux/actions/users";

const Users = ({ getUsers, user: { users, loading } }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Fragment>
      <h1> UserPage </h1> <Filter />
      <Link to="/registerUser"> Register </Link>{" "}
      <Grid container spacing={2}>
        {" "}
        {users.map((value) => (
          <Grid key={value} item>
            <User key={value._id} user={value} />{" "}
          </Grid>
        ))}{" "}
      </Grid>{" "}
    </Fragment>
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
