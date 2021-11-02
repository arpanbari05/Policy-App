import { useRef, useState } from "react";
import styled from "styled-components";
import tooltipImg from "../../../../assets/svg/tooltip-icon.js";
import "styled-components/macro";
import { fetchQuotes, setFilters } from "../../quote.slice";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useParams } from "react-router";
import useOutsiteClick from "../../../../customHooks/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { ApplyBtn, Filter, OptionWrapper } from "./Filter.style";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";

const renderTooltipDesc = ({ props, desc }) => (
  <Tooltip {...props}>{desc}</Tooltip>
);

const PlanTypeFilter = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    basePlanType,
    multiYear: tenure,
    cover,
    planType,
  } = useSelector((state) => state.quotePage.filters);

  const { groupCode } = useParams();

  const dispatch = useDispatch();

  const {
    baseplantypes: basePlanTypes,
    companies,
    covers,
    plantypes,
  } = useSelector((state) => state.frontendBoot.frontendData.data);

  const sum_insured = covers.find((cov) => cov.code === cover);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Filter className="filter d-flex flex-column flex-fill">
        <span className="filter_head">Plan Type</span>
        <span onClick={() => setShowModal(true)} className="filter_sub_head">
          {basePlanType}
          <i class="fas fa-chevron-down"></i>
        </span>
        {showModal && <FilterModal handleClose={() => setShowModal(false)} />}
      </Filter>
    </>
  );
};

export default PlanTypeFilter;

const FilterModal = ({ handleClose }) => {
  const {
    basePlanType,
    multiYear: tenure,
    cover,
    planType,
  } = useSelector((state) => state.quotePage.filters);
  const [selectedPlanType, setselectedPlanType] = useState({
    code: cover,
    display_name: basePlanType,
  });

  // console.log(selectedPlanType, basePlanType, "agsd");
  //console.log(
  //  "The initial baseplantype, selectedPlantype",
  //  basePlanType,
  //  selectedPlanType
  //);

  const handleChange = (displayName) => {
    if (displayName) {
      setselectedPlanType(displayName);
    }
  };

  const { groupCode } = useParams();

  const dispatch = useDispatch();

  const {
    baseplantypes: basePlanTypes,
    companies,
    covers,
    plantypes,
  } = useSelector((state) => state.frontendBoot.frontendData.data);
  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
  const sum_insured = covers.find((cov) => cov.display_name === cover);

  const pt = plantypes.find((p) => p.display_name === planType);

  const sendPlanType = pt ? pt.code : "F";

  const sendCover = sum_insured ? sum_insured.code : "";

  const tooltipDescSelector = (name) => {
    switch (name) {
      case "arogya_sanjeevani":
        return "Plans offering Arogya sanjeevani benefits";

      case "global_plans":
        return "Plans offering Global coverage";

      case "base_health":
        return "Plans covering all your medical needs";

      case "1_crore_plan":
        return "Plans offering cover amount 1 Crore";

      default:
        break;
    }
  };

  const handleClick = (evt) => {
    console.log("fetchquotes plantypefilter");
    if (evt.display_name === "1 crore plan") {
      dispatch(
        setFilters({
          cover: "More than 25 Lacs",
          basePlanType: evt.display_name,
        })
      );
    } else {
      dispatch(setFilters({ basePlanType: evt.display_name }));
    }
    // dispatch(
    //   fetchQuotes(companies, {
    //     sum_insured: sendCover,
    //     tenure: parseInt(tenure),
    //     member: groupCode,
    //     plan_type: sendPlanType,
    //     basePlanType: evt.code,
    //   })
    // );
    // setShowDropdown(false);
    handleClose();
  };

  return (
    <>
      {
        <CustomModal1
          header="Choose Your Plan Type"
          footerJSX={
            <ApplyBtn
              PrimaryColor={PrimaryColor}
              css={`
                height: 65px !important;
              `}
              className="apply_btn mx-auto h-100 w-100"
              onClick={() => handleClick(selectedPlanType)}
            >
              Apply
            </ApplyBtn>
          }
          handleClose={handleClose}
          tooltipDesc="Select a plan type to view plans offering chosen type of plan."
          leftAlignmnetMargin="-22"
        >
          <div>
            <OptionWrapper PrimaryColor={PrimaryColor}>
              {basePlanTypes.map((thisPlanType, i) => {
                const toBeCheckedPlan =
                  thisPlanType.display_name === "Base health"
                    ? "Base Health"
                    : thisPlanType.display_name;
                return (
                  <li
                    css={`
                      margin: 5px 0;
                    `}
                    className="option d-flex align-items-center justify-content-between"
                    key={i}
                  >
                    <label htmlFor={thisPlanType.code}>
                      {console.log("thisPlanType.code", thisPlanType.code)}
                      <OverlayTrigger
                        placement={"right"}
                        overlay={renderTooltipDesc({
                          desc: tooltipDescSelector(thisPlanType.code),
                        })}
                      >
                        <span>
                          {thisPlanType.display_name} {tooltipImg()}
                        </span>
                      </OverlayTrigger>
                    </label>
                    <input
                      type="radio"
                      name="select_plan_type"
                      id={thisPlanType.code}
                      value={thisPlanType.display_name}
                      checked={
                        selectedPlanType.display_name === toBeCheckedPlan ||
                        false
                      }
                      onChange={(e) => handleChange(thisPlanType)}
                    />
                  </li>
                );
              })}
            </OptionWrapper>
          </div>
        </CustomModal1>
      }
      {/*<Modal
      show={show}
      onHide={handleClose}
      animation={false}
      css={`
        .modal-dialog {
          margin: 0px !important;
          max-width: 440px;
        }
        .modal-content {
          top: 238px;
          left: 55vw !important;
        }
        .modal-footer {
          padding: 0px !important;
          border-top: none !important;
        }
        .modal-footer > * {
          margin: 0px !important;
        }
      `}
    >
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "black",
          }}
        >
          Chose Your Plan Type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <OptionWrapper>
            {basePlanTypes.map((thisPlanType, i) => {
              return (
                <li
                  className="option d-flex align-items-center justify-content-between"
                  key={i}
                >
                  <label htmlFor={thisPlanType.code}>
                    {thisPlanType.display_name}
                  </label>
                  <input
                    type="radio"
                    name="select_plan_type"
                    id={thisPlanType.code}
                    value={thisPlanType.display_name}
                    checked={
                      selectedPlanType.display_name ===
                        thisPlanType.display_name || false
                    }
                    onChange={(e) => handleChange(thisPlanType)}
                  />
                </li>
              );
            })}
          </OptionWrapper>
        </div>
      </Modal.Body>
      <Modal.Footer className="text-center">
        <ApplyBtn
          className="apply_btn mx-auto h-100 w-100"
          onClick={() => handleClick(selectedPlanType)}
        >
          Apply
        </ApplyBtn>
      </Modal.Footer>
          </Modal>*/}
    </>
  );
};
