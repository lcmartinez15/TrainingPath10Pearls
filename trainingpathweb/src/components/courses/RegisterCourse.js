import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { addCourse } from "../../redux/actions/course";
import PropTypes from "prop-types";
import MaterialTable from "material-table";

const RegisterCourse = ({
  addCourse,
  isAuthenticated,
  udemycourse,
  udemyChapterscourse,
}) => {
  const [formData, setFormData] = useState({
    category: "",
    title: udemycourse ? udemycourse.title : "",
    link: udemycourse ? udemycourse.url : "",
    time: "tempo",
    chapters: udemyChapterscourse ? udemyChapterscourse : [],
    columns: [
      { title: "Type", field: "_class" },
      { title: "Name", field: "title" },
      { title: "description", field: "description" },
      { title: "time", field: "time" },
      { title: "percentage", field: "percentage" },
    ],
  });
  const { category, title, link, time, chapters, columns } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    console.log("register button");
    e.preventDefault();
    addCourse(formData);
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
        <Fragment>
          {chapters ? (
            <MaterialTable
              title="Course content"
              columns={columns}
              data={chapters}
            ></MaterialTable>
          ) : (
            <div> no chapters found </div>
          )}{" "}
        </Fragment>
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>{" "}
    </Fragment>
  );
};

RegisterCourse.propTypes = {
  isAuthenticated: PropTypes.bool,
  udemycourse: PropTypes.object,
  udemyChapterscourse: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  udemycourse: state.course.udemycourse,
  udemyChapterscourse: state.course.udemyChapterscourse,
});

export default connect(mapStateToProps, { addCourse })(RegisterCourse);
