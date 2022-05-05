import React from "react";
import { Link } from "react-router-dom";
import { useTheme, useUrlEnquiry, useMembers } from "../../../../customHooks";
import { MemberText } from "../../../../components";
import * as mq from "../../../../utils/mediaQueries";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "styled-components/macro";
import { PrimaryFontBold } from "../../../../styles/typography";

function GroupLinks() {
  const { groups } = useMembers();
  const { colors } = useTheme();
  return (
    <GroupsWrapper color={colors.secondary_shade}>
      <div className="container d-flex align-items-center overflow-x-auto">
        <div className="d-flex gap-2 align-items-center">
          <div
            className="rounded"
            css={`
              background-color: ${colors.secondary_color};
              width: 0.37em;
              height: 2.1em;
            `}
          />
          <PrimaryFontBold>Plan for</PrimaryFontBold>
        </div>
        {groups?.map(grp => (
          <Group group={grp} key={grp?.id} />
        ))}
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

  & > div > *:not(:last-child) {
    margin-right: 20px;
  }

  @media (max-width: 768px) {
    padding: 0;

    & > div > *:not(:last-child) {
      margin-right: 10px;
    }
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
