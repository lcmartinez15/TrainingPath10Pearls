import { REDIRECT, REDIRECTCLEAR } from "../constants/types";

const reducer = (state = {}, action) => {
  console.log(action.type);
  switch (action.type) {
    case REDIRECT:
      return { redirectTo: action.payload };
    case REDIRECTCLEAR:
      return { redirectTo: null };
    default:
      return state;
  }
};

export default reducer;
