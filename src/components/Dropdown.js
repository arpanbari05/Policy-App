import Select from "react-select";
import "styled-components/macro";
import { useTheme } from "../customHooks";

function Dropdown({ label, ...props }) {
  const { colors } = useTheme();

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
            color: ${colors.primary_color};
          `}
        >
          {label}
        </span>
      ) : null}
      <Select {...props} />
    </div>
  );
}

export default Dropdown;
