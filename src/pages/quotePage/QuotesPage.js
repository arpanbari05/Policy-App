import { Container } from "react-bootstrap";
import { Page } from "../../components";
import useFilters from "./components/filters/useFilters";
import useUpdateFilters from "./components/filters/useUpdateFilters";
import LowerModifier from "./components/LowerModifier";
import Quotes from "./components/Quotes";
import UpperModifier from "./components/UpperModifier";
import { useMembers, useTheme } from "../../customHooks";
import { useParams } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import ScrollToTopBtn from "../../components/Common/ScrollToTop/ScrollToTopBtn";
import { FaSync } from "react-icons/fa";
import { useState } from "react";
import SortBy from "./components/filters/SortBy";
import assistant from "../../assets/images/call-center-service.png";
import { QuotesLoader } from "./components";
import TalkToUsModal from "../../components/Common/Modal/TalkToUsModal";
import { useFrontendBoot } from "../../customHooks/index";
import { useGetEnquiriesQuery } from "../../api/api";
import "styled-components/macro";

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
    <Page loader={<QuotesLoader />}>
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
      <Container className="mt-2" fluid="lg">
        <div
          className="d-flex align-items-center justify-content-between"
          css={`
            gap: 0.6rem;
          `}
        >
          <div
            className="d-flex align-items-center"
            css={`
              flex: 3;
            `}
          >
            <ShowingPlanType />
            <div className="m-auto">
              <ClearFilters />
            </div>
          </div>
          <p
            className="m-0 d-none d-xl-block"
            css={`
              font-size: 0.89rem;
              color: ${colors.font.four};
              text-align: right;
              flex: 1;
            `}
          >
            All Premium Plans are GST Inclusive
          </p>
        </div>
        <div
          className="mt-2 d-flex"
          css={`
            gap: 0.6rem;
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
            className="d-none d-xl-block"
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

export default QuotesPage;

function ShowingPlanType() {
  const { colors } = useTheme();
  const { journeyType } = useFrontendBoot();
  const { data } = useGetEnquiriesQuery();
  const { groupCode } = useParams();

  const planTypes = {
    I: "Individual",
    F: "Family Floater",
    M: "Multi Individual",
  };

  return (
    <h1
      className="m-0"
      css={`
        font-size: 1rem;
        color: ${colors.font.four};
        width: max-content;
        font-weight: 900;
      `}
    >
      {`Showing ${
        journeyType === "top_up"
          ? "Top Up "
          : planTypes[
              data?.data?.groups?.find(
                singleGroup => singleGroup.id === +groupCode,
              )?.plan_type
            ] + " "
      }plans`}
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
        font-weight: 900;
        width: max-content;
        padding: 0.6em 1em;
        border-radius: 24px;
        border: 1px solid #0a87ff;
        font-size: 0.73rem;
      `}
      {...props}
    >
      Clear all filters
      <FaSync className="mx-2" />
    </button>
  );
}

function AssistanceCard(props) {
  const [showTalk, setShowTalk] = useState(false);
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
        onClick={() => setShowTalk(true)}
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
      <TalkToUsModal show={showTalk} handleClose={() => setShowTalk(false)} />
    </div>
  );
}
