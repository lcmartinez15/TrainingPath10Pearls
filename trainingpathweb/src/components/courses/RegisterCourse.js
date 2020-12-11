import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { addCourse } from "../../redux/actions/course";
import { getCategories } from "../../redux/actions/category";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import MaterialTable from "material-table";
import {
  Card,
  CardHeader,
  CardContent,
  FormControl,
  Divider,
  Button,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";

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
  saveButton: {
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(2),
  },
  selectControl: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    display: "flex",
  },
}));

const RegisterCourse = ({
  addCourse,
  getCategories,
  isAuthenticated,
  udemycourse,
  udemyChapterscourse,
  categories,
}) => {
  useEffect(() => {
    getCategories();
  }, []);

  const [formData, setFormData] = useState({
    category: "",
    title: udemycourse ? udemycourse.title : "",
    link: udemycourse ? udemycourse.url : "",
    time: "240",
    tags: "",
    img: udemycourse ? udemycourse.image_240x135 : "",
    description: udemycourse ? udemycourse.headline : "",
    id: udemycourse ? udemycourse.id : "",
    columns: [
      { title: "Type", field: "_class" },
      { title: "Name", field: "title" },
      { title: "description", field: "description" },
      { title: "time", field: "time" },
      { title: "percentage", field: "percentage" },
      { title: "id", field: "id" },
    ],
  });
  const [chapters, setFormDatachapters] = useState(
    udemyChapterscourse ? udemyChapterscourse : []
  );
  const classes = useStyles();

  const {
    category,
    title,
    link,
    time,
    tags,
    img,
    description,
    columns,
    id,
  } = formData;

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addCourse(formData, chapters);
  };

  //redirect
  return (
    <div className={classes.root}>
      <Card className={classes.root}>
        <CardHeader title="Create course" />
        <Divider />
        <CardContent>
          <Link to="/searchCourse"> Search Course Udemy </Link>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                  className={classes.inputLabel}
                  id="demo-simple-select-outlined-label"
                >
                  Category
                </InputLabel>
                <Select
                  required
                  name="category"
                  value={category}
                  fullWidth
                  label="Type"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) => onChange(e)}
                >
                  {categories.map((category) => (
                    <MenuItem value={category._id}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="form-group">
              <TextField
                type="text"
                label="Title"
                name="title"
                value={title}
                onChange={(e) => onChange(e)}
                required
                fullWidth
                margin="dense"
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <TextField
                type="text"
                label="Time"
                name="time"
                value={time}
                onChange={(e) => onChange(e)}
                required
                fullWidth
                margin="dense"
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <TextField
                type="text"
                label="Link"
                name="link"
                value={link}
                onChange={(e) => onChange(e)}
                required
                fullWidth
                margin="dense"
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <TextField
                type="text"
                label="tags"
                name="tags"
                value={tags}
                onChange={(e) => onChange(e)}
                required
                fullWidth
                margin="dense"
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <TextField
                type="text"
                label="Description"
                name="description"
                value={description}
                onChange={(e) => onChange(e)}
                required
                fullWidth
                margin="dense"
                variant="outlined"
              />
            </div>

            <Fragment>
              {chapters ? (
                <MaterialTable
                  title="Course content"
                  columns={columns}
                  data={chapters}
                  editable={{
                    onRowAdd: (newData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          const newChapters = [...chapters, newData];
                          setFormDatachapters(newChapters);
                          resolve();
                        }, 600);
                      }),

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
            </Fragment>
            <div className="form-group">
              <Button
                className={classes.saveButton}
                color="primary"
                type="submit"
                variant="contained"
              >
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

RegisterCourse.propTypes = {
  isAuthenticated: PropTypes.bool,
  categories: PropTypes.array.isRequired,
  udemycourse: PropTypes.object,
  udemyChapterscourse: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  udemycourse: state.course.udemycourse,
  udemyChapterscourse: state.course.udemyChapterscourse,
  categories: state.category.categories,
});

export default connect(mapStateToProps, { addCourse, getCategories })(
  RegisterCourse
);
