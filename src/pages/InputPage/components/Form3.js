import { useState, useEffect } from "react";
import StyledButton from "../../../components/StyledButton";
import TextInput from "../../../components/TextInput";
import CustomProgressBar from "../../../components/ProgressBar";
import {
  Title,
  SubTitle,
  ErrorMessage,
  formButtons,
  SubQuestions,
  SubAnswer,
} from "./FormComponents";
import { useSelector, useDispatch } from "react-redux";
import RadioCapsule from "../../../components/RadioCapsule";
import {
  getRegion,
  saveForm1UserDetails,
  saveForm4UserDetails,
  setIsDisabled,
} from "../greetingPage.slice";
import "styled-components/macro";
import BackButton from "../../../components/BackButton";
import RadioButton from "../../../components/RadioButton";
const Form3 = ({ handleChange, currentForm }) => {
  const dispatch = useDispatch();
  const { frontendData } = useSelector((state) => state.frontendBoot);
  const [selected, setSelected] = useState("F");
  const [selectedText, setSelectedText] = useState("F");

  const { data } = frontendData || [""];
  const { plantypes, description } = data || [""];

  const handleSubmit = () => {
    handleChange(4);
    dispatch(saveForm4UserDetails(selected));
  };

  return (
    <div
      css={`
        display: ${currentForm !== 3 && "none"};
      `}
    >
      <div
        css={`
          padding: 17px;
        `}
      >
        <Title>Which plan would you like to opt for?</Title>
        <CustomProgressBar now={currentForm} total={5} />
        <div
          css={`
            margin-bottom: 13px;
          `}
        >
          {plantypes &&
            plantypes.map(({ code, display_name }, i) => {
              return (
                code !== "I" && (
                  <RadioButton
                    onClick={(e) => setSelected(code)}
                    id={display_name}
                    value={code}

                    checked={selected === code || undefined}
                    label={display_name}
                  />
                )
              );
            })}
        </div>
        <div
          css={`
            margin-bottom: 59px;
          `}
        >
          {plantypes &&
            plantypes.map(({ code, display_name, description }, i) => {
              return (
                selected === code && (
                  <>
                    <SubQuestions>What is {display_name}?</SubQuestions>
                    <SubAnswer>{description}</SubAnswer>
                  </>
                )
              );
            })}
        </div>
        {formButtons(handleChange, handleSubmit, currentForm)}
      </div>
    </div>
  );
};

export default Form3;
