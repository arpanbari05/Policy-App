import React from "react";
import "styled-components/macro";
import BackButton from "../../../../components/BackButton";
import GoBack from "../../../ComparePage/components/GoBackBtn/GoBack";
const BackBtn = ({ onClick, hide }) => {
  return (
    <BackButton
      onClick={onClick}
      style={{ display: hide && "none" }}
      className="btn btn_start_proposal_back"
      styledCss={`
      width: 200px;
      margin: 10px 0;
        `}
    >
      Back{" "}
    </BackButton>
  );
};

export default BackBtn;
