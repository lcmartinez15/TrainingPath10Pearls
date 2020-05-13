import axios from "axios";
import { LOGIN_SUCCESS, LOGOUT } from "../constants/types";

//Login
export const login = (email, password) => async (dispath) => {
  console.log("action");

  try {
    dispath({
      type: LOGIN_SUCCESS,
      payload: {
        firtsname: "laura",
        email: "lcmartinez15@gmail.com",
        lastname: "martinez",
      },
    });
  } catch (error) {
    console.log("error " + error);
  }
};

//Logout
export const logout = () => async (dispath) => {
  console.log("action logout");

  try {
    dispath({
      type: LOGOUT,
    });
  } catch (error) {
    console.log("error " + error);
  }
};
