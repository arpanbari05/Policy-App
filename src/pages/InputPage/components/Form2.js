import { useState, useEffect } from "react";
import StyledButton from "../../../components/StyledButton";
import TextInput from "../../../components/TextInput";
import CustomProgressBar from "../../../components/ProgressBar";
import { Title, SubTitle, ErrorMessage, formButtons } from "./FormComponents";
import { useSelector, useDispatch } from "react-redux";
import RadioCapsule from "../../../components/RadioCapsule";
import {
  getRegion,
  saveForm1UserDetails,
  setIsDisabled,
} from "../greetingPage.slice";
import "styled-components/macro";
import BackButton from "../../../components/BackButton";
const Form2 = ({ handleChange, currentForm }) => {
  const handleSubmit = () => {
    handleChange(3);
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

        {formButtons(handleChange, handleSubmit, currentForm)}
      </div>
    </div>
  );
};

export default Form2;
