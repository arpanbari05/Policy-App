import styled from "styled-components/macro";
import { Modal } from "react-bootstrap";

const TalkToUsModalMobile = ({ showTalkModal, setShowTalkModal }) => {
  return (
    <>
      {" "}
      <Modal
        centered
        show={showTalkModal}
        onHide={() => setShowTalkModal(false)}
        animation={false}
        css={`
          z-index: 2000;
          & .modal-dialog {
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            margin: 0;
          }
        `}
      >
        <Modal.Header
          css={`
            color: #000;
            font-size: 20px;
            font-weight: bold;
          `}
        >
          {" "}
          <div>Talk to Us</div>{" "}
          <CloseButton
            type="button"
            className="btn btn-white recom_close_css "
            style={{ marginTop: "-8px", zIndex: 2500 }}
            onClick={() => setShowTalkModal(false)}
          >
            <i className="fa fa-close"></i>
          </CloseButton>
        </Modal.Header>
        <Modal.Body
          css={`
            position: relative;
          `}
        >
          <div
            css={`
              color: #4a5c68;
              font-size: 15px;
            `}
          >
            Get a call back
          </div>
          <input
            type="tel"
            name="talktousMobile"
            css={`
              width: 100%;
              border-radius: 3px;
              border: solid 1px #d2d4e0;
              background-color: #ffffff;
              height: 46px;
              margin: 7px 0 0;
              padding: 0 53px;
            `}
          />{" "}
          <button
            css={`
              position: absolute;
              top: 50px;
              right: 23px;
              background: #c7222a;
              color: white;
              width: 25%;
              cursor: pointer;
              padding: 4px 9px;
              display: block;
              border-radius: 2px;
              font-size: 15px;
              font-weight: 400;
              line-height: 28px;
              height: 34px;
              z-index: 9999;
            `}
          >
            Call me
          </button>
          <div
            css={`
              position: absolute;
              top: 54px;
              left: 26px;
              
            `}
          >
            +91
          </div>
        </Modal.Body>
        <Modal.Footer
          css={`
            flex-direction: column;
            background-color: #f1f3f6;
          `}
        >
          <div
            css={`
              color: #4a5c68;
              font-size: 14px;
            `}
          >
            Super urgent? Call us on our Toll Free number
          </div>{" "}
          <div
            css={`
              font-size: 19px;
              font-weight: bold;
            `}
          >
            1235 9999 04921
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TalkToUsModalMobile;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;
`;
