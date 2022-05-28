import { Modal } from "react-bootstrap";
import styled from "styled-components";
import "styled-components/macro";

function ViewPlanDetailModal({ title, show, content, handleClose }) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
        style={{
          zIndex: "2000",
          borderRadius: "12px",
          border: "none",
        }}
        css={`
          .modal-dialog {
            min-width: 50%;
          }
          .modal-body {
            border-radius: 20px;
          }
        `}
      >
        <Modal.Header
          style={{
            borderBottomColor: !title && "#fff",
            padding: !title && "28px",
            borderTopLeftRadius: "14px",
            borderToprightRadius: "14px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
          }}
        >
          {title && <ModalTitle className="modal-headerz">{title}</ModalTitle>}
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
      </Modal>
    </>
  );
}

export default ViewPlanDetailModal;

const ModalTitle = styled.h5`
  // font-family: "PFEncoreSansProblck";
  margin: 0 17px;
  margin-bottom: 0;
  line-height: 1.5;
  color: #000;
  font-size: 25px;
  font-weight: 900;
  width: 80%;
  @media (max-width: 767px) {
    font-size: 16px;
    line-height: 1.3;
  }
  &:after {
    content: "";
    height: 37px;
    width: 7px;
    position: absolute;
    left: 0px;
    top: 13px;
    background-color: #2cd44a;
    border-radius: 50px;
  }
`;
