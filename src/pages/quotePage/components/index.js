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
      className="d-flex align-items-center p-3 rounded position-relative"
      css={`
        background-color: ${colors.secondary_shade};
        width: 20em;
        gap: 0.6em;

        ${mq.mobile} {
          width: auto;
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
        width: 20em;
        gap: 1em;
        border: 1px dashed ${colors.border.one};
        text-align: center;

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
