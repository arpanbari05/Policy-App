import { useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import "styled-components/macro";
import { Filter,OptionWrapper,ApplyBtn } from "./Filter.style";
import PencilIcon from "../../../../assets/images/svg-icons/PencilIcon";

const FilterModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      css={`
        .modal-dialog {
        
          max-width: 660px;
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
      <Modal.Header closeButton style={{
          backgroundColor:"#f5f7f9"
      }}>
        <Modal.Title
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "black",
          }}
        >
          Edit Members
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <OptionWrapper >
        <div className="d-flex flex-wrap">

        
          <Member className="w-50">
              <input type="checkbox" class="d-none" id="self" />
              <label htmlFor="self">
              <div className="d-flex align-items-center">
                  <div className="custom_checkbox"></div>
                  <span style={{
                      fontWeight:"600"
                  }}>Self</span>
                  </div>
                  <div className="age_select d-flex- align-items-center">
                      Select age   <i class="fas fa-chevron-down mx-2 mt-1"></i>
                  </div>
              </label>
          </Member>

          <Member className="w-50">
              <input type="checkbox" class="d-none" id="spouse" />
              <label htmlFor="spouse">
              <div className="d-flex align-items-center">
                  <div className="custom_checkbox"></div>
                  <span style={{
                      fontWeight:"600"
                  }}>Spouse</span>
                  </div>
                  <div className="age_select d-flex- align-items-center">
                      Select age   <i class="fas fa-chevron-down mx-2 mt-1"></i>
                  </div>
              </label>
          </Member>

          <Member className="w-50">
              <input type="checkbox" class="d-none" id="spouse" />
              <label htmlFor="spouse">
              <div className="d-flex align-items-center">
                  <div className="custom_checkbox"></div>
                  <span style={{
                      fontWeight:"600"
                  }}>Spouse</span>
                  </div>
                  <div className="age_select d-flex- align-items-center">
                      Select age   <i class="fas fa-chevron-down mx-2 mt-1"></i>
                  </div>
              </label>
          </Member>

          <Member className="w-50">
              <input type="checkbox" class="d-none" id="spouse" />
              <label htmlFor="spouse">
              <div className="d-flex align-items-center">
                  <div className="custom_checkbox"></div>
                  <span style={{
                      fontWeight:"600"
                  }}>Spouse</span>
                  </div>
                  <div className="age_select d-flex- align-items-center">
                      Select age   <i class="fas fa-chevron-down mx-2 mt-1"></i>
                  </div>
              </label>
          </Member>

          </div>
        </OptionWrapper>
      </Modal.Body>
      <Modal.Footer className="text-center">
        <ApplyBtn className="btn apply_btn mx-auto h-100 w-100">Apply</ApplyBtn>
      </Modal.Footer>
    </Modal>
  );
};

const EditMemberFilter = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <span className="plans_for plans_for_editable d-flex align-items-center" onClick={() => setShowModal(true)} >
            <div className="yellow_start_line"></div>Plans For
            <PencilWrapper className="d-flex justify-content-center align-items-center">
              <PencilIcon
                style={{
                  color: "#0a87ff",
                }}
                width="14px"
              />
            </PencilWrapper>
          </span>

          <FilterModal
              show={showModal}
              handleClose={() => setShowModal(false)}
          />
    </>
  );
};

export default EditMemberFilter;

const PencilWrapper = styled.div`
  background-color: white;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin: 0px 5px;
`;

const Member = styled.div`

padding: 5px;
label{
    cursor: pointer;
    display: flex;
    border-radius: 5px;
  border: solid 1px #b0bed0;
  background-color: #fff;
  padding: 10px;
  justify-content: space-between;
}
.age_select{
    border-radius: 26px;
  background-color: #f3f5f8;
  padding: 5px 15px;
  font-size: 14px;
  color:#6b7789;
}
.custom_checkbox{
    margin-right: 20px;
}
`;