import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";
import {
  setFilters,
  fetchQuotes,
  replaceQuotes,
  replaceFilterQuotes,
} from "../../quote.slice";
import "styled-components/macro";
import { Filter, OptionWrapper, ApplyBtn } from "./Filter.style";

const FilterModal = ({ show, handleClose }) => {
  const { filters, selectedGroup } = useSelector((state) => state.quotePage);
  const plantypeOptions = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data
  );
  const coverRangeOptions = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data
  );
  const dispatch = useDispatch();

  const companies = useSelector(
    (state) => state.frontendBoot.frontendData.data.companies
  );
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
      : {}
  );

  const handleChange = (code, displayName) => {
    if (displayName) {
      setselectedPlanType({ code, displayName });
    }
  };

  const handleApply = () => {
    dispatch(setFilters({ planType: selectedPlanType.displayName }));
    dispatch(replaceQuotes([]));
    dispatch(replaceFilterQuotes([]));
    // console.log("fetchquotes Policy typefilter")
    // dispatch(
    //   fetchQuotes(companies, {
    //     plan_type: selectedPlanType.code,
    //     tenure: parseInt(filters.multiYear),
    //     sum_insured: coverRangeOptions.covers.find(
    //       (filter) => filter.display_name === filters.cover
    //     )?.code,
    //     member: selectedGroup,
    //   })
    // );

    handleClose();
  };

  return (
    <>
      {show && (
        <CustomModal1
          header="Chose Your Policy Type"
          footerJSX={
            <ApplyBtn
              css={`
                height: 65px !important;
              `}
              className=" apply_btn mx-auto h-100 w-100"
              onClick={() => handleApply()}
            >
              Apply
            </ApplyBtn>
          }
          handleClose={handleClose}
          leftAlignmnetMargin="-20"
        >
          <div>
            <OptionWrapper>
              {plantypeOptions
                ? plantypeOptions.plantypes.map((option, i) => {
                    return option.code !== "I" ? (
                      <li
                        css={`
                          margin: 5px 0;
                        `}
                        className="option d-flex align-items-center justify-content-between"
                        key={i}
                      >
                        <label htmlFor={option.code}>
                          {option.display_name}
                        </label>
                        <input
                          type="radio"
                          id={option.code}
                          name="policyType"
                          checked={
                            selectedPlanType.displayName ===
                              option.display_name || false
                          }
                          onChange={(e) =>
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
          left: 34.5vw;
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
      <Modal.Header >
        <Modal.Title
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "black",
          }}
        >
          Chose Your Policy Type
        </Modal.Title>
        <i  onClick={handleClose} style={{cursor: "pointer"}} class="fas fa-times"></i>
      </Modal.Header>
      <Modal.Body>
        <div>
          <OptionWrapper>
            {plantypeOptions
              ? plantypeOptions.plantypes.map((option, i) => {
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
                        checked={
                          selectedPlanType.displayName ===
                            option.display_name || false
                        }
                        onChange={(e) =>
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
      </Modal.Body>
      <Modal.Footer className="text-center">
        <ApplyBtn
          className="btn apply_btn mx-auto h-100 w-100"
          onClick={() => handleApply()}
        >
          Apply
        </ApplyBtn>
      </Modal.Footer>
    </Modal>*/}
    </>
  );
};

const PolicyTypeFilter = () => {
  const [showModal, setShowModal] = useState(false);
  const filters = useSelector(({ quotePage }) => quotePage.filters);
  return (
    <>
      <Filter className="filter d-flex flex-column flex-fill">
        <span className="filter_head">Policy Type</span>
        <span onClick={() => setShowModal(true)} className="filter_sub_head">
          {filters.planType ? filters.planType : "Select"}{" "}
          <i class="fas fa-chevron-down"></i>
        </span>
        <FilterModal
          show={showModal}
          handleClose={() => {
            console.log("i executed");
            setShowModal(false);
          }}
        />
      </Filter>
    </>
  );
};

export default PolicyTypeFilter;
