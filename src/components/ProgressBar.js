import React from "react";
import { ProgressBar } from "react-bootstrap";
import "styled-components/macro";
const CustomProgressBar = ({ now, total }) => {
  return (
    <span
      css={`
        display: flex;
        align-items: center;
        font-size: 11px;
        margin-bottom: 20px;
        & span {
          margin-left: 10px;
        }
      `}
    >
      <ProgressBar
        css={`
          height: 9px;
          width: 132px;
          & .progress-bar {
            background: #5da400;
          }
        `}
        now={`${(now * 100)/  total}`}
      />
      <span>
        {now}/{total}
      </span>
    </span>
  );
};

export default CustomProgressBar;
