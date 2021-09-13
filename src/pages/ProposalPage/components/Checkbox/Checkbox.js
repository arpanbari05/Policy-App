import React from "react";

const CheckBox = ({ title, onChange, checked, showTitle = true }) => {
  return (
    <>
      <input
        className="inp-cbx"
        id={title}
        type="checkbox"
        checked={checked || undefined}
        onChange={onChange}
      />
      <label className="cbx" htmlFor={title}>
        <span>
          <svg width="10px" height="8px">
            <use xlinkHref="#check"></use>
          </svg>
        </span>
        {showTitle && <span className="cbx__title">{title}</span>}
      </label>

      <svg className="inline-svg">
        <symbol id="check" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </symbol>
      </svg>
    </>
  );
};

export default CheckBox;
