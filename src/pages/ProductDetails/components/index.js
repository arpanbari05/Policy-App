import { mobile, small } from "../../../utils/mediaQueries";
import "styled-components/macro";
import { FaCheck } from "react-icons/fa";
import { useTheme } from "../../../customHooks";

export function WrapWithTitle({ title, children }) {
  return (
    <div
      css={`
        padding: 10px 30px 30px;
        border-radius: 20px;
        border: 1px solid #dfdfdf;
        margin-bottom: 1rem;

        ${mobile} {
          border: none;
          padding: 0;
        }
      `}
    >
      <div
        css={`
          ${mobile} {
            border: none;
            position: relative;
            display: flex;
            align-items: center;
          }
        `}
      >
        <hr
          css={`
            display: none;
            ${mobile} {
              display: block;
              height: 1px;
              background: #ddd;
              flex-grow: 1;
            }
          `}
        />
        <h3
          css={`
            font-size: 17px;
            color: #68758b;
            font-weight: 600;
            margin: auto;
            margin-top: 7px;
            margin-bottom: 30px;
            text-align: center;

            ${mobile} {
              margin-bottom: 10px;
              position: relative;
              font-size: 16px;
              width: max-content;
              padding: 0 10px;
              background-color: #fff;
              // z-index: 10;
            }

            ${small} {
              font-size: 12px;
            }
          `}
        >
          {title}
        </h3>
        <hr
          css={`
            display: none;
            ${mobile} {
              display: block;
              height: 1px;
              background: #ddd;
              flex-grow: 1;
            }
          `}
        />
        {/* <div
          css={`
            display: none;
            ${mobile} {
              display: block;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              height: 1px;
              width: 100%;
              background-color: #ddd;
            }
          `}
        /> */}
      </div>
      {children}
    </div>
  );
}

export function OptionCard({
  option,
  checked = false,
  onChange,
  highlight,
  label,
  children,
  sum_insured,
  ...props
}) {
  const { colors } = useTheme();
  const handleChange = evt => {
    onChange &&
      onChange({
        ...option,
        sum_insured: sum_insured,
        isSelected: evt.target.checked,
      });
  };

  return (
    <div
      style={{ margin: "0" }}
      css={`
        ${mobile} {
          width: 100%;
        }
      `}
      {...props}
    >
      <label
        css={`
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-around;
          background: white;
          border-radius: 15px;
          padding: 1rem;
          padding-bottom: 0.7rem;
          text-align: center;
          position: relative;
          width: 200px;
          border: 2px solid;
          border-color: ${checked ? colors.primary_color : "#e5e5e5"};
          @media (max-width: 768px) {
            width: 100% !important;
            margin: 10px 0px;
          }
        `}
      >
        <input
          type="radio"
          checked={checked}
          onChange={handleChange}
          className="visually-hidden"
        />
        {checked ? (
          <span
            css={`
              font-size: 9px;
              position: absolute;
              bottom: 11px;
              right: 11px;
              transform: translateX(-50%);
              height: 23px;
              width: 23px;
              line-height: 30px;
              text-align: center;
              border-radius: 50%;
              background: ${colors.primary_color};
              box-shadow: 0px 2px 5px -2px rgb(0 0 0 / 25%);
              font-family: "font-awesome";
              justify-content: center;
              align-items: center;
              display: flex;
              color: #fff;
            `}
          >
            <FaCheck />
          </span>
        ) : (
          <span
            css={`
              font-size: 11px;
              position: absolute;
              bottom: 11px;
              right: 11px;
              transform: translateX(-50%);
              height: 23px;
              width: 23px;
              line-height: 30px;
              text-align: center;
              border-radius: 50%;
              background: white;

              font-family: "font-awesome";
              border: 2px solid #fff;
              color: #fff;
              border: 2px solid #e4e7ec;
            `}
          >
            <FaCheck />
          </span>
        )}

        {highlight ? (
          <div
            css={`
              width: 100px;
              height: 22px;
              background: ${colors.secondary_color};
              border-bottom-left-radius: 300px;
              border-top-right-radius: 180px;
              position: absolute;
              top: -2px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: 900;
              color: white;
              font-size: 10px;
              right: -2px;
            `}
          >
            {highlight}
          </div>
        ) : null}

        <span
          css={`
            font-size: 15px;
            font-weight: 600;
            color: #253858;
            margin-bottom: 8px;
            @media (max-width: 768px) {
              color: ${colors.primary_color};
              background-color: #eff7ff;
              border-radius: 20px;
              padding: 2px 5px;
            }
          `}
        >
          {label}
        </span>
        <span
          className="addon_p_g_r"
          css={`
            display: flex;
            align-items: center;
            font-size: 19px;
          `}
        >
          <b
            css={`
              ${mobile} {
                font-size: 16px;
              }
              @media (min-width: 768px) and (max-width: 900px) {
                font-size: 23px;
              }
            `}
          >
            {children}
          </b>
        </span>
      </label>
    </div>
  );
}
