import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Profile = ({ auth: { isAuthenticated, loading, user } }) => {
  console.log(user);
  return (
    <Fragment>
      <h1> ProfilePage </h1>
      <img class="round-img my-1" src={user.avatar} alt="" />
      <h1>
        {user.firstname} {user.lastname}
      </h1>
      <h1>{user.role}</h1>
    </Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Profile);
