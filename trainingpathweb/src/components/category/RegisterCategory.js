import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { addCategory, updateCategory } from "../../redux/actions/category";
import {
  Card,
  CardHeader,
  CardContent,
  FormControl,
  Divider,
  Button,
  InputLabel,
  TextField,
} from "@material-ui/core";
import { MenuItem, Select } from "@material-ui/core";
import PropTypes from "prop-types";

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

const RegisterCategory = ({
  addCategory,
  updateCategory,
  isAuthenticated,
  category,
}) => {
  const classes = useStyles();
  console.log(category);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
  });
  const { name, type } = formData;
  const TYPES = [
    { value: "Programming Language" },
    { value: "Softskill" },
    { value: "Framework" },
    { value: "Library" },
    { value: "DevOps" },
    { value: "Testing" },
    { value: "Security" },
    { value: "Version Control" },
    { value: "Platforms" },
    { value: "Other" },
  ];
  const onChange = (e) => {
    console.log(e.target);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addCategory(formData);
  };

  //redirect
  return (
    <div className={classes.root}>
      <Card className={classes.root}>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <CardHeader title="Create Category" />
          <Divider />
          <CardContent>
            <div className="form-group">
              <TextField
                type="text"
                placeholder="name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
                required
                fullWidth
                helperText="Please specify the category name"
                label="Category Name"
                margin="dense"
                variant="outlined"
              />
            </div>{" "}
            <div className="form-group">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                  className={classes.inputLabel}
                  id="demo-simple-select-outlined-label"
                >
                  Type Category
                </InputLabel>
                <Select
                  required
                  name="type"
                  value={type}
                  fullWidth
                  label="Type"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) => onChange(e)}
                >
                  {TYPES.map((type) => (
                    <MenuItem value={type.value}>{type.value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>{" "}
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
          </CardContent>
        </form>{" "}
      </Card>
    </div>
  );
};

RegisterCategory.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  category: state.category.category,
});

export default connect(mapStateToProps, { addCategory, updateCategory })(
  RegisterCategory
);
