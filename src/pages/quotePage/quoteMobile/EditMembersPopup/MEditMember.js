import { v4 as uuidv4 } from "uuid";
import { Col, Container, Modal, Row } from "react-bootstrap";
import styled from "styled-components/macro";
import { dataSet, getAge } from "./Data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateUserMembersDetails } from "../../quote.slice";
import { useHistory } from "react-router";
// import {
//   age,
//   modalFamilyMember,
// } from "../../../GreetingFormCard/fieldsets/data/Fieldset3Data/Data";

// import GreetingFormDropdown from "../../Dropdown/GreetingForm/GreetingFormDropdown";
// import SolidBuyButton from "../Button/SolidBuyButton";

const MEditMember = ({ handleClose }) => {
  const { error, proposerDetails } = useSelector((state) => state.greetingPage);
  const { frontendData } = useSelector((state) => state.frontendBoot);
  const { data } = frontendData || [""];
  const { members } = data || [""];
  const [ageError, setAgeError] = useState([]);
  const [childCount, setChildCount] = useState(0);
  const [membersArray, setMembersArray] = useState([]);
  const [errors, setErrors] = useState(false);

  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade,SecondaryShade } = theme;

  const dispatch = useDispatch();

  useEffect(() => {
    if (members?.length > 0) {
      setMembersArray([...members]);
    }
  }, [members]);

  useEffect(() => {
    const tempArray = [];
  }, [membersArray]);

  // Will contain list of insurer names that are checked
  const [insurerCBXArray, setInsurerCBXArray] = useState(
    proposerDetails.members.map(
      (m, index) => {
        if (
          index > 0 &&
          proposerDetails.members[index - 1].type.includes("son") &&
          m.type.includes("son")
        )
          return m.type + index;
        else if (
          index > 0 &&
          proposerDetails.members[index - 1].type.includes("daughter") &&
          m.type.includes("daughter")
        )
          return m.type + index;
        else return m.type;
      }
      // capitalize(m.type)
      //   .replaceAll("_", "-")
      //   .replace("Grand-mother", "Grand Mother")
      //   .replace("Grand-father", "Grand Father"),
    )
  );

  // Will contain list of insurer Dropdown values if checkbox is checked
  const [insurerDDArray, setInsurerDDArray] = useState(
    proposerDetails.members.map((m, index) => {
      if (
        index > 0 &&
        proposerDetails.members[index - 1].type.includes("son") &&
        m.type.includes("son")
      )
        return { insurer: m.type + index, value: m.age + " Years" };
      else if (
        index > 0 &&
        proposerDetails.members[index - 1].type.includes("daughter") &&
        m.type.includes("daughter")
      )
        return { insurer: m.type + index, value: m.age + " Years" };
      else return { insurer: m.type, value: m.age + " Years" };
    })
  );

  // To find additional Sons And Daughters
  useEffect(() => {
    if (members?.length) {
      let sons = [];
      let daughters = [];
      insurerCBXArray.forEach((item) => {
        if (item !== "son" && item.includes("son")) {
          sons = [
            ...sons,
            {
              code: item,
              display_name: "Son",
              min_age: "1",
              max_age: "25",
              ["is_primary"]: true,
              ["hasClose"]: true,
            },
          ];
        }
        if (item !== "daughter" && item.includes("daughter")) {
          daughters = [
            ...daughters,
            {
              code: item,
              display_name: "Daughter",
              min_age: "1",
              max_age: "25",
              ["is_primary"]: true,
              ["hasClose"]: true,
            },
          ];
        }
      });
      let tempArray = [...members];

      const index = tempArray.findIndex((x) => x.display_name === "Son");
      tempArray.splice(index + 1, 0, ...sons);
      const index2 = tempArray.findIndex((x) => x.display_name === "Daughter");
      tempArray.splice(index2 + 1, 0, ...daughters);

      setMembersArray(tempArray);
    }
  }, [members]);

  useEffect(() => {
    let count = 0;
    insurerCBXArray.forEach((element) => {
      if (element.slice(0, 8) === "daughter" || element.slice(0, 3) === "son") {
        count += 1;
      }
    });

    setChildCount(count);
  }, [insurerCBXArray]);
  useEffect(() => {
    proposerDetails.members.forEach((item) => {});
  }, []);
  const addChild = (name) => {
    const code = name.toLowerCase();
    if (childCount < 4) {
      const { max_age, min_age } = membersArray.filter(
        (item) => item.code === code
      )[0];
      setChildCount(childCount + 1);
      const genCode = `${code + uuidv4()}`;
      const tempArray = [
        ...membersArray,
        // {
        //   [`code`]: genCode,
        //   [`display_name`]: name,
        //   [`min_age`]: `${min_age}`,
        //   [`max_age`]: `${max_age}`,
        //   ["is_primary"]: true,
        //   ["hasClose"]: true,
        // },
      ];
      const index = tempArray.findIndex((x) => x.display_name === name);
      tempArray.splice(index + 1, 0, {
        [`code`]: genCode,
        [`display_name`]: name,
        [`min_age`]: `${min_age}`,
        [`max_age`]: `${max_age}`,
        ["is_primary"]: true,
        ["hasClose"]: true,
      });
      handleinsurerCBXArray(genCode);

      setMembersArray(tempArray);
    }
  };

  const handleinsurerCBXArray = (insurer) => {
    const tempArray = [...insurerCBXArray];

    if (!tempArray.includes(insurer)) {
      tempArray.push(insurer);
    } else {
      const index = tempArray.indexOf(insurer);

      if (index > -1) {
        tempArray.splice(index, 1);
        handleinsurerDDArray(insurer, "Select Age");
      }
    }
    setInsurerCBXArray(tempArray);
  };

  const handleinsurerDDArray = (insurer, value) => {
    const tempArray = [...insurerDDArray];
    var index = tempArray.map((o) => o.insurer).indexOf(insurer);
    if (value !== "Select Age") {
      if (index > -1) {
        tempArray[index].value = value;
        if (!insurerCBXArray.includes(insurer)) {
          handleinsurerCBXArray(insurer);
        }
      } else {
        tempArray.push({ insurer: `${insurer}`, value: `${value}` });
        if (!insurerCBXArray.includes(insurer)) {
          handleinsurerCBXArray(insurer);
        }
      }
    } else if (index > -1) {
      tempArray.splice(index, 1);
    }
    if (tempArray.length > 0) {
      setErrors(false);
    } else {
      setErrors(true);
    }
    setInsurerDDArray(tempArray);
  };

  const handleInput = (insurer, value, type) => {
    if (type === "checkbox") {
      if (
        (insurer.slice(0, 3) === "son" && insurer !== "son") ||
        (insurer.slice(0, 8) === "daughter" && insurer !== "daughter")
      ) {
        const tempArray = [...membersArray];
        var index = tempArray.map((o) => o.code).indexOf(insurer);
        if (index > -1) {
          tempArray.splice(index, 1);
          setMembersArray(tempArray);
        }
      }
      if (
        (insurer.slice(0, 3) === "son" || insurer.slice(0, 8) === "daughter") &&
        insurerCBXArray.includes(insurer)
      ) {
        if (insurer === "son") {
          const tempArray = membersArray.filter((element) => {
            return (
              element.display_name !== "Son" ||
              (element.display_name === "Son" && element.code === "son")
            );
          });
          setMembersArray(tempArray);
        } else if (insurer === "daughter") {
          const tempArray = membersArray.filter(
            (element) =>
              element.display_name !== "Daughter" ||
              (element.display_name === "Daughter" &&
                element.code === "daughter")
          );
          setMembersArray(tempArray);
        }
      }
      handleinsurerCBXArray(insurer, value);
    } else if (type === "dropdown") {
      handleinsurerDDArray(insurer, value);
    }
  };

  const history = useHistory();

  const handleUpdate = (e,handleClose) => {
    e.preventDefault();

    const ageErrorArray = [];
    insurerCBXArray.forEach((data) => {
      const hasAge = insurerDDArray.some((item) => item.insurer === data);
      if (!hasAge) {
        ageErrorArray.push(data);
      }
    });

    if (insurerDDArray.length < 1) {
      setErrors("Select at least One Insured");
    } else if (ageErrorArray.length > 0) {
      setErrors("Select age for Insured");
      setAgeError(ageErrorArray);
    } else {
      setErrors(false);
    }
    if (ageErrorArray.length < 1 && !errors && insurerDDArray.length > 0) {
      const dataArray = [];
      insurerDDArray.forEach((data) => {
        const i = membersArray.findIndex((x) => x.code === data.insurer);
        dataArray.push({
          type: `${membersArray[i].code}`,
          age: `${data.value.split(" ")[0]}`,
        });
      });
      dispatch(
        updateUserMembersDetails(
          { ...proposerDetails, members: dataArray },
          history,handleClose
        )
      );
    }
  };

  return (
    <Modal
      centered
      show={true}
      onHide={handleClose}
      animation={false}
      style={{ zIndex: "2000", borderRadius: "12px", border: "none" }}
      className={"greetings-form__modal"}
      css={`
        .modal-dialog {
          height: 100%;
          margin: unset;
          @media (min-width: 990px) {
            max-width: 850px;
          }
        }
        .modal-body {
          margin-top: 1px;
          overflow-x: hidden;
          left: unset;
          width: unset !important;
        }
        .modal-content {
          border-radius: 0 !important;
          height: 100%;
        }
      `}
    >
      <Modal.Header
        style={{
          backgroundColor: PrimaryColor,
          borderBottomColor: "#fff",
          // borderTopLeftRadius: "14px",
          // borderToprightRadius: "14px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        <ModalTitle
          css={`
            color: #fff;
            &:after {
              display: none;
            }
          `}
        >
          Edit Members
        </ModalTitle>
      </Modal.Header>
      <CloseButton
        type="button"
        css={`
          display: block !important;
          border: 1px solid rgba(0, 0, 0, 0.05) !important;
          color: #000;
          font-size: 18px;
          background-color: #fff;
          border-radius: 50px;
          padding: 2px 10px;
          position: absolute;
          top: 20px;
          right: 20px;
        `}
        className="btn btn-white recom_close_css"
        style={{ marginTop: "-8px" }}
        onClick={handleClose}
      >
        {/* <i className="fa fa-close"></i>{"x"} */}
        <i
          onClick={handleClose}
          style={{ cursor: "pointer" }}
          class="fas fa-times"
        ></i>
      </CloseButton>
      <Modal.Body
        css={`
          padding: 15px 0px;
        `}
      >
        <Container>
          <Row>
            {membersArray &&
              membersArray.map(
                ({
                  display_name,
                  min_age,
                  max_age,
                  is_primary,
                  is_primary_modal,
                  hasClose,
                  code,
                }) => {
                  const age = getAge(min_age, max_age);

                  return dataSet(
                    display_name,
                    age,
                    insurerCBXArray,
                    insurerDDArray,
                    handleInput,
                    hasClose,
                    code,
                    ageError,
                    childCount,
                    addChild
                  );
                }
              )}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer
        style={{
          borderBottomColor: "#fff",
          borderTopLeftRadius: "0px",
          borderToprightRadius: "0px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
        css={`
          display: flex;
          flex-direction: column;
        `}
      >
        {" "}
        {errors && (
          <ErrorMessage2 style={{ fontSize: "15px" }}>{errors}</ErrorMessage2>
        )}
        {error &&
          error.map((msg) => (
            <ErrorMessage2 style={{ fontSize: "15px" }}>{msg}</ErrorMessage2>
          ))}
        <button
          css={`
            width: 100%;
            line-height: 32px;
            // border-radius: 2px;
            padding: 12px 21px;
            text-align: center;
            color: #fff;
            border: none;
            text-transform: capitalize;
            box-shadow: 0px 13px 27px 0px rgb(163 48 53 / 25%);
            font-size: 18px;
            background: ${PrimaryColor};

            margin: 10px !important;
            margin-left: unset !important;
          `}
          type="button"
          value={"Confirm"}
          onClick={(e)=>handleUpdate(e,handleClose)}
        >
          Apply
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default MEditMember;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const ModalTitle = styled.h5`
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
    background-color: #2cd44a;
    border-radius: 50px;
  }
`;
const ErrorMessage2 = styled.p`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #c7222a;
`;
