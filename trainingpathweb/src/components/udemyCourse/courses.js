import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";

import { Container, Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CourseItem from "../udemyCourse/courseItem";

import { Grid } from "@material-ui/core";

import { getCoursesUdemy } from "../../redux/actions/course";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "25ch",
    },
  },
}));

const CoursesUdemy = () => {
  const [courses, setcourses] = React.useState([]);
  const [search, setSearch] = React.useState([]);

  const classes = useStyles();
  const onSubmit = async (e) => {
    const data = await getCoursesUdemy(search);
    setcourses(data);
    console.log(data);
  };

  const onChange = (e) => setSearch(e.target.value);

  return (
    <Fragment>
      <h1> Courses Udemy Page </h1>{" "}
      <div className="form-group">
        <input
          type="text"
          placeholder="search"
          name="search"
          value={search}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <Button
        type="submit"
        value="Login"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SearchIcon />}
        onClick={(e) => onSubmit(e)}
      >
        Search{" "}
      </Button>{" "}
      <Grid container spacing={2}>
        {" "}
        {courses ? (
          courses.map((course) => (
            <Grid>
              <CourseItem key={course._id} course={course} />{" "}
            </Grid>
          ))
        ) : (
          <div> no courses found </div>
        )}{" "}
      </Grid>{" "}
    </Fragment>
  );
};

CoursesUdemy.propTypes = {};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { getCoursesUdemy })(CoursesUdemy);
