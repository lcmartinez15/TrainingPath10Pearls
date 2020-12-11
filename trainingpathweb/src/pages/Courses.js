import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Grid, Button, Box } from "@material-ui/core";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  
  TextField,
} from "@material-ui/core";

//Components
import Course from "../components/courses/Course";
import Filter from "../components/courses/Filter";
import Spinner from "../components/layout/Spinner";
//actions
import { getCourses } from "../redux/actions/course";
//styles
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
    marginBottom: theme.spacing(2)
  },
  addButton: {
    marginRight: theme.spacing(5),
  },
}));

const Courses = ({ getCourses, course: { courses, loading }, history }) => {
  const classes = useStyles();
  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const onClick = (e) => {
    history.push("/addCourse");
  };
  if (loading) {
    return <Spinner></Spinner>;
  }

  return (

    <div className={classes.root}>
      <Card className={classes.root}>
       
        <CardHeader title="Courses Page" />
        <Divider />
        <CardContent>
          {/* <Filter /> */}
          <Box display="flex" flexDirection="row-reverse" p={1} m={1} bgcolor="background.paper">
          <Button
          className={classes.addButton}
          color="primary"
          variant="contained"
          onClick={(e) => onClick(e)}
        >
          Add Course
        </Button>

          </Box>
          <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid key={course._id} item>
            <Course key={course._id} course={course} />
          </Grid>
        ))}
      </Grid>
</CardContent>
</Card>
</div>
   
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
