import React from "react";
import { ProgressBar } from "react-bootstrap";
import "styled-components/macro";
const ProgessBar = ({ year, value, color }) => {
  return (
    <span
      css={`
        display: flex;
        margin-bottom: 40px;
        font-weight: 900;
        font-size: 12px;
        align-items: center;
      `}
    >
      <div
        css={`
          width: 82px;
        `}
      >
        {year}
      </div>

      <ProgressBar
        now={value}
        label={
          <>
            <span>{value}%</span>
          </>
        }
        css={`
          background: unset;
          width: 100%;
          height: 12px;
          .progress-bar {
            overflow: unset;
            position: relative;
            background: ${color};
            border-radius: 0.25rem;
            & span {
              position: absolute;
              right: -48px;
              color: black;
            }
          }
        `}
      />
    </span>
  );
};

export default ProgessBar;
