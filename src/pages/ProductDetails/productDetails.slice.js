import { createSlice } from "@reduxjs/toolkit";

const productPageSlice = createSlice({
  initialState: {
    steps: 1,
    currentSection: "additional-riders",
  },
  name: "product",
  reducers: {
    setSteps: (state, action) => {
      state.steps = action.payload;
    },
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
  },
});

export const { setSteps, setCurrentSection } = productPageSlice.actions;

export default productPageSlice.reducer;
