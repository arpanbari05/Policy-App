import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  api,
  useCreateCartMutation,
  useCreateEnquiryMutation,
  useDeleteCartMutation,
  useGetAdditionalDiscountsQuery,
  useGetCartQuery,
  useGetCompareFeaturesQuery,
  useGetCompareQuotesQuery,
  useGetCustomQuotesQuery,
  useGetDiscountsQuery,
  useGetEnquiriesQuery,
  useUpdateCartMutation,
  useUpdateCompareQuotesMutation,
  useUpdateEnquiryMutation,
  useUpdateGroupMembersMutation,
  useUpdateGroupsMutation,
} from "../api/api";
import { getRiderSendData } from "../pages/Cart/hooks/useCartProduct";
import useFilters from "../pages/quotePage/components/filters/useFilters";
import { setPolicyTypes, setPolicyType } from "../pages/quotePage/quote.slice";
import useQuoteFilter from "../pages/quotePage/components/filters/useQuoteFilter";
import styles from "../styles";
import {
  capitalize,
  getMonthsForYear,
  getQuoteSendData,
  getRiderCartData,
  mergeQuotes,
} from "../utils/helper";
import { calculateTotalPremium } from "../utils/helper";
import useUrlQuery from "./useUrlQuery";
import { every, uniq } from "lodash";
import config from "../config";

const journeyTypeInsurances = {
  top_up: ["top_up"],
  health: ["health"],
};

function checkInsurenceType(company, insuranceTypesToCheck = []) {
  const { insurance_types } = company;
  const isMatchInsuranceType = insurance_types.some(insurance_type =>
    insuranceTypesToCheck.includes(insurance_type),
  );
  return isMatchInsuranceType;
}

function filterCompanies(companies = {}, insurance_types = []) {
  const filteredCompanies = {};

  for (let company_alias in companies) {
    const company = companies[company_alias];
    if (checkInsurenceType(company, insurance_types))
      filteredCompanies[company_alias] = company;
  }

  return filteredCompanies;
}

export function useCompanies() {
  let {
    data: { companies },
  } = useFrontendBoot();

  const { journeyType } = useFrontendBoot();

  const insurance_types = journeyTypeInsurances[journeyType] || [];

  companies = filterCompanies(companies, insurance_types);

  function getCompany(company_alias) {
    return companies[company_alias];
  }

  function getCompanyLogo(company_alias) {
    const company = getCompany(company_alias);

    if (!company) return;

    return company.logo;
  }

  return { getCompany, getCompanyLogo, companies };
}

export function useQuote() {
  const [createCart, queryState] = useCreateCartMutation();

  const { journeyType } = useFrontendBoot();

  const { groupCode } = useParams();

  function buyQuote(quote, riders = []) {
    const quoteData = {
      total_premium: quote.total_premium,
      sum_insured: quote.sum_insured,
      tax_amount: quote.tax_amount,
      tenure: quote.tenure,
      product_id: quote.product.id,
      premium: quote.premium,
      group_id: groupCode,
      service_tax: quote.tax_amount,
      deductible: quote.deductible,
      [journeyType === "health" ? "riders" : "top_up_riders"]:
        riders.map(getRiderCartData),
    };
    return createCart(quoteData);
  }

  const [deleteCart] = useDeleteCartMutation();

  function deleteQuote(cartId) {
    return deleteCart(cartId);
  }

  return { buyQuote, deleteQuote, queryState };
}

export function useTheme() {
  // const {
  //   data: {
  //     settings: {
  //       primary_color,
  //       primary_shade,
  //       secondary_color,
  //       secondary_shade,
  //     },
  //   },
  // } = useGetFrontendBootQuery();

  return {
    ...styles,
    colors: {
      ...styles.colors,
      primary_color: "#0a87ff",
      primary_shade: "#ecf6ff",
      secondary_color: "#2cd44a",
      secondary_shade: "#eef1f4",
    },
  };

  // return {
  //   colors: { primary_color, primary_shade, secondary_color, secondary_shade },
  // };
}

