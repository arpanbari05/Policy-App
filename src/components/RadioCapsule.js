import React from "react";
import styled from "styled-components";
const RadioCapsule = ({ label, checked, value, onChange }) => {
  return (
    <>
      <RadioInput className="checkbox-tools" type={"radio"}   checked={checked}/>
      <RadioLabel
        className="for-checkbox-tools"
        htmlFor={label}
        value={value}
      
        onChange={onChange}
      >
        {label}
      </RadioLabel>
    </>
  );
};

export default RadioCapsule;

const RadioInput = styled.input`
  &:not(:checked) + label {
    background-color: #f0f0f0;
    /* box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%); */
    color: #000;
    text-align: center;
    /* margin: 0 6px; */
    border-radius: 50px;
    /* height: 53px; */
    line-height: 12px;
    text-align: center !important;
    font-size: 14px;
    border: 1px solid #f0f0f0;
  }
  &:checked + label,
  &:not(:checked) + label:hover {
    background-color: #fff;
    color: #c7222a;
    text-align: center !important;
    border: 1px solid #c7222a;
    border-radius: 50px;
    line-height: 12px;
  }

  &:checked,
  &:not(:checked) {
    position: absolute;
    left: -9999px;
    width: 0;
    height: 0;
    visibility: hidden;
  }

  &:not(:disabled) ~ label {
    cursor: pointer;
  }
`;
const RadioLabel = styled.label`
  font-weight: 900;
  padding: 13px 26px;
  letter-spacing: 1px;
  margin: 0 5px;
  height: 40px;
  font-size: 14px;
`;
