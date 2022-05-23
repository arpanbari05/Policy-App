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
import TextInput from "../../../../components/TextInput";

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

  const [showDropdown, setShowDropdown] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const { updateFilters } = useUpdateFilters();

  const handleApplyClick = () => {
    if (selectedDeductible)
      updateFilters({
        deductible: selectedDeductible,
      });

    onClose && onClose();
  };

  const handleDeductibleChange = ({ label, value }) => {
    setShowDropdown(false);
    setSearchQuery("");
    const updatedDeductible = { code: value, display_name: label };
    setSelectedDeductible(updatedDeductible);
  };

  const deductibleDescription =
    "Your minimum deductible amount should be equal to your existing Base Health plan's cover amount. Top Up will provide the coverage once the existing cover amount is exhausted.";
  return (
    <CustomModal1
      header="Deductible"
      footerJSX={
        <ApplyBtn
          css={`
            background-color: ${colors.primary_color};
          `}
          className="apply_btn mx-auto h-100 w-100 mt-3"
          onClick={handleApplyClick}
          disabled={!selectedDeductible?.code}
        >
          Apply
        </ApplyBtn>
      }
      handleClose={() => onClose && onClose()}
      customizedTopMargin="65"
      headerTooltipDescription={deductibleDescription}
      noBodyOverflow
      {...props}
    >
      <div className="mt-3">
        <TextInput
          label={"Select minimum deductible"}
          placeholder="Select"
          onClick={() => setShowDropdown(prev => !prev)}
          autoComplete={"off"}
          onChange={e => {
            setSelectedDeductible({});
            setSearchQuery(e.target.value);
            setShowDropdown(true);
          }}
          value={searchQuery || selectedDeductible?.display_name}
        />
        <Dropdown
          value={
            selectedDeductible
              ? getReactSelectOption(selectedDeductible)
              : "select"
          }
          onChange={handleDeductibleChange}
          options={deductibles.map(getReactSelectOption)}
          hideDefaultControl
          searchQuery={searchQuery}
          showDropdown={showDropdown}
        />
      </div>
      {/* <p
        className="mt-3"
        css={`
          font-size: 0.79rem;
        `}
      >
        Your minimum deductible should be equal to your existing cover. Super
        top up will provide the coverage once the existing cover is exhausted
      </p> */}
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
