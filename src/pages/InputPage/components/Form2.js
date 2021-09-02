import { useState, useEffect } from "react";
import StyledButton from "../../../components/StyledButton";
import TextInput from "../../../components/TextInput";
import CustomProgressBar from "../../../components/ProgressBar";
import { Title, SubTitle, ErrorMessage, formButtons } from "./FormComponents";
import { useSelector, useDispatch } from "react-redux";
import RadioCapsule from "../../../components/RadioCapsule";
import { AiFillCloseCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { IoAddCircle } from "react-icons/io5";
import {
  getRegion,
  saveForm1UserDetails,
  saveForm3UserDetails,
  setIsDisabled,
} from "../greetingPage.slice";
import "styled-components/macro";
import BackButton from "../../../components/BackButton";
import { dataset, getAge } from "./data";
import { Modal } from "react-bootstrap";

const Form2 = ({ handleChange, currentForm }) => {
  const { error } = useSelector((state) => state.greetingPage);
  const { frontendData } = useSelector((state) => state.frontendBoot);
  const { data } = frontendData || [""];
  const { members } = data || [""];

  const [membersArray, setMembersArray] = useState([]);
  const [childCount, setChildCount] = useState(0);
  const [ageError, setAgeError] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (members?.length > 0) {
      setMembersArray([...members]);
    }
  }, [members]);

  // Will contain list of insurer names that are checked
  const [insurerCBXArray, setInsurerCBXArray] = useState([]);
  // Will contain list of insurer Dropdown values if checkbox is checked
  const [insurerDDArray, setInsurerDDArray] = useState([]);

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)")) {
      if (!insurerCBXArray.includes("daughter")) {
        const tempArray = insurerCBXArray.filter(
          (element) => element.slice(0, 8) !== "daughter"
        );
        setInsurerCBXArray(tempArray);
      }
      if (!insurerCBXArray.includes("son")) {
        const tempArray = insurerCBXArray.filter(
          (element) => element.slice(0, 3) !== "son"
        );
        setInsurerCBXArray(tempArray);
      }
    }
  }, [membersArray]);

  useEffect(() => {
    let count = 0;
    insurerCBXArray.forEach((element) => {
      if (element.slice(0, 8) === "daughter" || element.slice(0, 3) === "son") {
        count += 1;
      }
    });

    setChildCount(count);
  }, [insurerCBXArray]);

  const addChild = (name) => {
    const code = name.toLowerCase();
    if (insurerCBXArray.includes(code)) {
      if (childCount < 4) {
        const { max_age, min_age } = membersArray.filter(
          (item) => item.code === code
        )[0];
        setChildCount(childCount + 1);
        const genCode = `${code + uuidv4()}`;
        const tempArray = [...membersArray];
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const ageErrorArray = [];
    insurerCBXArray.forEach((data) => {
      const hasAge = insurerDDArray.some((item) => item.insurer === data);
      if (!hasAge) {
        ageErrorArray.push(data);
      }
    });

    if (insurerCBXArray.length < 1) {
      setErrors("Select at least one Insured");
    } else if (insurerDDArray.length < 1 || ageErrorArray.length > 0) {
      setErrors("Select age for Insured");
      setAgeError(ageErrorArray);
    } else {
      setErrors(false);
    }
    if (ageErrorArray.length < 1 && !errors && insurerDDArray.length > 0) {
      const dataArray = [];
      insurerDDArray.forEach((data) => {
        const i = membersArray.findIndex((x) => x.code === data.insurer);
        if (membersArray[i]?.is_primary) {
          dataArray.push({
            type: `${membersArray[i].code}`,
            age: data.value.endsWith("months")
              ? `0.${data.value.split(" ")[0]}`
              : `${data.value.split(" ")[0]}`,
          });
        }
      });
      dispatch(saveForm3UserDetails(dataArray, handleChange));
    }
  };

  return (
    <div
      css={`
        display: ${currentForm !== 2 && "none"};
      `}
    >
      <div
        css={`
          padding: 17px;
        `}
      >
        <Title>Who all would you like to insure?</Title>
        <CustomProgressBar now={currentForm} total={5} />
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

              return (
                (is_primary || is_primary_modal) && (
                  <div
                    css={`
                      display: flex;
                      align-items: center;
                      padding: 2px 10px;
                      border: solid 1px #b0bed0;
                      margin-bottom: 10px;
                      border-radius: 7px;
                    `}
                  >
                    {dataset(
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
                    )}
                  </div>
                )
              );
            }
          )}
        {errors && <ErrorMessage>{errors}</ErrorMessage>}

        {!errors &&
          error &&
          error.map((msg) => <ErrorMessage>{msg}</ErrorMessage>)}

        <StyledButton
          onClick={() => {
            setShowModal(true);
          }}
          styledCss={`
            background-color: #e2f0ff;
            display: flex;
            align-items: center;
            justify-content: center;
            color: black;
            height: 43px;
            margin-bottom: 10px;
            margin-top: unset;
            & span {
              position: relative;
              top: -3px;
              left: -3px;
              font-size: 25px;
              color:#0a87ff;
            }
          `}
          noIcon
        >
          <span>
            <IoAddCircle />
          </span>
          Other Members
        </StyledButton>

        {formButtons(handleChange, handleSubmit, currentForm)}
      </div>
      <Modal
        css={`
          .modal-dialog {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            margin: 0;
            width: 502px;
          }
          .modal-content {
            border-radius: 0;
            height: auto;
            padding: 20px;
          }
        `}
        show={showModal}
      >
        <Modal.Header
          css={`
            padding: 0rem 1rem;
          `}
        >
          <Title>All your family members</Title>{" "}
          <a
            onClick={() => setShowModal(false)}
            css={`
              position: relative;
              color: #4a5971;
              font-size: 32px;
              font-size: 43px;
              top: -11px;
            `}
          >
            <AiFillCloseCircle />
          </a>
        </Modal.Header>

        <div
          css={`
            margin-top: 10px;
         
          `}
        >
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

                return (
                  <div
                    css={`
                      display: flex;
                      align-items: center;
                      padding: 2px 10px;
                      border: solid 1px #b0bed0;
                      margin-bottom: 10px;
                      border-radius: 7px;
                    `}
                  >
                    {dataset(
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
                    )}
                  </div>
                );
              }
            )}
        </div>
        <StyledButton
          value={`Add Member`}
          onClick={() => {
            const tempArray = membersArray.map((data) => {
              if (!data.is_primary && insurerCBXArray.includes(data.code)) {
                return {
                  [`code`]: data.code,
                  [`display_name`]: data.display_name,
                  [`min_age`]: data.min_age,
                  [`max_age`]: data.max_age,
                  ["is_primary"]: true,
                  ["is_primary_modal"]: true,
                };
              } else {
                return data;
              }
            });
            setMembersArray(tempArray);
            setShowModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Form2;
