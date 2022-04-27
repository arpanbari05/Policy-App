import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import PremiumFilter from "./filters/PremiumFilter";
import CoverRangeFilter from "./filters/CoverRangeFilter";
import PolicyTypeFilter from "./filters/PolicyTypeFilter";
import MultiyearOptionFilter from "./filters/MultiyearOptionFilter";
import InsurerFilter from "./filters/InsurerFilter";
import MoreFilters from "./filters/MoreFilters";
import PlanTypeFilter from "./filters/PlanTypeFilter";
import { useFrontendBoot } from "../../../customHooks";
import useFilters from "./filters/useFilters.js";
import DeductibleFilter from "./filters/DeductibleFilter";
import { Container } from "react-bootstrap";
import ErrorPopup from "../../ProposalPage/ProposalSections/components/ErrorPopup";
import { setPosPopup } from "../quote.slice";

const LowerModifier = ({ sortBy = <></> }) => {
  const { getSelectedFilter } = useFilters();
  const selectedPolicyTypeFilter = getSelectedFilter("plantype");
  const { journeyType } = useFrontendBoot();
  const dispatch = useDispatch();
  const { pos_popup } = useSelector(({ quotePage }) => quotePage);
  const {
    data: {
      settings: { pos_nonpos_switch_message, multiindividual_visibilty },
    },
  } = useFrontendBoot();

  return (
    <Container
      fluid="lg"
      className="mt-2"
      css={`
        top: 0;
        z-index: 99;
      `}
    >
      <FiltersWrapper className="d-flex">
        {sortBy}
        <PremiumFilter />
        {journeyType === "health" ? <CoverRangeFilter /> : <DeductibleFilter />}
        {selectedPolicyTypeFilter?.display_name !== "Individual" &&
        journeyType !== "top_up" &&
        +multiindividual_visibilty !== 0 ? (
          <PolicyTypeFilter />
        ) : null}
        <MultiyearOptionFilter />
        <PlanTypeFilter />
        <InsurerFilter />
        <MoreFilters />
      </FiltersWrapper>
      {pos_popup && (
        <ErrorPopup
          handleClose={() => dispatch(setPosPopup(false))}
          htmlProps={pos_nonpos_switch_message}
        />
      )}
    </Container>
  );
};

export default LowerModifier;

const FiltersWrapper = styled.div`
  border: solid 1px #cacaca;
  padding: 3px;
  border-radius: 3px;
  background-color: #fff;
`;
