import { Col, Container, Row } from "react-bootstrap";
import { Page } from "../../components";
import useFilters from "./components/filters/useFilters";
import useUpdateFilters from "./components/filters/useUpdateFilters";
import LowerModifier from "./components/LowerModifier";
import Quotes from "./components/Quotes";
import UpperModifier from "./components/UpperModifier";
import "styled-components/macro";
import { useMembers, useTheme } from "../../customHooks";
import { useParams } from "react-router-dom";
import PageNotFound from "../PageNotFound";

function QuotesPage() {
  const { colors } = useTheme();

  const { checkGroupExist } = useMembers();

  const { groupCode } = useParams();

  const isGroupExist = checkGroupExist(groupCode);

  if (!isGroupExist) return <PageNotFound />;

  return (
    <Page>
      <UpperModifier />
      <LowerModifier />
      <Container>
        <Row>
          <Col lg={"9"}>
            <div className="d-flex align-items-center justify-content-between">
              <ShowingPlanType />
              <ClearFilters />
              <SortBy />
            </div>
          </Col>
          <Col>
            <div
              css={`
                color: ${colors.font.four};
                text-align: right;
              `}
            >
              All Premium Plans are GST Inclusive
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={"9"}>
            <Quotes />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Page>
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
      <i class="fas fa-sync mx-2"></i>
    </button>
  );
}

function SortBy() {
  const { colors, boxShadows } = useTheme();

  return (
    <div
      className="rounded-3 p-3 position-relative"
      css={`
        border: 0.6px solid ${colors.border.one};
        box-shadow: ${boxShadows.two};
        font-size: 0.83rem;
        font-weight: 900;
        width: 16em;
      `}
    >
      <span
        className="position-absolute px-1"
        css={`
          font-size: 0.79em;
          color: ${colors.font.three};
          background-color: #fff;
          top: 0;
          left: 1em;
          transform: translateY(-50%);
        `}
      >
        Sort By
      </span>
      Relevance
    </div>
  );
}