export function useFrontendBoot() {
  // const { data, isLoading, isUninitialized, ...query } =
  //   useGetFrontendBootQuery();

  // if (isUninitialized || isLoading)
  //   return { ...query, isLoading, isUninitialized, data };

  const { data: enquiryData } = useGetEnquiriesQuery();

  const data = config;

  const tenantName = data.tenant.name;

  let journeyType = "health";

  if (enquiryData?.data) {
    journeyType = enquiryData?.data?.section;
  }

  // return { journeyType, tenantName, data, isLoading, isUninitialized };
  return { journeyType, tenantName, data };
}

export function useFilter() {
  const {
    data: {
      defaultfilters: { cover, tenure, plan_type },
    },
  } = useFrontendBoot();
  const {
    data: {
      data: { groups },
    },
  } = useGetEnquiriesQuery();

  function getFilters(groupCode) {
    let currentGroup = groups.find(group => group.id === parseInt(groupCode));

    const { extras } = currentGroup;

    let tenureFilter = tenure;
    let coverFilter = cover;
    let base_plan_type = "base_health";
    let planTypeFilter = plan_type;

    if (extras) {
      if (extras.tenure) tenureFilter = extras.tenure;
      if (extras.cover) coverFilter = extras.cover;
      if (extras.baseplantype) base_plan_type = extras.baseplantype;
      if (extras.plantype) planTypeFilter = extras.plantype;
    }
    return {
      tenure: tenureFilter,
      cover: coverFilter,
      base_plan_type,
      plantype: planTypeFilter,
    };
  }

  return { getFilters };
}

