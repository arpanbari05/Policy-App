import React, { useState } from "react";
import "styled-components/macro";
import "./cbx.css"

const ProposalCheckBox = ({ title, value, onChange, extraPadding }) => {
  return (
    <>
      <input
        className="inp-cbx"
        id={title}
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
      <label
        className="cbx"

        style={{ padding: extraPadding ? "10px 8px 12px" : "2px 8px 12px", width: "unset", }}
 
        htmlFor={title}
      >
        <span 
        css={`
        margin-bottom: -3px;
        @media (max-width:1200px){
          margin-bottom: 0px;
        }
        `}
        >
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
    </>
  );
};

export default ProposalCheckBox;
