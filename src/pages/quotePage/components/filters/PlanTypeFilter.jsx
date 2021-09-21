import { useRef, useState } from "react";
import styled from "styled-components";
import "styled-components/macro"
import { fetchQuotes, setFilters } from "../../quote.slice";

import { useParams } from "react-router";
import useOutsiteClick from "../../../../customHooks/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { ApplyBtn, Filter, OptionWrapper } from "./Filter.style";
import { Modal } from "react-bootstrap";

const PlanTypeFilter = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef();
  useOutsiteClick(ref, () => setShowDropdown(false));

  const {
    basePlanType,
    multiYear: tenure,
    cover,
    planType,
  } = useSelector(state => state.quotePage.filters);

  const { groupCode } = useParams();

  const dispatch = useDispatch();

  const {
    baseplantypes: basePlanTypes,
    companies,
    covers,
    plantypes,
  } = useSelector(state => state.frontendBoot.frontendData.data);

  const sum_insured = covers.find(cov => cov.code === cover);

  const pt = plantypes.find(p => p.display_name === planType);

  const sendPlanType = pt ? pt.code : "F";

  const sendCover = sum_insured ? sum_insured.code : "";
  console.log("bes", basePlanType);
  const handleClick = evt => {
    if (basePlanType !== evt.target.value) {

      console.log("heee", evt.target.value, basePlanType);
      dispatch(setFilters({ basePlanType: evt.target.value }));
      dispatch(
        fetchQuotes(companies, {
          sum_insured: sendCover,
          tenure: parseInt(tenure),
          member: groupCode,
          plan_type: sendPlanType,
          basePlanType: evt.target.value,
        }),
      );
      // setShowDropdown(false);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const filters = useSelector(({ quotePage }) => quotePage.filters);
  console.log("filters: ", filters)
  return (

    // <>
    //   <button className="btn select_plan_btn d-flex align-items-center position-relative" style={{
    //     fontWeight: "600"
    //   }}
    //     onClick={() => setShowDropdown(true)}
    //   >
    //     {basePlanType}{" "}
    //     <DownArrowWrapper>
    //       <i class="fas fa-chevron-down"></i>
    //     </DownArrowWrapper>


    //     <Dropdown className={showDropdown ? "d-block" : "d-none"} ref={ref}>
    //       {basePlanTypes.map(thisPlanType => {
    //         return (
    //           <li className="option d-flex justify-content-between align-items-center"


    //           >
    //             <label htmlFor="base_plan">{thisPlanType.display_name}</label>
    //             <input type="radio" name="select_plan_type" id="base_plan"
    //               value={thisPlanType.display_name}

    //               onClick={handleClick}
    //             />
    //           </li>
    //         )
    //       })}



    //     </Dropdown>
    //   </button>
    // </>
    <>
      <Filter
        className="filter d-flex flex-column flex-fill"
        onClick={() => setShowModal(true)}
      >
        <span className="filter_head">Plan Type</span>
        <span className="filter_sub_head">
          {/* {filters.planType ? filters.planType : "Select"}{" "} */}
          {basePlanType}
          <i class="fas fa-chevron-down"></i>
        </span>
      </Filter>

      <FilterModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default PlanTypeFilter;

// const DownArrowWrapper = styled.div`
//   background-color: #eff7ff;
//   color: #0a87ff;
//   width: 25px;
//   height: 25px;
//   border-radius: 100%;
//   margin: 0px 5px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Dropdown = styled.ul`
//   position: absolute;
//   width: 100%;

//   background-color: white;
//   box-shadow: 0 3px 9px 0 rgba(193, 203, 218, 0.52);
//   z-index: 99;
//   top: 45px;
//   left: 50%;
//   transform: translateX(-50%);
//   border-radius: 8px;
//   list-style: none;
//   padding: 10px 15px;
//   margin: 0;
// font-size: 14px;
// font-weight: 600;
//   input[type="radio"] {
//     width: 18px;
//     height: 18px;
//   }
//   li{
//       margin-bottom: 10px;
//   }
// `;


const FilterModal = ({ show, handleClose }) => {
  // const { filters, selectedGroup } = useSelector((state) => state.quotePage);
  // const plantypeOptions = useSelector(
  //   ({ frontendBoot }) => frontendBoot.frontendData.data
  // );
  // const coverRangeOptions = useSelector(
  //   ({ frontendBoot }) => frontendBoot.frontendData.data
  // );
  // const dispatch = useDispatch();

  // const companies = useSelector(
  //   (state) => state.frontendBoot.frontendData.data.companies
  // );
  // const existingPlanTypeCode = filters.planType === "Individual"
  //   ? "I"
  //   : filters.planType === "Family Floater"
  //     ? "F"
  //     : "M";
  // const existingPlanTypeDisplayname = filters.planType;


  // const handleApply = () => {
  //   dispatch(setFilters({ planType: selectedPlanType.displayName }));
  //   dispatch(replaceQuotes([]));
  //   dispatch(replaceFilterQuotes([]));
  //   dispatch(
  //     fetchQuotes(companies, {
  //       plan_type: selectedPlanType.code,
  //       tenure: parseInt(filters.multiYear),
  //       sum_insured: coverRangeOptions.covers.find(
  //         (filter) => filter.display_name === filters.cover
  //       )?.code,
  //       member: selectedGroup,
  //     })
  //   );

  //   handleClose();
  // };
  const {
    basePlanType,
    multiYear: tenure,
    cover,
    planType,
  } = useSelector(state => state.quotePage.filters);
  const [selectedPlanType, setselectedPlanType] = useState(
    basePlanType
  );

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
  } = useSelector(state => state.frontendBoot.frontendData.data);

  const sum_insured = covers.find(cov => cov.code === cover);

  const pt = plantypes.find(p => p.display_name === planType);

  const sendPlanType = pt ? pt.code : "F";

  const sendCover = sum_insured ? sum_insured.code : "";
  console.log("bes", basePlanType);
  const handleClick = evt => {
    if (basePlanType !== evt) {

      console.log("heee", evt, basePlanType);
      dispatch(setFilters({ basePlanType: evt }));
      dispatch(
        fetchQuotes(companies, {
          sum_insured: sendCover,
          tenure: parseInt(tenure),
          member: groupCode,
          plan_type: sendPlanType,
          basePlanType: evt,
        }),
      );
      // setShowDropdown(false);
      handleClose();
    }
  };


  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      css={`
        .modal-dialog {
          margin: 0px !important;
          max-width: 440px;
        }
        .modal-content {
          top: 238px ;
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
                  <label htmlFor="base_plan">{thisPlanType.display_name}</label>
                  <input type="radio" name="select_plan_type" id="base_plan"
                    value={thisPlanType.display_name}
                    onChange={(e) =>
                      handleChange(thisPlanType.display_name)
                    }
                  />
                </li>
              )
            })
            }
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
    </Modal>
  );
};

