import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setFilters } from "../../quotePage.slice";
import "styled-components/macro";
import { Filter, OptionWrapper, ApplyBtn } from "./Filter.style";

const FilterModal = ({ show, handleClose, filters }) => {
  const plantypeOptions = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data
  );

  const dispatch = useDispatch();

  const [selectedPlanType, setselectedPlanType] = useState(
    filters.planType ? filters.planType : ""
  );

  const handleChange = (code,displayName) => {
    if (displayName) {
      setselectedPlanType(displayName);
    }
  };

  const handleApply = () => {
    dispatch(setFilters({ planType: selectedPlanType }));
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
          top: 238px;
          left: 483px;
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
          Chose Your Policy Type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <OptionWrapper>
            {plantypeOptions? plantypeOptions.plantypes.map((option, i) => {
              return option.code !== "I" ? (
                    <li
                      className="option d-flex align-items-center justify-content-between"
                      key={i}
                    >
                      <label htmlFor={option.code}>{option.display_name}</label>
                      <input
                        type="radio"
                        id={option.code}
                        name="policyType"
                        onChange={(e) =>
                          handleChange(option.code, option.display_name)
                        }
                      />
                    </li>
                  ) :<></>
                })
              : ""}
          </OptionWrapper>
        </div>
      </Modal.Body>
      <Modal.Footer className="text-center">
        <ApplyBtn
          className="btn apply_btn mx-auto h-100 w-100"
          onClick={() => handleApply()}
        >
          Apply
        </ApplyBtn>
      </Modal.Footer>
    </Modal>
  );
};

const PolicyTypeFilter = () => {
  const [showModal, setShowModal] = useState(false);
  const filters = useSelector(({ quotePage }) => quotePage.filters);
  return (
    <>
      <Filter
        className="filter d-flex flex-column flex-fill"
        onClick={() => setShowModal(true)}
      >
        <span className="filter_head">Plan Type</span>
        <span className="filter_sub_head">
          {filters.planType ? filters.planType : "Select"}{" "}
          <i class="fas fa-chevron-down"></i>
        </span>
      </Filter>

      <FilterModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        filters={filters}
      />
    </>
  );
};

export default PolicyTypeFilter;
