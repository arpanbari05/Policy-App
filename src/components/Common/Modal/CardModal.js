import React from "react";
import { Modal, Container } from "react-bootstrap";
import styled from "styled-components";
import "styled-components/macro";
import StyledButton from "../../StyledButton";

const CardModal = ({
  title,
  show,
  customClass,
  content,
  buttonValue,
  handleClick,
  handleClose,
  BtnArrow,
  showButton = true,
  revised = false,
}) => {
  return (
    <Modal
      centered
      show={show}
      size="lg"
      onHide={handleClose}
      animation={false}
      style={{
        zIndex: "2000",
        borderRadius: "12px",
        border: "none",
        marginBottom: revised ? "70px" : "0px",
      }}
      // css={`
      // @media(max-width: 767px){
      //  margin-left:0px;
      //  margin-right:0px;
      // }
      // `}
      className={`${customClass}`}
    >
      <Modal.Header
        style={{
          borderBottomColor: !title && "#fff",
          padding: !title && "28px",
          borderTopLeftRadius: "14px",
          borderToprightRadius: "14px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
          backgroundColor: "#ebf5ff",
        }}
      >
        {title && <ModalTitle className="modal-headerz">{title}</ModalTitle>}
      </Modal.Header>
      <CloseButton
        type="button"
        className="btn btn-white recom_close_css "
        style={{ marginTop: "-8px", zIndex: 2500 }}
        onClick={handleClose}
      >
        <i className="fa fa-close"></i>
      </CloseButton>
      <Modal.Body>
        <Container>{content}</Container>
      </Modal.Body>
      <Modal.Footer
        style={{
          borderTop: !showButton && "none",
          borderBottomColor: "#fff",
          borderTopLeftRadius: "0px",
          borderToprightRadius: "0px",
          borderBottomRightRadius: "14px",
          borderBottomLeftRadius: "14px",
        }}
      >
        {showButton && (
          <StyledButton
            customClass={`button${customClass}`}
            type="button"
            value={buttonValue}
            onClick={handleClick}
            noIcon={BtnArrow ? false : true}
            width={`200px`}
          />
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CardModal;

const ModalSpan = styled.span`
  & .card-modal {
    width: 1000px;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;
`;
const ModalTitle = styled.h5`
  // font-family: "PFEncoreSansProblck";
  margin: 0 17px;
  margin-bottom: 0;
  line-height: 1.5;
  color: #000;
  font-size: 20px;
  color:#304261;
  font-weight: 900;
  width: 80%;
  @media (max-width: 767px) {
    font-size: 16px;
    line-height: 1.3;
  }
  /* &:after {
    content: "";
    height: 37px;
    width: 7px;
    position: absolute;
    left: 0px;
    top: 13px;
    background-color: #fecc28;
    border-radius: 50px;
  } */
`;
