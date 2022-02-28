import React from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import { useTheme } from "../customHooks";

const RadioCapsule = ({
  label,
  checked,
  value,
  onChange,
  onClick,
  styledCss,
  id,
}) => {
  const { colors } = useTheme();

  const { primary_color, secondary_shade } = colors;

  return (
    <>
      <RadioInput
        PrimaryColor={primary_color}
        SecondaryShade={secondary_shade}
        className="checkbox-tools"
        type={"radio"}
        id={id}
        value={value}
        checked={checked || false}
        onClick={onClick}
        onChange={() => {}}
      />
      <RadioLabel className="for-checkbox-tools" htmlFor={id} css={styledCss}>
        {label}
      </RadioLabel>
    </>
  );
};

export default RadioCapsule;

const RadioInput = styled.input`
  &:not(:checked) + label {
    background-color: ${props => props.SecondaryShade};
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
    color: ${props => props.PrimaryColor};
    text-align: center !important;
    border: 1px solid ${props => props.PrimaryColor};
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
  margin: 0 0px;
  margin-bottom: 10px;
  height: 40px;
  font-size: 14px;
  @media (max-width: 480px) {
    width: 44%;
    min-width: fit-content;
    padding: 13px 20px;
    justify-content: space-between;
    font-size: 12px !important;
  }
`;
