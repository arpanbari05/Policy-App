import React from "react";

const CompareBtn = ({ value, onClick, windowWidth }) => {
  return (
    <a>
      <button
        onClick={onClick}
        className="theme-button-two_compare text-center"
        style={{width:"100%"}}
      >
        <i className="fa fa-inr"></i> {value}
      </button>
    </a>
  );
};

export default CompareBtn;
