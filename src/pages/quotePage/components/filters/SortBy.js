import { useState } from "react";
import { Filter, FilterHead, FilterOption } from ".";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";
import { useTheme } from "../../../../customHooks";
import { ApplyBtn, OptionWrapper } from "./Filter.style";
import "styled-components/macro";

const SORT_BY_OPTIONS = [
  {
    code: "relevance",
    display_name: "Relevance",
  },
  {
    code: "premium-low-to-high",
    display_name: "Premium Low To High",
  },
];

function SortByModal({ onClose, initialSortBy, onChange, ...props }) {
  const { colors } = useTheme();

  const [selectedSortBy, setSelectedSortBy] = useState(initialSortBy);

  const handleChange = premium => {
    setSelectedSortBy(premium);
  };

  const isChecked = option =>
    selectedSortBy && selectedSortBy.code === option.code;

  const handleApplyClick = () => {
    onChange && onChange(selectedSortBy);
    onClose && onClose();
  };

  return (
    <CustomModal1
      header="Sort By"
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
      // tooltipDesc="Select a range of premium to view plans of desired premium rates"
      {...props}
    >
      <div>
        <OptionWrapper PrimaryColor={colors.primary_color}>
          {SORT_BY_OPTIONS.map(sortByOption => (
            <FilterOption
              option={sortByOption}
              checked={isChecked(sortByOption)}
              onChange={handleChange}
              key={sortByOption.code}
            />
          ))}
        </OptionWrapper>
      </div>
    </CustomModal1>
  );
}

function SortBy({ selectedSortBy, onChange, ...props }) {
  return (
    <Filter {...props}>
      <FilterHead label={"Sort By"}>{selectedSortBy.display_name}</FilterHead>
      <SortByModal initialSortBy={selectedSortBy} onChange={onChange} />
    </Filter>
  );
}

export default SortBy;