export function useMembers() {

  const dispatch = useDispatch();
  let {
    data: { members },
  } = useFrontendBoot();

  const { data } = useGetEnquiriesQuery();

  const { selectedGroup } = useSelector((state) => state.quotePage);
  console.log(selectedGroup);

  useEffect(() => {
    const groupPolicyTypes = {};
    if (data) {
      const group = data.data.groups.find((el) => {
        // only "==" for avoiding type casting, do not modify to "==="
        return el.id == selectedGroup;
      });
      if (group) {
        dispatch(setPolicyType(group.plan_type));
      }
      data.data.groups.forEach(group => {
        groupPolicyTypes[group.id] = group.plan_type && group.plan_type.startsWith("F") ? "Family Floater" : group.plan_type.startsWith("M") ? "Multi Individual" : "Individual";
      })
      dispatch(setPolicyTypes({ ...groupPolicyTypes }));
    }
  }, [data, selectedGroup]);

  let groups;
  let input;

  if (data) {
    input = data.data.input;
    groups = data.data.groups;
  }

  const selectedMembers = (input?.members || []).map(member => ({
    ...member,
    code: member.type,
  }));

  const isMemberSelected = code => {
    return selectedMembers.some(member => member.code === code);
  };

  const getMember = code => {
    let member = members.find(member => member.code === code);

    if (!member) return;

    const selectedDetails = selectedMembers.find(
      member => member.code === code,
    );

    member = { ...member, multiple: ["son", "daughter"].includes(code) };

    if (selectedDetails) {
      const { age } = selectedDetails;
      return {
        ...member,
        code,
        display_name: code !== member.code ? code : member.display_name,
        isSelected: true,
        age: {
          code: age,
          display_name:
            age < 1 ? getMonthsForYear(age) + " Months" : age + " Years",
          short_display_name:
            age < 1 ? getMonthsForYear(age) + " M" : age + " Y",
        },
      };
    }

    return member;
  };

  const getSelectedMembers = () =>
    selectedMembers.map(selectedMember => getMember(selectedMember.code));

  const getAllMembers = () => {
    const allMembers = [];
    members
      .map(member => getMember(member.code))
      .forEach((member, idx) => {
        if (!member.multiple) {
          allMembers.push(member);
          return;
        }

        let multipleMembers = selectedMembers.filter(selectedMember =>
          selectedMember.code.startsWith(member.code),
        );

        if (!multipleMembers.length) {
          allMembers.push({
            ...member,
            code: `${member.code}${1}`,
            display_name: `${member.display_name}`,
            base: { code: member.code, display_name: member.display_name },
          });
          return;
        }

        multipleMembers = multipleMembers.map((multipleMember, idx) => ({
          ...member,
          code: multipleMember.code,
          age: {
            code: multipleMember.age,
            display_name:
              multipleMember.age < 1
                ? getMonthsForYear(multipleMember.age) + " Months"
                : multipleMember.age + " Years",
            short_display_name:
              multipleMember.age < 1
                ? getMonthsForYear(multipleMember.age) + " M"
                : multipleMember.age + " Y",
          },
          display_name: `${member.display_name}`,
          isSelected: true,
          multiple: idx === 0,
          base: { code: member.code, display_name: member.display_name },
        }));

        allMembers.splice(idx + 1, 0, ...multipleMembers);
      });
    return allMembers;
  };

  const getGroupMembers = groupCode => {
    const group = getGroup(groupCode);

    if (!group) return;

    const { members: groupMembers } = group;

    const allMembers = getAllMembers();

    const returnMembers = allMembers.filter(member =>
      groupMembers.includes(member.code),
    );

    return returnMembers;
  };

  function getGroup(groupCode) {
    return groups.find(group => group.id === parseInt(groupCode));
  }

  function getGroupLocation(groupCode) {
    const group = getGroup(groupCode);
    if (!group || !group.pincode) return;

    return { city: group.city, state: group.state, pincode: group.pincode };
  }

  function getNextGroup(currentGroupCode) {
    return groups.find(group => group.id === currentGroupCode + 1);
  }

  function getPreviousGroup(currentGroupCode) {
    return groups.find(group => group.id === currentGroupCode - 1);
  }

  function getLastGroup() {
    return groups[groups.length - 1];
  }

  function getMembersText(group) {
    const groupMembers = getGroupMembers(group.id);
    return groupMembers.map(member => member.display_name).join(", ");
  }

  function checkGroupExist(groupCode) {
    return groups.some(group => group.id === parseInt(groupCode));
  }

  return {
    getGroupMembers,
    isMemberSelected,
    getMember,
    getSelectedMembers,
    getAllMembers,
    getGroup,
    getGroupLocation,
    getNextGroup,
    getPreviousGroup,
    getLastGroup,
    getMembersText,
    checkGroupExist,
    groups,
  };
}

export function useUpdateGroupMembers(groupCode) {
  const dispatch = useDispatch();
  const [updateGroupMembersMutation, query] = useUpdateGroupMembersMutation();

  const { getFilters } = useFilter();

  const { getCartEntry, updateCartEntry } = useCart();

  const { getSelectedMembers } = useMembers();

  const updateGroupMembers = updatedMembers => {
    const { tenure, cover, base_plan_type, plantype } = getFilters(groupCode);

    const selectedMembers = getSelectedMembers();

    const { product, sum_insured } = getCartEntry(groupCode);

    const members = selectedMembers.map(member => {
      const updatedMember = updatedMembers.find(
        updatedMember => updatedMember.code === member.code,
      );
      if (updatedMember)
        return { age: updatedMember.age.code, type: updatedMember.code };
      return {
        age: member.age.code,
        type: member.code,
      };
    });

    return updateGroupMembersMutation({
      members,
      filters: {
        sum_insured_range: cover.code || cover,
        tenure: tenure,
        base_plan_type: base_plan_type,
        plan_type: plantype,
        group: groupCode,
      },
      quote: { product, sum_insured },
    }).then(res => {
      if (res.error) return res;
      const { updatedQuote, updateEnquiriesResult } = res.data;
      updateCartEntry(groupCode, getQuoteSendData(updatedQuote));
      dispatch(
        api.util.updateQueryData("getEnquiries", undefined, enquiriesDraft => {
          Object.assign(enquiriesDraft, updateEnquiriesResult);
        }),
      );
      dispatch(api.util.invalidateTags(["Rider"]));
      return res;
    });
  };

  return {
    updateGroupMembers,
    query,
  };
}

