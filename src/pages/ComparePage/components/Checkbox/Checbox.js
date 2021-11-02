import React from "react";
import "styled-components/macro";
import "./Checkbox.css";

import { useSelector } from "react-redux";

const Checkbox2 = ({ title, onChange, checked, showTitle = true }) => {
  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;

  console.log(title, onChange, checked, "heelp");
  return (
   
    <div class="container d-flex align-items-center" css={`
    position: relative;
    left: -18px;
    @media (max-width:400px){
      padding:0px 5px;
    }
    `}>
      <div
        className="round"
        css={`
          input[type="checkbox"]:checked + label {
            background-color: ${PrimaryColor} !important;
            border-color: ${PrimaryColor} !important;
          }
        `}
      >
        <input
          type="checkbox"
          id={title}
          onChange={onChange}
          checked={checked}
        />
        <label htmlFor={title}> </label>
        {showTitle && title && (
          <span
            htmlFor={title}
            css={`
              left: 21px;
              font-size: 13px;
              font-weight: 900;
              top: 0px;
              position: relative;
            `}
          >
            {title}
          </span>
        )}
      </div>
    </div>
  );
};

export default Checkbox2;
