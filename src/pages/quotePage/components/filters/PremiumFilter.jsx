import { useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import "styled-components/macro";
import { Filter,OptionWrapper,ApplyBtn } from "./Filter.style";

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
          left: 60px;
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
          Premium
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div>

        <OptionWrapper>
          <li className="option d-flex align-items-center justify-content-between">
            <label htmlFor="name">{"< 5000"}</label>
            <input type="radio" id="name" name="premium" />
          </li>

          <li className="option d-flex align-items-center justify-content-between">
            <label htmlFor="name2">{"10,000 - 15000"}</label>
            <input type="radio" id="name2" name="premium" />
          </li>

          <li className="option d-flex align-items-center justify-content-between">
            <label htmlFor="name3">{"20,000 - 25000"}</label>
            <input type="radio" id="name3" name="premium" />
          </li>
        </OptionWrapper>
        
        </div>
      </Modal.Body>
      <Modal.Footer className="text-center">
        <ApplyBtn className="btn apply_btn mx-auto h-100 w-100">Apply</ApplyBtn>
      </Modal.Footer>
    </Modal>
  );
};

const PremiumFilter = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Filter
        className="filter d-flex flex-column flex-fill"
        onClick={() => setShowModal(true)}
      >
        <span className="filter_head">Premium</span>
        <span className="filter_sub_head">
          Select Premium <i class="fas fa-chevron-down"></i>
        </span>
      </Filter>

      <FilterModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default PremiumFilter;

