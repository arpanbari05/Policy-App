import React from "react";
import { Modal, Container } from "react-bootstrap";
import styled from "styled-components";
import StyledButtonM from "../Button/StyledButtonM";

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
}) => {
  return (
    <MobileModal
      centered
      show={show}
      onHide={handleClose}
      animation={false}
      style={{
        zIndex: "2000",
        border: "none",
      }}
      className={`${customClass} showOnMobile hideOnDesktop `}
      onHide={handleClose}
    >
      <Modal.Header
        closeButton
        style={{
          borderBottomColor: !title && "#fff",
          padding: !title && "0px",
          borderTopLeftRadius: "14px",
          borderToprightRadius: "14px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        {title && <ModalTitle>{title}</ModalTitle>}
      </Modal.Header>

      <Modal.Body>
        {content}
      </Modal.Body>

      {/* compare btn */}
      {showButton && (
        <StyledButtonM
          type="button"
          value={buttonValue}
          onClick={handleClick}
          noIcon={BtnArrow ? false : true}
        />
      )}
    </MobileModal>
  );
};

export default CardModal;


const MobileModal = styled(Modal)`
  width: 100%;

 height: 100%;

  z-index: 1040;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);

  @media(min-width: 767px){
    width:80%;
    height:80%;
    padding:0px 20px;
    position:absolute;
    left:10%;
    &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
    top:10%;
    overflow-y: hidden;
    border-radius:20px;
  }
`;

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

  color: #000;
  font-size: 15px;
  font-weight: 900;
  width: 80%;
  &:after {
    content: "";
    height: 25px;
    width: 7px;
    position: absolute;
    left: 0px;
    top: 13px;
    background-color: #fecc28;
    border-radius: 50px;
  }
`;
