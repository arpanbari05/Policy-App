import { useEffect, useState } from "react";
import { Col, Collapse, OverlayTrigger, Tooltip } from "react-bootstrap";
import { SeeText } from "./QuoteCard.style";
import "styled-components/macro";
import { useCompanies, useTheme, useToggle } from "../../../customHooks";
import ProductDetailsModal from "../../../components/ProductDetails/ProductDetailsModal";
import { PremiumButton } from "../../../components";
import { numberToDigitWord } from "../../../utils/helper";
import { uniq } from "lodash";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { quoteFeatures } from "../../../test/data/quoteFeatures";
import Select from "react-select";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RiInformationLine } from "react-icons/ri";

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
      <QuoteCard {...getQuoteCardProps(firstQuote)} sortBy={sortBy} />
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
                  sortBy={sortBy}
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
              font-size: 0.79rem;
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
  sortBy,
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
    : quotes.map(quote => parseInt(quote.sum_insured)).sort((a, b) => a - b);

  const [selectedSumInsured, setSelectedSumInsured] = useState();
  const [defaultActiveKey, setdefaultActiveKey] = useState("plan-details");

  const quote = quotes.find(quote =>
    isDeductibleJourney
      ? parseInt(quote.deductible) === parseInt(selectedDeductible) &&
        parseInt(quote.sum_insured) === parseInt(selectedSumInsured)
      : parseInt(quote.sum_insured) === parseInt(selectedSumInsured),
  );

  useEffect(() => {
    setSelectedSumInsured(sumInsureds[0]);
  }, [sortBy]); // SETS MIN-SUM-INSURED OPTION AS DEFAULT SELECTED

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

  let features = isDeductibleJourney ? quoteFeatures : quote.features;
  features = features.filter(feature =>
    featuresDisplayedOnQuoteCard.includes(feature.code),
  );

  // const handleSeeDetailsClick = (clickedFrom) => {
  //   handleSeeDetails(
  //     {
  //       quote: quote,
  //       activeSum: activeCover,
  //     },
  //     clickedFrom
  //   );
  //   const selectedPlan = {
  //     company_alias: quote?.company_alias,
  //     logo: quote?.logo,
  //     product: quote?.product,
  //     total_premium: quote?.total_premium[activeCover],
  //     premium: quote?.premium[activeCover],
  //     sum_insured: quote?.sum_insured[activeCover],
  //     tax_amount: quote?.tax_amount[activeCover],
  //     tenure: quote?.tenure[activeCover],
  //   };

  //   dispatch(
  //     saveSelectedPlan({
  //       ...selectedPlan,
  //       product_id: selectedPlan.product?.id,
  //     })
  //   );
  // };

  return (
    <div {...props}>
      <div
        className="d-flex align-items-center"
        css={`
          min-height: 140px;
          padding-top: 8px;
          padding-bottom: 11px;
        `}
      >
        <div
          className="d-flex flex-column align-items-center justify-content-between"
          css={`
            flex: 1;
            gap: 12px;
            border-right: 1px solid ${colors.border.one};
          `}
        >
          <img
            src={logoSrc}
            alt={quote.company_alias}
            css={`
              min-width: 4em;
              max-height: 3em;
            `}
          />
          <span
            className="px-2 text-center"
            css={`
              font-weight: 900;
              font-size: 0.8rem;
            `}
          >
            {quote.product.name}
          </span>
          <button
            onClick={() => {
              productDetailsModal.on();
              setdefaultActiveKey("plan-details");
            }}
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
          className="d-grid mx-3"
          css={`
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 1fr);
            flex: 2;
            row-gap: 15px;
            column-gap: 5px;
            margin-bottom: 10px;
          `}
        >
          {features.slice(1, 3).map(feature => (
            <QuoteFeature key={feature.code} feature={feature} />
          ))}
          {features.slice(0, 1).map(feature => (
            <QuoteFeature
              key={feature.code}
              feature={feature}
              icon={<IoIosArrowForward />}
              onNavigate={() => {
                productDetailsModal.on();
                setdefaultActiveKey("cashless-hospitals");
              }}
            />
          ))}
          {features.slice(3).map(feature => (
            <QuoteFeature key={feature.code} feature={feature} />
          ))}
        </div>
        <div
          css={`
            flex: 1;
            border-left: 1px solid ${colors.border.one};
          `}
        >
          <div
            className="px-3 d-flex flex-column align-items-center"
            css={`
              gap: ${isDeductibleJourney ? ".6rem" : "0.8em"};
            `}
          >
            <PremiumButton quote={quote} />
            {isDeductibleJourney && (
              <div
                className="rounded p-1 w-100 d-flex justify-content-between"
                css={`
                  border: 1px solid ${colors.border.one};
                `}
              >
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
                <QuoteCardOption info label={"Cover:"}>
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
            )}
            {!isDeductibleJourney && (
              <div
                className="d-flex align-items-center justify-content-center gap-2"
                css={`
                  & > * {
                    min-width: 80px;
                  }
                `}
              >
                <span
                  style={{ minWidth: "auto", fontWeight: "bold", fontSize: 13 }}
                >
                  Cover:
                </span>
                <QuoteCardSelect
                  options={sumInsureds.map(sumInsured => ({
                    value: sumInsured,
                    label: numberToDigitWord(sumInsured).replace("₹", ""),
                  }))}
                  value={{
                    value: selectedSumInsured,
                    label: numberToDigitWord(selectedSumInsured).replace(
                      "₹",
                      "",
                    ),
                  }}
                  onChange={handleSumInsuredChange}
                />
              </div>
            )}
            <div
              css={`
                font-size: 0.83rem;
              `}
            >
              <label
                className="d-flex align-items-center rounded"
                htmlFor={quote.product.id + quote.total_premium}
                css={`
                  color: ${colors.font.one};
                  font-weight: 900;
                  cursor: pointer;
                  // background-color: ${colors.secondary_shade};
                `}
              >
                {/* <span
                  css={`
                    font-size: 1.27rem;
                    margin-right: 0.3em;
                    color: ${colors.primary_color};
                  `}
                > */}
                {isCompareQuote ? (
                  <IoCheckmarkCircleSharp
                    color={colors.primary_color}
                    style={{ marginRight: 3 }}
                    size={20}
                  />
                ) : (
                  // <BsCircleFill
                  //   css={`
                  //     color: white;
                  //   `}
                  // />
                  <div
                    css={`
                      width: 17px;
                      height: 17px;
                      border: 1px solid ${colors.primary_color};
                      border-radius: 50%;
                      margin: 1px 5px 1px 1px;
                    `}
                  />
                )}
                {/* </span> */}
                <span
                  css={`
                    margin-top: 2px;
                  `}
                >
                  Compare
                </span>
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
        </div>
      </div>
      {productDetailsModal.isOn && (
        <ProductDetailsModal
          quote={quote}
          onClose={productDetailsModal.off}
          defaultActiveKey={defaultActiveKey}
        />
      )}
    </div>
  );
}

