import styled from "styled-components";
import PremiumFilter from "./filters/PremiumFilter";
import CoverRangeFilter from "./filters/CoverRangeFilter";
import PolicyTypeFilter from "./filters/PolicyTypeFilter";
import MultiyearOptionFilter from "./filters/MultiyearOptionFilter";

const LowerModifier = () => {
  return (
    <div className="container">
      <FiltersWrapper className="d-flex">
        <PremiumFilter/>

        <CoverRangeFilter/>
        <PolicyTypeFilter/>
        <MultiyearOptionFilter/>
        <PremiumFilter/>
        <PremiumFilter/>
      </FiltersWrapper>
    </div>
  );
};

export default LowerModifier;

const FiltersWrapper = styled.div`
  border: solid 1px #cacaca;
  padding: 5px;
  margin: 10px 0;
  
`;
