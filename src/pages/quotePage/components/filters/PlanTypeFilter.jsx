import { useState, useRef } from "react";
import TooltipImg from "../../../../assets/svg/tooltip-icon.js";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ApplyBtn, OptionWrapper } from "./Filter.style";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";
import useFilters from "./useFilters.js";
import useUpdateFilters from "./useUpdateFilters.js";
import { useFrontendBoot, useTheme } from "../../../../customHooks/index.js";
import "styled-components/macro";
import { Filter, FilterHead } from "./index.js";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { IoRadioButtonOn } from "react-icons/io5";
import {
  ClickSound,
  dateObjectToLocaleString,
} from "../../../../utils/helper.js";
import { PortDatePicker } from "../../../InputPage/components/PortabilityForm";
import { useUpdateEnquiry } from "../../../../customHooks";
import { CircleLoader } from "../../../../components/index.js";
import { isSSOJourney } from "../../../../utils/helper";
import { useGetEnquiriesQuery } from "../../../../api/api";

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
  const { getSelectedFilter } = useFilters();

  const selectedPlanTypeFilter = getSelectedFilter("baseplantype");

  const displayBasePlanTypeFilter = selectedPlanTypeFilter.display_name;

  return (
    <Filter>
      <FilterHead label={"Plan Type"}>{displayBasePlanTypeFilter}</FilterHead>
      <FilterModal />
    </Filter>
  );
};

export default PlanTypeFilter;

function FilterModal({ onClose, ...props }) {
  const {
    journeyType,
    data: {
      settings: { restrict_posp_quotes_after_limit },
    },
  } = useFrontendBoot();
  const { colors } = useTheme();

  const {
    data: {
      data: {
        input: { port_policy_expiry_date },
      },
    },
  } = useGetEnquiriesQuery();

  const { updateEnquiry } = useUpdateEnquiry();

  let {
    data: { baseplantypes },
  } = useFrontendBoot();

  if (isSSOJourney() && restrict_posp_quotes_after_limit === "1")
    baseplantypes = baseplantypes.filter(
      plantype => plantype.code !== "1_crore_plan",
    ); // excluding 1 Crore plan filter for POS user PINC Broker

  const [isLoading, setLoading] = useState(false);

  const [expiryDate, setExpiryDate] = useState(
    new Date(port_policy_expiry_date),
  );

  const [expiryDateError, setExpiryError] = useState(null);

  const renderPlanTypes =
    journeyType === "top_up"
      ? baseplantypes.filter(
          singelPlanType => singelPlanType.code !== "arogya_sanjeevani",
        )
      : baseplantypes;

  const { getSelectedFilter } = useFilters();

  const [selectedPlanType, setSelectedPlanType] = useState(() =>
    getSelectedFilter("baseplantype"),
  );

  const handleChange = baseplantype => {
    ClickSound();
    setSelectedPlanType(baseplantype);
  };

  const isSelected = baseplantype =>
    selectedPlanType.code === baseplantype.code;

  const { updateFilters } = useUpdateFilters();

  const handleApplyClick = async () => {
    const updatedBasePlanTypeFilter = { baseplantype: selectedPlanType };

    if (selectedPlanType.code === "1_crore_plan") {
      updatedBasePlanTypeFilter.cover = {
        code: "2500001-100000000",
        display_name: "More than 25 Lacs",
      };
    }

    let expiry_date = dateObjectToLocaleString(new Date(expiryDate)).split("/");

    setLoading(true);
    if (selectedPlanType.code === "port_plan") {
      await Promise.all([
        updateEnquiry({
          expiry_date: `${expiry_date[2]}-${expiry_date[1]}-${expiry_date[0]}`,
          type: "port",
        }),
        updateFilters(updatedBasePlanTypeFilter),
      ]);
      // updateFilters(updatedBasePlanTypeFilter);
      // const res = await updateEnquiry({ expiry_date });
      // setLoading(false);
      onClose && onClose();
    } else if (
      selectedPlanType.code === "topup_plan" &&
      journeyType !== "top_up"
    ) {
      await Promise.all([
        updateEnquiry({
          section: "top_up",
        }),
        updateFilters(updatedBasePlanTypeFilter),
      ]);
    } else if (selectedPlanType.code === "health" && journeyType !== "health") {
      await Promise.all([
        updateEnquiry({
          section: "health",
        }),
        updateFilters(updatedBasePlanTypeFilter),
      ]);
    } else {
      updateFilters(updatedBasePlanTypeFilter);
    }
    onClose && onClose();
  };

  return (
    <CustomModal1
      header="Choose Your Plan Type"
      footerJSX={
        <ApplyBtn
          css={`
            background-color: ${colors.primary_color};

            &:disabled {
              background: ${colors.secondary_shade};
              color: #444;
            }
          `}
          className="apply_btn mx-auto h-100 w-100"
          onClick={handleApplyClick}
          disabled={
            (!expiryDate || expiryDateError) &&
            selectedPlanType.code === "port_plan"
          }
        >
          {"Apply"}
          {isLoading && <CircleLoader animation="border" />}
        </ApplyBtn>
      }
      handleClose={() => onClose && onClose()}
      tooltipDesc="Select a plan type to view plans offering choosen type of plan."
      leftAlignmnetMargin="-22"
      {...props}
    >
      <div>
        <OptionWrapper PrimaryColor={colors.primary_color}>
          {renderPlanTypes.map(baseplantype => {
            return (
              <PlanType
                baseplantype={baseplantype}
                checked={isSelected(baseplantype)}
                onChange={handleChange}
                key={baseplantype.code}
                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}
                setExpiryError={setExpiryError}
              />
            );
          })}
        </OptionWrapper>
      </div>
    </CustomModal1>
  );
}

function PlanType({
  baseplantype,
  checked = false,
  onChange,
  expiryDate,
  setExpiryDate = () => {},
  setExpiryError = () => {},
  ...props
}) {
  const target = useRef(null);
  const handleChange = evt => {
    if (evt.target.checked) onChange && onChange(baseplantype, checked);
  };
  const { colors } = useTheme();

  return (
    <li
      css={`
        margin: 5px 0;
      `}
      className="option d-flex align-items-center justify-content-between flex-wrap"
      {...props}
      onClick={() => {
        target.current.click();
      }}
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
      {checked ? (
        <IoRadioButtonOn size={25} color={colors.primary_color} />
      ) : (
        <RiCheckboxBlankCircleLine size={25} fontWeight={"300"} color="#aaa" />
      )}
      <input
        style={{ display: "none" }}
        type="checkbox"
        name="select_plan_type"
        id={baseplantype.code}
        value={baseplantype.display_name}
        checked={checked}
        onChange={handleChange}
        ref={target}
      />
      {baseplantype.code === "port_plan" && checked && (
        <div
          css={`
            min-width: 100%;
            margin-top: 20px;
          `}
        >
          <PortDatePicker
            value={expiryDate}
            setError={setExpiryError}
            setValue={setExpiryDate}
          />
        </div>
      )}
    </li>
  );
}
