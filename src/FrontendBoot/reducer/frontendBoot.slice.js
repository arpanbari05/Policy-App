import { createSlice } from "@reduxjs/toolkit";
import { getFrontendData } from "../serviceApi/frontendBoot";
//import { setFilters } from "../../modules/QuotesPage/quotePage.slice";

import SecureLS from "secure-ls";
import axios from "axios";
import { setFilters } from "../../pages/quotePage/quote.slice";

const ls = new SecureLS();

const frontEndBoot = createSlice({
  name: "frontendBoot",
  initialState: { frontendData: {}, loading: false, error: false },
  reducers: {
    requestFrontendData: (state, action) => {
      return { loading: true, frontendData: [], error: false };
    },
    saveFrontendData: (state, action) => {
      return { loading: false, frontendData: action.payload, error: false };
    },
    catchFrontendData: (state, action) => {
      return { loading: false, error: action.payload, error: false };
    },
  },
});

export const { requestFrontendData, saveFrontendData, catchFrontendData } =
  frontEndBoot.actions;

export default frontEndBoot.reducer;

export const fetchFrontendData = (onFetch = () => {}) => {
  return async dispatch => {
    try {
      dispatch(requestFrontendData());
      const data = await getFrontendData();
      const { cover, plan_type, tenure } = data.data.defaultfilters;
      const { covers, plantypes } = data.data;

      dispatch(
        setFilters({
          cover: covers.find(c => c.code === cover).display_name,
          planType: plantypes.find(p => p.code === plan_type).display_name,
          multiYear: `${tenure} Year`,
        }),
      );

      dispatch(saveFrontendData(data));

      onFetch(data);
    } catch {
      dispatch(catchFrontendData());
    }
  };
};

export const selectCompany = company_alias => state =>
  state.frontendBoot.frontendData.data.companies[company_alias];
