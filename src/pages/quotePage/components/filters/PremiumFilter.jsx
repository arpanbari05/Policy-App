import { useState } from "react";
import "styled-components/macro";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";
import { OptionWrapper, ApplyBtn } from "./Filter.style";
import useFilters from "./useFilters";
import { useGetFrontendBootQuery } from "../../../../api/api";
import useUpdateFilters from "./useUpdateFilters";
import { useTheme } from "../../../../customHooks";
import { Filter, FilterHead } from ".";

function PremiumFilterModal({ onClose, ...props }) {
  const {
    data: { premiums },
  } = useGetFrontendBootQuery();

  const { colors } = useTheme();

  const { getSelectedFilter } = useFilters();

  const [selectedPremiumFilter, setSelectedPremiumFilter] = useState(() =>
    getSelectedFilter("premium"),
  );

  const { updateFilters } = useUpdateFilters();

  const handleChange = premium => {
    setSelectedPremiumFilter(premium);
  };

  const isChecked = premium =>
    selectedPremiumFilter && selectedPremiumFilter.code === premium.code;

  const handleApplyClick = () => {
    updateFilters({ premium: selectedPremiumFilter });
    onClose && onClose();
  };

  return (
    <CustomModal1
      header="Premium"
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
      tooltipDesc="Select a range of premium to view plans of desired premium rates"
      {...props}
    >
      <div>
        <OptionWrapper PrimaryColor={colors.primary_color}>
          {premiums.map(premium => (
            <PremiumOption
              premium={premium}
              checked={isChecked(premium)}
              onChange={handleChange}
              key={premium.code}
            />
          ))}
        </OptionWrapper>
      </div>
    </CustomModal1>
  );
}

function PremiumOption({ premium, checked, onChange, ...props }) {
  const handleChange = evt => {
    if (evt.target.checked) onChange && onChange(premium);
  };

  return (
    <li
      css={`
        margin: 5px 0;
      `}
      className="option d-flex align-items-center justify-content-between"
      {...props}
    >
      <label htmlFor={premium.code}>{premium.display_name}</label>
      <input
        type="radio"
        id={premium.code}
        name="select_premium"
        checked={checked}
        onChange={handleChange}
      />
    </li>
  );
}

const PremiumFilter = () => {
  const { getSelectedFilter } = useFilters();

  const selectedPremiumFilter = getSelectedFilter("premium");

  const displayPremiumFilter = !selectedPremiumFilter
    ? "Select Premium"
    : selectedPremiumFilter.display_name;

  return (
    <Filter>
      <FilterHead label={"Premium"}>{displayPremiumFilter}</FilterHead>
      <PremiumFilterModal />
    </Filter>
  );
};

export default PremiumFilter;
