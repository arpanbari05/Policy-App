import React from "react";
import StyledButton from "../../../components/StyledButton";
import TextInput from "../../../components/TextInput";
import styled from "styled-components/macro";
import { ProgressBar } from "react-bootstrap";
import CustomProgressBar from "../../../components/ProgressBar";
import { Title } from "./FormComponents";

const Form1 = () => {
  return (
    <>
      <div
        css={`
          padding: 17px;
        `}
      >
        <Title>Tell Us Where You Live</Title>
        <CustomProgressBar now={1} total={5}/>
        <TextInput clear={() => console.log("hehee")} />
      </div>
      <div>
        <StyledButton
          styledCss={`margin:0; width: 100%;`}
          value={`Get Started`}
        />
      </div>
    </>
  );
};

export default Form1;