export function useUpdateEnquiry() {
  const [updateEnquiryMutation, queryState] = useUpdateEnquiryMutation();

  const [updateGroups, updateGroupsQueryState] = useUpdateGroupsMutation();

  async function updateEnquiry(data) {
    if (data.pincode) {
      const { groupCode, ...sendData } = data;

      const updateGroupsResponse = await updateGroups({
        groupCode,
        pincode: data.pincode,
      });
      const updateEnquiryResponse = await updateEnquiryMutation(sendData);

      return [updateGroupsResponse, updateEnquiryResponse];
    }
    return updateEnquiryMutation(data);
  }

  return {
    ...queryState,
    updateEnquiry,
    isLoading: queryState.isLoading || updateGroupsQueryState.isLoading,
  };
}

export function useUpdateMembers() {
  const {
    data: { data: enquiryData },
  } = useGetEnquiriesQuery();
  const [createEnquiry, queryState] = useCreateEnquiry();

  const history = useHistory();

  const dispatch = useDispatch();

  function updateMembers({ members, ...data } = {}) {
    const updateData = {
      email: enquiryData.email,
      mobile: enquiryData.mobile,
      name: enquiryData.name,
      gender: enquiryData.input.gender,
      deductible: enquiryData.input.deductible,
      members: members
        ? members.map(member => ({
            type: member.code,
            age: member.age.code,
          }))
        : enquiryData.input.members,
      plan_type: "I",
      pincode: 400012,
      ...data,
    };

    return createEnquiry({ ...updateData, updateCache: false }).then(
      response => {
        if (!response.data) return response;
        const {
          data: {
            data: { groups, enquiry_id },
          },
        } = response;
        history.push({
          pathname: `/quotes/${groups[0].id}`,
          search: `enquiryId=${enquiry_id}`,
        });
        dispatch(
          api.util.updateQueryData("getEnquiries", undefined, draft => {
            Object.assign(draft, response.data);
          }),
        );
        return response;
      },
    );
  }

  return { updateMembers, ...queryState };
}

export function useCart() {
  const dispatch = useDispatch();
  const {
    data: { data: cartEntries },
  } = useGetCartQuery();

  const {
    data: {
      data: { groups },
    },
  } = useGetEnquiriesQuery();

  const { getCompany } = useCompanies();

  function getCartEntry(groupCode) {
    const cartEntry = cartEntries.find(
      cartEntry => cartEntry.group.id === parseInt(groupCode),
    );

    if (!cartEntry) return;

    const group = groups.find(group => group.id === parseInt(groupCode));

    const { logo: icLogoSrc } = getCompany(cartEntry.product.company.alias);

    return {
      ...cartEntry,
      plantype: group.plan_type,
      netPremium: calculateTotalPremium(cartEntry),
      netPremiumWithoutDiscount: calculateTotalPremium(cartEntry),
      icLogoSrc,
    };
  }

  function updateCartEntry(groupCode, updatedCartEntry) {
    dispatch(
      api.util.updateQueryData("getCart", undefined, cartDraft => {
        Object.assign(cartDraft, {
          ...cartDraft,
          data: cartDraft.data.map(cartEntry =>
            cartEntry.group.id === groupCode
              ? {
                  ...cartEntry,
                  ...updatedCartEntry,
                }
              : cartEntry,
          ),
        });
      }),
    );
  }

  const [updateCartMutation, updateCartMutationQuery] = useUpdateCartMutation();

  const { journeyType } = useFrontendBoot();

  function updateCart(groupCode) {
    const { id, health_riders, ...cartEntry } = getCartEntry(groupCode);
    return [
      () =>
        updateCartMutation({
          cartId: id,
          [journeyType === "health" ? "riders" : "top_up_riders"]:
            health_riders.map(getRiderSendData),
          ...cartEntry,
        }),
      updateCartMutationQuery,
    ];
  }

  function getNextGroupProduct(currentGroupCode) {
    const nextGroup = currentGroupCode + 1;
    const nextGroupProduct = cartEntries.find(
      cartEntry => parseInt(cartEntry.group.id) === nextGroup,
    );

    return nextGroupProduct;
  }

  return {
    cartEntries,
    getCartEntry,
    updateCartEntry,
    updateCart,
    getNextGroupProduct,
  };
}

