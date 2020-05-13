import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../redux/actions/auth";

const Navbar = ({ logout, isAuthenticated }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"> </i>
          <span className="hide-sm"> Dashboard </span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sing-out-alt"> </i>{" "}
          <span className="hide-sm"> Logout </span>{" "}
        </a>{" "}
      </li>{" "}
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/login"> Login </Link>{" "}
      </li>
    </ul>
  );
  return (
    <Fragment>
      <h1> Navbar </h1>
      {isAuthenticated ? authLinks : guestLinks}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
