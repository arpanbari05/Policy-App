import { FaTimes } from "react-icons/fa";
import styled from "styled-components/macro";

const BackdropDiv = styled.div`
  height: 100vh;
  width: 100%;
  z-index: 1050;
  position: fixed;
  top: 0%;
  left: 0%;
  opacity: 0.5;
  background-color: #000;
`;
const ModalContent = styled.div`
  min-height: 20vh;
  z-index: 1055;
  width: 440px;
  position: absolute;
  top: calc(100% + 7px);
  left: 0;
  background-color: white;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
`;
const ModalHeader = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
`;
const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: black;
  margin-bottom: 0;
  line-height: 1.5;
`;
const ModalBody = styled.div`
  position: relative;
  flex: 1 1 auto;
  padding: 0 1rem;
  overflow: auto;
  max-height: 472px;
  margin-bottom: 10px;
`;
const ModalFooter = styled.div`
  padding: 0px !important;
  border-top: none !important;
  text-align: center !important;
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem;
  height: 65px;
  border-top: 1px solid #dee2e6;
`;

const ToolTipContent = styled.p`
  font-size: 12px;
  margin-bottom: 0px;
  padding-right: 10px;
`;

const CustomModal1 = ({
  children,
  header,
  footerJSX,
  handleClose,
  leftAlignmnetMargin,
  customizedTopMargin,
  tooltipDesc,
  ...props
}) => {
  return (
    <div {...props}>
      <BackdropDiv onClick={handleClose} />
      <ModalContent
        leftAlignmnetMargin={leftAlignmnetMargin}
        customizedTopMargin={customizedTopMargin}
      >
        <ModalHeader>
          <div>
            <ModalTitle>
              <span>{header}</span>
            </ModalTitle>

            <ToolTipContent>{tooltipDesc}</ToolTipContent>
          </div>
          <button onClick={handleClose}>
            <FaTimes />
          </button>
        </ModalHeader>
        <ModalBody className="modal-body">{children}</ModalBody>
        <ModalFooter>{footerJSX}</ModalFooter>
      </ModalContent>
    </div>
  );
};
export default CustomModal1;
