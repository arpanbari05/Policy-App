import { useEffect, useState } from "react";
import { Col, Collapse, OverlayTrigger, Tooltip } from "react-bootstrap";
import useQuoteFilter from "./filters/useQuoteFilter";
import {
  CenterBottomToggle,
  SeeText,
  SmallLabel,
  TextWrapper,
  ValueText,
} from "./QuoteCard.style";
import "styled-components/macro";
import {
  useCompanies,
  useQuote,
  useTheme,
  useToggle,
  useUrlEnquiry,
} from "../../../customHooks";
import CartSummaryModal from "../../../components/CartSummaryModal";
import ProductDetailsModal from "../../../components/ProductDetails/ProductDetailsModal";
import { Button } from "../../../components";
import { getDisplayPremium, numberToDigitWord } from "../../../utils/helper";
import { uniq } from "lodash";
import { useHistory } from "react-router-dom";
import { useGetCartQuery } from "../../../api/api";

function mergeQuotes(quotes) {
  const mergedQuotes = {};

  for (let quote of quotes) {
    const {
      product: { id },
    } = quote;

    if (mergedQuotes[id]) {
      mergedQuotes[id] = [...mergedQuotes[id], quote];
      continue;
    }
    mergedQuotes[id] = [quote];
  }

  return mergedQuotes;
}

const featuresDisplayedOnQuoteCard = [
  "cashless_hospitals",
  "room_rent_charges",
  "no_claim_bonus",
  "pre_existing_disease_cover",
  "co_payment",
];

const renderTooltip = description => <Tooltip>{description}</Tooltip>;

function QuoteCards({ quotesData, ...props }) {
  const { colors } = useTheme();

  const [show, setShow] = useState(false);

  const { filterQuotes } = useQuoteFilter();

  const filteredQuotes = filterQuotes(quotesData.data);

  if (!filteredQuotes.length) return null;

  const mergedQuotes = Object.values(mergeQuotes(filteredQuotes));

  if (!mergedQuotes.length) return null;

  const firstQuote = mergedQuotes[0];

  const collapsedQuotes = mergedQuotes.slice(1);

  return (
    <div
      className="position-relative mt-3"
      css={`
        box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.16);
        background-color: #fff;
        &:hover {
          box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.21);
        }
      `}
      {...props}
    >
      <QuoteCard quotes={firstQuote} />
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
                  quotes={quote}
                  key={Object.values(quote)[0].product.id}
                />
              ))}
            </Col>
          </div>
        </div>
      </Collapse>
      {!!collapsedQuotes.length && (
        <CenterBottomToggle
          css={`
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translate(-50%, -100%);
            background-color: ${colors.primary_shade} !important;
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
            <i className={`fas fa-chevron-${show ? "up" : "down"}`} />
          </SeeText>
        </CenterBottomToggle>
      )}
    </div>
  );
}

export default QuoteCards;

function getDeductibles(quotes = []) {
  return uniq(quotes.map(quote => quote.deductible));
}

function QuoteCard({ quotes = [], ...props }) {
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
    if (!quote) setSelectedSumInsured(parseInt(sumInsureds[0]));
  }, [quote, quotes, sumInsureds]);

  const productDetailsModal = useToggle(false);

  if (!quote) return null;

  const { logo: logoSrc } = getCompany(quote.company_alias);

  const handleSumInsuredChange = evt => {
    const { value } = evt.target;

    setSelectedSumInsured(parseInt(value));
  };

  const handleDeductibleChange = evt => {
    const { value } = evt.target;

    setSelectedDeductible(parseInt(value));
  };

  const handleCompareChange = evt => {
    if (evt.target.checked) {
      alert("yes");
    }
  };

  return (
    <div {...props}>
      <div className="d-flex pt-3 pb-2">
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
          className="d-flex flex-wrap pb-3 px-3"
          css={`
            flex: 2;
            border-left: 1px solid;
            border-right: 1px solid;
            border-color: ${colors.border.one};
          `}
        >
          {quote.features.map(feature =>
            featuresDisplayedOnQuoteCard.includes(feature.code) ? (
              <QuoteFeature key={feature.code} feature={feature} />
            ) : null,
          )}
        </div>
        <div
          css={`
            flex: 1;
          `}
        >
          <div
            className="px-4 d-flex flex-column align-items-center"
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
                  <select
                    value={selectedDeductible}
                    onChange={handleDeductibleChange}
                  >
                    {deductibles.map(deductible => (
                      <option value={deductible} key={deductible}>
                        {numberToDigitWord(deductible)}
                      </option>
                    ))}
                  </select>
                </QuoteCardOption>
              ) : null}
              <QuoteCardOption label={"Cover:"}>
                <select
                  value={selectedSumInsured}
                  onChange={handleSumInsuredChange}
                >
                  {sumInsureds.map(sumInsured => (
                    <option value={sumInsured} key={sumInsured}>
                      {numberToDigitWord(sumInsured)}
                    </option>
                  ))}
                </select>
              </QuoteCardOption>
            </div>
            <div
              css={`
                font-size: 0.83rem;
              `}
            >
              <label htmlFor={quote.product.id + quote.total_premium}>
                Compare
              </label>
              <input
                className="visually-hidden"
                type={"checkbox"}
                id={quote.product.id + quote.total_premium}
                name="compare-quote"
                checked={false}
                onChange={handleCompareChange}
              />
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

function PremiumButton({ quote, ...props }) {
  const history = useHistory();

  const cartSummaryModal = useToggle(false);

  const {
    buyQuote,
    queryState: { isLoading },
  } = useQuote();

  const handleBuyClick = () => {
    buyQuote(quote)
      .then(cartSummaryModal.on)
      .catch(() => alert("Something went wrong while buying the quote!"));
  };

  const { data } = useGetCartQuery();

  const { enquiryId } = useUrlEnquiry();

  function gotoProductPage() {
    const groupCodes = data.data.map(cartEntry => cartEntry.group.id);

    const firstGroupWithQuote = Math.min(...groupCodes);

    history.push({
      pathname: `/productdetails/${firstGroupWithQuote}`,
      search: `enquiryId=${enquiryId}`,
    });
  }

  const handleContinueClick = () => {
    gotoProductPage();
  };

  return (
    <div className="w-100">
      <Button
        className="w-100 rounded"
        onClick={handleBuyClick}
        loader={isLoading}
        {...props}
      >
        {getDisplayPremium(quote)}
      </Button>
      {cartSummaryModal.isOn && (
        <CartSummaryModal
          onContine={handleContinueClick}
          onClose={cartSummaryModal.off}
        />
      )}
    </div>
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

  return (
    <OverlayTrigger placement={"right"} overlay={renderTooltip(description)}>
      <TextWrapper
        css={`
          flex: 0 1 33.3%;
          width: auto;
          margin: 0;
          min-width: auto;
        `}
      >
        <SmallLabel
          css={`
            font-size: 11px !important;
          `}
        >
          {feature.name}
        </SmallLabel>
        <ValueText
          css={`
            font-size: 12px !important;
            width: auto;
          `}
        >
          {feature.value}
        </ValueText>
      </TextWrapper>
    </OverlayTrigger>
  );
}
