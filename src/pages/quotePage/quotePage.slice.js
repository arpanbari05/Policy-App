import { createSlice } from "@reduxjs/toolkit";
import {getQutoes} from "./serviceApi/serviceApi";
  import SecureLS from "secure-ls";
  import axios from "axios";
const ls = new SecureLS();

export const quotePageSlice = createSlice({
    innitialState:{
        quotes:[],
        filters:{
            insurers: [""],
            premium: "",
            cover: "",
            ownCover: "",
            planType: "",
            multiYear: "",
            basePlanType: "Base health",
            moreFilters: {},
        }
    },
    name: "quotes",
    reducers: {
        setFilters: (state,action) => {
            state.filters = { ...state.filters, ...action.payload}
        },
        setQuotes: (state,action) => {
            state.quotes = [...action.payload]
        }
    }
});

export const updateFilters = (updatedFilters) => {
    console.log(updatedFilters)
}