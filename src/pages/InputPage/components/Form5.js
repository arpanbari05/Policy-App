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

export const fieldSet1Data = [
  {
    type: "text",
    name: "fullName",
    label: "Full Name",
    placeHolder: "Enter Full Name.",
    maxLength: "60",
  },
  {
    type: "tel",
    name: "mobile",
    label: "Mobile No.",
    placeHolder: "Enter mobile no.",
    maxLength: "10",
  },
  {
    type: "email",
    name: "email",
    label: "Email id",
    placeHolder: "Enter email id.",
    maxLength: "50",
  },
];

export const fieldSet1RadioInputData = [
  {
    type: "radio",
    name: "gender",
    label: "Male",
    value: "M",
    id: "male",
  },
  {
    type: "radio",
    name: "gender",
    label: "Female",
    value: "F",
    id: "female",
  },
];

const Form5 = ({ handleChange, currentForm }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = () => {};

  return (
    <div
      css={`
        display: ${currentForm !== 5 && "none"};
      `}
    >
      <div
        css={`
          padding: 17px;
        `}
      >
        <Title>Tell Us about yourself?</Title>
        <CustomProgressBar now={currentForm} total={5} />
        <div
          css={`
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          `}
        >
          {fieldSet1Data.map(
            ({ type, name, label, placeHolder, maxLength }) => (
              <TextInput
                label={name}
                type={type}
                styledCss={`width: ${name !== "email" ? "221px" : "100%"};
                margin-bottom: 19px;`}
                value={
                  name === "fullName"
                    ? fullName
                    : name === "email"
                    ? email
                    : name === "mobile"
                    ? mobile
                    : undefined
                }
              />
            )
          )}
        </div>
        {formButtons(handleChange, handleSubmit, currentForm)}
      </div>
    </div>
  );
};

export default Form5;
