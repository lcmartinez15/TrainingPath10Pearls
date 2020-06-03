import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Chapters from "../courses/Chapter";
import { Card, Divider, CardHeader } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Spinner from "../layout/Spinner";
//actions
import { getCourse } from "../../redux/actions/course";
import { getLogProcess } from "../../redux/actions/logProcess";
import { getChaptersPendingLogProcess } from "../../redux/actions/chapter";
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
  },
  addButton: {
    marginRight: theme.spacing(5),
  },
  title: {
    fontSize: 14,
  },
}));

const LogProcess = ({
  getCourse,
  getLogProcess,
  getChaptersPendingLogProcess,
  auth: { user },
  course: { course, loading },
  chapter: { chapters },
  logProcess: { logProcessUser },
  showActions,
  match,
  location,
}) => {
  const classes = useStyles();
  useEffect(() => {
    getCourse(match.params.courseId);
    getLogProcess(match.params.courseId, user._id);
    getChaptersPendingLogProcess(match.params.courseId, user._id);
  }, [getCourse, getLogProcess, getChaptersPendingLogProcess, logProcessUser]);

  console.log("log process", chapters);
  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className={classes.root}>
      <Card className={classes.root}>
        <CardHeader subheader={course.description} title={course.title} />
        <Divider />
        <CardContent>
          <div>
            <Chapters
              logProcess={logProcessUser}
              chaptersCurrentCourse={chapters}
            ></Chapters>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

LogProcess.defaultProps = {
  showActions: true,
  course: {},
};

LogProcess.propTypes = {
  auth: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  course: state.course,
  logProcess: state.logProcess,
  chapter: state.chapter,
});
export default connect(mapStateToProps, {
  getCourse,
  getLogProcess,
  getChaptersPendingLogProcess,
})(LogProcess);
