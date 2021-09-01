import { combineReducers } from "redux";
import { frontendBootSlice } from "../pages";


export default combineReducers({
  frontendBoot: frontendBootSlice,
});
