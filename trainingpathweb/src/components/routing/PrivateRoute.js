import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  roles,
  isReset,
  ...rest
}) => (

  <Route
    {...rest}
    render={(props) =>
      isAuthenticated && !loading ? (roles && roles.indexOf(user.role) !== -1 ? (
        <Component {...props} />
      ):(<Redirect to="/dashboard" />)) : ( isReset ? <Component {...props} />:
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
