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
  required,
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
  age,
}) => {
  // const [innerValue, setInnerValue] = useState(value);
  // useEffect(() => {
  //   setInnerValue(value);
  // }, [value]);

  return (
    <InputContainer error={error}>
      <DatePicker
        showYearDropdown
        dateFormat={"dd-MM-yyyy"}
        selected={
          (value && value !== "Invalid date" && value !== "value")
            ? moment(value, "DD-MM-YYYY")?.toDate()
            : ""
        }
        minDate={
          age && age[1] >= 0 ? moment().subtract(age[1], "years").toDate() : ""
        }
        maxDate={
          age && age[0] >= 0 ? moment().subtract(age[0], "years").toDate() : ""
        }
        placeholderText={placeholder}
        onChange={date => {
          onChange({ target: { value: moment(date).format("DD-MM-YYYY") } });
        }}
        customInput={
          <MaskedInput
            guide={false}
            mask={[/\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
          />
        }
      />

      <Label>{label}</Label>
      <Calendar error={error} src={calendar} alt="calendar" />
      <p className="formbuilder__error">{error}</p>
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
    background: ${props => (props.error ? "#fff6f7" : "transparent")};
    height: 55px;
    font-family: inherit;
    line-height: inherit;
    overflow: visible;
    outline: none;
    box-shadow: none;
    transition: all 0.3s ease-in-out;
    touch-action: manipulation;
    width: 100%;
    font-size: 16px;
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
  font-size: 18px;
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
  
  @media (max-width: 767px) {
    left: 10px;
    font-size: 14px;
  }
`;
