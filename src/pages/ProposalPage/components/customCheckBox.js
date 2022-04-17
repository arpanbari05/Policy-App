import React, { useEffect, useState } from "react";
import "styled-components";
import styled from "styled-components/macro";

const CustomCheckBox = ({
  name,
  placeholder,
  value = "N",
  onChange,
  innerMember,
}) => {
  console.log("svjsbkvk", value);
  useEffect(() => {
    if (!value) onChange({ target: { value: "N" } });
  }, []);
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom:"10px" }}>
      {" "}
      
      <input
        className="inp-cbx"
        id={name + innerMember}
        type="checkbox"
        checked={value === "Y" ? true : false}
        onChange={onChange}
      />
     
      <label className="cbx" htmlFor={name + innerMember}>
        <span>
          <svg width="12px" height="10px">
            <use xlinkHref="#check"></use>
          </svg>
        </span>
      </label>
      <svg className="inline-svg">
        <symbol id="check" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </symbol>
      </svg>
      <Question>
      {" "}
      {placeholder}
    </Question>
    </div>
  );
};

export default CustomCheckBox;

const Question = styled.span`
margin-left: 7px !important;

  &:after {
    content: "";
    height: 22px;
    width: 6px;
    position: absolute;
    left: -2px;
    top: 2px;
    background-color: ${props => props.SecondaryColor};
    border-radius: 50px;
    @media (max-width: 767px) {
      height: calc(100% - 6px);
    }
  }
  @media (max-width: 767px) {
    font-size: 14px !important;
    font-family: "Inter-Regular";
  }
`;