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

  
 

  const [showModal, setShowModal] = useState(false);
 

  return (

    
    <>
      <Filter
        className="filter d-flex flex-column flex-fill"
        onClick={() => setShowModal(true)}
      >
        <span className="filter_head">Plan Type</span>
        <span className="filter_sub_head">
        
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

const FilterModal = ({ show, handleClose }) => {

  const {
    basePlanType,
    multiYear: tenure,
    cover,
    planType,
  } = useSelector(state => state.quotePage.filters);
  const [selectedPlanType, setselectedPlanType] = useState(
    {}
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
  
  const handleClick = evt => {

     
      dispatch(setFilters({ basePlanType: evt.display_name }));
      dispatch(
        fetchQuotes(companies, {
          sum_insured: sendCover,
          tenure: parseInt(tenure),
          member: groupCode,
          plan_type: sendPlanType,
          basePlanType: evt.code,
        }),
      );
      // setShowDropdown(false);
      handleClose();
    
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
                  <label htmlFor={thisPlanType.code}>{thisPlanType.display_name}</label>
                  <input type="radio" name="select_plan_type" id={thisPlanType.code}
                    value={thisPlanType.display_name}
                    onChange={(e) => handleChange(thisPlanType)}
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

