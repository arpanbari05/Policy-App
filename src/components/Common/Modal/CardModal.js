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
  noFooter,

  showButton = true,
  revised = false,
  CompareBtnOnTop = false,
  errorsFromCompare = false,
}) => {
  return (
    <Modal
      centered
      //fullscreen
      show={show}
      size="lg"
      onHide={handleClose}
      animation={false}
      //dialogClassName="modal-box"
      style={{
        zIndex: "2000",
        borderRadius: "12px",
        border: "none",
        marginBottom: revised ? "70px" : "0px",
        background: "rgba(0,0,0,0.5)",
        zIndex:"9999999"
      }}
      css={`
        @media (min-width: 767px) and (max-width: 990px) {
          .modal-dialog {
            max-width: 700px !important;
          }
        }
        @media (max-width: 767px) {
          .modal-dialog {
            max-width: 100% !important;
            margin: unset;
          }
          .modal-dialog > div {
            height: 100vh;
            position: fixed;
            top: 0%;
            left: 0%;
          }
        }
      `}
      className={`${customClass} noselect`}
    >
      <Modal.Header
        // closeButton
        style={{
          borderBottomColor: !title && "#fff",
          padding: !title && "28px",
          borderTopLeftRadius: "14px",
          borderToprightRadius: "14px",
          borderBottomRightRadius: "0px",
          position:"relative",
          borderBottomLeftRadius: "0px",
        }}
      >
        {title && <ModalTitle className="modal-headerz">{title}
        
        </ModalTitle>}

        {errorsFromCompare?(
          <span css={`
          position: absolute;
    bottom: 11px;
    left: 32px;
    border-radius: 10px;
    font-size: 14px;
    /* padding: 1px 10px; */
    /* background-color: #ffeeee; */
    color:  #bd2b2b;
          `}>{errorsFromCompare}</span>
        ):""}
        
        {showButton && CompareBtnOnTop && (
          <StyledButton
            customClass={`button${customClass}`}
            type="button"
            value={buttonValue}
            onClick={handleClick}
            noIcon={BtnArrow ? false : true}
            width={`180px`}
            styledCss={`margin-right: 15px !important; `}
          />
        )}
        <i
          onClick={handleClose}
          style={{ cursor: "pointer" }}
          class="fas fa-times"
        ></i>
      </Modal.Header>
      {/* <CloseButton
        type="button"
        className="btn btn-white recom_close_css "
        style={{ marginTop: "-8px", zIndex: 2500 }}
        onClick={handleClose}
      >
        <i className="fa fa-close"></i>
      </CloseButton> */}
      <Modal.Body
        style={{
          padding: "0.3rem !important",
        }}
      >
        {content}
      </Modal.Body>
      <Modal.Footer
        style={{
          display: noFooter && "none",
          borderTop: !showButton && "none",
          borderBottomColor: "#fff",
          borderTopLeftRadius: "0px",
          borderToprightRadius: "0px",
          borderBottomRightRadius: "14px",
          padding: "0px !important",
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
  position:relative;
  margin-bottom: 0;
  line-height: 1.5;
  color: #000;
  font-size: 20px;
  color: #304261;
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
