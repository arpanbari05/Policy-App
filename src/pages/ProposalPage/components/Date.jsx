import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import calendar from "./../../../assets/images/calendar.png";
import MaskedInput from "react-text-mask";
const DateComp = ({
  label,
  placeholder,
  type,
  checkValidation,
  onChange,
  error,
  onBlur,
  onKeyDown,
  reference,
  value,
  onKeyPress,
  maxLength,
  textTransform,
  onInput,
  readOnly,
  startDate,
  endDate,
  age=[0,0],
}) => {
  // const [innerValue, setInnerValue] = useState(value);
  // useEffect(() => {
  //   setInnerValue(value);
  // }, [value]);
  console.log("jhcvugc", age);
  const [isFocused, setIsFocused] = useState(false);
  const onFocus = () => setIsFocused(true);
  let newDate = new Date();
  let currentYear = newDate.getFullYear();
  let currentMonth = newDate.getMonth();
  let currentDate = newDate.getDate();
  console.log(value);

  return (
    <InputContainer error={!isFocused ? error : null}>
      <DatePicker
        showYearDropdown
        yearDropdownItemNumber={100}
        scrollableYearDropdown={true}
        dateFormat={"dd-MM-yyyy"}
        selected={
          value && value !== "Invalid date" && value !== "value"
            ? moment(value, "DD-MM-YYYY")?.toDate()
            : ""
        }
        minDate={
          age && age[1] >= 0
            ? new Date(
                currentYear - (age[1] + 1),
                currentMonth,
                currentDate - 1,
              )
            : ""
        }
        maxDate={
          age && age[0] >= 1
            ? new Date(currentYear - age[0], currentMonth, currentDate)
            : age[0]
            ? new Date(
                currentYear,
                currentMonth - Number(age[0].toString().split(".")[1]),
                currentDate,
              )
            : ""
        }
        placeholderText={checkValidation?.required && placeholder ? `${placeholder}*` : placeholder || ""}
        onChange={date => {
          onChange({ target: { value: moment(date).format("DD-MM-YYYY") } });
        }}
        customInput={
          <MaskedInput
            guide={false}
            mask={[/\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
          />
        }
        readOnly={readOnly}
        onFocus={onFocus}
        onBlur={() => setIsFocused(false)}
      />

      <Label>{label}</Label>
      <Calendar
        error={!isFocused ? error : null}
        src={calendar}
        alt="calendar"
      />
      {!isFocused && <p className="formbuilder__error">{error}</p>}
    </InputContainer>
  );
};

export default DateComp;
const Calendar = styled.img`
  position: absolute;
  height: 20px;
  width: 20px;
  top: 50%;
  right: 20px;
  transform: ${props =>
    props.error ? "translateY(calc(-50% - 8px))" : "translateY(-50%)"};
`;
const InputContainer = styled.div`
  & .react-datepicker__navigation--years-upcoming {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;

    border-bottom: 5px solid black;
  }
  & .react-datepicker__navigation--years-previous {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;

    border-top: 5px solid black;
  }
  margin-top: 0.3rem !important;
  position: relative;
  z-index: 1;
  margin-bottom: 12px !important;
  @media (max-width: 768px) {
    margin-bottom: 12px !important;
  }
  & > div {
    width: 100%;
  }
  & input {
    border: ${props =>
      props.error ? "solid 1px #c7222a" : "solid 1px #ced4da"};
    // border-radius: 8px;
    // background: ${props => (props.error ? "#fff6f7" : "transparent")};
    height: 55px;
    font-family: inherit;
    line-height: inherit;
    overflow: visible;
    outline: none;
    box-shadow: none;
    transition: all 0.3s ease-in-out;
    touch-action: manipulation;
    width: 100%;
    font-size: 14px;
    color: #939393;
    position: relative;
    padding: 0 25px;
    &:focus {
      border-color: ${props =>
        props.error ? "#c7222a" : "solid 1px  #393939"};
      color: black;
    }
    @media (max-width: 767px) {
      height: 42px;
      padding: 0 16px;
      border-radius: 6px;
      font-size: 14px;
    }
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
`;
const Label = styled.label`
  text-align: left;
  list-style: none;
  list-style-type: none;
  user-select: none;

  box-sizing: border-box;
  touch-action: manipulation;
  display: inline-block;
  font-size: 12px;
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

  @media (max-width: 1200px) {
    font-size: 12px !important;
  }
  @media (max-width: 1100px) {
    font-size: 11px !important;
  }
  @media (max-width: 1050px) {
    font-size: 13px !important;
  }
  @media (max-width: 767px) {
    left: 10px;
    font-size: 14px;
  }
`;
