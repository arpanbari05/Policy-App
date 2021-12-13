import { createSlice } from "@reduxjs/toolkit";

const productPageSlice = createSlice({
  initialState: {
    steps: 1,
    currentSection: "additional-riders",
    expandMobile: false,
    additionalDiscounts: [],
  },
  name: "product",
  reducers: {
    setSteps: (state, action) => {
      state.steps = action.payload;
    },
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
    setexpandMobile: (state, action) => {
      state.expandMobile = action.payload;
    },
    setAdditionalDiscounts: (state, action) => {
      state.additionalDiscounts = action.payload;
    },
  },
});

export const {
  setSteps,
  setCurrentSection,
  setexpandMobile,
  setAdditionalDiscounts,
} = productPageSlice.actions;

export default productPageSlice.reducer;
export const selectAdditionalDiscounts = (state) =>
  state.productPage.additionalDiscounts;