export function useRider(groupCode) {
  const { getCartEntry, updateCartEntry } = useCart();

  function getSelectedRiders() {
    const cartEntry = getCartEntry(groupCode);
    const { health_riders } = cartEntry;

    return health_riders;
  }

  function replaceRiders(riders = []) {
    const ridersCartData = riders.map(getRiderCartData);

    updateCartEntry(groupCode, { health_riders: ridersCartData });
  }

  return { getSelectedRiders, replaceRiders };
}

export function useTenureDiscount(groupCode) {
  const { journeyType } = useFrontendBoot();

  const { updateCartEntry, getCartEntry } = useCart();

  const { product, sum_insured, tenure, deductible } = getCartEntry(groupCode);

  const { data, ...queryState } = useGetDiscountsQuery({
    sum_insured,
    product_id: product.id,
    group: groupCode,
    journeyType,
    deductible,
  });

  function applyTenureDiscount({
    tax_amount,
    sum_insured,
    tenure,
    total_premium,
    premium,
  }) {
    updateCartEntry(groupCode, {
      service_tax: tax_amount,
      sum_insured,
      tenure,
      total_premium,
      premium,
    });
  }

  function isTenureDiscountSelected(tenureDiscount) {
    return parseInt(tenureDiscount.tenure) === parseInt(tenure);
  }

  return {
    applyTenureDiscount,
    isTenureDiscountSelected,
    query: { ...queryState, data },
  };
}

export function useAdditionalDiscount(groupCode) {
  const { getCartEntry, updateCartEntry } = useCart();

  const {
    product,
    sum_insured,
    tenure,
    discounts,
    total_premium,
    netPremiumWithoutDiscount,
  } = getCartEntry(groupCode);

  const { data, ...queryState } = useGetAdditionalDiscountsQuery({
    productId: product.id,
    groupCode,
    sum_insured,
    tenure,
  });

  function addAdditionalDiscount(additionalDiscount) {
    updateCartEntry(groupCode, {
      discounts: [...discounts, additionalDiscount.alias],
    });
  }

  function removeAdditionalDiscount(additionalDiscount) {
    updateCartEntry(groupCode, {
      discounts: discounts.filter(
        selectedAdditionalDiscount =>
          selectedAdditionalDiscount !== additionalDiscount.alias,
      ),
    });
  }

  function isAdditionalDiscountSelected(additionalDiscount) {
    return discounts.includes(additionalDiscount.alias);
  }

  function toggleAdditionalDiscount(additionalDiscount) {
    const isSelected = isAdditionalDiscountSelected(additionalDiscount);
    if (isSelected) {
      removeAdditionalDiscount(additionalDiscount);
      return;
    }

    addAdditionalDiscount(additionalDiscount);
  }

  function getDiscountAmount(additionalDiscount) {
    const { percent, applied_on_total_premium } = additionalDiscount;

    if (applied_on_total_premium)
      return (parseInt(total_premium) * parseInt(percent)) / 100;

    return (parseInt(netPremiumWithoutDiscount) * parseInt(percent)) / 100;
  }

  function getSelectedAdditionalDiscounts() {
    if (queryState.isLoading || queryState.isError) return [];

    const selectedAdditionalDiscounts = data.data.filter(additionalDiscount =>
      discounts.includes(additionalDiscount.alias),
    );

    return selectedAdditionalDiscounts;
  }

  return {
    query: { ...queryState, data },
    getSelectedAdditionalDiscounts,
    toggleAdditionalDiscount,
    getDiscountAmount,
    isAdditionalDiscountSelected,
  };
}

