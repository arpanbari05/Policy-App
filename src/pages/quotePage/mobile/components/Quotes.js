import CardSkeletonLoader from "../../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import {
  useGetQuotes,
  useQuoteCard,
  useQuotes,
  useTheme,
  useToggle,
} from "../../../../customHooks";
import "styled-components/macro";
import { PremiumButton } from "../../../../components";
import { numberToDigitWord } from "../../../../utils/helper";
import ProductDetailsModal from "../../../../components/ProductDetails/ProductDetailsModal";

export function Quotes({ sortBy }) {
  const { data, isLoading, isNoQuotes } = useGetQuotes();

  const { mergedQuotes } = useQuotes({ quotesData: data, sortBy });

  if (isNoQuotes) return <p>No quotes found!</p>;

  return (
    <div
      className="p-2 mt-2 d-flex flex-column"
      css={`
        gap: 0.6em;
      `}
    >
      {mergedQuotes.map(icQuotes => (
        <QuoteCards key={icQuotes.company_alias} quotesData={icQuotes.data} />
      ))}
      {isLoading ? <CardSkeletonLoader /> : null}
    </div>
  );
}

function QuoteCards({ quotesData, ...props }) {
  const morePlansToggle = useToggle(false);

  const { boxShadows } = useTheme();

  const mergedQuotes = quotesData.data;

  if (!mergedQuotes.length) return null;

  const firstQuote = mergedQuotes[0];

  const collapsedQuotes = mergedQuotes.slice(1);

  return (
    <div {...props}>
      <div
        css={`
          box-shadow: ${boxShadows.seven};
          border: 1px solid #ddd;
          border-radius: 0.6em;
          overflow: hidden;
        `}
      >
        <QuoteCard quotes={firstQuote} />
      </div>
    </div>
  );
}

function QuoteCard({ quotes, onCompareChange, ...props }) {
  const { colors } = useTheme();
  const {
    quote,
    logoSrc,
    deductibles,
    selectedDeductible,
    handleDeductibleChange,
  } = useQuoteCard({
    quotes,
  });

  const productDetailsModal = useToggle(false);

  if (!quote) return null;

  return (
    <div>
      <div className="p-2 d-flex align-items-center justify-content-between">
        <div
          className="d-flex"
          css={`
            gap: 1em;
          `}
        >
          <img
            src={logoSrc}
            alt={quote.company_alias}
            css={`
              width: 2.73em;
              object-fit: contain;
            `}
          />
          <div>
            <div
              css={`
                font-size: 0.66rem;
                font-weight: 900;
              `}
            >
              {quote.product.name}
            </div>
            <div
              css={`
                font-size: 0.73rem;
              `}
            >
              Deductible:
              <select
                value={selectedDeductible}
                onChange={evt =>
                  handleDeductibleChange({ value: evt.target.value })
                }
              >
                {deductibles.map(deductible => (
                  <option key={deductible} value={deductible}>
                    {numberToDigitWord(deductible)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div>
          <PremiumButton
            displayTenure={false}
            quote={quote}
            className="px-3"
            css={`
              font-size: 0.79rem;
              width: 7.3em;
              margin-left: 0.6em;
            `}
          />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-end">
        <button
          onClick={productDetailsModal.on}
          css={`
            border: none;
            outline: none;
            color: ${colors.primary_color};
            padding: 0px 10px;
            text-decoration: underline;
            font-size: 15px;
          `}
        >
          {` See details >`}
        </button>
      </div>

      <QuoteFeatures features={quote.features} />
      {productDetailsModal.isOn && (
        <ProductDetailsModal quote={quote} onClose={productDetailsModal.off} />
      )}
    </div>
  );
}

function QuoteFeatures({ features = [] }) {
  const { colors } = useTheme();
  return (
    <div
      className="p-2 d-flex flex-wrap"
      css={`
        background-color: ${colors.primary_shade};
      `}
    >
      {features.map(feature =>
        featuresDisplayedOnQuoteCard.includes(feature.code) ? (
          <QuoteFeature feature={feature} key={feature.name} />
        ) : null,
      )}
    </div>
  );
}

function QuoteFeature({ feature }) {
  const { colors } = useTheme();
  return (
    <div
      className="px-1 d-flex"
      css={`
        font-size: 0.79rem;
        :not(:last-child) {
          border-right: 1px solid ${colors.border.one};
        }
      `}
    >
      {feature.name}:
      <span
        className="mx-1"
        css={`
          color: ${colors.primary_color};
        `}
      >
        {feature.value}
      </span>
    </div>
  );
}

const featuresDisplayedOnQuoteCard = [
  "cashless_hospitals",
  "room_rent_charges",
  "no_claim_bonus",
  "pre_existing_disease_cover",
  "co_payment",
];
