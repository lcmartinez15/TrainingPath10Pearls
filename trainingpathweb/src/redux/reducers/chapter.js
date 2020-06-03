import { GET_CHAPTERS, CHAPTERS_ERROR } from "../constants/types";

const initialState = {
  chapters: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CHAPTERS:
      return {
        ...state,
        chapters: payload,
        loading: false,
      };
    case CHAPTERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
