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
  }),
});

export const { useGetCitiesMutation } = api;
