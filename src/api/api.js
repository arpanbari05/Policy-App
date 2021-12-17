import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { REACT_APP_API_BASE_URL: baseUrl } = process.env;

export const api = createApi({
  reducerPath: "riderApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const urlQueryStrings = new URLSearchParams(window.location.search);
      const EnquiryId = urlQueryStrings.get("enquiryId");
      headers.set("Enquiry-Id", EnquiryId);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCities: builder.mutation({
      query: ({ searchQuery }) => ({
        url: `location-details?search=${searchQuery}`,
      }),
    }),
    getCart: builder.query({
      query: () => ({ url: `cart-items` }),
    }),
    getAdditionalDiscounts: builder.query({
      query: ({ productId, groupCode, sum_insured, tenure }) => ({
        url: `products/${productId}/additional-discounts?group=${groupCode}&sum_insured=${sum_insured}&tenure=${tenure}`,
      }),
    }),
  }),
});

export const {
  useGetCitiesMutation,
  useGetCartQuery,
  useGetAdditionalDiscountsQuery,
} = api;
