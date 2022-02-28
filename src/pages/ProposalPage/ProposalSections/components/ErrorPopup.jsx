import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowBMI } from "../ProposalSections.slice";
import { setShowPlanNotAvail } from "../ProposalSections.slice";
import { useHistory } from "react-router";
import useUrlQuery from "../../../../customHooks/useUrlQuery";
import {
  ButtonWrapper,
  CloseButton,
  Popup,
  PopupWrapper,
  Container,
  ViewQuotesWrapper,
} from "./BMI";

const ErrorPopup = ({show, head, msg, handleClose}) => {
  
 
    return (
      <PopupWrapper>
        <Popup>
          {/* <CloseButton
            onClick={handleClose}
          > */}
            <i style={{margin: "10px 10px 0 0", cursor: "pointer"}} class="fas fa-times" onClick={handleClose}></i>
          {/* </CloseButton> */}
          <Container>
            {head && (<span>{head}</span>)}
            <p>
            {/* Based on your medical declaration, this plan is not valid for you,
              Please choose a different plan/insurer */}
            {msg}
            </p>
            <ButtonWrapper>
              <button
              className="btn"
                onClick={handleClose}
              >
                OK
              </button>
            </ButtonWrapper>
            {/* <ViewQuotesWrapper>
              <button
                onClick={() => {
                  history.push(`/quotes/${member}?enquiryId=${enquiryId}`);
                }}
              >
                View Quotes {">"}
              </button>
            </ViewQuotesWrapper> */}
          </Container>
        </Popup>
      </PopupWrapper>
    );
}

export default ErrorPopup;





// const PlanUnavailable = () => {
//   const { showPlanNotAvail } = useSelector(state => state.proposalPage);
//   const history = useHistory();
//   const urlQuery = useUrlQuery();
//   const enquiryId = urlQuery.get("enquiryId");
//   const { memberGroups } = useSelector(state => state.greetingPage);
//   const member = Object.keys(memberGroups)[0];
//   const dispatch = useDispatch();
//   if (!showPlanNotAvail) return <></>;
//   if (showPlanNotAvail)
    
// };

// export default PlanUnavailable;
