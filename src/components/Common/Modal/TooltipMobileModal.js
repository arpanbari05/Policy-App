import React from "react";
import { Modal, Container } from "react-bootstrap";
import styled from "styled-components";
import StyledButtonM from "../Button/StyledButtonM";

const ToolTipMobileModal = ({
  title,
  show,
  content,
  handleClose
}) => {
  return (
    <MobileModal
      centered
      show={show}

      animation={false}
      style={{
        zIndex: "2000",
        border: "none",
      }}
      className={`showOnMobile hideOnDesktop`}
      onHide={handleClose}
    >
      <ModalTitle>{title}</ModalTitle>
      <ModalContent>{content}</ModalContent>
    </MobileModal>
  );
};

export default ToolTipMobileModal;

const ModalContent = styled.p`
line-height: 1.33;
text-align: center;
  color: #3e593c;
  font-size: 12px;
  margin-top:20px;
  height:auto;
`;

const MobileModal = styled(Modal)`
  width: 90%;
  margin: 10vh auto 0px auto;
  height:fit-content;
     overflow:auto;
  z-index: 1040;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  font-family: "PFHandbookPro";
  border-radius: 10px;
`;

const ModalTitle = styled.h5`
  font-size: 13px;
  font-weight: bold;
  color:  #3e593c;
  font-size: 18px;
  font-weight: 900;
  text-align:center;
  width: fit-content;
  margin:auto;
  border-bottom:dotted 2px #3e593c; 
`;
