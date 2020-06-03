import {
  GET_LOGPROCESSUSER,
  LOGPROCESS_ERROR,
  ADD_LOGPROCESSUSER,
} from "../constants/types";

const initialState = {
  logProcessUser: [],
  course: {},
  udemycourse: {},
  udemyChapterscourse: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log("reducer course");
  switch (type) {
    case GET_LOGPROCESSUSER:
      return {
        ...state,
        logProcessUser: payload,
        loading: false,
      };
    case ADD_LOGPROCESSUSER:
      return {
        ...state,
        logProcessUser: [payload, ...state.logProcessUser],
        loading: false,
      };

    default:
      return state;
  }
}
