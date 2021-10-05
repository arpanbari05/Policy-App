import { createSlice } from "@reduxjs/toolkit";

const productPageSlice = createSlice({
  initialState: {
    steps: 1,
    currentSection: "additional-riders",
    expandMobile:false
  },
  name: "product",
  reducers: {
    setSteps: (state, action) => {
      state.steps = action.payload;
    },
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
    setexpandMobile:(state, action) => {
      state.expandMobile = action.payload;
    },
  },
});

export const { setSteps, setCurrentSection, setexpandMobile } = productPageSlice.actions;

export default productPageSlice.reducer;
