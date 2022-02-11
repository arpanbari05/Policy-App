import { useEffect, useState } from "react";
import { Col, Collapse, OverlayTrigger, Tooltip } from "react-bootstrap";
import { SeeText } from "./QuoteCard.style";
import "styled-components/macro";
import { useCompanies, useTheme, useToggle } from "../../../customHooks";
import ProductDetailsModal from "../../../components/ProductDetails/ProductDetailsModal";
import { PremiumButton } from "../../../components";
import { mergeQuotes, numberToDigitWord } from "../../../utils/helper";
import { uniq } from "lodash";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { GiCircle } from "react-icons/gi";
import { quoteFeatures } from "../../../test/data/quoteFeatures";
import Select from "react-select";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";

const featuresDisplayedOnQuoteCard = [
  "cashless_hospitals",
  "room_rent_charges",
  "no_claim_bonus",
  "pre_existing_disease_cover",
  "co_payment",
];

const renderTooltip = description => <Tooltip>{description}</Tooltip>;

function QuoteCards({ quotesData, sortBy, compare, ...props }) {
  const { colors } = useTheme();

  const [show, setShow] = useState(false);

  // const mergedQuotes = mergeQuotes(quotesData.data, { sortBy });
  const mergedQuotes = quotesData.data;

  if (!mergedQuotes.length) return null;

  const firstQuote = mergedQuotes[0];

  const collapsedQuotes = mergedQuotes.slice(1);

  const handleCompareChange = ({ checked, quote }) => {
    if (checked) {
      compare.addQuote(quote);
      return;
    }

    compare.removeQuote(quote);
  };

  const getQuoteCardProps = quotes => ({
    quotes,
    compare: {
      checkFn: compare.isCompareQuote,
      onChange: handleCompareChange,
    },
  });

  return (
    <div
      className="position-relative"
      css={`
        box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.16);
        background-color: #fff;
        &:hover {
          box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.21);
        }
      `}
      {...props}
    >
      <QuoteCard {...getQuoteCardProps(firstQuote)} />
      <Collapse in={show}>
        <div id="collapseOne">
          <div
            className="card-body card_body_padding margin_bottom_more_plan_card"
            css={`
              margin-top: 0px;
              padding: 0px;
            `}
          >
            <Col md={12}>
              {collapsedQuotes.map(quote => (
                <QuoteCard
                  {...getQuoteCardProps(quote)}
                  key={Object.values(quote)[0].product.id}
                />
              ))}
            </Col>
          </div>
        </div>
      </Collapse>
      {!!collapsedQuotes.length && (
        <div
          className="px-4 pt-1"
          css={`
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translate(-50%, -100%);
            background-color: ${colors.primary_shade};
            border-radius: 1.6em 1.6em 0 0;
          `}
        >
          <SeeText
            css={`
              border-bottom: none !important;
              cursor: pointer;
              font-size: 12px;
            `}
            onClick={() => {
              setShow(!show);
            }}
          >
            {collapsedQuotes.length} More Plans{" "}
            {show ? <FaChevronUp /> : <FaChevronDown />}
          </SeeText>
        </div>
      )}
    </div>
  );
}

export default QuoteCards;

function getDeductibles(quotes = []) {
  return uniq(quotes.map(quote => quote.deductible));
}

