import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TrainingPath from "../trainingPath/TrainingPath";
import { getUserById, getCoursesUser } from "../../redux/actions/users";
import { deleteCoursesUser } from "../../redux/actions/trainingPath";
import Spinner from "../layout/Spinner";
import {
  Card,
  Avatar,
  Grid,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  details: {
    //display: "",
  },
  avatar: {
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
    marginRight: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(3),
  },
  row: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

const UserProfile = ({
  user: { idUser, avatar, firstname, lastname, email, role },
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Avatar className={classes.avatar} src={avatar} />
        <Grid item md={6} xs={12}>
          <Typography gutterBottom variant="h2">
            {firstname} {lastname}
          </Typography>{" "}
          <Typography variant="body1">{email}</Typography>{" "}
          <Typography variant="body1">{role}</Typography>{" "}
        </Grid>
      </Grid>
    </div>
  );
};

UserProfile.propTypes = {};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(UserProfile);
