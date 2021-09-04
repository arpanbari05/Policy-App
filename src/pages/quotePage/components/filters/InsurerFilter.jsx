import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import "styled-components/macro";
import { setFilters } from "../../quotePage.slice";
import { Filter, OptionWrapper, ApplyBtn } from "./Filter.style";
import demoplanlogo from "../../../../assets/logos/digit.png";

const FilterModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const insurerOptions = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data
  );

  const [selectedinsurers, setSelectedinsurers] = useState([]);

  const handleChange = (code, displayName) => {
    if (displayName) {
      setSelectedinsurers(displayName);
    }
  };

  const handleApply = () => {
    dispatch(setFilters({ insurers: selectedinsurers }));
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
          left: 920px;
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
          Insurers
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <OptionWrapper>
            {insurerOptions
              ? Object.keys(insurerOptions.companies).map((key, i) => {
                  return insurerOptions.companies[key].insurance_types[0] === "health"? (
               <>
                      <input
                        type="checkbox"
                        className="d-none"
                        id={insurerOptions.companies[key].alias}
                      />
                      <label
                        htmlFor={insurerOptions.companies[key].alias}
                        className="w-100"
                      >
                        <li className="option insurer_option d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="insurer_logo">
                              <img
                                src={insurerOptions.companies[key].logo}
                                alt="COMPANY_LOGO"
                                className="w-100"
                              />
                            </div>
                            <span className="mx-3">
                              {insurerOptions.companies[key].short_name}
                            </span>
                          </div>

                          <div className="d-flex align-items-center ">
                            <span className="plan_csr">
                              {insurerOptions.companies[key].csr}%
                            </span>
                            <div className="custom_checkbox"></div>
                          </div>
                        </li>
                      </label>
                  </>
                  ):<></>
                })
              : <></>}

            {/* */}
          </OptionWrapper>
        </div>
      </Modal.Body>
      <Modal.Footer className="text-center">
        <ApplyBtn className="btn apply_btn mx-auto h-100 w-100">Apply</ApplyBtn>
      </Modal.Footer>
    </Modal>
  );
};

const InsurerFilter = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Filter
        className="filter d-flex flex-column flex-fill"
        onClick={() => setShowModal(true)}
      >
        <span className="filter_head">Insurers</span>
        <span className="filter_sub_head">
          Select Insurers<i class="fas fa-chevron-down"></i>
        </span>
      </Filter>

      <FilterModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default InsurerFilter;
