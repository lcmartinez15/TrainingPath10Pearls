import {
  GET_USER,
  USER_ERROR,
  CLEAR_USER,
  UPDTAE_USER,
  GET_USERS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_COURSES_USER,
  GET_AVAILABLE_COURSES_USER,
} from "../constants/types";

const initialState = {
  user: null,
  users: [],
  loading: true,
  error: {},
  coursesusers: { courses: [] },
  availableCourses: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);
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
        coursesusers: { courses: [] },
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
        coursesusers: { courses: [] },
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

    case GET_COURSES_USER:
      return {
        ...state,
        coursesusers: payload,
        loading: false,
      };
    case GET_AVAILABLE_COURSES_USER:
      return {
        ...state,
        availableCourses: payload,
        loading: false,
      };
    default:
      return state;
  }
}
