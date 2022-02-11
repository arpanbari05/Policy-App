import { Col, Container, Row } from "react-bootstrap";
import { Page } from "../../components";
import useFilters from "./components/filters/useFilters";
import useUpdateFilters from "./components/filters/useUpdateFilters";
import LowerModifier from "./components/LowerModifier";
import Quotes from "./components/Quotes";
import UpperModifier from "./components/UpperModifier";
import "styled-components/macro";
import { useGetQuotes, useMembers, useTheme } from "../../customHooks";
import { useParams } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import ScrollToTopBtn from "../../components/Common/ScrollToTop/ScrollToTopBtn";
import { FaSync } from "react-icons/fa";
import { useState } from "react";
import SortBy from "./components/filters/SortBy";
import assistant from "../../assets/images/call-center-service.png";

function QuotesPage() {
  const { colors } = useTheme();

  const { checkGroupExist } = useMembers();

  const { groupCode } = useParams();

  const isGroupExist = checkGroupExist(groupCode);

  const [selectedSortBy, setSelectedSoryBy] = useState({
    code: "relevance",
    display_name: "Relevance",
  });

  if (!isGroupExist) return <PageNotFound />;

  return (
    <Page loader={<QuoteLoader />}>
      <ScrollToTopBtn />
      <UpperModifier />
      <LowerModifier
        sortBy={
          <SortBy
            selectedSortBy={selectedSortBy}
            onChange={setSelectedSoryBy}
          />
        }
      />
      <Container className="mt-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-between">
            <ShowingPlanType />
            <ClearFilters />
          </div>
          <div
            css={`
              color: ${colors.font.four};
              text-align: right;
            `}
          >
            All Premium Plans are GST Inclusive
          </div>
        </div>
        <div
          className="mt-3 d-flex"
          css={`
            gap: 1em;
          `}
        >
          <div
            css={`
              flex: 3;
            `}
          >
            <Quotes sortBy={selectedSortBy.code} />
          </div>
          <div
            css={`
              flex: 1;
            `}
          >
            <AssistanceCard />
          </div>
        </div>
      </Container>
    </Page>
  );
}

function QuoteLoader() {
  const { isLoading, loadingPercentage } = useGetQuotes();

  const { colors } = useTheme();

  if (!isLoading) return null;

  return (
    <div
      className="position-absolute"
      css={`
        top: 0;
        height: 0.127em;
        background-color: ${colors.primary_color};
        width: ${loadingPercentage}%;
        transition: 0.3s ease-in;
        z-index: 99;
      `}
    />
  );
}

export default QuotesPage;

function ShowingPlanType() {
  const { colors } = useTheme();
  return (
    <h1
      className="m-0"
      css={`
        font-size: 1.19rem;
        color: ${colors.font.four};
        width: max-content;
        font-weight: 900;
      `}
    >
      Showing Top up plans
    </h1>
  );
}

function ClearFilters(props) {
  const { isFiltersDefault } = useFilters();
  const { resetFilters } = useUpdateFilters();

  if (isFiltersDefault) return null;

  return (
    <button
      onClick={resetFilters}
      css={`
        background-color: #e2f0ff;
        color: #0a87ff;
        font-weight: bold;
        width: max-content;
        padding: 8px 12px;
        border-radius: 24px;
        border: 1px solid #0a87ff;
        font-size: 0.79rem;
      `}
      {...props}
    >
      Clear all filters
      <FaSync className="mx-2" />
    </button>
  );
}

function AssistanceCard(props) {
  const { colors } = useTheme();
  return (
    <div
      {...props}
      className="p-3 pb-5 position-relative"
      css={`
        background-color: ${colors.secondary_shade};
      `}
    >
      <h1
        css={`
          font-size: 1rem;
          font-weight: 900;
        `}
      >
        Health Insurance Assistance
      </h1>
      <p
        className="mt-3"
        css={`
          font-size: 0.89rem;
          color: ${colors.font.one};
        `}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu nisl a
        lorem auctor ultrices auctor vel elit. Aliquam quis consequat tellus.
        Aliquam pellentesque ligula massa, aliquet fermentum nisl varius ac.
      </p>
      <button
        className="px-3 py-2 rounded"
        css={`
          color: ${colors.primary_color};
          border: 2px solid;
          background-color: #fff;
          font-weight: 900;
        `}
      >
        Talk to us
      </button>
      <img
        className="position-absolute m-3"
        css={`
          height: 5em;
          width: 5em;
          right: 0;
          bottom: 0;
        `}
        src={assistant}
        alt="assistant"
      />
    </div>
  );
}
