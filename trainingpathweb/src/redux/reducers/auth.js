import { LOGIN_SUCCESS, LOGOUT } from "../constants/types";

const initialState = {
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log("type" + type);
  switch (type) {
    case LOGIN_SUCCESS:
      console.log("login" + payload);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGOUT:
      console.log("logout");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
}
