import Modal from "../../../../components/Common/Modal";
import styled from "styled-components/macro";
import { Col, Container, Row } from "react-bootstrap";
import { dataSet, getAge } from "./Data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GreetingFormModal from "./GreetingFormModal";
import { ErrorMessage2 } from "../../../GreetingPage/GreetingFormCard/fieldsets/Fieldset5";
import { Label } from "../../../GreetingPage/components/FormComponents/FormComponents";
import { updateUserMembersDetails } from "../../quote.slice";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import addBtn from "../../../../assets/images/addred.png";
import addBtndisabled from "../../../../assets/images/addgrey.png";
import { small } from "../../../../utils/mediaQueries";
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

function EditMembersContent(params) {
  const { error, proposerDetails } = useSelector(state => state.greetingPage);
  const { frontendData } = useSelector(state => state.frontendBoot);
  const { data } = frontendData || [""];
  const { members } = data || [""];
  const [ageError, setAgeError] = useState([]);
  const [childCount, setChildCount] = useState(0);
  const [membersArray, setMembersArray] = useState([]);
  const [errors, setErrors] = useState(false);
  const [sonCount, setSonCount] = useState(2);
  const [daughterCount, setDaughterCount] = useState(2);
  const [showModal, setShow] = useState(false);

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
        if (index > 0 && proposerDetails.members[index].type.includes("son1")) {
          return "son";
        } else if (
          index > 0 &&
          proposerDetails.members[index - 1].type.includes("son") &&
          m.type.includes("son")
        )
          return "son" + index;

        if (
          index > 0 &&
          proposerDetails.members[index].type.includes("daughter1")
        ) {
          return "daughter";
        } else if (
          index > 0 &&
          proposerDetails.members[index - 1].type.includes("daughter") &&
          m.type.includes("daughter")
        )
          return "daughter" + index;
        else return m.type;
      },
      // capitalize(m.type)
      //   .split("_").join("-")
      //   .replace("Grand-mother", "Grand Mother")
      //   .replace("Grand-father", "Grand Father"),
    ),
  );

  // Will contain list of insurer Dropdown values if checkbox is checked
  const [insurerDDArray, setInsurerDDArray] = useState(
    proposerDetails.members.map((m, index) => {
      if (index > 0 && proposerDetails.members[index].type.includes("son1")) {
        return { insurer: "son", value: m.age + " Years" };
      }
      if (
        index > 0 &&
        proposerDetails.members[index - 1].type.includes("son") &&
        m.type.includes("son")
      )
        return { insurer: "son" + index, value: m.age + " Years" };

      if (
        index > 0 &&
        proposerDetails.members[index].type.includes("daughter1")
      ) {
        return { insurer: "daughter", value: m.age + " Years" };
      }
      if (
        index > 0 &&
        proposerDetails.members[index - 1].type.includes("daughter") &&
        m.type.includes("daughter")
      )
        return { insurer: "daughter" + index, value: m.age + " Years" };
      else return { insurer: m.type, value: m.age + " Years" };
    }),
  );

  // To find additional Sons And Daughters
  useEffect(() => {
    if (members?.length) {
      let sons = [];
      let daughters = [];
      insurerCBXArray.forEach(item => {
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

      const index = tempArray.findIndex(x => x.display_name === "Son");
      tempArray.splice(index + 1, 0, ...sons);
      const index2 = tempArray.findIndex(x => x.display_name === "Daughter");
      tempArray.splice(index2 + 1, 0, ...daughters);

      setMembersArray(tempArray);
    }
  }, [members]);

  useEffect(() => {
    let count = 0;
    insurerCBXArray.forEach(element => {
      if (element.slice(0, 8) === "daughter" || element.slice(0, 3) === "son") {
        count += 1;
      }
    });

    setChildCount(count);
  }, [insurerCBXArray]);

  const addChild = name => {
    const code = name.toLowerCase();
    if (childCount < 4) {
      const { max_age, min_age } = membersArray.filter(
        item => item.code === code,
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
      const index = tempArray.findIndex(x => x.display_name === name);
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

  const handleinsurerCBXArray = insurer => {
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
    var index = tempArray.map(o => o.insurer).indexOf(insurer);
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
        var index = tempArray.map(o => o.code).indexOf(insurer);
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
          const tempArray = membersArray.filter(element => {
            return (
              element.display_name !== "Son" ||
              (element.display_name === "Son" && element.code === "son")
            );
          });
          setMembersArray(tempArray);
        } else if (insurer === "daughter") {
          const tempArray = membersArray.filter(
            element =>
              element.display_name !== "Daughter" ||
              (element.display_name === "Daughter" &&
                element.code === "daughter"),
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

  const handleUpdate = e => {
    e.preventDefault();

    const ageErrorArray = [];
    insurerCBXArray.forEach(data => {
      const hasAge = insurerDDArray.some(item => item.insurer === data);
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
      insurerDDArray.forEach(data => {
        const i = membersArray.findIndex(x => x.code === data.insurer);
        dataArray.push({
          type: `${membersArray[i]?.code}`,
          age: data.value.endsWith("months")
            ? `0.${data.value.split(" ")[0]}`
            : `${data.value.split(" ")[0]}`,
        });
      });

      dispatch(
        updateUserMembersDetails(
          { ...proposerDetails, members: dataArray },
          history,
        ),
      );
    }
  };

  return (
    <fieldset>
      {/* <Label>Who all would you like to insure?</Label> */}
      <form>
        <Container>
          <Row id="proposal_members">
            <Row
              css={`
                padding: 15px 19px;
                height: 247px;
                overflow-y: scroll;
                padding-right: 37px;
                overflow-x: hidden;
              `}
            >
              {membersArray &&
                membersArray.map(
                  ({
                    display_name,
                    min_age,
                    max_age,
                    is_primary,
                    hasClose,
                    code,
                  }) => {
                    const age = getAge(min_age, max_age);

                    return (
                      // is_primary &&
                      dataSet(
                        display_name,
                        age,
                        insurerCBXArray,
                        insurerDDArray,
                        handleInput,
                        hasClose,
                        code,
                        ageError,
                        childCount,
                        addChild,
                      )
                    );
                  },
                )}
            </Row>
            <StyledHr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Col
                md={6}
                lg={6}
                xs={6}
                style={{
                  borderRight: "1px solid #ddd",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <AddMemberButton
                  onClick={event => {
                    event.preventDefault();
                    addChild("Son");
                  }}
                >
                  {childCount === 4 || !insurerCBXArray.includes("son") ? (
                    <img
                      src={addBtndisabled}
                      css={`
                        height: 23px;
                        margin-right: 5px;
                      `}
                    />
                  ) : (
                    <img
                      src={addBtn}
                      css={`
                        height: 23px;
                        margin-right: 5px;
                      `}
                    />
                  )}
                  <span
                    css={`
                      color: ${(childCount === 4 ||
                        !insurerCBXArray.includes("son")) &&
                      "#000000a1  !important"};
                    `}
                  >
                    Add Son
                  </span>
                </AddMemberButton>
              </Col>
              <Col
                md={6}
                lg={6}
                xs={6}
                style={{
                  // borderRight: "1px solid #ddd",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <AddMemberButton
                  css={`
                    border: none !important;
                  `}
                  onClick={event => {
                    event.preventDefault();
                    addChild("Daughter");
                  }}
                >
                  {" "}
                  {childCount === 4 || !insurerCBXArray.includes("daughter") ? (
                    <img
                      src={addBtndisabled}
                      css={`
                        height: 23px;
                        margin-right: 5px;
                      `}
                    />
                  ) : (
                    <img
                      src={addBtn}
                      css={`
                        height: 23px;
                        margin-right: 5px;
                      `}
                    />
                  )}
                  <span
                    css={`
                      color: ${(childCount === 4 ||
                        !insurerCBXArray.includes("daughter")) &&
                      "#000000a1  !important"};
                    `}
                  >
                    Add Daughter
                  </span>
                </AddMemberButton>
              </Col>
              {/* <Col md={6} lg={4} xs={6}>
                <AddMemberButton
                  onClick={event => {
                    event.preventDefault();
                    setShow(true);
                  }}
                >              
                  <StyledIcon className="fa fa-plus-circle"></StyledIcon>{" "}
                  <span>Other Member</span>
                </AddMemberButton>
              </Col> */}
            </div>

            <StyledHr />
          </Row>
        </Container>
        {errors && (
          <ErrorMessage2 style={{ fontSize: "15px" }}>{errors}</ErrorMessage2>
        )}

        {error &&
          error.map(msg => (
            <ErrorMessage2 style={{ fontSize: "15px" }}>{msg}</ErrorMessage2>
          ))}
        <button
          css={`
            height: 46px;
            width: 170px;
            background-color: var(--abc-red);
            color: #fff;
            margin: 10px auto 30px;
            border-radius: 2px;
          `}
          onClick={handleUpdate}
          laptopLg
          mobileSm
        >
          Apply
        </button>
      </form>
      {/* <GreetingFormModal
        show={showModal}
        setShow={setShow}
        setMembersArray={setMembersArray}
        membersArray={membersArray}
        handleChange={handleInput}
        modalTitle={"All your family members"}
        insurerCBXArray={insurerCBXArray}
        insurerDDArray={insurerDDArray}
        handleInput={handleInput}
        editPopup
      /> */}
    </fieldset>
  );
}

function EditMembersPopup({
  handleClose = () => {},
  editMembersContent,
  css = ``,
}) {
  return (
    <Modal>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          overflow: auto;
          @media (max-width: 767px) {
            height: 100%;
            width: 100%;
          }
          ${css}
        `}
      >
        <div
          css={`
            background: #fff;
            max-width: 705px;
            width: 100%;
            padding: 20px;
            padding-right: 43px;
            border-radius: 20px;
            position: relative;
          `}
        >
          <div
            className="x-touch"
            onClick={event => {
              handleClose();
              event.stopPropagation();
            }}
            style={{
              position: "absolute",
              top: 0,
              right: "-12px",
            }}
          >
            <div className="x" style={{ transform: "scale(1.2)" }}>
              <div className="line1"></div>
              <div className="line2"></div>
            </div>
          </div>
          <h1
            css={`
              font-size: 24px;
              line-height: 28px;
              font-weight: 900;
              // font-family: "PFHandbookProbld";
              background-image: linear-gradient(to right, #ffe7e7, #fff);
              padding: 10px;
              width: 40%;
              border-radius: 8px;
              color: #000;
              margin-bottom: 39px;

              ${small} {
                font-size: 16px;
              }
            `}
          >
            Edit Members
          </h1>
          <div>{editMembersContent ?? <EditMembersContent />}</div>
        </div>
      </div>
    </Modal>
  );
}

const StyledHr = styled.hr`
  background: #f5f6f9;
  height: 0px;
  width: 100%;
`;

const AddMemberButton = styled.button`
  font-size: 17px;
  line-height: 55px;
  color: #000;
  padding: 0px 8px;
  width: 150px;
  height: 23px;
  line-height: 18px;
  font-weight: 900;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  & span {
    position: relative;
    // top: -3px;
  }
`;

const StyledIcon = styled.i`
  font-size: 25px !important;
  color: #c72229 !important;
  margin-top: -1px;
  margin: 0 5px;
`;

export default EditMembersPopup;
