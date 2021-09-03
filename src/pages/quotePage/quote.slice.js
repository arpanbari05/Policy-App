import { createSlice } from "@reduxjs/toolkit";
import { getQutoes } from "./serviceApi";
import axios from "axios";
const quotePageSlice = createSlice({

    initialState: {
        quotes: [],
        loadingQuotes: false,
        filterQuotes: [],
        shouldFetchQuotes: false,
        selectedGroup: "group_code_1",
    },
    name: "quote",
    reducers: {
        setQuotes: (state, action) => {
            state.quotes = action.payload;
        },
        setLoadingQuotes: (state, action) => {
            state.loadingQuotes = action.payload;
        },
        replaceQuotes: (state, action) => {
            state.quotes = action.payload;
        },
        saveQuotes: (state, action) => {
            state.quotes = [...state.quotes, action.payload];
            state.filterQuotes = [...state.filterQuotes, action.payload];
        },
        setShouldFetchQuotes: (state, action) => {
            state.shouldFetchQuotes = action.payload;
        },
        setSelectedGroup: (state, action) => {
            state.selectedGroup = action.payload;
        },
    },
});
export const {
    setQuotes,
    setLoadingQuotes,
    saveQuotes,
    replaceQuotes,
    setShouldFetchQuotes,
    setSelectedGroup,

} = quotePageSlice.actions;


// ................................................................................................................................
const cancelTokens = {};

export const fetchQuotes =
    (companies, { sum_insured, tenure, plan_type, member, basePlanType }) =>
        async (dispatch, store) => {
            try {
                const filters = store().quotePage.filters;
                const baseplantypes =
                    store().frontendBoot.frontendData.data.baseplantypes;
                const selectedBasePlanType = baseplantypes.find(
                    bpt => bpt.display_name === filters.basePlanType,
                );

                dispatch(setLoadingQuotes(true));
                Object.keys(cancelTokens).forEach(cancelToken => {
                    cancelTokens[cancelToken].cancel("Cancelled due to new request made");
                });
                // let count = 0;
                const fetchQuote = async ({
                    alias,
                    sum_insured,
                    tenure,
                    member,
                    plan_type,
                    cancelToken,
                }) => {
                    try {
                        const response = await getQutoes(
                            {
                                alias,
                                sum_insured,
                                tenure,
                                member,
                                plan_type,
                                base_plan_type:
                                    basePlanType || selectedBasePlanType
                                        ? selectedBasePlanType.code
                                        : "base_health",
                            },
                            {
                                cancelToken,
                            },
                        );
                        const cashlessHospitalsCount =
                            response.data?.cashless_hospitals_count;
                        const quoteData = response?.data?.data.map(data => {
                            return {
                                logo: companies[data.company_alias].logo,
                                cashlessHospitalsCount,
                                ...data,
                            };
                        });
                        // count++;
                        if (quoteData) {
                            dispatch(saveQuotes(quoteData));
                        }
                        delete cancelTokens[alias];
                        if (Object.keys(cancelTokens).length === 0) {
                            dispatch(setLoadingQuotes(false));
                        }
                    } catch (error) {
                        alert(error);
                        console.error(error);
                    }
                };

                dispatch(replaceQuotes([]));

                Object.keys(companies).forEach(alias => {
                    const cancelTokenSource = axios.CancelToken.source();
                    cancelTokens[alias] = cancelTokenSource;
                    fetchQuote({
                        alias,
                        cancelToken: cancelTokenSource.token,
                        sum_insured,
                        tenure,
                        plan_type,
                        member,
                    });
                });
            } catch (error) { }
        };


// ................................................................................................................................

export default quotePageSlice.reducer;