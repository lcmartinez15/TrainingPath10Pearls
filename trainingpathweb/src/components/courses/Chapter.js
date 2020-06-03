import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Link, Redirect } from "react-router-dom";
import { addLogProcess } from "../../redux/actions/logProcess";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import { FormControlLabel, Switch } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const Chapters = ({
  logProcess,
  chaptersCurrentCourse,
  user,
  addLogProcess,
}) => {
  console.log("chapters", logProcess, chaptersCurrentCourse);
  const classes = useStyles();
  const [chapters, setFormDatachapters] = useState([]);
  const [checked, setChecked] = useState(true);
  const [chaptersCourse, setChaptersCourse] = useState([chaptersCurrentCourse]);
  const [logProcessUser, setLogProcessUser] = useState([logProcess]);

  const columns = [
    { title: "Name", field: "chapterRef.name" },
    { title: "Status", field: "status" },
    { title: "Date", field: "date" },
    { title: "time", field: "chapterRef.time" },
    { title: "percentage", field: "chapterRef.percentage" },
  ];
  const columnsPending = [
    { title: "Name", field: "name" },
    { title: "time", field: "time" },
    { title: "percentage", field: "percentage" },
  ];

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  //redirect
  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Primary"
      />
      <div hidden={checked ? false : true}>
        {chapters ? (
          <MaterialTable
            title="Log Process"
            columns={columns}
            data={logProcess}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      const newChapters = [...chapters];
                      newChapters[newChapters.indexOf(oldData)] = newData;
                      setFormDatachapters(newChapters);
                    }
                  }, 600);
                }),

              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      const data = [...chapters];
                      data.splice(data.indexOf(oldData), 1);
                      setFormDatachapters(data);
                    }
                  }, 600);
                }),
            }}
          ></MaterialTable>
        ) : (
          <div> no chapters found </div>
        )}
      </div>
      <div hidden={checked ? true : false}>
        {chapters ? (
          <MaterialTable
            title="Pending Chapters"
            actions={[
              {
                icon: "add",
                tooltip: "Add to Log Process",
                onClick: (event, rowData) => {
                  console.log(rowData);
                  addLogProcess(rowData, user);
                },
              },
            ]}
            columns={columnsPending}
            data={chaptersCurrentCourse}
          ></MaterialTable>
        ) : (
          <div> no chapters found </div>
        )}
      </div>

      <input type="submit" className="btn btn-primary" value="Save" />
    </div>
  );
};

Chapters.defaultProps = {
  chaptersCourse: [],
};

Chapters.propTypes = {
  isAuthenticated: PropTypes.bool,
  //udemycourse: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { addLogProcess })(Chapters);
