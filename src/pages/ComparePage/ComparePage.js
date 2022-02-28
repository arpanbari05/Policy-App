import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  CircleLoader,
  FullScreenLoader,
  GoBackButton,
  Page,
} from "../../components";
import {
  useCompareFeature,
  useFeatureLoadHandler,
  useFrontendBoot,
  useGetQuotes,
  useQuotesCompare,
  useTheme,
  useToggle,
  useUrlEnquiry,
} from "../../customHooks";
import { useHistory, useParams } from "react-router-dom";
import "styled-components/macro";
import { BiPrinter } from "react-icons/bi";
import { getFeatureForQuotes, numToLakh } from "../../utils/helper";
import { useGetCompareFeaturesQuery } from "../../api/api";
import {
  BASIC_FEATURES,
  DESCRIPTIONS,
  SPECIAL_FEATURES,
  WAITING_PERIOD,
  WHATS_NOT_COVERED,
} from "./data";
import { every, uniq } from "lodash";
import { useEffect } from "react";
import { downloadComparePage } from "./utils";
import { ProductCard, ShowDifference } from "./components";
import { AddPlanCard, OptionalCoversValue } from "./mobile/components";
import AddPlansModal from "./components/AddPlansModal";
import { useState } from "react";

function ComparePage() {
  const { groupCode } = useParams();
  const [selectedSectionView, setSelectedSectionView] = useState({});
  const [isSelectedSectionView, setIsSelectedSectionView] = useState(false);

  useEffect(() => {
    const value = Object.keys(selectedSectionView).find(
      value => selectedSectionView[`${value}`] === true,
    );
    if (!value) {
      setIsSelectedSectionView(false);
    }
  }, [selectedSectionView]);

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
        <BackButton />
        <CompareHeaderWrap>
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
              onChange={showDifferenceToggle.toggle}
              checked={showDifferenceToggle.isOn}
            />
            <DownloadButton />
          </div>
          <CompareProductCards compareQuotes={compareQuotes} />
        </CompareHeaderWrap>
        <div className="mt-3">
          {isSelectedSectionView ? (
            Object.keys(selectedSectionView).find(value => {
              if (value === "Sum Insured" || value === "Tenure") {
                if (selectedSectionView[`${value}`] === true) return value;
              }
            }) && (
              <PlanDetailsSection
                compareQuotes={compareQuotes}
                select={{
                  selectedSectionView,
                  setSelectedSectionView,
                  isSelectedSectionView,
                  setIsSelectedSectionView,
                }}
              />
            )
          ) : (
            <PlanDetailsSection
              compareQuotes={compareQuotes}
              select={{
                selectedSectionView,
                setSelectedSectionView,
                isSelectedSectionView,
                setIsSelectedSectionView,
              }}
            />
          )}

          {isSelectedSectionView ? (
            Object.keys(selectedSectionView).find(value => {
              if (value === "Unique Feature") {
                if (selectedSectionView[`${value}`] === true) return value;
              }
            }) && (
              <KeyBenefitsSection
                compareQuotes={compareQuotes}
                select={{
                  selectedSectionView,
                  setSelectedSectionView,
                  isSelectedSectionView,
                  setIsSelectedSectionView,
                }}
              />
            )
          ) : (
            <KeyBenefitsSection
              compareQuotes={compareQuotes}
              select={{
                selectedSectionView,
                setSelectedSectionView,
                isSelectedSectionView,
                setIsSelectedSectionView,
              }}
            />
          )}

          {/* ==================  Basic Features ===================== */}

          {isSelectedSectionView ? (
            Object.keys(selectedSectionView).find(value => {
              if (
                BASIC_FEATURES.findIndex(item => item.title === value) !== -1
              ) {
                if (selectedSectionView[`${value}`] === true) return value;
              }
            }) && (
              <BasicFeaturesSection
                compareQuotes={compareQuotes}
                showDifference={showDifferenceToggle.isOn}
                select={{
                  selectedSectionView,
                  setSelectedSectionView,
                  isSelectedSectionView,
                  setIsSelectedSectionView,
                }}
              />
            )
          ) : (
            <BasicFeaturesSection
              compareQuotes={compareQuotes}
              showDifference={showDifferenceToggle.isOn}
              select={{
                selectedSectionView,
                setSelectedSectionView,
                isSelectedSectionView,
                setIsSelectedSectionView,
              }}
            />
          )}

          {/* ================ Spacial Features ==================== */}

          {isSelectedSectionView ? (
            Object.keys(selectedSectionView).find(value => {
              if (
                SPECIAL_FEATURES.findIndex(item => item.title === value) !== -1
              ) {
                if (selectedSectionView[`${value}`] === true) return value;
              }
            }) && (
              <SpecialFeaturesSection
                compareQuotes={compareQuotes}
                select={{
                  selectedSectionView,
                  setSelectedSectionView,
                  isSelectedSectionView,
                  setIsSelectedSectionView,
                }}
              />
            )
          ) : (
            <SpecialFeaturesSection
              compareQuotes={compareQuotes}
              select={{
                selectedSectionView,
                setSelectedSectionView,
                isSelectedSectionView,
                setIsSelectedSectionView,
              }}
            />
          )}

          {/* ================= Additional-Benefits */}

          {isSelectedSectionView ? (
            Object.keys(selectedSectionView).find(value => {
              if (value === "Optional Covers") {
                if (selectedSectionView[`${value}`] === true) return value;
              }
            }) && (
              <OptionalCoversSection
                compareQuotes={compareQuotes}
                select={{
                  selectedSectionView,
                  setSelectedSectionView,
                  isSelectedSectionView,
                  setIsSelectedSectionView,
                }}
              />
            )
          ) : (
            <OptionalCoversSection
              compareQuotes={compareQuotes}
              select={{
                selectedSectionView,
                setSelectedSectionView,
                isSelectedSectionView,
                setIsSelectedSectionView,
              }}
            />
          )}

          {/* ================ Waiting Period ================ */}
          {isSelectedSectionView ? (
            Object.keys(selectedSectionView).find(value => {
              if (
                WAITING_PERIOD.findIndex(item => item.title === value) !== -1
              ) {
                if (selectedSectionView[`${value}`] === true) return value;
              }
            }) && (
              <WaitingPeriodSection
                compareQuotes={compareQuotes}
                select={{
                  selectedSectionView,
                  setSelectedSectionView,
                  isSelectedSectionView,
                  setIsSelectedSectionView,
                }}
              />
            )
          ) : (
            <WaitingPeriodSection
              compareQuotes={compareQuotes}
              select={{
                selectedSectionView,
                setSelectedSectionView,
                isSelectedSectionView,
                setIsSelectedSectionView,
              }}
            />
          )}

          {/* ============== What Not Covered ================ */}

          {isSelectedSectionView ? (
            Object.keys(selectedSectionView).find(value => {
              if (
                WHATS_NOT_COVERED.findIndex(item => item.title === value) !== -1
              ) {
                if (selectedSectionView[`${value}`] === true) return value;
              }
            }) && (
              <WhatsNotCoveredSection
                compareQuotes={compareQuotes}
                select={{
                  selectedSectionView,
                  setSelectedSectionView,
                  isSelectedSectionView,
                  setIsSelectedSectionView,
                }}
              />
            )
          ) : (
            <WhatsNotCoveredSection
              compareQuotes={compareQuotes}
              select={{
                selectedSectionView,
                setSelectedSectionView,
                isSelectedSectionView,
                setIsSelectedSectionView,
              }}
            />
          )}
        </div>
      </Container>
    </Page>
  );
}

