import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowBMI } from "../ProposalSections.slice";
import { setShowPlanNotAvail } from "../ProposalSections.slice";
import { useHistory } from "react-router";
import useUrlQuery from "../../../../customHooks/useUrlQuery";
import { FaTimes } from "react-icons/fa";

import {
  ButtonWrapper,
  CloseButton,
  Popup,
  PopupWrapper,
  Container,
  ViewQuotesWrapper,
} from "./BMI";
import { ClickSound } from "../../../../utils/helper";

const ErrorPopup = ({ show, head, msg, htmlProps, handleClose }) => {
  const { showErrorPopup } = useSelector(({ proposalPage }) => proposalPage);
  return (
    <PopupWrapper>
      <Popup>
        {/* <CloseButton
            onClick={handleClose}
          > */}
        {/* <i
          style={{ margin: "10px 10px 0 0", cursor: "pointer" }}
          class="fas fa-times"
          onClick={handleClose}
        ></i> */}
        <FaTimes
          onClick={handleClose}
          style={{
            margin: "10px 10px 0 0",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        ></FaTimes>
        {/* </CloseButton> */}
        <Container>
          {head && <span>{head}</span>}
          {htmlProps && <div dangerouslySetInnerHTML={{ __html: htmlProps }} />}
          {/* Based on your medical declaration, this plan is not valid for you,
              Please choose a different plan/insurer */}
          {msg && <p>{msg}</p>}
          <ButtonWrapper>
            <button
              className="btn"
              onClick={() => {
                ClickSound();
                handleClose();
                showErrorPopup?.onCloseCallBack &&
                  showErrorPopup.onCloseCallBack();
              }}
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
};

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
