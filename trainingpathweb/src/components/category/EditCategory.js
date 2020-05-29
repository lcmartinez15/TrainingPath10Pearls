import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateCategory, getCategory } from "../../redux/actions/category";

import { MenuItem, Select } from "@material-ui/core";
import PropTypes from "prop-types";

const EditCategory = ({
  getCategory,
  updateCategory,
  isAuthenticated,
  category: { currentCategory, loading },
  match,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    id: "",
  });

  useEffect(() => {
    getCategory(match.params.idCategory);

    // if (currentCategory && Object.keys(currentCategory).length) {
    if (currentCategory) {
      setFormData({
        name: currentCategory.name,
        type: currentCategory.type,
        id: currentCategory._id,
      });
    }
  }, [loading, getCategory]);

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

  //redirect
  return (
    <Fragment>
      {" "}
      <h1 className="large text-primary"> Category </h1>{" "}
      <p className="lead">
        <i className="fas fa-user"> </i>Edit Category{" "}
      </p>{" "}
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>{" "}
        <div className="form-group">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="type"
            value={type}
            onChange={(e) => onChange(e)}
          >
            {TYPES.map((type) => (
              <MenuItem value={type.value}>{type.value}</MenuItem>
            ))}
          </Select>
        </div>{" "}
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>{" "}
    </Fragment>
  );
};

EditCategory.propTypes = {
  isAuthenticated: PropTypes.bool,
  currentCategory: PropTypes.object.isRequired,
};

EditCategory.defaultProps = {
  //currentCategory: {},
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  category: state.category,
});

export default connect(mapStateToProps, {
  updateCategory,
  getCategory,
})(EditCategory);
