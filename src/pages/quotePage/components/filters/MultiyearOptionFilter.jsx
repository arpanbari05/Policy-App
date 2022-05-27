import { useState, useRef } from "react";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";
import "styled-components/macro";
import { OptionWrapper, ApplyBtn } from "./Filter.style";
import useUpdateFilters from "./useUpdateFilters";
import useFilters from "./useFilters";
import { useTheme } from "../../../../customHooks";
import { Filter, FilterHead } from ".";
import { tenures } from "../../data";
import { IoRadioButtonOn } from "react-icons/io5";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { ClickSound } from "../../../../utils/helper";

function FilterModal({ onClose, ...props }) {
  const { colors } = useTheme();

  const { getSelectedFilter } = useFilters();

  const [selectedTenure, setSelectedTenure] = useState(() =>
    getSelectedFilter("tenure"),
  );

  const handleChange = tenure => {
    ClickSound();
    setSelectedTenure(tenure);
  };

  const isSelected = tenure => tenure.code === selectedTenure.code;

  const { updateFilters } = useUpdateFilters();

  const handleApplyClick = () => {
    updateFilters({ tenure: selectedTenure });
    onClose && onClose();
  };

  return (
    <CustomModal1
      header="Multiyear Options"
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
      leftAlignmnetMargin="-22"
      tooltipDesc="Select desired policy period."
      {...props}
    >
      <div>
        <OptionWrapper>
          {tenures.map(tenure => (
            <MultiYearOption
              tenure={tenure}
              key={tenure.code}
              checked={isSelected(tenure)}
              onChange={handleChange}
            />
          ))}
        </OptionWrapper>
      </div>
    </CustomModal1>
  );
}

function MultiYearOption({ tenure, onChange, checked, ...props }) {
  const target = useRef(null);
  const { colors } = useTheme();
  const handleChange = evt => {
    if (evt.target.value) onChange && onChange(tenure);
  };
  const discount = tenure.discount;
  return (
    <li
      css={`
        margin: 5px 0;
      `}
      className="option d-flex align-items-center justify-content-between"
      {...props}
      onClick={() => {
        target.current.click();
      }}
      onKeyDown={() => {
        target.current.click();
      }}
    >
      <label htmlFor={"tenure-" + tenure.code}>
        {tenure.display_name}{" "}
        {discount ? (
          <span
            style={{
              color: colors.primary_color,
            }}
          >
            {`(save upto ${discount}%)`}
          </span>
        ) : null}
      </label>
      <input
        type="radio"
        id={"tenure-" + tenure.code}
        name="multiYear"
        className="visually-hidden"
        checked={checked}
        onChange={handleChange}
        ref={target}
      />
      {checked ? (
        <IoRadioButtonOn size={25} color={colors.primary_color} />
      ) : (
        <RiCheckboxBlankCircleLine size={25} color="#aaa" />
      )}
    </li>
  );
}

const MultiyearOptionFilter = () => {
  const { getSelectedFilter } = useFilters();

  const tenureFilter = getSelectedFilter("tenure");

  const displayTenureFilter = tenureFilter.display_name;

  return (
    <Filter>
      <FilterHead label={"Multiyear Options"}>{displayTenureFilter}</FilterHead>
      <FilterModal />
    </Filter>
  );
};

export default MultiyearOptionFilter;
