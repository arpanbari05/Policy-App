import { useGetDiscountsQuery } from "../../../../api/api";
import { CircleLoader } from "../../../../components";
import { useQuotesCompare } from "../../../../customHooks";
import { FeatureValue } from "../../mobile/components";
import "styled-components/macro";
import { RiArrowDropDownLine } from "react-icons/ri";

const TenureFeatureValueMobile = ({ quote, groupCode, journeyType }) => {
  const { updateCompareQuote } = useQuotesCompare();

  const { data, isLoading } = useGetDiscountsQuery({
    sum_insured: +quote.sum_insured,
    product_id: quote.product.id,
    group: groupCode,
    journeyType,
    deductible: quote.deductible,
  });

  const handleTenureChange = tenure => {
    const updatedQuote = data.data.find(
      quoteValue => quoteValue.tenure.toString() === tenure.toString(),
    );
    updateCompareQuote({
      updatedQuote: { ...updatedQuote, features: quote.features },
      previousQuote: quote,
      groupCode,
    });
  };

  return (
    <FeatureValue>
      {!isLoading ? (
        <>
          <select
            value={quote.tenure}
            onChange={event => handleTenureChange(event.target.value)}
            css={`
              width: 60px;
              background-color: transparent;
              z-index: 10;
              color: inherit;
              -webkit-appearance: none;
              &::-ms-expand {
                display: none;
              }
            `}
          >
            {data?.data?.map(value => (
              <option key={value.tenure} value={value.tenure}>{`${
                value.tenure
              } ${value.tenure === 1 ? "Year" : "Years"}`}</option>
            ))}
          </select>
          <span
            css={`
              transform: translateX(-25px);
            `}
          >
            <RiArrowDropDownLine size={25} />
          </span>
        </>
      ) : (
        <div>
          {quote.tenure} {quote.tenure === 1 ? "Year" : "Years"}
          <CircleLoader
            animation="border"
            css={`
              color: #647188 !important;
            `}
          />
        </div>
      )}
    </FeatureValue>
  );
};
export default TenureFeatureValueMobile;
