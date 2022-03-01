import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecureLS from "secure-ls";
import styled from "styled-components/macro";
import { useHistory, useParams, Link } from "react-router-dom";
import FormGrid from "../../components/Common/FormGrid/FormGrid";
import ProposalSummary from "../../components/Common/ProposalSummary/ProposalSummary";
import { getCart } from "../Cart/cart.slice";
import { FaChevronLeft, FaPen, FaRegEdit } from "react-icons/fa";
import { starSchema } from "./ProposalDetailsSchema";
import { InsuredDetails, ProposerDetails } from "./ProposalSections";
import BMI from "./ProposalSections/components/BMI";
import NSTP from "./ProposalSections/components/NSTP";
import ProductSummary from "./ProposalSections/components/ProductSummary";
import { MobileHeader, MobileHeaderText } from "./ProposalPage.style";
import ErrorPopup from "./ProposalSections/components/ErrorPopup";
import {
  clearProposalData,
  getProposalData,
  setIsLoading,
  submitProposalData,
} from "./ProposalSections/ProposalSections.slice";
import { setShowErrorPopup } from "./ProposalSections/ProposalSections.slice";
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
import { useTheme,useUrlEnquiry, useCart } from "../../customHooks";
import { Page } from "../../components";

/* ===============================test================================= */

