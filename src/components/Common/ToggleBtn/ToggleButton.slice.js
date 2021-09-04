import { createSlice } from "@reduxjs/toolkit";

const ToggleFontSlice = createSlice({
	name: "ToggleFontSlice",
	initialState: { boldFont: false },
	reducers: {
		toggleFont: (state) => {
			state.boldFont = !state.boldFont;
		},
	},
});

export const { toggleFont } = ToggleFontSlice.actions;

export default ToggleFontSlice.reducer;
