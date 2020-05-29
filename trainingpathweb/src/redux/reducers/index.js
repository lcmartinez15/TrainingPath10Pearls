import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import course from "./course";
import alert from "./alert";
import category from "./category";
import ui from "./ui";

export default combineReducers({
    auth,
    user,
    course,
    alert,
    category,
    ui,
});