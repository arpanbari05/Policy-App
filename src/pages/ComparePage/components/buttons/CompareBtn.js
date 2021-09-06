import React from "react";
import StyledButton from "../../../../components/StyledButton";
import "styled-components/macro";
const CompareBtn = ({ value, onClick, windowWidth }) => {
  return (
    <a
      css={`
        width: 100%;
        display: flex;
        justify-content: center;
      `}
    >
      <StyledButton
        onClick={onClick}
        noIcon
        styledCss={`    
        font-size: 18px;
        font-weight: 400;
        line-height: 26px;
        height: 44px;
    width: 88%;
    `}
      >
        ₹ {value}
      </StyledButton>
    </a>
  );
};

export default CompareBtn;
