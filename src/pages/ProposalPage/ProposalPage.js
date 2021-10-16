import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecureLS from "secure-ls";
import styled from "styled-components/macro";
import { useParams } from "react-router-dom";
import FormGrid from "../../components/Common/FormGrid/FormGrid";
import ProposalSummary from "../../components/Common/ProposalSummary/ProposalSummary";
import { getCart } from "../Cart/cart.slice";
import { FaRegEdit } from "react-icons/fa";
import { starSchema } from "./ProposalDetailsSchema";
import { InsuredDetails, ProposerDetails } from "./ProposalSections";
import BMI from "./ProposalSections/components/BMI";
import NSTP from "./ProposalSections/components/NSTP";
import ProductSummary from "./ProposalSections/components/ProductSummary";
import { MobileHeader, MobileHeaderText } from "./ProposalPage.style";
import {
  clearProposalData,
  getProposalData,
  setIsLoading,
  submitProposalData,
} from "./ProposalSections/ProposalSections.slice";
import ReviewCart from "../ProductDetails/components/ReviewCart";
import PencilIcon from "../../assets/svg-icons/PencilIcon";
import { getProposalFields } from "./schema.slice";
import useUrlQuery from "../../customHooks/useUrlQuery";
import ProductSummaryMobile from "./ProposalSections/components/ProductSummaryMobile";
import ProductSummaryTab from "./ProposalSections/components/ProductSummaryTab";
import PlanUnavailable from "./ProposalSections/components/PlanUnavailable";
import Card from "../../components/Card";
import { Col, Container, Row } from "react-bootstrap";
import SpinLoader from "../../components/Common/SpinLoader/SpinLoader";

/* ===============================test================================= */

