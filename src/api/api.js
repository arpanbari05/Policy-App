import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { formatCurrency, mergeQuotes } from "../utils/helper";

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
  tagTypes: [
    "Filter",
    "Quote",
    "Enquiry",
    "Rider",
    "Cart",
    "AdditionalDiscount",
    "TenureDiscount",
    "ProposalSummaryUpdate",
  ],
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
      providesTags: ["AdditionalDiscount"],
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
      onQueryStarted: async (_data, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(
          api.util.updateQueryData("getEnquiries", undefined, draft => {
            if (draft) Object.assign(draft, data);
          }),
        );
      },
    }),
    getRiders: builder.query({
      query: ({
        productId,
        sum_insured,
        deductible,
        tenure,
        group,
        selected_riders = [],
        additionalUrlQueries = "",
        feature_options,
        journeyType = "health",
      }) => {
        let endpoint = "riders";

        if (journeyType === "top_up") {
          endpoint = "top_up-riders";
        }

        if (journeyType === "renewal") {
          endpoint = "renewal-riders";
        }

        let url = `products/${productId}/${endpoint}?sum_insured=${sum_insured}&tenure=${tenure}&group=${group}`;

        if (selected_riders.length)
          url = url.concat(`&selected_riders=${selected_riders.join(",")}`);

        if (deductible) url = url.concat(`&deductible=${deductible}`);

        if (additionalUrlQueries) url = url.concat(`&${additionalUrlQueries}`);

        if (feature_options) {
          const featureOptionsQuery = [];
          Object.keys(feature_options).forEach(key => {
            featureOptionsQuery.push(`${key}=${feature_options[key]}`);
          });
          url = url.concat(`&${featureOptionsQuery.join("&")}`);
        }

        return {
          url,
        };
      },
      providesTags: ["Rider"],
    }),
    deleteGroup: builder.query({
      query: groupId => ({ url: `groups/${groupId}`, method: "DELETE" }),
    }),
    getDiscounts: builder.query({
      query: ({
        product_id,
        sum_insured,
        group,
        deductible,
        feature_options = "",
        journeyType = "health",
      }) => {
        let url = `products/${product_id}/discounts?sum_insured=${sum_insured}&group=${group}&${feature_options}`;
        if (journeyType === "top_up") {
          url = `products/${product_id}/topup-discounts?sum_insured=${sum_insured}&group=${group}&deductible=${deductible}`;
        }
        if (journeyType === "renewal") {
          url = `products/${product_id}/renewal-discounts?sum_insured=${sum_insured}&group=${group}&deductible=${deductible}`;
        }
        return {
          url,
        };
      },
      providesTags: ["TenureDiscount"],
    }),
    updateCart: builder.mutation({
      query: ({ cartId, ...body }) => ({
        url: `/cart-items/${cartId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Cart"],
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
      onQueryStarted: (args, { dispatch }) => {
        dispatch(
          api.util.updateQueryData("getCompareQuotes", undefined, draft => {
            Object.assign(draft, { data: args });
          }),
        );
      },
    }),
    getCompareQuotes: builder.query({
      query: () => `/comparisons`,
    }),
    getCompareFeatures: builder.query({
      query: productId => `products/${productId}/features`,
    }),
    getProposalData: builder.query({
      query: () => ({ url: "health/proposals" }),
      providesTags: ["ProposalSummaryUpdate"],
    }),
    getTopUpAddOns: builder.query({
      queryFn: async (
        { sum_insured, groupCode, tenure, companies = [], insurance_type },
        { dispatch },
        _extraOptions,
        fetchWithBaseQuery,
      ) => {
        const topUpUrls = companies.map(company_alias =>
          quoteUrl(company_alias, insurance_type, {
            sum_insured,
            groupCode,
            tenure,
          }),
        );

        const topUpQuotesResponses = await getQuotePromises(
          topUpUrls,
          fetchWithBaseQuery,
          { afterEach: res => console.log({ res }) },
        );

        const topUpQuotes = topUpQuotesResponses
          .map(quotesResponse => quotesResponse.data?.data)
          .map(quotes => mergeQuotes(quotes));

        return {
          data: topUpQuotes,
        };
      },
    }),
    updateRenewalQuery: builder.mutation({
      query: ({ company_alias, policy_no, section = "renewal" }) => {
        return {
          url: "renewal-enquiries",
          body: {
            company_alias,
            policy_no,
            section,
          },
          method: "POST",
        };
      },
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getEnquiries", undefined, draft => {
              //?draft : the targeted object i.e. getEnquires object from store.
              return Object.assign(draft, res?.data);
              //? assign(targetObject , newObject)<updated object>
            }),
          );
        } catch (error) {}
      },
    }),
  }),
});

function getQuotePromises(urls, fetchWithBaseQuery, { afterEach } = {}) {
  return Promise.all(
    urls.map(url =>
      fetchWithBaseQuery(url).then(res => {
        afterEach && afterEach(res);
        return res;
      }),
    ),
  );
}

const quoteEndpoints = {
  top_up: "topup-quotes",
  critical_illness: "critical-illness-quotes",
  cancer: "cancer-quotes",
};

function getQuoteEndpoint(insurance_type) {
  return quoteEndpoints[insurance_type];
}

function quoteUrl(
  company_alias,
  insurance_type,
  { sum_insured, tenure = 1, groupCode } = {},
) {
  const quoteEndpoint = getQuoteEndpoint(insurance_type);
  let url = `companies/${company_alias}/${quoteEndpoint}?tenure=${tenure}&group=${groupCode}`;

  if (insurance_type === "top_up") {
    url = url.concat(`&deductible=${sum_insured}`);
    return url;
  }

  if (sum_insured) {
    url = url.concat(`&sum_insured=${sum_insured}`);
    return url;
  }

  return url;
}

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
  useDeleteGroupQuery,
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
  useGetCompareQuotesQuery,
  useGetCompareFeaturesQuery,
  usePrefetch,
  useGetProposalDataQuery,
  useGetTopUpAddOnsQuery,
  useUpdateRenewalQueryMutation,
} = api;

function updateGroupMembersQueryBuilder(builder) {
  return builder.mutation({
    queryFn: async ({ members }, _utils, _extraOptions, fetchWithBaseQuery) => {
      try {
        const { data: updateEnquiriesResult, error: updateEnquiryError } =
          await fetchWithBaseQuery({
            url: `/enquiries`,
            method: "PATCH",
            body: { members },
          });

        if (updateEnquiryError) return { error: updateEnquiryError };

        const getCartResult = await fetchWithBaseQuery({ url: "/cart-items" });

        return {
          data: { updateEnquiriesResult, getCartResult: getCartResult.data },
        };
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  });
}
