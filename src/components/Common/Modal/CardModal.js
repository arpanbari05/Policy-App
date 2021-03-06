import React from "react";
import { Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
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
  usedAsReviewCartPopup = false,
  showButton = true,
  revised = false,
  CompareBtnOnTop = false,
  errorsFromCompare = false,
}) => {
  return (
    <Modal
      centered
      show={show}
      size="lg"
      onHide={handleClose}
      animation={false}
      style={{
        border: "none",
        marginBottom: revised ? "70px" : "0px",
        background: "rgba(0,0,0,0.5)",
        zIndex: "9999999",
      }}
      css={`
        @media (min-width: 767px) and (max-width: 990px) {
          .modal-dialog {
            max-width: 700px !important;
          }
        }
        @media (max-width: 767px) {
          .modal {
          }
          .modal-dialog {
            max-width: 100% !important;
            margin: unset;
            overflow-x: hidden;
            overflow-y: auto;
          }
          .modal-dialog > div {
            height: fit-content;
            position: fixed;
            max-width: 90% !important;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
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
          position: "relative",
          borderBottomLeftRadius: "0px",
          background: usedAsReviewCartPopup && "rgb(245, 247, 249)",
        }}
        css={`
          @media (max-width: 400px) {
            padding: 0.5rem;
          }
        `}
      >
        {title && (
          <ModalTitle
            className="modal-headerz"
            usedAsReviewCartPopup={usedAsReviewCartPopup}
          >
            {title}
          </ModalTitle>
        )}

        {errorsFromCompare ? (
          <span
            css={`
              position: absolute;
              bottom: 11px;
              left: 32px;
              border-radius: 10px;
              font-size: 14px;
              /* padding: 1px 10px; */
              /* background-color: #ffeeee; */
              color: #bd2b2b;
            `}
          >
            {errorsFromCompare}
          </span>
        ) : (
          ""
        )}

        {showButton && CompareBtnOnTop && (
          <StyledButton
            customClass={`button${customClass}`}
            type="button"
            value={buttonValue}
            onClick={handleClick}
            noIcon={BtnArrow ? false : true}
            width={`180px`}
            styledCss={`margin-right: 15px !important; height: 58px;`}
          />
        )}
        <FaTimes
          onClick={handleClose}
          style={{ cursor: "pointer", fontWeight: "bold" }}
        ></FaTimes>
      </Modal.Header>
      {/* <CloseButton
        type="button"
        className="btn btn-white recom_close_css "
        style={{ marginTop: "-8px", zIndex: 2500 }}
        onClick={handleClose}
      >
        <i className="fa fa-close"></i>
      </CloseButton> */}
      <Modal.Body>{content}</Modal.Body>
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

const ModalTitle = styled.h5`
  // font-family: "PFEncoreSansProblck";
  margin: 0 17px;
  position: relative;
  margin-bottom: 0;
  line-height: 1.5;
  color: #000;
  color: #304261;
  font-weight: 900;
  width: 80%;
  font-size: ${({ usedAsReviewCartPopup }) =>
    usedAsReviewCartPopup ? "18px" : "20px"};
  padding: ${({ usedAsReviewCartPopup }) => usedAsReviewCartPopup && "1rem"};
  @media (max-width: 767px) {
    font-size: 15px;
    line-height: 1.3;
    margin: 0 0px;
  }
  @media (max-width: 400px) {
    font-size: 13px;
  }
`;
