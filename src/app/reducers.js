import { combineReducers } from "redux";
import {
  CartPageSlice,
  comparePageSlice,
  frontendBootSlice,
  greetingPageSlice,
  ProductDetailsSlice,
  SeeDetailsSlice,
  schemaSlice,
  proposalPageSlice,
  quotePageSlice,
} from "../pages";
import FormBuilderSlice from "./../components/FormBuilder/FormBuilder.slice";

export default combineReducers({
  frontendBoot: frontendBootSlice,
  greetingPage: greetingPageSlice,
  comparePage: comparePageSlice,
  quotePage: quotePageSlice,
  cart: CartPageSlice,
  proposalPage: proposalPageSlice,
  seeDetails: SeeDetailsSlice,
  productPage: ProductDetailsSlice,
  schema: schemaSlice,
  formBuilder: FormBuilderSlice,
});
