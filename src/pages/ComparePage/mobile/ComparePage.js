import { useEffect, useState } from "react";
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
  OptionalCoversValue,
} from "./components";
import "styled-components/macro";
import {
  BASIC_FEATURES,
  DESCRIPTIONS,
  SPECIAL_FEATURES,
  WAITING_PERIOD,
  WHATS_NOT_COVERED,
} from "../data";
import _ from "lodash";
import AddPlansModal from "../components/AddPlansModal";
import TenureFeatureValueMobile from "../components/tenure/TenureMobile";

function findQuoteBySumInsured(quotes, sum_insured) {
  return quotes.find(
    quote => parseInt(quote.sum_insured) === parseInt(sum_insured),
  );
}

function ComparePage() {
  const [selectedSectionView, setSelectedSectionView] = useState({});
  const [isSelectedSectionView, setIsSelectedSectionView] = useState(false);
  const { colors } = useTheme();
  const { data, isLoading, isUninitialized, isError } =
    useGetCompareQuotesQuery();

  useEffect(() => {
    const value = Object.keys(selectedSectionView).find(
      value => selectedSectionView[`${value}`] === true,
    );
    if (!value) {
      setIsSelectedSectionView(false);
    }
  }, [selectedSectionView]);

  const { groupCode } = useParams();

  const differenceToggle = useToggle(false);

  const { removeCompareQuote, updateCompareQuote } = useQuotesCompare();

  const handleRemove = quote => removeCompareQuote({ quote, groupCode });

  if (isLoading || isUninitialized) return <CardSkeletonLoader />;

  if (isError) return <p>Something went wrong!</p>;

  const { products } = data.data;

  const compareQuotes = products.find(compareQuotesGroup =>
    matchGroupCodes(compareQuotesGroup.group, groupCode),
  );

  if (!compareQuotes) return <p>No quotes found!</p>;

  const quotes = compareQuotes.quotes.slice(0, 2);

  const handleDifferenceChange = checked => {
    if (checked) {
      differenceToggle.on();
      return;
    }
    differenceToggle.off();
  };

  const handleRidersChange = ({ riders, quote }) => {
    updateCompareQuote({
      updatedQuote: { ...quote, riders },
      previousQuote: quote,
      groupCode,
    });
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
          <AddPlanCard key={idx}>
            <AddPlansModal compareQuotes={quotes} />
          </AddPlanCard>
        ))}
      </section>

      <SumInsuredSection
        quotes={quotes}
        select={{
          isSelectedSectionView,
          setIsSelectedSectionView,
          selectedSectionView,
          setSelectedSectionView,
        }}
      />

      {!isSelectedSectionView ? (
        <FeatureSection
          title={"Tenure"}
          description={DESCRIPTIONS["tenure"]}
          select={{
            isSelectedSectionView,
            setIsSelectedSectionView,
            selectedSectionView,
            setSelectedSectionView,
          }}
        >
          <FeatureRow>
            {quotes.map((quote, idx) => (
              <TenureFeatureValueMobile
                quote={quote}
                groupCode={groupCode}
                select={{
                  isSelectedSectionView,
                  setIsSelectedSectionView,
                  selectedSectionView,
                  setSelectedSectionView,
                }}
              />
            ))}
          </FeatureRow>
        </FeatureSection>
      ) : selectedSectionView["Tenure"] ? (
        <FeatureSection
          title={"Tenure"}
          description={DESCRIPTIONS["tenure"]}
          select={{
            isSelectedSectionView,
            setIsSelectedSectionView,
            selectedSectionView,
            setSelectedSectionView,
          }}
        >
          <FeatureRow>
            {quotes.map((quote, idx) => (
              <TenureFeatureValueMobile
                quotes={quotes}
                select={{
                  isSelectedSectionView,
                  setIsSelectedSectionView,
                  selectedSectionView,
                  setSelectedSectionView,
                }}
              />
            ))}
          </FeatureRow>
        </FeatureSection>
      ) : (
        <></>
      )}

      <UniqueFeaturesSection
        quotes={quotes}
        select={{
          isSelectedSectionView,
          setIsSelectedSectionView,
          selectedSectionView,
          setSelectedSectionView,
        }}
      />

      <CompareFeatureSection
        sectionTitle="Basic Features"
        features={BASIC_FEATURES}
        quotes={quotes}
        difference={differenceToggle.isOn}
        select={{
          isSelectedSectionView,
          setIsSelectedSectionView,
          selectedSectionView,
          setSelectedSectionView,
        }}
      />

      <CompareFeatureSection
        sectionTitle="Special Features"
        features={SPECIAL_FEATURES}
        quotes={quotes}
        difference={differenceToggle.isOn}
        select={{
          isSelectedSectionView,
          setIsSelectedSectionView,
          selectedSectionView,
          setSelectedSectionView,
        }}
      />

      <OptionalCoversSection
        quotes={quotes}
        onChange={handleRidersChange}
        select={{
          isSelectedSectionView,
          setIsSelectedSectionView,
          selectedSectionView,
          setSelectedSectionView,
        }}
      />

      <CompareFeatureSection
        sectionTitle="Waiting Period"
        features={WAITING_PERIOD}
        quotes={quotes}
        difference={differenceToggle.isOn}
        select={{
          isSelectedSectionView,
          setIsSelectedSectionView,
          selectedSectionView,
          setSelectedSectionView,
        }}
      />

      <CompareFeatureSection
        sectionTitle="What's not covered?"
        features={WHATS_NOT_COVERED}
        quotes={quotes}
        difference={differenceToggle.isOn}
        select={{
          isSelectedSectionView,
          setIsSelectedSectionView,
          selectedSectionView,
          setSelectedSectionView,
        }}
      />
    </div>
  );
}

