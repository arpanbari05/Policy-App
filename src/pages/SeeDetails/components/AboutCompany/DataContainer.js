import React from "react";
import "styled-components/macro";

const DataContainer = ({ title, description }) => {
  return (
    <>
      <div className="market_border_left">
        <h2
          className="title_h4"
          css={`
            font-weight: bold;
            color: #253858;
          `}
        >
          {title}
        </h2>
      </div>
      {/* <p
        className="p_chart_title_l"
        css={`
          margin-bottom: 10px !important;
        `}
      >
        <span
          className="span_square_red"
          style={{
            marginRight: "2px",
            padding: "0px 8px",
            borderRadius: "4px",
          }}
        >
          &nbsp;
        </span>{" "}
        {2020} &nbsp; &nbsp; &nbsp;
        <span className="span_border_right_plan">|</span> &nbsp; &nbsp; &nbsp;{" "}
        <span
          className="span_square_pink"
          style={{
            marginRight: "2px",
            padding: "0px 8px",
            borderRadius: "4px",
          }}
        >
          &nbsp;
        </span>{" "}
        Current Market Premium 2021
      </p> */}
      <p
        className="p_chart_title_market_sub"
        style={{
          color: "var(--font-gray-two)",
          maxWidth: "578px",
        }}
        css={`
          line-height: 1.3 !important;
        `}
      >
        <span className="text_red_title">Why it is important:</span>
        {description ? description.replace("Why it is important:", "") : ""}
      </p>
    </>
  );
};

export default DataContainer;
