import { useState, useEffect, useReducer, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
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
  featureOptionsValidValue,
  getAddOnSendData,
  getInsuranceType,
  getMonthsForYear,
  getQuoteKey,
  getRiderCartData,
  isRelianceInfinityPlan,
  isRiderPresent,
  isSSOJourney,
  isTopUpQuote,
  matchQuotes,
  mergeQuotes,
  parseJson,
  regexStringToRegex,
} from "../utils/helper";
import { calculateTotalPremium } from "../utils/helper";
import useUrlQuery, { useUrlQueries } from "./useUrlQuery";
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
import {
  setIsPopupOn,
  setShowErrorPopup,
} from "../pages/ProposalPage/ProposalSections/ProposalSections.slice";
import RandExp from "randexp";

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

  const { groups } = useMembers();

  const currentGroup = groups?.find(group => group.id === +groupCode);

  const { data } = useGetCartQuery();

  function buyQuote(quote, riders = []) {
    data?.data?.forEach(cart => {
      if (cart?.group?.type !== currentGroup.type) {
        deleteQuote(cart.id);
      }
    });

    const quoteData = {
      total_premium: quote.total_premium,
      sum_insured: quote.sum_insured,
      tax_amount: quote.tax_amount,
      tenure: quote.tenure,
      product_id: quote.product.id,
      premium: quote.premium,
      group_id: +groupCode,
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

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } =
    useSelector(state => state.frontendBoot.theme);
  return {
    ...styles,
    colors: {
      ...styles.colors,
      primary_color: PrimaryColor || primary_color,
      primary_shade: PrimaryShade || primary_shade,
      secondary_color: SecondaryColor || secondary_color,
      secondary_shade: SecondaryShade || secondary_shade,
    },
  };
}

export function useFrontendBoot() {
  const searchQueries = useUrlQueries();
  const {
    data: frontendData,
    isLoading,
    isUninitialized,
    ...query
  } = useGetFrontendBootQuery();

  const { data: enquiryData } = useGetEnquiriesQuery(undefined, {
    skip: !searchQueries.enquiryId,
  });

  const data = { ...frontendData, ...config };

  const tenantName = data?.tenant?.name;

  const tenantAlias = data?.tenant?.alias;

  let journeyType = "health";
  let subJourneyType = "";

  if (enquiryData?.data) {
    journeyType = enquiryData?.data?.section;
    subJourneyType = enquiryData?.data?.type === "renew" ? "renewal" : "";
  }

  return {
    query,
    journeyType,
    tenantName,
    subJourneyType,
    tenantAlias,
    data,
    settings: data?.settings,
    insuredMembers: enquiryData?.data?.input?.members,
    groups: enquiryData?.data?.groups,
    renewal_policy_status: enquiryData?.data?.renewal_policy,
  };
}

