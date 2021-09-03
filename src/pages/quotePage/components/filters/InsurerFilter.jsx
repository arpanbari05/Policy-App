import { useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import "styled-components/macro";
import { Filter, OptionWrapper, ApplyBtn } from "./Filter.style";
import demoplanlogo from "../../../../assets/logos/digit.png";

const FilterModal = ({ show, handleClose }) => {
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
          
            <input type="checkbox" className="d-none" id="insurer1" />
            <label htmlFor="insurer1" className="w-100">
            <li className="option insurer_option d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="insurer_logo">
                  <img src={demoplanlogo} alt="COMPANY_LOGO" className="w-100" />
                </div>
                <span>Tata AIG</span>
              </div>

              <div className="d-flex align-items-center ">
                <span className="plan_csr">99.0%</span>
                <div className="custom_checkbox"></div>
              </div>
            </li>
            </label>
   
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


