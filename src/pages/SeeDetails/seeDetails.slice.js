import { createSlice } from "@reduxjs/toolkit";

const seeDetailsSlice = createSlice({
  initialState: {
    loading: false,
  },
  name: "compare",
  reducers: {
    requestDetails(state) {
      state.loading = true;
    },
    requestDetailsSuccess(state) {
      state.loading = false;
    },
    requestDetailsFailed(state) {
      state.loading = false;
    },
  },
});

export const { requestDetails, requestDetailsSuccess, requestDetailsFailed } =
  seeDetailsSlice.actions;

export default seeDetailsSlice.reducer;
