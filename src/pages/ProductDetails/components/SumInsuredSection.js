import React from "react";
import { useParams } from "react-router-dom";
import "styled-components/macro";
import { OptionCard, WrapWithTitle } from ".";
import { useGetRenewalSumInsuredsQuery } from "../../../api/api";
import { CircleLoader } from "../../../components";
import { useCart } from "../../../customHooks";
import { amount, numberToDigitWord } from "../../../utils/helper";
import { mobile } from "../../../utils/mediaQueries";
import FeatureSection from "./FeatureSection/FeatureSection";

function SumInsuredSection() {
  const { groupCode } = useParams();

  const { getCartEntry } = useCart();

  const cartEntry = getCartEntry(groupCode);

  const { sum_insured, product, group, tenure } = cartEntry;

  const { data } = useGetRenewalSumInsuredsQuery({
    product_id: product?.id,
    groupCode: group?.id,
    tenure,
  });

  const displaySumInsureds = data?.data?.map(
    singleOption => singleOption?.sum_insured,
  );

  if (!displaySumInsureds?.length) return null;

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
          {displaySumInsureds.map(sumInsured => (
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
