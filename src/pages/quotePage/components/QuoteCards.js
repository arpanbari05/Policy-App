import { uniq } from "lodash";
import { useEffect, useState } from "react";
import { Col, Collapse, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  FaBookmark,
  FaChevronDown,
  FaChevronUp,
  FaRegBookmark,
} from "react-icons/fa";
import { IoIosArrowForward, IoIosCheckmarkCircle } from "react-icons/io";
import { RiInformationLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import "styled-components/macro";
import { CircleLoader, PremiumButton } from "../../../components";
import ProductDetailsModal from "../../../components/ProductDetails/ProductDetailsModal";
import {
  useCompanies,
  useGetSingleQuote,
  useShortlistedPlans,
  useTheme,
  useToggle,
} from "../../../customHooks";
import {
  SecondaryFont,
  SecondaryFontBold,
  TertiaryFont,
  XSmallFont,
} from "../../../styles/typography";
import { quoteFeatures } from "../../../test/data/quoteFeatures";
import {
  ClickSound,
  numberToDigitWord,
  mergeQuotes,
} from "../../../utils/helper";
import { removeQuoteFromShare, setQuotesToShare } from "../quote.slice";
import { SeeText } from "./QuoteCard.style";
import useFilters from "../components/filters/useFilters";

const featuresDisplayedOnQuoteCard = [
  "cashless_hospitals",
  "room_rent_charges",
  "no_claim_bonus",
  "pre_existing_disease_cover",
  "co_payment",
];

const renderTooltip = (description, className) => (
  <Tooltip className={className}>{description}</Tooltip>
);

function QuoteCards({
  quotesData,
  sortBy,
  compare,
  cashlessHospitalsCount,
  ...props
}) {
  const { colors } = useTheme();

  const [show, setShow] = useState(false);

  const mergedQuotes = quotesData?.data;

  if (!mergedQuotes.length) return null;

  const firstQuote = mergedQuotes[0];

  const collapsedQuotes = mergedQuotes?.slice(1);

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
      <QuoteCard
        {...getQuoteCardProps(firstQuote)}
        sortBy={sortBy}
        cashlessHospitalsCount={cashlessHospitalsCount}
      />
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
                  key={Object.values(quote)[0]?.product.id}
                  sortBy={sortBy}
                  cashlessHospitalsCount={cashlessHospitalsCount}
                />
              ))}
            </Col>
          </div>
        </div>
      </Collapse>
      {!!collapsedQuotes?.length && (
        <div
          className="px-3"
          css={`
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translate(-50%, -100%);
            background-color: ${colors.primary_shade};
            border-radius: 1.6em 1.6em 0 0;
            padding-top: 1px;
          `}
        >
          <SeeText
            css={`
              border-bottom: none !important;
              cursor: pointer;
              font-size: 11px;
            `}
            onClick={() => {
              ClickSound();
              setShow(!show);
            }}
          >
            {!show ? `${collapsedQuotes?.length} More Plans ` : "Hide Plans "}
            {show ? <FaChevronUp /> : <FaChevronDown />}
          </SeeText>
        </div>
      )}
    </div>
  );
}

export default QuoteCards;

function getDeductibles(quotes = []) {
  return uniq(quotes?.map(quote => quote.deductible));
}

