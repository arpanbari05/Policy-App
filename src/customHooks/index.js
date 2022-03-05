import { useState, useEffect, useReducer } from "react";
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
  useGetFrontendBootQuery,
  useGetRidersQuery,
  useUpdateCartMutation,
  useUpdateCompareQuotesMutation,
  useUpdateEnquiryMutation,
  useUpdateGroupMembersMutation,
  useUpdateGroupsMutation,
} from "../api/api";
import { getRiderSendData } from "../pages/Cart/hooks/useCartProduct";
import useFilters from "../pages/quotePage/components/filters/useFilters";
import {
  setPolicyTypes,
  setPolicyType,
  updateFetchedFilters,
} from "../pages/quotePage/quote.slice";
import useQuoteFilter from "../pages/quotePage/components/filters/useQuoteFilter";
import styles from "../styles";
import {
  capitalize,
  getAddOnSendData,
  getInsuranceType,
  getMonthsForYear,
  getQuoteKey,
  getRiderCartData,
  isAddOnPresent,
  isTopUpQuote,
  matchQuotes,
  mergeQuotes,
} from "../utils/helper";
import { calculateTotalPremium } from "../utils/helper";
import useUrlQuery from "./useUrlQuery";
import { every, uniq } from "lodash";
import config from "../config";
import { useCallback } from "react";
import { quoteCompareFeature } from "../test/data/quoteFeatures";
import { refreshUserData } from "../pages/InputPage/greetingPage.slice";
import _ from "lodash";
import {
  requestDownloadSuccess,
  sendEmailAction,
} from "../pages/ComparePage/compare.slice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const journeyTypeInsurances = {
  top_up: ["top_up"],
  health: ["health"],
  renewal: ["health"],
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

  function getCompanies(insurance_type) {
    return Object.values(companies)
      .filter(company => company.insurance_types.includes(insurance_type))
      .map(company => company.alias);
  }

  return {
    getCompany,
    getCompanyLogo,
    getCompanies,
    companies,
  };
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
  const {
    data: {
      settings: {
        primary_color,
        primary_shade,
        secondary_color,
        secondary_shade,
      },
    },
  } = useGetFrontendBootQuery();

  return {
    ...styles,
    colors: {
      ...styles.colors,
      primary_color,
      primary_shade,
      secondary_color,
      secondary_shade,
    },
  };
}

