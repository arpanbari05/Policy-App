import { Container, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  Button,
  CircleCloseButton,
  CircleLoader,
  FullScreenLoader,
  GoBackButton,
  Page,
  PremiumButton,
} from "../../components";
import {
  useCompanies,
  useFrontendBoot,
  useGetQuotes,
  useQuotesCompare,
  useTheme,
  useToggle,
  useUrlEnquiry,
} from "../../customHooks";
import { useHistory, useParams } from "react-router-dom";
import "styled-components/macro";
import { GiCircle } from "react-icons/gi";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";
import { BiPrinter } from "react-icons/bi";
import { mergeQuotes } from "../../utils/helper";
import { useGetCompareFeaturesQuery } from "../../api/api";
import {
  BASIC_FEATURES,
  SPECIAL_FEATURES,
  WAITING_PERIOD,
  WHATS_NOT_COVERED,
} from "./data";
import { every, uniq } from "lodash";
import { useEffect, useState } from "react";
import { quoteCompareFeature } from "../../test/data/quoteFeatures";
import { downloadComparePage } from "./utils";

const DESCRIPTIONS = {
  deductible: "",
  sum_insured:
    "Cover Amount of the selected plan is the maximum pay out the Insurance company will offer",
};

function ComparePage() {
  const { groupCode } = useParams();

  const {
    getCompareQuotes,
    query: { isLoading, isUninitialized },
  } = useQuotesCompare();

  const showDifferenceToggle = useToggle(false);

  if (isLoading || isUninitialized) return <FullScreenLoader />;

  const { quotes: compareQuotes } = getCompareQuotes(groupCode);

  return (
    <Page>
      <Container className="pt-3" id="printCompare">
        <div>
          <BackButton />
        </div>
        <CompareHeader
          compareQuotes={compareQuotes}
          isShowDifference={showDifferenceToggle.isOn}
          onShowDifferenceChange={showDifferenceToggle.toggle}
        />
        <div className="mt-3">
          <PlanDetailsSection compareQuotes={compareQuotes} />
          <KeyBenefitsSection compareQuotes={compareQuotes} />
          <BasicFeaturesSection compareQuotes={compareQuotes} showDifference={showDifferenceToggle.isOn} />
          <SpecialFeaturesSection compareQuotes={compareQuotes} />
          <WaitingPeriodSection compareQuotes={compareQuotes} />
          <WhatsNotCoveredSection compareQuotes={compareQuotes} />
        </div>
      </Container>
    </Page>
  );
}

export default ComparePage;

function CompareHeader({
  compareQuotes = [],
  onShowDifferenceChange,
  isShowDifference,
  ...props
}) {
  const { boxShadows } = useTheme();
  const { groupCode } = useParams();

  const { removeCompareQuote } = useQuotesCompare();

  const handleRemove = quote => removeCompareQuote({ quote, groupCode });

  const handleShowDifferenceChange = checked => {
    onShowDifferenceChange && onShowDifferenceChange(checked);
  };

  return (
    <div
      className="p-3 d-flex"
      css={`
        box-shadow: ${boxShadows.four};
        gap: 3em;
        position: sticky;
        top: 0;
        background-color: #fff;
        z-index: 90;
      `}
      {...props}
    >
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        css={`
          width: 20%;
        `}
      >
        <h1
          css={`
            font-size: 1.2rem;
            font-weight: 900;
          `}
        >
          Product Comparision
        </h1>
        <ShowDifference
          onChange={handleShowDifferenceChange}
          checked={isShowDifference}
        />
        <DownloadButton />
      </div>
      <div
        className="d-flex"
        css={`
          flex: 1;
          gap: 6em;
          & > div {
            flex: 1;
          }
        `}
      >
        {compareQuotes.map((quote, idx) => (
          <ProductCard
            quote={quote}
            key={quote.company_alias + quote.sum_insured + idx}
            onRemove={handleRemove}
          />
        ))}
        {Array.from({ length: 3 - compareQuotes.length }).map((_, idx) => (
          <AddPlanCard key={idx} compareQuotes={compareQuotes} />
        ))}
      </div>
    </div>
  );
}

function AddPlanCard({ compareQuotes, ...props }) {
  const { colors } = useTheme();

  const comparePlansPopupToggle = useToggle();

  return (
    <div {...props}>
      <button
        className="d-flex flex-column align-items-center justify-content-center rounded h-100 w-100 border-0"
        css={`
          background-color: ${colors.primary_shade};
          color: ${colors.primary_color};
          font-weight: 900;
          min-height: 12.7em;
        `}
        onClick={comparePlansPopupToggle.on}
      >
        <div
          className="d-flex align-items-center justify-content-center rounded"
          css={`
            height: 36%;
            width: 36%;

            background-color: ${colors.secondary_shade};
            border: 1px dashed;
          `}
        >
          <BsPlusLg
            css={`
              font-size: 2rem;
            `}
          />
        </div>
        <div className="mt-3">Add Plan</div>
      </button>
      {comparePlansPopupToggle.isOn && (
        <AddComparePlanPopup
          onClose={comparePlansPopupToggle.off}
          compareQuotes={compareQuotes}
        />
      )}
    </div>
  );
}

function AddComparePlanPopup({ onClose, compareQuotes = [], ...props }) {
  const handleClose = () => onClose && onClose();

  const { colors } = useTheme();

  const compareList = useQuotesCompare(compareQuotes);

  const { quotes, getUpdateCompareQuotesMutation } = compareList;

  let error;

  if (quotes.length < 2)
    error = `Add ${2 - quotes.length} more plan to compare`;

  const { groupCode } = useParams();

  const [updateCompareQuotesMutation] = getUpdateCompareQuotesMutation(
    parseInt(groupCode),
  );
  const handleCompareClick = () => {
    updateCompareQuotesMutation(quotes).then(handleClose);
  };

  return (
    <Modal
      onHide={handleClose}
      show
      css={`
        & .modal-dialog {
          max-width: 1200px;
        }
        & .modal-content {
          padding: 0 1em 1em;
        }
      `}
      {...props}
    >
      <CircleCloseButton placeOnCorner onClick={handleClose} />
      <div
        className="d-flex align-items-center justify-content-between p-3"
        css={`
          border-bottom: 1px solid ${colors.border.one};
          height: 4.73em;
        `}
      >
        <h1
          className="m-0"
          css={`
            font-weight: 900;
            font-size: 1.37rem;
          `}
        >
          Add upto 3 plans to compare
        </h1>
        {error ? (
          <div
            css={`
              color: red;
              font-size: 0.89rem;
            `}
          >
            {error}
          </div>
        ) : (
          <Button onClick={handleCompareClick}>Compare</Button>
        )}
      </div>
      <div className="p-3">
        <div
          className="d-flex align-items-center justify-content-between"
          css={`
            gap: 1em;
            & > div {
              flex: 1 1 calc(33% - 0.5em);
              height: 8em;
            }
          `}
        >
          {quotes.map(quote => (
            <CompareQuoteCard
              key={quote.product.id + quote.sum_insured}
              quote={quote}
              onRemove={compareList.removeQuote}
            />
          ))}
          {Array.from({ length: 3 - quotes.length }).map((_, idx) => (
            <div
              key={idx}
              className="rounded d-flex align-items-center justify-content-center"
              css={`
                background-color: ${colors.secondary_shade};
              `}
            >
              No plans added
            </div>
          ))}
        </div>
        <div
          className="mt-3"
          css={`
            border-bottom: 1px dashed;
          `}
        />
      </div>
      <Quotes compareList={compareList} />
    </Modal>
  );
}

