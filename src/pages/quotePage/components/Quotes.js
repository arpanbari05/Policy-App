import CardSkeletonLoader from "../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import QuoteCards from "./QuoteCards";

import {
  useGetQuotes,
  useQuotesCompare,
  useTheme,
  useUrlEnquiry,
} from "../../../customHooks";
import "styled-components/macro";
import { Container } from "react-bootstrap";
import { Button } from "../../../components";
import { useHistory, useParams } from "react-router-dom";
import { mergeQuotes } from "../../../utils/helper";
import { CompareQuoteTrayItem, CompareTrayAdd } from ".";

function Quotes({ sortBy = "relevence", ...props }) {
  const { data, isLoading, isNoQuotes } = useGetQuotes();

  let mergedQuotes = data;

  if (data) {
    mergedQuotes = data.filter(
      icQuotes => !!icQuotes?.data?.data[0]?.total_premium,
    ); // filter non-zero premium quotes.
    mergedQuotes = data.map(icQuotes => ({
      ...icQuotes,
      data: { data: mergeQuotes(icQuotes?.data?.data, { sortBy }) },
    })); // filter particular-ic quotes .
    if (sortBy === "premium-low-to-high") {
      mergedQuotes = mergedQuotes.filter(
        icQuotes => !!icQuotes?.data?.data[0]?.length,
      ); // filter zero array.
      mergedQuotes = mergedQuotes.sort((icQuotesA, icQuotesB) =>
        icQuotesA.data.data[0][0].total_premium >
        icQuotesB.data.data[0][0].total_premium
          ? 1
          : -1,
      ); // main sorting logic
    }
  }

  const quotesCompare = useQuotesCompare();

  const { isQuotesOnCompare } = quotesCompare;

  if (isNoQuotes) return <p>No Quotes Found!</p>;

  return (
    <div
      className="d-flex flex-column"
      css={`
        padding-bottom: ${isQuotesOnCompare ? "10em" : "1em"};
        gap: 0.6rem;
      `}
      {...props}
    >
      {mergedQuotes?.map(insurersQuotes => (
        <QuoteCards
          key={insurersQuotes.company_alias}
          quotesData={insurersQuotes.data}
          compare={quotesCompare}
          sortBy={sortBy}
        />
      ))}
      {isLoading ? <CardSkeletonLoader /> : null}
      {quotesCompare.isQuotesOnCompare ? (
        <CompareQuotesTray
          compare={quotesCompare}
          onClose={quotesCompare.reset}
        />
      ) : null}
    </div>
  );
}

export default Quotes;

function CompareQuotesTray({ compare, onClose }) {
  const history = useHistory();
  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const { boxShadows, colors } = useTheme();

  const { groupCode } = useParams();

  const [updateCompareQuotes] = compare.getUpdateCompareQuotesMutation(
    parseInt(groupCode),
  );

  const handleCompareClick = () => {
    updateCompareQuotes(compare.quotes);
    history.push(getUrlWithEnquirySearch(`/compare/${groupCode}`));
  };
  const handleCloseClick = () => onClose && onClose();

  return (
    <div
      className="position-fixed w-100 py-3"
      css={`
        left: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 99;
        box-shadow: ${boxShadows.three};
      `}
    >
      <Container
        className="d-flex align-items-center justify-content-between"
        css={`
          gap: 1em;

          @media (max-width: 1204px) {
            margin-left: 20px !important;
          }
          @media (max-width: 1037px) {
            margin-left: 2px !important;
          }
        `}
      >
        <div
          className="d-flex align-items-center justify-content-between"
          css={`
            gap: 3rem;

            @media (max-width: 1370px) {
              gap: 0.9rem;
            }
          `}
        >
          {compare.quotes.map(quote => (
            <CompareQuoteTrayItem
              quote={quote}
              key={quote.company_alias + quote.sum_insured}
              onRemove={compare.removeQuote}
            />
          ))}
          {Array.from({ length: 3 - compare.quotes.length }).map((_, idx) => (
            <CompareTrayAdd key={idx} />
          ))}
        </div>

        <div
          className="d-flex"
          css={`
            gap: 1em;
          `}
        >
          <Button
            onClick={handleCompareClick}
            css={`
              min-width: 120px;
            `}
          >
            Compare
          </Button>
          <Button
            css={`
              background-color: ${colors.secondary_shade};
              color: #000;
              min-width: 120px;
            `}
            onClick={handleCloseClick}
          >
            Close
          </Button>
        </div>
      </Container>
    </div>
  );
}