function QuoteCardSelect({ ...props }) {
  return (
    <Select
      isSearchable={false}
      components={{ DropdownIndicator: FaChevronDown }}
      styles={{
        option: provided => ({
          ...provided,
          fontSize: "13px",
          fontWeight: "bold",
        }),
        menu: provided => ({
          ...provided,
          fontSize: "13px",
          fontWeight: "bold",
        }),
        valueContainer: provided => ({
          ...provided,
          padding: 0,
          fontSize: "13px",
          fontWeight: "bold",
        }),
        indicatorSeparator: () => ({ display: "none" }),
        dropdownIndicator: provided => ({
          ...provided,
          padding: 0,
          color: "black",
          fontSize: "13px",
          fontWeight: "bold",
        }),
        control: provided => ({
          ...provided,
          fontSize: "13px",
          fontWeight: "bold",
          border: "none",
          minHeight: "initial",
        }),
      }}
      {...props}
    />
  );
}

function QuoteCardOption({ label, children, info = false, ...props }) {
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
          display: flex;
          justify-content: space-between;
        `}
      >
        <span>{label}</span>
        {info && (
          <RiInformationLine
            style={{ cursor: "pointer" }}
            color={colors.primary_color}
          />
        )}
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

function QuoteFeature({ feature, icon, onNavigate }) {
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
            font-size: 0.75rem;
            display: flex;
            align-items: center;
            cursor: pointer;
          `}
          onClick={onNavigate}
        >
          {feature.value}
          {icon}
        </div>
      </div>
    </OverlayTrigger>
  );
}
