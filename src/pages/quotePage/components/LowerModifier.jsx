import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import PremiumFilter from "./filters/PremiumFilter";
import CoverRangeFilter from "./filters/CoverRangeFilter";
import PolicyTypeFilter from "./filters/PolicyTypeFilter";
import MultiyearOptionFilter from "./filters/MultiyearOptionFilter";
import InsurerFilter from "./filters/InsurerFilter";
import MoreFilters from "./filters/MoreFilters";
import PlanTypeFilter from "./filters/PlanTypeFilter";
import { useFrontendBoot } from "../../../customHooks";
import DeductibleFilter from "./filters/DeductibleFilter";
import { Container } from "react-bootstrap";
import { useGetEnquiriesQuery } from "../../../api/api";
import { useParams } from "react-router-dom";

const LowerModifier = ({ sortBy = <></> }) => {
  const { data } = useGetEnquiriesQuery();

  const { groupCode } = useParams();

  const planType = data?.data?.groups?.find(
    singleGroup => singleGroup.id === +groupCode,
  )?.plan_type;

  const { journeyType } = useFrontendBoot();

  return (
    <Container
      fluid="lg"
      className="mt-2"
      css={`
        top: 0;
        z-index: 99;
      `}
    >
      <FiltersWrapper className="d-flex p-1">
        {sortBy}
        <PremiumFilter />
        {journeyType === "health" ? <CoverRangeFilter /> : <DeductibleFilter />}
        {planType !== "I" && journeyType !== "top_up" ? (
          <PolicyTypeFilter />
        ) : null}
        <MultiyearOptionFilter />
        <PlanTypeFilter />
        <InsurerFilter />
        <MoreFilters />
      </FiltersWrapper>
    </Container>
  );
};

export default LowerModifier;

const FiltersWrapper = styled.div`
  border: solid 1px #cacaca;
  padding: 5px;
  border-radius: 3px;
  background-color: #fff;
`;
