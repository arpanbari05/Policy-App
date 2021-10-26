import React from "react";
import { ProgressBar } from "react-bootstrap";
import "styled-components/macro";
import { useSelector } from "react-redux";

const CustomProgressBar = ({ now, total }) => {
  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade } = theme;
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
            background: ${SecondaryColor};
          }
        `}
        now={`${(now * 100) / total}`}
      />
      {/* <span>
        {now}/{total}
      </span> */}
    </span>
  );
};

export default CustomProgressBar;
