import {
    GET_USER,
    USER_ERROR,
    CLEAR_USER,
    UPDTAE_USER,
    GET_USERS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from "../constants/types";

const initialState = {
    user: null,
    users: [],
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USER:
            return {
                ...state,
                user: payload,
                loading: false,
            };
        case GET_USERS:
            return {
                ...state,
                users: payload,
                loading: false,
            };
        case UPDTAE_USER:
            return {
                ...state,
                user: payload,
                loading: false,
            };
        case REGISTER_FAIL:
        case USER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                user: null,
            };
        case CLEAR_USER:
            return {
                ...state,
                user: null,
                loading: false,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                users: [payload, ...state.users],
                loading: false,
            };

        default:
            return state;
    }
}