/* ===============================test================================= */
const ProposalPage = () => {
  const history = useHistory();
  const [memberGroups,setMemberGroups] = useState([]);
  const { getUrlWithEnquirySearch } = useUrlEnquiry();
  const [active, setActive] = useState(0);
  const [proposerDactive, setProposerDactive] = useState(true);
  const { currentSchema } = useSelector(state => state.schema);
  const queryStrings = useUrlQuery();
  const enquiryId = queryStrings.get("enquiryId");
  //const currentSchema = starSchema;
  let {cartEntries} = useCart();
  
  
  const [listOfForms, setListOfForms] = useState([]);
  
  // const membersGroup = Object.keys(cart).filter(key => parseInt(key) !== NaN);
  

  console.log("sfjnvl", useCart());
  const { showErrorPopup } = useSelector(({ proposalPage }) => proposalPage);

  useEffect(() => {
    if (currentSchema instanceof Object)
      setListOfForms(Object.keys(currentSchema));
  }, [currentSchema]);
  const dispatch = useDispatch();
  const { activeIndex, proposalData } = useSelector(
    state => state.proposalPage,
  );
  console.log("wvbiwrvbwhxxx",cartEntries.map(cartItem => cartItem.group.id));

  const {
    colors: { primary_color, primary_shade },
  } = useTheme();

  const PrimaryColor = primary_color;
  const PrimaryShade = primary_shade;

  useEffect(() => {
    if (listOfForms.length && active >= listOfForms.length) {
      dispatch(
        submitProposalData(() => {
          history.push("/proposal_summary?enquiryId=" + enquiryId);
        }),
      );
    }
  }, [active]);

  useEffect(() => {
    dispatch(getProposalFields());
    // if (!Object.keys(proposalData).length) 
    dispatch(getProposalData());
    dispatch(getCart());
    setMemberGroups(cartEntries.map(cartItem => cartItem.group.id));
  }, []);
  useEffect(() => {
    setActive(activeIndex);
  }, [activeIndex]);

  const form = (active, defaultData) => {
    let activeForm = listOfForms[active];

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
            font-size: 12px;
            position: absolute;
            
          }
        `}
      >
        <Card
          styledCss={`
          margin-bottom: 20px; 
          cursor:pointer;
        `}
        >
          {activeForm === "Proposer Details" && proposerDactive ? (
            <>
              {" "}
              <MainTitle
                PrimaryColor={PrimaryColor}
                bg={`linear-gradient(90deg, ${PrimaryShade} 0%,rgb(255 255 255) 100%)`}
              >
                {activeForm}
              </MainTitle>{" "}
              <ProposerDetails
                key={activeForm}
                schema={
                  currentSchema ? Object.values(currentSchema[activeForm]) : []
                }
                active={active}
                setActive={setActive}
                name={activeForm}
                defaultValue={defaultData}
                setProposerDactive={setProposerDactive}
              />
            </>
          ) : (
            <span
              css={`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
              onClick={() => {
                setActive(0);
                setProposerDactive(true);
              }}
            >
              <MainTitle PrimaryColor={PrimaryColor}>
                Proposer Details
              </MainTitle>
              
                <div
                  css={`
                    width: 30px;
                    height: 30px;
                    background: ${PrimaryShade};
                    border-radius: 100%;
                    display: flex;
                    color: ${PrimaryColor};
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                  `}
                  className="btn p-0"
                >
                  <FaPen />
                </div>
          
            </span>
          )}
        </Card>
        <Card styledCss={`margin-bottom: 20px;`}>
          {activeForm === "Insured Details" ? (
            <>
              {" "}
              <MainTitle
                PrimaryColor={PrimaryColor}
                bg={`linear-gradient(90deg, ${PrimaryShade} 0%,rgb(255 255 255) 100%)`}
              >
                {activeForm}
              </MainTitle>{" "}
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
              onClick={() => {
                proposalData["Proposer Details"] && setActive(1);
              }}
            >
              <MainTitle PrimaryColor={PrimaryColor}>Insured Details</MainTitle>
              {proposalData[listOfForms[0]] && (
                <div
                  css={`
                    width: 30px;
                    height: 30px;
                    background: ${PrimaryShade};
                    border-radius: 100%;
                    display: flex;
                    color: ${PrimaryColor};
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                  `}
                  className="btn p-0"
                >
                  <FaPen />
                </div>
              )}
            </span>
          )}
        </Card>
        <Card styledCss={`margin-bottom: 20px;`}>
          {activeForm === "Medical Details" ? (
            <>
              {" "}
              <MainTitle
                PrimaryColor={PrimaryColor}
                bg={`linear-gradient(90deg, ${PrimaryShade} 0%,rgb(255 255 255) 100%)`}
              >
                {activeForm}
              </MainTitle>{" "}
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
              onClick={() => {
                proposalData["Insured Details"] && setActive(2);
              }}
            >
              <MainTitle PrimaryColor={PrimaryColor}>Medical Details</MainTitle>
              {proposalData[listOfForms[1]] && (
                <div
                  css={`
                    width: 30px;
                    display: ${!proposalData[listOfForms[2]] && "none"};
                    height: 30px;
                    background: ${PrimaryShade};
                    border-radius: 100%;
                    display: flex;
                    color: ${PrimaryColor};
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                  `}
                  className="btn p-0"
                >
                  <FaPen />
                </div>
              )}
            </span>
          )}
        </Card>
        <Card styledCss={`margin-bottom: 20px;`}>
          {activeForm === "Other Details" ? (
            <>
              {" "}
              <MainTitle
                PrimaryColor={PrimaryColor}
                bg={`linear-gradient(90deg, ${PrimaryShade} 0%,rgb(255 255 255) 100%)`}
              >
                Nominee Details
              </MainTitle>{" "}
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
              onClick={() => {
                proposalData["Medical Details"] && setActive(3);
              }}
            >
              <MainTitle PrimaryColor={PrimaryColor}>Nominee Details</MainTitle>
              {
                proposalData[listOfForms[2]] && (
                  <div
                css={`
                  width: 30px;
                  display: ${!proposalData[listOfForms[3]] && "none"};
                  height: 30px;
                  background: ${PrimaryShade};
                  border-radius: 100%;
                  display: flex;
                  color: ${PrimaryColor};
                  align-items: center;
                  justify-content: center;
                  font-size: 13px;
                `}
                className="btn p-0"
              >
                <FaPen />
              </div>
                )
              }
              
            </span>
          )}
        </Card>
      </span>
    );
  };
  return (
    <Page>
      <MobileHeader
        css={`
          background: ${PrimaryColor};
        `}
      >
        <Link
        to={getUrlWithEnquirySearch(`/productdetails/${Math.max(...memberGroups)}`)}
          // onClick={() => {
          //   history.push({ pathname: getUrlWithEnquirySearch("/proposal") });
          // }}
        >
        <MobileHeaderText>
          <i
            class="fa fa-arrow-circle-left"
            style={{ marginRight: "10px", cursor: "pointer" }}
          ></i>{" "}
          Proposal Form
          </MobileHeaderText>
        </Link>
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
            margin: 10px 30px 30px 30px;
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
              {/* <div
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
                    <FaChevronLeft />
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
              </div> */}
              <div
                css={`
                  @media (min-width: 1025px) {
                    display: flex;
                    flex-direction: row;
                  }
                `}
              >
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
                  <ProductSummary setActive={setActive} />
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
                  {console.log(proposalData)}
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
      {showErrorPopup.show && (
        <ErrorPopup
          show={showErrorPopup.show}
          head={showErrorPopup.head}
          msg={showErrorPopup.msg}
          handleClose={() =>
            dispatch(
              setShowErrorPopup({
                show: false,
                head: "",
                msg: "",
              }),
            )
          }
        />
      )}
    </Page>
  );
};

export default ProposalPage;

const MainTitle = styled.h2`
  margin-left: 3px;
  margin-bottom: ${props => (props.bg ? "15px" : "10")};
  margin-top: ${props => (props.bg ? "15px" : "10")};
  font-weight: 900;

  background: ${props => props.bg};
  color: ${props => props.bg && props.PrimaryColor};
  font-size: 21px;
  padding: 10px;
`;
