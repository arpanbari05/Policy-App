import React from "react";
import "styled-components/macro";
import { useTheme } from "../customHooks";
import "./Checkbox.css";
const Checkbox = ({ code, title, type, handleChange, checked, disabled }) => {
  const { colors } = useTheme();

  const handleChecked = () => {
    handleChange(code, checked, type);
  };

  return (
    <div
      className="container"
      css={`
        .round input[type="checkbox"]:checked + label {
          background-color: ${colors.primary_color};
          border-color: ${colors.primary_color};
        }
      `}
    >
      <div className="round">
        <input
          type="checkbox"
          id={code}
          checked={checked}
          onClick={handleChecked}
          onChange={() => {}}
          disabled={disabled || undefined}
        />
        <label htmlFor={code}> </label>
        {title && (
          <span
            htmlFor={code}
            css={`
              left: 21px;
              font-size: 15px;
              font-weight: 900;
              top: 0px;
              position: relative;
            `}
          >
            {title}
          </span>
        )}
      </div>
    </div>
  );
  // return (
  //   <>

  //     <input
  //       className="inp-cbx"
  //       id={code}
  //       type="checkbox"
  //       checked={checked || undefined}
  //       onClick={handleChecked}
  //       onChange={() => {}}
  //       disabled={disabled || undefined}
  //     />
  //     <label
  //       className="cbx"
  //       htmlFor={code}
  //       css={`
  //         @media (max-width: 767px) {
  //           margin: 4px -9px 0px !important;
  //           padding: unset !important;
  //         }
  //       `}
  //     >

  //       <span
  //         className="cbx__title"
  //         css={`
  //           @media (max-width: 767px) {
  //             position: relative !important;
  //             top: 2px !important;
  //           }
  //         `}
  //       >
  //         {title}
  //       </span>
  //     </label>

  //     <svg className="inline-svg">
  //       <symbol id="check" viewBox="0 0 12 10">
  //         <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
  //       </symbol>
  //     </svg>
  //   </>
  // );
};

export default Checkbox;
