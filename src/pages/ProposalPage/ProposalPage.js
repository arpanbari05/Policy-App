import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecureLS from "secure-ls";
import styled from "styled-components/macro";
import { useHistory, useParams, Link } from "react-router-dom";
import FormGrid from "../../components/Common/FormGrid/FormGrid";
import ProposalSummary from "../../components/Common/ProposalSummary/ProposalSummary";
import { getCart } from "../Cart/cart.slice";
import { FaPen } from "react-icons/fa";
import { MdOutlineArrowBackIos } from "react-icons/md";

import { InsuredDetails, ProposerDetails } from "./ProposalSections";
import BMI from "./ProposalSections/components/BMI";
import NSTP from "./ProposalSections/components/NSTP";
import ProductSummary from "./ProposalSections/components/ProductSummary";
import { MobileHeader, MobileHeaderText } from "./ProposalPage.style";
import ErrorPopup from "./ProposalSections/components/ErrorPopup";
import { getProposalData } from "./ProposalSections/ProposalSections.slice";
import {
  setShowErrorPopup,
  getMedicalUrlsRuleEngine,
} from "./ProposalSections/ProposalSections.slice";

import { getProposalFields } from "./schema.slice";

import PlanUnavailable from "./ProposalSections/components/PlanUnavailable";
import Card from "../../components/Card";
import { Row } from "react-bootstrap";
import SpinLoader from "../../components/Common/SpinLoader/SpinLoader";
import {
  useTheme,
  useUrlEnquiry,
  useCart,
  useUSGIDiscounts,
} from "../../customHooks";
import { Page } from "../../components";
import GoBackButton from "../../components/GoBackButton";
import ShareQuoteModal from "../../components/ShareQuoteModal";
import { mobile } from "../../utils/mediaQueries";
import { BackButtonMobile } from "../../components";
import { TraceId } from "../../components/Navbar";
import EditMemberFilter from "../quotePage/components/filters/EditMemberFilter";

import dummy from "./dumySchema";
/* ===============================test================================= */

