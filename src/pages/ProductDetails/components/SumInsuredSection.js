import React from "react";
import { OptionCard, WrapWithTitle } from ".";
import { CircleLoader } from "../../../components";
import { useCart, useGetQuote } from "../../../customHooks";
import { amount, matchQuotes, numberToDigitWord } from "../../../utils/helper";
import { mobile } from "../../../utils/mediaQueries";
import FeatureSection from "./FeatureSection/FeatureSection";
import "styled-components/macro";

function SumInsuredSection({ cartEntry }) {
  const { available_sum_insureds, sum_insured } = cartEntry;

  const currentSumInsuredIndex = available_sum_insureds.indexOf(+sum_insured);

  const nextTwoSumInsureds = React.useMemo(
    () => available_sum_insureds.slice(currentSumInsuredIndex, 3),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (!nextTwoSumInsureds.length) return null;

  return (
    <FeatureSection heading="Upgrade Sum Insured">
      <WrapWithTitle title="Choose Sum Insured">
        <div
          className="d-flex justify-content-around"
          css={`
            ${mobile} {
              flex-direction: column;
            }
          `}
        >
          {nextTwoSumInsureds.map(sumInsured => (
            <SumInsuredOption
              sum_insured={sumInsured}
              cartEntry={cartEntry}
              key={sumInsured}
              checked={+sumInsured === +sum_insured}
            />
          ))}
        </div>
      </WrapWithTitle>
    </FeatureSection>
  );
}

function SumInsuredOption({ sum_insured, cartEntry, checked }) {
  const { product, group } = cartEntry;
  const { isLoading, icQuotes } = useGetQuote(product.company.alias);

  const { updateCartEntry } = useCart();

  const handleChange = ({ isSelected, sum_insured }) => {
    if (!isSelected || isLoading) return;
    updateCartEntry(group?.id, { sum_insured });
  };

  const quote =
    icQuotes &&
    icQuotes?.data?.data.find(quote =>
      matchQuotes(quote, { sum_insured, product }, { deductible: false }),
    );

  if (!isLoading && !quote) return null;

  return (
    <OptionCard
      label={numberToDigitWord(sum_insured)}
      option={quote}
      onChange={handleChange}
      checked={checked}
    >
      {isLoading ? (
        <CircleLoader animation="border" />
      ) : (
        amount(quote.total_premium)
      )}
    </OptionCard>
  );
}

export default SumInsuredSection;
