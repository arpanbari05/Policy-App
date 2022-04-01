import React, { useEffect, useState } from "react";
import "styled-components";

const CustomCheckBox = ({ name, placeholder, value = "N", onChange,innerMember }) => {
  console.log("svjsbkvk",value)
  useEffect(() => {
if(!value) onChange({target:{value:"N"}})
  },[])
  return (
    <div style={{display:"flex", alignItems:"center"}}>
      {" "}
      <span style={{ fontWeight: "900", margin: "0 10px", display:"flex", alignItems:"center" }}>
        {" "}
        {placeholder}
      </span>
      <input
        className="inp-cbx"
        id={name+innerMember}
        type="checkbox"
        checked={value === "Y" ? true : false}
        onChange={onChange}
      />
      <label className="cbx" htmlFor={name+innerMember}>
        <span>
          <svg width="12px" height="10px">
            <use xlinkHref="#check"></use>
          </svg>
        </span>
      </label>
      <svg className="inline-svg">
        <symbol id="check" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </symbol>
      </svg>
    </div>
  );
};

export default CustomCheckBox;
