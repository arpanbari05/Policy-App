import React from "react";
import { ProgressBar } from "react-bootstrap";
import "styled-components/macro";
const ProgessBar = ({ year, value, color }) => {
  console.log(year, value, color, "gag13");
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

  // return (
  // 	<>
  // 		<h3 className="progress-title">{year}</h3>
  // 		<div className={`progress_chart `} >
  // 			<div className="progress-bar" style={{ width: `${value - 21}%`, height: "0px", maxWidth:"195px" }}
  // 				css={`
  // 					 &:before{
  // 						background-color: ${color};
  // 						 border: 5px solid ${color} !important;
  // 					 }
  // 					 `}
  // 			>
  // 				<div className="progress-value">{`${value}%`}</div>
  // 			</div>
  // 		</div>
  // 	</>
  // );
};

export default ProgessBar;