function Quotes({ compareList, ...props }) {
  const { data, isLoading } = useGetQuotes();

  if (!data) return null;

  const handleCompareChange = ({ checked, quote }) => {
    if (checked) {
      compareList.addQuote(quote);
      return;
    }

    compareList.removeQuote(quote);
  };

  const getQuoteCardProps = quotes => ({
    icQuotes: quotes,
    compare: {
      checkFn: compareList.isCompareQuote,
      onChange: handleCompareChange,
    },
  });

  return (
    <div
      className="px-3 pb-3 d-flex flex-wrap"
      css={`
        gap: 1em;
        & > div {
          flex: 0 1 calc(33% - 0.5em);
        }
      `}
      {...props}
    >
      {data
        .filter(icQuotes => !!icQuotes.data.data.length)
        .map(icQuotes => (
          <QuoteCard
            key={icQuotes.company_alias}
            {...getQuoteCardProps(icQuotes)}
          />
        ))}
      {isLoading && (
        <div>
          <CircleLoader animation="border" />{" "}
        </div>
      )}
    </div>
  );
}

function QuoteCard({
  icQuotes,
  compare: { checkFn, onChange } = {},
  ...props
}) {
  const { colors } = useTheme();
  const { getCompany } = useCompanies();

  const mergedQuotes = mergeQuotes(icQuotes.data.data);

  const products = Object.keys(mergedQuotes).map(productId => ({
    name: mergedQuotes[productId][0].product.name,
    id: productId,
  }));

  const [product, setProduct] = useState(products[0]);

  const quotes = mergedQuotes[product.id];

  const deductibles = uniq(quotes.map(quote => quote.deductible));

  const [deductible, setDeductible] = useState(deductibles[0]);

  const sumInsureds = quotes
    .filter(quote => quote.deductible === deductible)
    .map(quote => quote.sum_insured)
    .sort((a, b) => (a > b ? 1 : -1));

  const [sumInsured, setSumInsured] = useState(sumInsureds[0]);

  const quote = quotes.find(quote =>
    every([
      parseInt(quote.product.id) === parseInt(product.id),
      parseInt(quote.sum_insured) === parseInt(sumInsured),
    ]),
  );

  useEffect(() => {
    if (!quote) {
      setSumInsured(sumInsureds[0]);
    }
  }, [sumInsureds, quote]);

  if (!quote) return null;

  const isCompareQuoute = checkFn(quote);

  const handleCompareChange = evt => {
    const { checked } = evt.target;
    onChange && onChange({ checked, quote });
  };

  const { logo } = getCompany(quote.company_alias);

  const id = quote.product.id + quote.sum_insured + quote.deductible;

  return (
    <div className="shadow p-3 position-relative" {...props}>
      <label
        htmlFor={id}
        className="position-absolute shadow rounded-circle"
        css={`
          top: 0;
          right: 0;
          transform: translate(30%, -30%);
          line-height: 1;
          cursor: pointer;
          color: ${colors.primary_color};
          & svg {
            height: 1.6em;
            width: 1.6em;
          }
        `}
      >
        {isCompareQuoute ? <IoCheckmarkCircleSharp /> : <GiCircle />}
        <input
          className="visually-hidden"
          type={"checkbox"}
          name={id}
          id={id}
          checked={isCompareQuoute}
          onChange={handleCompareChange}
        />
      </label>
      <div className="d-flex align-items-center">
        <img height={"37"} src={logo} alt={icQuotes.company_alias} />
        <div
          className="mx-3"
          css={`
            font-size: 0.89rem;
            font-weight: 900;
          `}
        >
          {quote.product.company.name}
        </div>
      </div>
      <div
        className="d-flex mt-2"
        css={`
          gap: 1em;
        `}
      >
        <QuoteCardOption title="Product:">
          <select
            css={`
              width: 10em;
            `}
            value={product.id}
            onChange={evt =>
              setProduct(
                products.find(product => product.id === evt.target.value),
              )
            }
          >
            {products.map(product => (
              <option key={product.name} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </QuoteCardOption>
        <QuoteCardOption title="Deductible:">
          <select
            value={deductible}
            onChange={evt => setDeductible(parseInt(evt.target.value))}
          >
            {deductibles.map(deductible => (
              <option key={deductible} value={deductible}>
                {deductible}
              </option>
            ))}
          </select>
        </QuoteCardOption>
        <QuoteCardOption title="Sum Insured:">
          <select
            value={sumInsured}
            onChange={evt => setSumInsured(evt.target.value)}
          >
            {sumInsureds.map(sumInsured => (
              <option key={sumInsured} value={sumInsured}>
                {sumInsured}
              </option>
            ))}
          </select>
        </QuoteCardOption>
      </div>
    </div>
  );
}

function QuoteCardOption({ title = "", children, ...props }) {
  const { colors } = useTheme();
  return (
    <div>
      <div
        css={`
          font-size: 0.79rem;
          color: ${colors.font.three};
        `}
      >
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}

function CompareQuoteCard({ quote, onRemove, ...props }) {
  const { getCompany } = useCompanies();

  if (!quote) return null;

  const { logo } = getCompany(quote.company_alias);

  const handleCloseClick = () => onRemove && onRemove(quote);

  return (
    <div
      className="p-3 shadow rounded position-relative"
      css={`
        flex: 1;
      `}
      {...props}
    >
      <CircleCloseButton placeOnCorner onClick={handleCloseClick} />
      <div className="d-flex align-items-center">
        <img src={logo} height={"37"} alt={quote.company_alias} />
        <h2
          className="mx-3"
          css={`
            font-size: 1rem;
            font-weight: 900;
          `}
        >
          {quote.product.name}
        </h2>
      </div>
      <div
        className="mt-3 d-flex align-items-center justify-content-around"
        css={`
          & > div {
            flex: 1;
          }
        `}
      >
        {quote.deductible ? (
          <QuoteCardOption title="Deductible:">
            {quote.deductible}
          </QuoteCardOption>
        ) : null}
        <QuoteCardOption title="Sum Insured:">
          {quote.sum_insured}
        </QuoteCardOption>
        <QuoteCardOption title="Premium:">
          {quote.total_premium}
        </QuoteCardOption>
      </div>
    </div>
  );
}

function ProductCard({ quote, onRemove, ...props }) {
  const { boxShadows } = useTheme();
  const { getCompanyLogo } = useCompanies();

  const logo = getCompanyLogo(quote.company_alias);

  const handleCloseClick = () => onRemove && onRemove(quote);

  return (
    <div
      className="p-3 d-flex flex-column align-items-center justify-content-between position-relative"
      css={`
        box-shadow: ${boxShadows.five};
        gap: 2em;
      `}
      {...props}
    >
      <CircleCloseButton placeOnCorner onClick={handleCloseClick} />
      <img src={logo} alt={quote.company_alias} height={"46"} />
      <div
        css={`
          text-align: center;
          font-weight: 900;
        `}
      >
        {quote.product.name}
      </div>
      <PremiumButton quote={quote} />
    </div>
  );
}

function ShowDifference({ onChange, checked, ...props }) {
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
        css={`
          font-size: 0.83rem;
        `}
      >
        <span
          css={`
            color: ${checked ? colors.primary_color : colors.font.two};
            font-size: 1.27rem;
            margin-right: 0.3em;
          `}
        >
          {checked ? <IoCheckmarkCircleSharp /> : <GiCircle />}
        </span>
        Show difference
      </label>
    </div>
  );
}

function DownloadButton({ ...props }) {
  const { colors } = useTheme();
  const handleClick = () => {
    downloadComparePage();
  };

  return (
    <button
      className="rounded d-flex align-items-center py-1 px-3 mt-3 compare-pdf-hide"
      css={`
        background: #fff;
        border: 1px solid ${colors.border.one};
        gap: 0.39em;
      `}
      onClick={handleClick}
      {...props}
    >
      <div
        className="rounded-circle p-1 d-flex align-items-center justify-content-center"
        css={`
          background-color: ${colors.primary_shade};
          color: ${colors.primary_color};
          font-size: 1.2rem;
          height: 2rem;
          width: 2rem;
        `}
      >
        <BiPrinter />
      </div>
      Download
    </button>
  );
}

function BackButton(props) {
  const { getUrlWithEnquirySearch } = useUrlEnquiry();
  const history = useHistory();
  const { groupCode } = useParams();

  const handleBackClick = () => {
    history.push(getUrlWithEnquirySearch(`/quotes/${groupCode}`));
  };

  return (
    <GoBackButton onClick={handleBackClick} {...props}>
      Go Back
    </GoBackButton>
  );
}

function PlanDetailsSection({ compareQuotes = [], ...props }) {
  const { journeyType } = useFrontendBoot();

  return (
    <CompareSection title="Plan Details" {...props}>
      {journeyType === "top_up" ? (
        <FeatureRow title={"Deductible"} description="">
          {compareQuotes.map((quote, idx) => (
            <DeductibleFeatureValue
              key={quote.deductible + quote.product.id + idx}
              compareQuote={quote}
            />
          ))}
        </FeatureRow>
      ) : null}
      <FeatureRow
        title={"Sum Insured"}
        description={DESCRIPTIONS["sum_insured"]}
      >
        {compareQuotes.map((quote, idx) => (
          <SumInsuredFeatureValue
            key={quote.sum_insured + quote.product.id + idx}
            compareQuote={quote}
          />
        ))}
      </FeatureRow>
      <FeatureRow title={"Tenure"}>
        {compareQuotes.map((quote, idx) => (
          <div key={quote.tenure + quote.sum_insured + quote.product.id + idx}>
            {quote.tenure + `${quote.tenure > 1 ? " Years" : " Year"}`}
          </div>
        ))}
      </FeatureRow>
    </CompareSection>
  );
}

function SumInsuredFeatureValue({ compareQuote, ...props }) {
  const getCompareFeaturesQuery = useGetCompareFeaturesQuery(
    compareQuote?.product.id,
  );
  const { data } = useGetQuotes({ skip: getCompareFeaturesQuery.isLoading });

  const { updateCompareQuote } = useQuotesCompare();

  const icQuotes =
    data &&
    data.find(
      icQuotes => icQuotes.company_alias === compareQuote.company_alias,
    );

  const isLoading = !data || !icQuotes;

  const isCurrentCompareQuote = quote =>
    every([
      quote.product.id === compareQuote.product.id,
      quote.deductible === compareQuote.deductible,
    ]);

  const sumInsureds = icQuotes
    ? icQuotes.data.data.reduce((sumInsureds, quote) => {
        if (isCurrentCompareQuote(quote)) {
          return [...sumInsureds, quote.sum_insured];
        }
        return sumInsureds;
      }, [])
    : [];

  const { groupCode } = useParams();

  const getQuoteBySumInsured = sumInsured =>
    icQuotes.data.data.find(quote =>
      every([
        parseInt(quote.sum_insured) === parseInt(sumInsured),
        quote.deductible === compareQuote.deductible,
      ]),
    );

  const handleChange = evt => {
    const updatedQuote = getQuoteBySumInsured(evt.target.value);
    if (!updatedQuote) return;
    updateCompareQuote({
      updatedQuote,
      previousQuote: compareQuote,
      groupCode,
    });
  };

  return (
    <div className="d-flex align-items-center" {...props}>
      {isLoading ? (
        <div>{compareQuote.sum_insured}</div>
      ) : (
        <select value={compareQuote.sum_insured} onChange={handleChange}>
          {sumInsureds.map(sumInsured => (
            <option key={sumInsured} value={sumInsured}>
              {sumInsured}
            </option>
          ))}
        </select>
      )}
      {isLoading && <CircleLoader animation="border" />}
    </div>
  );
}

function DeductibleFeatureValue({ compareQuote, ...props }) {
  const getCompareFeaturesQuery = useGetCompareFeaturesQuery(
    compareQuote?.product.id,
  );
  const { data } = useGetQuotes({ skip: getCompareFeaturesQuery.isLoading });

  const { updateCompareQuote } = useQuotesCompare();

  const icQuotes =
    data &&
    data.find(
      icQuotes => icQuotes.company_alias === compareQuote.company_alias,
    );

  const isLoading = !data || !icQuotes;

  const isCurrentCompareQuote = quote =>
    every([quote.product.id === compareQuote.product.id]);

  const deductibles = icQuotes
    ? uniq(
        icQuotes.data.data.reduce((deductibles, quote) => {
          if (isCurrentCompareQuote(quote)) {
            return [...deductibles, quote.deductible];
          }
          return deductibles;
        }, []),
      )
    : [];

  const { groupCode } = useParams();

  const getQuoteByDeductible = (
    deductible,
    { includeSumInsured = true } = {},
  ) =>
    icQuotes.data.data.find(quote =>
      every([
        parseInt(quote.deductible) === parseInt(deductible),
        parseInt(quote.product.id) === parseInt(compareQuote.product.id),
        includeSumInsured
          ? parseInt(quote.sum_insured) === parseInt(compareQuote.sum_insured)
          : true,
      ]),
    );

  const handleChange = evt => {
    let updatedQuote = getQuoteByDeductible(evt.target.value);
    if (!updatedQuote)
      updatedQuote = getQuoteByDeductible(evt.target.value, {
        includeSumInsured: false,
      });
    if (!updatedQuote) return;
    updateCompareQuote({
      updatedQuote,
      previousQuote: compareQuote,
      groupCode,
    });
  };

  return (
    <div className="d-flex align-items-center" {...props}>
      {isLoading ? (
        <div>{compareQuote.deductible}</div>
      ) : (
        <select value={compareQuote.deductible} onChange={handleChange}>
          {deductibles.map(deductible => (
            <option key={deductible} value={deductible}>
              {deductible}
            </option>
          ))}
        </select>
      )}
      {isLoading && <CircleLoader animation="border" />}
    </div>
  );
}

function KeyBenefitsSection({ compareQuotes = [], ...props }) {
  const uniqueFeatures = compareQuotes.map(quote =>
    quote.features.find(feature => feature.code === "unique_feature"),
  );

  return (
    <CompareSection title="Key Benefits" {...props}>
      <FeatureRow title={"Unique Feature"}>
        {uniqueFeatures.map((feature, idx) =>
          feature ? (
            <div key={feature.code + idx}>
              <ul>
                {feature &&
                  feature.value.split("\n").map(value => <li>{value}</li>)}
              </ul>
            </div>
          ) : null,
        )}
      </FeatureRow>
    </CompareSection>
  );
}

function BasicFeaturesSection({
  compareQuotes = [],
  showDifference = false,
  ...props
}) {
  const [features, setFeatures] = useState(null);

  const handleFeatureLoad = ({ featureTitle, feature }) => {
    if (!feature?.feature_value) return;
    setFeatures(features => {
      if (!features) {
        return { [featureTitle]: [feature?.feature_value] };
      }

      if (!features[featureTitle])
        return {
          ...features,
          [featureTitle]: [feature?.feature_value],
        };

      return {
        ...features,
        [featureTitle]: [...features[featureTitle], feature?.feature_value],
      };
    });
  };

  return (
    <CompareSection title="Basic Features" {...props}>
      {BASIC_FEATURES.map(feature => {
        if (
          showDifference &&
          features &&
          features[feature.title] &&
          features[feature.title].every(
            val => val === features[feature.title][0],
          )
        )
          return null;
        return (
          <FeatureRow
            title={feature.title}
            key={feature.title}
            description={feature.description}
          >
            {compareQuotes.map((quote, idx) => (
              <FeatureValue
                compareQuote={quote}
                sectionTitle={"Basic Features"}
                featureTitle={feature.title}
                key={quote.product.id + quote.sum_insured + idx}
                onLoad={handleFeatureLoad}
                tooltipPlacement={idx === 2 ? "left" : "right"}
              />
            ))}
          </FeatureRow>
        );
      })}
    </CompareSection>
  );
}

function SpecialFeaturesSection({ compareQuotes = [], ...props }) {
  return (
    <CompareSection title="Special Features" {...props}>
      {SPECIAL_FEATURES.map(feature => (
        <FeatureRow
          title={feature.title}
          key={feature.title}
          description={feature.description}
        >
          {compareQuotes.map((quote, idx) => (
            <FeatureValue
              compareQuote={quote}
              sectionTitle={"Special Features"}
              featureTitle={feature.title}
              key={quote.product.id + quote.sum_insured + idx}
              tooltipPlacement={idx === 2 ? "left" : "right"}
            />
          ))}
        </FeatureRow>
      ))}
    </CompareSection>
  );
}

function WaitingPeriodSection({ compareQuotes = [], ...props }) {
  return (
    <CompareSection title="Waiting Period" {...props}>
      {WAITING_PERIOD.map(feature => (
        <FeatureRow
          title={feature.title}
          key={feature.title}
          description={feature.description}
        >
          {compareQuotes.map((quote, idx) => (
            <FeatureValue
              compareQuote={quote}
              sectionTitle={"Waiting Period"}
              featureTitle={feature.title}
              key={quote.product.id + quote.sum_insured + idx}
              tooltipPlacement={idx === 2 ? "left" : "right"}
            />
          ))}
        </FeatureRow>
      ))}
    </CompareSection>
  );
}

function WhatsNotCoveredSection({ compareQuotes = [], ...props }) {
  return (
    <CompareSection title="What's not covered?" {...props}>
      {WHATS_NOT_COVERED.map(feature => (
        <FeatureRow
          title={feature.title}
          key={feature.title}
          description={feature.description}
        >
          {compareQuotes.map((quote, idx) => (
            <FeatureValue
              compareQuote={quote}
              sectionTitle={"What's not covered?"}
              featureTitle={feature.title}
              key={quote.product.id + quote.sum_insured + idx}
              tooltipPlacement={idx === 2 ? "left" : "right"}
            />
          ))}
        </FeatureRow>
      ))}
    </CompareSection>
  );
}

const renderTooltipDesc = ({ props, description }) => (
  <Tooltip {...props}>{description}</Tooltip>
);

function useCompareFeature({ compareQuote }) {
  let query = useGetCompareFeaturesQuery(compareQuote?.product?.id);

  let { data } = query;

  const { journeyType } = useFrontendBoot();

  function getFeature({ sectionTitle, featureTitle }) {
    if (!data) return null;

    data = journeyType === "health" ? data : quoteCompareFeature;

    const compareFeature = data.find(feature => feature.name === sectionTitle);

    if (!compareFeature) return null;

    const features =
      compareFeature.sum_insureds[
        journeyType === "health" ? compareQuote.sum_insured : 300000
      ].features;

    if (!features) return null;

    const feature = features.find(feature => feature.title === featureTitle);

    return feature;
  }

  return { getFeature, query };
}

function FeatureValue({
  compareQuote = {},
  sectionTitle,
  featureTitle,
  tooltipPlacement = "right",
  onLoad,
  ...props
}) {
  const {
    query: { isLoading, isUninitialized, isError },
    getFeature,
  } = useCompareFeature({ compareQuote });

  const feature = getFeature({ sectionTitle, featureTitle });

  useEffect(() => {
    onLoad && onLoad({ sectionTitle, featureTitle, feature });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feature]);

  if (isLoading || isUninitialized)
    return (
      <div>
        <CircleLoader animation="border" />
      </div>
    );

  if (isError) return <div>Error!</div>;

  if (!feature) return null;

  return (
    <div {...props}>
      <OverlayTrigger
        placement={tooltipPlacement}
        overlay={renderTooltipDesc({
          description: feature.short_description,
        })}
      >
        <div>{feature.feature_value}</div>
      </OverlayTrigger>
    </div>
  );
}

function FeatureRow({
  title,
  description = "",
  tooltipPlacement = "right",
  children,
  ...props
}) {
  const { colors } = useTheme();
  return (
    <div
      className="p-3 d-flex"
      css={`
        border-bottom: 1px solid ${colors.border.one};
        gap: 3em;
      `}
      {...props}
    >
      <div
        css={`
          min-width: 20%;
        `}
      >
        <OverlayTrigger
          placement={tooltipPlacement}
          overlay={renderTooltipDesc({
            description,
          })}
        >
          <span
            css={`
              border-bottom: 2px dotted;
            `}
          >
            {title}
          </span>
        </OverlayTrigger>
      </div>
      <div
        className="d-flex flex-grow-1"
        css={`
          gap: 6em;
          & > div {
            flex: 1;
          }
        `}
      >
        {children}
      </div>
    </div>
  );
}

function CompareSection({ title = "", children, ...props }) {
  const { colors } = useTheme();

  return (
    <section className="mt-3">
      <h2
        className="p-3 position-relative"
        css={`
          text-transform: capitalize;
          font-size: 1.37rem;
          background-color: ${colors.primary_shade};
        `}
      >
        <div
          className="position-absolute"
          css={`
            width: 0.27em;
            height: 100%;
            left: 0;
            top: 0;
            background-color: ${colors.secondary_color};
          `}
        />
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

// import React, { useRef, useState } from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
// import CardSkeletonLoader from "../../components/Common/card-skeleton-loader/CardSkeletonLoader";
// import CardModal from "../../components/Common/Modal/CardModal";
// import CardModalM from "../../components/Common/Modal/CardModelM";
// import useWindowSize from "../../customHooks/useWindowSize";

// import GoBack from "./components/GoBackBtn/GoBack";
// import MobileHeader from "./components/MobileComp/Header";
// import ShowDiffMobile from "./components/MobileComp/ShowDiffMobile";
// import PlanContainerMobile from "./components/MobileComp/PlanContainerM";
// import TBodyM from "./components/MobileComp/TBodyM";
// import styled from "styled-components/macro";
// import THeadM from "./components/MobileComp/THeadM";
// import useUrlQuery from "../../customHooks/useUrlQuery";
// import TBlank from "./components/tables/TBlank";
// import TBody from "./components/tables/TBody";
// import THead from "./components/tables/THead";
// import useComparePage, { numToLakh } from "./useComparePage";
// import "./Compare.scss";
// import "styled-components/macro";
// import mail from "./../../assets/images/whatsapp.png";
// import whatsapp from "./../../assets/images/whatsapp01.png";
// import BuyNowModal from "../quotePage/components/BuyNowModal/BuyNowModal";
// import {
//   AddPlan,
//   CompanyName,
//   CompareQuotes,
//   CrossWrapper,
//   DetailWrapper,
//   DropDownWrapper,
//   EmailSent,
//   Line,
//   LogoWrapper,
//   MergedQuotes,
//   NameWrapper,
//   PlanDetails,
//   PlanName,
//   PlusWrapper,
//   PopupWrapper,
//   PopupWrapperM,
//   QuoteName,
//   QuoteNameM,
//   QuoteWrapper,
//   QuoteWrapperM,
//   RemoveCross,
//   SelectedProduct,
//   Title,
//   Value,
//   ErrorAddPlan,
// } from "./ComparePage.style";
// import DropDown from "./components/DropDown";
// import { useDispatch, useSelector } from "react-redux";
// import ShareQuoteModal from "../../components/ShareQuoteModal";

// const sendContent = (
//   type,
//   name,
//   imageSend,
//   email,
//   setEmail,
//   emailStatus,
//   sendRef,
// ) => {
//   return (
//     <div className="text-center p-lg mb-50 sm-50 xs-50">
//       <img
//         src={type === "email" ? mail : whatsapp}
//         alt="mail"
//         className="img_whatsapp"
//       ></img>
//       <p className="mb-15 font_24">
//         Hey {name}, please share your{" "}
//         {type === "email" ? "e-mail address" : "phone number"} to get your
//         compared plans
//       </p>
//       <form className="form">
//         <input
//           type={type === "email" ? "email" : "tel"}
//           class="form__field"
//           onChange={e => setEmail(e.target.value)}
//           placeholder={
//             type === "email"
//               ? "Enter Your Email Address"
//               : "Enter Your Phone Number"
//           }
//         />
//         {type === "email" && (
//           <EmailSent status={emailStatus.status}>
//             {emailStatus.message}
//           </EmailSent>
//         )}
//         <button
//           type="button"
//           className="btn--primary btn--inside btn_call uppercase text-center"
//           onClick={() => {
//             if (type === "email") imageSend(email);
//             else sendRef.current.click();
//           }}
//         >
//           Share&nbsp;&nbsp;&nbsp;
//           <i class="fa fa-share font_15"></i>
//         </button>
//         <a
//           style={{
//             display: "none",
//             height: 0,
//             opacity: 0,
//             position: "absolute",
//           }}
//           target="_blank"
//           ref={sendRef}
//           rel="noreferrer"
//           href={`https://api.whatsapp.com/send?phone=91${email}&text=${window.location.href}`}
//         >
//           Whatsapp
//         </a>
//       </form>
//     </div>
//   );
// };

// const getYearsUsingTenure = tenure => {
//   if (tenure == 1) {
//     return "year";
//   } else if (tenure == 2) {
//     return "2 years";
//   } else if (tenure == 3) {
//     return "3 years";
//   } else return "year";
// };
// const popupContent = (
//   fitlerQuotes,
//   quotesForCompare,
//   selectedAddPlan,
//   setSelectedAddPlan,
//   mergedQuotes,
//   removePlan,
//   value,
//   setValue,
//   errors,
//   setErrors,
//   discount,
//   removePlan2point0,
// ) => {
//   let companies = [];
//   let companyWisePlans = {};
//   let companyWiseSumAssured = {};
//   let companyWiseLogos = [];
//   let ProductWiseId = {};
//   let covers = {};
//   fitlerQuotes.forEach(item => {
//     if (item[0]) {
//       companies.push(item[0].product.company.name);
//       companyWiseLogos.push(item[0].logo);

//       item.forEach(innerItem => {
//         if (!(innerItem.product.name in covers)) {
//           covers[innerItem.product.name] = [innerItem.sum_insured];
//         } else {
//           covers[innerItem.product.name].push(innerItem.sum_insured);
//         }
//       });

//       item.forEach(innerItem => {
//         if (
//           ((companyWisePlans[innerItem.product.company.name] &&
//             !companyWisePlans[innerItem.product.company.name].includes(
//               innerItem.product.name,
//             )) ||
//             !companyWisePlans[innerItem.product.company.name]) &&
//           !mergedQuotes.some(
//             item => item.data.product.name === innerItem.product.name,
//           )
//         ) {
//           companyWisePlans = {
//             ...companyWisePlans,
//             [innerItem.product.company.name]: [
//               ...(companyWisePlans[innerItem.product.company.name]
//                 ? companyWisePlans[innerItem.product.company.name]
//                 : []),
//               innerItem.product.name,
//             ],
//           };
//           ProductWiseId = {
//             ...ProductWiseId,
//             [innerItem.product.name]: [innerItem.product.id],
//           };
//         }
//         if (
//           (companyWiseSumAssured[innerItem.product.company.name] &&
//             !companyWiseSumAssured[innerItem.product.company.name].includes(
//               innerItem.sum_insured,
//             )) ||
//           !companyWiseSumAssured[innerItem.product.company.name]
//         )
//           companyWiseSumAssured = {
//             ...companyWiseSumAssured,
//             [innerItem.product.company.name]: [
//               ...(companyWiseSumAssured[innerItem.product.company.name]
//                 ? companyWiseSumAssured[innerItem.product.company.name]
//                 : []),
//               innerItem.sum_insured,
//             ],
//           };
//       });
//     }
//   });

//   return (
//     <>
//       <PopupWrapper>
//         <MergedQuotes className="row">
//           {[0, 1, 2].map((item, index) => (
//             <div className="col-lg-4">
//               {mergedQuotes[index] ? (
//                 <SelectedProduct first={index === 0}>
//                   <RemoveCross
//                     onClick={() =>
//                       removePlan(
//                         `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`,
//                       )
//                     }
//                   >
//                     <i class="fas fa-times"></i>
//                   </RemoveCross>
//                   <LogoWrapper className="logo_style_common">
//                     <img src={mergedQuotes[index].data.logo} alt="logo"></img>
//                   </LogoWrapper>
//                   <NameWrapper>
//                     <span
//                       style={{
//                         textAlign: "left",
//                         fontWeight: "900",
//                         fontFamily: "Inter-SemiBold",
//                       }}
//                     >
//                       {mergedQuotes[index].data.product.name}
//                     </span>
//                     {/* <br/> */}
//                     {/* <span style={{
//                       color:"#505f79",
//                       fontSize:"14px"
//                     }}>
//                       {" "}
//                       {mergedQuotes[index].data.product.company.name}
//                     </span> */}
//                     <PlanDetails>
//                       <DetailWrapper>
//                         <Title>Sum Insured :</Title>
//                         <Value>
//                           ₹{" "}
//                           {numToLakh(
//                             mergedQuotes[index].data.sum_insured,
//                           ).toLocaleString("en-IN")}
//                         </Value>
//                       </DetailWrapper>
//                       <DetailWrapper>
//                         <Title>Premium :</Title>
//                         <Value>
//                           ₹{" "}
//                           {(discount[
//                             `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`
//                           ]
//                             ? discount[
//                                 `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`
//                               ].premium
//                             : mergedQuotes[index].data.premium
//                           ).toLocaleString("en-IN") +
//                             "/" +
//                             getYearsUsingTenure(
//                               discount[
//                                 `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`
//                               ]?.tenure,
//                             )}
//                         </Value>
//                       </DetailWrapper>
//                     </PlanDetails>
//                   </NameWrapper>
//                 </SelectedProduct>
//               ) : (
//                 <AddPlan>
//                   <CrossWrapper>
//                     <PlusWrapper>
//                       <i class="fa fa-plus"></i>
//                     </PlusWrapper>
//                     <div>No Plans Added</div>
//                   </CrossWrapper>
//                 </AddPlan>
//               )}
//             </div>
//           ))}
//         </MergedQuotes>
//         <Line></Line>
//         <CompareQuotes>
//           <div className="row" style={{ padding: "10px" }}>
//             {companies.map((item, index) => {
//               if (companyWisePlans[item])
//                 return (
//                   <>
//                     <div className="col-lg-4">
//                       <QuoteWrapper>
//                         <div>
//                           <LogoWrapper className="logo_style_common">
//                             <img
//                               src={companyWiseLogos[index]}
//                               alt="logo"
//                               css={`
//                                 width: 57px;
//                                 object-fit: contain;
//                               `}
//                             ></img>
//                           </LogoWrapper>
//                           <QuoteName>{item}</QuoteName>
//                         </div>
//                         <DropDownWrapper>
//                           <DropDown
//                             name={companyWisePlans[item]}
//                             sum={companyWiseSumAssured[item]}
//                             covers={covers}
//                             onChange={value => {
//                               setValue(prev => {
//                                 return { ...prev, [item]: value };
//                               });
//                               if (mergedQuotes.length >= 3) {
//                                 setErrors(prev => {
//                                   return {
//                                     ...prev,
//                                     [item]: "You can add only upto 3 plans",
//                                   };
//                                 });
//                               } else if (value?.plan && value?.sumInsured) {
//                                 setSelectedAddPlan(
//                                   `${ProductWiseId[value.plan]}${
//                                     value?.sumInsured
//                                   }`,
//                                 );
//                                 setValue({});
//                               }
//                             }}
//                             value={value[item]}
//                           ></DropDown>
//                         </DropDownWrapper>
//                       </QuoteWrapper>
//                     </div>
//                     {/* <ErrorAddPlan>
//                       {errors[item] ? errors[item] : ""}
//                     </ErrorAddPlan> */}
//                   </>
//                 );
//               else return <></>;
//             })}
//           </div>
//         </CompareQuotes>
//       </PopupWrapper>
//     </>
//   );
// };

// // popup content for mobile view

// const popupContentM = (
//   fitlerQuotes,
//   quotesForCompare,
//   selectedAddPlan,
//   setSelectedAddPlan,
//   mergedQuotes,
//   removePlan,
//   value,
//   setValue,
//   errors,
//   setErrors,
//   discount,
//   windowWidth,
//   removePlan2point0,
// ) => {
//   let companies = [];
//   let companyWisePlans = {};
//   let companyWiseSumAssured = {};
//   let companyWiseLogos = [];
//   let ProductWiseId = {};
//   let covers = {};

//   fitlerQuotes.forEach(item => {
//     item.forEach(innerItem => {
//       if (!(innerItem.product.name in covers)) {
//         covers[innerItem.product.name] = [innerItem.sum_insured];
//       } else {
//         covers[innerItem.product.name].push(innerItem.sum_insured);
//       }
//     });

//     if (item[0]) {
//       companies.push(item[0].product.company.name);
//       companyWiseLogos.push(item[0].logo);
//       item.forEach(innerItem => {
//         if (
//           ((companyWisePlans[innerItem.product.company.name] &&
//             !companyWisePlans[innerItem.product.company.name].includes(
//               innerItem.product.name,
//             )) ||
//             !companyWisePlans[innerItem.product.company.name]) &&
//           !mergedQuotes.some(
//             item => item.data.product.name === innerItem.product.name,
//           )
//         ) {
//           companyWisePlans = {
//             ...companyWisePlans,
//             [innerItem.product.company.name]: [
//               ...(companyWisePlans[innerItem.product.company.name]
//                 ? companyWisePlans[innerItem.product.company.name]
//                 : []),
//               innerItem.product.name,
//             ],
//           };
//           ProductWiseId = {
//             ...ProductWiseId,
//             [innerItem.product.name]: [innerItem.product.id],
//           };
//         }
//         if (
//           (companyWiseSumAssured[innerItem.product.company.name] &&
//             !companyWiseSumAssured[innerItem.product.company.name].includes(
//               innerItem.sum_insured,
//             )) ||
//           !companyWiseSumAssured[innerItem.product.company.name]
//         )
//           companyWiseSumAssured = {
//             ...companyWiseSumAssured,
//             [innerItem.product.company.name]: [
//               ...(companyWiseSumAssured[innerItem.product.company.name]
//                 ? companyWiseSumAssured[innerItem.product.company.name]
//                 : []),
//               innerItem.sum_insured,
//             ],
//           };
//       });
//     }
//   });

//   return (
//     <>
//       <PopupWrapperM>
//         <MergedQuotes
//           className="row"
//           style={{
//             display: "flex",
//             flexWrap: "nowrap",
//             justifyContent: "space-between",
//           }}
//         >
//           {[0, 1].map((item, index) => (
//             <div
//               style={windowWidth < 400 ? { width: "50%" } : { width: "49%" }}
//             >
//               {mergedQuotes[index] ? (
//                 <SelectedProduct first={index === 0}>
//                   <RemoveCross
//                     onClick={() =>
//                       removePlan(
//                         `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`,
//                       )
//                     }
//                   >
//                     <span>
//                       <i class="fas fa-times"></i>
//                     </span>
//                   </RemoveCross>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                     }}
//                   >
//                     <LogoWrapper
//                       className="logo_style_commo_m"
//                       style={{ marginRight: "0px" }}
//                     >
//                       <img
//                         src={mergedQuotes[index].data.logo}
//                         className="w-100"
//                         alt="logo"
//                       ></img>
//                     </LogoWrapper>

//                     <CompanyName
//                       style={{ fontSize: "11px", textAlign: "center" }}
//                     >
//                       {mergedQuotes[index].data.product.name}
//                     </CompanyName>

//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         width: "100%",
//                       }}
//                     >
//                       <Title style={{ fontSize: "10px" }}>Sum Insured :</Title>
//                       <Value style={{ fontSize: "10px" }}>
//                         ₹{" "}
//                         {numToLakh(
//                           mergedQuotes[index].data.sum_insured,
//                         ).toLocaleString("en-IN")}
//                       </Value>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         width: "100%",
//                       }}
//                     >
//                       <Title style={{ fontSize: "10px" }}>Premium :</Title>
//                       <Value style={{ fontSize: "10px" }}>
//                         <i class="fa fa-inr"></i>{" "}
//                         {(discount[
//                           `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`
//                         ]
//                           ? discount[
//                               `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`
//                             ].premium
//                           : mergedQuotes[index].data.premium
//                         ).toLocaleString("en-IN") +
//                           "/" +
//                           getYearsUsingTenure(
//                             discount[
//                               `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`
//                             ]?.tenure,
//                           )}
//                       </Value>
//                     </div>
//                   </div>
//                 </SelectedProduct>
//               ) : (
//                 <AddPlan style={{ padding: "0px" }}>
//                   <CrossWrapper>
//                     <PlusWrapper>
//                       <i class="fa fa-plus"></i>
//                     </PlusWrapper>
//                     <div
//                       css={`
//                         @media (max-width: 410px) {
//                           font-size: 12px;
//                         }
//                       `}
//                     >
//                       No Plans Added
//                     </div>
//                   </CrossWrapper>
//                 </AddPlan>
//               )}
//             </div>
//           ))}
//         </MergedQuotes>
//         <Line></Line>
//         <div>
//           <div className="row">
//             {companies.map((item, index) => {
//               if (companyWisePlans[item])
//                 return (
//                   <div className="col-lg-4">
//                     <QuoteWrapperM>
//                       <LogoWrapper className="logo_style_common_m">
//                         <img
//                           src={companyWiseLogos[index]}
//                           className="w-100"
//                           alt="logo"
//                         ></img>
//                       </LogoWrapper>
//                       <QuoteNameM>{item}</QuoteNameM>
//                       <DropDownWrapper>
//                         <DropDown
//                           name={companyWisePlans[item]}
//                           sum={companyWiseSumAssured[item]}
//                           covers={covers}
//                           onChange={value => {
//                             setValue(prev => {
//                               return { ...prev, [item]: value };
//                             });
//                             if (mergedQuotes.length >= 2) {
//                               setErrors(prev => {
//                                 return {
//                                   ...prev,
//                                   [item]: "You can add only upto 2 plans",
//                                 };
//                               });
//                             } else if (value?.plan && value?.sumInsured) {
//                               setSelectedAddPlan(
//                                 `${ProductWiseId[value.plan]}${
//                                   value?.sumInsured
//                                 }`,
//                               );
//                               setValue({});
//                             }
//                           }}
//                           value={value[item]}
//                         ></DropDown>
//                       </DropDownWrapper>
//                     </QuoteWrapperM>
//                     {/* <ErrorAddPlan>
//                       {errors[item] ? errors[item] : ""}
//                     </ErrorAddPlan> */}
//                   </div>
//                 );
//             })}
//           </div>
//         </div>
//       </PopupWrapperM>
//     </>
//   );
// };

// function GoBackButton({ groupCode, ...props }) {
//   const groupCodes = Object.keys(
//     useSelector(({ greetingPage }) => greetingPage.memberGroups),
//   );
//   const urlQuery = useUrlQuery();
//   const enquiryId = urlQuery.get("enquiryId");

//   const history = useHistory();
//   return (
//     <button
//       className="btn"
//       type="button"
//       onClick={() => {
//         groupCodes[1] && groupCodes[1] === groupCode
//           ? history.replace(
//               `/productdetails/${groupCodes[0]}?enquiryId=${enquiryId}`,
//             )
//           : history.replace(`/quotes/${groupCode}?enquiryId=${enquiryId}`);
//       }}
//       css={`
//         width: max-content;
//         padding: 0 !important;
//         margin-right: 10px;
//         margin-bottom: 10px;
//         color: var(--abc-red);
//         font-size: 17px;
//         display: flex;
//         align-items: center;
//       `}
//       {...props}
//     >
//       <div
//         className="d-flex justify-content-center align-items-center"
//         css={`
//           background: #f1f4f8;
//           width: 45px;
//           margin-right: 20px;
//           border-radius: 100%;
//           height: 45px;
//           color: #707b8b;
//         `}
//       >
//         <i className="fas fa-chevron-left"></i>
//       </div>
//       <span
//         css={`
//           color: #3b4c69;
//           font-weight: 600;
//         `}
//       >
//         Go Back
//       </span>
//     </button>
//   );
// }

// const ComparePage = () => {
//   const {
//     loading,
//     mergedQuotes,
//     showDiffCbx,
//     setshowDiffCbx,
//     removePlan,
//     QuotesToAdd,
//     handleCompare,
//     quotesForCompare,
//     mergedCover,
//     selectedAddPlan,
//     setSelectedAddPlan,
//     show,
//     setShow,
//     showM,
//     setShowM,
//     hideCells,
//     setHideCells,
//     showBuyNowPopup,
//     setShowBuyNowPopup,
//     imageSend,
//     imageSendM,
//     emailStatus,
//     errors,
//     setErrors,
//     discount,
//     removePlan2point0,
//   } = useComparePage();

//   const { theme } = useSelector(state => state.frontendBoot);

//   const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
//   const [windowHeight, windowWidth] = useWindowSize();
//   const [showShareQuoteModal, setShowShareQuoteModal] = useState(false);
//   const [email, setEmail] = useState();
//   const { groupCode } = useParams();
//   const [send, setSend] = useState(false);
//   const [value, setValue] = useState({});

//   const sendRef = useRef();
//   const dispatch = useDispatch();

//   const { proposerDetails } = useSelector(state => state.greetingPage);

//   const [width, setWidth] = useState(window.innerWidth);
//   return (
//     <>
//       {showBuyNowPopup && (
//         <BuyNowModal
//           showBuyNow={showBuyNowPopup}
//           setShowBuyNow={setShowBuyNowPopup}
//         />
//       )}

//       {loading ? (
//         <div>
//           <Container style={{ marginTop: "10px" }}>
//             <GoBackButton groupCode={groupCode} />
//             <CardSkeletonLoader noOfCards={3} />
//           </Container>
//         </div>
//       ) : (
//         <>
//           {" "}
//           {/*Mobile header - will visible only on mobie screen*/}
//           <div className="mobile-view" className="showOnMobile">
//             <MobileHeader
//               emailStatus={emailStatus}
//               EmailSent={EmailSent}
//               imageSend={imageSendM}
//               sendContent={sendContent}
//               groupCode={groupCode}
//               path={"/quotes"}
//             />
//             <ShowDiffMobile
//               showDiffCbx={showDiffCbx}
//               setshowDiffCbx={setshowDiffCbx}
//             />
//           </div>
//           <div className="agn-our-pricing pb-200 mgt-5 ">
//             {/* will visible only on desktop screen*/}
//             <div className="desktop-header hideOnMobile">
//               <ul
//                 className="menu topRight"
//                 css={`
//                   display: none;
//                 `}
//               >
//                 <li class="share bottom">
//                   <i class="fa fa-share-alt share"></i>
//                   <ul class="submenu">
//                     <li>
//                       <button
//                         onClick={() => {
//                           setSend("email");
//                         }}
//                       >
//                         <i class="fa fa-envelope-o"></i>
//                       </button>
//                     </li>
//                     <li>
//                       <button onClick={() => setSend("whatsapp")}>
//                         <i class="fa fa-whatsapp"></i>
//                       </button>
//                     </li>
//                   </ul>
//                 </li>
//               </ul>
//             </div>

//             {/* mobile content ( visible on mobile screen )*/}
//             <div id="printCompareM">
//               <div className="table-wrapper showOnMobile">
//                 <table className="table table-hover">
//                   <THeadM
//                     setShowM={setShowM}
//                     plans={mergedQuotes}
//                     removePlan={removePlan2point0}
//                     setshowDiffCbx={setshowDiffCbx}
//                     showDiffCbx={showDiffCbx}
//                     setShowBuyNowPopup={setShowBuyNowPopup}
//                   />
//                   <TBlank />
//                   <TBodyM
//                     title={"Plan Details"}
//                     showDiffCbx={showDiffCbx}
//                     plans={mergedQuotes}
//                     mergedCover={mergedCover}
//                   />

//                   <TBodyM
//                     title={"Key Benefits"}
//                     plans={mergedQuotes}
//                     showDiffCbx={showDiffCbx}
//                   />

//                   {mergedQuotes.length > 0 &&
//                     mergedQuotes[0].features?.map(
//                       (features, i) =>
//                         !hideCells.includes(features?.name) && (
//                           <>
//                             <TBodyM
//                               showDiffCbx={showDiffCbx}
//                               title={features?.name}
//                               plans={mergedQuotes}
//                               index={i}
//                               setHideCells={setHideCells}
//                               hideCells={hideCells}
//                             />
//                           </>
//                         ),
//                     )}

//                   <TBodyM
//                     title={"Permanent Exclusions"}
//                     plans={mergedQuotes}
//                     showDiffCbx={showDiffCbx}
//                   />
//                 </table>
//               </div>
//             </div>

//             {/* desktop conetent ( visible on desktop screen only ) */}
//             <Container
//               className="tab-content tab-content_mt_comapre hideOnMobile"
//               id="printCompare"
//               css={`
//                 @media (max-width: 1300px) {
//                   max-width: unset;
//                 }
//               `}
//             >
//               <div
//                 css={`
//                   display: flex;
//                   justify-content: space-between;
//                   align-items: center;
//                   width: 100% !important;
//                   padding-right: 15px;
//                   margin-top: 10px;
//                 `}
//               >
//                 <GoBackButton groupCode={groupCode} />
//                 <UpperModifier PrimaryColor={PrimaryColor}>
//                   <div className="right_midifiers d-flex justify-content-between align-items-center ">
//                     <button
//                       className="btn share_Quote_btn "
//                       onClick={() => setShowShareQuoteModal(true)}
//                       css={`
//                         border: solid 2 px ${PrimaryColor} !important;
//                         color: ${PrimaryColor};
//                       `}
//                     >
//                       <i class="fas fa-share "></i>{" "}
//                       <span
//                         css={`
//                           margin-left: 10px;
//                         `}
//                       >
//                         Share
//                       </span>
//                     </button>
//                   </div>
//                 </UpperModifier>
//               </div>
//               <div>
//                 <div className="table-wrapper">
//                   <table className="table table-hover">
//                     {console.log(mergedQuotes, "mergedQuotes")}
//                     <THead
//                       plans={mergedQuotes}
//                       setshowDiffCbx={setshowDiffCbx}
//                       showDiffCbx={showDiffCbx}
//                       removePlan={removePlan2point0}
//                       setShow={setShow}
//                       setShowBuyNowPopup={setShowBuyNowPopup}
//                     />
//                     <TBlank />
//                     <TBody
//                       title={"Plan Details"}
//                       plans={mergedQuotes}
//                       mergedCover={mergedCover}
//                     />
//                     <TBlank />
//                     <TBody title={"Key Benefits"} plans={mergedQuotes} />
//                     <TBlank />
//                     {mergedQuotes.length > 0 &&
//                       mergedQuotes[0].features?.map(
//                         (features, i) =>
//                           !hideCells.includes(features?.name) && (
//                             <>
//                               <TBody
//                                 showDiffCbx={showDiffCbx}
//                                 title={features?.name}
//                                 plans={mergedQuotes}
//                                 index={i}
//                                 setHideCells={setHideCells}
//                                 hideCells={hideCells}
//                               />
//                               <TBlank />
//                             </>
//                           ),
//                       )}
//                   </table>
//                 </div>
//               </div>
//             </Container>
//           </div>
//         </>
//       )}

//       <CardModalM
//         show={showM}
//         title={"Add upto 2 plans to compare"}
//         customClass={"addToCompare__Modal"}
//         buttonValue={"Compare"}
//         content={popupContentM(
//           QuotesToAdd,
//           quotesForCompare,
//           selectedAddPlan,
//           setSelectedAddPlan,
//           mergedQuotes,
//           removePlan2point0,
//           value,
//           setValue,
//           errors,
//           setErrors,
//           discount,
//           windowWidth,
//         )}
//         errorsFromCompare={
//           Object.keys(errors).length ? "You can add only upto 2 plans" : ""
//         }
//         handleClose={() => {
//           setShowM(false);
//           setSelectedAddPlan("");
//         }}
//         handleClick={() => {
//           setShowM(false);
//           setSelectedAddPlan("");
//         }}
//       />

//       <CardModal
//         CompareBtnOnTop={true}
//         className="hideOnMobile"
//         show={show}
//         title={"Add upto 3 plans to compare"}
//         customClass={"addToCompare__Modal"}
//         buttonValue={"Compare"}
//         content={popupContent(
//           QuotesToAdd,
//           quotesForCompare,
//           selectedAddPlan,
//           setSelectedAddPlan,
//           mergedQuotes,
//           removePlan2point0,
//           value,
//           setValue,
//           errors,
//           setErrors,
//           discount,
//         )}
//         errorsFromCompare={
//           Object.keys(errors).length ? "You can add only upto 3 plans" : ""
//         }
//         handleClose={() => {
//           setShow(false);
//           setSelectedAddPlan("");
//         }}
//         handleClick={() => {
//           setShow(false);
//           setSelectedAddPlan("");
//         }}
//       />
//       <CardModal
//         show={send}
//         content={sendContent(
//           send,
//           proposerDetails?.name?.split(" ")[0],
//           imageSend,
//           email,
//           setEmail,
//           emailStatus,
//           sendRef,
//         )}
//         showButton={false}
//         handleClose={() => setSend(false)}
//       />
//       <ShareQuoteModal
//         show={showShareQuoteModal}
//         handleClose={() => setShowShareQuoteModal(false)}
//         imageSend={imageSend}
//         emailStatus={emailStatus}
//       />
//     </>
//   );
// };

// export default ComparePage;

// const ImageLogo = styled.img`
//   border-radius: unset !important;
//   margin-top: 8px;
//   height: 40px;
//   width: 40px;
// `;
// const UpperModifier = styled.div`
//   .right_midifiers {
//     .btn {
//       background-color: white;
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       padding: 8px 25px;
//       margin-left: 7px;
//       border-radius: 31px;
//       font-weight: 500;
//       border: solid 2px ${props => props.PrimaryColor} !important;
//     }
//     .share_Quote_btn {
//       // border: solid 2px #0a87ff !important;
//       // color: #0a87ff;

//       :focus {
//         border: solid 2px #0a87ff !important;
//       }
//       :active {
//         border: solid 2px #0a87ff !important;
//       }
//       :hover {
//         border: solid 2px #0a87ff !important;
//       }
//     }
//   }
// `;
