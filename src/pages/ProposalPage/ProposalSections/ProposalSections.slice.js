import { createSlice } from "@reduxjs/toolkit";
import SecureLS from "secure-ls";
import swal from "sweetalert";
import { policyPdf } from "../../ThankYouPage/serviceApi";
import { api, useGetCartQuery } from "../../../api/api";
import {
  getProposal,
  PaymentStatus,
  saveProposal,
  fetchUnderWritingMQ,
  submitProposal,
  getMedicalUrls,
} from "./serviceApi";

const proposal = createSlice({
  name: "proposal",
  initialState: {
    proposalData: {},
    isLoading: false,
    Payment: false,
    showBMI: false,
    mediUnderwritting: false,
    showPlanNotAvail: false,
    showNSTP: false,
    canSendSummaryPdf:false,
    activeIndex: 0,
    policyStatus: [],
    noForAllChecked: false,
    policyLoading: true,
    failedBmiData: false,
    insuredDetailsResponse:{},
    medicalUrlsRuleEngine:false,
    failedBmiBlockJourney: false,
    underWritingStatus:[],
    showErrorPopup: {
      show: false,
      head: "",
      msg: "",
      onCloseCallBack:() => {}
    },
    planDetails: {
      title: "Your Plan Details",
      show: false,
      prevCart: {},
      isRenewed: false,
    },
    selectedIcs: [],
    loadingStack: [],
    isPopupOn: false,
  },
  reducers: {
    setProposalData: (state, action) => {
      state.proposalData = { ...state.proposalData, ...action.payload };
      state.isLoading = false;
    },
    setShowErrorPopup: (state, action) => {
      state.showErrorPopup = action.payload;
    },
    noForAllCheckedFalse: state => {
      state.noForAllChecked = false;
    },
    noForAllCheckedTrue: state => {
      state.noForAllChecked = true;
    },
    clearProposalData: state => {
      state.proposalData = {};
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setInsuredDetailsResponse:(state,{payload}) => {
      state.insuredDetailsResponse = payload;
    },
    setSelectedIcs: (state, { payload }) => {
      state.isLoading = payload;
    },
    setPayment: (state, { payload }) => {
      state.Payment = payload;
    },
    setFailedBmiData: (state, { payload }) => {
      state.failedBmiData = payload;
    },
    setMedUnderwritting: (state, { payload }) => {
      state.mediUnderwritting = payload;
    },
    setShowBMI: (state, { payload }) => {
      state.showBMI = payload;
    },
    setShowPlanNotAvail: (state, { payload }) => {
      state.showPlanNotAvail = payload;
    },
    setShowNSTP: (state, { payload }) => {
      state.showNSTP = payload;
    },
    setActiveIndex: (state, { payload }) => {
      state.activeIndex = payload;
    },
    setPolicyStatus: (state, { payload }) => {
      state.policyLoading = false;
      state.policyStatus = payload;
    },
    setPlanDetails: (state, { payload }) => {
      state.planDetails = payload;
    },
    setMedicalUrlsRuleEngine: (state, { payload }) => {
      state.medicalUrlsRuleEngine = payload;
    },
    pushLoadingStack: (state, { payload }) => {
      state.loadingStack.push(true);
    },
    popLoadingStack: (state, { payload }) => {
      state.loadingStack.pop();
    },
    setIsPopupOn: (state, { payload }) => {
      state.isPopupOn = payload;
    },
    setCanSendSummaryPdf:(state, { payload }) => {
      state.canSendSummaryPdf = payload;
    },
    setFailedBmiBlockJourney:(state, { payload }) => {
      state.failedBmiBlockJourney = payload;
    },
    setUnderWritingStatus:(state, { payload }) => {
      state.underWritingStatus = payload;
    },
  },
});
export const {
  setIsLoading,
  setProposalData,
  clearProposalData,
  setPayment,
  setMedUnderwritting,
  setShowPlanNotAvail,
  setShowBMI,
  setShowNSTP,
  setActiveIndex,
  setPolicyStatus,
  setPlanDetails,
  setSelectedIcs,
  noForAllCheckedFalse,
  noForAllCheckedTrue,
  setShowErrorPopup,
  setFailedBmiData,
  popLoadingStack,
  pushLoadingStack,
  setCanSendSummaryPdf,
  setIsPopupOn,
  setInsuredDetailsResponse,
  setFailedBmiBlockJourney,
  setUnderWritingStatus,
  setMedicalUrlsRuleEngine
} = proposal.actions;
const ls = new SecureLS();




// const hasAnyChangeInObj = (newVal, oldVal) => {
//   let newValKeys = Object.keys(newVal);
//   let oldValKeys = Object.keys(oldVal);
//   // if(newValKeys.length !== oldValKeys.length) return true
//   console.log(
//     "wfgbkjwsdfgsfb",
//     newVal,
//     oldVal,
//     newValKeys.some(newValKey => newVal[newValKey] !== oldVal[newValKey]),
//   );

//   return newValKeys.some(newValKey => newVal[newValKey] !== oldVal[newValKey]);
// };
export const getMedicalUnderwritingStatus = () => {
  return async (dispatch, state) => {
    try{
      const {data} = await fetchUnderWritingMQ();
      if(typeof data !== "string" && data?.final_result?.members){
        dispatch(setUnderWritingStatus(data?.final_result?.members));
      }
    } catch (err) {
      console.error(err);
    }
    
  }
}
export const saveProposalData = (proposalData, next, failure) => {
  return async (dispatch, state) => {
    try {
      console.log("wvnljsdvb", proposalData);
      let prevState = state()
      let prevProposalData = prevState.proposalPage.proposalData;
      let prevCart = prevState.cart;
      dispatch(setIsLoading(true));
      dispatch(pushLoadingStack());
      const response = await saveProposal(proposalData);
      // dispatch(
      //   api.util.invalidateTags([
      //     "Cart",
      //   ],undefined,))

      dispatch(api.util.invalidateTags(["ProposalSummaryUpdate"]));
      dispatch(setProposalData(proposalData));

      // console.log("dfbjdflb", state());
      //console.log("saveProposalData success", response);
      if (response.statusCode === 200) {
        next({
          responseData: response.data,
          prevProposalData,
          prevCart,
          updatedProposalData: state().proposalPage.proposalData,
        });
        dispatch(popLoadingStack());
      } else if (!response.data) {
        if (typeof response.errors === "object") {
          Object.keys(response.errors).map(i => {
            dispatch(
              setShowErrorPopup({
                show: true,
                head: i,
                msg: response.errors[i],
              }),
            );
          });
        } else {
          dispatch(
            setShowErrorPopup({
              show: true,
              head: "Error",
              msg: response.message,
            }),
          );
        }
      }
      console.log("bchkadvbchav", response);
    } catch (err) {
      //console.error("saveProposalData error", err);
      dispatch(setIsLoading(false));
    }
  };
};

export const fetchPdf = options => {
  return async dispatch => {
    try {
      const { data } = await policyPdf();
      dispatch(setPolicyStatus(data.data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getProposalData = successCallBack => {
  return async (dispatch, state) => {
    try {
      const { data, statusCode, ...otherData } = await getProposal();

      if (statusCode === 200) {
        const responseData = {};

        const { activeIndex } = state().proposalPage;
        Object.keys(data.data).forEach(item => {
          if (!(data.data[item] instanceof Array)) {
            responseData[item] = data.data[item];
          }
        });
        console.log("sfvbjksfb", otherData);
        dispatch(setProposalData(responseData));
        activeIndex !== 0 &&
          !activeIndex &&
          dispatch(
            setActiveIndex(
              Object.keys(responseData).length >= 4
                ? 3
                : Object.keys(responseData).length,
            ),
          );
        successCallBack();
      }

      // callBackFunc();
    } catch (err) {
      console.error(err);
    }
  };
};
export const submitProposalData = next => {
  console.log("Executed submitProposal data");
  return async dispatch => {
    try {
      const res = await submitProposal({ enquiryId: ls.get("enquiryId") });
      console.log("sfvblsfkn", res);

      if (res.statusCode === 200) {
        next();
      } else if (res.message) {
        dispatch(
          setShowErrorPopup({
            show: true,
            head: "",
            msg: res.message,
          }),
        );
      }
    } catch (err) {
      console.log("Error occured in submitProposal data");
      console.error(err);

      if (err.message) {
        dispatch(
          setShowErrorPopup({
            show: true,
            head: "",
            msg: err.message,
          }),
        );
      }

      // dispatch(setActiveIndex(0));
      // swal(err.message).then(dispatch(setActiveIndex(0)));
    }
  };
};
// export const postPayment = () => {
//   return async (dispatch) => {
//     try {
//       const res = await payment({ enquiryId: ls.get("enquiryId") });
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

export const getPaymentStatus = data => {
  return async dispatch => {
    try {
      const response = await PaymentStatus(data);

      if (response?.data) {
        dispatch(setPayment(response?.data[0].status === "success"));
      }
    } catch (err) {
      alert(err);
    }
  };
};

export const getMedicalUrlsRuleEngine = () => {
  return async dispatch => {
    try {
      const response = await getMedicalUrls();
      if (response?.data?.data?.members) {
        // let structuredData = Object.keys(response.data.data.members).reduce((acc,member) => {
        //   return {
        //     ...acc,
        //     [member]: {

        //     }
        //   }
        // },{})
        dispatch(setMedicalUrlsRuleEngine(response?.data?.data?.members));
      }
    } catch (err) {
      alert(err);
    }
  };
}

export default proposal.reducer;
