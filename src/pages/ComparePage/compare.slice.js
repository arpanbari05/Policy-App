import { createSlice, current } from "@reduxjs/toolkit";
import { updateQuotesForCompare } from "../quotePage/quote.slice";
import { getFeaturesApi, getRidersApi } from "../quotePage/serviceApi";

// import {
//   getFeaturesApi,
//   getRidersApi,
// } from "../quotePage/ServiceApi/serviceApi";
import { fetchComparison, sendEmail, updateComparison } from "./serviceApi";

const comparePageSlice = createSlice({
  initialState: {
    loading: false,
    downloading: false,
    shouldNotFetch: false,
    shoutGetCompare: false,
    planType: null,
    quotes: [],
    discount: {},
    riders: {},
    ridersPremium: {},
    emailStatus: {},
  },
  name: "compare",
  reducers: {
    updatePlanType(state, action) {
      state.planType = action.payload;
    },
    requestDownload(state) {
      state.downloading = true;
    },
    requestDownloadSuccess(state) {
      state.downloading = false;
    },
    requestFeatures(state) {
      state.loading = true;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setShouldNotFetch(state, action) {
      state.shouldNotFetch = action.payload;
    },
    setShoutGetCompare(state, action) {
      state.shoutGetCompare = action.payload;
    },
    requestFeatureSuccess(state, action) {
      if (action.payload.success) {
        state.loading = false;
      }
      state.quotes = [...state.quotes, action.payload.quote];
    },
    requestFeatureFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    removeFeature(state, action) {
      state.quotes = state.quotes.filter(
        data =>
          `${data.data.product.id}${data.data.sum_insured}` !== action.payload,
      );
    },
    resetFeature(state, action) {
      state.quotes = [];
    },
    clearLoading(state) {
      state.loading = false;
    },
    updateDiscount(state, { payload }) {
      state.discount = payload;
    },
    setRider(state, { payload }) {
      state.riders = payload;
    },
    setPremiums(state, { payload }) {
      state.ridersPremium = payload;
    },
    setEmail(state, { payload }) {
      state.emailStatus = payload;
    },
  },
});

export const {
  requestFeatures,setLoading,
  requestFeatureSuccess,
  requestFeatureFail,
  resetFeature,
  setShoutGetCompare,
  clearLoading,
  requestDownload,
  requestDownloadSuccess,
  updateDiscount,
  setPremiums,
  setRider,
  updatePlanType,
  setShouldNotFetch,
  setEmail,
  removeFeature,
} = comparePageSlice.actions;
export const updatePremiumQuote = (currentIndex, tenure, id) => {
  return (dispatch, getState) => {
    let discount = getState().comparePage.discount;
    let premiumObject = getState().quotePage.productDiscounts[tenure - 1];

    dispatch(updateDiscount({ ...discount, [id]: { ...premiumObject } }));
  };
};
export const addPremium = (productId, sum_insured, premium) => {
  return (dispatch, getState) => {
    let ridersPremium = getState().comparePage.ridersPremium;
    dispatch(
      setPremiums({
        ...ridersPremium,
        [`${productId}${sum_insured}`]:
          (ridersPremium[`${productId}${sum_insured}`] || 0) + premium,
      }),
    );
  };
};
export const updateQuotes = req => {
  return async dispatch => {
    try {
      await updateComparison(req);
    } catch (error) {
      console.error(error);
    }
  };
};
export const getCompare = () => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const res = await fetchComparison();
      const ForCompare = res.data.data.products.map(data => data.product_id);

      dispatch(updatePlanType(res.data.data.products[0].plan_type));
      dispatch(updateQuotesForCompare(ForCompare));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      console.error(err);
    }
  };
};
export const subtractPremium = (productId, sum_insured, premium) => {
  return (dispatch, getState) => {
    let ridersPremium = getState().comparePage.ridersPremium;
    dispatch(
      setPremiums({
        ...ridersPremium,
        [`${productId}${sum_insured}`]:
          (ridersPremium[`${productId}${sum_insured}`] || 0) - premium,
      }),
    );
  };
};
export const insertRider = (productId, sum_insured, rider) => {
  return (dispatch, getState) => {
    let riders = getState().comparePage.riders;
    dispatch(
      setRider({
        ...riders,
        [`${productId}${sum_insured}`]: [
          ...(riders[`${productId}${sum_insured}`]
            ? riders[`${productId}${sum_insured}`]
            : []),
          rider,
        ],
      }),
    );
    dispatch(addPremium(productId, sum_insured, rider.total_premium));
  };
};
export const removeRider = (productId, sum_insured, rider) => {
  return (dispatch, getState) => {
    let riders = getState().comparePage.riders;
    let temp = riders[`${productId}${sum_insured}`].filter(
      item => item.name !== rider.name,
    );
    dispatch(setRider({ ...riders, [`${productId}${sum_insured}`]: temp }));
    dispatch(subtractPremium(productId, sum_insured, rider.total_premium));
  };
};
export const clearRiders = (productId, sum_insured) => {
  return (dispatch, getState) => {
    let riders = getState().comparePage.riders;
    let ridersPremium = getState().comparePage.ridersPremium;
    delete riders[`${productId}${sum_insured}`];
    delete ridersPremium[`${productId}${sum_insured}`];
    dispatch(setRider(riders));
    dispatch(setPremiums(ridersPremium));
  };
};
export const getFeatures =
  (data, currentIndex, groupCode, discount) => async (dispatch, getState) => {
    const length = getState().quotePage.quotesForCompare.length;
    let success = true;
    if (currentIndex === length - 1) {
      success = true;
    }
    dispatch(resetFeature());
    try {
      dispatch(requestFeatures());
      const res = await getFeaturesApi(data.product.id);
      const riders = await getRidersApi({
        productId: data.product.id,
        sum_insured: data.sum_insured,
        tenure: discount ? discount.tenure : data.tenure,
        group: groupCode,
      });
      res?.data?.splice(2, 0, {
        name: "Additional Benefits",
        description: "",
        riders: riders?.data?.data,
      });
      dispatch(
        requestFeatureSuccess({
          quote: { data, features: [...res?.data] },
          success,
        }),
      );
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
export const sendEmailAction = req => {
  return async dispatch => {
    try {
      const res = await sendEmail(req);

      if (res.statusCode === 200)
        dispatch(
          setEmail({ status: true, message: "Email sent successfully" }),
        );
      else dispatch(setEmail({ status: false, message: "Email not sent" }));
    } catch (err) {
      console.error(err);
    }
  };
};
export default comparePageSlice.reducer;
