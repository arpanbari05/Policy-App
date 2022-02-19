import CardSkeletonLoader from "../../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import {
  useCompareSlot,
  useGetQuotes,
  useQuoteCard,
  useQuotes,
  useQuotesCompare,
  useTheme,
  useToggle,
  useUrlEnquiry,
} from "../../../../customHooks";
import "styled-components/macro";
import { Button, PremiumButton } from "../../../../components";
import { numberToDigitWord } from "../../../../utils/helper";
import ProductDetailsModal from "../../../../components/ProductDetails/ProductDetailsModal";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa";
import { Collapse } from "react-bootstrap";
import { IoRadioButtonOff, IoRadioButtonOn } from "react-icons/io5";
import { CompareQuoteTrayItem, CompareTrayAdd } from "../../components";
import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";

export function Quotes({ sortBy }) {
  const { data, isLoading, isNoQuotes } = useGetQuotes();

  const { mergedQuotes } = useQuotes({ quotesData: data, sortBy });

  const compareSlot = useCompareSlot({ maxLength: 2 });

  if (isNoQuotes) return <p>No quotes found!</p>;

  const isQuotesOnCompare = compareSlot.quotes.length;

  return (
    <div className="p-2 mt-4">
      <div
        className="d-flex flex-column"
        css={`
          padding-bottom: ${isQuotesOnCompare ? "10em" : "0"};
          gap: 2em;
        `}
      >
        {mergedQuotes.map(icQuotes => (
          <QuoteCards
            key={icQuotes.company_alias}
            quotesData={icQuotes.data}
            compare={compareSlot}
          />
        ))}
        {isLoading ? <CardSkeletonLoader /> : null}
      </div>
      {isQuotesOnCompare ? (
        <CompareTray
          quotes={compareSlot.quotes}
          onRemove={compareSlot.remove}
          onClose={compareSlot.clear}
        />
      ) : null}
    </div>
  );
}

function CompareTray({ quotes = [], onRemove, onClose }) {
  const { colors, boxShadows } = useTheme();
  const history = useHistory();
  const { groupCode } = useParams();

  const { getUpdateCompareQuotesMutation } = useQuotesCompare();

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const [updateCompareQuotes] = getUpdateCompareQuotesMutation(
    parseInt(groupCode),
  );
  const handleCompareClick = () => {
    updateCompareQuotes(quotes);
    history.push(getUrlWithEnquirySearch(`/compare/${groupCode}`));
  };
  return (
    <div
      className="position-fixed p-2 w-100"
      css={`
        bottom: 0;
        left: 0;
        background-color: #fff;
        z-index: 999;
        box-shadow: ${boxShadows.six};
      `}
    >
      <div className="d-flex justify-content-between">
        <h1
          css={`
            color: ${colors.primary_color};
            font-size: 1rem;
          `}
        >
          Compare Plans
        </h1>
        <button onClick={onClose}>Close</button>
      </div>
      <div
        className="mt-2 d-flex justify-content-around"
        css={`
          gap: 1em;
        `}
      >
        {quotes.map((quote, idx) => (
          <CompareQuoteTrayItem quote={quote} onRemove={onRemove} key={idx} />
        ))}
        {_.range(2 - quotes.length).map(() => (
          <CompareTrayAdd />
        ))}
      </div>
      <Button
        onClick={handleCompareClick}
        disabled={quotes.length < 2}
        className="my-3 w-100"
      >
        Compare Now
      </Button>
    </div>
  );
}

