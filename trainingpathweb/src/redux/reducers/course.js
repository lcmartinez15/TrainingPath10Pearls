import {
    GET_COURSE,
    COURSE_ERROR,
    DELETE_COURSE,
    ADD_COURSE,
    GET_COURSES,
    ADD_SECTION,
    UDEMY_COURSE,
    UDEMYCHAPTERS_COURSE,
} from "../constants/types";

const initialState = {
    courses: [],
    course: {},
    udemycourse: {},
    udemyChapterscourse: [],
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    console.log("reducer course");
    switch (type) {
        case GET_COURSES:
            return {
                ...state,
                courses: payload,
                loading: false,
            };
        case GET_COURSE:
            return {
                ...state,
                course: payload,
                loading: false,
            };
        case ADD_COURSE:
            return {
                ...state,
                courses: [payload, ...state.courses],
                loading: false,
            };
        case DELETE_COURSE:
            return {
                ...state,
                courses: state.courses.filter((course) => course._id !== payload),
                loading: false,
            };
        case COURSE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };

        case ADD_SECTION:
            return {
                ...state,
                course: {...state.course, sections: payload },
                loading: false,
            };
        case UDEMY_COURSE:
            return {
                ...state,
                udemycourse: payload,
                loading: false,
            };
        case UDEMYCHAPTERS_COURSE:
            return {
                ...state,
                udemyChapterscourse: payload,
                loading: false,
            };
        default:
            return state;
    }
}