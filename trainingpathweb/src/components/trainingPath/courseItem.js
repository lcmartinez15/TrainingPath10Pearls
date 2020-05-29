import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Card, Checkbox } from "@material-ui/core";
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

const CourseItem = ({
  onChecked,
  getChaptersCoursesUdemy,
  auth,
  course,
  showActions,
}) => {
  const classes = useStyles();
  const onClick = (e) => {
    console.log("onclick");
  };

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    onChecked(course._id);
  };

  console.log(course);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Checkbox
          color="primary"
          onChange={handleChange}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={course.img}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.action}>
          <Typography gutterBottom variant="h5" component="h2">
            {course.title}
          </Typography>{" "}
          <Typography variant="body2" color="textSecondary" component="p">
            {course.description}
          </Typography>{" "}
        </CardContent>{" "}
      </CardActionArea>{" "}
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
