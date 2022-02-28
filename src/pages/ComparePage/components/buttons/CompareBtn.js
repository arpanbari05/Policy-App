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
        height: 50px;
    width: 88%;
    @media (max-width:767px){
      font-size: 14px !important;
      width: 60%;
      height: 40px;
    }
    @media (max-width:550px){
      font-size: 11px !important;
      width: 80%;
    }
    `}
      >
        ₹ {value}
      </StyledButton>
    </a>
  );
};

export default CompareBtn;
