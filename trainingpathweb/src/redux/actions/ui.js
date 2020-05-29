import { REDIRECT, REDIRECTCLEAR } from "../constants/types";

// action creators
export const redirect = (link) => {
  console.log("=== REDIRECT ACTION DISPATCHED ===");
  return { type: REDIRECT, payload: link };
};

export const redirectClear = () => async (dispatch) => {
  console.log("=== REDIRECT ACTION DISPATCHED clear===");
  dispatch({ type: REDIRECTCLEAR });
};
