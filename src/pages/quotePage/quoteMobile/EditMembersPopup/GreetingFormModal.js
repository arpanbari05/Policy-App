import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import styled from "styled-components/macro";
import { dataSet, getAge } from "./Data";
// import {
//   age,
//   modalFamilyMember,
// } from "../../../GreetingFormCard/fieldsets/data/Fieldset3Data/Data";
import StyledButton from "../../../GreetingPage/components/Button/StyledButton";
import Form3CheckBox from "./CheckBox";
// import GreetingFormDropdown from "../../Dropdown/GreetingForm/GreetingFormDropdown";
import "../../../GreetingPage/components/Modals/GreetingsForm/GreetingFormModal.scss";

const GreetingFormModal = ({
  modalTitle,
  show,
  setShow,
  membersArray,
  handleInput,
  setMembersArray,
  insurerCBXArray,
  insurerDDArray,
  editPopup,
}) => {
  const handleClose = () => setShow(false);

  const modalDataset = () => {
 
    return (
      <>
        {membersArray &&
          membersArray.map(({ display_name, min_age, max_age, is_primary }) => {
            const age = getAge(min_age, max_age);
            return (
              !is_primary &&
              dataSet(
                display_name,
                age,
                insurerCBXArray,
                insurerDDArray,
                handleInput,
              )
            );
          })}
      </>
    );

    //   return modalFamilyMember.map((data, i) => (
    //     <Col md={6} key={i}>
    //       {" "}
    //       <Row>
    //         <Col md={6}>
    //           <Form3CheckBox
    //             title={data}
    //             type={"checkbox"}
    //             handleChange={handleInput}
    //             defaultChecked={insurerCBXArray.includes(data) && true}
    //           />
    //         </Col>
    //         <Col md={5}>
    //           <GreetingFormDropdown
    //             title={data}
    //             list={age}
    //             type={"dropdown"}
    //             handleChange={handleInput}
    //             selected={
    //               insurerDDArray[
    //                 insurerDDArray.map((o) => o.insurer).indexOf(data)
    //               ]?.value || "Select Age"
    //             }
    //             disabled={!insurerCBXArray.includes(data) && true}
    //           />
    //         </Col>
    //       </Row>
    //     </Col>
    //   ));
  };

  const initRef = useRef(0);

  useEffect(() => {
    if (initRef.current === 1) {
      const tempArray = membersArray.map(data => {
        if (!data.is_primary && insurerCBXArray.includes(data.display_name)) {
          return {
            [`code`]: data.code,
            [`display_name`]: data.display_name,
            [`min_age`]: data.min_age,
            [`max_age`]: data.max_age,
            ["is_primary"]: true,
          };
        } else {
          return data;
        }
      });
      setMembersArray(tempArray);
    }
    initRef.current += 1;
  }, [membersArray]);

  const handleClick = () => {
    const tempArray = membersArray.map(data => {
      if (!data.is_primary && insurerCBXArray.includes(data.display_name)) {
        return {
          [`code`]: data.code,
          [`display_name`]: data.display_name,
          [`min_age`]: data.min_age,
          [`max_age`]: data.max_age,
          ["is_primary"]: true,
        };
      } else {
        return data;
      }
    });
    setMembersArray(tempArray);
    handleClose();
  };

  return (
    <Modal
      centered
      show={show}
      onHide={handleClose}
      animation={false}
      style={{ zIndex: "2000", borderRadius: "12px", border: "none" }}
      className={"greetings-form__modal"}
    >
      <Modal.Header
        style={{
          borderBottomColor: "#fff",
          borderTopLeftRadius: "14px",
          borderToprightRadius: "14px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        <ModalTitle>{modalTitle}</ModalTitle>
      </Modal.Header>
      <CloseButton
        type="button"
        className="btn btn-white recom_close_css"
        style={{ marginTop: "-8px" }}
        onClick={handleClose}
      >
        <i className="fa fa-close"></i>
      </CloseButton>
      <Modal.Body>
        <Container>
          <Row>{modalDataset()}</Row>
        </Container>
      </Modal.Body>
      <Modal.Footer
        style={{
          borderBottomColor: "#fff",
          borderTopLeftRadius: "0px",
          borderToprightRadius: "0px",
          borderBottomRightRadius: "14px",
          borderBottomLeftRadius: "14px",
        }}
      >
        {editPopup ? (
          <button
            css={`
              height: 46px;
              width: 170px;
              background-color: var(--abc-red);
              color: #fff;
              margin: 10px auto 30px;
              border-radius: 2px;
            `}
            onClick={handleClick}
            laptopLg
            mobileSm
          >
            Apply
          </button>
        ) : (
          <StyledButton
            type="button"
            value={"Confirm"}
            onClick={handleClick}
            noIcon={true}
          />
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default GreetingFormModal;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const ModalTitle = styled.h5`
  font-family: "PFEncoreSansProblck";
  margin: 0 17px;
  margin-bottom: 0;
  line-height: 1.5;
  color: #000;
  font-size: 22px;
  &:after {
    content: "";
    height: 9%;
    width: 7px;
    position: absolute;
    left: 0px;
    top: 13px;
    background-color: #fecc28;
    border-radius: 50px;
  }
`;
