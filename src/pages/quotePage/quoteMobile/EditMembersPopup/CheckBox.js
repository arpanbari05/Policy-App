import React, { useState } from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

const Form3CheckBox = ({
  disabled,
  code,
  title,
  type,
  handleChange,
  checked,
  childCount,
}) => {
  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;

  const handleChecked = () => {
    handleChange(code, checked, type);
  };

  return (
    <span
      css={`
        .inp-cbx:checked + .cbx span:first-child,
        .cbx span:first-child {
          border-color: ${PrimaryColor};
        }
        .cbx span:first-child svg {
          stroke: ${PrimaryColor};
        }
      `}
    >
      <input
        className="inp-cbx"
        id={code}
        type="checkbox"
        checked={checked || undefined}
        onClick={handleChecked}
        onChange={() => {}}
        disabled={disabled || undefined}
      />
      <label
        className="cbx"
        htmlFor={code}
        css={`
          @media (max-width: 767px) {
            margin: 0 !important;
            top: 5px;
          }
        `}
      >
        <span
          css={`
            @media (max-width: 767px) {
              & svg {
                top: 3px !important;
                left: 2px !important;
              }
            }
          `}
        >
          <svg width="12px" height="10px">
            <use xlinkHref="#check"></use>
          </svg>
        </span>
        <span
          style={{ marginLeft: "10px" }}
          className="cbx__title"
          css={`
          
              font-weight: 900;
              font-size: 13px !important;
              margin-left: 0 !important;
            }
          `}
        >
          {title}
        </span>
      </label>
      <svg className="inline-svg">
        <symbol id="check" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </symbol>
      </svg>
    </span>
  );
};
export default Form3CheckBox;
