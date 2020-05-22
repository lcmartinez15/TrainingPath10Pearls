import React, { Fragment, useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { Container, Button, Input } from "@material-ui/core";
import GridContainer from "../grid/GridContainer.js";
import GridItem from "../grid/GridItem.js";
import { login } from "../../redux/actions/auth";
import { setAlert } from "../../redux/actions/alert";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  container: {
    background: withRouter,
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "25ch",
    },
  },
}));

const ResetPassword = ({ setAlert, resetPassword, isAuthenticated, match }) => {
  console.log(match.params.id);
  console.log(match.params.token);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = formData;
  const classes = useStyles();
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("password errorr");
      setAlert("password doesn't coincide", "error");
    } else {
      resetPassword(password);
    }
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <Fragment>
      <GridContainer justify="center">
        <GridItem>
          <h1> Reset password </h1>{" "}
          <form onSubmit={(e) => onSubmit(e)} className={classes.root}>
            <div>
              <Input
                type="password"
                placeholder="password"
                inputProps={{ "aria-label": "description" }}
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />{" "}
            </div>{" "}
            <div>
              <Input
                type="password"
                placeholder="Confirm password"
                inputProps={{ "aria-label": "description" }}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => onChange(e)}
              />{" "}
            </div>{" "}
            <Button
              type="submit"
              value="Login"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Reset{" "}
            </Button>{" "}
          </form>{" "}
        </GridItem>{" "}
      </GridContainer>{" "}
    </Fragment>
  );
};

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, login })(ResetPassword);
