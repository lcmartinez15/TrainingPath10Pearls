import {
  GET_CATEGORIES,
  CATEGORY_ERROR,
  DELETE_CATEGORY,
  ADD_CATEGORY,
  GET_CATEGORY,
  UPDATE_CATEGORY,
} from "../constants/types";

const initialState = {
  categories: [],
  currentCategory: {},
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log("reducer category", payload);
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        currentCategory: null,
        loading: false,
      };
    case GET_CATEGORY:
      return {
        ...state,
        currentCategory: payload,
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
          (category) => category._id !== payload.id
        ),
        loading: false,
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === payload.id ? { ...category, payload } : category
        ),
        loading: false,
      };
    default:
      return state;
  }
}
