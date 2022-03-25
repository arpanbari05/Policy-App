import React from "react";
import { Modal } from "react-bootstrap";
import LocationForm from "../pages/InputPage/components/LocationForm";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

function EditPincode({ show, onClose }) {
  return (
    <Modal show={show} onClose={onClose}>
      <CloseButton onClick={onClose}>
        <FaTimes />
      </CloseButton>
      <LocationForm close={onClose} edit={true} />
    </Modal>
  );
}

export default EditPincode;

const CloseButton = styled.button`
  position: absolute;
  top: 1em;
  right: 1.5em;
  width: max-content;
  cursor: pointer;
`;
