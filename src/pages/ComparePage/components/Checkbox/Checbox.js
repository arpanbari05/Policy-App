import React from "react";

const Checbox = ({ checked, onChange }) => {
  return (
    <div className="agreement-checkbox_compare margin_top_checkbox_card">
      <div>   
        <input
          type="checkbox"
          id="compare_one"
          className="compare-checkbox"
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor="compare_one">Show Difference</label>
      </div>
    </div>
  );
};

export default Checbox;
