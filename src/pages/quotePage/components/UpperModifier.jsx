import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import useUrlQuery from "../../../customHooks/useUrlQuery";
import PlanTypeFilter from "./filters/PlanTypeFilter";
import EditMemberFilter from "./filters/EditMemberFilter";
import ShareQuoteModal from "../../../components/ShareQuoteModal";
import {
  deleteQuotes,
  fetchQuotes,
  replaceQuotes,
  saveQuotesData,
  setFilters,
  setSelectedGroup,
} from "../quote.slice";

const UpperModifier = ({ sendQuote }) => {
  const successMsg = useSelector(({ comparePage }) => comparePage.emailStatus);

  const dispatch = useDispatch();
  const [showShareQuoteModal, setShowShareQuoteModal] = useState(false);
  const { companies } = useSelector(
    (state) => state.frontendBoot.frontendData.data
  );
  const { cover, tenure, plan_type } = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data.defaultfilters
  );
  const { plantypes, covers } = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data
  );
  const {
    // selectedGroup,
    toggleUi,
    filters: { cover: sumAssured, ownCover, multiYear, planType, basePlanType },
  } = useSelector((state) => state.quotePage);
  const { groupCode: selectedGroup } = useParams();
  const { memberGroups, proposerDetails } = useSelector(
    (state) => state.greetingPage
  );
  const { theme } = useSelector((state) => state.frontendBoot);
  const { loadingQuotes } = useSelector((state) => state.quotePage);
  const { PrimaryColor, SecondaryColor, PrimaryShade,SecondaryShade } = theme;
  console.log("Member Group", memberGroups);

  const history = useHistory();

  const urlQueryStrings = useUrlQuery();

  const enquiryId = urlQueryStrings.get("enquiryId");

  return (
    <>
      <UpperModifierWrapper PrimaryColor={PrimaryColor} SecondaryShade={SecondaryShade}>
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div className="left_modifiers  d-flex align-items-center">
            <EditMemberFilter />
            {Object.keys(memberGroups)
              .sort()
              .map((group) => {
                let membersText = memberGroups[group]
                  .join(", ")
                  .replaceAll("_", "-");

                if (membersText.length > 20) {
                  membersText = `${membersText.slice(0, 18)}...`;
                }

                return (
                  <>
                    <span
                     css={`
                     pointer-events: ${loadingQuotes && "none"};
                   //  filter: ${loadingQuotes && "grayscale(100%)"};
                    //  opacity:  ${loadingQuotes && "0.7"};
                   `}
                      className={
                        selectedGroup === group
                          ? `plans_for plans_for_members active position-relative`
                          : "plans_for plans_for_members"
                      }
                      onClick={() => {
                        history.push({
                          pathname: `/quotes/${group}`,
                          search: `enquiryId=${enquiryId}`,
                        });
                        dispatch(setSelectedGroup(group));
                      }}
                      css={`
                        text-transform: capitalize;
                        color: ${loadingQuotes && 'gray'};
                        font-weight: 900 !important;
                      `}
                    >
                      {membersText}
                      <div className="active_bar"></div>
                    </span>
                  </>
                );
              })}

            {/* <span className="plans_for plans_for_members">
              Father,Mother <div className="active_bar"></div>
            </span> */}
          </div>

          <div className="right_midifiers d-flex justify-content-between align-items-center ">
            <button
              className="btn share_Quote_btn"
              onClick={() => setShowShareQuoteModal(true)}
            >
              <i class="fas fa-share"></i> Share Quote
            </button>
          </div>
        </div>
      </UpperModifierWrapper>

      {/* modal */}
      <ShareQuoteModal
        show={showShareQuoteModal}
        handleClose={() => setShowShareQuoteModal(false)}
        imageSend={sendQuote}
        emailStatus={successMsg}
      />
    </>
  );
};

export default UpperModifier;

const UpperModifierWrapper = styled.div`
  background-color: ${props=>props.SecondaryShade};
  .left_modifiers {
    font-size: 15px;
    .plans_for {
      margin-right: 15px;
      cursor: pointer;
    }
    .plans_for_editable {
      font-weight: bold;
    }
    .plans_for_members {
      font-weight: 500;
      height: 57px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 165px;
      max-width: fit-content;
      text-align: center;
    }
    .plans_for_members.active {
      background-color: green;
      text-align: center;
      background-color: white;
      border-radius: 27px;
      padding: 3px 10px;
      height: 50px;
      & .active_bar {
        width: 90%;
        bottom: -16px;
        left: 50%;
        transform: translateX(-50%);
        height: 5px;
        background-color: ${props=>props.PrimaryColor};
        position: absolute;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
    }
  }

  .right_midifiers {
    .btn {
      background-color: white;
      margin-left: 7px;
      border-radius: 31px;
      font-weight: 500;
    }
    .share_Quote_btn {
      border: solid 2px ${props=>props.PrimaryColor} !important;
      color: ${props=>props.PrimaryColor};

      :focus {
        border: solid 2px ${props=>props.PrimaryColor} !important;
      }
      :active {
        border: solid 2px ${props=>props.PrimaryColor} !important;
      }
      :hover {
        border: solid 2px ${props=>props.PrimaryColor} !important;
      }
    }
  }
`;