function QuoteCard({
  quotes = [],
  compare: { checkFn, onChange } = {},
  ...props
}) {
  const { colors } = useTheme();

  const isDeductibleJourney = quotes[0]?.deductible;

  const deductibles = getDeductibles(quotes);

  const [selectedDeductible, setSelectedDeductible] = useState(deductibles[0]);

  const sumInsureds = isDeductibleJourney
    ? quotes
        .filter(
          quote => parseInt(quote.deductible) === parseInt(selectedDeductible),
        )
        .map(quote => parseInt(quote.sum_insured))
        .sort((a, b) => a - b)
    : quotes.map(quote => parseInt(quote.sum_insured));

  const [selectedSumInsured, setSelectedSumInsured] = useState(sumInsureds[0]);

  const quote = quotes.find(quote =>
    isDeductibleJourney
      ? parseInt(quote.deductible) === parseInt(selectedDeductible) &&
        parseInt(quote.sum_insured) === parseInt(selectedSumInsured)
      : parseInt(quote.sum_insured) === parseInt(selectedSumInsured),
  );

  const { getCompany } = useCompanies();

  useEffect(() => {
    if (!quote) {
      setSelectedSumInsured(parseInt(sumInsureds[0]));
      // setSelectedDeductible(parseInt(deductibles[0]));
    }
  }, [quote, quotes, sumInsureds, deductibles]);

  const productDetailsModal = useToggle(false);

  if (!quote) return null;

  const isCompareQuote = checkFn(quote);

  const { logo: logoSrc } = getCompany(quote.company_alias);

  const handleSumInsuredChange = evt => {
    const { value } = evt;

    setSelectedSumInsured(parseInt(value));
  };

  const handleDeductibleChange = evt => {
    const { value } = evt;

    setSelectedDeductible(parseInt(value));
  };

  const handleCompareChange = evt => {
    const { checked } = evt.target;
    onChange && onChange({ checked, quote });
  };

  const features = isDeductibleJourney ? quoteFeatures : quote.features;

  return (
    <div {...props}>
      <div className="d-flex py-3">
        <div
          className="d-flex flex-column align-items-center justify-content-between"
          css={`
            flex: 1;
          `}
        >
          <img
            src={logoSrc}
            alt={quote.company_alias}
            css={`
              max-width: 5em;
              max-height: 3em;
            `}
          />
          <span
            className="px-2 text-center"
            css={`
              font-weight: 900;
              font-size: 0.88rem;
            `}
          >
            {quote.product.name}
          </span>
          <button
            onClick={productDetailsModal.on}
            type="button"
            className="p-0 border-0 border-bottom"
            css={`
              background: none;
              color: ${colors.primary_color};
              border-color: inherit !important;
              line-height: 1;
              font-size: 0.83rem;
            `}
          >
            See Details
          </button>
        </div>
        <div
          className="d-flex flex-wrap px-3"
          css={`
            flex: 2;
            border-left: 1px solid;
            border-right: 1px solid;
            border-color: ${colors.border.one};
          `}
        >
          {features.map(feature =>
            featuresDisplayedOnQuoteCard.includes(feature.code) ? (
              <QuoteFeature key={feature.code} feature={feature} />
            ) : null,
          )}
          <div
            css={`
              font-size: 0.83rem;
            `}
          >
            <label
              className="d-flex align-items-center px-3 py-1 rounded"
              htmlFor={quote.product.id + quote.total_premium}
              css={`
                color: ${colors.font.one};
                font-weight: 900;
                cursor: pointer;
                background-color: ${colors.secondary_shade};
              `}
            >
              <span
                css={`
                  font-size: 1.27rem;
                  margin-right: 0.3em;
                  color: ${colors.primary_color};
                `}
              >
                {isCompareQuote ? (
                  <IoCheckmarkCircleSharp />
                ) : (
                  <BsCircleFill
                    css={`
                      color: white;
                    `}
                  />
                )}
              </span>
              <span className="mt-1">Compare</span>
            </label>
            <input
              className="visually-hidden"
              type={"checkbox"}
              id={quote.product.id + quote.total_premium}
              name="compare-quote"
              checked={isCompareQuote}
              onChange={handleCompareChange}
            />
          </div>
        </div>
        <div
          css={`
            flex: 1;
          `}
        >
          <div
            className="px-3 d-flex flex-column align-items-center"
            css={`
              gap: 0.6em;
            `}
          >
            <PremiumButton quote={quote} />
            <div
              className="rounded p-1 w-100 d-flex justify-content-between"
              css={`
                border: 1px solid ${colors.border.one};
              `}
            >
              {isDeductibleJourney ? (
                <QuoteCardOption label={"Deductible:"}>
                  <QuoteCardSelect
                    options={deductibles.map(deductible => ({
                      value: deductible,
                      label: numberToDigitWord(deductible)
                        .replace("₹", "")
                        .replace("Lakh", "L"),
                    }))}
                    value={{
                      value: selectedDeductible,
                      label: numberToDigitWord(selectedDeductible)
                        .replace("₹", "")
                        .replace("Lakh", "L"),
                    }}
                    onChange={handleDeductibleChange}
                  />
                </QuoteCardOption>
              ) : null}
              <QuoteCardOption label={"Cover:"}>
                <QuoteCardSelect
                  options={sumInsureds.map(sumInsured => ({
                    value: sumInsured,
                    label: numberToDigitWord(sumInsured)
                      .replace("₹", "")
                      .replace("Lakh", "L"),
                  }))}
                  value={{
                    value: selectedSumInsured,
                    label: numberToDigitWord(selectedSumInsured)
                      .replace("₹", "")
                      .replace("Lakh", "L"),
                  }}
                  onChange={handleSumInsuredChange}
                />
              </QuoteCardOption>
            </div>
          </div>
        </div>
      </div>
      {productDetailsModal.isOn && (
        <ProductDetailsModal quote={quote} onClose={productDetailsModal.off} />
      )}
    </div>
  );
}

function QuoteCardSelect({ ...props }) {
  return (
    <Select
      isSearchable={false}
      styles={{
        valueContainer: provided => ({ ...provided, padding: 0 }),
        indicatorSeparator: () => ({ display: "none" }),
        dropdownIndicator: provided => ({
          ...provided,
          padding: 0,
          color: "black",
          fontSize: "0.79rem",
        }),
        control: provided => ({
          ...provided,
          border: "none",
          minHeight: "initial",
        }),
      }}
      {...props}
    />
  );
}

function QuoteCardOption({ label, children, ...props }) {
  const { colors } = useTheme();

  return (
    <div
      className="px-1"
      css={`
        flex: 1;
        :not(&:last-child) {
          border-right: 1px solid ${colors.border.one};
        }
      `}
      {...props}
    >
      <div
        css={`
          font-size: 0.79rem;
          color: ${colors.font.two};
        `}
      >
        {label}
      </div>
      <div
        css={`
          font-size: 0.83rem;
        `}
      >
        {children}
      </div>
    </div>
  );
}

const shortDescriptionFeatures = [
  "pre_existing_disease_cover",
  "co_payment",
  "room_rent_charges",
];

function QuoteFeature({ feature }) {
  const showShortDescription = shortDescriptionFeatures.includes(feature.code);
  const description = showShortDescription
    ? feature.short_description
    : feature.description;

  const { colors } = useTheme();

  return (
    <OverlayTrigger placement={"right"} overlay={renderTooltip(description)}>
      <div
        css={`
          flex: 0 1 33.3%;
          width: auto;
          margin: 0;
          min-width: auto;
        `}
      >
        <div
          css={`
            font-size: 0.73rem;
            color: ${colors.font.three};
          `}
        >
          {feature.name}
        </div>
        <div
          css={`
            width: auto;
            font-size: 0.79rem;
          `}
        >
          {feature.value}
        </div>
      </div>
    </OverlayTrigger>
  );
}
