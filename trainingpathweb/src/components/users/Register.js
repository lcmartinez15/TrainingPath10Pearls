import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { registerUser } from "../../redux/actions/users";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import PropTypes from "prop-types";

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

const Register = ({ registerUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "tempo",
    role: "",
    status: "active",
  });
  const classes = useStyles();
  const { firstname, lastname, email, password, role, status } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    registerUser(firstname, lastname, email, password, role, status);
  };

  //redirect
  return (
    <div className={classes.root}>
      <Card className={classes.root}>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <CardHeader
            subheader="The information can be edited"
            title="Create Account"
          />
          <Divider />
          <CardContent>
            <div className="form-group">
              <TextField
                type="text"
                name="firstname"
                value={firstname}
                onChange={(e) => onChange(e)}
                required
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <TextField
                type="text"
                name="lastname"
                value={lastname}
                onChange={(e) => onChange(e)}
                required
                fullWidth
                helperText="Please specify Last Name"
                label="Last Name"
                margin="dense"
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <TextField
                type="email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
                fullWidth
                helperText="Please specify Email Address"
                label="Email Address"
                margin="dense"
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <TextField
                type="text"
                placeholder="Role"
                name="role"
                value={role}
                onChange={(e) => onChange(e)}
                required
                fullWidth
                helperText="Please specify the Role"
                label="Role"
                margin="dense"
                variant="outlined"
              />
            </div>

            <Button
              className={classes.addButton}
              color="primary"
              type="submit"
              variant="contained"
            >
              Register
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { registerUser })(Register);
