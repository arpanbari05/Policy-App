import { useParams } from "react-router-dom";
import { CircleLoader } from "../../../components";
import {
  useCompareFeature,
  useFeatureLoadHandler,
  useGetQuote,
  useQuotesCompare,
  useTheme,
  useToggle,
} from "../../../customHooks";
import { ProductCard, ShowDifference } from "../components";
import { useGetCompareQuotesQuery } from "../../../api/api";
import CardSkeletonLoader from "../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import {
  getFeature,
  getSumInsureds,
  matchGroupCodes,
  matchQuotes,
  numberToDigitWord,
  tenureInWords,
} from "../../../utils/helper";
import {
  AddPlanCard,
  FeatureRow,
  FeatureSection,
  FeatureValue,
  Header,
} from "./components";
import "styled-components/macro";
import {
  BASIC_FEATURES,
  DESCRIPTIONS,
  SPECIAL_FEATURES,
  WAITING_PERIOD,
  WHATS_NOT_COVERED,
} from "../data";
import { useEffect } from "react";
import { useState } from "react";
import _ from "lodash";

function ComparePage() {
  const { colors } = useTheme();
  const { data, isLoading, isUninitialized, isError } =
    useGetCompareQuotesQuery();

  const { groupCode } = useParams();

  const differenceToggle = useToggle(false);

  const { removeCompareQuote } = useQuotesCompare();

  const handleRemove = quote => removeCompareQuote({ quote, groupCode });

  if (isLoading || isUninitialized) return <CardSkeletonLoader />;

  if (isError) return <p>Something went wrong!</p>;

  const { products } = data.data;

  const compareQuotes = products.find(compareQuotesGroup =>
    matchGroupCodes(compareQuotesGroup.group, groupCode),
  );

  if (!compareQuotes) return <p>No quotes found!</p>;

  const { quotes } = compareQuotes;

  const handleDifferenceChange = checked => {
    if (checked) {
      differenceToggle.on();
      return;
    }
    differenceToggle.off();
  };

  return (
    <div>
      <Header />

      <section
        className="p-2 d-flex align-items-center"
        css={`
          background-color: ${colors.secondary_shade};
        `}
      >
        <ShowDifference
          checked={differenceToggle.isOn}
          onChange={handleDifferenceChange}
        />
      </section>

      <section
        className="p-3 d-flex position-sticky"
        css={`
          gap: 1em;
          top: 0;
          background-color: #fff;
          z-index: 999;
          & > div {
            flex: 1;
          }
        `}
      >
        {quotes.map((quote, idx) => (
          <ProductCard quote={quote} onRemove={handleRemove} key={idx} />
        ))}
        {_.range(2 - quotes.length).map(idx => (
          <AddPlanCard />
        ))}
      </section>

      <SumInsuredSection quotes={quotes} />

      <FeatureSection title={"Tenure"} description={DESCRIPTIONS["tenure"]}>
        <FeatureRow>
          {quotes.map((quote, idx) => (
            <FeatureValue key={idx}>
              <select value={quote.tenure}>
                <option value={quote.tenure}>
                  {tenureInWords(quote.tenure)}
                </option>
              </select>
            </FeatureValue>
          ))}
        </FeatureRow>
      </FeatureSection>

      <UniqueFeaturesSection quotes={quotes} />

      <CompareFeatureSection
        sectionTitle="Basic Features"
        features={BASIC_FEATURES}
        quotes={quotes}
        difference={differenceToggle.isOn}
      />

      <CompareFeatureSection
        sectionTitle="Special Features"
        features={SPECIAL_FEATURES}
        quotes={quotes}
        difference={differenceToggle.isOn}
      />

      <CompareFeatureSection
        sectionTitle="Waiting Period"
        features={WAITING_PERIOD}
        quotes={quotes}
        difference={differenceToggle.isOn}
      />

      <CompareFeatureSection
        sectionTitle="What's not covered?"
        features={WHATS_NOT_COVERED}
        quotes={quotes}
        difference={differenceToggle.isOn}
      />
    </div>
  );
}

