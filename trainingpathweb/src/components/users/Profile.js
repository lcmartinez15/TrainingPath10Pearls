import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TrainingPath from "../trainingPath/TrainingPath";
import { getUserById, getCoursesUser } from "../../redux/actions/users";
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

const ProfileUser = ({
  match,
  getUserById,
  getCoursesUser,
  user: { user, loading, coursesusers },
  history,
}) => {
  const classes = useStyles();
  useEffect(() => {
    getUserById(match.params.idUser);
    getCoursesUser(match.params.idUser);
  }, [getUserById, getCoursesUser]);

  const addCourse = async (e) => {
    e.preventDefault();
    console.log("click");
    //getCategory(_id);
    history.push("/availableCourse/" + user._id);
  };

  if (loading || !user) {
    return <Spinner></Spinner>;
  }

  return (
    <div className={classes.root}>
      <Card className={classes.content}>
        <CardContent>
          <Grid container spacing={1}>
            <Avatar className={classes.avatar} src={user.avatar} />
            <Grid item md={6} xs={12}>
              <Typography gutterBottom variant="h2">
                {user.firstname} {user.lastname}
              </Typography>{" "}
              <Typography variant="body1">{user.email}</Typography>{" "}
              <Typography variant="body1">{user.role}</Typography>{" "}
            </Grid>
            <Grid item md={4} xs={4}>
              <div className={classes.row}>
                <Button
                  className={classes.addButton}
                  color="primary"
                  variant="contained"
                  onClick={(e) => {
                    addCourse(e);
                  }}
                >
                  Courses
                </Button>
              </div>
            </Grid>
          </Grid>

          <TrainingPath courses={coursesusers.courses} />
        </CardContent>
      </Card>
    </div>
  );
};

ProfileUser.propTypes = {};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUserById, getCoursesUser })(
  ProfileUser
);