export function useToggle(initialValue = false) {
  const [isOn, setIsOn] = useState(initialValue);

  const on = () => setIsOn(true);
  const off = () => setIsOn(false);

  const toggle = () => setIsOn(!isOn);

  return { isOn, on, off, toggle };
}

export function useCreateEnquiry() {
  const { journeyType } = useFrontendBoot();

  const [createEnquiryMutation, queryState] = useCreateEnquiryMutation();

  const createEnquiry = enquiryData => {
    return createEnquiryMutation({ section: journeyType, ...enquiryData });
  };

  return [createEnquiry, queryState];
}

export function useUrlEnquiry() {
  const urlQueryStrings = useUrlQuery();

  const enquiryId = urlQueryStrings.get("enquiryId");

  function getUrlWithEnquirySearch(path = "") {
    return `${path}?enquiryId=${enquiryId}`;
  }

  return { enquiryId, getUrlWithEnquirySearch };
}

export function useGetQuotes(queryConfig = {}) {
  const insurersToFetch = useInsurersToFetch();
  const { journeyType } = useFrontendBoot();

  const { getSelectedFilter } = useFilters();

  const { groupCode } = useParams();

  const { filterQuotes } = useQuoteFilter();

  let { data, ...getCustomQuotesQuery } = useGetCustomQuotesQuery(
    {
      insurers: insurersToFetch,
      deductible: getSelectedFilter("deductible").code,
      sum_insured_range: getSelectedFilter("cover").code,
      group: groupCode,
      base_plan_type: getSelectedFilter("baseplantype").code,
      tenure: getSelectedFilter("tenure").code,
      plan_type: getSelectedFilter("plantype").code,
      journeyType,
    },
    queryConfig,
  );

  if (data) {
    data = data.map(insurerQuotes => ({
      ...insurerQuotes,
      data: { data: filterQuotes(insurerQuotes.data.data) },
    }));
  }

  const isLoading = data?.length < insurersToFetch.length;

  const loadingPercentage =
    !data || data.length === 0
      ? 6
      : (data.length / (insurersToFetch.length - 1)) * 100;

  const isNoQuotes =
    data &&
    !isLoading &&
    data.every(insurerQuotes => insurerQuotes.data.data.length === 0);

  return {
    ...getCustomQuotesQuery,
    data,
    isLoading,
    loadingPercentage,
    isNoQuotes,
  };
}

function useInsurersToFetch() {
  const {
    data: {
      data: { groups },
    },
  } = useGetEnquiriesQuery();

  const { groupCode } = useParams();

  let filteredInsurers = [];

  let currentGroup = groups.find(group => group.id === parseInt(groupCode));

  if (currentGroup) {
    const { extras } = currentGroup;
    if (extras && extras.insurers) filteredInsurers = extras.insurers;
  }

  const { companies: allInsurers } = useCompanies();

  const insurersToFetch = filteredInsurers.length
    ? filteredInsurers.map(insurer => insurer.alias)
    : Object.keys(allInsurers);

  return insurersToFetch;
}

