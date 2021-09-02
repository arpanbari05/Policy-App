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
          left: 282px;
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
          Choose Your Cover Range
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div>
        <OptionWrapper>
          <li className="option d-flex align-items-center justify-content-between">
            <label htmlFor="name">1 to 3 Lacs</label>
            <input type="radio" id="name" name="premium" />
          </li>

          <li className="option d-flex align-items-center justify-content-between">
            <label htmlFor="name">3 to 5 Lacs</label>
            <input type="radio" id="name" name="premium" />
          </li>

          <li className="option d-flex align-items-center justify-content-between">
            <label htmlFor="name">5 to 10 Lacs</label>
            <input type="radio" id="name" name="premium" />
          </li>

          <li className="option d-flex align-items-center justify-content-between">
            <label htmlFor="name">3 to 5 Lacs</label>
            <input type="radio" id="name" name="premium" />
          </li>

          <li className="option d-flex align-items-center justify-content-between">
            <label htmlFor="name">5 to 10 Lacs</label>
            <input type="radio" id="name" name="premium" />
          </li>
          
        </OptionWrapper>
        <div style={{
            fontWeight:"600"
        }} className="text-center w-100">OR</div>

        {/* custom input range for plan */}
        <CustomInputWrapper>
            <input type="text" placeholder="Enter your own cover." className="w-100" />
            <div className="bottom_msg">Enter value between 2 lacs to 1 crore in multiples of 1 lacs.</div>
        </CustomInputWrapper>
        </div>
      </Modal.Body>
      <Modal.Footer className="text-center">
        <ApplyBtn className="btn apply_btn mx-auto h-100 w-100">Apply</ApplyBtn>
      </Modal.Footer>
    </Modal>
  );
};

const CoverRangeFilter = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Filter
        className="filter d-flex flex-column flex-fill"
        onClick={() => setShowModal(true)}
      >
        <span className="filter_head">Cover</span>
        <span className="filter_sub_head">
          3 to 5 Lacs. <i class="fas fa-chevron-down"></i>
        </span>
      </Filter>

      <FilterModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default CoverRangeFilter;

const CustomInputWrapper = styled.div`
width:100%;
.bottom_msg{
    background-color: #d5ddea;
    font-size: 13px;
    margin: 5px 0px;
    padding: 10px;
}
input{
    border: none;
    border-bottom: 2px solid #0a87ff;
    padding: 5px 0px;
    :focus{
        outline: none;
    }
}
`;