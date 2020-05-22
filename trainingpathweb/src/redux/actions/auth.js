import {
    LOGIN_SUCCESS,
    LOGOUT,
    USER_LOADED,
    USER_ERROR,
} from "../constants/types";
import { urlAuth, urlLoadUser } from "../../config/routes";
import {get, post, setAuthToken } from "../../utils/access";
import { setAlert } from "./alert";

//Login
export const login = (email, password) => async(dispath) => {
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
export const logout = () => async(dispath) => {
    try {
        dispath({
            type: LOGOUT,
        });
    } catch (error) {
        console.log("error " + error);
    }
};

//Load User
export const loadUser = () => async(dispatch) => {
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