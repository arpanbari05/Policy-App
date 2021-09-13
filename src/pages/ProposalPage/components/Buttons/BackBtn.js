import React from "react";
import "styled-components/macro"
const BackBtn = ({ onClick, hide }) => {
  return (
    <button
      onClick={onClick}
      style={{ display: hide && "none" }}
      className="btn btn_start_proposal_back"
      css={`
      @media (max-width:767px){
        margin-bottom:100px !important;
      }
      `}
    >
      Back{" "}
    </button>
  );
};

export default BackBtn;
