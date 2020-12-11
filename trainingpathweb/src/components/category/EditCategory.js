import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateCategory, getCategory } from "../../redux/actions/category";
import { makeStyles } from "@material-ui/styles";
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
import Spinner from "../layout/Spinner";
import category from "../../redux/reducers/category";

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

const EditCategory = ({
  getCategory,
  updateCategory,
  isAuthenticated,
  category: { currentCategory, loading },
  match,
}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: currentCategory!=null ? currentCategory.name:"",
    type: "",
    id: "",
  });

  useEffect(() => {
    getCategory(match.params.idCategory);
 console.log(loading);
    // if (currentCategory && Object.keys(currentCategory).length) {
    if (!loading && currentCategory!=null) {
      console.log(currentCategory);
      setFormData({
        name: currentCategory.name,
        type: currentCategory.type,
        id: currentCategory._id,
      });
    }
  }, [loading]);

  const { name, type, id } = formData;

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
    console.log("register button");
    e.preventDefault();

    updateCategory(formData);
  };

  if (loading) {
    return <Spinner></Spinner>;
  }
  //redirect
  return (
    <div className={classes.root}>
      <Card className={classes.root}>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <CardHeader title="Edit Category" />
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

EditCategory.propTypes = {
  isAuthenticated: PropTypes.bool,
  category: PropTypes.object.isRequired,
  getCategory: PropTypes.func.isRequired,
};

EditCategory.defaultProps = {
  currentCategory: {}, 
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  category: state.category,
});

export default connect(mapStateToProps, {
  updateCategory,
  getCategory,
})(EditCategory);
