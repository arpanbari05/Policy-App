import React from "react";
import "styled-components/macro";
import { useSelector } from "react-redux";
import "./continue.scss";
import StyledButton from "../../../../components/StyledButton";
const ContinueBtn = ({ onClick }) => {
  const { isLoading } = useSelector(state => state.proposalPage);
  return (
    <StyledButton
      onClick={onClick}
      className="btn btn_start_proposal"
      noIcon
      styledCss={`
    width: 200px;
    margin: 10px 0;
    @media(max-width:400px){
      width:150px;
    }
      `}
    >
      Continue{" "}
      {isLoading && (
        <span
          css={`
            width: unset;
            height: unset;
            position: relative;
            &:after {
              content: " ";
              display: inline-block;
              width: 22px;
              height: 22px;
              position: absolute;
              top: 2px;
              right: -30px;
              border-radius: 50%;
              border: 3px solid #fff;
              border-color: #fff transparent #fff transparent;
              animation: lds-dual-ring 1.2s linear infinite;
            }
          `}
        ></span>
      )}
    </StyledButton>
  );
};

export default ContinueBtn;
