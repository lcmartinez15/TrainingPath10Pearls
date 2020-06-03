import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { getCoursesUser } from "../redux/actions/users";
import { deleteCoursesUser } from "../redux/actions/trainingPath";
import TrainingPath from "../components/trainingPath/TrainingPath";
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

import UserProfile from "../components/users/UserProfile";

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

const Profile = ({
  auth: { isAuthenticated, loading, user },
  user: { coursesusers },
  history,
  getCoursesUser,
  deleteCoursesUser,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getCoursesUser(user._id);
  }, [getCoursesUser]);

  const [deleteChecked, setCheckedCourses] = React.useState([]);

  const handleChange = (id) => {
    setCheckedCourses([...deleteChecked, id]);
    console.log(deleteChecked);
  };

  const addCourse = async (e) => {
    e.preventDefault();
    history.push("/availableCourse/" + user._id);
  };

  const removeCourse = async (e) => {
    e.preventDefault();
    deleteCoursesUser(user._id, deleteChecked);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.content}>
        <CardContent>
          <Grid item md={12} xs={12}>
            <UserProfile user={user} />
          </Grid>
          <Grid className={classes.root}>
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
              <Button
                className={classes.addButton}
                color="primary"
                variant="contained"
                onClick={(e) => {
                  removeCourse(e);
                }}
              >
                Remove Courses
              </Button>
            </div>
          </Grid>
          <TrainingPath
            onCheckedDelete={handleChange}
            courses={coursesusers.courses}
          />
        </CardContent>
      </Card>
    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, {
  getCoursesUser,
  deleteCoursesUser,
})(Profile);
