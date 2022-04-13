import { useEffect, useState } from "react";
import { GiCircle } from "react-icons/gi";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { useTheme } from "../customHooks";
import { getAgeList } from "../utils/helper";
import RoundDD from "./RoundDD";
import { Counter } from ".";
import "styled-components/macro";
import { useParams } from "react-router-dom";

const modifyMembersToCount = members => {
  let sonCount = 0;
  let daughterCount = 0;
  const updatedMembers = members.map(member => {
    if (member.display_name === "Son") {
      sonCount += 1;
      return {
        ...member,
        display_name_count: `Son ${sonCount}`,
      };
    } else if (member.display_name === "Daughter") {
      daughterCount += 1;
      return {
        ...member,
        display_name_count: `Daughter ${daughterCount}`,
      };
    } else return { ...member, display_name_count: member.display_name };
  });

  return updatedMembers.map(member => {
    if (member.display_name === "Son" && sonCount === 1) {
      return {
        ...member,
        display_name_count: `Son`,
      };
    } else if (member.display_name === "Daughter" && daughterCount === 1) {
      return {
        ...member,
        display_name_count: `Daughter`,
      };
    } else return { ...member };
  });
};

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

  const [error, setError] = useState(null);

  const isError = members.some(member => !!member.error);

  const { groupCode } = useParams();

  useEffect(() => {
    setMembers(initialMembersList);
  }, [groupCode]); //? CHANGES MEMBERS ON GROUP-CODE CHANGE.

  const validate = () => {
    const { isValid, validatedMembers } = validateMembers(members);

    if (!isValid) {
      setMembers(validatedMembers);
      setError("Select age for Insured Member");
      return;
    }

    const selectedMembers = getSelectedMembers();

    if (!selectedMembers.length) {
      setError("Select at least one Insured Member");
      return;
    }

    return true;
  };

  const handleMemberChange = changedMember => {
    setError(null);
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

  const updateMembersList = (membersList = []) => {
    setMembers(membersList);
  };

  const membersWithCount = modifyMembersToCount(members);

  return {
    getMultipleMembersCount,
    handleCounterDecrement,
    handleCounterIncrement,
    handleMemberChange,
    validate,
    getSelectedMembers,
    updateMembersList,
    isError,
    error,
    membersList: membersWithCount,
  };
}

export function MemberOptions({
  membersList,
  handleMemberChange,
  handleCounterIncrement,
  handleCounterDecrement,
  getMultipleMembersCount,
  selectedMembers,
  gender,
  setServerError,
  selectable = true,
  showCounter = true,
  ...props
}) {
  return (
    <div
      css={`
        gap: 0.66em;
        display: ${!showCounter ? "grid" : "flex"};
        grid-template-columns: ${!showCounter && "repeat(2, 1fr)"};
        flex-wrap: wrap;
        justify-content: space-between;
      `}
      {...props}
    >
      {membersList.map((member, index) => (
        <MemberOption
          member={member}
          onChange={handleMemberChange}
          key={member.code}
          selectable={selectable}
          selectedMembers={selectedMembers}
          gender={gender}
          setServerError={setServerError}
        >
          {member.multiple && member.isSelected && showCounter && (
            <Counter
              onDecrement={() => {
                handleCounterDecrement(member, index);
              }}
              onIncrement={() => handleCounterIncrement(member, index)}
              count={getMultipleMembersCount(member.base.code)}
              onChange={handleMemberChange}
              member={member}
            />
          )}
        </MemberOption>
      ))}
    </div>
  );
}

function MemberOption({
  member,
  onChange,
  children,
  selectedMembers,
  selectable = true,
  updateMembersList,
  setServerError,
  gender,
  ...props
}) {
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

  const validateSpouse = (selectedMembers, member) => {
    if (member.code === "spouse" && gender === "M") {
      return (
        selectedMembers[0]?.code === "self" &&
        selectedMembers[0]?.age?.code < 21
      );
    } else {
      return false;
    }
  };

  const validateSelf = (selectedMembers, member) => {
    if (member.code === "self" && gender === "M") {
      return (
        selectedMembers[0]?.code === "spouse" ||
        selectedMembers[1]?.code === "spouse"
      );
    } else {
      return false;
    }
  };

  return (
    <div
      className="rounded-2"
      title={
        validateSpouse(selectedMembers, member) &&
        "Please select age 21 years and above for Spouse as per legal marriage age in India."
      }
      onClick={() => {
        validateSpouse(selectedMembers, member) &&
          setServerError(
            "Please select age 21 years and above for Spouse as per legal marriage age in India.",
          );
      }}
      css={`
        display: flex;
        align-items: center;
        padding: 2px 10px;
        border: solid 1px #b0bed0;
        flex: 1 1 21em;
        gap: 0.7em;
        position: relative;

        @media (max-width: 720px) {
          padding: 0px 10px;
        }

        ${validateSpouse(selectedMembers, member) &&
        `&::after {
          position: absolute;
          left: -2px;
          top: -1px;
          content: "";
          height: 102%;
          width: 101%;
          z-index: 20;
          background-color: #eeeeee44;
          border-radius: 3px;

        }`}
      `}
      {...props}
    >
      <label
        className="d-flex align-items-center flex-grow-1 align-self-stretch"
        role="button"
        css={`
          font-size: 15px;
          line-height: 1;
          font-weight: 900;

          @media (max-width: 420px) {
            font-size: 13px;
          }
        `}
      >
        {selectable ? (
          <input
            type="checkbox"
            className="visually-hidden"
            checked={member.isSelected}
            onChange={handleChange}
            name={member.code}
          />
        ) : null}
        {selectable ? (
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
                  @media (max-width: 420px) {
                    height: 20px;
                  }
                `}
              />
            ) : (
              <GiCircle
                css={`
                  color: #ccc;

                  @media (max-width: 420px) {
                    height: 20px;
                  }
                `}
              />
            )}
          </div>
        ) : null}
        {member.display_name_count}
      </label>
      {children}
      <div>
        <RoundDD
          list={
            !validateSelf(selectedMembers, member)
              ? gender === "F" && member.code === "spouse"
                ? ageList.slice(3, ageList.length)
                : ageList
              : ageList.slice(3, ageList.length)
          }
          type="dropdown"
          selected={selectedAge}
          handleChange={handleAgeChange}
          redBorder={member.error}
          member={member}
          selectedMembers={selectedMembers}
        />
      </div>
    </div>
  );
}
