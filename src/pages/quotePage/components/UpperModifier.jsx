import { useMembers, useTheme, useUrlEnquiry } from "../../../customHooks";
import { Container } from "react-bootstrap";
import EditMemberFilter from "./filters/EditMemberFilter";
import { Link, useParams, useHistory } from "react-router-dom";
import { MemberText } from "../../../components";
import "styled-components/macro";
import * as mq from "../../../utils/mediaQueries";
import ShareQuoteModal from "../../../components/ShareQuoteModal";
import useComparePage from "../../../pages/ComparePage/useComparePage";
import useQuotesPage from "../useQuotes";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useFilters from "../components/filters/useFilters";

function UpperModifier() {
  const { colors } = useTheme();
  const { emailStatus } = useComparePage();
  const { imageSendQuote: sendQuote } = useQuotesPage();
  const { getSelectedFilter } = useFilters();

  return (
    <div
      css={`
        background-color: ${colors.secondary_shade};
      `}
      className="position-relative"
    >
      <Container fluid="lg">
        <div
          css={`
            height: 3.67em;
          `}
          className="d-flex align-items-center"
        >
          <EditMemberFilter />
          <GroupLinks />
          <div
            css={`
              margin-left: auto;
            `}
          >
            <ShareQuoteModal
              shareQuotes={true}
              imageSend={sendQuote}
              emailStatus={emailStatus}
              stage="QUOTE"
              label="Share Quote"
              sum_insured={getSelectedFilter("cover")?.code}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default UpperModifier;

export function GroupLinks({ ...props }) {
  const { groups } = useMembers();

  const { colors } = useTheme();

  const { groupCode } = useParams();

  const allMembersGroup = groups.find(group => group.type === "all");

  const [partioned, setPartioned] = useState(
    !(+groupCode === allMembersGroup?.id),
  );

  const history = useHistory();

  const { enquiryId } = useUrlEnquiry();

  let groupsToShow = [...groups];

  useEffect(() => {
    setPartioned(!(+groupCode === allMembersGroup?.id));
  }, [groupCode]);

  if (partioned) {
    groupsToShow = groups.filter(group => group.id !== allMembersGroup?.id);
  } else {
    groupsToShow = [allMembersGroup];
  }

  const currentGroup =
    localStorage.getItem("groups") &&
    JSON.parse(localStorage.getItem("groups")).find(group => group.id);

  const onCombinedPlanHandler = () => {
    history.push({
      pathname: `/quotes/${allMembersGroup?.id}`,
      search: `enquiryId=${enquiryId}&pincode=${currentGroup?.pincode}&city=${currentGroup?.city}`,
    });
    setPartioned(false);
  };

  const onPartitionedPlanHandler = () => {
    history.push({
      pathname: `/quotes/${groups[0].id}`,
      search: `enquiryId=${enquiryId}&pincode=${currentGroup?.pincode}&city=${currentGroup?.city}`,
    });
    setPartioned(true);
  };

  return (
    <div
      className="d-flex align-items-center mx-3 h-100 text-center"
      css={`
        gap: 1em;
        font-size: 9px !important;
        ${mq.mobile} {
          overflow: scroll;
          &::-webkit-scrollbar {
            display: none;
          }
        }
      `}
      {...props}
    >
      {groupsToShow.map(group => (
        <GroupLink group={group} key={group.id} />
      ))}
      {allMembersGroup &&
        (partioned ? (
          <ToggleGroupTypeBtn
            color={colors.primary_color}
            onClick={onCombinedPlanHandler}
          >
            View Plans for All Members
          </ToggleGroupTypeBtn>
        ) : (
          <ToggleGroupTypeBtn
            color={colors.primary_color}
            onClick={onPartitionedPlanHandler}
          >
            View Separate Plans
          </ToggleGroupTypeBtn>
        ))}
    </div>
  );
}

export function GroupLink({ group, ...props }) {
  const { colors } = useTheme();

  const { id } = group;

  const { enquiryId } = useUrlEnquiry();

  let { groupCode } = useParams();

  groupCode = parseInt(groupCode);

  const isCurrentGroup = id === groupCode;

  const { getMembersText } = useMembers();

  const membersText = getMembersText(group);

  const currentGroup =
    localStorage.getItem("groups") &&
    JSON.parse(localStorage.getItem("groups")).find(grp => grp.id === group.id);
  const locationQuery =
    currentGroup?.pincode && currentGroup?.city
      ? `&pincode=${currentGroup.pincode}&city=${currentGroup?.city}`
      : "";

  return (
    <div
      className="d-flex align-items-center position-relative h-100 m-auto"
      {...props}
    >
      <Link
        to={{
          pathname: `/quotes/${group.id}`,
          search: `enquiryId=${enquiryId}${locationQuery}`,
        }}
        title={membersText}
        className="text-center"
        css={`
          display: inline-block;
          background-color: #fff;
          border-radius: 2em;
          min-width: 8em;
          font-weight: 900;
          max-width: 12em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.79rem;
          line-height: 1;
          padding: 1em;
          ${mq.mobile} {
            background: none;
            border-radius: 0;
            min-width: max-content;
          }
        `}
      >
        <MemberText>{membersText}</MemberText>
      </Link>
      {isCurrentGroup && (
        <div
          className="position-absolute"
          css={`
            height: 3px;
            width: 90%;
            left: 50%;
            top: 100%;
            transform: translate(-50%, -100%);
            background-color: ${colors.primary_color};
            border-radius: 0.5em 0.5em 0 0;
          `}
        />
      )}
    </div>
  );
}

const ToggleGroupTypeBtn = styled.button`
  display: inline-block;
  border-radius: 2em;
  font-weight: 900;
  font-size: 0.79rem;
  line-height: 1;
  color: ${props => props.color};
  pointer: cursor;
  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 2px;
  }
  ${mq.mobile} {
    background: none;
    border-radius: 0;
    min-width: max-content;
  }
`;
