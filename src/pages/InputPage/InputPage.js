import { useState, useEffect } from "react";
import Card from "../../components/Card";
import { fyntune } from "../../assets/images";
import mobile_input_first from "../../assets/images/mobile_input_first.png";
import StyledButton from "../../components/StyledButton";
import TextInput from "../../components/TextInput";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import RadioCapsule from "../../components/RadioCapsule";
import { bg } from "../../assets/images";
import RadioButton from "../../components/RadioButton";
import RoundDD from "../../components/RoundDD";
import Checkbox from "../../components/Checkbox";
import { useDispatch } from "react-redux";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import Form3 from "./components/Form3";
import Form4 from "./components/Form4";
import Form5 from "./components/Form5";
import Slider from "../../components/Slider";
import { setFilters } from "../quotePage/quote.slice";

export const InputPage = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [showmore, setShowmore] = useState(false);
  const greetingPage = useSelector((state) => state.greetingPage);
  const { memberGroups } = greetingPage;
  const dispatch = useDispatch();
  console.log("ggg2", currentForm);
  const handleChange = (form) => {
    setCurrentForm(form);
  };
  const members = Object.keys(memberGroups || {});
  //console.log("member groups", memberGroups);
  //console.log("members", members);

  return (
    <>
      <div
        css={`
          display: none;
          background: white;
          width: 100%;
          box-shadow: 0px 0px 10px grey;
          padding: 10px;
          z-index: 9999;

          align-items: center;
          justify-content: space-between;
          display: none;
          @media (max-width: 769px) {
            display: flex;
          }
        `}
      >
        <div
          css={`
            width: 110px;
            height: auto;
          `}
        >
          <img className="w-100" src={fyntune} alt="FYNTUNE_LOGO" />
        </div>

        <div
          css={`
            width: 30px;
            height: 25px;
            border: 1px solid #ebeff3;
            border-radius: 5px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-evenly;
            .line_hamburger {
              width: 70%;
              height: 3px;
              border-radius: 5px;
              background: #161616;
            }
          `}
        >
          <span className="line_hamburger"></span>
          <span className="line_hamburger"></span>

          <span className="line_hamburger"></span>
        </div>
      </div>
      <Container>
        <div
          css={`
            background: #ebeff3;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 10px;
            padding: 10px;
            width: 90%;
            margin: auto;
            margin-top: 20px;
            display: none;
            @media (max-width: 480px) {
              display: flex;
            }
          `}
        >
          <div
            css={`
              width: 80%;
            `}
          >
            <div
              css={`
                width: fit-content;
                color: #0a87ff;
                border: 1px solid #0a87ff;
                background: #ecf6ff;
                padding: 2px 5px;
                border-radius: 20px;
                font-size: 12px;
              `}
            >
              HEALTH INSURANCE
            </div>
            <p
              css={`
                font-weight: 900;
                font-size: 13px;
              `}
            >
              Buy Health Insurance Plan In Few Simple Steps.
            </p>
          </div>
          <div
            css={`
              width: 80px;
            `}
          >
            <img
              src={mobile_input_first}
              alt={"ICON_GROUP"}
              className="w-100"
            />
          </div>
        </div>
        <Wrapper>
          <InnerWrapper className="hide_on_mobile">{planCard()}</InnerWrapper>
          <InnerWrapper>
            {" "}
            <Card
              padding={`0`}
              styledCss={`margin: 10px auto; margin-bottom: 30px; 
              @media (max-width: 480px) {
                width: 100% !important;
                box-shadow: 0 0px 1px 0 rgb(0 0 0 / 20%), 0 8px 126px 0 rgb(0 0 0 / 10%) !important;
              }
              @media (max-width: 1100px){

                width:430px;
              }
              @media(max-width:885px){
                width:400px;
              }
              @media(max-width:835px){
      margin: 20px auto;
      width: 96%;
    }
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
                  @media (max-width: 480px) {
                    width: 100% !important;
                  }
                `}
              >
                <Form5 currentForm={currentForm} handleChange={handleChange} />
                <Form2 currentForm={currentForm} handleChange={handleChange} />
                <Form3 currentForm={currentForm} handleChange={handleChange} />
                {members &&
                  members.map((data, i) => (
                    <Form1
                      currentForm={currentForm}
                      handleChange={handleChange}
                      member={memberGroups[data]}
                      index={i + 1}
                      memberGroup={data}
                      lastForm={members.length === i + 1}
                    />
                  ))}

                <Form4
                  currentForm={currentForm}
                  handleChange={handleChange}
                  lastForm={members?.length || 1}
                />
              </div>
            </Card>
            {currentForm === 1 && termsAndConditions(showmore, setShowmore)}
          </InnerWrapper>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-image: url(${bg});
  background-attachment: fixed;
  background-position: center;
  height: 100vh;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  @media (max-width: 480px) {
    background: white;
    .hide_on_mobile {
      display: none;
    }
    .show_on_mobile {
      display: block;
    }
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  padding-top: 30px;
  width: 100%;
  & > div {
    width: 50%;
  }
  @media (max-width: 830px) {
    flex-direction: column;
    & > div {
      margin: 0 auto;
      width: 90%;
    }
  }
  @media (max-width: 480px) {
    margin: 0 auto;
    width: 90%;
    & > div {
      width: 100% !important;
    }
  }
`;
const PlanCard = styled.div`
  & h3 {
    color: #0a87ff;
    background-color: #ecf6ff;
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
const InnerWrapper = styled.div`
  display: block;
  height: 100%;
  /* @media (max-width:480px){
    display:none;
  } */
`;

function planCard() {
  return (
    <Card
      BgColor={`#edf0f49e`}
      padding={`27px`}
      styledCss={`
    margin: 0 auto;
    box-shadow: none!important;
    width: 585px;
    @media(max-width:1200px){
      width: 500px;
    }
    @media(max-width:965px){
      width: 98%;
      margin: 0 auto;
    }
    @media(max-width:885px){
      width: 95%;
      margin: 0 auto;
      width: 96%;
    }
    @media(max-width:835px){
      margin: 20px auto;
      width: 96%;
      height:fit-content;
      h1{
        font-size:22px;
      font-weight:900;
      }
    }
    `}
      width={`500px`}
      height={`400px`}
    >
      <PlanCard>
        <h3>HEALTH INSURANCE</h3>
        <h1>Buy Health Insurance plan in few simple steps</h1>
        {planList()}
      </PlanCard>
    </Card>
  );
}

function termsAndConditions(showmore, setShowmore) {
  return (
    <div
      css={`
        display: flex;
      `}
    >
      <label
        style={{ fontSize: "13px", color: "black", fontWeight: "400" }}
        css={`
          width: 496px;
          margin: 0 auto;
        `}
      >
        <i class="termchk"></i>By clicking on Get Started, I hereby authorise
        FYNTUNE. and all of its affiliates, subsidiaries, group companies and
        related parties to access the details such as my name, address,
        telephone number,{" "}
        <span style={{ display: showmore ? "inline" : "none" }}>
          e-mail address, birth date and / or anniversary date shared by me, and
          contact me to provide information on the various products and services
          offered. I understand that this consent will override my NDNC
          registration, if any. I also understand that at any point of time, I
          wish to stop receiving such communications from FYNTUNE, I can
          withdraw such consent anytime on{" "}
          <a href="#" target="_blank" style={{ color: "black !important" }}></a>{" "}
          (to provide a contact number or email id or both){" "}
        </span>
        <a
          style={{ color: "#108aff", fontSize: "15px" }}
          onClick={() => {
            setShowmore(!showmore);
          }}
        >
          {showmore ? "...show less" : "...show more"}
        </a>
      </label>
    </div>
  );
}

function planList() {
  const planArray = [
    `Compare Health Insurance plans`,
    `Instant policy Insurance`,
    `Free claims assistance`,
    `Get plan recommendation in seconds`,
  ];
  return planArray.map((data) => (
    <span
      key={data}
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