export function useFilter() {
  const searchQueries = useUrlQueries();
  const {
    data: {
      defaultfilters: { cover, tenure, plan_type },
    },
  } = useFrontendBoot();

  const {
    data: {
      data: { groups },
    },
  } = useGetEnquiriesQuery(undefined, { skip: !searchQueries.enquiryId });

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
  const searchQueries = useUrlQueries();

  const reduxGroup =
    localStorage.getItem("groups") &&
    JSON.parse(localStorage.getItem("groups"));

  let {
    data: { members },
  } = useFrontendBoot();

  const { data } = useGetEnquiriesQuery(undefined, {
    skip: !searchQueries.enquiryId,
  });

  const genderOfSelf = data?.data?.input?.gender;

  const { selectedGroup } = useSelector(state => state.quotePage);
  useEffect(() => {
    dispatch(refreshUserData(data?.data));
  }, []);

  useEffect(() => {
    const groupPolicyTypes = {};
    if (data) {
      const group = data?.data?.groups?.find(el => {
        //* only "==" for avoiding type casting, do not modify to "==="
        return el.id == selectedGroup;
      });
      if (group) {
        dispatch(setPolicyType(group?.plan_type));
      }
      data?.data?.groups.forEach(group => {
        groupPolicyTypes[group?.id] =
          group?.plan_type && group?.plan_type?.startsWith("F")
            ? "Family Floater"
            : group?.plan_type?.startsWith("M")
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
    if (reduxGroup?.length) {
      const updatedGroup = data?.data?.groups?.map(group => {
        const reduxGroupMatch = reduxGroup?.find(reGrp => {
          return reGrp?.members?.some(mem => group?.members?.includes(mem));
        });
        return {
          ...group,
          city: group?.city || reduxGroupMatch?.city,
          pincode: group?.pincode || reduxGroupMatch?.pincode,
          extras: {
            ...group?.extras,
            ...reduxGroupMatch?.extras,
          },
          plan_type: reduxGroupMatch?.plan_type,
        };
      });

      groups = updatedGroup;
      localStorage.setItem("groups", JSON.stringify(updatedGroup));
    } else {
      groups = data?.data?.groups;
      localStorage.setItem("groups", JSON.stringify(data?.data?.groups));
    }
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
    return groups?.find(group => group.id === parseInt(groupCode));
  }

  function getGroupLocation(groupCode) {
    const group = getGroup(groupCode);
    if (!group) return;

    return {
      city: group?.city,
      state: group?.state,
      pincode: group?.pincode,
    };
  }

  function getFirstGroupLocation() {
    return (
      groups?.length && {
        city: groups[0]?.city,
        state: groups[0]?.state,
        pincode: groups[0]?.pincode,
      }
    );
  }

  function getNextGroup(currentGroupCode) {
    return groups
      .filter(group => group.type !== "all")
      .find(group => group.id === currentGroupCode + 1);
  }

  function getPreviousGroup(currentGroupCode) {
    return groups?.find(group => group?.id === currentGroupCode - 1);
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
    getFirstGroupLocation,
    getNextGroup,
    getPreviousGroup,
    genderOfSelf,
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
        sum_insured_range: cover?.code || cover,
        tenure: tenure,
        base_plan_type: base_plan_type,
        plan_type: plantype,
        group: groupCode,
      },
      quote: { product, sum_insured },
    }).then(res => {
      if (res?.error) return res;
      const { updateEnquiriesResult } = res?.data;

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
    if (data?.pincode) {
      const { groupCode, ...sendData } = data;

      const updateGroupsResponse = await updateGroups({
        groupCode,
        pincode: data?.pincode,
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
  const searchQueries = useUrlQueries();
  const {
    data: { data: enquiryData },
  } = useGetEnquiriesQuery(undefined, { skip: !searchQueries.enquiryId });
  const [createEnquiry, queryState] = useCreateEnquiry();

  const history = useHistory();

  const dispatch = useDispatch();

  const { getSelectedFilter } = useFilters();

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
        journeyType === "health"
          ? members?.length === 1
            ? "I"
            : getSelectedFilter("plantype")?.code === "I"
            ? JSON.parse(localStorage.getItem("default_filters"))?.plan_type
            : getSelectedFilter("plantype")?.code
          : "I",
      pincode: enquiryData?.input?.pincode,
      ...data,
    };

    const currentGroup =
      localStorage.getItem("groups") &&
      JSON.parse(localStorage.getItem("groups")).find(group => group.id);

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
          search: `enquiryId=${enquiry_id}&pincode=${currentGroup.pincode}&city=${currentGroup.city}`,
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

  const searchQueries = useUrlQueries();

  const { data } = useGetCartQuery();

  const {
    data: {
      data: { groups },
    },
  } = useGetEnquiriesQuery(undefined, { skip: !searchQueries.enquiryId });

  const { getCompany } = useCompanies();

  const getCartTotalPremium = () => {
    return data?.discounted_total_premium;
  };

  function getCartEntry(groupCode, { additionalDiscounts = [] } = {}) {
    const cartEntry = data?.data?.find(
      cartEntry => +cartEntry?.group?.id === parseInt(groupCode),
    );

    if (!cartEntry) return;

    const group = groups?.find(
      group => parseInt(group?.id) === parseInt(groupCode),
    );

    const { logo: icLogoSrc } = getCompany(cartEntry?.product?.company?.alias);

    return {
      ...cartEntry,
      plantype: group?.plan_type,
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
          data: cartDraft?.data?.map(cartEntry =>
            cartEntry?.group?.id === +groupCode
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
      ({
        discounted_total_premium,
        generate_proposal = false,
        feature_options = {},
      }) => {
        return updateCartMutation({
          ...cartEntry,
          cartId: id,
          [journeyType === "health" ? "riders" : "top_up_riders"]:
            health_riders.map(getRiderSendData),
          addons: cartEntry.addons.map(getAddOnSendData),
          discounted_total_premium,
          feature_options,
          generate_proposal,
          discounts: cartEntry?.discounts?.filter(
            singleDiscount => singleDiscount,
          ),
          //!total_premium: cartEntry.netPremium,
        });
      },
      updateCartMutationQuery,
    ];
  }

  function getNextGroupProduct(currentGroupCode) {
    const nextGroup = currentGroupCode + 1;
    const nextGroupProduct = data?.data?.find(
      cartEntry => parseInt(cartEntry?.group?.id) === nextGroup,
    );

    return nextGroupProduct;
  }

  return {
    cartEntries: data?.data,
    cartData: data,
    getCartEntry,
    updateCartEntry,
    updateCart,
    getCartTotalPremium,
    getNextGroupProduct,
    discounted_total_premium: data?.discounted_total_premium,
  };
}

export function useRider(groupCode) {
  const { getCartEntry, updateCartEntry } = useCart();

  function getSelectedRiders() {
    const cartEntry = getCartEntry(groupCode);

    const { health_riders, top_up_riders } = cartEntry;

    if (isRelianceInfinityPlan(cartEntry))
      return health_riders?.length ? health_riders : top_up_riders;

    return health_riders?.length
      ? health_riders.filter(rider => rider.total_premium > 0)
      : top_up_riders.filter(rider => rider.total_premium > 0);
  }

  function replaceRiders(riders = []) {
    const ridersCartData = riders.map(getRiderCartData);

    updateCartEntry(groupCode, { health_riders: ridersCartData });
  }

  return { getSelectedRiders, replaceRiders };
}

export function useTenureDiscount(groupCode) {
  const { journeyType, subJourneyType } = useFrontendBoot();

  const { updateCartEntry, getCartEntry } = useCart();

  const { product, sum_insured, tenure, deductible, feature_options } =
    getCartEntry(groupCode);

  const updatedFeatureOptions = featureOptionsValidValue(feature_options);

  const featureOptionsToSend = Object.keys(updatedFeatureOptions)
    .map(key => `${key}=${updatedFeatureOptions[key]}`)
    .join("&");

  const { data, ...queryState } = useGetDiscountsQuery({
    sum_insured: +sum_insured,
    product_id: product.id,
    group: groupCode,
    feature_options: featureOptionsToSend,
    journeyType,
    subJourneyType,
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

const discountOnAnotherDiscount = ({
  discounts_on_which_discount_to_be_applied,
  total_premium,
  cartEntry,
}) => {
  return discounts_on_which_discount_to_be_applied
    .map(
      ({
        applied_on_total_premium: applied_on_total_cart_premium,
        applied_on_riders,
        percent: percent_of_discount_on_which_discount_to_be_applied,
        fixed_discount_value,
      }) => {
        let discountValue = 0;

        if (fixed_discount_value) {
          //? return the amount directly if it is fixed.
          return +fixed_discount_value;
        }

        if (applied_on_total_cart_premium) {
          //? Means applied on cart total premium.
          const discount =
            (parseInt(cartEntry?.netPremiumWithoutDiscount) *
              parseInt(percent_of_discount_on_which_discount_to_be_applied)) /
            100;

          return (discountValue = discountValue + discount);
        }

        if (!applied_on_total_cart_premium) {
          const discount =
            (parseInt(total_premium) *
              parseInt(percent_of_discount_on_which_discount_to_be_applied)) /
            100;
          discountValue = discountValue + discount;
        }

        if (applied_on_riders) {
          const filtered_applied_on_riders = cartEntry.health_riders.filter(
            singleHealthRider =>
              applied_on_riders.includes(singleHealthRider?.alias),
          );

          const filtered_applied_on_riders_amount =
            filtered_applied_on_riders.length
              ? filtered_applied_on_riders
                  .map(rider => rider.total_premium)
                  ?.reduce((acc = 0, curr) => (acc += +curr))
              : 0;

          const discount =
            (+filtered_applied_on_riders_amount *
              parseInt(percent_of_discount_on_which_discount_to_be_applied)) /
            100;

          discountValue = discountValue + discount;
        }

        return discountValue;
      },
    )
    ?.reduce((acc = 0, curr) => (acc += +curr));
};

export function useAdditionalDiscount(groupCode, skip = false) {
  const { getCartEntry, updateCartEntry } = useCart();

  const {
    product,
    sum_insured,
    tenure,
    discounts = [],
    total_premium,
    premium,
  } = getCartEntry(groupCode) || {};

  const { subJourneyType } = useFrontendBoot();

  const cartEntry = getCartEntry(groupCode);

  const { data, ...queryState } = useGetAdditionalDiscountsQuery(
    {
      productId: product?.id,
      groupCode,
      sum_insured,
      tenure,
      subJourneyType,
    },
    { skip: skip },
  );

  function addAdditionalDiscount(additionalDiscount) {
    updateCartEntry(groupCode, {
      discounts: [...discounts, additionalDiscount?.alias],
    });
  }

  function removeAdditionalDiscount(additionalDiscount) {
    updateCartEntry(groupCode, {
      discounts: discounts?.filter(
        selectedAdditionalDiscount =>
          selectedAdditionalDiscount !== additionalDiscount?.alias,
      ),
    });
  }

  function isAdditionalDiscountSelected(additionalDiscount) {
    return discounts?.includes(additionalDiscount?.alias);
  }

  function toggleAdditionalDiscount(additionalDiscount) {
    const isSelected = isAdditionalDiscountSelected(additionalDiscount);
    if (isSelected) {
      removeAdditionalDiscount(additionalDiscount);
      return;
    }

    addAdditionalDiscount(additionalDiscount);
  }

  const getTotalDiscountAmount = () => {
    const selectedAdditionalDiscount = getSelectedAdditionalDiscounts();

    const totalDiscountAmount = selectedAdditionalDiscount?.length
      ? selectedAdditionalDiscount
          ?.map(discount => getDiscountAmount(discount))
          ?.reduce((acc = 0, curr) => {
            return (acc += +curr);
          })
      : 0;

    return totalDiscountAmount;
  };

  function getDiscountAmount(additionalDiscount) {
    const {
      percent,
      applied_on_total_premium: applied_on_total_cart_premium,
      applied_on_riders,
      fixed_discount_value,
      applied_on_discounts,
    } = additionalDiscount;

    let discountAmount = 0;

    if (fixed_discount_value) {
      //? return the amount directly if it is fixed.
      return +fixed_discount_value;
    }

    if (applied_on_total_cart_premium) {
      //? Means applied on cart total premium.
      //? Return discount amount applied on total_cart_premium.
      const discount =
        (parseInt(cartEntry?.netPremiumWithoutDiscount) * parseInt(percent)) /
        100;

      return (discountAmount = discountAmount + discount);
    }

    if (!applied_on_total_cart_premium) {
      //? means applied on premium
      const discount = (parseInt(total_premium) * parseInt(percent)) / 100;
      discountAmount = discountAmount + discount;
    }

    if (applied_on_riders) {
      const filtered_applied_on_riders = cartEntry.health_riders.filter(
        singleHealthRider =>
          applied_on_riders.includes(singleHealthRider?.alias),
      );

      const filtered_applied_on_riders_amount =
        filtered_applied_on_riders.length
          ? filtered_applied_on_riders
              .map(rider => rider.total_premium)
              ?.reduce((acc = 0, curr) => (acc += +curr))
          : 0;

      const discount =
        (+filtered_applied_on_riders_amount * parseInt(percent)) / 100;

      discountAmount = discountAmount + discount;
    }

    if (applied_on_discounts) {
      const selectedAdditionalDiscount = getSelectedAdditionalDiscounts();

      const filtered_applied_on_discounts = selectedAdditionalDiscount.filter(
        singleSelectedDiscount =>
          applied_on_discounts.includes(singleSelectedDiscount?.alias),
      );

      const filtered_applied_on_discounts_amount =
        filtered_applied_on_discounts?.length
          ? discountOnAnotherDiscount({
              discounts_on_which_discount_to_be_applied:
                filtered_applied_on_discounts,
              total_premium,
              premium,
              cartEntry,
            })
          : 0;

      const discount =
        (+filtered_applied_on_discounts_amount * parseInt(percent)) / 100;

      discountAmount = discountAmount - discount;
    }

    return discountAmount;
  }

  function getSelectedAdditionalDiscounts() {
    if (queryState?.isLoading || queryState?.isError) return [];

    const selectedAdditionalDiscounts = data?.data?.filter(additionalDiscount =>
      discounts?.includes(additionalDiscount?.alias),
    );

    return selectedAdditionalDiscounts;
  }

  return {
    query: { ...queryState, data },
    getSelectedAdditionalDiscounts,
    toggleAdditionalDiscount,
    getDiscountAmount,
    addAdditionalDiscount,
    getTotalDiscountAmount,
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

  const { groupCode } = useParams();

  const { groups } = useMembers();

  function getUrlWithEnquirySearch(path = "") {
    const currentGroup =
      localStorage.getItem("groups") &&
      JSON.parse(localStorage.getItem("groups")).find(
        group => group.id === +groupCode,
      );
    const locationQuery =
      currentGroup?.pincode && currentGroup?.city
        ? `&pincode=${currentGroup.pincode}&city=${currentGroup?.city}`
        : "";

    return `${path}?enquiryId=${enquiryId}${locationQuery}`;
  }

  return { enquiryId, getUrlWithEnquirySearch };
}

export function useGetQuotes(queryConfig = {}) {
  const insurersToFetch = useInsurersToFetch();

  const { journeyType } = useFrontendBoot();

  const { getSelectedFilter } = useFilters();

  const { groupCode } = useParams();

  const { showEditMembers: skip } = useSelector(({ quotePage }) => quotePage);

  const { filterQuotes } = useQuoteFilter({
    givenMoreFilters: {
      no_claim_bonus: getSelectedFilter("no_claim_bonus"),
      others: getSelectedFilter("others"),
      popular_filters: getSelectedFilter("popular_filters"),
      pre_existing_ailments: getSelectedFilter("pre_existing_ailments"),
    },
  });

  let { data, refetch, ...getCustomQuotesQuery } = useGetCustomQuotesQuery(
    {
      insurers: insurersToFetch,
      deductible: getSelectedFilter("deductible")?.code,
      sum_insured_range: getSelectedFilter("cover")?.code,
      group: +groupCode,
      base_plan_type: getSelectedFilter("baseplantype")?.code,
      tenure: getSelectedFilter("tenure")?.code,
      plan_type: getSelectedFilter("plantype")?.code,
      journeyType,
    },
    { skip, ...queryConfig },
  );

  const isLoading =
    insurersToFetch?.length <= 4
      ? data?.length < insurersToFetch?.length
      : data?.length < insurersToFetch?.length - 2;

  const quotesWithoutMoreFilters = data;

  //? SUPPLIES FILTERED QUOTE [PREMIUM + MORE FILTERS]
  if (data) {
    data = data?.map(insurerQuotes => {
      return {
        ...insurerQuotes?.data,
        company_alias: insurerQuotes?.company_alias,
        data: {
          ...insurerQuotes,
          data: filterQuotes(insurerQuotes?.data?.data),
        },
      };
    });
  }

  // const isLoading = data?.length < insurersToFetch.length;

  const loadingPercentage =
    !data || data?.length === 0
      ? 6
      : (data?.length / (insurersToFetch?.length - 1)) * 100;

  const isNoQuotes =
    data &&
    !isLoading &&
    data.every(insurerQuotes => insurerQuotes?.data?.data?.length === 0);

  return {
    ...getCustomQuotesQuery,
    data,
    isLoading,
    loadingPercentage,
    isNoQuotes,
    quotesWithoutMoreFilters,
    refetch,
  };
}

function useInsurersToFetch() {
  const searchQueries = useUrlQueries();
  const {
    data: {
      data: { groups },
    },
  } = useGetEnquiriesQuery(undefined, { skip: !searchQueries.enquiryId });

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
  const [touched, setTouched] = useState(false);

  const onChange = evt => {
    setEmailError({});
    setTouched(true);
    const { value: givenValue } = evt.target;

    if (!givenValue) {
      setValue(givenValue.toLowerCase());
      return;
    }

    setValue(givenValue.toLowerCase());
  };

  return { value, onChange, touched };
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
  const [touched, setTouched] = useState(false);

  const onChange = evt => {
    setTouched(true);
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

  return { value, onChange, onBlur, style, touched };
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
  const [touched, setTouched] = useState(false);

  const onChange = evt => {
    setTouched(true);
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

  return { value, onChange, type: "tel", maxLength, touched };
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
  const { showEditMembers: skip } = useSelector(({ quotePage }) => quotePage);
  const { data } = useGetQuotes({ skip });

  const icQuotes =
    data &&
    data.find(icQuotes => icQuotes?.data?.company_alias === company_alias);

  const isLoading = !data || !icQuotes;

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
  const { journeyType, subJourneyType } = useFrontendBoot();

  const getRidersQueryParams = {
    sum_insured: quote?.sum_insured,
    tenure: quote?.tenure,
    productId: quote?.product.id,
    group: parseInt(groupCode),
    journeyType,
    subJourneyType,
    ...queryOptions,
  };

  if (quote?.deductible) {
    getRidersQueryParams.deductible = quote?.deductible;
  }

  return useGetRidersQuery(getRidersQueryParams);
}

function isAffectsOtherRiders(rider) {
  return rider?.affects_other_riders;
}

function isMandatoryRider(rider) {
  return !!rider.is_mandatory;
}

function getRiderOptionsQueryString(riders = []) {
  const riderOptionsQueryString = riders.reduce(
    (urlQueries, rider) =>
      rider?.options_selected
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

function validateDependentRider(rider, riders) {
  const { available_only_with } = rider;

  if (!available_only_with) return true;

  let available_only_with_arr = parseJson(available_only_with);

  const isValid = available_only_with_arr.every(alias =>
    isRiderPresent(alias, getSelectedRiders(riders)),
  );

  return isValid;
}

export function useRiders({
  quote,
  groupCode,
  onChange,
  defaultSelectedRiders = [],
}) {
  const getInitialRiders = useCallback(() => {
    return defaultSelectedRiders.map(rider => ({
      ...rider,
      id: rider?.rider_id,
      isSelected: true,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupCode]);

  const [riders, setRiders] = useState(getInitialRiders);

  useEffect(() => setRiders(getInitialRiders), [getInitialRiders]); //? a fallback to assign initial-riders

  const feature_options = useCart().getCartEntry(+groupCode)?.feature_options;

  const updatedFeatureOptions = featureOptionsValidValue(feature_options);

  const findLocalRider = riderToFind =>
    riders.find(rider => rider?.id === riderToFind?.id);

  const additionalUrlQueries = getRiderOptionsQueryString(riders);

  const isRiderSelected = riderToCheck => {
    if (riderToCheck?.is_mandatory) return true;

    const localRider = findLocalRider(riderToCheck);

    return localRider && localRider?.isSelected;
  };

  const affectsOtherRiders = riders
    .filter(isRiderSelected)
    .filter(isAffectsOtherRiders)
    .map(rider => rider.alias);

  let selected_riders = [];

  if (affectsOtherRiders.length) selected_riders = affectsOtherRiders;

  let optionsSelected = {};

  riders.forEach(rider => {
    if (rider.options_selected) {
      optionsSelected = {
        ...optionsSelected,
        ...rider.options_selected,
      };
    }
  });

  const options_query = Object.keys(optionsSelected)
    .map(opt => `${opt}=${optionsSelected[opt]}`)
    .join("&");

  const query = useGetRiders(quote, groupCode, {
    queryOptions: {
      additionalUrlQueries,
      feature_options: updatedFeatureOptions,
      selected_riders,
      options_query,
    },
  });

  //? RELIANCE FUNCTIONALITY
  const reliance_general_feature_option_value =
    quote?.product?.company?.alias === "reliance_general" &&
    updatedFeatureOptions[Object.keys(updatedFeatureOptions)[0]]; //? free rider name to be selected by default

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
              rider.is_mandatory ||
              (localRider && localRider.isSelected) ||
              reliance_general_feature_option_value ===
                rider?.name?.toLowerCase()?.split(" ")?.join("_"),
            options_selected: rider?.options_selected,
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
    if (changedRider.isSelected) {
      const isValid = validateDependentRider(
        changedRider,
        getSelectedRiders(riders),
      );

      if (!isValid) return;
    }

    setRiders(riders => {
      let updatedRiders = riders.map(rider =>
        rider?.id === changedRider?.id ? changedRider : rider,
      );

      updatedRiders = updatedRiders.filter(updatedRider =>
        validateDependentRider(updatedRider, getSelectedRiders(updatedRiders)),
      );

      return updatedRiders;
    });
  };

  return {
    query,
    riders:
      quote?.product?.company?.alias === "reliance_general"
        ? riders.sort((a, b) => a.total_premium - b.total_premium)
        : riders.filter(rider => rider.total_premium > 0),
    handleChange,
    getInitialRiders,
  };
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

export const useRevisedPremiumModal = () => {
  const { cartEntries, getCartTotalPremium, getCartEntry } = useCart();

  const revisedPremiumPopupToggle = useToggle();

  const { groupCode } = useParams();

  const [revisedPremiumCheckHitByUs, setRevisedPremiumCheckHitByUs] =
    useState(false);

  const isProductDetailsPage =
    window.location.pathname.startsWith("/productdetails");

  const dispatch = useDispatch();

  /*-----------------------------------------------------------------------------------------------*/
  //? Proposal page constants

  const prevTotalPremium = useMemo(() => {
    return getCartTotalPremium();
  }, [groupCode]); /* memorizes the first value it gets */

  const previousCartEntries = useMemo(() => {
    return cartEntries;
  }, []); /* memorizes the first value it gets */

  const updatedTotalPremium =
    getCartTotalPremium(); /* Gets the updated value each time */

  /*-----------------------------------------------------------------------------------------------*/
  //? Product Details page constants

  const prevPremium = useMemo(() => {
    return getCartEntry(groupCode)?.premium;
  }, [groupCode]); /* memorizes the first value it gets */

  const updatedPremium = getCartEntry(groupCode)?.premium;

  /*-----------------------------------------------------------------------------------------------*/

  const getUpdatedCart = (next = () => {}) => {
    dispatch(
      api.util.invalidateTags(
        isProductDetailsPage
          ? [
              "Cart",
              "Rider",
              "AdditionalDiscount",
              "TenureDiscount",
              "featureOption",
            ]
          : ["Cart"],
      ),
    );
    setRevisedPremiumCheckHitByUs(true);
    next();
  }; /* Performs refetch from the server */

  useEffect(() => {
    if (isProductDetailsPage) {
      //? PRODUCT DETAILS PAGE LOGIC

      if (+prevPremium === +updatedPremium) {
        revisedPremiumPopupToggle.off();
      }
      if (Math.abs(prevPremium - updatedPremium) > 10) {
        revisedPremiumPopupToggle.on();
        dispatch(setIsPopupOn(true));
      }
    } else {
      //? PROPOSAL PAGE LOGIC

      if (+prevTotalPremium === +updatedTotalPremium) {
        revisedPremiumPopupToggle.off();
      }

      // if (+prevTotalPremium !== +updatedTotalPremium) {
      if (Math.abs(prevTotalPremium - updatedTotalPremium) > 10) {
        let stringedRidersName = "";
        for (let i = 0; i < previousCartEntries.length; i++) {
          const previousEntry = previousCartEntries[i];
          const currentEntry = cartEntries.find(
            entry => entry.id === previousEntry.id,
          );
          let ridersInPreviousCart = previousEntry.health_riders.map(
            rider => rider.name,
          );
          let ridersInCurrentCart = currentEntry.health_riders.map(
            rider => rider.name,
          );

          if (ridersInPreviousCart.length !== ridersInCurrentCart.length) {
            let removedRiderName = ridersInPreviousCart.find(
              rider => ridersInCurrentCart.indexOf(rider) < 0,
            );
            stringedRidersName += !stringedRidersName
              ? removedRiderName
              : ` and ${removedRiderName}`;
          }
        }
        if (stringedRidersName) {
          dispatch(
            setShowErrorPopup({
              show: true,
              head: "",
              msg: `Based on changes in Insured Date of Birth ${stringedRidersName} is unavailable. Please click OK & proceed.`,
              onCloseCallBack: () => {
                revisedPremiumPopupToggle.on();
                dispatch(setIsPopupOn(true));
              },
            }),
          );
        } else {
          revisedPremiumPopupToggle.on();
          dispatch(setIsPopupOn(true));
        }
      }
    }
  }, [
    prevTotalPremium,
    updatedTotalPremium,
    prevPremium,
    updatedPremium,
  ]); /* CONTROLS DISPLAY OF REVISED PREMIUM POPUP AUTOMATICALLY */

  const getUpdatedCartEntry = groupCode => {
    const cartEntry = cartEntries.find(
      cartEntry => +cartEntry?.group?.id === parseInt(groupCode),
    );

    return cartEntry;
  };

  const onOpenModal = () => {
    revisedPremiumPopupToggle.on();
  };

  const onCloseModal = () => {
    setRevisedPremiumCheckHitByUs(false);
    revisedPremiumPopupToggle.off();
  };

  const getPreviousCartEntryPremium = groupCode => {
    const cartEntry = previousCartEntries.find(
      cartEntry => +cartEntry?.group?.id === parseInt(groupCode),
    );

    return cartEntry?.premium;
  };

  const getUpdatedCartEntryPremium = groupCode => {
    const cartEntry = cartEntries.find(
      cartEntry => +cartEntry?.group?.id === parseInt(groupCode),
    );

    return cartEntry?.premium;
  };

  const isAnyPlanUnAvailableInCart = cartEntries?.some(
    singleEntry => !!singleEntry?.unavailable_message,
  );

  const unAvailablePlanInTheCart = cartEntries?.find(
    singleEntry => !!singleEntry?.unavailable_message,
  );

  return {
    getUpdatedCart,
    revisedPremiumPopupToggle,
    prevTotalPremium,
    updatedTotalPremium,
    updatedCartEntries: cartEntries,
    on: onOpenModal,
    off: onCloseModal,
    isOnProductDetails:
      revisedPremiumCheckHitByUs && revisedPremiumPopupToggle.isOn,
    isOnProposal: revisedPremiumPopupToggle.isOn,
    getUpdatedCartEntry,
    getPreviousCartEntryPremium,
    getUpdatedCartEntryPremium,
    isAnyPlanUnAvailableInCart,
    unAvailablePlanInTheCart,
  };
};

export const useDD = ({ initialValue = {}, required, errorLabel }) => {
  const [value, setValue] = useState(initialValue);

  const [isValueInputTouched, setIsValueInputTouched] = useState(false);

  const [error, setError] = useState({});

  const isValueValid = !error?.message;

  const showError = isValueInputTouched && !isValueValid;

  const ddErrorThrowingValidations = useCallback(
    (value, setError) => {
      //? Only validates if required.
      if (required) {
        if (!Object.keys(value).length) {
          return setError({ message: `Please select a ${errorLabel}.` });
        }
        return setError({});
      }
      return setError({});
    },
    [value],
  );

  useEffect(() => {
    ddErrorThrowingValidations(value, setError);
  }, [value, setError, ddErrorThrowingValidations]);

  const valueInputTouchedHandler = () => setIsValueInputTouched(true);

  const valueChangeHandler = singleOption => {
    const updatedValue = {
      code: singleOption?.value,
      display_name: singleOption?.label,
      ...singleOption,
    };
    setValue(updatedValue);
  };

  return {
    value,
    error,
    showError,
    isValueValid,
    shouldShowError: valueInputTouchedHandler,
    onChange: valueChangeHandler,
  };
};

export const usePolicyNumberValidations = ({
  initialValue = "",
  required,
  errorLabel,
  providedRegex = /^[\S]*$/,
}) => {
  const [value, setValue] = useState(initialValue);

  const [isValueInputTouched, setIsValueInputTouched] = useState(false);

  const [error, setError] = useState({});

  const isValueValid = !error?.message;

  const showError = isValueInputTouched && !isValueValid;

  const placeHolder =
    providedRegex &&
    `E.G. ${new RandExp(regexStringToRegex(providedRegex)).gen()}`;

  const ddErrorThrowingValidations = useCallback(
    (value, setError) => {
      //? Only validates if required.
      if (required) {
        if (value === "") {
          return setError({ message: `Please select a ${errorLabel}.` });
        }
        if (!providedRegex.test(value)) {
          return setError({ message: `Please enter a valid ${errorLabel}.` });
        }
        return setError({});
      }
      return setError({});
    },
    [value],
  );

  useEffect(() => {
    ddErrorThrowingValidations(value, setError);
  }, [value, setError, ddErrorThrowingValidations]);

  const valueInputTouchedHandler = () => setIsValueInputTouched(true);

  const valueChangeHandler = e => {
    setValue(e.target.value);
  };

  return {
    value,
    error,
    showError,
    isValueValid,
    placeHolder,
    shouldShowError: valueInputTouchedHandler,
    onChange: valueChangeHandler,
  };
};

export const useUSGIDiscounts = () => {
  //? Discounts info.
  //! Life Style Discount : To be applied only on proposal summary page.
  //! E-Sale Discount : Mandatory discount.
  //! Tired Hospital Discount : Optional discount.

  const lifeStyleDiscountAlias = "usgilifestyle";
  const eSaleDiscountAlias = "usgiesale";

  const location = useLocation();

  const { cartEntries, updateCartEntry, getCartTotalPremium } = useCart();

  const universalSompoPlanInCart = cartEntries
    ? cartEntries?.find(
        singlePlan => singlePlan?.product?.company?.alias === "universal_sompo",
      )
    : {}; //? CHECK WHETHER UNIVERSAL SOMPO PLAN IS IN THE CART.

  const skipRequest = !!!universalSompoPlanInCart?.group?.id; //? SKIP-TOKEN TO SKIP THE ADDITIONAL DISCOUNTS REQUEST IF UNIVERSAL SOMPO PLAN NOT PRESENT

  const {
    query: { data },
    getDiscountAmount,
    getSelectedAdditionalDiscounts,
    addAdditionalDiscount,
  } = useAdditionalDiscount(universalSompoPlanInCart?.group?.id, skipRequest);

  const selectedAdditionalDiscounts = getSelectedAdditionalDiscounts();

  const lifeStyleDiscount = selectedAdditionalDiscounts?.find(
    singleAd => singleAd?.alias === lifeStyleDiscountAlias,
  ); //? FIND LIFESTYLE DISCOUNT IF PRESENT IN THE CART.

  const eSaleDiscount = data?.data?.find(
    singleAd => singleAd?.alias === eSaleDiscountAlias,
  ); //? FIND E-Sale DISCOUNT IF PRESENT IN THE CART.

  useEffect(() => {
    if (cartEntries && universalSompoPlanInCart?.group?.id) {
      updateCartEntry(universalSompoPlanInCart?.group?.id, {
        ...universalSompoPlanInCart,
        discounts:
          location?.pathname === "/proposal_summary"
            ? [...universalSompoPlanInCart?.discounts, lifeStyleDiscountAlias]
            : universalSompoPlanInCart?.discounts?.filter(
                singleDiscount => singleDiscount !== lifeStyleDiscountAlias,
              ),
      }); //? Add/remove life style plan accordingly.
    }
  }, []);

  useEffect(() => {
    if (cartEntries && universalSompoPlanInCart?.group?.id) {
      if (!universalSompoPlanInCart?.discounts?.includes(eSaleDiscountAlias)) {
        addAdditionalDiscount(eSaleDiscount);
      }
    }
  }, [data]); //? Add E-sale discount if not already present.

  const totalPremiumToDisplay = () => {
    return lifeStyleDiscount
      ? getCartTotalPremium() - getDiscountAmount(lifeStyleDiscount)
      : getCartTotalPremium(); //? returns same total-premium if lifeStyle discount is not present
  }; //? TOTAL PREMIUM IS ONLY RE-CALCULATED IF LIFESTYLE DISCOUNT IS PRESENT IN THE CART.

  return totalPremiumToDisplay();
};

export const useClaimBanner = () => {
  const { settings } = useFrontendBoot();

  const claimBannerArray = isSSOJourney()
    ? settings?.claim_process_pos
    : settings?.claim_process;

  return {
    claimBannerArray,
    shouldShowClaimBanner: claimBannerArray ? true : false,
  };
};
