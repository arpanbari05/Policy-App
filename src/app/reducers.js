import { combineReducers } from "redux";
import {
  CartPageSlice,
  comparePageSlice,
  frontendBootSlice,
  greetingPageSlice,
  quotePageSlice,
  SeeDetailsSlice,
  proposalPageSlice,
} from "../pages";

export default combineReducers({
  frontendBoot: frontendBootSlice,
  greetingPage: greetingPageSlice,
  comparePage: comparePageSlice,
  quotePage: quotePageSlice,
  cart: CartPageSlice,
  proposalPage: proposalPageSlice,
  seeDetails: SeeDetailsSlice,
});
