import React from "react";
import Card from "../../components/Card";
import StyledButton from "../../components/StyledButton";
import TextInput from "../../components/TextInput";
import styled from "styled-components/macro";
import RadioCapsule from "../../components/RadioCapsule";
import { bg } from "../../assets/images";
import RadioButton from "../../components/RadioButton";
import RoundDD from "../../components/RoundDD";
import Checkbox from "../../components/Checkbox";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Form1 from "./components/Form1";

export const InputPage = () => {
  return (
    <Container>
      <Wrapper>
        <InnerWrapper>{planCard()}</InnerWrapper>
        <InnerWrapper>
          {" "}
          <Card
            padding={`0`}
            styledCss={`
    margin: 73px auto;
  
    `}
            width={`499px`}
          >
            <div
              css={`
                display: flex;
                flex-direction: column;
                width: 100%;
                & > div {
                  width: 100%;
                }
              `}
            >
              <Form1 />
            </div>
          </Card>
          <p>dsfa</p>
        </InnerWrapper>
      </Wrapper>
      {/* <Card width={`400px`} height={"600px"} padding={`0px`}>
        <div
          css={`
            padding: 10px;
          `}
        >
          <TextInput clear={() => console.log("hehee")} />
          <RadioButton label={`sadf`} checked={true} />
          <RadioButton label={`sadf3`} itemsCentered />
          <RadioCapsule label={`tes`} />
          <RadioCapsule label={`tes2`} checked={true} />
          <RadioCapsule label={`tes3`} checked={true} />
          <Checkbox title={"self"} handleChange={() => {}} code={`g`} />
          <RoundDD
            list={[{ title: "he" }, { title: "he 2" }]}
            selected={"Select Age"}
          />
        </div>
        <StyledButton
          value={`button`}
          styledCss={`position: absolute;bottom: 0;left: 0; right: 0; margin: 0;`}
        />
      </Card> */}
    </Container>
  );
};

const Container = styled.div`
  background-image: url(${bg});
  height: 100%;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right top;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  & > div {
    width: 50%;
  }
`;
const PlanCard = styled.div`
  & h3 {
    color: #0a87ff;
    border: 1px solid #0a87ff;
    border-radius: 15px;
    width: max-content;
    font-size: 24px;
    padding: 3px 9px;
    margin-bottom: 13px;
  }
  & h1 {
    font-weight: 500;
    margin-bottom: 37px;
  }
  & svg {
    color: #0a87ff;
    width: 23px;
    height: 22px;
  }
`;
const InnerWrapper = styled.div``;

function planCard() {
  return (
    <Card
      BgColor={`#edf0f4`}
      padding={`27px`}
      styledCss={`
    margin: 73px auto;
    box-shadow: none!important;
    `}
      width={`500px`}
      height={`460px`}
    >
      <PlanCard>
        <h3>HEALTH INSURANCE</h3>
        <h1>Buy Health Insurance plan in few simple steps</h1>
        {planList()}
      </PlanCard>
    </Card>
  );
}

function planList() {
  const planArray = [
    `Compare Health Insurance plans`,
    `Instant policy inssuance`,
    `Free claims assistance`,
    `Get plan recommendation in seconds`,
  ];
  return planArray.map((data) => (
    <span
      css={`
        display: flex;
        align-items: center;
        margin-left: 14px;
        margin-bottom: 7px;
        & p {
          margin: 0 8px;
        }
      `}
    >
      <IoIosCheckmarkCircle />
      <p>{data}</p>
    </span>
  ));
}