function CompareFeatureSection({
  sectionTitle = "",
  features = [],
  quotes,
  difference = true,
}) {
  const [sameFeatures, setSameFeatures] = useState({});

  const handleFeaturesLoad = section => {
    setSameFeatures(currentSameFeatures => ({
      ...currentSameFeatures,
      ...section,
    }));
  };

  return (
    <>
      {features.map(feature => {
        if (sameFeatures[feature.title] && difference) return null;
        return (
          <FeatureSection
            key={feature.title}
            title={feature.title}
            description={feature.description}
          >
            <CompareFeatureRow
              quotes={quotes}
              sectionTitle={sectionTitle}
              feature={feature}
              onFeaturesLoad={handleFeaturesLoad}
            />
          </FeatureSection>
        );
      })}
    </>
  );
}

function CompareFeatureRow({ quotes, sectionTitle, feature, onFeaturesLoad }) {
  const { features, onLoad } = useFeatureLoadHandler();

  useEffect(() => {
    if (
      features &&
      features[feature.title] &&
      features[feature.title].every(val => val === features[feature.title][0])
    ) {
      onFeaturesLoad && onFeaturesLoad({ [feature.title]: true });
      return;
    }
    onFeaturesLoad && onFeaturesLoad({ [feature.title]: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feature.title, features]);

  return (
    <FeatureRow>
      {quotes.map((quote, idx) => (
        <CompareFeatureValue
          quote={quote}
          key={idx}
          sectionTitle={sectionTitle}
          featureTitle={feature.title}
          onLoad={onLoad}
        />
      ))}
    </FeatureRow>
  );
}

function CompareFeatureValue({ quote, sectionTitle, featureTitle, onLoad }) {
  const {
    query: { isLoading },
    getFeature,
  } = useCompareFeature(quote);

  const feature = getFeature({ sectionTitle, featureTitle });

  useEffect(() => {
    if (feature) onLoad && onLoad({ featureTitle, feature });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feature]);

  if (isLoading) return <FeatureValue isLoading={isLoading} />;

  if (!feature) return null;

  return <FeatureValue>{feature.feature_value}</FeatureValue>;
}

function SumInsuredSection({ quotes, onChange, ...props }) {
  return (
    <FeatureSection
      title={"Sum Insured"}
      description={DESCRIPTIONS["sum_insured"]}
      {...props}
    >
      <FeatureRow>
        {quotes.map((quote, idx) => (
          <SumInsuredFeatureValue quote={quote} key={idx} />
        ))}
      </FeatureRow>
    </FeatureSection>
  );
}

function SumInsuredFeatureValue({ quote }) {
  const { icQuotes, isLoading } = useGetQuote(quote.company_alias);

  const isCurrentCompareQuote = quoteToCheck =>
    matchQuotes(quote, quoteToCheck, { sum_insured: false });

  const currentQuotes = icQuotes
    ? icQuotes.data?.data.filter(isCurrentCompareQuote)
    : [];

  const sumInsureds = getSumInsureds(currentQuotes);

  return (
    <FeatureValue>
      {isLoading ? (
        <div>{numberToDigitWord(quote.sum_insured)}</div>
      ) : (
        <select value={quote.sum_insured} onChange={alert}>
          {sumInsureds.map(sumInsured => (
            <option key={sumInsured} value={sumInsured}>
              {numberToDigitWord(sumInsured)}
            </option>
          ))}
        </select>
      )}
      {isLoading ? <CircleLoader animation="border" /> : null}
    </FeatureValue>
  );
}

function UniqueFeaturesSection({ quotes }) {
  return (
    <FeatureSection
      title={"Unique Features"}
      description={DESCRIPTIONS["unique_features"]}
    >
      <FeatureRow>
        {quotes.map((quote, idx) => (
          <UniqueFeatureValue key={idx} quote={quote} />
        ))}
      </FeatureRow>
    </FeatureSection>
  );
}

function UniqueFeatureValue({ quote }) {
  const unique_features = getFeature(quote, "unique_feature");

  if (!unique_features) return null;

  return (
    <FeatureValue>
      <div
        className="h-100"
        css={`
          white-space: pre-wrap;
        `}
      >
        {unique_features.value}
      </div>
    </FeatureValue>
  );
}

export default ComparePage;
