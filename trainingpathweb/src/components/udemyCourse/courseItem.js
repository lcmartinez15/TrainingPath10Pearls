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
import { getChaptersCoursesUdemy } from "../../redux/actions/course";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
});

const CourseItem = ({ getChaptersCoursesUdemy, auth, course, showActions }) => {
  const classes = useStyles();
  const onClick = (e) => {
    console.log("onclick");
    getChaptersCoursesUdemy(course);
  };

  console.log(course);
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={(e) => onClick()}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={course.image_240x135}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.action}>
          <Typography gutterBottom variant="h5" component="h2">
            {" "}
            {course.title}{" "}
          </Typography>{" "}
          <Typography variant="body2" color="textSecondary" component="p">
            {course.headline}
          </Typography>{" "}
        </CardContent>{" "}
      </CardActionArea>{" "}
      <CardActions>
        <Button size="small" color="primary">
          <a href={"https://www.udemy.com" + course.url}>View</a>
        </Button>{" "}
        <Button size="small" color="primary">
          Learn More{" "}
        </Button>{" "}
      </CardActions>{" "}
    </Card>
  );
};

CourseItem.defaultProps = {
  showActions: true,
};

CourseItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getChaptersCoursesUdemy })(
  CourseItem
);
