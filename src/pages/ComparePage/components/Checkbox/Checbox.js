import React from "react";
import "styled-components/macro";
import "./Checkbox.css";
const Checkbox = ({
  id,
  title,
  handleChange,
  checked,
  disabled,
}) => {
  
  return (
    <div >
      <div class="round">
        <input
          type="checkbox"
          id={id}
          checked={checked || undefined}
          onClick={handleChange}
          onChange={() => {}}
          disabled={disabled || undefined}
        />
        <label htmlFor={id}> </label>
        <span
          htmlFor={id}
          css={`
            left: 21px;
            font-size: 16px;
            font-weight: 900;
            top: 0px;
            position: relative;
          `}
        >
          {title}
        </span>
      </div>
    </div>
  );
 
};

export default Checkbox;
