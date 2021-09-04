import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
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
          Multiyear Options
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <OptionWrapper>
            <li className="option d-flex align-items-center justify-content-between">
              <label htmlFor="name">1 Year</label>
              <input type="radio" id="name" name="premium" />
            </li>
            <li className="option d-flex align-items-center justify-content-between">
              <label htmlFor="name">
                2 Year{" "}
                <span
                  style={{
                    color: "#0a87ff",
                  }}
                >
                  (save upto 10%)
                </span>
              </label>
              <input type="radio" id="name" name="premium" />
            </li>
            <li className="option d-flex align-items-center justify-content-between">
              <label htmlFor="name">
                3 Year{" "}
                <span
                  style={{
                    color: "#0a87ff",
                  }}
                >
                  (save upto 20%)
                </span>
              </label>
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
  const filters = useSelector(({ quotePage }) => quotePage.filters);
  return (
    <>
      <Filter
        className="filter d-flex flex-column flex-fill"
        onClick={() => setShowModal(true)}
      >
        <span className="filter_head">Multiyear Options</span>
        <span className="filter_sub_head">
          {} <i class="fas fa-chevron-down"></i>
        </span>
      </Filter>

      <FilterModal show={showModal} handleClose={() => setShowModal(false)} filters={filters} />
    </>
  );
};

export default MultiyearOptionFilter;
