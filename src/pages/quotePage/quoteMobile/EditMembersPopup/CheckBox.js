import React, { useState } from "react";
import styled from "styled-components/macro";

const Form3CheckBox = ({
  disabled,
  code,
  title,
  type,
  handleChange,
  checked,
  childCount
}) => {
  const handleChecked = () => {
    handleChange(code, checked, type);
  };

  return (
    <>
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
        <span>
          <svg width="12px" height="10px">
            <use xlinkHref="#check"></use>
          </svg>
        </span>
        <span style={{marginLeft:"10px"}} className="cbx__title">{title}</span>
      </label>
      <svg className="inline-svg">
        <symbol id="check" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </symbol>
      </svg>
    </>
  );
};
export default Form3CheckBox;
