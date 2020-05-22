import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Course from "../components/courses/Course";
import Filter from "../components/courses/Filter";

import { Grid } from "@material-ui/core";

import { getCourses } from "../redux/actions/course";

const Courses = ({ getCourses, course: { courses, loading } }) => {
  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <Fragment>
      <h1> CoursesPage </h1> <Filter />
      <Link to="/addCourse"> New Course </Link>{" "}
      <Grid container spacing={2}>
        {" "}
        {courses.map((course) => (
          <Grid key={course._id} item>
            <Course key={course._id} course={course} />{" "}
          </Grid>
        ))}{" "}
      </Grid>{" "}
    </Fragment>
  );
};

Courses.propTypes = {
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, { getCourses })(Courses);
