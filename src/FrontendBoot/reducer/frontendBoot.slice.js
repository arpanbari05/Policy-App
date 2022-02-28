import { createSlice } from "@reduxjs/toolkit";
import { getFrontendData } from "../serviceApi/frontendBoot";
//import { setFilters } from "../../modules/QuotesPage/quotePage.slice";
import { theme } from ".././../assets/global";
import SecureLS from "secure-ls";
import axios from "axios";
import { setFilters } from "../../pages/quotePage/quote.slice";

const ls = new SecureLS();

const frontEndBoot = createSlice({
  name: "frontendBoot",
  initialState: {
    frontendData: {},
    // theme,
    tempModifications: {
      hideMultiIndivedualPlans: false,
    },
    loading: false,
    error: false,
  },
  reducers: {
    requestFrontendData: (state, action) => {
      state.loading = true;
      state.error = false;
      // return { loading: true, frontendData: [], error: false };
    },
    saveFrontendData: (state, action) => {
      state.loading = false;
      state.frontendData = action.payload;
      state.error = false;
      // return { loading: false, frontendData: action.payload, error: false };
    },
    catchFrontendData: (state, action) => {
      state.loading = false;
      state.error = action.payload;

      //return { loading: false, error: action.payload, error: false };
    },
    updateTheme: (state, action) => {
      state.theme = { ...state.theme, ...action.payload };
    },
  },
});

export const {
  requestFrontendData,
  saveFrontendData,
  catchFrontendData,
  updateTheme,
} = frontEndBoot.actions;

export default frontEndBoot.reducer;

export const fetchFrontendData = (onFetch = () => {}) => {
  return async dispatch => {
    try {
      dispatch(requestFrontendData());
      const data = await getFrontendData();
      // const { cover, plan_type, tenure } = data.data.defaultfilters;
      // const { covers, plantypes } = data.data;

      dispatch(saveFrontendData(data));

      onFetch(data);
    } catch {
      dispatch(catchFrontendData());
    }
  };
};

export const selectCompany = company_alias => state =>
  state.frontendBoot.frontendData.data.companies[company_alias];
export const selectCompanies = state =>
  state.frontendBoot.frontendData.data.companies;
export const selectTheme = state => state.frontendBoot.theme;
