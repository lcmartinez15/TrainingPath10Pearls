import {
    GET_USERS,
    USER_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from "../constants/types";
import { urlGetAllUsers, urlAddUser } from "../../config/routes";
import { post, get } from "../../utils/access";

// get all users
export const getUsers = () => async(dispatch) => {
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
) => async(dispatch) => {
    console.log("actions register");
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