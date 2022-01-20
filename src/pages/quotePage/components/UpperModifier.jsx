import { useMembers, useTheme, useUrlEnquiry } from "../../../customHooks";
import { Container } from "react-bootstrap";
import EditMemberFilter from "./filters/EditMemberFilter";
import { Link, useParams } from "react-router-dom";
import { MemberText } from "../../../components";
import "styled-components/macro";

function UpperModifier() {
  const { colors } = useTheme();

  return (
    <div
      css={`
        background-color: ${colors.secondary_shade};
      `}
    >
      <Container>
        <div
          css={`
            height: 5.37em;
          `}
          className="d-flex align-items-center"
        >
          <EditMemberFilter />
          <GroupLinks />
        </div>
      </Container>
    </div>
  );
}

export default UpperModifier;

function GroupLinks({ ...props }) {
  const { groups } = useMembers();
  return (
    <div
      className="d-flex align-items-center mx-3 h-100"
      css={`
        gap: 1em;
      `}
      {...props}
    >
      {groups.map(group => (
        <GroupLink group={group} key={group.id} />
      ))}
    </div>
  );
}

function GroupLink({ group, ...props }) {
  const { colors } = useTheme();

  const { id } = group;

  const { enquiryId } = useUrlEnquiry();

  let { groupCode } = useParams();

  groupCode = parseInt(groupCode);

  const isCurrentGroup = id === groupCode;

  const { getMembersText } = useMembers();

  const membersText = getMembersText(group);

  return (
    <div
      className="d-flex align-items-center position-relative h-100"
      {...props}
    >
      <Link
        to={{
          pathname: `/quotes/${group.id}`,
          search: `enquiryId=${enquiryId}`,
        }}
        title={membersText}
        className="text-center"
        css={`
          display: inline-block;
          background-color: #fff;
          border-radius: 2em;
          min-width: 11em;
          font-weight: 900;
          max-width: 12em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.93rem;
          line-height: 1;
          padding: 1.2em 1em;
        `}
      >
        <MemberText>{membersText}</MemberText>
      </Link>
      {isCurrentGroup && (
        <div
          className="position-absolute"
          css={`
            height: 0.3em;
            width: 90%;
            left: 50%;
            top: 100%;
            transform: translate(-50%, -100%);
            background-color: ${colors.primary_color};
            border-radius: 0.3em 0.3em 0 0;
          `}
        />
      )}
    </div>
  );
}

// import { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// import "styled-components/macro";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory, useParams } from "react-router";
// import useUrlQuery from "../../../customHooks/useUrlQuery";
// import PlanTypeFilter from "./filters/PlanTypeFilter";
// import EditMemberFilter from "./filters/EditMemberFilter";
// import ShareQuoteModal from "../../../components/ShareQuoteModal";
// import {
//   deleteQuotes,
//   fetchQuotes,
//   replaceQuotes,
//   saveQuotesData,
//   setFilters,
//   setSelectedGroup,
// } from "../quote.slice";
// import { Link } from "react-router-dom";
// import { useMembers } from "../../../customHooks";
// import { MemberText } from "../../../components";

// const UpperModifier = ({ sendQuote }) => {
//   const successMsg = useSelector(({ comparePage }) => comparePage.emailStatus);

//   const dispatch = useDispatch();
//   const [showShareQuoteModal, setShowShareQuoteModal] = useState(false);
//   const { companies } = useSelector(
//     state => state.frontendBoot.frontendData.data,
//   );
//   const { cover, tenure, plan_type } = useSelector(
//     ({ frontendBoot }) => frontendBoot.frontendData.data.defaultfilters,
//   );
//   const { plantypes, covers } = useSelector(
//     ({ frontendBoot }) => frontendBoot.frontendData.data,
//   );
//   const {
//     // selectedGroup,
//     toggleUi,
//     filters: { cover: sumAssured, ownCover, multiYear, planType, basePlanType },
//   } = useSelector(state => state.quotePage);
//   const { groupCode: selectedGroup } = useParams();
//   const { memberGroups, proposerDetails } = useSelector(
//     state => state.greetingPage,
//   );
//   const { theme } = useSelector(state => state.frontendBoot);
//   const loadingQuotes = false;
//   // const { loadingQuotes } = useSelector((state) => state.quotePage);
//   const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
//   console.log("Member Group", memberGroups);

