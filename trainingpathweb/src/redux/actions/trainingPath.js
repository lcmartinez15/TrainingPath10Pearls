import {
  GET_USERS,
  GET_USER,
  USER_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_COURSES_USER,
  GET_AVAILABLE_COURSES_USER,
} from "../constants/types";
import {
  urlGetAllUsers,
  urlAddUser,
  urlTrainingPathUser,
} from "../../config/routes";
import { post, remove, update } from "../../utils/access";
import { setAlert } from "./alert";
import { redirect } from "./ui";

// get all users
export const addAvailableCoursesUser = (formData, id) => async (dispatch) => {
  console.log("id user", formData);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let data = {
    user: id,
    courses: [],
  };

  formData.map((id) => {
    data.courses.push({
      courseRef: id,
      status: "started",
      isDeleted: "false",
      percentage: 0,
    });
  });
  console.log(data);
  const res = await update(`${urlTrainingPathUser}/${id}`, data, config);
  if (res.data) {
    try {
      dispatch(setAlert("Changes saved successfully", "success"));
      dispatch(redirect("/viewUser/" + id));
    } catch (error) {
      console.log("error " + error);
    }
  } else {
    dispatch({
      type: USER_ERROR,
    });
    // dispatch(setAlert(res.message, "error"));
  }
};

// get all users
export const deleteCoursesUser = (idUser, coursesList) => async (dispatch) => {
  console.log("id user", coursesList);

  const res = await remove(`${urlTrainingPathUser}/${idUser}`, coursesList);
  console.log(res.data);
  if (res.data) {
    try {
      dispatch(setAlert("Courses deleted", "success"));
      dispatch({
        type: GET_COURSES_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log("error " + error);
    }
  } else {
    dispatch({
      type: USER_ERROR,
    });
    // dispatch(setAlert(res.message, "error"));
  }
};
