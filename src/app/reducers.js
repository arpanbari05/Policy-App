import { combineReducers } from "redux";
import { frontendBootSlice, greetingPageSlice, quotePageSlice } from "../pages";


export default combineReducers({
  frontendBoot: frontendBootSlice,
  greetingPage: greetingPageSlice,

  quotePage:quotePageSlice,

});
