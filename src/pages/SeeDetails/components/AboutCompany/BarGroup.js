import React from "react";

const BarGroup = ({ value }) => {
  return (
    <div className="bar-group">
      <span
        className="bar_span_add_txt"
        style={{ position: "absolute", marginTop: `${140 - value}px` }}
      >{`${value}%`}</span>

      <div
        className="bar bar-2 stat-2"
        style={{ height: `${value - 21}%`, marginTop: "10px" }}
      >
        <span>5680</span>
      </div>
    </div>
  );
};

export default BarGroup;
