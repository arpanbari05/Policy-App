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
  const { frontendData, tempModifications } = useSelector(
    state => state.frontendBoot,
  );
  const [selected, setSelected] = useState("F");
  //const [selectedText, setSelectedText] = useState("F");
  const [tempSelected, setTempSelected] = useState("");
  const { data } = frontendData || [""];
  const { plantypes, description } = data || [""];

  const handleSubmit = () => {
    if (selected) {
      handleChange(4.1);

      dispatch(saveForm4UserDetails({ planType: selected }));
      /* const toBeGivePlan =
        selected === "M"
          ? "Multi Individual"
          : selected === "F"
          ? "Family Floater"
          : "Individual";
      dispatch(setPlanType(toBeGivePlan));*/
    }
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
        {console.log("The plantypes", data)}
        <Title>Which plan would you like to opt for?</Title>
        <CustomProgressBar now={currentForm} total={5} />
        <div
          css={`
            margin-bottom: 13px;
          `}
        >
          {plantypes && tempModifications?.hideMultiIndivedualPlans
            ? plantypes
                .filter(item => item.code !== "M")
                .map(({ code, display_name }, i) => {
                  return (
                    code !== "I" && (
                      <div>
                        <RadioButton
                          onMouseEnter={() => setTempSelected(code)}
                          onClick={e => setSelected(code)}
                          id={display_name}
                          value={code}
                          checked={selected === code || undefined}
                          label={display_name}
                        />
                      </div>
                    )
                  );
                })
            : plantypes.map(({ code, display_name }, i) => {
                return (
                  code !== "I" && (
                    <div>
                      <RadioButton
                        onMouseEnter={e => setTempSelected(code)}
                        onClick={e => setSelected(code)}
                        id={display_name}
                        value={code}
                        checked={selected === code || undefined}
                        label={display_name}
                      />
                    </div>
                  )
                );
              })}
        </div>
        <div
          css={`
            margin-bottom: 59px;
            & .desc {
              opacity: 0;
            }
            & .active {
              z-index: 1;
              top: 0;
              left: 0;
              opacity: 1 !important;
              -webkit-transform: scale(1, 1);
              -webkit-transform: rotate(0deg);
            }
          `}
        >
          {plantypes.map(({ code, display_name, description }, i) => {
            return tempSelected
              ? tempSelected === code && (
                  <div className="active desc">
                    <SubQuestions>What is {display_name}?</SubQuestions>
                    <SubAnswer>{description}</SubAnswer>
                  </div>
                )
              : selected === code && (
                  <div className="active desc">
                    <SubQuestions>What is {display_name}?</SubQuestions>
                    <SubAnswer>{description}</SubAnswer>
                  </div>
                );
          })}
          {/* {plantypes &&  tempModifications?.hideMultiIndivedualPlans ?
            plantypes.filter(item => item.code !== "M").map(({ code, display_name, description }, i) => {
              return (
                selected === code && (
                  <>
                    <SubQuestions>What is {display_name}?</SubQuestions>
                    <SubAnswer>{description}</SubAnswer>
                  </>
                )
              );
            })
            :plantypes.map(({ code, display_name, description }, i) => {
              return (
                selected === code && (
                  <>
                    <SubQuestions>What is {display_name}?</SubQuestions>
                    <SubAnswer>{description}</SubAnswer>
                  </>
                )
              );
            })} */}
        </div>
        {formButtons(() => {
          handleChange(currentForm - 1);
        }, handleSubmit)}
      </div>
    </div>
  );
};

export default Form3;
