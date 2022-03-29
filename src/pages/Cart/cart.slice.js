import { createSlice } from "@reduxjs/toolkit";
import { setPlanDetails } from "../ProposalPage/ProposalSections/ProposalSections.slice";
import { saveProductCart } from "../quotePage/quote.slice";
import { getCartApi } from "./serviceApi";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPremium: 0,
    discounted_total_premium: 0,
    feature_options: {},
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
    setdiscounted_total_premium: (state, action) => {
      state.discounted_total_premium = action.payload;
    },
    setCart: (state, action) => {
      return (state = {
        ...state,
        ...action.payload,
      });
    },
    restoreInitialCart: state => {
      state = {
        ...state,
        totalPremium: 0,
        discounted_total_premium: 0,
      };
    },
    setFeatureOptions: (state, action) => {
      state.feature_options = { ...action.payload };
    },
  },
});

export const {
  addQuoteToCart,
  removeQuoteFromCart,
  setTotalPremium,
  restoreInitialCart,
  setdiscounted_total_premium,
  setCart,
  setFeatureOptions,
} = cartSlice.actions;

export const getCart = (checkRenewal, next) => async (dispatch, getState) => {
  try {
    let prevCart = getState().cart;

    // prevCart["discounted_total_premium"] = Object.keys(prevCart).map((acc,key) => {
    //   if(parseInt(key) && key.discounted_total_premium) return acc += key.discounted_total_premium
    // },0)

    const name = getState().greetingPage.proposerDetails.name;
    const { data, statusCode } = await getCartApi();
    if (statusCode === 200) {
      const { discounted_total_premium, total_premium, ...cartData } = data;
      let fetchedCart = {
        discounted_total_premium,
        totalPremium: total_premium,
      };

      cartData.data.forEach(cartItem => {
        const groupCode = cartItem.group.id;
        fetchedCart[groupCode] = cartItem;
      });

      dispatch(setCart(fetchedCart));
      dispatch(saveProductCart(data.data));
      let planUnavailableCheck = cartData.data.some(
        el => el.unavailable_message !== "" && el.unavailable_message !== null,
      );

      if (
        checkRenewal &&
        (planUnavailableCheck ||
          (prevCart.totalPremium &&
            parseInt(prevCart.totalPremium).toLocaleString("en-IN") !==
              parseInt(data.total_premium).toLocaleString("en-IN")))
      ) {
        dispatch(
          setPlanDetails({
            show: true,
            title: `Hi ${
              name.split(" ")[0].charAt(0).toUpperCase() +
              name.split(" ")[0].slice(1)
            }, Revised Premium due to change in date of birth`,
            prevCart,
            isRenewed: true,
          }),
        );
      } else if (checkRenewal) {
        next();
      }
    }
  } catch (error) {}
};

export default cartSlice.reducer;
