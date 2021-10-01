import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilters,
  fetchQuotes,
  replaceQuotes,
  replaceFilterQuotes,
} from "../../quote.slice";
import styled from "styled-components";
import "styled-components/macro";
import { Filter, OptionWrapper, ApplyBtn } from "./Filter.style";

const FilterModal = ({ show, handleClose }) => {
  const { filters, selectedGroup } = useSelector((state) => state.quotePage);
  const companies = useSelector(
    (state) => state.frontendBoot.frontendData.data.companies
  );
  const frontEndData = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data
  );
  const dispatch = useDispatch();



  const [selectedTenure, setSelectedTenure] = useState(filters.multiYear ? {
    code: parseInt(filters.multiYear),
    displayName: filters.multiYear
  } : {});

  const handleChange = (code, displayName) => {
    if (displayName) {
      setSelectedTenure({
        code,
        displayName
      });
    }
  };

  const handleApply = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(setFilters({ multiYear: selectedTenure.displayName }));

    dispatch(replaceQuotes([]));
    dispatch(replaceFilterQuotes([]));
    dispatch(
      fetchQuotes(companies, {
        plan_type: filters.planType === "Individual"
          ? "I"
          : filters.planType === "Family Floater"
            ? "F"
            : "M",
        tenure: selectedTenure.code,
        sum_insured: frontEndData.covers.find(
          (filter) => filter.display_name === filters.cover
        )?.code,
        member: selectedGroup,
      })
    );

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
          left: 34.5vw;
          @media(min-width: 1550px){
            left:36.5vw;
          }
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
          Multiyear Options
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <OptionWrapper>
            <li className="option d-flex align-items-center justify-content-between">
              <label htmlFor="1 Year">1 Year</label>
              <input type="radio" id="1 Year" name="multiYear" checked={selectedTenure.code === 1 || false} onChange={() => handleChange(1, "1 Year")} />
            </li>
            <li className="option d-flex align-items-center justify-content-between">
              <label htmlFor="2 Year">
                2 Years{" "}
                <span
                  style={{
                    color: "#0a87ff",
                  }}
                >
                  (save upto 10%)
                </span>
              </label>
              <input type="radio" id="2 Year" name="multiYear" checked={selectedTenure.code === 2 || false}  onChange={() => handleChange(2, "2 Years")} />
            </li>
            <li className="option d-flex align-items-center justify-content-between">
              <label htmlFor="3 Year">
                3 Years{" "}
                <span
                  style={{
                    color: "#0a87ff",
                  }}
                >
                  (save upto 20%)
                </span>
              </label>
              <input type="radio" id="3 Year" name="multiYear" checked={selectedTenure.code === 3 || false}  onChange={() => handleChange(3, "3 Years")} />
            </li>
          </OptionWrapper>
        </div>
      </Modal.Body>
      <Modal.Footer className="text-center">
        <ApplyBtn className="apply_btn mx-auto h-100 w-100" onClick={(e) => handleApply(e)}>Apply</ApplyBtn>
      </Modal.Footer>
    </Modal>
  );
};

const MultiyearOptionFilter = () => {
  const [showModal, setShowModal] = useState(false);
  const filters = useSelector(({ quotePage }) => quotePage.filters);
  return (
    <>
      <Filter
        className="filter d-flex flex-column flex-fill"
        onClick={() => setShowModal(true)}
      >
        <span className="filter_head">Multiyear Options</span>
        <span className="filter_sub_head">
          {filters.multiYear ? filters.multiYear : "Select Tenure"} <i class="fas fa-chevron-down"></i>
        </span>
      </Filter>

      <FilterModal show={showModal} handleClose={() => setShowModal(false)} filters={filters} />
    </>
  );
};

export default MultiyearOptionFilter;
