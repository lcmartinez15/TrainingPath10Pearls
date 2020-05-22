import {
    LOGIN_SUCCESS,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
} from "../constants/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    console.log("type" + type);
    switch (type) {
        case LOGIN_SUCCESS:
            console.log("login" + payload);
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false,
                user: payload.user,
            };
        case LOGOUT:
            console.log("logout");
            localStorage.removeItem("token");
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                token: null,
            };
        case USER_LOADED:
            console.log("register" + payload);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case AUTH_ERROR:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
}