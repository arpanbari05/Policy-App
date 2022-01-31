import { useState } from "react";
import { GiCircle } from "react-icons/gi";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { useTheme } from "../customHooks";
import { getAgeList } from "../utils/helper";
import RoundDD from "./RoundDD";
import { Counter } from ".";
import "styled-components/macro";

function validateMembers(members = []) {
  let isValid = true;
  const validatedMembers = members.map(member => {
    const { age, isSelected } = member;
    if (isSelected && !age) {
      isValid = false;
      return { ...member, error: true };
    }
    return member;
  });

  return { validatedMembers, isValid };
}

export function useMembersForm(initialMembersList = []) {
  const [members, setMembers] = useState(initialMembersList);

  const isError = members.some(member => !!member.error);

  const validate = () => {
    const { isValid, validatedMembers } = validateMembers(members);

    if (!isValid) {
      setMembers(validatedMembers);
      return;
    }

    return true;
  };

  const handleMemberChange = changedMember => {
    setMembers(members => {
      const updatedMembers = members.map(member =>
        member.code === changedMember.code ? changedMember : member,
      );

      return updatedMembers;
    });
  };

  const handleCounterIncrement = (member, index) => {
    const updatedMembers = [...members];

    const totalMembers = getMultipleMembersCount(member.base.code);

    const newMember = {
      ...member,
      multiple: false,
      code: `${member.base.code}${totalMembers + 1}`,
      display_name: `${member.base.display_name}`,
      isSelected: false,
      age: false,
    };

    updatedMembers.splice(index + totalMembers, 0, newMember);

    setMembers(updatedMembers);
  };

  const handleCounterDecrement = member => {
    const totalMembers = getMultipleMembersCount(member.base.code);

    const memberCodeToDelete = `${member.base.code}${totalMembers}`;

    setMembers(members =>
      members.filter(member => member.code !== memberCodeToDelete),
    );
  };

  const getMultipleMembersCount = code => {
    return members.reduce(
      (count, member) => (member.code.startsWith(code) ? count + 1 : count),
      0,
    );
  };

  const getSelectedMembers = () =>
    members.filter(member => !!member.isSelected);

  return {
    getMultipleMembersCount,
    handleCounterDecrement,
    handleCounterIncrement,
    handleMemberChange,
    validate,
    getSelectedMembers,
    isError,
    membersList: members,
  };
}

export function MemberOptions({
  membersList,
  handleMemberChange,
  handleCounterIncrement,
  handleCounterDecrement,
  getMultipleMembersCount,
  ...props
}) {
  return (
    <div
      className="d-flex flex-wrap justify-content-between"
      css={`
        gap: 0.66em;
      `}
      {...props}
    >
      {membersList.map((member, index) => (
        <MemberOption
          member={member}
          onChange={handleMemberChange}
          key={member.code}
        >
          {member.multiple && member.isSelected && (
            <Counter
              onDecrement={() => handleCounterDecrement(member, index)}
              onIncrement={() => handleCounterIncrement(member, index)}
              count={getMultipleMembersCount(member.base.code)}
            />
          )}
        </MemberOption>
      ))}
    </div>
  );
}

function MemberOption({ member, onChange, children, ...props }) {
  const {
    colors: { primary_color },
  } = useTheme();

  const handleChange = evt => {
    const { checked } = evt.target;
    onChange &&
      onChange({
        ...member,
        isSelected: checked,
        age: checked ? member.age : false,
        error: checked ? member.error : false,
      });
  };

  const handleAgeChange = (_, __, ___, age) => {
    onChange &&
      onChange({
        ...member,
        age: { code: age.id, display_name: age.title },
        isSelected: true,
        error: false,
      });
  };

  const ageList = getAgeList(member).map(age => ({
    title: age.display_name,
    id: age.code,
  }));

  const selectedAge = member.age ? member.age.display_name : "Select Age";

  return (
    <div
      className="d-flex align-items-center justify-content-between rounded-2"
      css={`
        padding: 2px 10px;
        border: solid 1px #b0bed0;
        flex: 1 1 21em;
        gap: 1em;
      `}
      {...props}
    >
      <label
        htmlFor={member.code}
        className="d-flex align-items-center flex-grow-1 align-self-stretch"
        role="button"
        css={`
          line-height: 1;
          font-weight: 900;
        `}
      >
        <input
          type="checkbox"
          className="visually-hidden"
          checked={member.isSelected}
          onChange={handleChange}
          id={member.code}
          name={member.code}
        />
        <div
          css={`
            font-size: 1.67rem;
            line-height: 0;
            margin-right: 0.3em;
          `}
        >
          {member.isSelected ? (
            <IoCheckmarkCircleSharp
              css={`
                color: ${primary_color};
              `}
            />
          ) : (
            <GiCircle
              css={`
                color: #ccc;
              `}
            />
          )}
        </div>
        {member.display_name}
      </label>
      {children}
      <div>
        <RoundDD
          list={ageList}
          type="dropdown"
          selected={selectedAge}
          handleChange={handleAgeChange}
          redBorder={member.error}
        />
      </div>
    </div>
  );
}
