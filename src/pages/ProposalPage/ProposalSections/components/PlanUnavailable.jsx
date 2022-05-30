import React from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useMembers } from "../../../../customHooks/index";
import useUrlQuery from "../../../../customHooks/useUrlQuery";
import { setShowPlanNotAvail } from "../ProposalSections.slice";
import {
  ButtonWrapper,
  Container,
  Popup,
  PopupWrapper,
  ViewQuotesWrapper,
} from "./BMI";

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
          <FaTimes
            style={{ margin: "20px 20px 0 0", cursor: "pointer" }}
            onClick={() => {
              dispatch(setShowPlanNotAvail(false));
            }}
          />
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
