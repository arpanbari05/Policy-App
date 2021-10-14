import styled from "styled-components/macro"; // macro makes the dom class name readable.

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
  background-color: white;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  margin-top: 70px;
  margin-left: ${(props) =>
    props.leftAlignmnetMargin ? `${props.leftAlignmnetMargin}px` : "-7px"};
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
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
`;
const CustomModal1 = ({
  children,
  header,
  footerJSX,
  handleClose,
  leftAlignmnetMargin,
}) => {
  return (
    <>
      <BackdropDiv onClick={handleClose} />
      <ModalContent leftAlignmnetMargin={leftAlignmnetMargin}>
        <ModalHeader>
          <ModalTitle>{header}</ModalTitle>
          <button
            type="button"
            class="btn-close"
            onClick={handleClose}
            aria-label="Close"
          ></button>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{footerJSX}</ModalFooter>
      </ModalContent>
    </>
  );
};
export default CustomModal1;
