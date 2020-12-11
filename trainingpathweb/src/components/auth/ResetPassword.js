import React, { Fragment, useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { Container, Button, Input } from "@material-ui/core";
import GridContainer from "../grid/GridContainer.js";
import GridItem from "../grid/GridItem.js";
import { resetPassword } from "../../redux/actions/auth";
import { setAlert } from "../../redux/actions/alert";
import {
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Grid,
  colors,
  InputAdornment,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircle from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    width: "40vw",
    border: "7rem",
  },

  icon: {
    fontSize: 70,
    color: theme.palette.icon,
  },
  form: {
    width: "60%", // Fix IE 11 issue.
    margin: theme.spacing(3, 3, 3, 3),
  },
  input: {
    //backgroundColor: "",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetPassword = ({user,token, setAlert, resetPassword, isAuthenticated, match }) => {
  console.log(user);
  console.log(token);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    user:user,
    token: token
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
      resetPassword(user, password);
    }
  };

   if (isAuthenticated) return <Redirect to="/dashboard" />;

    return (
      <Paper className={classes.paper}>
        <LockOutlinedIcon className={classes.icon} />
  
        <Typography variant="h2">Reset password</Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={(e) => onSubmit(e)}
        >
          <TextField
            // variant="outlined"
            margin="normal"
            required
            fullWidth
            id="input-with-icon-grid"
            label="password"
            name="password"
            onChange={(e) => onChange(e)}
            value={password}
          />
          <TextField
            //variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => onChange(e)}
            id="password"
            autoComplete="current-password"
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Reset
          </Button>
          
        </form>
      </Paper>
    );
  };

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, resetPassword })(ResetPassword);
