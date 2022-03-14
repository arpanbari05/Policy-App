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
import { FaTimes } from "react-icons/fa";
import { useMembers } from "../../../../customHooks/index"

const PlanUnavailable = () => {
  const { showPlanNotAvail } = useSelector(state => state.proposalPage);
  const history = useHistory();
  const urlQuery = useUrlQuery();
  const enquiryId = urlQuery.get("enquiryId");
  const member = useMembers().groups.map(el => el.id)[0];
  const dispatch = useDispatch();
  if (!showPlanNotAvail) return <></>;
  if (showPlanNotAvail)
    return (
      <PopupWrapper>
        <Popup>
            <FaTimes style={{margin: "20px 20px 0 0", cursor: "pointer"}} onClick={() => {
              dispatch(setShowPlanNotAvail(false));
            }} />
          <Container>
            <span>Plan Unavailable</span>
            <p>
              Based on your medical declaration, this plan is not valid for you,
              Please choose a different plan/insurer
            </p>
            <ButtonWrapper>
              <button
                onClick={() => {
                  dispatch(setShowPlanNotAvail(false));
                }}
              >
                OK
              </button>
            </ButtonWrapper>
            <ViewQuotesWrapper>
              <button
                onClick={() => {
                  history.push(`/quotes/${member}?enquiryId=${enquiryId}`);
                }}
              >
                View Quotes {">"}
              </button>
            </ViewQuotesWrapper>
          </Container>
        </Popup>
      </PopupWrapper>
    );
};

export default PlanUnavailable;
