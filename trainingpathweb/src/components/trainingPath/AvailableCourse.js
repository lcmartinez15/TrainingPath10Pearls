import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TrainingPath from "../trainingPath/TrainingPath";
import { getAvailableCoursesUser } from "../../redux/actions/users";
import { addAvailableCoursesUser } from "../../redux/actions/trainingPath";

import { setAlert } from "../../redux/actions/alert";

import Spinner from "../layout/Spinner";
import CourseItem from "./courseItem";
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

const AvailableCourse = ({
  match,
  getAvailableCoursesUser,
  addAvailableCoursesUser,
  setAlert,
  user: { availableCourses, loading },
}) => {
  const classes = useStyles();
  useEffect(() => {
    console.log(match.params.idUser);
    getAvailableCoursesUser(match.params.idUser);
  }, [getAvailableCoursesUser]);

  const [checked, setCheckedCourses] = React.useState([]);

  const handleChange = (id) => {
    setCheckedCourses([...checked, id]);
    console.log(checked);
  };

  const addCourse = async (e) => {
    if (checked.length === 0) {
      setAlert("Please select one or more courses", "error");
    } else {
      e.preventDefault();
      addAvailableCoursesUser(checked, match.params.idUser);
      console.log("click");
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.content}>
        {loading || !availableCourses ? (
          <Spinner></Spinner>
        ) : (
          <CardContent>
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
                  Save
                </Button>
              </div>
            </Grid>
            <Grid container spacing={3}>
              {availableCourses.map((courseItem) => (
                <Grid>
                  <CourseItem
                    onChecked={(e) => {
                      handleChange(e);
                    }}
                    key={courseItem._id}
                    course={courseItem}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

AvailableCourse.propTypes = {};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  getAvailableCoursesUser,
  addAvailableCoursesUser,
  setAlert,
})(AvailableCourse);
