import { useState } from "react";
import Card from "../../components/Card";
import styled from "styled-components/macro";
import { bg } from "../../assets/images";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Page } from "../../components";
import { useFrontendBoot, useTheme } from "../../customHooks";
import BasicDetailsForm from "./components/BasicDetailsForm";
import InputMembersForm from "./components/InputMembersForm";
import { useParams, useRouteMatch } from "react-router-dom";
import PlanTypeForm from "./components/PlanTypeForm";
import LocationForm from "./components/LocationForm";
import DeductibleForm from "./components/DeductibleForm";
import "styled-components/macro";
import { Spinner } from "react-bootstrap";
import MedicalHistoryForm from "./components/MedicalHistoryForm";

const journeyTitle = {
  top_up: "TOP UP INSURANCE",
  health: "HEALTH INSURANCE",
};

const InputPage = () => {
  const isBasicDetailsRoute = useRouteMatch("/input/basic-details");
  const [showmore, setShowmore] = useState(false);

  const { colors } = useTheme();

  const { currentForm } = useParams();
  console.log("CURRENT_FORM", currentForm);

  return (
    <Page>
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
          <div>
            <div
              css={`
                width: fit-content;
                color: ${colors.primary_color};
                border: 1px solid ${colors.primary_color};
                background: ${colors.primary_shade};
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
                margin-bottom: 0;
                margin-top: 4px;
              `}
            >
              Buy Health Insurance Plan In Few Simple Steps.
            </p>
          </div>
        </div>
        <Wrapper currentForm={currentForm}>
          <InnerWrapper className="hide_on_mobile">
            <HeaderCard />
          </InnerWrapper>
          <InnerWrapper>
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
      margin-bottom: 10px;
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
                {currentForm === "basic-details" && <BasicDetailsForm />}

                {currentForm === "members" && <InputMembersForm />}

                {currentForm === "plantype" && <PlanTypeForm />}

                {currentForm.startsWith("location") && (
                  <LocationForm key={currentForm} />
                )}

                {currentForm === "deductible" && <DeductibleForm />}
                {currentForm === "medicalHistory" && <MedicalHistoryForm />}
              </div>
            </Card>
            {isBasicDetailsRoute && (
              <TermsAndConditions
                showmore={showmore}
                setShowmore={setShowmore}
              />
            )}
          </InnerWrapper>
        </Wrapper>
      </Container>
    </Page>
  );
};

export default InputPage;

const Container = styled.div`
  background-image: url(${bg});
  background-attachment: fixed;
  background-position: center;
  max-height: fit-content;
  min-height: calc(100vh - 80px);
  width: 100%;
  /* min-height: 100vh; */
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
  padding-top: 10px;
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
    padding-top: 0;
    width: ${props => (props.currentForm === 2 ? "100%" : "90%")};
    & > div {
      width: 100% !important;
    }
  }
`;
const PlanCard = styled.div`
  & h3 {
    color: ${props => props.PrimaryColor};
    background-color: ${props => props.PrimaryShade};
    border: 1px solid ${props => props.PrimaryColor};
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
    color: ${props => props.PrimaryColor};
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

function HeaderCard() {
  const { colors } = useTheme();
  const { journeyType, isLoading, isUninitialized } = useFrontendBoot();

  return (
    <Card
      BgColor={`#edf0f49e`}
      padding={`27px`}
      styledCss={`
    margin: 10px auto;
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
      <PlanCard
        PrimaryColor={colors.primary_color}
        PrimaryShade={colors.primary_shade}
      >
        <div className="mb-3">
          {isLoading || isUninitialized ? (
            <Spinner animation="border" />
          ) : (
            <h3>{journeyTitle[journeyType]}</h3>
          )}
        </div>
        <h1>Buy Health Insurance plan in few simple steps</h1>
        <PlanList />
      </PlanCard>
    </Card>
  );
}

function TermsAndConditions(props) {
  const { tenantName } = useFrontendBoot();

  return (
    <div
      css={`
        display: flex;
        margin-bottom: 10px;
      `}
      {...props}
    >
      <label
        style={{ fontSize: "13px", color: "black", fontWeight: "400" }}
        css={`
          width: 500px;
          margin: 0 auto;
        `}
      >
        <i class="termchk"></i>By clicking on Get Started, I hereby authorise{" "}
        {tenantName}. and all of its affiliates, subsidiaries, group companies
        and related parties to access the details such as my name, address,
        telephone number, e-mail address, birth date and / or anniversary date
        shared by me, and contact me to provide information on the various
        products and services offered. I understand that this consent will
        override my NDNC registration, if any. I also understand that at any
        point of time, I wish to stop receiving such communications from{" "}
        {tenantName}, I can withdraw such consent anytime on (to provide a
        contact number or email id or both){" "}
      </label>
    </div>
  );
}

const planArray = [
  `Compare Health Insurance plans`,
  `Instant policy Insurance`,
  `Free claims assistance`,
  `Get plan recommendation in seconds`,
];

function PlanList() {
  return planArray.map(data => (
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
