import { Modal } from "react-bootstrap";
import "styled-components/macro";
import EmailIcon from "../assets/images/svg-icons/EmailIcon";
import WhtsappIcon from "../assets/images/svg-icons/WhtsappIcon";
import SmsIcon from "../assets/images/svg-icons/SmsIcon";
import styled from "styled-components";

const ShareQuoteModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      css={`
        .modal-dialog {
          max-width: 650px !important;
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
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#f5f7f9",
        }}
      >
        <Modal.Title
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "black",
          }}
        >
          Hi, please choose the way you wish to share the quotes.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <ShareOption className="d-flex align-items-center justify-content-between p-3 mb-3">
            <div className="d-flex align-items-center">
              <div className="icon_wrapper">
                <EmailIcon width="21" />
              </div>
              <input type="text" placeholder="Email" />
            </div>

            <button className="btn share_btn px-5">Share</button>
          </ShareOption>

          <ShareOption className="d-flex mb-3 align-items-center justify-content-between p-3">
            <div className="d-flex align-items-center">
              <div className="icon_wrapper">
                <WhtsappIcon width="21" />
              </div>
              <input type="text" placeholder="Mobile no." />
            </div>

            <button className="btn share_btn px-5">Share</button>
          </ShareOption>

          <ShareOption className="d-flex mb-3 align-items-center justify-content-between p-3">
            <div className="d-flex align-items-center">
              <div className="icon_wrapper">
                <SmsIcon width="21" />
              </div>
              <input type="text" placeholder="Mobile no." />
            </div>

            <button className="btn share_btn px-5">Share</button>
          </ShareOption>

          <InfoMessage className="p-3 text-center">
              * Please note that the premium may vary in future.
          </InfoMessage>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShareQuoteModal;

const ShareOption = styled.div`
 border-radius: 10px;
  border: solid 1px #d5dce5;
  input{
      border: none;
      margin-left: 15px;
      font-weight: 600;
      :focus{
          outline: none;
      }
      ::placeholder {
  color: #b0b0b0;
}
  }
  .share_btn{
    border-radius: 6px;
  border: solid 2px #52aaff;
  color: #52aaff;
  font-weight: 600;
  font-size: 14px;
  }
  .icon_wrapper{
      width:42px;
      display: flex;
      justify-content: center;
      align-items: center;
      height:42px;
      border-radius: 100%;
      background-color: #e6f3ff;
      color: #52aaff;
  }
`;

const InfoMessage = styled.div`
background-color: #f1f3f8;
font-weight: 600;
color:#778291;
font-size: 13px;
`;