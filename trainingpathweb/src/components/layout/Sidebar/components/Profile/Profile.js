import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
import Spinner from "../../../../layout/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = ({ className, auth: { isAuthenticated, loading, user } }) => {
  console.log(user);
  const classes = useStyles();

  return (
    <div>
      {loading || !user ? (
        <Spinner></Spinner>
      ) : (
        <div className={clsx(classes.root, className)}>
          <Avatar
            alt="Person"
            className={classes.avatar}
            component={RouterLink}
            src={user.avatar}
            to="/settings"
          />
          <Typography className={classes.name} variant="h4" color="primary">
            {user.firstname}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {user.email}
          </Typography>
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Profile);
