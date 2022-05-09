import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme, useUrlEnquiry, useMembers } from "../../../../customHooks";
import { MemberText } from "../../../../components";
import * as mq from "../../../../utils/mediaQueries";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import "styled-components/macro";
import { PrimaryFontBold } from "../../../../styles/typography";
import ShareQuoteModal from "../../../../components/ShareQuoteModal";

function GroupLinks() {
  const { groups } = useMembers();
  const { colors } = useTheme();

  const [partioned, setPartioned] = useState(false);

  const { enquiryId } = useUrlEnquiry();

  const allMembersGroup = groups.find(group => group.type === "all");

  const { groupCode } = useParams();

  const history = useHistory();

  let groupsToShow = [...groups];

  useEffect(() => {
    setPartioned(!(+groupCode === allMembersGroup?.id));
  }, [groupCode]);

  if (!(+groupCode === allMembersGroup?.id)) {
    groupsToShow = groups.filter(group => group?.id !== allMembersGroup?.id);
  } else {
    groupsToShow = [allMembersGroup];
  }

  const onCombinedPlanHandler = () => {
    history.replace({
      pathname: `/shortlisted/${allMembersGroup?.id}`,
      search: `enquiryId=${enquiryId}`,
    });
    setPartioned(false);
  };

  const onPartitionedPlanHandler = () => {
    history.replace({
      pathname: `/shortlisted/${groups[0].id}`,
      search: `enquiryId=${enquiryId}`,
    });
    setPartioned(true);
  };

  return (
    <GroupsWrapper color={colors.secondary_shade}>
      <div
        className="container d-flex align-items-center"
        css={`
          gap: 20px;

          @media (max-width: 768px) {
            margin: 0 auto;
            gap: 10px;
          }
        `}
      >
        <div className="d-flex gap-2 align-items-center">
          <div
            className="rounded only-desktop"
            css={`
              background-color: ${colors.secondary_color};
              width: 0.37em;
              height: 2.1em;
            `}
          />
          <PrimaryFontBold className="only-desktop">Plan for</PrimaryFontBold>
        </div>
        {groupsToShow?.map(grp => (
          <Group group={grp} key={grp?.id} />
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
        <div
          className="only-desktop"
          css={`
            margin-left: auto;
            margin-right: 0 !important;
          `}
        >
          <ShareQuoteModal label={"Share plans"} stage="SHORTLISTED_QUOTES" />
        </div>
        <ShareQuoteModal stage="SHORTLISTED_QUOTES" mobile float />
      </div>
    </GroupsWrapper>
  );
}

function Group({ group, ...props }) {
  const { colors } = useTheme();

  const { id } = group;

  const { enquiryId } = useUrlEnquiry();

  const { getMembersText } = useMembers();

  const membersText = getMembersText(group);

  let { groupCode } = useParams();

  groupCode = parseInt(groupCode);

  const isCurrentGroup = id === groupCode;

  return (
    <div
      className="d-flex align-items-center position-relative h-100"
      css={`
        @media (max-width: 768px) {
          margin: 0 auto;
        }
      `}
      {...props}
    >
      <Link
        to={{
          pathname: `/shortlisted/${group?.id}`,
          search: `enquiryId=${enquiryId}`,
        }}
        replace
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
          font-size: 12px;
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
        <ActiveBar color={colors.primary_color} className="position-absolute" />
      )}
    </div>
  );
}
export default GroupLinks;

const GroupsWrapper = styled.div`
  background: ${props => props.color};
  padding: 10px 0;
  display: flex;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 0 10px;
    background: none;
    border-radius: 0 0 1em 1em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    overflow-x: auto;
  }
`;

const ActiveBar = styled.div`
  height: 3px;
  width: 90%;
  left: 50%;
  top: calc(100% + 10px);
  transform: translate(-50%, -100%);
  background-color: ${props => props.color};
  border-radius: 0.5em 0.5em 0 0;

  @media (max-width: 768px) {
    top: 100%;
  }
`;

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
