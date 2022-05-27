import Select from "react-select";
import { forwardRef } from "react";
import "styled-components/macro";

const Dropdown = forwardRef(
  (
    {
      label,
      customFieldHeight = "38px",
      searchQuery,
      showDropdown,
      hideDefaultControl = false,
      ...props
    },
    ref,
  ) => {
    const customStyles = {
      control: () => ({
        // none of react-select's styles are passed to <Control />
        alignItems: "center",
        backgroundColor: "rgb(255, 255, 255)",
        borderColor: "rgb(204, 204, 204)",
        borderRadius: "4px",
        borderStyle: "solid",
        borderWidth: "1px",
        cursor: "default",
        flexWrap: "wrap",
        justifyContent: "space-between",
        minHeight: customFieldHeight,
        position: "relative",
        transition: "all 100ms ease 0s",
        boxSizing: "border-box",
        outline: "0px !important",
        display: hideDefaultControl ? "none" : "flex",
      }),
      placeholder: (provided, state) => ({
        ...provided,
        fontWeight: "bold",
      }),
      input: (provided, state) => ({
        ...provided,
        fontWeight: "bold",
      }),
      menuList: provided => ({
        ...provided,
        maxHeight: 150,
      }),
    };

    return (
      <div className="position-relative">
        {label ? (
          <span
            className="position-absolute px-1"
            css={`
              top: 0;
              left: 8px;
              transform: translateY(-50%);
              font-size: 0.79em;
              z-index: 1;
              background-color: #fff;
              color: black;
            `}
          >
            {label}
          </span>
        ) : null}
        <Select
          ref={ref}
          inputValue={searchQuery}
          styles={customStyles}
          menuIsOpen={showDropdown}
          {...props}
        />
      </div>
    );
  },
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
