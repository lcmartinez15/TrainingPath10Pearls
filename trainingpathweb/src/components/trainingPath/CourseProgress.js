import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
});

const CourseProgress = ({ auth, course, showActions }) => {
  console.log(course);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent className={classes.action}>
          <Typography gutterBottom variant="h5" component="h2">
            {course.courseRef ? course.courseRef.title : ""}
          </Typography>{" "}
          {course ? course.status : ""}
        </CardContent>{" "}
      </CardActionArea>{" "}
    </Card>
  );
};

CourseProgress.defaultProps = {
  showActions: true,
};

CourseProgress.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(CourseProgress);
