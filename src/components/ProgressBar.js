import React from "react";
import { ProgressBar } from "react-bootstrap";
import { useTheme } from "../customHooks";
import "styled-components/macro";

const CustomProgressBar = ({ now, total }) => {
  const { colors } = useTheme();

  const progress = (now * 100) / total;

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
            background: ${colors.secondary_color};
          }
        `}
        now={progress}
      />
    </span>
  );
};

export default CustomProgressBar;