function QuoteCards({ quotesData, compare, ...props }) {
  const morePlansToggle = useToggle(false);

  const { boxShadows } = useTheme();

  const mergedQuotes = quotesData.data;

  if (!mergedQuotes.length) return null;

  const firstQuote = mergedQuotes[0];

  const collapsedQuotes = mergedQuotes.slice(1);

  const handleCompareChange = (checked, quote) => {
    if (!checked) {
      compare.remove(quote);
      return;
    }
    compare.add(quote);
  };

  const getQuoteCardProps = quotes => ({
    quotes,
    compare: {
      checkFn: compare.check,
      onChange: handleCompareChange,
    },
  });

  return (
    <div
      className={`position-relative mt-3 ${
        collapsedQuotes.length ? "mb-4" : ""
      }`}
      {...props}
    >
      <div
        css={`
          box-shadow: ${boxShadows.seven};
          border: 1px solid #ddd;
          border-radius: 0.6em;
        `}
      >
        <QuoteCard {...getQuoteCardProps(firstQuote)} isFirstQuote />
        <Collapse in={morePlansToggle.isOn}>
          <div>
            {collapsedQuotes.map(quotes => (
              <div className="mt-3" key={Object.values(quotes)[0].product.id}>
                <QuoteCard {...getQuoteCardProps(quotes)} />
              </div>
            ))}
          </div>
        </Collapse>
      </div>
      {collapsedQuotes.length ? (
        <button
          onClick={morePlansToggle.toggle}
          className="position-absolute py-1 px-2"
          css={`
            top: 100%;
            left: 50%;
            transform: translate(-50%);
            font-size: 0.79rem;
            border: 1px solid #ddd;
            border-top: none;
            background-color: #fff;
            border-radius: 0 0 1em 1em;
            width: 10em;
          `}
        >
          {morePlansToggle.isOn ? "Hide" : `${collapsedQuotes.length} more`}{" "}
          plans
          <span
            css={`
              margin-left: 0.3em;
            `}
          >
            {morePlansToggle.isOn ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </button>
      ) : null}
    </div>
  );
}

function QuoteCard({ quotes, compare = {}, isFirstQuote = false, ...props }) {
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

  const productDetailsToggle = useToggle(false);

  if (!quote) return null;

  const isCompareQuote = compare.checkFn(quote);

  const handleCompareChange = evt => {
    compare.onChange && compare.onChange(evt.target.checked, quote, evt);
  };

  return (
    <div {...props}>
      <div
        className={`d-flex justify-content-between w-100 ${
          isFirstQuote ? "position-absolute" : "px-2"
        } `}
        css={`
          top: 0;
          transform: ${isFirstQuote ? "translateY(-100%)" : ""};
          font-size: 0.73rem;
        `}
      >
        <label
          className="d-flex align-items-center"
          css={`
            gap: 0.3em;
            ${isFirstQuote
              ? `background-color: ${colors.secondary_shade};
            border-radius: 0 3em 0 0;
            padding: 0.6em;
            padding-right: 2em;`
              : ""}
          `}
        >
          <span
            css={`
              color: ${colors.primary_color};
              font-size: 1rem;
              line-height: 1;
              margin-bottom: 0.2em;
            `}
          >
            {isCompareQuote ? <IoRadioButtonOn /> : <IoRadioButtonOff />}
          </span>
          Compare
          <input
            className="visually-hidden"
            type="checkbox"
            checked={isCompareQuote}
            onChange={handleCompareChange}
          />
        </label>
        <button
          onClick={productDetailsToggle.on}
          className="d-flex align-items-center"
          css={`
            ${isFirstQuote
              ? `background-color: ${colors.secondary_shade};
            border-radius: 3em 0 0 0;
            padding: 0.6em;
            padding-left: 2em;`
              : null}
          `}
        >
          See details <ChevronRightCircle />
        </button>
      </div>
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
      <QuoteFeatures features={quote.features} />
      {productDetailsToggle.isOn && (
        <ProductDetailsModal quote={quote} onClose={productDetailsToggle.off} />
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
        border-radius: 0 0 0.6em 0.6em;
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

function ChevronRightCircle({ css = "", className = "", ...props }) {
  return (
    <span
      className={`d-flex align-items-center justify-content-center rounded-circle mx-1 ${className}`}
      css={`
        font-size: 0.66rem;
        height: 2em;
        width: 2em;
        padding: 0.3em;
        background-color: #fff;
        ${css};
      `}
      {...props}
    >
      <FaChevronRight />
    </span>
  );
}
