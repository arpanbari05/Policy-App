import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecureLS from "secure-ls";
import styled from "styled-components/macro";
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
import { getProposalFields } from "./schema.slice";
import useUrlQuery from "../../customHooks/useUrlQuery";
import ProductSummaryMobile from "./ProposalSections/components/ProductSummaryMobile";
import ProductSummaryTab from "./ProposalSections/components/ProductSummaryTab";
import PlanUnavailable from "./ProposalSections/components/PlanUnavailable";
import Card from "../../components/Card";
import { Col, Container, Row } from "react-bootstrap";

/* ===============================test================================= */

/* ===============================test================================= */
const ProposalPage = ({ history }) => {
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
          <span className="lds-dual-ring colored--loader"></span>
          <p>Submitting Proposal, Please Wait</p>
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
            justify-content: center;
            align-items: center;
          }
          & .formbuilder__error {
            color: #c7222a;
          }
        `}
      >
        <Card
          styledCss={`margin-bottom: 20px; 
    
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
              <a
                css={`
                  font-size: 20px;
                  display: ${!proposalData[listOfForms[0]] && "none"};
                  position: relative;
                  color: black;
                  top: -7px;
                `}
                onClick={() => {
                  setActive(0);
                }}
              >
                <FaRegEdit />
              </a>
            </span>
          )}
        </Card>
        <Card styledCss={`margin-bottom: 20px;`}>
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
              <a
                css={`
                  font-size: 20px;
                  display: ${!proposalData[listOfForms[1]] && "none"};
                  position: relative;
                  top: -7px;
                `}
                onClick={() => {
                  setActive(1);
                }}
              >
                <FaRegEdit />
              </a>
            </span>
          )}
        </Card>
        <Card styledCss={`margin-bottom: 20px;`}>
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
              <a
                css={`
                  font-size: 20px;
                  display: ${!proposalData[listOfForms[2]] && "none"};
                  position: relative;
                  color: black;
                  top: -7px;
                `}
                onClick={() => {
                  setActive(2);
                }}
              >
                <FaRegEdit />
              </a>
            </span>
          )}
        </Card>
        <Card styledCss={`margin-bottom: 20px;`}>
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
              <a
                css={`
                  font-size: 20px;
                  display: ${!proposalData[listOfForms[3]] && "none"};
                  position: relative;
                  color: black;
                  top: -7px;
                `}
                onClick={() => {
                  setActive(3);
                }}
              >
                <FaRegEdit />
              </a>
            </span>
          )}
        </Card>
      </span>
    );
    switch (activeForm) {
      case "Proposer Details":
        return (
          <Card styledCss={`margin-bottom: 20px;`}>
            <MainTitle>{activeForm}</MainTitle>
            <ProposerDetails
              key={activeForm}
              schema={
                currentSchema ? Object.values(currentSchema[activeForm]) : []
              }
              setActive={setActive}
              name={activeForm}
              defaultValue={defaultData}
            />
          </Card>
        );
      case "Insured Details":
        return (
          <InsuredDetails
            key={activeForm}
            schema={currentSchema ? currentSchema[activeForm] : {}}
            setActive={setActive}
            name={activeForm}
            defaultValue={defaultData}
          />
        );
      case "Medical Details":
        return (
          <InsuredDetails
            key={activeForm}
            schema={currentSchema ? currentSchema[activeForm] : {}}
            setActive={setActive}
            name={activeForm}
            defaultValue={defaultData}
          />
        );
      case "Other Details":
        return (
          <InsuredDetails
            key={activeForm}
            schema={currentSchema ? currentSchema[activeForm] : {}}
            setActive={setActive}
            name={activeForm}
            defaultValue={defaultData}
          />
        );
      default:
        return (
          <ProposerDetails
            key={activeForm}
            schema={currentSchema ? currentSchema[activeForm] : []}
            setActive={setActive}
            name={activeForm}
            defaultValue={defaultData}
          />
        );
    }
  };
  return (
    <>
      <MobileHeader>
        <MobileHeaderText
          onClick={() => {
            history.goBack();
          }}
        >
          <i className="icon flaticon-back"></i> Proposal Form
        </MobileHeaderText>
      </MobileHeader>
      <div className="container-fluid mt-20 pb-100">
        <div
          className="element-section mb-30"
          css={`
            margin: 30px;
          `}
        >
          <div
            className="go_back_prposal_p"
            css={`
              width: 100%;
            `}
            onClick={() => {
              history.goBack();
            }}
          >
            <i className="icon flaticon-back" style={{ width: "27px" }}></i> Go
            Back
          </div>

          <div>
            <Row
            // css={`
            //   max-width: 1250px;
            // `}
            >
              <Col
                md={3}
                css={`
                  margin-bottom: 20px;
                `}
              >
                <ProductSummary cart={cart} />
              </Col>
              <Col md={9}>
                {form(active, proposalData[listOfForms[active]])}
              </Col>
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

      <div
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
      </div>
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
    props.bg && " linear-gradient(90deg, #eaeef2 0%,rgb(255 255 255) 100%)"};
  color: ${(props) => props.bg && "#7074a1"};
  font-size: 21px;
  padding: 10px;
`;
