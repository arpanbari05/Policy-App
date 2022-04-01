import React, { useEffect, useMemo, useState } from "react";
import Toggle from "./Toggle";
import { components } from "./../components/componentSchema";
import {
  checkAllow,
  performValidations,
} from "../../../components/FormBuilder/formUtils";
import styled from "styled-components";
import FormBuilder from "../../../components/FormBuilder/FormBuilder";
const CustomMedicalTable = ({
  label = "",
  members = [],
  customOptions,
  name = "",
  additionalQuestions = [
    { type: "text", question: "hello", name: "y" },
    { type: "select", question: "hello", name: "x" },
  ],
  submitTrigger,
  onChange = () => {},
  setCustomValid,
  value,
  values,
  customMembers,
  showMembersIf,
  disable_Toggle,
  restrictMaleMembers,
}) => {
  {console.log("cvodhac",label,showMembersIf)}

  const defaultToggleValue = value => {
    let x = {};
    let members = {};

    if (value && value.members.length) {
      value.members.length &&
        value.members.forEach(item => {
          members[item] = true;
        });
      Object.assign(x, { members: members });
      if (value.members.length) x[`is${name}`] = "Y";
    }

    return x;
  };
  const [filteredOption, setFilteredMembers] = useState([]);
  const [additionalValues, setAdditionalValues] = useState({});
  const [isValid, setIsValid] = useState(true);
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
        values={ values}
        disable_Toggle={disable_Toggle}
        restrictMaleMembers={restrictMaleMembers}
    
      />
    </>
  );
};

export default CustomMedicalTable;
const Wrapper = styled.div`
  box-shadow: #e2e3ed 0px 6px 12px !important;
  margin-left: 12px;
  padding: 11px 6px 0px;
  border-radius: 6px;
  margin-top: -41px;
  width: 105%;
  margin-bottom: 59px;
`;
const Title = styled.p`
  margin-bottom: 26px;
  font-size: 17px !important;
  color: #3b3838;
  font-weight: 900 !important;
  margin-top: -3px;
  background-image: linear-gradient(90deg, #eff7ff 0%, rgb(255 255 255) 100%);
  padding: 10px 18px;
  border-radius: 6px;

  height: 40px;
  padding: 25px;
  text-transform: capitalize;
  text-align: justify;
  line-height: 18px;
  color: #000000;
`;
const HR = styled.hr`
  border: 1px dashed #ddd;
  width: 111%;
  margin-left: -59px;
  margin-top: 0px;
`;