/* ===============================test================================= */
const ProposalPage = ({ history }) => {
  let groupCode = useSelector(({ quotePage }) => quotePage.selectedGroup);

  const [active, setActive] = useState(0);
  const { currentSchema } = useSelector((state) => state.schema);
  const queryStrings = useUrlQuery();
  const enquiryId = queryStrings.get("enquiryId");
  //const currentSchema = starSchema;
  const cart = useSelector((state) => state.cart);
  const [listOfForms, setListOfForms] = useState([]);

  useEffect(() => {
    if (currentSchema instanceof Object)
      setListOfForms(Object.keys(currentSchema));
  }, [currentSchema]);
  const dispatch = useDispatch();
  const { activeIndex, proposalData } = useSelector(
    (state) => state.proposalPage
  );
  useEffect(() => {
    if (listOfForms.length && active >= listOfForms.length) {
      dispatch(
        submitProposalData(() => {
          history.push("/proposal_summary?enquiryId=" + enquiryId);
        })
      );
    }
  }, [active]);

  useEffect(() => {
    dispatch(getProposalFields());
    if (!Object.keys(proposalData).length) dispatch(getProposalData());
    dispatch(getCart());
  }, []);
  useEffect(() => {
    setActive(activeIndex);
  }, [activeIndex]);

  const form = (active, defaultData) => {
    let activeForm = listOfForms[active];
    console.log(activeForm, active, "dgsaadsg");

    if (active >= listOfForms.length && listOfForms.length) {
      return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          {/* <span className="lds-dual-ring colored--loader"></span> */}
          <p>Submitting Proposal, Please Wait</p>
          <SpinLoader proposalpage={true} />
        </div>
      );
    }
    if (!listOfForms.length) {
      <div style={{ textAlign: "center" }}>
        <p>Proposal Page not found against this IC</p>
      </div>;
    }
    return (
      <span
        css={`
          & .proposal_continue_back_margin {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          & .formbuilder__error {
            color: #c7222a;
          }
        `}
      >
        <Card
          onClick={() => {
            setActive(0);
          }}
          styledCss={`
          margin-bottom: 20px; 
          cursor:pointer;
        `}
        >
          {activeForm === "Proposer Details" ? (
            <>
              {" "}
              <MainTitle bg>{activeForm}</MainTitle>{" "}
              <ProposerDetails
                key={activeForm}
                schema={
                  currentSchema ? Object.values(currentSchema[activeForm]) : []
                }
                setActive={setActive}
                name={activeForm}
                defaultValue={defaultData}
              />
            </>
          ) : (
            <span
              css={`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <MainTitle>Proposer Details</MainTitle>
              <div
                css={`
                  width: 30px;
                  display: ${!proposalData[listOfForms[0]] && "none"};
                  height: 30px;
                  background: #eff7ff;
                  border-radius: 100%;
                  display: flex;
                  color: #369cff;
                  align-items: center;
                  justify-content: center;
                  font-size: 13px;
                `}
                className="btn"
              >
                <i class="fas fa-pen"></i>
              </div>
            </span>
          )}
        </Card>
        <Card
          styledCss={`margin-bottom: 20px;`}
          onClick={() => {
            setActive(1);
          }}
        >
          {activeForm === "Insured Details" ? (
            <>
              {" "}
              <MainTitle bg>{activeForm}</MainTitle>{" "}
              <InsuredDetails
                key={activeForm}
                schema={currentSchema ? currentSchema[activeForm] : {}}
                setActive={setActive}
                name={activeForm}
                defaultValue={defaultData}
              />
            </>
          ) : (
            <span
              css={`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <MainTitle>Insured Details</MainTitle>
              <div
                css={`
                  width: 30px;
                  display: ${!proposalData[listOfForms[1]] && "none"};
                  height: 30px;
                  background: #eff7ff;
                  border-radius: 100%;
                  display: flex;
                  color: #369cff;
                  align-items: center;
                  justify-content: center;
                  font-size: 13px;
                `}
                className="btn"
              >
                <i class="fas fa-pen"></i>
              </div>
            </span>
          )}
        </Card>
        <Card
          styledCss={`margin-bottom: 20px;`}
          onClick={() => {
            setActive(2);
          }}
        >
          {activeForm === "Medical Details" ? (
            <>
              {" "}
              <MainTitle bg>{activeForm}</MainTitle>{" "}
              <InsuredDetails
                key={activeForm}
                schema={currentSchema ? currentSchema[activeForm] : {}}
                setActive={setActive}
                name={activeForm}
                defaultValue={defaultData}
              />
            </>
          ) : (
            <span
              css={`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <MainTitle>Medical Details</MainTitle>

              <div
                css={`
                  width: 30px;
                  display: ${!proposalData[listOfForms[2]] && "none"};
                  height: 30px;
                  background: #eff7ff;
                  border-radius: 100%;
                  display: flex;
                  color: #369cff;
                  align-items: center;
                  justify-content: center;
                  font-size: 13px;
                `}
                className="btn"
              >
                <i class="fas fa-pen"></i>
              </div>
            </span>
          )}
        </Card>
        <Card
          styledCss={`margin-bottom: 20px;`}
          onClick={() => {
            setActive(3);
          }}
        >
          {activeForm === "Other Details" ? (
            <>
              {" "}
              <MainTitle bg>{activeForm}</MainTitle>{" "}
              <InsuredDetails
                key={activeForm}
                schema={currentSchema ? currentSchema[activeForm] : {}}
                setActive={setActive}
                name={activeForm}
                defaultValue={defaultData}
              />
            </>
          ) : (
            <span
              css={`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <MainTitle>Other Details</MainTitle>
              <div
                css={`
                  width: 30px;
                  display: ${!proposalData[listOfForms[3]] && "none"};
                  height: 30px;
                  background: #eff7ff;
                  border-radius: 100%;
                  display: flex;
                  color: #369cff;
                  align-items: center;
                  justify-content: center;
                  font-size: 13px;
                `}
                className="btn"
              >
                <i class="fas fa-pen"></i>
              </div>
            </span>
          )}
        </Card>
      </span>
    );
  };
  return (
    <>
      <MobileHeader>
        <MobileHeaderText>Proposal Form </MobileHeaderText>
      </MobileHeader>
      <div
        className="container-fluid mt-20 pb-100"
        css={`
          padding-bottom: 41px;
          @media (max-width: 1024px) {
            margin: 0;
            padding: 0 !important;
          }
        `}
      >
        <div
          className="element-section mb-30"
          css={`
            // margin: 30px auto;
            // max-width: 1300px;
            margin: 30px;
            @media (max-width: 1024px) {
              margin: 0;
              padding: 0;
            }
          `}
        >
          <div>
            <Row
              css={`
              justify-content: center;
                @media (max-width: 1024px) {
                  margin: 0;
                  padding: 0;
                  & > div {
                    margin-right: 0;
                    margin-left: 0;
                    padding-right: 0;
                    padding-left: 0;
                  }
                }
              `}
            >
              
                <div
                  css={`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 10px;
                  `}
                >
                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      history.goBack();
                    }}
                    css={`
                      width: max-content;
                      margin-left: -9px;

                      color: var(--abc-red);
                      font-size: 17px;
                      display: flex;
                      align-items: center;
                      @media (max-width: 1024px) {
                        padding: 10px 20px;
                      }
                    `}
                  >
                    <div
                      className="d-flex justify-content-center align-items-center"
                      css={`
                        background: #f1f4f8;
                        width: 35px;
                        margin-right: 20px;
                        border-radius: 100%;
                        height: 35px;
                        color: #707b8b;
                      `}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </div>
                    <span
                      css={`
                        color: #3b4c69;
                        font-weight: 600;
                      `}
                    >
                      Go Back
                    </span>
                  </button>
                  <span
                    css={`
                      font-weight: 900;
                      color: #505f79;
                      @media (max-width: 1024px) {
                        display: none;
                      }
                    `}
                  >
                    You are Just 5 minutes away from investing for your future
                  </span>
                </div>
             <div css={` @media (min-width: 1025px) {
                 display:flex; flex-direction: row; 
                }`}>

              <div
                // lg={4}
                // md={12}
                css={`

                @media (min-width: 1025px) {
                  max-width: 330px;
                  min-width: 330px;
                  margin-right: 26px;
                 }

                margin-bottom: 20px;
               
                @media (max-width: 1024px) {
                  width: 100%;
                }
                `}
                >
                {console.log(groupCode, "groupCode")}
                <ProductSummary cart={cart} setActive={setActive} />
                {/* {groupCode ? (
                  <ReviewCart groupCode={groupCode} unEditable={true} />
                  ) : (
                    ""
                  )} */}
              </div>
              <div
                // lg={8}
                // md={12}
                css={`
                width: 100%;
                @media (max-width: 1024px) {
                  width: 100%;
                }
                `}
                >
                {form(active, proposalData[listOfForms[active]])}
              </div>
          </div>
            </Row>
          </div>

          {/* <div
            className="element-tile-two"
            style={{ width: "100%" }}
            css={`
              @media (min-width: 768px) and (max-width: 1200px) {
                font-size: 18px;
              }
            `}
          >
            You are Just 5 minutes away from investing for your future
          </div>
          <div className="row margin_top_tab_proposal">
            <div class="col-lg-12 col-md-12 no-padding-mobile">
              <FormGrid
                active={active}
                setActive={setActive}
                listOfForms={listOfForms}
              />

              <ProductSummary cart={cart} setActive={setActive} />
            </div>
          </div>
          {form(active, proposalData[listOfForms[active]])} */}
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <ProductSummaryTab cart={cart} />
          </div> */}
        </div>
      </div>

      {/* <div
        css={`
          @media (max-width: 1199px) {
            display: block;
          }
          @media (min-width: 1200px) {
            display: none;
          }
        `}
      >
        <ProductSummaryMobile cart={cart} />
      </div> */}
      <PlanUnavailable />
      <BMI />
      <NSTP />
    </>
  );
};

export default ProposalPage;

const MainTitle = styled.h2`
  margin-left: 3px;
  margin-bottom: ${(props) => (props.bg ? "15px" : "10")};
  margin-top: ${(props) => (props.bg ? "15px" : "10")};
  font-weight: 900;

  background: ${(props) =>
    props.bg && " linear-gradient(90deg, #eff7ff 0%,rgb(255 255 255) 100%)"};
  color: ${(props) => props.bg && "#0a87ff;"};
  font-size: 21px;
  padding: 10px;
`;