export function useFrontendBoot() {
  const {
    data: frontendData,
    isLoading,
    isUninitialized,
    ...query
  } = useGetFrontendBootQuery();

  const { data: enquiryData } = useGetEnquiriesQuery();

  const data = { ...frontendData, ...config };

  const tenantName = data?.tenant?.name;

  let journeyType = "health";

  if (enquiryData?.data) {
    journeyType = enquiryData?.data?.section;
  }

  //Uncomment this to switch to renewal journey type
  //journeyType = "renewal";

  return {
    query,
    journeyType,
    tenantName,
    data,
    insuredMembers: enquiryData?.data?.input?.members,
    groups: enquiryData?.data?.groups,
  };
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

  const { selectedGroup } = useSelector(state => state.quotePage);

  useEffect(() => {
    dispatch(refreshUserData(data?.data));
  }, []);

  useEffect(() => {
    const groupPolicyTypes = {};
    if (data) {
      const group = data.data.groups.find(el => {
        // only "==" for avoiding type casting, do not modify to "==="
        return el.id == selectedGroup;
      });
      if (group) {
        dispatch(setPolicyType(group.plan_type));
      }
      data.data.groups.forEach(group => {
        groupPolicyTypes[group.id] =
          group.plan_type && group.plan_type.startsWith("F")
            ? "Family Floater"
            : group.plan_type.startsWith("M")
            ? "Multi Individual"
            : "Individual";
      });
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
    let member = members.find(
      member => member.code === code.replace(/[0-9]/g, ""),
    );

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
          selectedMember.code?.startsWith(member.code),
        );

        if (!multipleMembers?.length) {
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
    if (!group) return;

    return {
      city: group?.city,
      state: group?.state,
      pincode: group?.pincode || input?.pincode,
    };
  }

  function getNextGroup(currentGroupCode) {
    return groups.find(group => group.id === currentGroupCode + 1);
  }

  function getPreviousGroup(currentGroupCode) {
    return groups?.find(group => group.id === currentGroupCode - 1);
  }

  function getLastGroup() {
    if (!groups) return;
    return groups[groups.length - 1];
  }

  function getMembersText({ id }) {
    const groupMembers = getGroupMembers(id);
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

  const { getCartEntry } = useCart();

  const { getSelectedMembers } = useMembers();

  const updateGroupMembers = updatedMembers => {
    const { tenure, cover, base_plan_type, plantype } = getFilters(groupCode);

    const selectedMembers = getSelectedMembers();

    const { product, sum_insured } = getCartEntry(groupCode);

    const members = selectedMembers.map(member => {
      const updatedMember = updatedMembers.find(
        updatedMember => updatedMember?.code === member?.code,
      );
      if (updatedMember)
        return { age: updatedMember?.age?.code, type: updatedMember?.code };
      return {
        age: member?.age?.code,
        type: member?.code,
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
      const { updateEnquiriesResult } = res.data;

      dispatch(
        api.util.updateQueryData("getEnquiries", undefined, enquiriesDraft => {
          Object.assign(enquiriesDraft, updateEnquiriesResult);
        }),
      );
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
  const { journeyType } = useFrontendBoot();
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
      params: enquiryData.input.params,
      members: members
        ? members.map(member => ({
            type: member.code,
            age: member.age.code,
          }))
        : enquiryData.input.members,
      plan_type:
        journeyType === "health" ? (members?.length > 1 ? "F" : "I") : "I",
      pincode: enquiryData?.input?.pincode,
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
        dispatch(api.util.invalidateTags(["Cart"]));
        return response;
      },
    );
  }

  return { updateMembers, ...queryState };
}

export function useCart() {
  const dispatch = useDispatch();
  const { data } = useGetCartQuery();

  const {
    data: {
      data: { groups },
    },
  } = useGetEnquiriesQuery();

  const { getCompany } = useCompanies();

  function getCartEntry(groupCode, { additionalDiscounts = [] } = {}) {
    const cartEntry = data?.data.find(
      cartEntry => cartEntry.group.id === parseInt(groupCode),
    );

    if (!cartEntry) return;

    const group = groups.find(
      group => parseInt(group.id) === parseInt(groupCode),
    );

    const { logo: icLogoSrc } = getCompany(cartEntry.product.company.alias);

    return {
      ...cartEntry,
      plantype: group.plan_type,
      netPremium: calculateTotalPremium(cartEntry, { additionalDiscounts }),
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
      ({ additionalDiscounts = [] }) => {
        const discounted_total_premium = calculateTotalPremium(
          { health_riders, ...cartEntry },
          { additionalDiscounts },
        );
        return updateCartMutation({
          ...cartEntry,
          cartId: id,
          [journeyType === "health" ? "riders" : "top_up_riders"]:
            health_riders.map(getRiderSendData),
          addons: cartEntry.addons.map(getAddOnSendData),
          discounted_total_premium,
        });
      },
      updateCartMutationQuery,
    ];
  }

  function getNextGroupProduct(currentGroupCode) {
    const nextGroup = currentGroupCode + 1;
    const nextGroupProduct = data?.data.find(
      cartEntry => parseInt(cartEntry.group.id) === nextGroup,
    );

    return nextGroupProduct;
  }

  return {
    cartEntries: data?.data,
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

    return health_riders.filter(rider => rider.total_premium > 0);
  }

  function replaceRiders(riders = []) {
    const ridersCartData = riders.map(getRiderCartData);

    updateCartEntry(groupCode, { health_riders: ridersCartData });
  }

  return { getSelectedRiders, replaceRiders };
}

export function useTenureDiscount(groupCode) {
  const { feature_options } = useSelector(state => state.cart);
  const { journeyType } = useFrontendBoot();

  const { updateCartEntry, getCartEntry } = useCart();

  const { product, sum_insured, tenure, deductible } = getCartEntry(groupCode);

  const { data, ...queryState } = useGetDiscountsQuery({
    sum_insured: +sum_insured,
    product_id: product.id,
    group: groupCode,
    feature_options: Object.keys(feature_options)
    .map(key => `${key}=${feature_options[key]}`)
    .join('&'),
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

  const { filterQuotes } = useQuoteFilter({
    givenMoreFilters: {
      no_claim_bonus: getSelectedFilter("no_claim_bonus"),
      others: getSelectedFilter("others"),
      popular_filters: getSelectedFilter("popular_filters"),
      pre_existing_ailments: getSelectedFilter("pre_existing_ailments"),
    },
  });

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

  //? SUPPLIES FILTERED QUOTE [PREMIUM + MORE FILTERS]
  if (data) {
    data = data.map(insurerQuotes => {
      return {
        ...insurerQuotes,
        data: { data: filterQuotes(insurerQuotes.data.data) },
      };
    });
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
                    quotes: compare.quotes.map(quote => {
                      return matchQuotes(quote, previousQuote)
                        ? updatedQuote
                        : quote;
                    }),
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

export function useEmailInput(initialValue = "", setEmailError) {
  const [value, setValue] = useState(initialValue);

  const onChange = evt => {
    setEmailError({});
    const { value: givenValue } = evt.target;

    if (!givenValue) {
      setValue(givenValue.toLowerCase());
      return;
    }

    setValue(givenValue.toLowerCase());
  };

  return { value, onChange };
}

const validateName = (name = "") => /^[a-zA-Z.\s]*$/.test(name);
const checkPreviousChar = (value, checkValue, stateValue) => {
  let check = true;

  if (value[0] === checkValue) {
    check = false;
  }
  if (
    check &&
    value[value.length - 1] === checkValue &&
    stateValue[stateValue.length - 1] === checkValue
  ) {
    check = false;
  }
  return check;
};

export function useNameInput(initialValue = "", setFullNameError) {
  const [value, setValue] = useState(initialValue);

  const onChange = evt => {
    setFullNameError({});
    const { value: givenValue } = evt.target;

    if (!givenValue) {
      setValue(givenValue);
      return;
    }

    const isValidName = validateName(givenValue);

    if (!isValidName) return;
    checkPreviousChar(givenValue, ".", value) && setValue(givenValue);
  };

  const onBlur = evt => {
    const { value: givenValue } = evt.target;

    setValue(capitalize(givenValue.trim()));
  };

  const style = { textTransform: "capitalize" };

  return { value, onChange, onBlur, style };
}

const validateNumber = (str = "") => /^\d*$/.test(str);

const filterNo = (setNumber, number, value) => {
  if (number.length === 0) {
    if (value >= 6 && value !== 0) {
      setNumber(value);
    }
  } else {
    setNumber(value);
  }
};

export function useNumberInput(
  initialValue = "",
  setNumberError,
  { maxLength = 60 } = {},
) {
  const [value, setValue] = useState(initialValue);

  const onChange = evt => {
    setNumberError({});
    const { value: givenValue } = evt.target;

    if (givenValue.length > maxLength) return;

    if (!givenValue) {
      setValue(givenValue);
      return;
    }

    const isNumber = validateNumber(givenValue);

    if (isNumber) {
      filterNo(setValue, value, givenValue);
    }
  };

  return { value, onChange, type: "tel", maxLength };
}

const validatePolicyNumber = (str = "", selectedIC = {}) => {
  return true;
};
export function usePolicyNumberInput(
  initialValue = "",
  setFullNameError,
  selectedIC,
) {
  const [value, setValue] = useState(initialValue);

  const onChange = evt => {
    setFullNameError({});
    const { value: givenValue } = evt.target;

    if (!givenValue) {
      setValue(givenValue);
      return;
    }

    const isValidName = validatePolicyNumber(givenValue, selectedIC);

    if (!isValidName) return;
    setValue(givenValue);
  };

  const onBlur = () => {
    setValue(currentValue => capitalize(currentValue.trim()));
  };

  const style = { textTransform: "capitalize" };

  return { value, onChange, onBlur, style };
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

export function useQuoteCard({ quotes = [], defaultValues = {} }) {
  const isDeductibleJourney = quotes[0]?.deductible;

  const deductibles = getDeductibles(quotes);

  const [selectedDeductible, setSelectedDeductible] = useState(
    defaultValues.deductible || deductibles[0],
  );

  const sumInsureds = isDeductibleJourney
    ? quotes
        .filter(
          quote => parseInt(quote.deductible) === parseInt(selectedDeductible),
        )
        .map(quote => parseInt(quote.sum_insured))
        .sort((a, b) => a - b)
    : quotes.map(quote => parseInt(quote.sum_insured));

  const [selectedSumInsured, setSelectedSumInsured] = useState(
    defaultValues.sumInsured || sumInsureds[0],
  );

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

function getCompareSlotReducer({ maxLength = 3 } = {}) {
  return function compareSlotReducer(currentSlot = [], action) {
    switch (action.type) {
      case "add":
        if (currentSlot.length < maxLength)
          return [...currentSlot, action.payload];
        return currentSlot;

      case "remove":
        return currentSlot.filter(
          quote => quote.product.id !== action.payload.product.id,
        );

      case "clear":
        return [];

      default:
        throw new Error(`Unhandled action type ${action.type}`);
    }
  };
}

export function useCompareSlot({ initialState = [], maxLength = 3 } = {}) {
  const [quotes, dispatch] = useReducer(
    getCompareSlotReducer({ maxLength }),
    initialState,
  );

  const add = quote => dispatch({ type: "add", payload: quote });
  const remove = quote => dispatch({ type: "remove", payload: quote });
  const check = quote =>
    quotes.some(quoteInSlot => matchQuotes(quote, quoteInSlot));

  const clear = () => dispatch({ type: "clear" });

  return { quotes, add, remove, check, clear };
}

export function useGetQuote(company_alias) {
  const { data } = useGetQuotes();

  const icQuotes =
    data && data.find(icQuotes => icQuotes.company_alias === company_alias);

  const isLoading = !data || !icQuotes;

  // function getQuote(quote) {}

  return { isLoading, data, icQuotes };
}

export function useFeatureLoadHandler() {
  const [features, setFeatures] = useState({});

  const onLoad = ({ featureTitle, feature }, quote) => {
    if (!feature?.feature_value) return;
    setFeatures(features => {
      const quoteKey = getQuoteKey(quote);

      const updatedFeatures = {
        ...features,
        [quoteKey]: features[quoteKey]
          ? { ...features[quoteKey], [featureTitle]: feature }
          : { [featureTitle]: feature },
      };

      return updatedFeatures;

      // if (!features) {
      //   return { [featureTitle]: [feature?.feature_value] };
      // }

      // if (!features[featureTitle])
      //   return {
      //     ...features,
      //     [featureTitle]: [feature?.feature_value],
      //   };

      // return {
      //   ...features,
      //   [featureTitle]: [...features[featureTitle], feature?.feature_value],
      // };
    });
  };

  return { features, onLoad };
}

export function useCompareFeature(compareQuote) {
  let query = useGetCompareFeaturesQuery(compareQuote?.product?.id);

  let { data } = query;

  const { journeyType } = useFrontendBoot();

  function getFeature({ sectionTitle, featureTitle }) {
    if (!data) return null;

    data = journeyType === "health" ? data : quoteCompareFeature;

    const compareFeature = data.find(feature => feature.name === sectionTitle);

    if (!compareFeature) return null;

    const features =
      compareFeature.sum_insureds[
        journeyType === "health" ? compareQuote.sum_insured : 300000
      ].features;

    if (!features) return null;

    const feature = features.find(feature => feature.title === featureTitle);

    return feature;
  }

  return { getFeature, query };
}

export function useGetRiders(quote, groupCode, { queryOptions = {} } = {}) {
  const { journeyType } = useFrontendBoot();
  const getRidersQueryParams = {
    sum_insured: quote?.sum_insured,
    tenure: quote?.tenure,
    productId: quote?.product.id,
    group: parseInt(groupCode),
    journeyType,
    ...queryOptions,
  };

  if (quote?.deductible) {
    getRidersQueryParams.deductible = quote?.deductible;
  }

  return useGetRidersQuery(getRidersQueryParams);
}

function isAffectsOtherRiders(rider) {
  return !!rider.affects_other_riders;
}

function isMandatoryRider(rider) {
  return !!rider.is_mandatory;
}

function getRiderOptionsQueryString(riders = []) {
  const riderOptionsQueryString = riders.reduce(
    (urlQueries, rider) =>
      rider.options_selected
        ? urlQueries.concat(
            Object.keys(rider.options_selected)
              .map(
                riderOptionKey =>
                  `${riderOptionKey}=${rider.options_selected[riderOptionKey]}&`,
              )
              .join("&"),
          )
        : urlQueries,
    "",
  );
  return riderOptionsQueryString;
}

function getSelectedRiders(riders = []) {
  const selectedRiders = riders.filter(
    rider => !!(isMandatoryRider(rider) || rider.isSelected),
  );

  return selectedRiders;
}

export function useRiders({
  quote,
  groupCode,
  onChange,
  defaultSelectedRiders = [],
}) {
  const getInititalRiders = useCallback(() => {
    return defaultSelectedRiders.map(rider => ({
      ...rider,
      id: rider.rider_id,
      isSelected: true,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupCode]);

  const [riders, setRiders] = useState(getInititalRiders);

  useEffect(() => setRiders(getInititalRiders), [getInititalRiders]);

  const findLocalRider = riderToFind =>
    riders.find(rider => rider.id === riderToFind.id);

  const isRiderSelected = riderToCheck => {
    if (riderToCheck.is_mandatory) return true;
    const localRider = findLocalRider(riderToCheck);
    return localRider && localRider.isSelected;
  };

  const affectsOtherRiders = riders
    .filter(isRiderSelected)
    .filter(isAffectsOtherRiders)
    .map(rider => rider.alias);

  const getRidersQueryParams = {
    additionalUrlQueries: getRiderOptionsQueryString(riders),
  };

  if (affectsOtherRiders.length)
    getRidersQueryParams.selected_riders = affectsOtherRiders;

  const query = useGetRiders(quote, groupCode, {
    queryOptions: getRidersQueryParams,
  });

  const { data } = query;

  useEffect(() => {
    if (data) {
      const { data: ridersData } = data;
      setRiders(riders => {
        return ridersData.map(rider => {
          const localRider = riders.find(
            localRider => localRider.id === rider.id,
          );
          return {
            ...rider,
            isSelected:
              rider.is_mandatory || (localRider && localRider.isSelected),
            options_selected: localRider
              ? localRider.options_selected
              : rider.options_selected,
          };
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    onChange && onChange(getSelectedRiders(riders));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riders]);

  const handleChange = changedRider => {
    setRiders(riders => {
      const updatedRiders = riders.map(rider =>
        rider.id === changedRider.id ? changedRider : rider,
      );
      return updatedRiders;
    });
  };

  return { query, riders: riders.filter(rider => rider.total_premium > 0), handleChange, getInititalRiders };
}

export function useAddOns(groupCode) {
  const { updateCartEntry, getCartEntry } = useCart();

  const cartEntry = getCartEntry(groupCode);

  const { addons } = cartEntry;

  function addAddOns(addOns = []) {
    let filteredAddOns = addons.slice();

    const addOnsToAdd = [];

    for (let addOn of addOns) {
      const isTopUpAddOn = isTopUpQuote(addOn);

      const members = isTopUpAddOn ? cartEntry.group.members : [addOn.member];
      const isAlreadyAdded = addons.some(
        addOnAdded => addOnAdded.product.id === addOn.product.id,
      );
      if (isAlreadyAdded) return;

      const addOnToAdd = { ...addOn, members };

      if (isTopUpAddOn) {
        filteredAddOns = addons.filter(
          addOnAdded => getInsuranceType(addOnAdded) !== "top_up",
        );
      }

      addOnsToAdd.push(addOnToAdd);
    }

    updateCartEntry(cartEntry.group.id, {
      addons: [...filteredAddOns, ...addOnsToAdd],
    });
  }

  function removeAddOns(addOns = []) {
    if (!addons) return;
    updateCartEntry(cartEntry.group.id, {
      addons: addons.filter(addOnAdded =>
        addOns.some(
          addOnToRemove =>
            !matchQuotes(addOnAdded, addOnToRemove, {
              sum_insured: false,
              deductible: false,
            }),
        ),
      ),
    });
  }

  return { addAddOns, removeAddOns };
}

export const useShareFunctionality = (desktopPageId, mobilePageId) => {
  const dispatch = useDispatch();

  const imageSend = email => {
    const input = document.getElementById(desktopPageId);

    html2canvas(input, {
      scrollX: 0,
      scrollY: -window.scrollY,
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      dispatch(sendEmailAction({ email, image: imgData }));
    });
  };

  const imageSendM = email => {
    const input = document.getElementById(mobilePageId);

    html2canvas(input, {
      scrollX: 0,
      scrollY: -window.scrollY,
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      dispatch(sendEmailAction({ email, image: imgData }));
    });
  };

  const download = () => {
    const input = document.getElementById(desktopPageId);

    html2canvas(
      input,
      { useCORS: true },
      {
        scrollX: 0,
        scrollY: -window.scrollY,
        useCORS: true,
      },
    ).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const width = pdf.internal.pageSize.getWidth();
      const height = (imgProps.height * width) / imgProps.width;

      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      pdf.save(`${desktopPageId}.jpg`);
      dispatch(requestDownloadSuccess());
    });
  };

  return { imageSend, imageSendM, download };
};
