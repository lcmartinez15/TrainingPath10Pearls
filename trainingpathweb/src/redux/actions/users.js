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
import { post, get } from "../../utils/access";
import { setAlert } from "./alert";
import { redirect } from "./ui";

// get all users
export const getUsers = () => async (dispatch) => {
  try {
    const res = await get(urlGetAllUsers);
    //console.log("all profile" + res);
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (error) {
    if (!error)
      dispatch({
        type: USER_ERROR,
        payload: {
          msg: error.response.status,
          status: error.response.status,
        },
      });
  }
};

//Register User
export const registerUser = (
  firstname,
  lastname,
  email,
  password,
  role,
  status
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    firstname,
    lastname,
    email,
    password,
    role,
    status,
  });

  try {
    console.log(body);
    const res = await post(urlAddUser, body, config);
    if (res.data) {
      // console.log(res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(setAlert("User created", "success"));
      dispatch(redirect("/users"));
    }
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors) {
      // errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// get all users
export const getUserById = (id) => async (dispatch) => {
  try {
    const res = await get(`${urlGetAllUsers}/${id}`);
    if (res.data) {
      //console.log("all profile" + res);
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } else {
      dispatch({
        type: USER_ERROR,
      });
      dispatch(setAlert("user haven't assingn Courses yet", "error"));
    }
  } catch (error) {
    if (!error)
      dispatch({
        type: USER_ERROR,
        payload: {
          msg: error.response.status,
          status: error.response.status,
        },
      });
  }
};

// get all users
export const getCoursesUser = (id) => async (dispatch) => {
  const res = await get(`${urlTrainingPathUser}/${id}`);
  if (res.data) {
    try {
      dispatch({
        type: GET_COURSES_USER,
        payload: res.data,
      });

      //dispatch(setAlert("Category updated", "success"));
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
export const getAvailableCoursesUser = (id) => async (dispatch) => {
  console.log("id user", id);
  const res = await get(`${urlTrainingPathUser}/AvailableCourses/${id}`);
  if (res.data) {
    try {
      dispatch({
        type: GET_AVAILABLE_COURSES_USER,
        payload: res.data,
      });

      //dispatch(setAlert("Category updated", "success"));
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
