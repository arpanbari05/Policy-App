import { FaChevronDown } from "react-icons/fa";
import { FilterWrapper } from "./Filter.style";
import "styled-components/macro";
import { useTheme, useToggle } from "../../../../customHooks";
import React from "react";

export function FilterHead({ label, children, onClick, ...props }) {
  const handleClick = () => onClick && onClick();
  return (
    <FilterWrapper className="filter d-flex flex-column flex-fill" {...props}>
      <span className="filter_head">{label}</span>
      <span
        onClick={handleClick}
        className="filter_sub_head d-flex align-items-center justify-content-between"
      >
        {children}
        <FaChevronDown />
      </span>
    </FilterWrapper>
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
      `}
      {...props}
    >
      {React.Children.map(children, child => {
        if (child.type.name === "FilterHead")
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
