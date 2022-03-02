import { Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import * as mq from "../../../utils/mediaQueries";

export function AddMembersModal({ onClose, children, ...props }) {
  const handleHide = () => {
    onClose && onClose();
  };

  return (
    <Modal
      onHide={handleHide}
      show
      animation={false}
      css={`
        .modal-dialog {
          max-width: 870px;
          ${mq.mobile} {
            width: 100vw;
            margin: 0;
          }
        }
        .modal-content {
          ${mq.mobile} {
            width: 100vw;
            border-radius: 0;
          }
        }
      `}
      {...props}
    >
      <Modal.Header
        className="w-100"
        css={`
          background-color: #f5f7f9;
          ${mq.mobile} {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99;
          }
        `}
      >
        <Modal.Title
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "black",
          }}
        >
          Edit Members
        </Modal.Title>
        <button onClick={handleHide}>
          <FaTimes />
        </button>
      </Modal.Header>
      <Modal.Body
        className="p-0"
        css={`
          ${mq.mobile} {
            margin-top: 3.91em;
          }
        `}
      >
        {children}
      </Modal.Body>
    </Modal>
  );
}