function QuoteCard({
  quotes: initialQuotes = [],
  compare: { checkFn, onChange } = {},
  sortBy,
  cashlessHospitalsCount,
  ...props
}) {
  const { colors } = useTheme();

  const { groupCode } = useParams();

  // const [quotes, setQuotes] = useState(initialQuotes);
  const { shareType, quotesToShare } = useSelector(state => state.quotePage);

  const {
    getPlanByGroup,
    addPlanToShortlist,
    removePlanToShortlist,
    canDelete,
  } = useShortlistedPlans();

  const shortlistedQuotes = getPlanByGroup(groupCode);

  const { getSelectedFilter } = useFilters();

  const dispatch = useDispatch();

  const [quotesAndSelectedDeductible, setQuotesAndSelectedDeductible] =
    useState({
      quotes: initialQuotes,
      selectedDeductible: getSelectedFilter("deductible").code,
      selectedSumInsured: null,
    });

  const setSelectedSumInsured = value => {
    setQuotesAndSelectedDeductible(prev => ({
      ...prev,
      selectedSumInsured: value,
    }));
  };

  const { selectedDeductible, quotes, selectedSumInsured } =
    quotesAndSelectedDeductible;

  const isDeductibleJourney = quotes && quotes[0]?.deductible;

  // const deductibles = getDeductibles(quotes);
  const deductibles = [
    ...new Set(
      quotes &&
        quotes[0]?.available_sum_insured_deductibles
          ?.map(data => data.deductible)
          ?.sort((a, b) => a - b),
    ),
  ];

  const [isShare, setIsShare] = useState(false);

  const [isShortlisted, setIsShortListed] = useState(false);

  // const [selectedDeductible, setSelectedDeductible] = useState(
  //   getSelectedFilter("deductible")?.code,
  // );

  const sumInsureds = isDeductibleJourney
    ? // ? [
      //     ...new Set(
      //       quotes[0]?.available_sum_insured_deductibles
      //         ?.filter(data => +data.deductible === +selectedDeductible)
      //         ?.map(data => data.sum_insured),
      //     ),
      //   ]
      // :
      quotes &&
      quotes
        ?.filter(
          quote => parseInt(quote?.deductible) === parseInt(selectedDeductible),
        )
        ?.map(quote => parseInt(quote?.sum_insured))
        ?.sort((a, b) => a - b)
    : quotes?.map(quote => parseInt(quote?.sum_insured)).sort((a, b) => a - b);

  // const [selectedSumInsured, setSelectedSumInsured] = useState();
  const [defaultActiveKey, setdefaultActiveKey] = useState("plan-details");

  const quote = quotes?.find(quote =>
    isDeductibleJourney
      ? parseInt(quote?.deductible) === parseInt(selectedDeductible) &&
        parseInt(quote?.sum_insured) === parseInt(selectedSumInsured)
      : parseInt(quote?.sum_insured) === parseInt(selectedSumInsured),
  );

  useEffect(() => {
    setSelectedSumInsured(sumInsureds && sumInsureds[0]);
    // setSelectedDeductible(getSelectedFilter("deductible")?.code);
    setQuotesAndSelectedDeductible(prev => ({
      ...prev,
      selectedDeductible: getSelectedFilter("deductible")?.code,
    }));
  }, [sortBy]); // SETS MIN-SUM-INSURED OPTION AS DEFAULT SELECTED

  const { getCompany } = useCompanies();

  useEffect(() => {
    if (!quote) {
      setSelectedSumInsured(sumInsureds && parseInt(sumInsureds[0]));
      // setSelectedDeductible(parseInt(deductibles[0]));
    }
  }, [quote, quotes, sumInsureds, deductibles]);

  const productDetailsModal = useToggle(false);

  const { getQuote, isFetching } = useGetSingleQuote();

  useEffect(() => {
    const isInShare = quotesToShare?.find(
      shareQuote => shareQuote[0]?.product?.id === quote?.product?.id,
    );
    setIsShare(isInShare ? true : false);
  }, [quotesToShare, shareType]);

  useEffect(() => {
    const isInShortlisted = shortlistedQuotes?.find(
      q => q?.product?.id === (quote?.product?.id || quotes[0]?.product?.id),
    );
    setIsShortListed(Boolean(isInShortlisted));
  }, [shortlistedQuotes]);

  if (!quote) return null;

  const isCompareQuote = checkFn(quote);

  const { logo: logoSrc } = getCompany(quote?.company_alias);

  const handleSumInsuredChange = evt => {
    ClickSound();
    const { value } = evt;

    setSelectedSumInsured(parseInt(value));
  };

  const handleDeductibleChange = evt => {
    ClickSound();
    const { value } = evt;
    getQuote({
      insurerToFetch: quote?.company_alias,
      sum_insured: quote?.sum_insured,
      deductible: +value,
    })
      .unwrap()
      .then(data => {
        const mergedQuotes = mergeQuotes(data?.data, { sortBy })?.find(
          mq => mq[0]?.product?.id === quote?.product?.id,
        );
        // setSelectedDeductible(parseInt(value));
        const currentSumInsured = mergedQuotes
          ?.filter(quote => parseInt(quote?.deductible) === parseInt(value))
          ?.map(quote => parseInt(quote?.sum_insured))
          ?.sort((a, b) => a - b)[0];

        setQuotesAndSelectedDeductible(() => ({
          quotes: mergedQuotes,
          selectedDeductible: parseInt(value),
          selectedSumInsured: currentSumInsured,
        }));
        // setQuotes(mergedQuotes);
      });
  };

  const handleCompareChange = evt => {
    ClickSound();
    const { checked } = evt.target;
    onChange && onChange({ checked, quote });
  };

  const handleShortListedQuotes = evt => {
    ClickSound();
    const { checked } = evt.target;
    if (checked) {
      setIsShortListed(true);
      addPlanToShortlist({ ...quote, cashlessHospitalsCount, groupCode });
    } else {
      setIsShortListed(false);
      removePlanToShortlist(quote);
    }
  };

  const handleShareQuoteChange = evt => {
    ClickSound();
    const { checked } = evt.target;
    if (checked) {
      dispatch(setQuotesToShare(quotes));
    } else {
      dispatch(removeQuoteFromShare(quotes));
    }
  };

  const shortlistDesc = !canDelete
    ? "Atleast 1 shortlisted plan is mandatory"
    : isShortlisted
    ? "Remove from Shortlisted Plans"
    : "Add to Shortlisted Plans";

  let features = isDeductibleJourney ? quoteFeatures : quote?.features;
  features = features?.filter(feature =>
    featuresDisplayedOnQuoteCard.includes(feature?.code),
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
    <div className="position-relative" id={quote?.company_alias} {...props}>
      <OverlayTrigger
        placement={"right"}
        overlay={renderTooltip(shortlistDesc, "shortlist-tooltip")}
      >
        <label
          css={`
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
          `}
          // htmlFor={`${quote?.company_alias}_shortlisted`}
        >
          <input
            className="visually-hidden"
            checked={isShortlisted}
            type="checkbox"
            onChange={handleShortListedQuotes}
            id={`${quote?.company_alias}_shortlisted`}
            // name={`${quote?.company_alias}_shortlisted`}
          />
          {isShortlisted ? (
            <FaBookmark size={19} color={colors.primary_color} />
          ) : (
            <FaRegBookmark size={19} color={"#444"} />
          )}
        </label>
      </OverlayTrigger>
      {quote?.usp_message?.length > 0 && (
        <div
          css={`
            background: ${colors.secondary_color};
            padding: 3px 13px;
            width: max-content !important;
            font-size: 10px !important;
            color: #fff;
            border-radius: 0 0 100px 0;
          `}
        >
          {quote?.usp_message[0]}
        </div>
      )}
      <div
        className="d-flex align-items-center"
        css={`
          min-height: 139px;
          padding-top: 8px;
          padding-bottom: 11px;
          margin-top: ${quote?.usp_message?.length && "-10px"};
        `}
      >
        <div
          className="d-flex flex-column align-items-center justify-content-between"
          css={`
            flex: 1;
            gap: 12px;
            border-right: 1px solid ${colors.border.one};
            margin-top: 10px;
          `}
        >
          <img
            src={logoSrc}
            alt={quote?.company_alias}
            css={`
              height: 48px;
            `}
          />
          {/* <span
            className="px-2 text-center"
            css={`
              font-weight: 900;
              font-size: 0.8rem;
            `}
          >
            {quote?.product?.name}
          </span> */}
          <SecondaryFontBold
            textCenter
            css={`
              padding: 0 5px;
            `}
          >
            {quote?.product?.name}
          </SecondaryFontBold>
          <SecondaryFont
            as={"button"}
            onClick={() => {
              ClickSound();
              productDetailsModal.on();
              setdefaultActiveKey("plan-details");
            }}
            type="button"
            css={`
              background: none;
              color: ${colors.primary_color};
              border-color: inherit !important;
              line-height: 1;
              padding-bottom: 2px;
              border-bottom: 2px dotted ${colors.primary_color};
            `}
          >
            See Details
          </SecondaryFont>
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
          {features?.slice(1, 3)?.map(feature => (
            <QuoteFeature
              key={feature?.code}
              feature={feature}
              value={feature?.value}
            />
          ))}
          {features?.slice(0, 1)?.map(feature => (
            <QuoteFeature
              key={feature?.code}
              feature={feature}
              icon={<IoIosArrowForward />}
              onNavigate={() => {
                ClickSound();
                productDetailsModal.on();
                setdefaultActiveKey("cashless-hospitals");
              }}
              value={cashlessHospitalsCount}
            />
          ))}
          {features.slice(3).map(feature => (
            <QuoteFeature
              key={feature?.code}
              feature={feature}
              value={feature?.value}
            />
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
            <PremiumButton isFetching={isFetching} quote={quote} />
            {isDeductibleJourney && (
              <div
                className="rounded p-1 w-100 d-flex justify-content-between"
                css={`
                  border: 1px solid ${colors.border.one};
                `}
              >
                <QuoteCardOption label={"Deductible:"}>
                  {deductibles.length > 1 ? (
                    <QuoteCardSelect
                      options={deductibles.map(deductible => ({
                        value: deductible,
                        label: numberToDigitWord(deductible)
                          ?.replace("???", "")
                          ?.replace("Lakh", "L"),
                      }))}
                      defaultValue={{
                        value: selectedDeductible,
                        label: numberToDigitWord(selectedDeductible)
                          ?.replace("???", "")
                          ?.replace("Lakh", "L"),
                      }}
                      onChange={handleDeductibleChange}
                    />
                  ) : (
                    <div
                      css={`
                        font-weight: bold;
                        font-size: 13px;
                        display: flex;
                        gap: 7px;
                      `}
                    >
                      {numberToDigitWord(selectedDeductible)
                        .replace("???", "")
                        .replace("Lakh", "L")}
                    </div>
                  )}
                </QuoteCardOption>
                <QuoteCardOption info label={"Cover:"}>
                  {isFetching ? (
                    <CircleLoader animation="border" />
                  ) : sumInsureds?.length > 1 ? (
                    <QuoteCardSelect
                      options={sumInsureds?.map(sumInsured => ({
                        value: sumInsured,
                        label: numberToDigitWord(sumInsured)
                          .replace("???", "")
                          .replace("Lakh", "L"),
                      }))}
                      value={{
                        value: selectedSumInsured,
                        label: numberToDigitWord(selectedSumInsured)
                          .replace("???", "")
                          .replace("Lakh", "L"),
                      }}
                      onChange={handleSumInsuredChange}
                    />
                  ) : (
                    <div
                      css={`
                        font-weight: bold;
                        font-size: 13px;
                        display: flex;
                        gap: 7px;
                      `}
                    >
                      {numberToDigitWord(selectedSumInsured)
                        .replace("???", "")
                        .replace("Lakh", "L")}
                    </div>
                  )}
                </QuoteCardOption>
              </div>
            )}
            {!isDeductibleJourney && (
              <div
                className="d-flex align-items-center justify-content-center gap-1"
                css={`
                  & > * {
                    min-width: 60px;
                  }
                `}
              >
                {sumInsureds?.length > 1 ? (
                  <>
                    <span
                      style={{
                        minWidth: "auto",
                        fontWeight: "bold",
                        fontSize: 13,
                      }}
                    >
                      Cover:
                    </span>
                    <QuoteCardSelect
                      options={sumInsureds?.map(sumInsured => ({
                        value: sumInsured,
                        label: numberToDigitWord(sumInsured).replace("???", ""),
                      }))}
                      value={{
                        value: selectedSumInsured,
                        label: numberToDigitWord(selectedSumInsured).replace(
                          "???",
                          "",
                        ),
                      }}
                      onChange={handleSumInsuredChange}
                    />
                  </>
                ) : (
                  <div
                    css={`
                      font-weight: bold;
                      font-size: 13px;
                      display: flex;
                      gap: 7px;
                    `}
                  >
                    <span>Cover:</span>
                    <span>
                      {numberToDigitWord(selectedSumInsured).replace("???", "")}
                    </span>
                  </div>
                )}
              </div>
            )}
            {shareType?.value === "specific_quotes" ? (
              // true ? (
              <div
                css={`
                  font-size: 0.83rem;
                `}
              >
                <label
                  className="d-flex align-items-center rounded"
                  htmlFor={quote?.product?.name}
                  css={`
                    color: ${colors.font.one};
                    font-weight: 900;
                    cursor: pointer;
                    // background-color: ${colors.secondary_shade};
                  `}
                >
                  {isShare ? (
                    <IoIosCheckmarkCircle
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
                    Share
                  </span>
                </label>
                <input
                  className="visually-hidden"
                  type={"checkbox"}
                  id={quote?.product?.name}
                  name="share-quote"
                  checked={isShare}
                  onChange={handleShareQuoteChange}
                />
              </div>
            ) : (
              <div
                css={`
                  font-size: 0.83rem;
                `}
              >
                <label
                  className="d-flex align-items-center rounded"
                  htmlFor={quote?.product?.id + quote?.total_premium}
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
                    <IoIosCheckmarkCircle
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
                  {/* <span
                    css={`
                      margin-top: 2px;
                    `}
                  >
                    Compare
                  </span> */}
                  <SecondaryFontBold
                    css={`
                      margin-top: 2px;
                    `}
                  >
                    Compare
                  </SecondaryFontBold>
                </label>
                <input
                  className="visually-hidden"
                  type={"checkbox"}
                  id={quote?.product?.id + quote?.total_premium}
                  name="compare-quote"
                  checked={isCompareQuote}
                  onChange={handleCompareChange}
                />
              </div>
            )}
          </div>
        </div>
        <div
          css={`
            width: 20px;
          `}
        ></div>
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

export function QuoteCardSelect({ color, fontSize, maxWidth, ...props }) {
  const { colors } = useTheme();
  return (
    <Select
      isSearchable={false}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral80: color && color,
          primary: colors.primary_color,
          primary25: colors.primary_shade,
        },
      })}
      components={{ DropdownIndicator: FaChevronDown }}
      styles={{
        option: provided => ({
          ...provided,
          fontSize: "10px",
          fontWeight: "bold",
          padding: "7px 7px !important",
          textAlign: "left",
        }),
        menuList: provided => ({
          ...provided,
          maxHeight: 190,
          "::-webkit-scrollbar": {
            width: "4px",
            height: "0px",
          },
        }),
        menu: provided => ({
          ...provided,
          fontWeight: "bold",
          textAlign: "left",
          overflow: "auto",
        }),
        valueContainer: provided => ({
          ...provided,
          padding: 0,
          fontWeight: "bold",
        }),
        indicatorSeparator: () => ({ display: "none" }),
        dropdownIndicator: provided => ({
          ...provided,
          padding: 0,
          color: "black",
          fontWeight: "bold",
        }),
        control: provided => ({
          ...provided,
          fontSize: fontSize || "13px",
          fontWeight: "bold",
          minHeight: "initial",
          width: maxWidth ? "max-content" : "initial",
          outline: "none",
          border: "0 !important",
          // This line disable the blue border
          boxShadow: "0 !important",
          "&:hover": {
            border: "0 !important",
          },
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

function QuoteFeature({ feature, icon, onNavigate, value }) {
  const showShortDescription = shortDescriptionFeatures.includes(feature?.code);
  const description = showShortDescription
    ? feature?.short_description
    : feature?.description;

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
        {/* <div
          css={`
            font-size: 12px;
            color: ${colors.font.three};
          `}
        >
          {feature.name}
        </div> */}
        <XSmallFont color={colors.font.three}>{feature.name}</XSmallFont>
        <TertiaryFont
          css={`
            display: flex;
            align-items: center;
          `}
          onClick={onNavigate}
        >
          {value}
          {icon}
        </TertiaryFont>
        {/* <div
          css={`
            width: auto;
            font-size: 13px;
            display: flex;
            align-items: center;
            cursor: pointer;
          `}
          onClick={onNavigate}
        >
          {value}
          {icon}
        </div> */}
      </div>
    </OverlayTrigger>
  );
}
