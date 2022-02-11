import CardSkeletonLoader from "../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import QuoteCards from "./QuoteCards";

import {
  useCompanies,
  useGetQuotes,
  useQuotesCompare,
  useTheme,
  useUrlEnquiry,
} from "../../../customHooks";
import "styled-components/macro";
import { Container } from "react-bootstrap";
import { Button, CircleCloseButton } from "../../../components";
import { useHistory, useParams } from "react-router-dom";
import { mergeQuotes } from "../../../utils/helper";

function Quotes({ sortBy = "relevence", ...props }) {
  const { data, isLoading, isNoQuotes } = useGetQuotes();

  let mergedQuotes = data;

  // let filteredAndSortedIcQuotes = data;

  if (data) {
    mergedQuotes = data.filter(
      icQuotes => !!icQuotes?.data?.data[0]?.total_premium,
    );
    mergedQuotes = data.map(icQuotes => ({
      ...icQuotes,
      data: { data: mergeQuotes(icQuotes.data.data, { sortBy }) },
    }));
    if (sortBy === "premium-low-to-high") {
      mergedQuotes = mergedQuotes.filter(
        icQuotes => !!icQuotes?.data?.data[0]?.length,
      );
      mergedQuotes = mergedQuotes.sort((icQuotesA, icQuotesB) =>
        icQuotesA.data.data[0][0].total_premium >
        icQuotesB.data.data[0][0].total_premium
          ? 1
          : -1,
      );
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
        gap: 1em;
      `}
      {...props}
    >
      {mergedQuotes?.map(insurersQuotes => (
        <QuoteCards
          key={insurersQuotes.company_alias}
          quotesData={insurersQuotes.data}
          compare={quotesCompare}
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
        `}
      >
        <div
          className="d-flex align-items-center justify-content-between"
          css={`
            flex: 1;
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
            <div
              className="p-3 rounded"
              css={`
                background-color: #fff;
                width: 20em;
                gap: 1em;
                border: 1px dashed ${colors.border.one};
                text-align: center;
              `}
              key={idx}
            >
              Add a plan
            </div>
          ))}
        </div>

        <div
          className="d-flex"
          css={`
            gap: 1em;
          `}
        >
          <Button onClick={handleCompareClick}>Compare</Button>
          <Button
            css={`
              background-color: ${colors.secondary_shade};
              color: #000;
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

function CompareQuoteTrayItem({ quote, onRemove }) {
  const { colors } = useTheme();

  const { getCompany } = useCompanies();
  const { logo } = getCompany(quote.company_alias);

  const handleCloseClick = () => onRemove && onRemove(quote);

  return (
    <div
      className="d-flex align-items-center p-3 rounded position-relative"
      css={`
        background-color: ${colors.secondary_shade};
        width: 20em;
        gap: 1em;
      `}
    >
      <CircleCloseButton placeOnCorner onClick={handleCloseClick} />
      <img src={logo} alt={quote.company_alias} height={36} />
      <div>
        <div
          css={`
            font-size: 0.89rem;
            font-weight: 900;
          `}
        >
          {quote.product.name}
        </div>
        <div
          css={`
            font-size: 0.79rem;
            color: ${colors.font.three};
          `}
        >
          Cover: {quote.sum_insured}
        </div>
      </div>
    </div>
  );
}
