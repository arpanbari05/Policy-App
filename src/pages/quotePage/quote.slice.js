import { createSlice } from "@reduxjs/toolkit";
const quotePageSlice = createSlice({

    initialState: {
        quotes: [],
        loadingQuotes: false,
    },
    name: "quote",
    reducers: {
        setQuotes: (state, action) => {
            state.quotes = action.payload;
        },
        setLoadingQuotes: (state, action) => {
            state.loadingQuotes = action.payload;
        },
    },
});
export const {
    setQuotes,
    setLoadingQuotes,
} = quotePageSlice.actions;


export default quotePageSlice.reducer;