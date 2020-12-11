import {
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
  USER_ERROR,
} from "../constants/types";
import { urlAuth, urlLoadUser, urlResetPassword } from "../../config/routes";
import { get, post, setAuthToken } from "../../utils/access";
import { setAlert } from "./alert";
import { redirect } from "./ui";

//Login
export const login = (email, password) => async (dispath) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  const res = await post(urlAuth, body, config);
  console.log(res);
  if (res.data) {
    try {
      dispath({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("error " + error);
    }
  } else {
    dispath({
      type: USER_ERROR,
    });
    dispath(setAlert(res.message, "error"));
  }
};

//Logout
export const logout = () => async (dispath) => {
  try {
    dispath({
      type: LOGOUT,
    });
  } catch (error) {
    console.log("error " + error);
  }
};

//Load User
export const loadUser = () => async (dispatch) => {
  console.log("load user ");
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await get(urlLoadUser);
    if (res.data) {
      console.log("data user" + res);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_ERROR,
    });
  }
};


export const resetPassword = (user,password) => async (dispatch) => {
  console.log("reset user ", user);
  
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
 const body = JSON.stringify({user, password });
   const res = await post(urlResetPassword, body, config);
   if (res.data)
   {
    dispatch(setAlert("Password updated", "success"));
    dispatch(redirect("/login"));
  } else {
    dispatch({
      type: USER_ERROR,
    });
    dispatch(setAlert(res.message, "error"));
  }
 
};
