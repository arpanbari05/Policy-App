import React from "react";
import { OptionCard, WrapWithTitle } from ".";
import { CircleLoader } from "../../../components";
import { useCart } from "../../../customHooks";
import { amount, numberToDigitWord } from "../../../utils/helper";
import { mobile } from "../../../utils/mediaQueries";
import FeatureSection from "./FeatureSection/FeatureSection";
import "styled-components/macro";
import { useGetRenewalSumInsuredsQuery } from "../../../api/api";
import { renewalSumInsuredGenerator } from "../../../utils/helper";
import { useParams } from "react-router-dom";

function SumInsuredSection() {
  const { groupCode } = useParams();

  const { updateCartEntry, getCartEntry } = useCart();

  const cartEntry = getCartEntry(groupCode);

  const {
    available_sum_insureds,
    sum_insured,
    available_renewals_sum_insureds,
  } = cartEntry;

  const currentAndNextTwoSumInsuredsMemoized = React.useMemo(
    renewalSumInsuredGenerator.bind(null, sum_insured, available_sum_insureds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const currentAndNextTwoSumInsureds =
    available_renewals_sum_insureds || currentAndNextTwoSumInsuredsMemoized;

  React.useEffect(() => {
    updateCartEntry(groupCode, {
      ...cartEntry,
      available_renewals_sum_insureds: currentAndNextTwoSumInsureds,
    });
  }, []);

  if (!currentAndNextTwoSumInsureds?.length) return null;

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
          {currentAndNextTwoSumInsureds.map(sumInsured => (
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
  const { product, group, tenure } = cartEntry;

  const { data, isLoading, isUninitialized, isFetching } =
    useGetRenewalSumInsuredsQuery({
      product_id: product?.id,
      groupCode: group?.id,
      tenure,
    });

  const sumInsuredLoading = isLoading || isUninitialized || isFetching;

  const matchedSumInsuredQuote = data?.data?.find(
    singleOption => +singleOption?.sum_insured === +sum_insured,
  );

  const { updateCartEntry } = useCart();

  const handleChange = ({ isSelected, sum_insured }) => {
    if (!isSelected || isLoading) return;
    updateCartEntry(group?.id, { sum_insured });
  };

  if (!sumInsuredLoading && !matchedSumInsuredQuote) return null;

  return (
    <OptionCard
      label={numberToDigitWord(sum_insured)}
      option={matchedSumInsuredQuote}
      onChange={handleChange}
      checked={checked}
      sum_insured={sum_insured}
    >
      {sumInsuredLoading ? (
        <CircleLoader animation="border" />
      ) : (
        amount(matchedSumInsuredQuote?.total_premium)
      )}
    </OptionCard>
  );
}

export default SumInsuredSection;
