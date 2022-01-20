import React from "react";
import "styled-components/macro";
function ProgressBarMobile({ year, value, color }) {
  return (
    <div style={{ display: "flex" }}>
      <p style={{ fontSize: "13px", marginRight: "10px", marginTop: "-10px" }}>
        {year}
      </p>

      <div
        className={`progress_chart`}
        style={{ width: "180px", marginRight: "10px" }}
      >
        <div
          className="progress-bar"
          style={{ width: `${value - 21}%` }}
          css={`
            &:before {
              background-color: ${color};
              border: 5px solid ${color} !important;
            }
          `}
        >
          <div className="progress-value">{`${value}%`}</div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBarMobile;
