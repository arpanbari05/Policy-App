import { useState } from "react";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";
import { useFrontendBoot, useTheme } from "../../../../customHooks";
import { ApplyBtn } from "./Filter.style";
import useFilters from "./useFilters";
import "styled-components/macro";
import useUpdateFilters from "./useUpdateFilters";
import Dropdown from "../../../../components/Dropdown";
import { getReactSelectOption } from "../../../../utils/helper";
import { Filter, FilterHead } from ".";

function DeductibleFilterModal({ onClose, ...props }) {
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

    onClose && onClose();
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
      handleClose={() => onClose && onClose()}
      customizedTopMargin="65"
      tooltipDesc="Select Deductible preiod."
      css={`
        & .modal-body {
          overflow: visible;
        }
      `}
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
  const { getSelectedFilter } = useFilters();

  const selectedPremiumFilter = getSelectedFilter("deductible");

  const displayPremiumFilter = !selectedPremiumFilter
    ? "Select Deductible"
    : selectedPremiumFilter.display_name;

  return (
    <Filter>
      <FilterHead label={"Deductible"}>{displayPremiumFilter}</FilterHead>
      <DeductibleFilterModal />
    </Filter>
  );
}

export default DeductibleFilter;
