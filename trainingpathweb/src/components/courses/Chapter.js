import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { registerUser } from "../../redux/actions/users";
import PropTypes from "prop-types";

const Chapters = ({ udemycourse }) => {
  const [formData, setFormData] = useState({
    category: "",
    title: udemycourse ? udemycourse.title : "",
    link: udemycourse ? udemycourse.url : "",
    time: "tempo",
  });
  const { category, title, link, time } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    console.log("register button");
    e.preventDefault();
    //registerCourse(firstname, lastname, email, password, role, status);
  };

  //redirect
  return (
    <Fragment>
      {" "}
      <h1 className="large text-primary"> Course </h1>{" "}
      <p className="lead">
        <i className="fas fa-user"> </i>Create course{" "}
      </p>{" "}
      <Link to="/searchCourse"> Search Course Udemy </Link>{" "}
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={category}
            onChange={(e) => onChange(e)}
            required
          />
        </div>{" "}
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>{" "}
        <div className="form-group">
          <input
            type="text"
            placeholder="Time"
            name="time"
            value={time}
            onChange={(e) => onChange(e)}
            required
          />
        </div>{" "}
        <div className="form-group">
          <input
            type="text"
            placeholder="Link"
            name="link"
            value={link}
            onChange={(e) => onChange(e)}
            required
          />
        </div>{" "}
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>{" "}
    </Fragment>
  );
};

Chapters.propTypes = {
  isAuthenticated: PropTypes.bool,
  udemycourse: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  udemycourse: state.course.udemycourse,
});

export default connect(mapStateToProps, {})(Chapters);
