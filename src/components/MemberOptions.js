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
      const updatedMembers = members.map(member => {
        const new_member = initialMembersList().find(
          mem => mem.code === member.code,
        );

        if (member.code === changedMember.code)
          return {
            ...changedMember,
            new_member: !new_member.isSelected,
          };
        else
          return {
            ...member,
            new_member: !new_member.isSelected,
          };
      });

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
  isPopup,
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
        display: ${!showCounter ? "grid" : "flex"};
        grid-template-columns: ${!showCounter && "repeat(2, 1fr)"};
        flex-wrap: wrap;
        justify-content: space-between;

        & > div {
          margin-bottom: 0.6rem;
        }

        @media (min-width: 720px) {
          & > div:nth-child(odd) {
            margin-right: ${!isPopup ? "0.8rem" : "0"};
          }
        }
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

  // console.log("memberData", member);

  // dropDownAgeList validation
  const validateAgeList = (
    validateSelfFunc,
    validateSpouseFunc,
    currentMember,
    currentSelectedMember,
    userGender,
    currentUserAgeList,
  ) => {
    if (!validateSelfFunc(currentSelectedMember, currentMember)) {
      if (
        userGender === "F" &&
        (currentMember.code === "spouse" ||
          currentMember.code === "mother_in_law" ||
          currentMember.code === "father_in_law")
      ) {
        return currentUserAgeList.slice(3, currentUserAgeList.length);
      } else {
        // parent validation
        if (validateSpouseFunc(currentSelectedMember, currentMember)) {
          return currentUserAgeList.slice(3, currentUserAgeList.length);
        } else {
          return currentUserAgeList;
        }
      }
    } else {
      return currentUserAgeList.slice(3, currentUserAgeList.length);
    }
  };

  /* 
    This function used to validate father mother and grand-parents if:
    self == Male && self age is 18 or 21
  */
  const validateSpouseForParents = (selectedMembers, member) => {
    if (
      gender === "M" &&
      (member.code === "mother" ||
        member.code === "father" ||
        member.code === "grand_father" ||
        member.code === "grand_mother")
    ) {
      return (
        selectedMembers[0]?.code === "self" &&
        selectedMembers[0]?.age?.code >= 21
      );
    } else {
      return false;
    }
  };

  const validateSpouse = (selectedMembers, member) => {
    if (
      gender === "M" &&
      (member.code === "spouse" ||
        member.code === "mother_in_law" ||
        member.code === "father_in_law" ||
        member.code?.includes("son") ||
        member.code?.includes("daughter"))
    ) {
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

  useEffect(() => {
    if (validateSpouse(selectedMembers, member)) {
      if (
        member.code.includes("son") ||
        member.code.includes("daughter") ||
        member.code === "mother_in_law" ||
        member.code === "father_in_law"
      ) {
        if (member.isSelected) {
          const event = {
            target: { checked: false },
          };
          handleChange(event);
        }
      }
    }
  }, [selectedMembers]);

  return (
    <div
      className="rounded-2"
      title={
        validateSpouse(selectedMembers, member) &&
        "Self age has to be 21 years and above as per legal marriage age in India to buy a policy with Spouse."
      }
      onClick={() => {
        validateSpouse(selectedMembers, member) &&
          setServerError(
            "Self age has to be 21 years and above as per legal marriage age in India to buy a policy with Spouse.",
          );
      }}
      css={`
        display: flex;
        align-items: center;
        padding: 2px 10px;
        border: solid 1px #b0bed0;
        flex: 1 1 21em;
        gap: 0.7rem;
        position: relative;

        @media (max-width: 720px) {
          padding: 0px 10px;
          gap: 0;
          & > div:last-child {
            margin-left: 12px;
          }
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

          @media (max-width: 480px) {
            font-size: 11px;
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
          list={validateAgeList(
            validateSelf,
            validateSpouseForParents,
            member,
            selectedMembers,
            gender,
            ageList,
          )}
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
