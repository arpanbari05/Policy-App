import { GiCircle } from "react-icons/gi";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { useCompanies, useTheme } from "../../../customHooks";
import "styled-components/macro";
import * as mq from "../../../utils/mediaQueries";
import { CircleCloseButton, PremiumButton } from "../../../components";

export function ShowDifference({ onChange, checked, ...props }) {
  const { colors } = useTheme();

  const handleChange = evt => {
    onChange && onChange(evt.target.checked);
  };

  return (
    <div className="mt-1" {...props}>
      <input
        id="show-difference"
        type={"checkbox"}
        className="visually-hidden"
        checked={checked}
        onChange={handleChange}
      />
      <label
        htmlFor="show-difference"
        className="d-flex align-items-center"
        css={`
          font-size: 0.83rem;
          gap: 0.37em;
        `}
      >
        <span
          css={`
            color: ${checked ? colors.primary_color : colors.font.two};
            font-size: 1.27rem;
            line-height: 1;
            ${mq.mobile} {
              font-size: 1.6rem;
            }
          `}
        >
          {checked ? <IoCheckmarkCircleSharp /> : <GiCircle />}
        </span>
        <span
          css={`
            line-height: 1;
            margin-top: 0.2em;
            font-weight: 600;
          `}
        >
          Show difference
        </span>
      </label>
    </div>
  );
}

export function ProductCard({ quote, onRemove, ...props }) {
  const { boxShadows, colors } = useTheme();
  const { getCompanyLogo } = useCompanies();

  const logo = getCompanyLogo(quote.company_alias);

  const handleCloseClick = () => onRemove && onRemove(quote);

  return (
    <div
      className="p-3 d-flex flex-column align-items-center justify-content-between position-relative"
      css={`
        box-shadow: ${boxShadows.five};
        gap: 2em;
        ${mq.mobile} {
          box-shadow: none;
          border: 1px solid ${colors.border.two};
          flex: 1;
          gap: 1em;
        }
      `}
      {...props}
    >
      <CircleCloseButton placeOnCorner onClick={handleCloseClick} />
      <img
        src={logo}
        alt={quote.company_alias}
        css={`
          height: 3em;
          ${mq.mobile} {
            height: 2em;
          }
        `}
      />
      <div
        css={`
          text-align: center;
          font-weight: 900;

          ${mq.mobile} {
            font-size: 0.79rem;
          }
        `}
      >
        {quote.product.name}
      </div>
      <PremiumButton
        quote={quote}
        css={`
          font-size: 0.83rem;
          width: 100%;
        `}
      />
    </div>
  );
}