function OptionalCoversSection({ compareQuotes, select }) {
  const { updateCompareQuote } = useQuotesCompare();
  const { groupCode } = useParams();

  const handleRidersChange = ({ riders, quote }) => {
    updateCompareQuote({
      updatedQuote: { ...quote, riders },
      previousQuote: quote,
      groupCode,
    });
  };

  return (
    <CompareSection
      title="Additional Benefits"
      description="You can add 'Riders' to your basic health insurance plan for additional benefits."
    >
      {!select.isSelectedSectionView ? (
        <FeatureRow title="Optional Covers" select={select}>
          {compareQuotes.map((quote, idx) => (
            <OptionalCoversValue
              quote={quote}
              onChange={handleRidersChange}
              key={idx}
            />
          ))}
        </FeatureRow>
      ) : (
        select.selectedSectionView["Optional Covers"] && (
          <FeatureRow title="Optional Covers" select={select}>
            {compareQuotes.map((quote, idx) => (
              <OptionalCoversValue
                quote={quote}
                onChange={handleRidersChange}
                key={idx}
              />
            ))}
          </FeatureRow>
        )
      )}
    </CompareSection>
  );
}

export default ComparePage;

function CompareHeaderWrap({ children, ...props }) {
  const { boxShadows } = useTheme();

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
      {children}
    </div>
  );
}

