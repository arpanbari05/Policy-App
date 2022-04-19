import { FaChevronDown } from "react-icons/fa";
import "styled-components/macro";
import { useTheme, useToggle } from "../../../../customHooks";
import React, { useRef } from "react";
import { IoRadioButtonOn } from "react-icons/io5";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";

export function FilterHead({ label, children, onClick, ...props }) {
  const handleClick = () => onClick && onClick();
  const { colors } = useTheme();
  return (
    <button
      className="w-100 px-2"
      css={`
        text-align: left;
      `}
      onClick={handleClick}
      {...props}
    >
      <div
        css={`
          font-size: 11px;
          color: ${colors.font.three};
        `}
      >
        {label}
      </div>
      <div
        className="d-flex align-items-center justify-content-between"
        css={`
          font-size: 12px;
          gap: 1em;
          min-width: max-content;
          font-weight: 900;
        `}
      >
        {children}
        <FaChevronDown />
      </div>
    </button>
  );
}

export function Filter({ label, children, ...props }) {
  const { colors } = useTheme();
  const modalToggle = useToggle();

  return (
    <div
      className="position-relative"
      css={`
        flex: 1;
        &:not(:last-child) {
          border-right: 1px solid ${colors.border.one};
        }
        &:hover {
          background-color: ${colors.secondary_shade};
        }
      `}
      {...props}
    >
      {React.Children.map(children, child => {
        if (child.type.name === (<FilterHead />).type.name)
          return React.cloneElement(child, { onClick: modalToggle.on });
        return modalToggle.isOn
          ? React.cloneElement(child, {
              ...child.props,
              onClose: modalToggle.off,
            })
          : null;
      })}
    </div>
  );
}

export function FilterOption({ option, checked, onChange, ...props }) {
  const target = useRef(null);
  const { colors } = useTheme();
  const handleChange = evt => {
    if (evt.target.checked) onChange && onChange(option);
  };

  return (
    <li
      css={`
        margin: 5px 0;
      `}
      className="option d-flex align-items-center justify-content-between"
      {...props}
      onClick={() => {
        target.current.click();
      }}
    >
      <label htmlFor={option.code}>{option.display_name}</label>
      <input
        ref={target}
        type="radio"
        className="visually-hidden"
        id={option.code}
        name="select_premium"
        checked={checked}
        onChange={handleChange}
      />
      {checked ? (
        <IoRadioButtonOn size={25} color={colors.primary_color} />
      ) : (
        <RiCheckboxBlankCircleLine size={25} color="#aaa" />
      )}
    </li>
  );
}
