import { combineReducers } from "redux";
import {
  CartPageSlice,
  comparePageSlice,
  frontendBootSlice,
  greetingPageSlice,
  ProductDetailsSlice,
  SeeDetailsSlice,

  proposalPageSlice,

  quotePageSlice,

} from "../pages";

export default combineReducers({
  frontendBoot: frontendBootSlice,
  greetingPage: greetingPageSlice,
  comparePage: comparePageSlice,
  quotePage: quotePageSlice,
  cart: CartPageSlice,
  proposalPage: proposalPageSlice,
  seeDetails: SeeDetailsSlice,
  productPage: ProductDetailsSlice,
});
