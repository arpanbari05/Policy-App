import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { setAsyncOptions } from "../../../components/FormBuilder/FormBuilder.slice";
import down from "./../../../assets/images/down-arrow.svg";
import up from "./../../../assets/images/up-arrow.svg";
import useAppropriateOptions from "./useAppropriateOptions";

const DropDown = ({
  name,
  values,
  label,
  onChange,
  height = false,
  borderR = false,
  reference,
  options = { value: "key" },
  value,
  selectedValues,
  allValues = {},
  error,
  asyncOptions,
  dropPlaceholder,
  readOnly,
  checkValidation,
  excludeOptions,
  deleteValue = () => {},
  directUpdateValue = () => {},
}) => {

  const { selectOption } = useAppropriateOptions({
    values,
    allValues,
    asyncOptions,
    options,
    label,
    name,
    directUpdateValue,
    value,
  });


  useEffect(() => {
    console.log("sfsvbjksf",value,selectOption,values)
    if(value && name !== "gender" && name !== "title" && name !== "marital_status"){
      if(selectOption[value] && values && values[name] !== selectOption[value]){
        directUpdateValue(name,selectOption[value]);
      }else if(!selectOption[value]) deleteValue()

    }
  },[value])

  const [dataValue, setDataValue] = useState();

  const excludeOptionsPage = excludeOptions?.when?.split(".")[0];

  const excludeOptionsVariable = excludeOptions?.when?.split(".")[1];

  label = label || "- Select -";

  label = checkValidation?.required ? `${label}*` : label;

  return (
    <SelectContainer
      height={height}
    >
      <Select
      value={value}
        onChange={e => {
          onChange(e, selectOption[e.target.value]);
        }}
       
        disabled={
          (Object.keys(selectOption).length === 1 && !asyncOptions) || readOnly
        }
        error={error}
        height={height}
        borderR={borderR}
      >
        {((Object.keys(selectOption).length !== 1 &&
          checkValidation?.required &&
          !asyncOptions) ||
          asyncOptions ||
          !checkValidation?.required) && (
          <option
            selected="true"
            value={label === "Pincode*" ? dropPlaceholder || label || "" : ""}
          >
            {dropPlaceholder || label || "- Select -"}
          </option>
        )}
        {selectedValues?.title &&
        selectedValues.title === "mrs" &&
        label === "Marital Status"
          ? Object.keys(selectOption)
              .filter(item => item !== "single")
              .map(item => (
                <>
                  <option key={item + selectOption[item]} value={item}>
                    {selectOption[item]}
                  </option>
                </>
              ))
          : Object.keys(selectOption).map(item => (
              <option key={item + selectOption[item]} value={item}>
                {selectOption[item]}
              </option>
            ))}
      </Select>
      <Label height={height}>{label}</Label>
      {error && <p className="formbuilder__error">{error}</p>}
    </SelectContainer>
  );
};

export default DropDown;
const SelectContainer = styled.div`
  
  margin-top: ${props =>
    !props.height ? "0.3rem !important" : "9px !important"};
  position: relative;

  margin-bottom: ${props =>
    !props.height ? "12px !important" : "9px !important"};

  @media (max-width: 767px) {
    margin-bottom: 12px !important;
  }
`;

const Select = styled.select`
  appearance: none;
  background: ${props => (props.disabled ? "" : `url(${down}) no-repeat 98%`)};

    
  list-style: none;
  &:disabled{
    cursor: not-allowed !important;
    pointer-events: all !important;
  }
  list-style-type: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  margin: 0;
  font-family: inherit;
  line-height: inherit;
  overflow: visible;
  outline: none;
  box-shadow: none;
  transition: border 0.3s ease-in-out;
  touch-action: manipulation;
  width: 100%;

  border: ${props => !props.height && "1px solid #ced4da"};

  border: ${props => props.error && "solid 1px #c7222a"};
  // border-radius: 8px;
  // background-color: ${props => props.error && "#fff6f7"};

  height: ${props => (!props.height ? "55px" : "35px")};
  border-right: ${props => props.borderR && "1px solid #ced4da"};

  font-size: 14px;
  color: #939393;
  position: relative;
  padding: 0 25px;
  &:focus {
    border: ${props => props.error && "solid 1px #c7222a"};
    color: black;
    background: url(${up}) no-repeat 98%;
  }

  @media (max-width: 767px) {
    font-size: 14px;
    height: ${props => (!props.height ? "52px" : "24px")};
    padding: 0 16px;
    border-radius: 6px;
  }
`;
const Label = styled.label`
  text-align: left;
  list-style: none;
  list-style-type: none;
  user-select: none;

  box-sizing: border-box;
  touch-action: manipulation;
  display: inline-block;
  font-size: 12px !important;
  color: #000;
  line-height: 14px;
  position: absolute;
  left: 20px;
  top: ${props => (!props.height ? "-8px" : "-18px")};
  margin: 0;
  background: #fff;
  transition: all 0.3s ease-in-out;
  font-weight: 900;
  padding: 0 5px;
  @media (max-width: 1200px) {
    font-size: 11px !important;
  }
  @media (max-width: 1100px) {
    font-size: 11px !important;
  }
  @media (max-width: 1025px) {
    font-size: 13px !important;
  }
  @media (max-width: 767px) {
    left: 10px;
    font-size: 14px;
  }
`;
