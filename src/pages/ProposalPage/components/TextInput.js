import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setShowPlanNotAvail } from "../ProposalSections/ProposalSections.slice";
const TextInput = ({
  name,
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
  allValues,
  value,
  onKeyPress,
  maxLength,
  textTransform,
  onInput,
  readOnly,
  innerMember,
  checkAge,
  defaultValue,
  onFocus,
}) => {
  const dispatch = useDispatch();
  const age =
    checkAge &&
    parseInt(new Date().getFullYear()) -
      parseInt(
        allValues?.["Insured Details"]?.[innerMember][
          checkAge.split("from")[1]
        ].split("-")[2],
      );
  const [isFocused, setIsFocused] = useState(false);
  const [fallbackValue, setFallbackValue] = useState("");
  const [isChanged, setChanged] = useState(false);
  const regForOnlyDigit = new RegExp("^[0-9]*$");
  const [isHovering, setIsHovering] = useState(false);
  const fullName = value || "";
  const forbiddedSymbols = "`~!@#$%^&*()_-+={[}]|:.;',<>?/\"\\".split("");
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
    console.log(checkValue);
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
  // console.log(isHovering, "isHovering");
  return (
    <InputContainer>
      <Input
        type={type || "text"}
        placeholder={placeholder}
        isHovering={isHovering}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        showStarRed={checkValidation?.required}
        required={required || undefined}
        onChange={e => {
          setChanged(true);
          if (checkValidation && checkValidation["matches"] === "address") {
            let acceptedSpecialChar = ['"', ".", "-", ",", "#", "&", "/"];
            if (
              checkAllChar(
                e.target.value,
                forbiddedSymbols.filter(
                  el => !acceptedSpecialChar.includes(el),
                ),
              )
            ) {
              onChange(e);
              setFallbackValue(e.target.value);
            }
          } else if (
            checkValidation["matches"] === "name" ||
            name === "nominee_name"
          ) {
            let acceptedSpecialChar = ["."];
            if (
              checkPreviousChar(e.target.value, " ") &&
              checkPreviousChar(e.target.value, ".") &&
              e.target.value
                .split("")
                .reduce(
                  (acc, char) => (acc = char === "." ? acc + 1 : acc),
                  0,
                ) <= 1 &&
              (e.target.value === "" ||
                !regForOnlyDigit.test(e.target.value)) &&
              e.target.value.length <= 60 &&
              checkAllChar(
                e.target.value,
                forbiddedSymbols
                  .filter(el => !acceptedSpecialChar.includes(el))
                  .concat("0123456789".split("")),
              )
            ) {
              onChange(e);
              setFallbackValue(e.target.value);
            }
          } else if (
            checkValidation?.matches === "pincode" ||
            checkValidation?.matches === "aadhar" ||
            checkValidation?.matches === "mobile"
          ) {
            if (
              checkAllChar(
                e.target.value,
                forbiddedSymbols.concat(
                  "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM".split(
                    "",
                  ),
                ),
              )
            ) {
              if (checkValidation?.matches === "mobile") {
                if (![0, 1, 2, 3, 4, 5].includes(Number(e.target.value[0]))) {
                  onChange(e);
                  setFallbackValue(e.target.value);
                } else {
                  return;
                }
              } else {
                onChange(e);
                setFallbackValue(e.target.value);
              }
            }
          } else if (checkAllChar(e.target.value, forbiddedSymbols)) {
            if (checkValidation?.matches === "onlyDigits") {
              if (regForOnlyDigit.test(e.target.value)) {
                onChange(e);
                setFallbackValue(e.target.value);
              }
            } else if (checkValidation["matches"] === "annIncome") {
              if (
                regForOnlyDigit.test(e.target.value) &&
                parseInt(e.target.value)
              ) {
                onChange(e);
                setFallbackValue(e.target.value);
              }
            } else if (checkAge) {
              if (parseInt(e.target.value) <= age || e.target.value === "") {
                onChange(e);
                setFallbackValue(e.target.value);
              }
            } else if (
              checkValidation?.["matches"] &&
              checkValidation?.["matches"].includes("mobile")
            ) {
              if (
                ![0, 1, 2, 3, 4, 5].includes(Number(e.target.value[0])) &&
                e.target.value.length <= 10
              ) {
                onChange(e);
                setFallbackValue(e.target.value);
              }
            } else {
              if (
                notAllowed &&
                // mediUnderwritting &&
                notAllowed.includes("null") &&
                ((notAllowed.split("/")[0] !== "null" &&
                  e.target.value < parseInt(notAllowed.split("/")[0])) ||
                  (notAllowed.split("/")[1] !== "null" &&
                    e.target.value > parseInt(notAllowed.split("/")[1])))
              ) {
                e.target.value = "";
                dispatch(setShowPlanNotAvail(true));
              } else if (textTransform === "uppercase") {
                e.target.value = e.target.value.toLocaleUpperCase();
              }
              if (maxLength && e.target.value.length > maxLength) return;
              onChange(e);
              setFallbackValue(e.target.value);
            }
          } else if (
            checkValidation &&
            (checkValidation["matches"] === "alphanum" ||
              checkValidation["matches"] === "pan" ||
              checkValidation["matches"] === "onlyDigits" ||
              checkValidation["matches"] === "annIncome" ||
              (checkValidation["matches"] &&
                checkValidation["matches"].includes("mobile")))
          ) {
            if (
              checkPreviousChar(e.target.value, " ") &&
              checkPreviousChar(e.target.value, ".") &&
              checkAllChar(e.target.value, forbiddedSymbols)
            ) {
              if (
                checkValidation?.["matches"] &&
                checkValidation?.["matches"].includes("mobile")
              ) {
                if (![0, 1, 2, 3, 4, 5].includes(Number(e.target.value[0]))) {
                  onChange(e);
                  setFallbackValue(e.target.value);
                }
              } else {
                onChange(e);
                setFallbackValue(e.target.value);
              }
            }
          } else if (checkValidation?.["matches"] === "email") {
            if (e.target.value.length <= 64) {
              onChange(e);
              setFallbackValue(e.target.value);
            }
          } else {
            console.log("sgvjsvl", notAllowed);
            if (
              notAllowed &&
              // mediUnderwritting &&
              ((notAllowed.split("/")[0] !== "null" &&
                parseInt(e.target.value) <=
                  parseInt(notAllowed.split("/")[0])) ||
                (notAllowed.split("/")[1] !== "null" &&
                  parseInt(e.target.value) >=
                    parseInt(notAllowed.split("/")[1])))
            ) {
              e.target.value = "";
              dispatch(setShowPlanNotAvail(true));
            } else if (textTransform === "uppercase") {
              e.target.value = e.target.value.toLocaleUpperCase();
            }
            onChange(e);
            setFallbackValue(e.target.value);
          }
        }}
        onFocus={() => {
          onFocus();
          setIsFocused(true);
        }}
        onBlur={e => {
          onBlur();
          if (
            notAllowed &&
            !notAllowed.includes("null") &&
            ((notAllowed.split("/")[0] !== "null" &&
              e.target.value < parseInt(notAllowed.split("/")[0])) ||
              (notAllowed.split("/")[1] !== "null" &&
                e.target.value > parseInt(notAllowed.split("/")[1])))
          ) {
            e.target.value = "";
            dispatch(setShowPlanNotAvail(true));
            onChange(e);
            setFallbackValue(e.target.value);
          }
          setIsFocused(false);
        }}
        onInput={onInput}
        onKeyDown={onKeyDown}
        // value={isChanged ? fallbackValue : value ? value : ""}
        value={value ? value : ""}
        onKeyPress={onKeyPress}
        maxLength={name === "name" ? 60 : maxLength}
        textTransform={textTransform}
        readOnly={readOnly}
        error={!isFocused ? error : null}
        defaultValue={defaultValue}
      />

      <Label>
        {checkValidation?.required && label ? `${label}*` : label || ""}
      </Label>

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
  -webkit-user-select: text;
  list-style-type: none;
  -webkit-user-select: initial;
  -khtml-user-select: initial;
  -moz-user-select: initial;
  -ms-user-select: initial;
  user-select: initial;
  &:before,
  &:after {
    -webkit-user-select: initial;
    -khtml-user-select: initial;
    -moz-user-select: initial;
    -ms-user-select: initial;
    user-select: initial;
  }
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  margin: 0;
  /* ::-webkit-input-placeholder:after {
   content: '*';
   color: red;
   
   font-size: 1.5rem;
} */
  /* ::-webkit-input-placeholder {
  background:${props =>
    props.showStarRed
      ? "-webkit-linear-gradient(right, #AAA 0%, #AAA 80%,red 80%, red 100%)"
      : "#939393"} ;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
} */
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
  // background: ${props => (props.error ? "#fff6f7" : "transparent")};
  height: 55px;
  font-size: 14px;
  cursor: ${props =>
    props.isHovering && props.readOnly ? "not-allowed" : "pointer"};
  color: #939393;
  position: relative;
  padding: 0 25px;
  &:focus {
    border-color: ${props => (props.error ? "#c7222a" : "solid 1px  #393939")};
    color: black;
  }
  &:before {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  &:after {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  @media (max-width: 767px) {
    height: 52px;
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
  font-size: 12px !important;
  color: #000;
  line-height: 14px;
  position: absolute;
  left: 20px;
  top: 0;
  margin: 0;
  max-width: 95%;
  background: #fff;
  transition: all 0.3s ease-in-out;
  font-weight: 900;
  padding: 0 5px;
  transform: translateY(-60%);

  @media (max-width: 1200px) {
    font-size: 13px !important;
  }
  @media (max-width: 1100px) {
    font-size: 12px !important;
  }
  @media (max-width: 1050px) {
    font-size: 12px !important;
  }
  @media (max-width: 767px) {
    left: 10px;
    font-size: 14px;
    // top: -15px;
  }
`;
