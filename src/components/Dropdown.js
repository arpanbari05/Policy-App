import Select from "react-select";
import "styled-components/macro";
import { useTheme } from "../customHooks";
import greetingPageSlice from "../pages/InputPage/greetingPage.slice";

function Dropdown({ label, customFieldHeight = "38px", ...props }) {
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
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      minHeight: customFieldHeight,
      position: "relative",
      transition: "all 100ms ease 0s",
      boxSizing: "border-box",
      outline: "0px !important",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      fontWeight: "bold",
    }),
    input: (provided, state) => ({
      ...provided,
      fontWeight: "bold",
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
      <Select {...props} styles={customStyles} />
    </div>
  );
}

export default Dropdown;
