import { useState } from "react";
import Card from "../../components/Card";
import styled from "styled-components/macro";
import { bg, checkRB } from "../../assets/images";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Page } from "../../components";
import { useFrontendBoot, useTheme } from "../../customHooks";
import BasicDetailsForm from "./components/BasicDetailsForm";
import InputMembersForm from "./components/InputMembersForm";
import { useParams, useRouteMatch } from "react-router-dom";
import PlanTypeForm from "./components/PlanTypeForm";
import LocationForm from "./components/LocationForm";
import DeductibleForm from "./components/DeductibleForm";
import RenewalDetailsForm from "./components/RenewalDetailsForm";
import { Spinner } from "react-bootstrap";
import MedicalHistoryForm from "./components/MedicalHistoryForm";
import PortabilityForm from "./components/PortabilityForm";
import JourneyTypeForm from "./components/JourneyTypeForm";
import { renderDisclaimer } from "../../utils/helper";
import { usePos } from "../../customHooks/usePos";
import { usePosPinc } from "../../customHooks/usePosPinc";
import Footer from "../../components/Common/Footer/SriyahFooter";

const journeyTitle = {
  top_up: "TOP UP INSURANCE",
  health: "HEALTH INSURANCE",
  renew: "RENEW POLICY",
};

const InputPage = () => {
  const isBasicDetailsRoute = useRouteMatch("/input/basic-details");
  const isRenewalDetailsRoute = useRouteMatch("/input/renewal-details");
  const [showmore, setShowmore] = useState(false);
  const { colors } = useTheme();
  const { currentForm } = useParams();
  usePosPinc();
  const { posContent } = usePos(localStorage.SSO_user, currentForm);

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
            <HeaderCard content={posContent} />
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
                {currentForm === "basic-details" && (
                  <BasicDetailsForm posContent={posContent} />
                  // <PortabilityForm />
                )}

                {currentForm === "members" && (
                  <InputMembersForm posContent={posContent} />
                )}

                {currentForm === "plantype" && (
                  <PlanTypeForm posContent={posContent} />
                )}

                {currentForm.startsWith("location") && (
                  <LocationForm key={currentForm} posContent={posContent} />
                )}

                {currentForm === "deductible" && (
                  <DeductibleForm posContent={posContent} />
                )}
                {currentForm === "medicalHistory" && (
                  <MedicalHistoryForm posContent={posContent} />
                )}

                {currentForm === "portability" && <PortabilityForm />}

                {currentForm === "renewal-details" && (
                  <RenewalDetailsForm posContent={posContent} />
                )}

                {currentForm === "journey-type" && <JourneyTypeForm />}
              </div>
            </Card>
            {(isBasicDetailsRoute || isRenewalDetailsRoute) && (
              <TermsAndConditions
                showmore={showmore}
                setShowmore={setShowmore}
              />
            )}
          </InnerWrapper>
        </Wrapper>
        <div
          css={`
            @media screen and (max-width: 831px) {
              /* margin-top:340px; */
            }
          `}
        >
          <Footer />
        </div>
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
    color: ${props => props.primaryColor};
    background-color: ${props => props.primaryShade};
    border: 1px solid ${props => props.primaryColor};
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
    color: ${props => props.primaryColor};
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

function HeaderCard({ content }) {
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
        primaryColor={colors.primary_color}
        primaryShade={colors.primary_shade}
      >
        <div className="mb-3">
          {isLoading || isUninitialized ? (
            <Spinner animation="border" />
          ) : (
            <h3>{journeyTitle[journeyType]}</h3>
          )}
        </div>

        {content.banner && content.banner !== "" ? (
          <div
            css={`
              p {
                font-size: 1.4rem;
                margin-bottom: 2rem;
              }

              li {
                position: relative;
                margin-top: 10px;
                margin-left: 50px;
                font-size: 14px;
                &::before {
                  content: "";
                  position: absolute;
                  height: 20px;
                  width: 20px;
                  left: -30px;
                  top: 0px;
                  border-radius: 100%;
                  background-image: url(${checkRB});
                  background-size: cover;
                }
              }
            `}
            dangerouslySetInnerHTML={{
              __html: content.banner,
            }}
          ></div>
        ) : (
          <>
            <h1>Buy Health Insurance plan in few simple steps</h1>
            <PlanList />
          </>
        )}
      </PlanCard>
    </Card>
  );
}

function TermsAndConditions(props) {
  const {
    tenantName,
    data: { settings },
  } = useFrontendBoot();

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
        {renderDisclaimer({ tenantName, settings })}
      </label>
    </div>
  );
}

const planArray = () =>
  process.env.REACT_APP_TENANT === "sriyah"
    ? [
        `Get plan recommendation in seconds`,
        `Compare Health Insurance plans`,
        `Instant policy purchase`,
        `Free claims assistance`,
      ]
    : [
        `Compare Health Insurance plans`,
        `Instant policy Insurance`,
        `Free claims assistance`,
        `Get plan recommendation in seconds`,
      ];

function PlanList() {
  return planArray().map(data => (
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
