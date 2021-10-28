import React from "react";
import "styled-components/macro";
import "./Checkbox.css";
const Checkbox2 = ({ title, onChange, checked, showTitle = true }) => {
  console.log(title, onChange, checked, "heelp");
  return (
    <div class="container d-flex align-items-center" css={`
    @media (max-width:400px){
      padding:0px 5px;
    }
    `}>
      <div class="round">
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
