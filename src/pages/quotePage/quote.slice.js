import { createSlice } from "@reduxjs/toolkit";
import {
  createCart,
  getQutoes,
  deleteCart,
  getCart,
  getDiscount,
  updateCart,
} from "./serviceApi";
import { createUser } from "../InputPage/ServiceApi/serviceApi";
import SecureLS from "secure-ls";
import {
  ageError,
  refreshUserData,
  setMemberGroups,
  setTraceId,
} from "../InputPage/greetingPage.slice";
import axios from "axios";
import { api } from "../../api/api";
const ls = new SecureLS();

//===============================================

const quotePageSlice = createSlice({
  initialState: {
    isOnProductDetails: false,
    appLoading: false,
    loadingQuotes: false,
    toggleUi: false,
    quotes: [],
    quotesToShare: [],
    quotesToCanvas: [],
    pos_popup: false,
    shortlistedQuotes: [],
    shareType: {},
    showSharePopup: true,
    quotesOnCompare: false,
    showEditMembers: false,
    editStep: 1,
    quotesForCompare: [],
    selectedPlan: {},
    createCartData: {},
    cartItems: [],
    filterQuotes: [],
    fetchFilters: [],
    shouldFetchQuotes: false,
    policyTypes: {},
    policyType: "",
    filters: {
      insurers: [],
      premium: null,
      cover: "",
      ownCover: "",
      planType: "",
      multiYear: "",
      basePlanType: "Base Health",
      moreFilters: {},
    },
    productDiscounts: [],
    selectedDiscount: {},
    selectedQuotes: {},
    selectedGroup: "group_code_1",
    selectedRiders: [],
    selectedAddOns: {},
    quotesForSort: {},
  },
  name: "quote",
  reducers: {
    ChangeUi: state => {
      state.toggleUi = !state.toggleUi;
    },
    setAppLoading: (state, action) => {
      state.appLoading = action.payload;
    },
    setShouldFetchQuotes: (state, action) => {
      state.shouldFetchQuotes = action.payload;
    },
    setQuotesToShare: (state, action) => {
      state.quotesToShare = [...state.quotesToShare, action.payload];
    },
    removeQuoteFromShare: (state, action) => {
      state.quotesToShare = state.quotesToShare.filter(
        data => data[0]?.product?.id !== action.payload[0]?.product?.id,
      );
    },
    addShortListedQuote: (state, action) => {
      state.shortlistedQuotes = [...state.shortlistedQuotes, action.payload];
    },
    removeShortListedQuote: (state, action) => {
      state.shortlistedQuotes = state.shortlistedQuotes.filter(
        quote => quote.product.id !== action.payload.product.id,
      );
    },
    replaceShortlistedQuote: (state, action) => {
      state.shortlistedQuotes = action.payload;
    },
    setPosPopup: (state, action) => {
      state.pos_popup = action.payload;
    },
    setShowEditMembers: (state, action) => {
      state.showEditMembers = action.payload;
    },
    setShowSharePopup: (state, action) => {
      state.showSharePopup = action.payload;
    },
    setEditStep: (state, action) => {
      state.editStep = action.payload;
    },
    replaceShareQuotes: (state, action) => {
      state.quotesToShare = action.payload;
    },
    setShareType: (state, action) => {
      state.shareType = action.payload;
    },
    setQuotesToCanvas: (state, action) => {
      state.quotesToCanvas = action.payload;
    },
    addSelectedAddOns: (state, action) => {
      state.selectedAddOns = {
        ...state.selectedAddOns,
        [state.selectedGroup]: action.payload,
      };
    },
    setIsOnProductDetails: (state, action) => {
      state.isOnProductDetails = action.payload;
    },
    addSelectedAddOn: (state, action) => {
      const currentAddOns = state.selectedAddOns[state.selectedGroup];
      state.selectedAddOns[state.selectedGroup] = currentAddOns
        ? [...currentAddOns, action.payload]
        : [action.payload];
    },
    removeSelectedAddOns: (state, action) => {
      const newAddOns = state.selectedAddOns[state.selectedGroup].filter(
        addOn => addOn.product.id !== action.payload.product.id,
      );
      state.selectedAddOns = {
        ...state.selectedAddOns,
        [state.selectedGroup]: newAddOns,
      };
    },
    setSelectedAddOns: (state, action) => {
      state.selectedAddOns = action.payload;
    },
    addSelectedRiders: (state, action) => {
      state.selectedRiders = {
        ...state.selectedRiders,
        [state.selectedGroup]: action.payload,
      };
    },
    addSelectedRider: (state, action) => {
      const currentRiders = state.selectedRiders[state.selectedGroup];
      state.selectedRiders[state.selectedGroup] = currentRiders
        ? [...currentRiders, action.payload]
        : [action.payload];
    },
    removeSelectedRider: (state, action) => {
      const newRiders = state.selectedRiders[state.selectedGroup].filter(
        rider => rider.name !== action.payload.name,
      );
      state.selectedRiders = {
        ...state.selectedRiders,
        [state.selectedGroup]: newRiders,
      };
    },
    setSelectedRiders: (state, action) => {
      state.selectedRiders = action.payload;
    },
    setQuotes: (state, action) => {
      state.quotes = action.payload;
    },
    setLoadingQuotes: (state, action) => {
      state.loadingQuotes = action.payload;
    },
    removeSelectedQuote: (state, action) => {
      const newQuotes = { ...state.selectedQuotes };
      delete newQuotes[action.payload];
      state.selectedQuotes = newQuotes;
      const newRiders = { ...state.selectedRiders };
      delete newRiders[action.payload];
      state.selectedRiders = newRiders;
    },
    addSelectedQuote: (state, action) => {
      state.selectedQuotes = {
        ...state.selectedQuotes,
        [state.selectedGroup]: action.payload,
      };
      // delete state.selectedRiders[state.selectedGroup];
    },
    setSelectedQuotes: (state, action) => {
      state.selectedQuotes = action.payload;
    },
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    updateFetchedFilters: (state, action) => {
      state.fetchFilters = action.payload;
    },
    setQuotesOnCompare: state => {
      state.quotesOnCompare = !state.quotesOnCompare;
    },
    updateQuotesForCompare: (state, action) => {
      state.quotesForCompare = action.payload;
    },
    setQuotesForCompare: (state, action) => {
      if (
        state.quotesForCompare.indexOf(action.payload[0]) === -1 &&
        state.quotesForCompare.length < action.payload[1]
      ) {
        state.quotesForCompare = [...state.quotesForCompare, action.payload[0]];
      }

      // .push(action.payload[0]);
    },
    removeQuotesForCompare: (state, action) => {
      state.quotesForCompare = state.quotesForCompare.filter(
        data => data !== action.payload,
      );
    },
    removeAllQuotesForCompare: state => {
      state.quotesForCompare = [];
    },
    replaceQuotes: (state, action) => {
      state.quotes = action.payload;
    },
    deleteQuotes: state => {
      state.quotes = [];
    },
    replaceFilterQuotes: (state, action) => {
      state.filterQuotes = action.payload;
    },
    saveQuotes: (state, action) => {
      state.quotes = [...state.quotes, action.payload];
      state.filterQuotes = [...state.filterQuotes, action.payload];
    },
    saveFilteredQuotes: (state, action) => {
      state.quotes = [action.payload];
    },
    clearFilterQuotes: state => {
      state.filterQuotes = [];
      state.quotes = [];
      state.quotesForCompare = [];
      state.quotesOnCompare = false;
    },
    reateUserData: (state, action) => {
      state.proposerDetails = { ...state.proposerDetails, ...action.payload };
    },
    saveSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
    saveCartData: (state, action) => {
      state.createCartData = action.payload;
    },
    saveProductCart: (state, action) => {
      state.cartItems = action.payload;
    },
    deleteCartItemArr: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.product_id !== action.payload.id,
      );
    },
    saveProductDiscountResponse: (state, action) => {
      state.productDiscounts = action.payload;
    },
    saveFilteredPremium: (state, action) => {
      state.quotes = state.quotes.map(item =>
        item.filter(quote =>
          action.payload.code.includes("-")
            ? Number(quote.premium) >
                Number(action.payload.code.split("-")[0]) &&
              Number(quote.premium) < Number(action.payload.code.split("-")[1])
            : Number(quote.premium) < Number(action.payload.code.slice(1)),
        ),
      );
    },

    insurerFilterQuotes: (state, action) => {
      state.filterQuotes = state.quotes.map(item => {
        return item.filter(quote => {
          if (action.payload.includes(quote.company_alias)) return quote;
        });
      });
    },

    premiumFilterQuotes: (state, action) => {
      state.filterQuotes = state.quotes.map(item => {
        if (action.payload?.code.includes("<")) {
          return item.filter(quote => quote.premium < 5000);
        } else {
          return item.filter(
            quote =>
              quote.premium > action.payload?.code?.split("-")[0] &&
              quote.premium < action.payload?.code?.split("-")[1],
          );
        }
      });
    },
    setQuotesForSort: (state, action) => {
      state.quotesForSort = action.payload;
    },
    setQuotesForSortForIC: (state, action) => {
      const { company_alias, quotes } = action.payload;
      state.quotesForSort[company_alias] = quotes;
    },
    setPolicyTypes: (state, action) => {
      state.policyTypes = action.payload;
    },
    setPolicyType: (state, action) => {
      state.policyTypes = action.payload;
    },
  },
});

