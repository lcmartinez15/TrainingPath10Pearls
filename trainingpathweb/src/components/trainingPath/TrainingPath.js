import React, { useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import CourseProgress from "./CourseProgress";
import {
  Card,
  Avatar,
  CardActionArea,
  CardActions,
  CardContent,
  Checkbox,
  LinearProgress,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  img: {
    borderRadius: "50%",
  },
}));

const TrainingPath = ({ onCheckedDelete, idUser, courses }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);

    onCheckedDelete(event.target.value);
  };

  console.log("courses", courses);
  return (
    <Fragment>
      {courses.length > 0 ? (
        courses.map((course) => {
          return (
            <div className={classes.progress}>
              <Checkbox
                color="primary"
                onChange={handleChange}
                value={course.courseRef ? course.courseRef._id : ""}
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <Typography variant="body1">
                <Link
                  to={`/logProcess/${course.courseRef._id}`}
                  variant="body2"
                >
                  {course.courseRef ? course.courseRef.title : ""}: 70%
                </Link>
              </Typography>
              <LinearProgress value={70} variant="determinate" />
            </div>
          );
        })
      ) : (
        <h4>Not found </h4>
      )}
    </Fragment>
  );
};

TrainingPath.defaultProps = {
  courses: [],
};

TrainingPath.propTypes = {};
const mapStateToProps = (state) => ({
  courses: state.user.coursesusers.courses,
});

export default connect(mapStateToProps, {})(TrainingPath);
