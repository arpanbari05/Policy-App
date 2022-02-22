import { useState } from "react";
import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import tooltipImg from "../../../../assets/svg/tooltip-icon.js";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";
import "styled-components/macro";
import { OptionWrapper, ApplyBtn } from "./Filter.style";
import useUpdateFilters from "./useUpdateFilters.js";
import useFilters from "./useFilters.js";
import { useFrontendBoot, useTheme } from "../../../../customHooks/index.js";
import { Filter, FilterHead } from "./index.js";

const renderTooltipDesc = ({ props, desc }) => (
  <Tooltip {...props}>{desc}</Tooltip>
);

const FilterModal = ({ show, onClose }) => {
  const { colors } = useTheme();

  const { filters } = useSelector(state => state.quotePage);

  const { data } = useFrontendBoot();

  const existingPlanTypeCode =
    filters.planType === "Individual"
      ? "I"
      : filters.planType === "Family Floater"
      ? "F"
      : "M";
  const existingPlanTypeDisplayname = filters.planType;
  const [selectedPlanType, setselectedPlanType] = useState(
    filters.planType
      ? {
          code: existingPlanTypeCode,
          displayName: existingPlanTypeDisplayname,
        }
      : {},
  );

  const handleChange = (code, displayName) => {
    if (displayName) {
      setselectedPlanType({ code, displayName });
    }
  };

  const { updateFilters } = useUpdateFilters();

  const handleApply = () => {
    updateFilters({ plantype: selectedPlanType });

    onClose && onClose();
  };

  return (
    <>
      {show && (
        <CustomModal1
          header="Chose Your Policy Type"
          footerJSX={
            <ApplyBtn
              PrimaryColor={colors.primary_color}
              css={`
                height: 65px !important;
              `}
              className=" apply_btn mx-auto h-100 w-100"
              onClick={() => handleApply()}
            >
              Apply
            </ApplyBtn>
          }
          handleClose={() => onClose && onClose()}
          leftAlignmnetMargin="-20"
          tooltipDesc="Select a policy type to view plans offering chosen policy type."
        >
          <div>
            <OptionWrapper PrimaryColor={colors.primary_color}>
              {data?.plantypes
                ? data?.plantypes.map((option, i) => {
                    return option.code !== "I" ? (
                      <li
                        css={`
                          margin: 5px 0;
                        `}
                        className="option d-flex align-items-center justify-content-between"
                        key={i}
                      >
                        <label htmlFor={option.code}>
                          <OverlayTrigger
                            placement={"right"}
                            overlay={renderTooltipDesc({
                              desc:
                                option.code === "F"
                                  ? "Family floater plan covers your entire family under one single plan. The total sum insured is shared amongst insured family members"
                                  : "Multi-individual plan covers each family member under separate sum insured. You get discount if you cover 2 or more family members under multi-individual plan.",
                            })}
                          >
                            <span>
                              {option.display_name} {tooltipImg()}
                            </span>
                          </OverlayTrigger>
                        </label>
                        <input
                          type="radio"
                          id={option.code}
                          name="policyType"
                          checked={
                            selectedPlanType.displayName ===
                              option.display_name || false
                          }
                          onChange={() =>
                            handleChange(option.code, option.display_name)
                          }
                        />
                      </li>
                    ) : (
                      <></>
                    );
                  })
                : ""}
            </OptionWrapper>
          </div>
        </CustomModal1>
      )}
    </>
  );
};

const PolicyTypeFilter = () => {
  const { getSelectedFilter } = useFilters();

  const selectedPolicyTypeFilter = getSelectedFilter("plantype");

  const displayPolicyTypeFitler = selectedPolicyTypeFilter.display_name;

  return (
    <Filter>
      <FilterHead label={"Policy Type"}>{displayPolicyTypeFitler}</FilterHead>
      <FilterModal show />
    </Filter>
  );
};

export default PolicyTypeFilter;
