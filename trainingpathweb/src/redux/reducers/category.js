import {
    GET_CATEGORIES,
    CATEGORY_ERROR,
    DELETE_CATEGORY,
    ADD_CATEGORY,
    GET_CATEGORY,
} from "../constants/types";

const initialState = {
    categorys: [],
    category: {},
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    console.log("reducer category");
    switch (type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload,
                loading: false,
            };
        case GET_CATEGORY:
            return {
                ...state,
                category: payload,
                loading: false,
            };
        case ADD_CATEGORY:
            return {
                ...state,
                categories: [payload, ...state.categories],
                loading: false,
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(
                    (category) => category._id !== payload
                ),
                loading: false,
            };
        case CATEGORY_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}