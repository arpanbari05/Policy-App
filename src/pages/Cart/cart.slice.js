import { createSlice } from "@reduxjs/toolkit";
//import { setPlanDetails } from "../ProposalPage/ProposalSections/ProposalSections.slice";
import { getCartApi } from "./serviceApi";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPremium: 0,
  },
  reducers: {
    addQuoteToCart: (state, action) => {
      const { groupCode, product } = action.payload;
      state[groupCode] = { ...product };
    },
    removeQuoteFromCart: (state, action) => {
      const groupCode = action.payload;
      state[groupCode] = null;
    },
    setTotalPremium: (state, action) => {
      state.totalPremium = action.payload;
    },
  },
});

export const { addQuoteToCart, removeQuoteFromCart, setTotalPremium } =
  cartSlice.actions;

export const getCart = (checkRenewal, next) => async (dispatch, getState) => {
  try {
    const prevCart = getState().cart;
    const name = getState().greetingPage.proposerDetails.name;
    const { data, statusCode } = await getCartApi();
    if (statusCode === 200) {
      data.data.forEach(cart => {
        const groupCode = cart.group.id;
        dispatch(addQuoteToCart({ groupCode, product: cart }));
        dispatch(setTotalPremium(data.total_premium.toLocaleString("en-IN")));
      });

      if (
        checkRenewal &&
        prevCart.totalPremium !== data.total_premium.toLocaleString("en-IN")
      ) {
        // dispatch(
        //   setPlanDetails({
        //     show: true,
        //     title: `Hi ${
        //       name.split(" ")[0]
        //     }, your premium has been revised due to change in date of birth`,
        //     prevCart,
        //     isRenewed: true,
        //   }),
        // );
      } else if (checkRenewal) {
        next();
      }
    }
  } catch (error) {}
};

export default cartSlice.reducer;
