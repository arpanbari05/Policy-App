import { combineReducers } from "redux";
import { frontendBootSlice, greetingPageSlice } from "../pages";


export default combineReducers({
  frontendBoot: frontendBootSlice,
  greetingPage: greetingPageSlice,
});
