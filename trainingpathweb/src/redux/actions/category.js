import axios from "axios";
import { post, get } from "../../utils/access";
import { urlCategory } from "../../config/routes";
import { setAlert } from "./alert";
import {
    GET_CATEGORIES,
    CATEGORY_ERROR,
    DELETE_CATEGORY,
    ADD_CATEGORY,
    GET_CATEGORY,
} from "../constants/types";

//Get getCourses
export const getCategories = () => async(dispatch) => {
    const res = await get(urlCategory);
    console.log("GET CATEGORIES");
    if (res.data) {
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data,
        });
    } else {
        dispatch({
            type: CATEGORY_ERROR,
        });
        dispatch(setAlert(res.message, "error"));
    }
};
//delete Course
export const deleteCategory = (id) => async(dispatch) => {
    try {
        const res = await axios.delete(`/api/Course/${id}`);
        //console.log("data user" + res);
        dispatch({
            type: DELETE_CATEGORY,
            payload: { id, Sections: res.data },
        });
        // dispatch(setAlert("Course removed"));
    } catch (error) {
        dispatch({
            type: CATEGORY_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};
//Add post
export const addCategory = (formData) => async(dispatch) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const res = await post(urlCategory, formData, config);
    if (res.data) {
        try {
            dispatch({
                type: ADD_CATEGORY,
                payload: res.data,
            });

            dispatch(setAlert("Category created", "success"));


        } catch (error) {
            console.log("error " + error);
        }
    } else {
        dispatch({
            type: CATEGORY_ERROR,
        });
        dispatch(setAlert(res.message, "error"));
    }
};
//Get Post
export const getCategory = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/course/${id}`);

        dispatch({
            type: GET_CATEGORY,
            payload: res.data,
        });
    } catch (error) {
        if (error.response) {
            dispatch({
                type: CATEGORY_ERROR,
                payload: {
                    msg: error.response.status,
                    status: error.response.status,
                },
            });
        }
    }
};