export function useQuotesCompare(initialCompareQuotes = []) {
  const dispatch = useDispatch();

  const [updateCompareQuotesMutation, updateQuery] =
    useUpdateCompareQuotesMutation();

  const { data, ...query } = useGetCompareQuotesQuery();

  const [compareQuotes, setCompareQuotes] = useState(initialCompareQuotes);

  function addQuote(quote) {
    if (compareQuotes.length === 3) return;
    setCompareQuotes(compareQuotes => [...compareQuotes, quote]);
  }

  function removeQuote(quote) {
    setCompareQuotes(compareQuotes =>
      compareQuotes.filter(
        compareQuote =>
          !every([
            parseInt(compareQuote.product.id) === parseInt(quote.product.id),
            parseInt(compareQuote.sum_insured) === parseInt(quote.sum_insured),
            compareQuote.deductible === quote.deductible,
          ]),
      ),
    );
  }

  function removeCompareQuote({ quote: quoteToRemove, groupCode }) {
    dispatch(
      api.util.updateQueryData("getCompareQuotes", undefined, draft => {
        Object.assign(draft, {
          data: {
            products: draft.data.products.map(compare =>
              parseInt(compare.group) === parseInt(groupCode)
                ? {
                    ...compare,
                    quotes: compare.quotes.filter(
                      quote =>
                        !every([
                          parseInt(quoteToRemove.product.id) ===
                            parseInt(quote.product.id),
                          parseInt(quoteToRemove.sum_insured) ===
                            parseInt(quote.sum_insured),
                          quoteToRemove.deductible === quote.deductible,
                        ]),
                    ),
                  }
                : compare,
            ),
          },
        });
      }),
    );
  }

  function isCompareQuote(quote) {
    return compareQuotes.some(compareQuote =>
      every([
        compareQuote.product.id === quote.product.id,
        compareQuote.sum_insured === quote.sum_insured,
        quote.deductible
          ? parseInt(compareQuote.deductible) === parseInt(quote.deductible)
          : true,
      ]),
    );
  }

  function reset() {
    setCompareQuotes([]);
  }

  const isQuotesOnCompare = compareQuotes.length > 0;

  function getCompareQuotes(groupCode) {
    if (!data?.data) return;

    const { products } = data.data;

    if (!products) return;

    return products.find(product => product.group === parseInt(groupCode));
  }

  function updateCompareQuote({ updatedQuote, previousQuote, groupCode }) {
    dispatch(
      api.util.updateQueryData("getCompareQuotes", undefined, draft => {
        Object.assign(draft, {
          data: {
            products: draft.data.products.map(compare =>
              compare.group === parseInt(groupCode)
                ? {
                    ...compare,
                    quotes: compare.quotes.map(quote =>
                      every([
                        quote.product.id === previousQuote.product.id,
                        quote.deductible === previousQuote.deductible,
                        quote.sum_insured === previousQuote.sum_insured,
                      ])
                        ? updatedQuote
                        : quote,
                    ),
                  }
                : compare,
            ),
          },
        });
      }),
    );
  }

  function getUpdateCompareQuotesMutation(groupCode) {
    function updateCompareQuotes(quotes = []) {
      if (!data?.data?.products)
        return updateCompareQuotesMutation({
          products: [{ group: parseInt(groupCode), quotes }],
        });

      const { products } = data.data;

      return updateCompareQuotesMutation({
        products: products.map(product =>
          parseInt(product.group) === parseInt(groupCode)
            ? { ...product, quotes }
            : product,
        ),
      });
    }

    return [updateCompareQuotes, updateQuery];
  }

  return {
    addQuote,
    removeQuote,
    isCompareQuote,
    reset,
    getUpdateCompareQuotesMutation,
    getCompareQuotes,
    updateCompareQuote,
    removeCompareQuote,
    isQuotesOnCompare,
    quotes: compareQuotes,
    query,
  };
}

export function useCompareFeatures({ productIds }) {
  const { data, ...query } = useGetCompareFeaturesQuery({ productIds });

  const isLoading = !data || !data.length;

  return { ...query, data, isLoading };
}

const validateName = (name = "") => /^[A-Za-z]+[A-Za-z ]*$/.test(name);

