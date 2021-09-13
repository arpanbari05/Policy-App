import { combineReducers } from "redux";
import {
  CartPageSlice,
  comparePageSlice,
  frontendBootSlice,
  greetingPageSlice,
  ProductDetailsSlice,
  SeeDetailsSlice,
  quotePageSlice,
} from "../pages";

export default combineReducers({
  frontendBoot: frontendBootSlice,
  greetingPage: greetingPageSlice,
  comparePage: comparePageSlice,
  quotePage: quotePageSlice,
  cart: CartPageSlice,
  seeDetails: SeeDetailsSlice,
  productPage: ProductDetailsSlice,
});