/* ===============================test================================= */
const ProposalPage = () => {
  const [prepairingPtoposal, setPrepairingProposal] = useState(false);
  let blockTabSwitch = false;
  const setBlockTabSwitch = val => (blockTabSwitch = val);
  const [memberGroups, setMemberGroups] = useState([]);

  const [bmiFailBlock, setBmiFailBlock] = useState(false);

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const [active, setActive] = useState(0);

  const [proposerDactive, setProposerDactive] = useState(true);

  const { currentSchema } = useSelector(state => state.schema);
  // const currentSchema = dummy;
  const [activateLoader, setActivateLoader] = useState(false);

  let { cartEntries } = useCart();

  const sum_insured = cartEntries?.map(cart => ({
    [cart?.product?.name]: cart?.sum_insured,
  }));

  const [listOfForms, setListOfForms] = useState([]);

  const totalPremium = useUSGIDiscounts();

  useEffect(() => {
    if (currentSchema instanceof Object)
      setListOfForms(Object.keys(currentSchema));
  }, [currentSchema]);

  const dispatch = useDispatch();

  const {
    activeIndex,
    proposalData,
    showErrorPopup,
    showBMI,
    failedBmiData,
    isPopupOn,
    failedBmiBlockJourney,
  } = useSelector(state => state.proposalPage);

  const {
    colors: { primary_color, primary_shade },
  } = useTheme();

  const PrimaryColor = primary_color;

  const PrimaryShade = primary_shade;

  const urlQueryStrings = new URLSearchParams(window.location.search);
  const EnquiryId = urlQueryStrings.get("enquiryId");

  useEffect(() => {
    if (failedBmiBlockJourney) {
      setBmiFailBlock(failedBmiBlockJourney);
      setActive(1);
    } else setBmiFailBlock(false);
  }, [failedBmiBlockJourney]);

  useEffect(() => {
    setPrepairingProposal(true);
    dispatch(getProposalFields());
    dispatch(getCart());
    setMemberGroups(cartEntries.map(cartItem => cartItem.group?.id));
    dispatch(getMedicalUrlsRuleEngine());
    dispatch(
      getProposalData(() => {
        setPrepairingProposal(false);
      }),
    );
  }, [EnquiryId]);

  useEffect(() => {
    setActive(activeIndex);
  }, [activeIndex]);

  // to stop loader on cancel cta error popup
  useEffect(() => {
    if (!showErrorPopup.show) {
      setActivateLoader(false);
    }
  }, [showErrorPopup]);

  useEffect(() => {
    const activeForm = listOfForms[active];
    const element = document.getElementById(
      activeForm?.toLowerCase()?.split(" ")?.join("_"),
    );
    const offset = element?.getBoundingClientRect()?.top - 100 + window.scrollY;
    console.log({ element, activeForm, offset });
    window.scroll({
      top: offset,
      behavior: "smooth",
    });
  }, [active]);

  const form = (active, defaultData) => {
    let activeForm = listOfForms[active];
    if (activateLoader) {
      return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          {/* <span className="lds-dual-ring colored--loader"></span> */}
          <p>Submitting Proposal, Please Wait</p>
          <SpinLoader proposalpage={true} />
        </div>
      );
    }
    if (prepairingPtoposal) {
      return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          {/* <span className="lds-dual-ring colored--loader"></span> */}
          <p>Preparing Proposal, Please Wait</p>
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
            margin-bottom: 0;
            // position: absolute;
          }
        `}
      >
        <Card
          styledCss={`
          margin-bottom: 20px; 
          cursor:pointer;
        `}
          id={"proposer_details"}
        >
          {activeForm === "Proposer Details" && proposerDactive ? (
            <>
              {" "}
              <MainTitle
                primaryColor={PrimaryColor}
                bg={`linear-gradient(90deg, ${PrimaryShade} 0%,rgb(255 255 255) 100%)`}
              >
                {activeForm}
              </MainTitle>
              <ProposerDetails
                key={activeForm}
                schema={
                  currentSchema ? Object.values(currentSchema[activeForm]) : []
                }
                active={active}
                setActive={setActive}
                name={activeForm}
                setActivateLoader={setActivateLoader}
                defaultValue={defaultData}
                setProposerDactive={setProposerDactive}
                setBlockTabSwitch={setBlockTabSwitch}
                listOfForms={listOfForms}
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
                !blockTabSwitch && setActive(0);
                setProposerDactive(true);
              }}
            >
              <MainTitle primaryColor={PrimaryColor}>
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

        <Card id={"insured_details"} styledCss={`margin-bottom: 20px;`}>
          {activeForm === "Insured Details" ? (
            <>
              {" "}
              {/* <EditMemberFilter redirectToQuotes={false} /> */}
              <MainTitle
                primaryColor={PrimaryColor}
                bg={`linear-gradient(90deg, ${PrimaryShade} 0%,rgb(255 255 255) 100%)`}
              >
                <span>{activeForm}</span>
                {activeForm === "Insured Details" && (
                  <EditMemberFilter redirectToQuotes={false} />
                )}
              </MainTitle>{" "}
              <InsuredDetails
                key={activeForm}
                schema={currentSchema ? currentSchema[activeForm] : {}}
                setActive={setActive}
                name={activeForm}
                setActivateLoader={setActivateLoader}
                defaultValue={defaultData}
                setBlockTabSwitch={setBlockTabSwitch}
                listOfForms={listOfForms}
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
                !blockTabSwitch &&
                  proposalData["Proposer Details"] &&
                  setActive(1);
              }}
            >
              <MainTitle primaryColor={PrimaryColor}>Insured Details</MainTitle>
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
        <Card id={"medical_details"} styledCss={`margin-bottom: 20px;`}>
          {activeForm === "Medical Details" && !bmiFailBlock ? (
            <>
              {" "}
              <MainTitle
                primaryColor={PrimaryColor}
                bg={`linear-gradient(90deg, ${PrimaryShade} 0%,rgb(255 255 255) 100%)`}
              >
                {activeForm}
              </MainTitle>{" "}
              <InsuredDetails
                key={activeForm}
                schema={currentSchema ? currentSchema[activeForm] : {}}
                setActive={setActive}
                name={activeForm}
                setActivateLoader={setActivateLoader}
                defaultValue={defaultData}
                setBlockTabSwitch={setBlockTabSwitch}
                listOfForms={listOfForms}
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
                proposalData["Insured Details"] &&
                  !blockTabSwitch &&
                  !bmiFailBlock &&
                  setActive(2);
              }}
            >
              <MainTitle primaryColor={PrimaryColor}>Medical Details</MainTitle>
              {proposalData[listOfForms[1]] && !bmiFailBlock && (
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
        <Card id={"other_details"} styledCss={`margin-bottom: 20px;`}>
          {activeForm === "Other Details" ? (
            <>
              {" "}
              <MainTitle
                primaryColor={PrimaryColor}
                bg={`linear-gradient(90deg, ${PrimaryShade} 0%,rgb(255 255 255) 100%)`}
              >
                Nominee Details
              </MainTitle>{" "}
              <InsuredDetails
                key={activeForm}
                schema={currentSchema ? currentSchema[activeForm] : {}}
                setActive={setActive}
                name={activeForm}
                setActivateLoader={setActivateLoader}
                defaultValue={defaultData}
                setBlockTabSwitch={setBlockTabSwitch}
                listOfForms={listOfForms}
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
                !blockTabSwitch &&
                  !bmiFailBlock &&
                  proposalData["Medical Details"] &&
                  setActive(3);
              }}
            >
              <MainTitle primaryColor={PrimaryColor}>Nominee Details</MainTitle>
              {proposalData[listOfForms[2]] && !bmiFailBlock && (
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
              )}
            </span>
          )}
        </Card>
      </span>
    );
  };
  return (
    <>
      <Page
        id="proposalPage"
        backButton={
          <BackButtonMobile
            path={getUrlWithEnquirySearch(
              `/productdetails/${Math.max(...memberGroups)}`,
            )}
          />
        }
      >
        {/* <MobileHeader
          css={`
            justify-content: space-between;
            background: ${PrimaryColor};
          `}
        >
          <Link
            to={getUrlWithEnquirySearch(
              `/productdetails/${Math.max(...memberGroups)}`,
            )}
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
          <ShareQuoteModal
            mobile
            insurersFor={cartEntries.map(cart => cart?.product?.company?.alias)}
            stage="PROPOSAL"
            sum_insured={sum_insured}
          />
        </MobileHeader> */}

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
            className="element-section mb-30 "
            css={`
              // margin: 30px auto;
              // max-width: 1300px;
              margin: 30px 30px 30px 30px;
              @media (max-width: 1024px) {
                margin: 0;
                padding: 0;
              }
            `}
          >
            <div
              className="container-fluid"
              css={`
                display: flex;
                align-items: center;
                justify-content: space-between;
                ${mobile} {
                  display: none;
                }
              `}
            >
              <GoBackButton
                backPath={getUrlWithEnquirySearch(
                  `/productdetails/${Math.max(...memberGroups)}`,
                )}
              />
              <div
                css={`
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 10px;
                `}
              >
                <span
                  css={`
                    font-weight: 900;
                    color: rgb(80, 95, 121);
                  `}
                >
                  You are Just 5 minutes away from investing for your future
                </span>
                <ShareQuoteModal
                  insurersFor={cartEntries.map(
                    cart => cart?.product?.company?.alias,
                  )}
                  stage="PROPOSAL"
                  sum_insured={sum_insured}
                />
              </div>
            </div>
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
                  <ShareQuoteModal
                    mobile
                    insurersFor={cartEntries.map(
                      cart => cart?.product?.company?.alias,
                    )}
                    stage="PROPOSAL"
                    sum_insured={sum_insured}
                    float
                  />
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
                    <ProductSummary
                      totalPremium={totalPremium}
                      setActive={setActive}
                    />
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
                    {console.log(
                      "qdbkhaffaf",
                      proposalData,
                      listOfForms[active],
                    )}
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
    </>
  );
};

export default ProposalPage;

const MainTitle = styled.h2`
  margin-left: 3px;
  margin-bottom: ${props => (props.bg ? "15px" : "10")};
  margin-top: ${props => (props.bg ? "15px" : "10")};
  font-weight: 900;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${props => props.bg};
  color: ${props => props.bg && props.primaryColor};
  font-size: 21px;
  padding: 10px;
`;
