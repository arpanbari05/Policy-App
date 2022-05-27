import { useGetDiscountsQuery } from "../../../../api/api";
import { CircleLoader } from "../../../../components";
import { useQuotesCompare } from "../../../../customHooks";

const TenureFeatureValue = ({ quote, groupCode, journeyType }) => {
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

  return !isLoading ? (
    <div
      css={`
        font-size: 16px;
        color: #647188;
      `}
    >
      <select
        value={quote.tenure}
        style={{ color: "#647188", background: "white" }}
        key={quote.premium}
        onChange={event => {
          handleTenureChange(event.target.value);
        }}
      >
        {data?.data?.map(value => (
          <option key={value.tenure} value={value.tenure}>{`${value.tenure} ${
            value.tenure === 1 ? "Year" : "Years"
          }`}</option>
        ))}
      </select>
    </div>
  ) : (
    <div
      css={`
        font-size: 16px !important;
        margin-left: 5px;
        color: #647188 !important;
        display: flex;
        align-items: center;
      `}
    >
      {quote.tenure} {quote.tenure === 1 ? "Year" : "Years"}
      <CircleLoader
        className="compare-pdf-hide"
        animation="border"
        css={`
          color: #647188 !important;
        `}
      />
    </div>
  );
};

export default TenureFeatureValue;
