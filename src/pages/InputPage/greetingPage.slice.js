import { createSlice } from "@reduxjs/toolkit";
import SecureLS from "secure-ls";
import { getCityForPincode } from "../../FrontendBoot/serviceApi/frontendBoot";
import {
  setFilters,
  setSelectedGroup,
  setShouldFetchQuotes,
  updateFetchedFilters,
} from "../quotePage/quote.slice";
import { updateGroups } from "../quotePage/serviceApi";
import { setPlanType } from "../quotePage/quote.slice";

// import {
//   saveFilteredQuotes,
//   setFilters,
//   setSelectedGroup,
//   updateAllFilters,
//   updateFetchedFilters,
// } from "../../QuotesPage/quotePage.slice";

import {
  createUser,
  updateUser,
  checkpinCode,
  getProposerData,
} from "./ServiceApi/serviceApi";

// import { getCityForPincode } from "../../../FrontendBoot/serviceApi/frontendBoot";

const ls = new SecureLS();

const greeting = createSlice({
  name: "greeting",
  initialState: {
    enquiryHasFailed: false,
    memberGroups: {},
    proposerDetails: {},
    regionDetails: false,
    regionDetailsLoading: false,
    regionDetailsError: false,
    response: false,
    isLoading: false,
    isDisabled: false,
    status: false,
    enquiryId: "",
    error: [],
    trace_id: false,
  },
  reducers: {
    setTraceId: (state, action) => {
      state.trace_id = action.payload;
    },
    catchEnquiry: (state, action) => {
      state.enquiryHasFailed = true;
    },

    setMemberGroups: (state, action) => {
      console.log("member group set to", action.payload);
      state.memberGroups = action.payload;
    },
    createUserData: (state, action) => {
      state.proposerDetails = { ...state.proposerDetails, ...action.payload };
    },
    refreshUserData: (state, action) => {
      state.proposerDetails = action.payload;
    },
    saveResponseData: (state, action) => {
      state.response = action.payload;
      state.isLoading = false;
      state.status = !state.status;
    },
    initCreateUser: (state) => {
      state.isLoading = true;
    },
    createUserFailed: (state) => {
      state.isLoading = false;
    },
    setIsDisabled: (state, action) => {
      state.isDisabled = action.payload;
    },
    createUserSuccess: (state) => {
      state.status = false;
    },
    requestRegionData: (state, action) => {
      state.regionDetailsLoading = true;
      state.regionDetailsError = false;
    },
    requestRegionFail: (state, action) => {
      state.status = false;
      state.regionDetailsError = action.payload;
    },
    createRegionData: (state, action) => {
      state.regionDetails = action.payload;
      state.regionDetailsLoading = false;
    },

    createUserResponse: (state, action) => {
      state.userCreate = action.payload;
    },
    setErrors: (state, action) => {
      state.erro = action.payload;
    },
    saveEnquiryId: (state, action) => {
      state.enquiryId = action.payload;
    },
    ageError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  createUserData,
  saveResponseData,
  initCreateUser,
  createUserSuccess,
  updateUserData,
  createUserFailed,
  createUserResponse,
  setErrors,
  catchEnquiry,
  setIsDisabled,
  saveEnquiryId,
  createRegionData,
  refreshUserData,
  ageError,
  setMemberGroups,
  requestRegionData,
  requestRegionFail,
  setTraceId,
} = greeting.actions;

export const saveForm1UserDetails = (
  data2,
  handleChange,
  memberGroup,
  form
) => {
  const { pinCode, is_pincode_search, city } = data2;
  return async (dispatch) => {
    try {
      if (pinCode) {
        (form === 4.2 || form === 5) &&
          (await updateUser({
            pincode: pinCode,
            is_pincode_search,
          }));

        const { data } = await updateGroups({
          groupCode: memberGroup,
          data: {
            pincode: pinCode,
          },
        });
        console.log("wwww", data);
        const {
          data: { enquiry_id },
          access_token,
        } = data;

        // ls.set("token", access_token);
        // ls.set("enquiryId", enquiry_id);
        dispatch(
          createUserData({
            pincode: pinCode,
            is_pincode_search: is_pincode_search,
            [memberGroup]: { pincode: pinCode, city },
          })
        );

        // const newMemberGroups = data.data.groups.reduce(
        //   (groups, member) => ({
        //     ...groups,
        //     [member.id]: member.members,
        //   }),
        //   {}
        // );
        // pushToQuotes(Object.keys(newMemberGroups)[0]);
        handleChange(form);
        dispatch(setIsDisabled(false));
      }
    } catch {
      alert("something went wrong");
    }
  };
};

export const saveForm2UserDetails = (userDetails, handleChange) => {
  const { fullName, mobile, gender, email } = userDetails;
  return async (dispatch) => {
    try {
      const modUserDetails = {
        name: fullName,
        email: email,
        // first_name: fullName.split(" ")[0],
        // last_name: fullName.split(" ")[1],
        mobile: mobile,
        gender: gender,
      };

      const { data } = await createUser({
        section: "health",
        ...modUserDetails,
      });

      const {
        data: { enquiry_id },
        access_token,
      } = data;

      ls.set("token", access_token);
      ls.set("enquiryId", enquiry_id);

      dispatch(
        createUserData({
          ...modUserDetails,
        })
      );
      // dispatch(setMemberGroups(newMemberGroups));
      // dispatch(setSelectedGroup(Object.keys(newMemberGroups)[0]));
      const newMemberGroups = data.data.groups.reduce(
        (groups, member) => ({
          ...groups,
          [member.id]: member.members,
        }),
        {}
      );
      // pushToQuotes(Object.keys(newMemberGroups)[0]);
      handleChange(2);
      console.log("dgasgasd", 221);
      // dispatch(saveFilteredQuotes([]));
      // dispatch(createUserData(modUserDetails));
    } catch (err) {
      //alert(err);
    }
  };
};

// export const saveForm2UserDetails = (data, handleChange) => {
//   const { pinCode, is_pincode_search } = data;

//   return async dispatch => {
//     try {
//       const data = await updateUser({
//         pincode: pinCode,
//         is_pincode_search: is_pincode_search,
//       });

//       if (data?.input?.pincode !== null) {
//         dispatch(
//           createUserData({
//             pincode: pinCode,
//             is_pincode_search: is_pincode_search,
//           }),
//         );
//         setTimeout(() => {
//           handleChange("form3");
//           dispatch(setIsDisabled(false));
//         }, 500);
//       }
//     } catch (err) {
//       //alert(err);
//     }
//   };
// };

export const saveForm3UserDetails = (data, handleChange) => {
  return async (dispatch) => {
    let sonCount = 1;
    let DCount = 1;
    try {
      const response = await updateUser({
        members: data?.map((member) => {
          member.type = member.type.toLowerCase();
          if (member.type.includes("daughter"))
            return {
              ...member,
              type: member.type.slice(0, 8).concat(DCount++),
            };
          if (member.type.includes("son"))
            return {
              ...member,
              type: member.type.slice(0, 3).concat(sonCount++),
            };
          return member;
        }),
      });

      if (response?.data) {
        dispatch(createUserData({ members: response.data.data.input.members }));
        // handleChange("form4");
        if (response.data.data.input.members.length === 1) {
          dispatch(saveForm4UserDetails({ planType: "I" }));
        } else handleChange(3);
      }
      if (!response.success) {
        //emtpy commit
        dispatch(
          ageError(
            Object.keys(response.errors || {}).map(
              (item) => response.errors[item][0]
            )
          )
        );
      }
      const {
        data: { trace_id },
      } = response.data;
      dispatch(setTraceId(trace_id));
      if (data && !response.errors && data.length === 1) {
        handleChange(4.1);
      }
      // dispatch(createUserData({ member: data }));
      // const newMemberGroups = response.data.data.members.reduce(
      //   (groups, member) => ({
      //     ...groups,
      //     [member.group]: groups[member.group]
      //       ? [...groups[member.group], member.type]
      //       : [member.type],
      //   }),
      //   {},
      // );
      console.log("response data", response.data.data.groups);
      const newMemberGroups = response.data.data.groups.reduce(
        (groups, member) => ({
          ...groups,
          [member.id]: member.members,
        }),
        {}
      );
      dispatch(createUserData({ member: response?.data.data.members }));
      // const memberGroupsList = Object.keys(newMemberGroups);
      // const showPlanTypeFilter =
      //   memberGroupsList.length > 1 ||
      //   newMemberGroups[memberGroupsList[0]].length > 1;
      const showPlanTypeFilter = response.data.data.input.members.length;
      if (!showPlanTypeFilter) {
        dispatch(
          setFilters({
            planType: "Individual",
          })
        );
      }
      const members = Object.keys(newMemberGroups || {});
      console.log(
        "Members form save user form 3 data",
        "newMemberGroups",
        "selected group",
        members,
        newMemberGroups,
        Object.keys(newMemberGroups)[0]
      );
      dispatch(setMemberGroups(newMemberGroups));

      dispatch(setSelectedGroup(Object.keys(newMemberGroups)[0]));
    } catch (err) {
      // alert(err.message);
    }
  };
};

export const saveForm4UserDetails = (data) => {
  const { planType } = data;

  return async (dispatch) => {
    try {
      const response = await updateUser({
        plan_type: planType,
      });
      const newMemberGroups = response.data.data.groups.reduce(
        (groups, member) => ({
          ...groups,
          [member.id]: member.members,
        }),
        {}
      );
      dispatch(createUserData({ plan_type: planType }));
      dispatch(setMemberGroups(newMemberGroups));
      dispatch(setSelectedGroup(Object.keys(newMemberGroups)[0]));

      dispatch(
        setFilters({
          planType:
            planType === "M"
              ? "Multi Individual"
              : planType === "F"
              ? "Family Floater"
              : "Individual",
        })
      );
    } catch (err) {
      //alert(err);
    }
  };
};

export const saveForm5UserDetails = (data, pushToQuotes, planType) => {
  return async (dispatch, getState) => {
    try {
      const response = await updateUser({
        medical_history: [...data],
      });

      const newMemberGroups = response.data.data.groups.reduce(
        (groups, member) => ({
          ...groups,
          [member.id]: member.members,
        }),
        {}
      );

      dispatch(setMemberGroups(newMemberGroups));
      dispatch(setSelectedGroup(Object.keys(newMemberGroups)[0]));
      pushToQuotes(Object.keys(newMemberGroups)[0]);
      dispatch(setShouldFetchQuotes(true));
      dispatch(createUserData({ medical_history: [...data] }));
      /*dispatch(
        setFilters({
          planType:
            planType === "Multi Individual"
              ? "Multi Individual"
              : planType === "Family Floater"
              ? "Family Floater"
              : "Individual",
        })
      );*/
    } catch (err) {
      //alert(err);
    }
  };
};

export const getRegion = (data) => {
  return async (dispatch) => {
    try {
      dispatch(requestRegionData());
      const response = await checkpinCode(data);

      if (!response?.message) {
        dispatch(createRegionData(response?.data));
      } else {
        dispatch(requestRegionFail(response?.message));
      }
    } catch (error) {
      dispatch(requestRegionFail(error?.response?.data?.message));
    }
  };
};

export const getProposerDetails = (data) => {
  return async (dispatch) => {
    try {
      const response = await getProposerData(data);
      const cityResponse = await getCityForPincode({
        pincode: response?.data?.data?.input?.pincode,
      });
      const city = cityResponse?.data?.city;
      if (response.data) {
        ls.set("enquiryId", response?.data?.data?.enquiry_id);
        const {
          data: { trace_id },
        } = response.data;

        ls.set("trace_id", trace_id);
        dispatch(setTraceId(trace_id));
        const newData = {
          enquiryId: response?.data?.data?.enquiry_id,
          name: response.data?.data?.name,
          mobile: response?.data?.data?.mobile,
          member: response?.data?.data?.input.members,
          email: response?.data?.data?.email,
        };

        dispatch(
          refreshUserData({
            ...response?.data?.data?.input,
            ...newData,
            city,
            plan_type: response?.data?.data?.groups?.[0]?.plan_type,
          })
        );
        // dispatch(
        //   setFilters({
        //     ...response?.data?.data?.groups,
        //     plan_type: response?.data?.data?.groups?.[0]?.plan_type,
        //   })
        // );
        dispatch(updateFetchedFilters(response?.data?.data?.groups));
        const newMemberGroups = response.data.data.groups.reduce(
          (groups, member) => ({
            ...groups,
            [member.id]: member.members,
          }),
          {}
        );

        dispatch(setMemberGroups(newMemberGroups));
        dispatch(setSelectedGroup(Object.keys(newMemberGroups)[0]));
      }
    } catch (err) {
      console.error(err);
      dispatch(catchEnquiry());
      alert("Something went wrong");
    }
  };
};

export const updateProposerDetails = (response) => (dispatch) => {
  if (response.data) {
    ls.set("enquiryId", response?.data?.data?.enquiry_id);
    const newData = {
      enquiryId: response?.data?.data?.enquiry_id,
      name: response.data?.data?.name,
      mobile: response?.data?.data?.mobile,
      member: response?.data?.data?.input.members,
      email: response?.data?.data?.email,
    };
    dispatch(refreshUserData({ ...response?.data?.data?.input, ...newData }));
    const newMemberGroups = response.data.data.groups.reduce(
      (groups, member) => ({
        ...groups,
        [member.id]: member.members,
      }),
      {}
    );

    dispatch(setMemberGroups(newMemberGroups));
    dispatch(setSelectedGroup(Object.keys(newMemberGroups)[0]));
  }
};

export default greeting.reducer;

export const selectMembersWithAge = (groupCode) => (state) => {
  const members = state.greetingPage.memberGroups[groupCode];
  const membersWithAge = state.greetingPage.proposerDetails.members.filter(
    (member) => members.includes(member.type)
  );

  return membersWithAge;
};
