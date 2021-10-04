import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setShowPlanNotAvail } from "../ProposalSections/ProposalSections.slice";
const TextInput = ({
  label,
  placeholder,
  type,
  required,
  onChange,
  checkValidation,
  error,
  onBlur,
  onKeyDown,
  reference,
  notAllowed,
  value,
  onKeyPress,
  maxLength,
  textTransform,
  onInput,
  readOnly,
}) => {
  const dispatch = useDispatch();

  const fullName = value || "";
  const forbiddedSymbols = [
    "#",
    "!",
    "%",
    "$",
    "&",
    "-",
    "+",
    "=",
    "^",
    "*",
    "_",
    "(",
    ")",
    "{",
    "}",
    ",",
    "?",
    '"',
    "'",
    "@",
  ];
  const checkPreviousChar = (value, checkValue) => {
    let check = true;

    if (value[0] === checkValue) {
      check = false;
    }
    if (
      check &&
      value[value.length - 1] === checkValue &&
      fullName[fullName.length - 1] === checkValue
    ) {
      check = false;
    }
    return check;
  };
  const { mediUnderwritting } = useSelector(
    state => state.proposalPage.proposalData,
  );
  const checkAllChar = (value, checkValue) => {
    let check = true;
    for (let i in value) {
      if (checkValue.includes(value[i])) {
        check = false;
      }
    }
    return check;
  };

  const checkDoubleChar = e => {
    if (e.keyCode === 190 && fullName[fullName.length - 1] === " ") {
      e.preventDefault();
    }
    if (e.keyCode === 32 && fullName.length < 1) {
      e.preventDefault();
    }
  };

  // const [innerValue, setInnerValue] = useState(value);
  // useEffect(() => {
  //   setInnerValue(value);
  // }, [value]);
  return (
    <InputContainer>
      <Input
        type={type || "text"}
        placeholder={placeholder || ""}
        required={required || undefined}
        onChange={e => {
          if (checkValidation?.["matches"] === "name") {
            checkPreviousChar(e.target.value, " ") &&
              checkPreviousChar(e.target.value, ".") &&
              checkAllChar(e.target.value, forbiddedSymbols) &&
              onChange(e);
          } else {
            if (
              notAllowed &&
              mediUnderwritting &&
              ((notAllowed.split("/")[0] !== "null" &&
                e.target.value <= parseInt(notAllowed.split("/")[0])) ||
                (notAllowed.split("/")[1] !== "null" &&
                  e.target.value >= parseInt(notAllowed.split("/")[1])))
            ) {
              e.target.value = "";
              dispatch(setShowPlanNotAvail(true));
            } else if (textTransform === "uppercase") {
              e.target.value = e.target.value.toLocaleUpperCase();
            }
            onChange(e);
          }
        }}
        onBlur={onBlur}
        onInput={onInput}
        onKeyDown={onKeyDown}
        value={value}
        onKeyPress={onKeyPress}
        maxLength={maxLength}
        textTransform={textTransform}
        readOnly={readOnly}
        error={error}
      />
      <Label>{label}</Label>
      <p className="formbuilder__error">{error}</p>
    </InputContainer>
  );
};

export default TextInput;

const InputContainer = styled.div`
  margin-top: 0.3rem !important;
  position: relative;

  margin-bottom: 12px !important;
  @media (max-width: 768px) {
    margin-bottom: 12px !important;
  }
`;
const Input = styled.input`
  list-style: none;
  list-style-type: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  margin: 0;
  text-transform: ${props => props.textTransform};
  font-family: inherit;
  line-height: inherit;
  overflow: visible;
  outline: none;
  box-shadow: none;
  transition: all 0.3s ease-in-out;
  touch-action: manipulation;
  width: 100%;
  border: ${props => (props.error ? "solid 1px #c7222a" : "solid 1px #ced4da")};
  // border-radius: 8px;
  background: ${props => (props.error ? "#fff6f7" : "transparent")};
  height: 55px;
  font-size: 14px;
  color: #939393;
  position: relative;
  padding: 0 25px;
  &:focus {
    border-color: ${props => (props.error ? "#c7222a" : "solid 1px  #393939")};
    color: black;
  }
  @media (max-width: 767px) {
    height: 42px;
    padding: 0 16px;
    // border-radius: 6px;
    font-size: 14px;
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
  font-size: 16px;
  color: #000;
  line-height: 14px;
  position: absolute;
  left: 20px;
  top: -8px;
  margin: 0;
  background: #fff;
  transition: all 0.3s ease-in-out;
  font-weight: 900;
  padding: 0 5px;
  
  @media (max-width: 1200px){
    font-size:15px !important;
  }
  @media (max-width: 1100px){
    font-size:14px !important;
  }
  @media (max-width: 767px) {
    left: 10px;
    font-size: 14px;
  }
`;
