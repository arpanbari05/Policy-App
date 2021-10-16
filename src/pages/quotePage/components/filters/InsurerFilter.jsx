import { useState } from "react";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import "styled-components/macro";
import { setFilters, insurerFilter } from "../../quote.slice";
import { Filter, OptionWrapper, ApplyBtn } from "./Filter.style";
import demoplanlogo from "../../../../assets/logos/digit.png";

const FilterModal = ({ show, handleClose, filters }) => {
  const dispatch = useDispatch();

  const insurerOptions = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data
  );

  const [selectedinsurers, setSelectedinsurers] = useState(
    filters.insurers.length ? filters.insurers : []
  );

  const handleChange = (insurer) => {
    selectedinsurers !== [] &&
    selectedinsurers.filter((co) => co.alias === insurer.alias).length === 0
      ? setSelectedinsurers([...selectedinsurers, insurer])
      : setSelectedinsurers([
          ...selectedinsurers.filter((co) => co.alias !== insurer.alias),
        ]);
  };

  const handleApply = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(setFilters({ insurers: selectedinsurers }));
    dispatch(insurerFilter(selectedinsurers));

    handleClose();
  };

  return (
    <>
      {show && (
        <CustomModal1
          header="Insurers"
          footerJSX={
            <ApplyBtn
              css={`
                height: 65px !important;
              `}
              className=" apply_btn mx-auto h-100 w-100"
              onClick={(e) => handleApply(e)}
            >
              Apply
            </ApplyBtn>
          }
          handleClose={handleClose}
          leftAlignmnetMargin="-22"
        >
          <div>
            <OptionWrapper>
              {insurerOptions && selectedinsurers ? (
                Object.keys(insurerOptions.companies)
                  .sort(
                    (a, b) =>
                      insurerOptions?.companies[b].csr -
                      insurerOptions?.companies[a].csr
                  )
                  .map((key, i) => {
                    return insurerOptions.companies[key].insurance_types[0] ===
                      "health" ||
                      insurerOptions.companies[key].insurance_types[0] ===
                        "top_up" ||
                      insurerOptions.companies[key].insurance_types[0] ===
                        "cancer" ||
                      insurerOptions.companies[key].insurance_types[0] ===
                        "critical_illness" ||
                      insurerOptions.companies[key].insurance_types[0] ===
                        "personal_accident" ? (
                      <>
                        <input
                          type="checkbox"
                          className="d-none"
                          id={insurerOptions.companies[key].alias}
                          onChange={() =>
                            handleChange(insurerOptions.companies[key])
                          }
                          checked={
                            selectedinsurers.includes(
                              insurerOptions.companies[key]
                            ) && true
                          }
                        />

                        <label
                          htmlFor={insurerOptions.companies[key].alias}
                          className="w-100"
                        >
                          <li
                            css={`
                              margin: 5px 0;
                            `}
                            className="option insurer_option d-flex align-items-center justify-content-between"
                          >
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
                                {insurerOptions.companies[key].csr}%&nbsp;CSR
                              </span>
                              <div className="custom_checkbox"></div>
                            </div>
                          </li>
                        </label>
                      </>
                    ) : (
                      <></>
                    );
                  })
              ) : (
                <></>
              )}
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
          left: 64.5vw;
        }
        .modal-body{
          max-height: 300px;
          overflow-y:auto;
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
            {insurerOptions && selectedinsurers ? (
              Object.keys(insurerOptions.companies)
                .sort(
                  (a, b) =>
                    insurerOptions?.companies[b].csr -
                    insurerOptions?.companies[a].csr
                )
                .map((key, i) => {
                  return insurerOptions.companies[key].insurance_types[0] ===
                    "health" ||
                    insurerOptions.companies[key].insurance_types[0] ===
                    "top_up" ||
                    insurerOptions.companies[key].insurance_types[0] ===
                    "cancer" ||
                    insurerOptions.companies[key].insurance_types[0] ===
                    "critical_illness" ||
                    insurerOptions.companies[key].insurance_types[0] ===
                    "personal_accident" ? (
                    <>
                      <input
                        type="checkbox"
                        className="d-none"
                        id={insurerOptions.companies[key].alias}
                        onChange={() => handleChange(insurerOptions.companies[key])}
                        checked={selectedinsurers.includes(insurerOptions.companies[key]) && true}

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
                  ) : (
                    <></>
                  );
                })
            ) : (
              <></>
            )}

            
          </OptionWrapper>
        </div>
      </Modal.Body>
      <Modal.Footer className="text-center">
        <ApplyBtn className=" apply_btn mx-auto h-100 w-100" onClick={(e) => handleApply(e)}>Apply</ApplyBtn>
      </Modal.Footer>
            </Modal>*/}
    </>
  );
};

const InsurerFilter = () => {
  const [showModal, setShowModal] = useState(false);
  const filters = useSelector(({ quotePage }) => quotePage.filters);
  return (
    <>
      <Filter className="filter d-flex flex-column flex-fill">
        <span className="filter_head">Insurers</span>
        <span onClick={() => setShowModal(true)} className="filter_sub_head">
          {filters.insurers.length
            ? `${filters.insurers.length} Insurers selected`
            : "Select Insurers"}
          <i class="fas fa-chevron-down"></i>
        </span>

        <FilterModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          filters={filters}
        />
      </Filter>
    </>
  );
};

export default InsurerFilter;