function CompareProductCards({ compareQuotes = [], ...props }) {
  const { groupCode } = useParams();

  const { removeCompareQuote } = useQuotesCompare();

  const handleRemove = quote => removeCompareQuote({ quote, groupCode });
  return (
    <div
      className="d-flex"
      css={`
        flex: 1;
        gap: 6em;
        & > div {
          flex: 1;
        }
      `}
      {...props}
    >
      {compareQuotes.map((quote, idx) => (
        <ProductCard
          quote={quote}
          key={quote.company_alias + quote.sum_insured + idx}
          onRemove={handleRemove}
        />
      ))}
      {Array.from({ length: 3 - compareQuotes.length }).map((_, idx) => (
        <AddPlanCard key={idx} compareQuotes={compareQuotes}>
          <AddPlansModal compareQuotes={compareQuotes} />
        </AddPlanCard>
      ))}
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

function PlanDetailsSection({ compareQuotes = [], select, ...props }) {
  const { journeyType } = useFrontendBoot();

  return (
    <CompareSection title="Plan Details" {...props}>
      {journeyType === "top_up" ? (
        <FeatureRow title={"Deductible"} description="" select={select}>
          {compareQuotes.map((quote, idx) => (
            <DeductibleFeatureValue
              key={quote.deductible + quote.product.id + idx}
              compareQuote={quote}
            />
          ))}
        </FeatureRow>
      ) : null}

      {!select.isSelectedSectionView ? (
        <FeatureRow
          title={"Sum Insured"}
          description={DESCRIPTIONS["sum_insured"]}
          select={select}
        >
          {compareQuotes.map((quote, idx) => (
            <SumInsuredFeatureValue
              key={quote.sum_insured + quote.product.id + idx}
              compareQuote={quote}
            />
          ))}
        </FeatureRow>
      ) : (
        select.selectedSectionView["Sum Insured"] && (
          <FeatureRow
            title={"Sum Insured"}
            description={DESCRIPTIONS["sum_insured"]}
            select={select}
          >
            {compareQuotes.map((quote, idx) => (
              <SumInsuredFeatureValue
                key={quote.sum_insured + quote.product.id + idx}
                compareQuote={quote}
              />
            ))}
          </FeatureRow>
        )
      )}

      {!select.isSelectedSectionView ? (
        <FeatureRow title={"Tenure"} select={select}>
          {compareQuotes.map((quote, idx) => (
            <div
              key={quote.tenure + quote.sum_insured + quote.product.id + idx}
            >
              {quote.tenure + `${quote.tenure > 1 ? " Years" : " Year"}`}
            </div>
          ))}
        </FeatureRow>
      ) : (
        select.selectedSectionView["Tenure"] && (
          <FeatureRow title={"Tenure"} select={select}>
            {compareQuotes.map((quote, idx) => (
              <div
                key={quote.tenure + quote.sum_insured + quote.product.id + idx}
              >
                {quote.tenure + `${quote.tenure > 1 ? " Years" : " Year"}`}
              </div>
            ))}
          </FeatureRow>
        )
      )}
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
        <div>{numToLakh(compareQuote.sum_insured)}</div>
      ) : (
        <select value={compareQuote.sum_insured} onChange={handleChange}>
          {sumInsureds.map(sumInsured => (
            <option key={sumInsured} value={sumInsured}>
              {numToLakh(sumInsured)}
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

function KeyBenefitsSection({ compareQuotes = [], select, ...props }) {
  const uniqueFeatures = getFeatureForQuotes(compareQuotes, "unique_feature");

  return (
    <CompareSection title="Key Benefits" {...props}>
      {!select.isSelectedSectionView ? (
        <FeatureRow title={"Unique Feature"} select={select}>
          {uniqueFeatures.map((feature, idx) =>
            feature ? (
              <div key={feature.code + idx}>
                <ul>
                  {feature &&
                    feature.value?.split("\n").map(value => <li>{value}</li>)}
                </ul>
              </div>
            ) : null,
          )}
        </FeatureRow>
      ) : (
        select.selectedSectionView["Unique Feature"] && (
          <FeatureRow title={"Unique Feature"} select={select}>
            {uniqueFeatures.map((feature, idx) =>
              feature ? (
                <div key={feature.code + idx}>
                  <ul>
                    {feature &&
                      feature.value?.split("\n").map(value => <li>{value}</li>)}
                  </ul>
                </div>
              ) : null,
            )}
          </FeatureRow>
        )
      )}
    </CompareSection>
  );
}

function BasicFeaturesSection({
  compareQuotes = [],
  showDifference = false,
  select,
  ...props
}) {
  const { features, onLoad } = useFeatureLoadHandler();
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
        return !select.isSelectedSectionView ? (
          <FeatureRow
            title={feature.title}
            key={feature.title}
            description={feature.description}
            select={select}
          >
            {compareQuotes.map((quote, idx) => (
              <FeatureValue
                compareQuote={quote}
                sectionTitle={"Basic Features"}
                featureTitle={feature.title}
                key={quote.product.id + quote.sum_insured + idx}
                onLoad={onLoad}
                tooltipPlacement={idx === 2 ? "left" : "right"}
              />
            ))}
          </FeatureRow>
        ) : (
          select.selectedSectionView[`${feature.title}`] && (
            <FeatureRow
              title={feature.title}
              key={feature.title}
              description={feature.description}
              select={select}
            >
              {compareQuotes.map((quote, idx) => (
                <FeatureValue
                  compareQuote={quote}
                  sectionTitle={"Basic Features"}
                  featureTitle={feature.title}
                  key={quote.product.id + quote.sum_insured + idx}
                  onLoad={onLoad}
                  tooltipPlacement={idx === 2 ? "left" : "right"}
                />
              ))}
            </FeatureRow>
          )
        );
      })}
    </CompareSection>
  );
}

function SpecialFeaturesSection({ compareQuotes = [], select, ...props }) {
  return (
    <CompareSection title="Special Features" {...props}>
      {SPECIAL_FEATURES.map(feature =>
        !select.isSelectedSectionView ? (
          <FeatureRow
            title={feature.title}
            key={feature.title}
            description={feature.description}
            select={select}
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
        ) : (
          select.selectedSectionView[`${feature.title}`] && (
            <FeatureRow
              title={feature.title}
              key={feature.title}
              description={feature.description}
              select={select}
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
          )
        ),
      )}
    </CompareSection>
  );
}

function WaitingPeriodSection({ compareQuotes = [], select, ...props }) {
  return (
    <CompareSection title="Waiting Period" {...props}>
      {WAITING_PERIOD.map(feature =>
        !select.isSelectedSectionView ? (
          <FeatureRow
            title={feature.title}
            key={feature.title}
            description={feature.description}
            select={select}
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
        ) : (
          select.selectedSectionView[`${feature.title}`] && (
            <FeatureRow
              title={feature.title}
              key={feature.title}
              description={feature.description}
              select={select}
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
          )
        ),
      )}
    </CompareSection>
  );
}

function WhatsNotCoveredSection({ compareQuotes = [], select, ...props }) {
  return (
    <CompareSection title="What's not covered?" {...props}>
      {WHATS_NOT_COVERED.map(feature =>
        !select.isSelectedSectionView ? (
          <FeatureRow
            title={feature.title}
            key={feature.title}
            description={feature.description}
            select={select}
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
        ) : (
          select.selectedSectionView[`${feature.title}`] && (
            <FeatureRow
              title={feature.title}
              key={feature.title}
              description={feature.description}
              select={select}
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
          )
        ),
      )}
    </CompareSection>
  );
}

const renderTooltipDesc = ({ props, description }) => (
  <Tooltip {...props}>{description}</Tooltip>
);

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
  } = useCompareFeature(compareQuote);

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
  select,
  ...props
}) {
  const { colors } = useTheme();
  const [selectBlock, setSelectBlock] = useState(false);

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
        <section
          css={`
            display: flex;
            align-items: center;
            gap: 10px;
          `}
        >
          <input
            type="checkbox"
            css={`
              height: 17px;
              width: 17px;
            `}
            onChange={() => {
              let demoObject = {};

              if (!selectBlock) {
                setSelectBlock(true);
                demoObject[`${title}`] = true;
                select.setSelectedSectionView({
                  ...select.selectedSectionView,
                  ...demoObject,
                });
              } else {
                setSelectBlock(false);
                demoObject[`${title}`] = false;
                select.setSelectedSectionView({
                  ...select.selectedSectionView,
                  ...demoObject,
                });
              }
            }}
          />

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
        </section>
        {selectBlock && (
          <button
            css={`
              color: #0a87ff;
              text-decoration: underline;
              padding-left: 24px;
              cursor: pointer;
              font-size: 13px;
              font-weight: 600;
              margin-top: 10px;
            `}
            onClick={() => {
              if (select.isSelectedSectionView) {
                select.setIsSelectedSectionView(false);
              } else {
                select.setIsSelectedSectionView(true);
              }
            }}
          >
            {select.isSelectedSectionView
              ? "Show All Rows"
              : "Show Only Selected"}
          </button>
        )}
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
