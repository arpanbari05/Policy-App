import React, { useEffect, useState } from "react";
import Toggle from "./Toggle";
const CustomMedicalTable = ({
  label = "",
  members = [],
  customOptions,
  name = "",
  onChange = () => {},
  value,
  values,
  customMembers,
  showMembersIf,
  disable_Toggle,
  restrictMaleMembers,
}) => {
  const [filteredOption, setFilteredMembers] = useState([]);
  const [additionalValues, setAdditionalValues] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [isValid, setIsValid] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [toggleValue, setToggleValue] = useState(value);

  useEffect(() => {
    let temp = additionalValues;
    Object.keys(additionalValues).forEach(item => {
      if (!filteredOption.includes(item)) {
        delete temp[item];
      }
      setAdditionalValues(temp);
    });
  }, [filteredOption]);

  useEffect(() => {
    if (filteredOption.length)
      onChange({
        ...value,
        isValid: isValid,
        ["is" + name]: toggleValue[`is${name}`],
        members: toggleValue.members,
      });
    else onChange("");
  }, [additionalValues, filteredOption, isValid]);

  useEffect(() => {
    if (toggleValue?.members) {
      let temp = Object.keys(toggleValue.members).filter(
        item => toggleValue.members[item] === true,
      );
      setFilteredMembers(temp);
    }
  }, [toggleValue]);

  return (
    <>
      <Toggle
        label={label}
        members={members}
        name={name}
        value={value}
        onChange={onChange}
        customMembers={customMembers}
        customOptions={customOptions}
        showMembersIf={showMembersIf}
        values={values}
        disable_Toggle={disable_Toggle}
        restrictMaleMembers={restrictMaleMembers}
        // additionalQuestionsToggle={additionalQuestionsToggle}
      />
    </>
  );
};

export default CustomMedicalTable;