export const {
  setQuotesOnCompare,
  setQuotesForCompare,
  removeQuotesForCompare,
  removeAllQuotesForCompare,
  saveQuotes,
  saveFilteredQuotes,
  saveFilteredPremium,
  setQuotesToShare,
  removeQuoteFromShare,
  setShareType,
  addShortListedQuote,
  removeShortListedQuote,
  setShowEditMembers,
  setEditStep,
  replaceShortlistedQuote,
  setShowSharePopup,
  setQuotesToCanvas,
  replaceShareQuotes,
  setPosPopup,
  saveSelectedPlan,
  setShouldFetchQuotes,
  saveCartData,
  saveProductCart,
  deleteCartItemArr,
  updateFetchedFilters,
  insurerFilterQuotes,
  premiumFilterQuotes,
  ChangeUi,
  replaceQuotes,
  replaceFilterQuotes,
  updateQuotesForCompare,
  setFilters,
  setPolicyTypes,
  setPolicyType,
  setIsOnProductDetails,

  saveProductDiscountResponse,
  setSelectedGroup,
  addSelectedQuote,
  removeSelectedQuote,
  setLoadingQuotes,
  setSelectedQuotes,
  setSelectedRiders,
  addSelectedRider,
  removeSelectedRider,
  addSelectedRiders,
  addSelectedAddOns,
  setSelectedAddOns,
  removeSelectedAddOns,
  addSelectedAddOn,
  setQuotes,
  setAppLoading,
  clearFilterQuotes,
  deleteQuotes,
  setQuotesForSort,
  setQuotesForSortForIC,
} = quotePageSlice.actions;

