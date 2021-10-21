import { createSlice } from "@reduxjs/toolkit";

const seeDetailsSlice = createSlice({
  initialState: {
    loading: false,
   
  },
  name: "compare",
  reducers: {
    requestDetails(state, action) {
      state.loading = true;
    },
    requestDetailsSuccess(state, action) {
      state.loading = false;
    },
    requestDetailsFailed(state, action) {
      state.loading = false;
    },
  },
});

export const { requestDetails, requestDetailsSuccess, requestDetailsFailed } =
  seeDetailsSlice.actions;

export default seeDetailsSlice.reducer;