function CompareFeatureSection({
  sectionTitle = "",
  features = [],
  quotes,
  select,
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
        return !select.isSelectedSectionView ? (
          <FeatureSection
            key={feature.title}
            title={feature.title}
            description={feature.description}
            select={select}
          >
            <CompareFeatureRow
              quotes={quotes}
              sectionTitle={sectionTitle}
              feature={feature}
              onFeaturesLoad={handleFeaturesLoad}
            />
          </FeatureSection>
        ) : select.selectedSectionView[`${feature.title}`] ? (
          <FeatureSection
            key={feature.title}
            title={feature.title}
            description={feature.description}
            select={select}
          >
            <CompareFeatureRow
              quotes={quotes}
              sectionTitle={sectionTitle}
              feature={feature}
              onFeaturesLoad={handleFeaturesLoad}
            />
          </FeatureSection>
        ) : (
          <></>
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

function SumInsuredSection({ quotes, select, onChange, ...props }) {
  return !select.isSelectedSectionView ? (
    <FeatureSection
      title={"Sum Insured"}
      description={DESCRIPTIONS["sum_insured"]}
      select={select}
      {...props}
    >
      <FeatureRow>
        {quotes.map((quote, idx) => (
          <SumInsuredFeatureValue
            quote={quote}
            key={idx}
            onChange={onChange}
            allQuotes={quotes}
          />
        ))}
      </FeatureRow>
    </FeatureSection>
  ) : select.selectedSectionView["Sum Insured"] ? (
    <FeatureSection
      title={"Sum Insured"}
      description={DESCRIPTIONS["sum_insured"]}
      select={select}
      {...props}
    >
      <FeatureRow>
        {quotes.map((quote, idx) => (
          <SumInsuredFeatureValue quote={quote} key={idx} onChange={onChange} />
        ))}
      </FeatureRow>
    </FeatureSection>
  ) : (
    <></>
  );
}

function SumInsuredFeatureValue({ quote, onChange, allQuotes }) {
  const { icQuotes, isLoading } = useGetQuote(quote.company_alias);

  const { groupCode } = useParams();

  const { updateCompareQuote } = useQuotesCompare();

  const isCurrentCompareQuote = quoteToCheck =>
    matchQuotes(quote, quoteToCheck, { sum_insured: false });

  const currentQuotes = icQuotes
    ? icQuotes.data?.data.filter(isCurrentCompareQuote)
    : [];

  const sumInsureds = getSumInsureds(currentQuotes);
  const similarQuotes = allQuotes.filter(
    quoteValue =>
      quoteValue.product.name === quote.product.name &&
      quoteValue.sum_insured.toString() !== quote.sum_insured.toString(),
  );

  const handleChange = evt => {
    const updatedQuote = findQuoteBySumInsured(currentQuotes, evt.target.value);
    updateCompareQuote({ updatedQuote, previousQuote: quote, groupCode });
    onChange && onChange(quote, evt.target.value);
  };

  return (
    <FeatureValue>
      {isLoading ? (
        <div>{numberToDigitWord(quote.sum_insured)}</div>
      ) : (
        <select value={quote.sum_insured} onChange={handleChange}>
          {sumInsureds.map(sumInsured => {
            const index = similarQuotes.findIndex(
              quoteData => quoteData.sum_insured === sumInsured,
            );

            return (
              index === -1 && (
                <option key={sumInsured} value={sumInsured}>
                  {numberToDigitWord(sumInsured)}
                </option>
              )
            );
          })}
        </select>
      )}
      {isLoading ? <CircleLoader animation="border" /> : null}
    </FeatureValue>
  );
}

function UniqueFeaturesSection({ quotes, select }) {
  return !select.isSelectedSectionView ? (
    <FeatureSection
      title={"Unique Features"}
      description={DESCRIPTIONS["unique_features"]}
      select={select}
    >
      <FeatureRow>
        {quotes.map((quote, idx) => (
          <UniqueFeatureValue key={idx} quote={quote} />
        ))}
      </FeatureRow>
    </FeatureSection>
  ) : select.selectedSectionView["Unique Features"] ? (
    <FeatureSection
      title={"Unique Features"}
      description={DESCRIPTIONS["unique_features"]}
      select={select}
    >
      <FeatureRow>
        {quotes.map((quote, idx) => (
          <UniqueFeatureValue key={idx} quote={quote} />
        ))}
      </FeatureRow>
    </FeatureSection>
  ) : (
    <></>
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

function OptionalCoversSection({ quotes, select, onChange }) {
  return !select.isSelectedSectionView ? (
    <FeatureSection
      title="Optional Covers"
      description="You can add 'Riders' to your basic health insurance plan for additional benefits."
      select={select}
    >
      <FeatureRow>
        {quotes.map((quote, idx) => (
          <OptionalCoversValue quote={quote} key={idx} onChange={onChange} />
        ))}
      </FeatureRow>
    </FeatureSection>
  ) : select.selectedSectionView["Optional Covers"] ? (
    <FeatureSection
      title="Optional Covers"
      description="You can add 'Riders' to your basic health insurance plan for additional benefits."
      select={select}
    >
      <FeatureRow>
        {quotes.map((quote, idx) => (
          <OptionalCoversValue quote={quote} key={idx} onChange={onChange} />
        ))}
      </FeatureRow>
    </FeatureSection>
  ) : (
    <></>
  );
}