export function useNameInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const onChange = evt => {
    const { value: givenValue } = evt.target;

    if (!givenValue) {
      setValue(givenValue);
      return;
    }

    const isValidName = validateName(givenValue);

    if (!isValidName) return;

    setValue(givenValue);
  };

  const onBlur = evt => {
    const { value: givenValue } = evt.target;

    setValue(capitalize(givenValue.trim()));
  };

  const style = { textTransform: "capitalize" };

  return { value, onChange, onBlur, style };
}

const validateNumber = (str = "") => /\d/g.test(str);

export function useNumberInput(initialValue = "", { maxLength = 60 } = {}) {
  const [value, setValue] = useState(initialValue);

  const onChange = evt => {
    const { value: givenValue } = evt.target;

    if (givenValue.length > maxLength) return;

    if (!givenValue) {
      setValue(givenValue);
      return;
    }

    const isNumber = validateNumber(givenValue);

    if (isNumber) {
      setValue(givenValue);
    }
  };

  return { value, onChange, type: "tel", maxLength };
}

export function useQuotes({ sortBy = "relevence", quotesData = [] }) {
  let mergedQuotes = quotesData;

  if (quotesData) {
    mergedQuotes = quotesData.filter(
      icQuotes => !!icQuotes?.data?.data[0]?.total_premium,
    );
    mergedQuotes = quotesData.map(icQuotes => ({
      ...icQuotes,
      data: { data: mergeQuotes(icQuotes.data.data, { sortBy }) },
    }));
    if (sortBy === "premium-low-to-high") {
      mergedQuotes = mergedQuotes.filter(
        icQuotes => !!icQuotes?.data?.data[0]?.length,
      );
      mergedQuotes = mergedQuotes.sort((icQuotesA, icQuotesB) =>
        icQuotesA.data.data[0][0].total_premium >
        icQuotesB.data.data[0][0].total_premium
          ? 1
          : -1,
      );
    }
  }

  return { mergedQuotes };
}

function getDeductibles(quotes = []) {
  return uniq(quotes.map(quote => quote.deductible));
}

export function useQuoteCard({ quotes = [] }) {
  const isDeductibleJourney = quotes[0]?.deductible;

  const deductibles = getDeductibles(quotes);

  const [selectedDeductible, setSelectedDeductible] = useState(deductibles[0]);

  const sumInsureds = isDeductibleJourney
    ? quotes
        .filter(
          quote => parseInt(quote.deductible) === parseInt(selectedDeductible),
        )
        .map(quote => parseInt(quote.sum_insured))
        .sort((a, b) => a - b)
    : quotes.map(quote => parseInt(quote.sum_insured));

  const [selectedSumInsured, setSelectedSumInsured] = useState(sumInsureds[0]);

  const quote = quotes.find(quote =>
    isDeductibleJourney
      ? parseInt(quote.deductible) === parseInt(selectedDeductible) &&
        parseInt(quote.sum_insured) === parseInt(selectedSumInsured)
      : parseInt(quote.sum_insured) === parseInt(selectedSumInsured),
  );

  const { getCompany } = useCompanies();

  useEffect(() => {
    if (!quote) {
      setSelectedSumInsured(parseInt(sumInsureds[0]));
    }
  }, [quote, quotes, sumInsureds, deductibles]);

  if (!quote) return { quote };

  const { logo: logoSrc } = getCompany(quote.company_alias);

  const handleSumInsuredChange = evt => {
    const { value } = evt;

    setSelectedSumInsured(parseInt(value));
  };

  const handleDeductibleChange = evt => {
    const { value } = evt;

    setSelectedDeductible(parseInt(value));
  };

  return {
    quote,
    logoSrc,
    handleSumInsuredChange,
    handleDeductibleChange,
    selectedDeductible,
    selectedSumInsured,
    deductibles,
    sumInsureds,
  };
}
