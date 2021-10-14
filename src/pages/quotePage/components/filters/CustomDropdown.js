import React, { useRef, useState } from "react";
import styled from "styled-components";
import "styled-components/macro";
import useOutsiteClick from "../../../../customHooks/useOutsideClick";
import { formatCurrency } from "../../../../utils/helper";
function CustomDropDown({ option, handleChange }) {
  const [showToggleOpptions, setShowToggleOpptions] = useState(false);

  const [selectedOption, setSelectedOption] = useState(parseInt(option[0]));
  const ref = useRef();
  useOutsiteClick(ref, () => {
    setShowToggleOpptions(false);
  });

  return (
    <div ref={ref}>
      <button
        className="btn select_plan_btn d-flex align-items-center position-relative"
        style={{
          fontWeight: "600",
          fontSize: "13px",
          padding: "0px 10px 5px",
        }}
        css={`
          // position: relative !important;
          // top: -1px;
          // left: -5px;
          border: none !important;
        `}
        onClick={() => setShowToggleOpptions(!showToggleOpptions)}
      >
        <span
          css={`
            margin-right: 5px;
          `}
        >
          {formatCurrency(selectedOption)}
        </span>
        {showToggleOpptions ? (
          <i class="fas fa-chevron-up  mx-2"></i>
        ) : (
          <i class="fas fa-chevron-down mx-2"></i>
        )}
      </button>
      <DropdownList className={` ${showToggleOpptions ? "d-block" : "d-none"}`}>
        {option.map((data, i) => {
          return (
            <li
              className="d-flex justify-content-between align-items-center"
              onClick={() => {
                // console.log("helo", i);
                handleChange(i);
                setSelectedOption(parseInt(data));
                setShowToggleOpptions(false);
              }}
              css={`
                &:hover {
                  background-color: #eaeef2;
                }
              `}
            >
              <label>{formatCurrency(data)}</label>
            </li>
          );
        })}
      </DropdownList>
    </div>
  );
}

export default CustomDropDown;

const DropdownList = styled.ul`
  width: fit-content;
  position: absolute;
  background-color: white;
  box-shadow: 0 3px 9px 0 rgba(193, 203, 218, 0.52);
  z-index: 9999;

  border-radius: 8px;
  list-style: none;
  padding: 10px 10px;
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  input[type="radio"] {
    width: 13px;
    height: 13px;
    margin-left: 5px;
  }
  li {
    padding: 5px;
  }
`;
