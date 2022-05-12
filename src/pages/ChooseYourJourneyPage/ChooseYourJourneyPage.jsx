import React, { useState } from "react";
import styled from "styled-components/macro";
import { useTheme, useFrontendBoot } from "../../customHooks/index";
import { Page } from "../../components";
import { renderDisclaimer } from "../../utils/helper";
import Footer from "../../components/Common/Footer/SriyahFooter";
import Card from "../../components/Card";
import { bg, checkRB } from "../../assets/images";
import { Spinner } from "react-bootstrap";
import { IoIosCheckmarkCircle } from "react-icons/io";
import JourneyCard from "./components/JourneyCard";

const journeyArray = [
  { title: "Health", link: "#" },
  { title: "Top-Up", link: "#" },
  { title: "Renewal", link: "#" },
  { title: "Portability", link: "#" },
];

const ChooseYourJourneyPage = () => {
  const { colors } = useTheme();

  const [showmore, setShowmore] = useState(false);

  return (
    <Page>
      <Container>
        <div
          css={`
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
              Choose Your Journey
            </div>
            <p
              css={`
                font-weight: 900;
                font-size: 13px;
                margin-bottom: 0;
                margin-top: 4px;
              `}
            >
              Some long Dummy data Some long Dummy data Some long Dummy data
              Some long Dummy data Some long Dummy data.
            </p>
          </div>
        </div>
        <Wrapper>
          <InnerWrapper className="hide_on_mobile">
            <HeaderCard />
          </InnerWrapper>
          <InnerWrapper>
            <Card
              padding={`0`}
              styledCss={`margin: 10px auto; margin-bottom: 30px; 
                      box-shadow : none !important;
                      background-color : transparent !important;

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
              chooseYourJourneyForm={true}
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
                {journeyArray.map(({ title, link }, index) => (
                  <JourneyCard key={index} title={title} link={link} />
                ))}
              </div>
            </Card>
            <TermsAndConditions showmore={showmore} setShowmore={setShowmore} />
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

export default ChooseYourJourneyPage;

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
            <h3>Choose Your Journey</h3>
          )}
        </div>

        <>
          <h1>
            Some long Dummy data.
          </h1>
          <PlanList />
        </>
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

const planArray = () => [
  `Some long Dummy data Some long Dummy.`,
  `Some long Dummy data Some long Dummy.`,
  `Some long Dummy data Some long Dummy.`,
  `Some long Dummy data Some long Dummy.`,
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
