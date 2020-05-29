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

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    addCourse(formData, chapters);
  };

  //redirect
  return (
    <Fragment>
      <h1 className="large text-primary"> Course </h1>
      <p className="lead">
        <i className="fas fa-user"> </i>Create course
      </p>
      <Link to="/searchCourse"> Search Course Udemy </Link>
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
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Time"
            name="time"
            value={time}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Link"
            name="link"
            value={link}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="tags"
            name="tags"
            value={tags}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="description"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
            required
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
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
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
