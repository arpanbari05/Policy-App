import React from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { useTheme } from "../customHooks";
const RadioButton = ({
  onChange,
  checked,
  value,
  id,
  label,
  onClick,
  onMouseEnter,
  onMouseOut,
  itemsCentered,
}) => {
  const { colors } = useTheme();

  return (
    <div>
      <RadioInput
        PrimaryColor={colors.primary_color}
        PrimaryShade={colors.primary_shade}
        type="radio"
        name={label}
        id={id}
        onClick={onClick}
        value={value}
        checked={checked || false}
        onChange={() => {}}
      />
      <RadioLabel
        itemsCentered={itemsCentered}
        htmlFor={id}
        onMouseEnter={onMouseEnter}
        onMouseOut={onMouseOut}
      >
        <span onMouseEnter={onMouseEnter}> {label}</span>
        {checked && (
          <FaCheck
            css={`
              position: absolute;
              right: 20px;
              color: ${colors.primary_color};
              font-size: 20px;
            `}
          />
        )}
      </RadioLabel>
    </div>
  );
};

export default RadioButton;

export const RadioInput = styled.input`
  cursor: pointer !important;
  &:not(:checked),
  &:checked {
    position: absolute;
    left: -9999px;
    width: 0;
    height: 0;
    visibility: hidden;
  }
  &:checked + label {
    margin-bottom: 10px;
    color: #000;
    opacity: 1;
    border: solid 1px ${props => props.PrimaryColor};
    background-color: ${props => props.PrimaryShade};
    font-size: 15px;
    font-weight: 900;
  }
`;

export const RadioLabel = styled.label`
  cursor: pointer !important;
  transition: all 0.3s linear 0s;
  border-radius: 5px;
  font-weight: 900;
  background: #fff;
  box-shadow: 5px 5px 10px rgb(0 75 131 / 9%);
  border: #dfe1f2 0.8px solid;
  color: #000;
  opacity: 1;
  font-size: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 66px;
  position: relative;
  & span {
    position: relative;
    font-size: 18px;
    left: ${props => !props.itemsCentered && "13px"};
  }
  display: inline-flex;
  align-items: center;
  ${props => props.itemsCentered && "justify-content: center"};

  @media (max-width: 767px) {
    margin-bottom: 25px !important;
    width: 100% !important;
    padding: 9px 25px !important;
    display: flex;
    justify-content: space-between;
    // flex-direction: row-reverse;
    & span {
      left: unset !important;
    }
  }
`;

export const RadioLabelImage = styled.img`
  /* float: left; */
  /* margin: 4px 3px 0 -4px; */
  position: absolute;
  height: 51px;
  right: 11px;
`;