export const selectQuotesForSort = state => state.quotePage.quotesForSort;

const cancelTokens = {};
var flag = false;

export const fetchQuotes =
  (companies, { sum_insured, tenure, plan_type, member, basePlanType }) =>
  async (dispatch, store) => {
    if (store().quotePage.isOnProductDetails) return;

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
            quoteData.map(item => {
              if (item.product.insurance_type.name === "Health Insurance") {
                flag = true;
              }
            });
            if (flag) {
              dispatch(saveQuotes(quoteData));
            }
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
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

export const saveQuotesData = data => {
  const { alias, sum_insured, tenure, member, plan_type } = data;

  return async (dispatch, getState) => {
    const { companies } = getState().frontendBoot.frontendData.data;

    try {
      const response = await getQutoes({
        alias,
        sum_insured,
        tenure,
        member,
        plan_type,
      });
      const newData = response?.data?.data.map(data => {
        return { ...data, logo: companies[data.company_alias].logo };
      });

      if (response?.data) {
        dispatch(saveQuotes(newData));
      }
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };
};

export const insurerFilter = data => {
  let aliasSet = [];
  data.map(({ alias }) => aliasSet.push(alias));

  return async dispatch => {
    dispatch(insurerFilterQuotes(aliasSet));
  };
};

export const premiumFilterCards = data => {
  const { code } = data;
  return async dispatch => {
    dispatch(premiumFilterQuotes({ code }));
  };
};
export const createCartItem = (data, onCreate = () => {}) => {
  const newData = {
    enquiry_id: ls.get("enquiryId"),
    insurance_id: data?.insurance_id,
    product_id: data?.product?.id,
    insurance_type_id: data?.insurance_type_id,
    tenure: data?.tenure,
    sum_insured: data?.sum_insured,
    premium: data?.totalPremium || data?.gross_premium,
    pa_addons: [],
    members: data?.members,
  };
  return async dispatch => {
    try {
      const response = await createCart(newData);
      if (response?.data) {
        onCreate(response?.data.data.id);
        dispatch(getCartItem());
        dispatch(saveCartData(response?.data?.data));
      }
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };
};

export const deleteCartItem = (data, onDelete = () => {}) => {
  return async dispatch => {
    try {
      await deleteCart(data).then(() => {
        onDelete();
        dispatch(getCartItem());
      });
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };
};

export const getCartItem = data => {
  return async dispatch => {
    try {
      const response = await getCart(data);
      if (response?.data) {
        dispatch(saveProductCart(response?.data?.data));
      }
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };
};

export const updateCartItem = (data, onUpdate = () => {}) => {
  return async dispatch => {
    try {
      const resopnse = await updateCart(data);
      await dispatch(getCartItem());
      onUpdate(resopnse?.data?.data?.id);
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateUserMembersDetails = (givenData, history, handleClose) => {
  // let members = data.filter(d => d.age);

  return async (dispatch, getState) => {
    const planType = getState().quotePage.filters.planType;
    const { name, mobile, gender, email, pincode, members } = givenData || {};
    try {
      let sonCount = 1;
      let DCount = 1;
      const response = await createUser({
        name,
        mobile,
        email,
        gender,
        pincode,
        plan_type: planType ? planType.slice(0, 1) : "F",
        section: "health",
        members: members?.map(member => {
          if (member.type.includes("daughter"))
            return {
              ...member,
              type: member.type.slice(0, 8).concat(sonCount++),
            };
          if (member.type.includes("son"))
            return {
              ...member,
              type: member.type.slice(0, 3).concat(DCount++),
            };
          return member;
        }),
      });

      if (response.errors) {
        const { errors } = response;
        const errorsList = Object.values(errors);
        dispatch(ageError(errorsList));
      } else {
        handleClose();
      }

      if (response.data) {
        const currentGroup =
          localStorage.getItem("groups") &&
          JSON.parse(localStorage.getItem("groups")).find(group => group?.id);

        dispatch(setAppLoading(true));
        ls.set("enquiryId", response?.data?.data?.enquiry_id);
        dispatch(setTraceId(response.data.data.trace_id));
        const newData = {
          enquiryId: response?.data?.data?.enquiry_id,
          name: response.data?.data?.name,
          mobile: response?.data?.data?.mobile,
          member: response?.data?.data?.input.members,
          email: response?.data?.data?.email,
        };
        const newMemberGroups = response.data.data.groups.reduce(
          (groups, member) => ({
            ...groups,
            [member.id]: member.members,
          }),
          {},
        );
        dispatch(setMemberGroups(newMemberGroups));

        history.push({
          pathname: `/quotes/${Object.keys(newMemberGroups)[0]}`,
          search: `enquiryId=${newData.enquiryId}&pincode=${currentGroup?.pincode}&city=${currentGroup?.city}`,
        });
        dispatch(
          api.util.updateQueryData("getEnquiries", undefined, draft => {
            Object.assign(draft, response.data);
          }),
        );

        dispatch(
          refreshUserData({ ...response?.data?.data?.input, ...newData }),
        );

        dispatch(setSelectedGroup(Object.keys(newMemberGroups)[0]));
        dispatch(ageError([]));
        dispatch(setAppLoading(false));
      }
    } catch (err) {
      setAppLoading(false);
      console.error(err);
      alert(err);
    }
  };
};
export const getProductDiscount =
  ({ alias, product_id, member, sum_insured, group }, onFetch = () => {}) =>
  async dispatch => {
    try {
      const response = await getDiscount({
        alias: alias,
        productId: product_id,
        member,
        group,
        sum_insured,
      });
      if (response.message) {
        onFetch(null, response.message);
      }
      if (response?.data) {
        dispatch(saveProductDiscountResponse(response?.data?.data));
        onFetch(response.data?.data);
      }
    } catch (err) {
      alert(err);
      console.error(err);
    }
  };

export default quotePageSlice.reducer;

export const selectFilteredInsurers = state => state.quotePage.filters.insurers;
export const selectFilters = state => state.quotePage.filters;
