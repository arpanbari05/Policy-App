import React from "react";
import StyledButton from "../../../components/StyledButton";
import TextInput from "../../../components/TextInput";
import styled from "styled-components/macro";
import { ProgressBar } from "react-bootstrap";
import CustomProgressBar from "../../../components/ProgressBar";
import { Title, SubTitle } from "./FormComponents";
import { useSelector } from "react-redux";
import RadioCapsule from "../../../components/RadioCapsule";

const Form1 = () => {
  const { frontendData } = useSelector((state) => state.frontendBoot);
  const { data } = frontendData || [""];
  const { popularcities } = data || [""];

  console.log(popularcities);

  return (
    <>
      <div
        css={`
          padding: 17px;
        `}
      >
        <Title>Tell Us Where You Live</Title>
        <CustomProgressBar now={1} total={5} />
        <TextInput
          styledCss={`margin-bottom: 10px;`}
          clear={() => console.log("hehee")}
        />
        <SubTitle>Popular Cities</SubTitle>
        {popularcities?.map(({ pincode, name }) => (
          <RadioCapsule label={name} styledCss={`margin-bottom: 10px; margin-right: 5px;`}/>
        ))}
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
