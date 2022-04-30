import React from "react";
import "styled-components/macro";
import BackButton from "../../../../components/BackButton";
import GoBack from "../../../ComparePage/components/GoBackBtn/GoBack";
const BackBtn = ({ onClick, hide, customStyle }) => {
  return (
    <BackButton
      onClick={onClick}
      style={{ display: hide && "none", ...customStyle }}
      className="btn btn_start_proposal_back"
      styledCss={`
      width: 200px;
      margin: 10px 0;
      @media(max-width:400px){
        width:150px;
      }
      border:1px solid #bcbcbc !important;
        `}
    >
      Back{" "}
    </BackButton>
  );
};

export default BackBtn;
