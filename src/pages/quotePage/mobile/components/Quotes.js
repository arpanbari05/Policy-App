import { useState, useRef, useEffect } from "react";
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
  useFrontendBoot,
} from "../../../../customHooks";
import useOutsiteClick from "../../../../customHooks/useOutsideClick";
import "styled-components/macro";
import { Button, PremiumButton } from "../../../../components";
import { mergeQuotes, numberToDigitWord } from "../../../../utils/helper";
import ProductDetailsModal from "../../../../components/ProductDetails/ProductDetailsModal";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa";
import { Collapse, OverlayTrigger, Tooltip } from "react-bootstrap";
import { IoRadioButtonOff, IoRadioButtonOn } from "react-icons/io5";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { CompareQuoteTrayItem, CompareTrayAdd } from "../../components";
import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuotesToShare,
  removeQuoteFromShare,
  replaceShareQuotes,
} from "../../quote.slice";
import ShareQuoteModal from "../../../../components/ShareQuoteModal";

export function Quotes({ sortBy }) {
  const { data, isLoading, isNoQuotes } = useGetQuotes();

  const { mergedQuotes } = useQuotes({ quotesData: data, sortBy });

  const { shareType } = useSelector(state => state.quotePage);

  const dispatch = useDispatch();

  const compareSlot = useCompareSlot({ maxLength: 2 });

  const { data: unmergedQuotes } = useGetQuotes();

  const allMergedQuotes = unmergedQuotes
    ?.map(quote => mergeQuotes(quote.data.data))
    ?.flat();

  useEffect(() => {
    if (shareType.value === "quotation_list") {
      dispatch(replaceShareQuotes(allMergedQuotes));
    } else if (shareType.value === "specific_quotes") {
      dispatch(replaceShareQuotes([]));
    }
  }, [shareType]);

  if (isNoQuotes) return <p>No quotes found!</p>;

  const isQuotesOnCompare = compareSlot.quotes.length;

  return (
    <div className="p-2 mt-4">
      <ShareQuoteModal shareQuotes stage="QUOTE" hideBtn />
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
            cashlessHospitalsCount={icQuotes?.cashless_hospitals_count}
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
          // gap: 1em;
        `}
      >
        {quotes.map((quote, idx) => (
          <CompareQuoteTrayItem quote={quote} onRemove={onRemove} key={idx} />
        ))}
        {_.range(2 - quotes.length).map((_, idx) => (
          <CompareTrayAdd key={idx} />
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

function QuoteCards({ quotesData, cashlessHospitalsCount, compare, ...props }) {
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
      css={`
        margin-bottom: 1.8em;
      `}
      className={`position-relative mt-3`}
      {...props}
    >
      <div
        css={`
          box-shadow: ${boxShadows.seven};
          border: 1px solid #ddd;
          border-radius: 0.6em;
        `}
      >
        <QuoteCard
          cashlessHospitalsCount={cashlessHospitalsCount}
          {...getQuoteCardProps(firstQuote)}
          isFirstQuote
        />
        <Collapse in={morePlansToggle.isOn}>
          <div>
            {collapsedQuotes.map(quotes => (
              <div className="mt-3" key={Object.values(quotes)[0].product.id}>
                <QuoteCard
                  cashlessHospitalsCount={cashlessHospitalsCount}
                  {...getQuoteCardProps(quotes)}
                />
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

function QuoteCard({
  quotes,
  cashlessHospitalsCount,
  compare = {},
  isFirstQuote = false,
  ...props
}) {
  const [defaultActiveKey, setdefaultActiveKey] = useState(
    "mobile-plan-details",
  );
  const { colors } = useTheme();

  const {
    quote,
    logoSrc,
    deductibles,
    selectedDeductible,
    selectedSumInsured,
    sumInsureds,
    handleDeductibleChange,
    handleSumInsuredChange,
  } = useQuoteCard({
    quotes,
  });

  const [isShare, setIsShare] = useState(false);

  const dispatch = useDispatch();

  const { shareType, quotesToShare } = useSelector(state => state.quotePage);

  const productDetailsToggle = useToggle(false);

  const { journeyType } = useFrontendBoot();

  useEffect(() => {
    const isInShare = quotesToShare?.find(
      shareQuote => shareQuote[0]?.product?.id === quote?.product?.id,
    );
    setIsShare(isInShare ? true : false);
  }, [quotesToShare, shareType]);

  if (!quote) return null;

  const isCompareQuote = compare.checkFn(quote);

  const handleCompareChange = evt => {
    compare.onChange && compare.onChange(evt.target.checked, quote, evt);
  };

  const handleProductDetailsModal = defaultKey => {
    productDetailsToggle.on();
    setdefaultActiveKey(defaultKey);
  };

  const handleShareQuoteChange = evt => {
    const { checked } = evt.target;
    if (checked) {
      dispatch(setQuotesToShare(quotes));
    } else {
      dispatch(removeQuoteFromShare(quotes));
    }
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
        {shareType.value === "specific_quotes" ? (
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
              {isShare ? <IoRadioButtonOn /> : <IoRadioButtonOff />}
            </span>
            Share
            <input
              className="visually-hidden"
              type="checkbox"
              checked={isShare}
              onChange={handleShareQuoteChange}
            />
          </label>
        ) : (
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
        )}
        <button
          onClick={() => handleProductDetailsModal("mobile-plan-details")}
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
      {quote?.usp_message?.length > 0 && (
        <div
          css={`
            background: ${colors.secondary_color};
            padding: 3px 12px;
            border-radius: 0.6rem 0.6rem 0 0;
            color: white;
            font-size: 10px;
            text-align: center;
            // width: max-content;
          `}
        >
          {quote?.usp_message[0]}
        </div>
      )}
      <div className="p-2 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src={logoSrc}
            alt={quote.company_alias}
            css={`
              width: 2.73em;
              height: 2em;
              object-fit: contain;
              margin-right: 6px;
            `}
          />
          <div>
            <div
              css={`
                font-size: 0.85rem;
                font-weight: 900;
              `}
            >
              {quote.product.name}
            </div>
            {journeyType === "top_up" && (
              <>
                <div
                  css={`
                    font-size: 0.79rem;
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
                <div
                  css={`
                    font-size: 0.79rem;
                  `}
                >
                  Cover:
                  <select
                    value={selectedSumInsured}
                    onChange={evt =>
                      handleSumInsuredChange({ value: evt.target.value })
                    }
                  >
                    {sumInsureds.map(cover => (
                      <option key={cover} value={cover}>
                        {numberToDigitWord(cover)}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {journeyType === "health" && (
              <>
                <div
                  css={`
                    font-size: 0.79rem;
                  `}
                >
                  Cover:
                  <select
                    value={selectedSumInsured}
                    onChange={evt =>
                      handleSumInsuredChange({ value: evt.target.value })
                    }
                  >
                    {sumInsureds.map(cover => (
                      <option key={cover} value={cover}>
                        {numberToDigitWord(cover)}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
        <div>
          <PremiumButton
            displayTenure={false}
            quote={quote}
            className="px-3"
            css={`
              font-size: 13px;
              width: 7.3em;
              margin-left: 0.6em;
            `}
          />
        </div>
      </div>
      <QuoteFeatures
        handleNavigate={() => handleProductDetailsModal("mobile-plan-details")}
        features={quote.features}
        cashlessHospitalsCount={cashlessHospitalsCount}
      />
      {productDetailsToggle.isOn && (
        <ProductDetailsModal quote={quote} onClose={productDetailsToggle.off} />
      )}
    </div>
  );
}

function QuoteFeatures({
  features = [],
  cashlessHospitalsCount,
  handleNavigate = () => {},
}) {
  const { colors } = useTheme();
  features = features.filter((feature, index) =>
    featuresDisplayedOnQuoteCard.includes(feature.code),
  );
  return (
    <div
      className="p-2 d-flex flex-wrap"
      css={`
        border-radius: 0 0 0.6em 0.6em;
        background-color: ${colors.primary_shade};
      `}
    >
      {features.slice(1, 3).map((feature, index) => (
        <QuoteFeature feature={feature} key={feature.name} index={index} />
      ))}
      {features.slice(0, 1).map((feature, index) => (
        <QuoteFeature
          feature={feature}
          key={feature.name}
          value={cashlessHospitalsCount}
          index={index}
          onNavigate={handleNavigate}
        />
      ))}
      {features.slice(3).map((feature, index) => (
        <QuoteFeature feature={feature} key={feature.name} index={index} />
      ))}
    </div>
  );
}

function QuoteFeature({ feature, value, index, onNavigate }) {
  const { colors } = useTheme();
  return (
    <div
      className="px-1 d-flex"
      css={`
        font-size: 0.75rem;
        :not(:last-child) {
          border-right: 1px solid ${colors.border.one};
        }

        @media (max-width: 400px) {
          font-size: 11px;
        }
      `}
    >
      {feature.name}:
      <span
        className="mx-1"
        css={`
          color: ${colors.primary_color};
        `}
        // onClick={onNavigate}
      >
        {value || feature.value}
      </span>
      {QuoteCardDataset(feature.description, index, colors.primary_color)}
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

export function QuoteCardDataset(description, index, PrimaryColor) {
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);
  useOutsiteClick(target, () => setShowTooltip(false));

  const renderTooltip = props => <Tooltip {...props}>{description}</Tooltip>;
  const toggleTooltip = () => {
    setShowTooltip(prev => !prev);
  };

  return (
    <span
      className={"feature-cell"}
      css={`
        margin-right: 5px;
      `}
    >
      <span
        css={`
          color: ${PrimaryColor};
        `}
      >
        <OverlayTrigger
          placement={"bottom"}
          overlay={renderTooltip}
          target={target.current}
          show={showTooltip}
        >
          <span
            ref={target}
            onClick={toggleTooltip}
            style={{ position: "relative", top: "-1px" }}
          >
            <AiOutlineInfoCircle size={12} />
          </span>
        </OverlayTrigger>
      </span>
    </span>
  );
}
