import React from "react";
import "styled-components/macro"
import { useSelector } from "react-redux";
import "./continue.scss";
const ContinueBtn = ({ onClick }) => {
  const { isLoading } = useSelector(state => state.proposalPage);
  return (
    <button onClick={onClick} className="btn btn_start_proposal"
      css={`
    @media (max-width:767px){
      margin-bottom:100px !important;
    }
    `}
    >
      Continue {isLoading && <span class="lds-dual-ring"></span>}
    </button>
  );
};

export default ContinueBtn;
