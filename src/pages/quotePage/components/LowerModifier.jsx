import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/macro";
import PremiumFilter from "./filters/PremiumFilter";
import CoverRangeFilter from "./filters/CoverRangeFilter";
import PolicyTypeFilter from "./filters/PolicyTypeFilter";
import MultiyearOptionFilter from "./filters/MultiyearOptionFilter";
import InsurerFilter from "./filters/InsurerFilter";
import MoreFilters from "./filters/MoreFilters";
import PlanTypeFilter from "./filters/PlanTypeFilter";

const LowerModifier = () => {
  const planType = useSelector(({ quotePage }) => quotePage.filters.planType);
  const {  tempModifications } = useSelector((state) => state.frontendBoot);
  const { loadingQuotes } = useSelector((state) => state.quotePage);
  return (
    <div
      className="container"
      css={`
        pointer-events: ${loadingQuotes && "none"};
        filter: ${loadingQuotes && "grayscale(100%)"};
        opacity:  ${loadingQuotes && "0.7"};
      `}
    >
      <FiltersWrapper className="d-flex">
        <PremiumFilter />
        <CoverRangeFilter />
        {planType !== "Individual" && !tempModifications?.hideMultiIndivedualPlans ? <PolicyTypeFilter /> : <></>}
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
  margin: 10px 0;
  border-radius: 3px;
`;
