import { useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import "styled-components/macro";
import { Filter, OptionWrapper, ApplyBtn } from "./Filter.style";

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
          left: 685px;
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
          <input type="checkbox" className="d-none" />
            <li className="option d-flex align-items-center justify-content-between">
<div>
<img src={} />
<label htmlFor="name">Tata AIG</label>
</div>
              
              <input type="radio" id="name" name="premium" />
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

const MultiyearOptionFilter = () => {
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

export default MultiyearOptionFilter;
