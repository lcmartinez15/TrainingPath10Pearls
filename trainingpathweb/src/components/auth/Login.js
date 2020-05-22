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

const Login = ({ login, isAuthenticated }) => {
  console.log(isAuthenticated);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const classes = useStyles();
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    login(email, password);
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <Fragment>
      <GridContainer justify="center">
        <GridItem>
          <h1> Sing In </h1>{" "}
          <form onSubmit={(e) => onSubmit(e)} className={classes.root}>
            <div>
              <Input
                placeholder="email address"
                inputProps={{ "aria-label": "description" }}
                type="email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />{" "}
            </div>{" "}
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
            <Button
              type="submit"
              value="Login"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Login{" "}
            </Button>{" "}
          </form>{" "}
        </GridItem>{" "}
      </GridContainer>{" "}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