//   const history = useHistory();

//   const urlQueryStrings = useUrlQuery();

//   const enquiryId = urlQueryStrings.get("enquiryId");

//   return (
//     <>
//       <UpperModifierWrapper
//         PrimaryColor={PrimaryColor}
//         SecondaryShade={SecondaryShade}
//       >
//         <div className="container d-flex justify-content-between align-items-center py-3">
//           <div className="left_modifiers  d-flex align-items-center">
//             <EditMemberFilter />
//             <GroupLinks />
//             {/* {Object.keys(memberGroups)
//               .sort()
//               .map((group) => {
//                 let membersText = memberGroups[group]
//                   .join(", ")
//                   .replaceAll("_", "-");

//                 if (membersText.length > 20) {
//                   membersText = `${membersText.slice(0, 18)}...`;
//                 }

//                 return (
//                   <>
//                     <span
//                       css={`
//                         pointer-events: ${loadingQuotes && "none"};
//                         //  filter: ${loadingQuotes && "grayscale(100%)"};
//                         //  opacity:  ${loadingQuotes && "0.7"};
//                       `}
//                       className={
//                         selectedGroup === group
//                           ? `plans_for plans_for_members active position-relative`
//                           : "plans_for plans_for_members"
//                       }
//                       onClick={() => {
//                         history.push({
//                           pathname: `/quotes/${group}`,
//                           search: `enquiryId=${enquiryId}`,
//                         });
//                         dispatch(setSelectedGroup(group));
//                       }}
//                       css={`
//                         text-transform: capitalize;
//                         color: ${loadingQuotes && "gray"};
//                         font-weight: 900 !important;
//                       `}
//                     >
//                       {membersText}
//                       <div className="active_bar"></div>
//                     </span>
//                   </>
//                 );
//               })} */}

//             {/* <span className="plans_for plans_for_members">
//               Father,Mother <div className="active_bar"></div>
//             </span> */}
//           </div>

//           <div className="right_midifiers d-flex justify-content-between align-items-center ">
//             <button
//               className="btn share_Quote_btn"
//               onClick={() => setShowShareQuoteModal(true)}
//             >
//               <i class="fas fa-share"></i> Share Quote
//             </button>
//           </div>
//         </div>
//       </UpperModifierWrapper>

//       {/* modal */}
//       <ShareQuoteModal
//         show={showShareQuoteModal}
//         handleClose={() => setShowShareQuoteModal(false)}
//         imageSend={sendQuote}
//         emailStatus={successMsg}
//       />
//     </>
//   );
// };

// export default UpperModifier;

// const UpperModifierWrapper = styled.div`
//   background-color: ${props => props.SecondaryShade};
//   .left_modifiers {
//     font-size: 15px;
//     .plans_for {
//       margin-right: 15px;
//       cursor: pointer;
//     }
//     .plans_for_editable {
//       font-weight: bold;
//     }
//     .plans_for_members {
//       font-weight: 500;
//       height: 57px;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       min-width: 165px;
//       max-width: fit-content;
//       text-align: center;
//       &,
//       &:hover {
//         color: inherit;
//       }
//       white-space: nowrap;
//       text-overflow: ellipsis;
//     }
//     .plans_for_members.active {
//       background-color: green;
//       text-align: center;
//       background-color: white;
//       border-radius: 27px;
//       padding: 3px 10px;
//       height: 50px;
//       font-weight: 900;
//       & .active_bar {
//         width: 90%;
//         bottom: -19px;
//         left: 50%;
//         transform: translateX(-50%);
//         height: 5px;
//         background-color: ${props => props.PrimaryColor};
//         position: absolute;
//         border-top-left-radius: 5px;
//         border-top-right-radius: 5px;
//       }
//     }
//   }

//   .right_midifiers {
//     .btn {
//       background-color: white;
//       margin-left: 7px;
//       border-radius: 31px;
//       font-weight: 500;
//     }
//     .share_Quote_btn {
//       border: solid 2px ${props => props.PrimaryColor} !important;
//       color: ${props => props.PrimaryColor};

//       :focus {
//         border: solid 2px ${props => props.PrimaryColor} !important;
//       }
//       :active {
//         border: solid 2px ${props => props.PrimaryColor} !important;
//       }
//       :hover {
//         border: solid 2px ${props => props.PrimaryColor} !important;
//       }
//     }
//   }
// `;
