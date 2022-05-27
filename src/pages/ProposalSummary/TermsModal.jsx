import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import "styled-components/macro";
import { getTermConditions } from "../ProposalPage/serviceApi";
import { useCart } from "../../customHooks/index";

const TermModal = ({
  title,
  show,
  customClass,

  handleClose,
  noFooter,
  showButton = true,
  revised = false,
}) => {
  const [term, setTerm] = useState("");
  const getTermConditionData = async (company_id, callback = () => {}) => {
    try {
      const { data } = await getTermConditions(company_id);

      callback(data.company_terms_and_conditions);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  const { cartEntries } = useCart();
  const cart = cartEntries;
  const prod_id = Object.keys(cart)[0];

  useEffect(() => {
    if (cart[prod_id].product && cart[prod_id].product.company.id) {
      getTermConditionData(cart[prod_id].product.company.id, setTerm);
    }
  }, []);

  return (
    <Modal
      centered
      show={show}
      size="lg"
      onHide={handleClose}
      animation={false}
      style={{
        zIndex: "99999",
        borderRadius: "12px",
        border: "none",
        marginBottom: revised ? "70px" : "0px",
        background: "rgba(0,0,0,0.5)",
      }}
      css={`
        .modal-content {
          position: fixed;
          top: 50px;
          left: 35px;
          width: 95%;

          @media (max-width: 767px) {
            left: 10px;
            top: unset !important;
            height: 95% !important;
          }
        }
        .modal-lg {
          max-width: 85% !important;
          height: auto !important;
        }
        @media (min-width: 767px) and (max-width: 990px) {
          .modal-dialog {
            max-width: 700px !important;
          }
        }
        @media (max-width: 767px) {
          .modal-dialog {
            max-width: 100% !important;
          }
          .modal-dialog > div {
            height: 100vh;
            position: fixed;
            top: 0%;
          }
        }
      `}
      className={`${customClass} noselect`}
    >
      <Modal.Header
        style={{
          borderBottomColor: !title && "000",
          padding: !title && "28px",
          paddingLeft: "unset",
          borderTopLeftRadius: "14px",
          borderToprightRadius: "14px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        <ModalTitle className="modal-headerz">Terms and Conditions</ModalTitle>
        <i
          onClick={handleClose}
          style={{ cursor: "pointer" }}
          className="fas fa-times"
        ></i>
      </Modal.Header>

      <CloseButton
        type="button"
        className="btn btn-white recom_close_css "
        style={{ marginTop: "-8px", zIndex: 2500 }}
        onClick={handleClose}
      />

      <Modal.Body
        css={`
          overflow: scroll;
        `}
      >
        {term ? (
          <Paragraph
            css={`
              color: #253858;
            `}
            dangerouslySetInnerHTML={{ __html: term }}
          ></Paragraph>
        ) : (
          <span>Loading...</span>
        )}
      </Modal.Body>
      <Modal.Footer
        style={{
          display: noFooter && "none",
          borderTop: !showButton && "none",
          borderBottomColor: "#fff",
          borderTopLeftRadius: "0px",
          borderToprightRadius: "0px",
          borderBottomRightRadius: "14px",
          borderBottomLeftRadius: "14px",
        }}
      ></Modal.Footer>
    </Modal>
  );
};

export default TermModal;

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
  color: #304261;
  font-weight: 900;
  width: 80%;
  @media (max-width: 767px) {
    font-size: 16px;
    line-height: 1.3;
  }
`;

const Paragraph = styled.div`
  height: 60vh;
  overflow: auto;
  & li {
    font-size: 15px;
    color: black;
    margin-bottom: 20px;
    & ::marker {
      display: none !important;
    }
  }
`;
