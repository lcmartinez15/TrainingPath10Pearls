import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Grid,
  colors,
  InputAdornment,
} from "@material-ui/core";

import { login } from "../../redux/actions/auth";
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
    <Paper className={classes.paper}>
      <LockOutlinedIcon className={classes.icon} />

      <Typography variant="h2">Sign in</Typography>
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
          label="Email Address"
          name="email"
          onChange={(e) => onChange(e)}
          value={email}
          autoComplete="email"
        />
        <TextField
          //variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => onChange(e)}
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/resetPassword" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
