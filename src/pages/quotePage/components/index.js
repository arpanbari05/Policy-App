import { CircleCloseButton, ScreenTopLoader } from "../../../components";
import { useCompanies, useGetQuotes, useTheme } from "../../../customHooks";
import "styled-components/macro";
import * as mq from "../../../utils/mediaQueries";

export function QuotesLoader() {
  const { isLoading, loadingPercentage } = useGetQuotes();

  return <ScreenTopLoader show={isLoading} progress={loadingPercentage} />;
}

export function CompareQuoteTrayItem({ quote, onRemove }) {
  const { colors } = useTheme();

  const { getCompany } = useCompanies();
  const { logo } = getCompany(quote.company_alias);

  const handleCloseClick = () => onRemove && onRemove(quote);

  return (
    <div
      className="d-flex align-items-center rounded position-relative"
      css={`
        background-color: ${colors.secondary_shade};
        width: 18rem;
        gap: 0.6rem;
        padding: 10px;
        height: 65px;
        font-size: 14px;
        flex: 1;

        @media (max-width: 1390px) {
          width: 17rem;
        }
      `}
    >
      <CircleCloseButton
        placeOnCorner
        onClick={handleCloseClick}
        css={`
          font-size: 0.73rem;
        `}
      />
      <img
        src={logo}
        alt={quote.company_alias}
        css={`
          height: 2em;
          object-fit: contain;
          ${mq.mobile} {
            height: auto;
            width: 2em;
          }
        `}
      />
      <div>
        <div
          css={`
            font-size: 0.89rem;
            font-weight: 900;
            text-overflow: ellipsis;

            ${quote.product.name.length > 30 && "font-size: 0.72rem;"}

            @media (max-width: 480px) {
              font-size: ${quote.product.name.length > 30
                ? "0.69rem;"
                : "0.82rem;"};
            }
          `}
        >
          {quote.product.name}
        </div>
        <div
          css={`
            font-size: 0.79rem;
            color: ${colors.font.three};
          `}
        >
          Cover: {quote.sum_insured}
        </div>
      </div>
    </div>
  );
}

export function CompareTrayAdd(props) {
  const { colors } = useTheme();
  return (
    <div
      className="p-3 rounded"
      css={`
        background-color: #fff;
        width: 18rem;
        gap: 0.6rem;
        border: 1px dashed ${colors.border.one};
        text-align: center;

        @media (max-width: 1286px) {
          width: 17rem;
        }

        ${mq.mobile} {
          width: auto;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}
      {...props}
    >
      Add a plan
    </div>
  );
}
