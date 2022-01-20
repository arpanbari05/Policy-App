import { createSlice } from "@reduxjs/toolkit";
import SecureLS from "secure-ls";
import swal from "sweetalert";
import { policyPdf } from "../../ThankYouPage/serviceApi";
import {
  getProposal,
  PaymentStatus,
  saveProposal,
  submitProposal,
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
    activeIndex: 0,
    policyStatus: [],
    noForAllChecked: false,
    policyLoading: true,
    planDetails: {
      title: "Your Plan Details",
      show: false,
      prevCart: {},
      isRenewed: false,
    },
  },
  reducers: {
    setProposalData: (state, action) => {
      state.proposalData = { ...state.proposalData, ...action.payload };
      state.isLoading = false;
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
    setPayment: (state, { payload }) => {
      state.Payment = payload;
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
  noForAllCheckedFalse,
  noForAllCheckedTrue,
} = proposal.actions;
const ls = new SecureLS();
export const saveProposalData = (proposalData, next, failure) => {
  return async dispatch => {
    try {
      dispatch(setIsLoading(true));
      const response = await saveProposal(proposalData);
      dispatch(setProposalData(proposalData));

      //console.log("saveProposalData success", response);
      if (response.statusCode === 200) next(response.data);
      else if (!response.data) failure(response.errors);
      console.log(response);
    } catch (err) {
      //console.error("saveProposalData error", err);
      dispatch(setIsLoading(false));
      alert(err.message);
    }
  };
};
export const fetchPdf = options => {
  return async dispatch => {
    try {
      console.log("triggered");
      const { data } = await policyPdf();
      dispatch(setPolicyStatus(data.data));
      // console.log(data.data.every(item => item.status === "policy_issued"));
      // if (
      //   !options?.noRepeat &&
      //   !data.data.every(item => item.status === "policy_issued")
      // ) {
      //   setTimeout(() => {
      //     dispatch(fetchPdf());
      //   }, 10000);
      // }
    } catch (err) {
      console.error(err);
    }
  };
};
export const getProposalData = () => {
  return async dispatch => {
    try {
      const { data } = await getProposal();
      const responseData = {};

      Object.keys(data.data).forEach(item => {
        if (!(data.data[item] instanceof Array)) {
          responseData[item] = data.data[item];
        }
      });
      console.log(Object.keys(responseData).length);
      dispatch(setProposalData(responseData));
      dispatch(
        setActiveIndex(
          Object.keys(responseData).length >= 4
            ? 3
            : Object.keys(responseData).length,
        ),
      );
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

      if (res.statusCode === 200) {
        next();
      } else throw new Error(res.message);
    } catch (err) {
      console.log("Error occured in submitProposal data");
      console.error(err);
      swal(err.message).then(dispatch(setActiveIndex(0)));
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

export default proposal.reducer;
