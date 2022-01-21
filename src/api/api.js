import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { formatCurrency } from "../utils/helper";

const { REACT_APP_API_BASE_URL: baseUrl } = process.env;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: headers => {
    const urlQueryStrings = new URLSearchParams(window.location.search);
    const EnquiryId = urlQueryStrings.get("enquiryId");
    headers.set("Enquiry-Id", EnquiryId);
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Filter", "Quote", "Enquiry", "Rider", "Cart"],
  endpoints: builder => ({
    getCities: builder.mutation({
      query: ({ searchQuery }) => ({
        url: `location-details?search=${searchQuery}`,
      }),
    }),
    getCart: builder.query({
      query: () => ({ url: `cart-items` }),
      providesTags: ["Cart"],
    }),
    createCart: builder.mutation({
      query: body => ({
        url: `cart-items`,
        body,
        method: "POST",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: { data: cartEntry },
          } = await queryFulfilled;

          dispatch(
            api.util.updateQueryData("getCart", undefined, cart => {
              const cartEntryExist = cart.data.some(
                cachedCartEntry =>
                  cachedCartEntry.group.id === cartEntry.group.id,
              );
              const updatedCart = {
                ...cart,
                data: cartEntryExist
                  ? cart.data.map(cachedCartEntry => {
                      const {
                        group: { id },
                      } = cachedCartEntry;
                      if (id === cartEntry.group.id) return cartEntry;
                      return cachedCartEntry;
                    })
                  : [...cart.data, cartEntry],
              };
              Object.assign(cart, updatedCart);
            }),
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
    deleteCart: builder.mutation({
      query: cartId => ({ url: `/cart-items/${cartId}`, method: "DELETE" }),
      onQueryStarted: (cartId, { dispatch, queryFulfilled }) => {
        const deleteCartAction = dispatch(
          api.util.updateQueryData("getCart", undefined, cart => {
            Object.assign(cart, {
              ...cart,
              data: cart.data.filter(
                cachedCartEntry => cachedCartEntry.id !== cartId,
              ),
            });
          }),
        );
        queryFulfilled.catch(deleteCartAction.undo);
      },
    }),
    getAdditionalDiscounts: builder.query({
      query: ({ productId, groupCode, sum_insured, tenure }) => ({
        url: `products/${productId}/additional-discounts?group=${groupCode}&sum_insured=${sum_insured}&tenure=${tenure}`,
      }),
    }),
    getEnquiries: builder.query({
      query: () => ({ url: `enquiries` }),
      providesTags: ["Filter", "Enquiry"],
    }),
    getQuotes: builder.query({
      query: ({
        alias,
        sum_insured_range,
        tenure,
        plan_type,
        group,
        base_plan_type = "base_health",
        journeyType = "quotes",
        deductible = 0,
      }) => {
        const endpoint = journeyType === "top_up" ? "topup-quotes" : "quotes";

        let url = `companies/${alias}/${endpoint}?sum_insured_range=${sum_insured_range}&tenure=${tenure}&plan_type=${plan_type}&group=${group}&base_plan_type=${base_plan_type}`;

        if (journeyType === "top_up") {
          url = url.concat(`&deductible=${deductible}`);
        }

        return {
          url,
        };
      },
      providesTags: ["Quote"],
    }),
    getFrontendBoot: builder.query({
      query: () => ({
        url: `frontend-boot`,
      }),
      transformResponse: res => {
        return {
          ...res,
          deductibles: res.deductibles.map(deductible => ({
            ...deductible,
            display_name: formatCurrency(deductible.code),
          })),
        };
      },
      // onQueryStarted: (_, { dispatch, queryFulfilled }) => {
      //   queryFulfilled
      //     .then((response) =>
      //       dispatch(saveFrontendData({ data: response.data }))
      //     )
      //     .catch(console.error);
      // },
    }),
    updateGroups: builder.mutation({
      query: ({ groupCode, ...body }) => ({
        url: `groups/${groupCode}`,
        body,
        method: "PUT",
      }),
      onQueryStarted: async ({ groupCode, extras }, { dispatch }) => {
        dispatch(
          api.util.updateQueryData(
            "getEnquiries",
            undefined,
            draftEnquiries => {
              Object.assign(draftEnquiries, {
                ...draftEnquiries,
                data: {
                  ...draftEnquiries.data,
                  groups: draftEnquiries.data.groups.map(group => {
                    if (group.id !== parseInt(groupCode)) return group;
                    return { ...group, extras };
                  }),
                },
              });
            },
          ),
        );
      },
    }),
    createEnquiry: builder.mutation({
      query: body => ({
        url: `/enquiries`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
      onQueryStarted: async (_data, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(
          api.util.updateQueryData("getEnquiries", undefined, draft => {
            Object.assign(draft, data.data);
          }),
        );
      },
    }),
    getRiders: builder.query({
      query: ({
        productId,
        sum_insured,
        tenure,
        group,
        selected_riders = [],
        additionalUrlQueries = "",
        journeyType = "health",
      }) => {
        let endpoint = "riders";

        if (journeyType === "top_up") {
          endpoint = "top_up-riders";
        }

        let url = `products/${productId}/${endpoint}?sum_insured=${sum_insured}&tenure=${tenure}&group=${group}`;

        if (selected_riders.length)
          url = url.concat(`&selected_riders=${selected_riders.join(",")}`);

        if (additionalUrlQueries) url = url.concat(`&${additionalUrlQueries}`);

        return {
          url,
        };
      },
      providesTags: ["Rider"],
    }),
    getDiscounts: builder.query({
      query: ({
        product_id,
        sum_insured,
        group,
        deductible,
        journeyType = "health",
      }) => {
        let url = `products/${product_id}/discounts?sum_insured=${sum_insured}&group=${group}`;
        if (journeyType === "top_up") {
          url = `products/${product_id}/topup-discounts?sum_insured=${sum_insured}&group=${group}&deductible=${deductible}`;
        }
        return {
          url,
        };
      },
    }),
    updateCart: builder.mutation({
      query: ({ cartId, ...body }) => ({
        url: `/cart-items/${cartId}`,
        method: "PUT",
        body,
      }),
    }),
    updateEnquiry: builder.mutation({
      query: body => ({
        url: `/enquiries`,
        method: "PATCH",
        body,
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        const res = await queryFulfilled;
        dispatch(
          api.util.updateQueryData("getEnquiries", undefined, draft => {
            Object.assign(draft, res.data);
          }),
        );
      },
    }),
    updateGroupMembers: updateGroupMembersQueryBuilder(builder),
    getNetworkHospitals: builder.query({
      query: company_alias => `companies/${company_alias}/network-hospitals`,
    }),
    getClaimProcess: builder.query({
      query: company_id => `companies/${company_id}/claim_processes`,
    }),
    getProductBrochure: builder.query({
      query: product_id => `products/${product_id}/brochure`,
    }),
    getAboutCompany: builder.query({
      query: company_id => `companies/${company_id}/about`,
    }),
    getProductFeatures: builder.query({
      query: product_id => `products/${product_id}/features`,
    }),
    getLocationDetails: builder.query({
      query: ({ search }) => `location-details?search=${search}`,
    }),
    getCustomQuotes: builder.query({
      queryFn: async (
        args,
        { dispatch },
        _extraOptions,
        fetchWithBaseQuery,
      ) => {
        const {
          insurers = [],
          sum_insured_range,
          tenure,
          plan_type,
          group,
          base_plan_type = "base_health",
          journeyType = "health",
          deductible = 0,
        } = args;
        function getQuotes(insurer) {
          const endpoint = journeyType === "top_up" ? "topup-quotes" : "quotes";

          let url = `companies/${insurer}/${endpoint}?sum_insured_range=${sum_insured_range}&tenure=${tenure}&plan_type=${plan_type}&group=${group}&base_plan_type=${base_plan_type}`;

          if (journeyType === "top_up") {
            url = url.concat(`&deductible=${deductible}`);
          }

          return fetchWithBaseQuery(url).then(res => {
            if (res.data) {
              dispatch(
                api.util.updateQueryData("getCustomQuotes", args, draft => {
                  Object.assign(draft, [
                    ...draft,
                    { company_alias: insurer, data: res.data },
                  ]);
                }),
              );
            }
          });
        }

        Promise.all(insurers.map(insurer => getQuotes(insurer)));

        return { data: [] };
      },
    }),
    updateCompareQuotes: builder.mutation({
      query: body => ({
        url: "/comparisons",
        body,
        method: "PUT",
      }),
    }),
    getCompareQuotes: builder.query({
      query: () => `/comparisons`,
    }),
  }),
});

export const {
  useGetCitiesMutation,
  useGetCartQuery,
  useGetAdditionalDiscountsQuery,
  useGetQuotesQuery,
  useGetEnquiriesQuery,
  useGetFrontendBootQuery,
  useUpdateGroupsMutation,
  useCreateCartMutation,
  useDeleteCartMutation,
  useCreateEnquiryMutation,
  useGetRidersQuery,
  useGetDiscountsQuery,
  useUpdateCartMutation,
  useUpdateEnquiryMutation,
  useUpdateGroupMembersMutation,
  useGetNetworkHospitalsQuery,
  useGetClaimProcessQuery,
  useGetProductBrochureQuery,
  useGetAboutCompanyQuery,
  useGetProductFeaturesQuery,
  useGetLocationDetailsQuery,
  useGetCustomQuotesQuery,
  useUpdateCompareQuotesMutation,
  useGetCompareQuotesQuery
} = api;

function updateGroupMembersQueryBuilder(builder) {
  return builder.mutation({
    queryFn: async (
      {
        members,
        filters: {
          sum_insured_range,
          tenure,
          plan_type,
          group,
          base_plan_type,
        },
        quote: { product, sum_insured },
      },
      _queryApi,
      _extraOptions,
      fetchWithBaseQuery,
    ) => {
      try {
        const { data: updateEnquiriesResult, error: updateEnquiryError } =
          await fetchWithBaseQuery({
            url: `/enquiries`,
            method: "PATCH",
            body: { members },
          });

        if (updateEnquiryError) return { error: updateEnquiryError };

        const getQuoteResult = await fetchWithBaseQuery(
          `companies/${product.company.alias}/quotes?sum_insured_range=${sum_insured_range}&tenure=${tenure}&plan_type=${plan_type}&group=${group}&base_plan_type=${base_plan_type}`,
        );

        if (getQuoteResult.data && updateEnquiriesResult) {
          const updatedQuote = getQuoteResult.data.data.find(quote => {
            const productIdmatch =
              parseInt(quote.product.id) === parseInt(product.id);
            const coverMatch =
              parseInt(sum_insured) === parseInt(quote.sum_insured);
            const isQuoteMatch = !!(productIdmatch && coverMatch);
            return isQuoteMatch;
          });
          if (!updatedQuote)
            return {
              error: {
                data: {
                  errors: [
                    "Your selected base plan is not eligible for given age",
                  ],
                },
              },
            };
          return { data: { updatedQuote, updateEnquiriesResult } };
        }

        return getQuoteResult;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  });
}
