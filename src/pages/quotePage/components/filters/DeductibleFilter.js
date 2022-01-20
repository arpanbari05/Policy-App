import { useState } from "react";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";
import { useFrontendBoot, useTheme } from "../../../../customHooks";
import { ApplyBtn, Filter } from "./Filter.style";
import useFilters from "./useFilters";
import "styled-components/macro";
import useUpdateFilters from "./useUpdateFilters";
import Dropdown from "../../../../components/Dropdown";
import { getReactSelectOption } from "../../../../utils/helper";

function DeductibleFilterModal({ handleClose, ...props }) {
  const { colors } = useTheme();

  const {
    data: { deductibles },
  } = useFrontendBoot();

  const { getSelectedFilter } = useFilters();

  const [selectedDeductible, setSelectedDeductible] = useState(() =>
    getSelectedFilter("deductible"),
  );

  const [showError, setShowError] = useState(false);

  const { updateFilters } = useUpdateFilters();

  const handleApplyClick = () => {
    if (selectedDeductible)
      updateFilters({
        deductible: selectedDeductible,
      });

    handleClose && handleClose();
  };

  const handleDeductibleChange = ({ label, value }) => {
    const updatedDeductible = { code: value, display_name: label };
    setSelectedDeductible(updatedDeductible);
  };

  return (
    <CustomModal1
      header="Deductible"
      footerJSX={
        <ApplyBtn
          css={`
            background-color: ${colors.primary_color};
          `}
          className="apply_btn mx-auto h-100 w-100"
          onClick={handleApplyClick}
        >
          Apply
        </ApplyBtn>
      }
      handleClose={handleClose}
      customizedTopMargin="65"
      tooltipDesc="Select Deductible preiod."
      {...props}
    >
      <p
        className="mt-3"
        css={`
          font-size: 0.79rem;
        `}
      >
        Your minimum deductible should be equal to your existing cover. Super
        top up will provide the coverage once the existing cover is exhausted
      </p>
      <div className="mt-3">
        <Dropdown
          label="Deductible"
          value={
            selectedDeductible
              ? getReactSelectOption(selectedDeductible)
              : "select"
          }
          onChange={handleDeductibleChange}
          options={deductibles.map(getReactSelectOption)}
        />
      </div>
    </CustomModal1>
  );
}

function DeductibleFilter({ ...props }) {
  const [showModal, setShowModal] = useState(false);

  const { getSelectedFilter } = useFilters();

  const selectedPremiumFilter = getSelectedFilter("deductible");

  const displayPremiumFilter = !selectedPremiumFilter
    ? "Select Deductible"
    : selectedPremiumFilter.display_name;

  return (
    <Filter
      className="filter d-flex flex-column flex-fill"
      css={`
        & .modal-body {
          overflow: visible;
        }
      `}
      {...props}
    >
      <span className="filter_head">Deductible</span>
      <span onClick={() => setShowModal(true)} className="filter_sub_head">
        {displayPremiumFilter}
        <i class="fas fa-chevron-down"></i>
      </span>
      {showModal && (
        <DeductibleFilterModal handleClose={() => setShowModal(false)} />
      )}
    </Filter>
  );
}

export default DeductibleFilter;
