import { post, get, update, remove } from "../../utils/access";
import { urlLogProcess } from "../../config/routes";
import { setAlert } from "./alert";
import { redirect } from "./ui";
import { GET_CHAPTERS, CHAPTERS_ERROR } from "../constants/types";

import { AddBox, ArrowDownward } from "@material-ui/icons";

//Get getCourses
export const getChaptersPendingLogProcess = (idCourse, idUser) => async (
  dispatch
) => {
  const res = await get(`${urlLogProcess}/chapter/${idCourse}/${idUser}`);
  console.log("GET Chapters Pending");
  if (res.data) {
    dispatch({
      type: GET_CHAPTERS,
      payload: res.data,
    });
  } else {
    dispatch({
      type: CHAPTERS_ERROR,
    });
    dispatch(setAlert(res.message, "error"));
  }
};
