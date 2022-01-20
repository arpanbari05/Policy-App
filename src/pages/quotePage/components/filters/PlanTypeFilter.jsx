import { useState } from "react";
import TooltipImg from "../../../../assets/svg/tooltip-icon.js";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ApplyBtn, Filter, OptionWrapper } from "./Filter.style";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";
import useFilters from "./useFilters.js";
import useUpdateFilters from "./useUpdateFilters.js";
import { useGetFrontendBootQuery } from "../../../../api/api.js";
import { useTheme } from "../../../../customHooks/index.js";
import "styled-components/macro";

const DESCRIPTIONS = {
  arogya_sanjeevani:
    "Plan offering Arogya Sanjeevani Benefits; this policy is a standard health insurance policy introduced by the IRDA & offered by Health Insurance Companies in India",
  global_plans:
    "Plans offering Global coverage; this policy ensure you are civered for health expenses internationally",
  base_health:
    "Plans covering all your medical needs; this policy offer varied health benefits meeting your needs",
  "1_crore_plan": "Plans offering cover amount 1 Crore",
};

const renderTooltipDesc = ({ props, desc }) => (
  <Tooltip {...props}>{desc}</Tooltip>
);

const PlanTypeFilter = () => {
  const [showModal, setShowModal] = useState(false);

  const { getSelectedFilter } = useFilters();

  const selectedPlanTypeFilter = getSelectedFilter("baseplantype");

  const displayBasePlanTypeFilter = selectedPlanTypeFilter.display_name;

  return (
    <>
      <Filter className="filter d-flex flex-column flex-fill">
        <span className="filter_head">Plan Type</span>
        <span onClick={() => setShowModal(true)} className="filter_sub_head">
          {displayBasePlanTypeFilter}
          <i class="fas fa-chevron-down"></i>
        </span>
        {showModal && <FilterModal handleClose={() => setShowModal(false)} />}
      </Filter>
    </>
  );
};

export default PlanTypeFilter;

function FilterModal({ handleClose, ...props }) {
  const { colors } = useTheme();

  const {
    data: { baseplantypes },
  } = useGetFrontendBootQuery();

  const { getSelectedFilter } = useFilters();

  const [selectedPlanType, setSelectedPlanType] = useState(() =>
    getSelectedFilter("baseplantype"),
  );

  const handleChange = baseplantype => {
    setSelectedPlanType(baseplantype);
  };

  const isSelected = baseplantype =>
    selectedPlanType.code === baseplantype.code;

  const { updateFilters } = useUpdateFilters();

  const handleApplyClick = () => {
    const updatedBasePlanTypeFilter = { baseplantype: selectedPlanType };

    if (selectedPlanType.code === "1_crore_plan") {
      updatedBasePlanTypeFilter.cover = {
        code: "2500001-100000000",
        display_name: "More than 25 Lacs",
      };
    }

    updateFilters(updatedBasePlanTypeFilter);

    handleClose && handleClose();
  };

  return (
    <CustomModal1
      header="Choose Your Plan Type"
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
      tooltipDesc="Select a plan type to view plans offering chosen type of plan."
      leftAlignmnetMargin="-22"
      {...props}
    >
      <div>
        <OptionWrapper PrimaryColor={colors.primary_color}>
          {baseplantypes.map(baseplantype => {
            return (
              <PlanType
                baseplantype={baseplantype}
                checked={isSelected(baseplantype)}
                onChange={handleChange}
                key={baseplantype.code}
              />
            );
          })}
        </OptionWrapper>
      </div>
    </CustomModal1>
  );
}

function PlanType({ baseplantype, checked = false, onChange, ...props }) {
  const handleChange = evt => {
    if (evt.target.checked) onChange && onChange(baseplantype, checked);
  };
  return (
    <li
      css={`
        margin: 5px 0;
      `}
      className="option d-flex align-items-center justify-content-between"
      {...props}
    >
      <label htmlFor={baseplantype.code}>
        <OverlayTrigger
          placement="right"
          overlay={renderTooltipDesc({
            desc: DESCRIPTIONS[baseplantype.code],
          })}
        >
          <span>
            {baseplantype.display_name} <TooltipImg />
          </span>
        </OverlayTrigger>
      </label>
      <input
        type="radio"
        name="select_plan_type"
        id={baseplantype.code}
        value={baseplantype.display_name}
        checked={checked}
        onChange={handleChange}
      />
    </li>
  );
}
