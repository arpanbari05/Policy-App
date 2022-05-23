import React from "react";
import "styled-components/macro";

const SimpleCheckBox = ({
  onChange = () => {},
  css = "",
  name = "checkbox",
  accentColor,
  size = "0.9rem",
  checked = false,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        name={name}
        css={`
          accent-color: ${accentColor} !important;
          height: ${size};
          width: ${size};
          ${css}
        `}
        onChange={onChange}
        checked={checked}
      />
    </div>
  );
};

export default SimpleCheckBox;
