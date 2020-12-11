import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import {
  addLogProcess,
  updateLogProcess,
} from "../../redux/actions/logProcess";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import { Tab, AppBar, Tabs } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import TabPanel from "./TabPanel";

const useStyles = makeStyles((theme) => ({}));

const Chapters = ({
  logProcess,
  chaptersCurrentCourse,
  user,
  addLogProcess,
  updateLogProcess,
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
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  //redirect
  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChangeTab}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="In Process" icon={<PhoneIcon />} />
            <Tab label="Pending" icon={<FavoriteIcon />} />
            <Tab label="Done" icon={<PersonPinIcon />} />
            <Tab label="Notes" icon={<HelpIcon />} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div>
            {chapters ? (
              <MaterialTable
                title="Log Process"
                columns={columns}
                data={logProcess}
                actions={[
                  {
                    icon: "check",
                    tooltip: "Finished",
                    onClick: (event, rowData) => {
                      console.log(rowData);
                      updateLogProcess(rowData, user);
                    },
                  },
                ]}
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
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>
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
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
      </div>
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

export default connect(mapStateToProps, { addLogProcess, updateLogProcess })(
  Chapters
);
