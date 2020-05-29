import axios from "axios";
import { post, get } from "../../utils/access";
import {
    urlGetAllCourse,
    urlSearchUdemy,
    urlChaptersCourseUdemy,
} from "../../config/routes";
import { setAlert } from "./alert";
import {
    GET_COURSE,
    COURSE_ERROR,
    DELETE_COURSE,
    ADD_COURSE,
    GET_COURSES,
    ADD_SECTION,
    UDEMY_COURSE,
    UDEMYCHAPTERS_COURSE,
    CLEAR_UDEMUY,
} from "../constants/types";
import { formatMs } from "@material-ui/core";

//Get getCourses
export const getCourses = () => async(dispatch) => {
    try {
        const res = await get(urlGetAllCourse);
        console.log("GET COURSES");
        dispatch({
            type: GET_COURSES,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: COURSE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

//delete Course
export const deleteCourse = (id) => async(dispatch) => {
    try {
        const res = await axios.delete(`/api/Course/${id}`);
        //console.log("data user" + res);
        dispatch({
            type: DELETE_COURSE,
            payload: { id, Sections: res.data },
        });
        // dispatch(setAlert("Course removed"));
    } catch (error) {
        dispatch({
            type: COURSE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

//Add post
export const addCourse = (formData, chapters) => async(dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log(formData);
        formData = {...formData, chapters }
        console.log(formData);
        const res = await post(urlGetAllCourse, formData, config);
        // //console.log("create profile");
        dispatch({
            type: ADD_COURSE,
            payload: res.data,
        });

        dispatch(setAlert("Course created", "success"));
    } catch (error) {
        dispatch({
            type: COURSE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

//Get Post
export const getCourse = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/course/${id}`);

        dispatch({
            type: GET_COURSE,
            payload: res.data,
        });
    } catch (error) {
        if (error.response) {
            dispatch({
                type: COURSE_ERROR,
                payload: {
                    msg: error.response.status,
                    status: error.response.status,
                },
            });
        }
    }
};

//Add comment
export const addSection = (id, formData) => async(dispatch) => {
    try {
        console.log(id);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const res = await axios.put(`/api/course/sections/${id}`, formData, config);
        console.log("create section ", res);
        dispatch({
            type: ADD_SECTION,
            payload: res.data.sections,
        });

        // dispatch(setAlert("Section added", "success"));
    } catch (error) {
        dispatch({
            type: COURSE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

//get courses udemy

export const getCoursesUdemy = async(search) => {
    try {
        console.log("campo de busqueda" + search);
        const res = await get(urlSearchUdemy + search);
        console.log("get course udemy ", res.data);
        return res.data.results;
    } catch (error) {}
};

export const getChaptersCoursesUdemy = (course) => async(dispatch) => {
    try {
        dispatch({
            type: UDEMY_COURSE,
            payload: course,
        });

        console.log("get chapters" + course);
        const res = await get(urlChaptersCourseUdemy + course.id);
        console.log("get chapters course udemy ", res.data);
        if (res.data) {
            const chapters = res.data.results.filter(
                (chapter) => chapter._class === "chapter"
            );

            dispatch({
                type: UDEMYCHAPTERS_COURSE,
                payload: chapters,
            });
        } else {
            dispatch({
                type: COURSE_ERROR,
            });
            dispatch(setAlert(res.message, "error"));
        }
    } catch (error) {}
};