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

const LowerModifier = ({ sortBy = <></> }) => {
  const planType = useSelector(({ quotePage }) => quotePage.filters.planType);
  const { journeyType } = useFrontendBoot();

  return (
    <div
      className="container mt-2"
      css={`
        top: 0;
        z-index: 99;
      `}
    >
      <FiltersWrapper className="d-flex p-1">
        {sortBy}
        <PremiumFilter />
        {journeyType === "health" ? <CoverRangeFilter /> : <DeductibleFilter />}
        {planType !== "Individual" && journeyType !== "top_up" ? (
          <PolicyTypeFilter />
        ) : null}
        <MultiyearOptionFilter />
        <PlanTypeFilter />
        <InsurerFilter />
        <MoreFilters />
      </FiltersWrapper>
    </div>
  );
};

export default LowerModifier;

const FiltersWrapper = styled.div`
  border: solid 1px #cacaca;
  padding: 5px;
  border-radius: 3px;
  background-color: #fff;
`;
