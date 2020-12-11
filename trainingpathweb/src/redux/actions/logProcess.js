import { post, get, update } from "../../utils/access";
import { urlLogProcess } from "../../config/routes";
import { setAlert } from "./alert";
import {
  GET_LOGPROCESSUSER,
  LOGPROCESS_ERROR,
  ADD_LOGPROCESSUSER,
} from "../constants/types";

//Get log process
export const getLogProcess = (idCourse, idUser) => async (dispatch) => {
  try {
    const res = await get(`${urlLogProcess}/${idCourse}/${idUser}`);
    console.log("GET COURSES");
    dispatch({
      type: GET_LOGPROCESSUSER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGPROCESS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//delete log process
export const deleteLogProcess = (id) => async (dispatch) => {
  try {
    const res = await delete `/api/Course/${id}`;
    //console.log("data user" + res);
    dispatch({
      //   type: DELETE_COURSE,
      payload: { id, Sections: res.data },
    });
    // dispatch(setAlert("Course removed"));
  } catch (error) {
    dispatch({
      //   type: COURSE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Add log process
export const addLogProcess = (rowData, user) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (rowData._id) {
      const logProcess = {
        status: "started",
        userRef: user._id,
        chapterRef: rowData._id,
      };
      const res = await post(urlLogProcess, logProcess, config);

      if (res.data) {
        dispatch(setAlert("Chapter added", "success"));
      }
    }
  } catch (error) {
    dispatch({
      //   type: COURSE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Add log process
export const updateLogProcess = (rowData, user) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (rowData._id) {
      const logProcess = {
        status: "finished",
      };
      const res = await update(
        `${urlLogProcess}/${rowData._id}`,
        logProcess,
        config
      );

      if (res.data) {
        dispatch(setAlert("Chapter added", "success"));
      }
    }
  } catch (error) {
    dispatch({
      //   type: COURSE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
