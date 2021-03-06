import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { BackButtonMobile, Page } from "../../components";
import Card from "../../components/Card";
import SpinLoader from "../../components/Common/SpinLoader/SpinLoader";
import GoBackButton from "../../components/GoBackButton";
import ShareQuoteModal from "../../components/ShareQuoteModal";
import {
  useCart,
  useCompanies,
  useFrontendBoot,
  useTheme,
  useUrlEnquiry,
  useUSGIDiscounts,
} from "../../customHooks";
import { mobile } from "../../utils/mediaQueries";
import { getCart } from "../Cart/cart.slice";
import EditMemberFilter from "../quotePage/components/filters/EditMemberFilter";
import { InsuredDetails, ProposerDetails } from "./ProposalSections";
import BMI from "./ProposalSections/components/BMI";
import ErrorPopup from "./ProposalSections/components/ErrorPopup";
import NSTP from "./ProposalSections/components/NSTP";
import PlanUnavailable from "./ProposalSections/components/PlanUnavailable";
import ProductSummary from "./ProposalSections/components/ProductSummary";
import {
  getProposalData,
  setShowErrorPopup,
} from "./ProposalSections/ProposalSections.slice";
import { getProposalFields } from "./schema.slice";

/* ===============================test================================= */

/* ===============================test================================= */
const ProposalPage = () => {
  const [prepairingPtoposal, setPrepairingProposal] = useState(false);

  let blockTabSwitch = false;

  const setBlockTabSwitch = val => (blockTabSwitch = val);

  const [memberGroups, setMemberGroups] = useState([]);

  const [bmiFailBlock, setBmiFailBlock] = useState(false);

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const { subJourneyType } = useFrontendBoot();

  const [active, setActive] = useState(0);

  const [proposerDactive, setProposerDactive] = useState(true);

  const { currentSchema } = useSelector(state => state.schema);
  // const currentSchema = dummy;
  const [activateLoader, setActivateLoader] = useState(false);

  const { getCompany } = useCompanies();

  let { cartEntries } = useCart();

  const company_alias = cartEntries[0]?.product?.company?.alias;

  const company = getCompany(company_alias);

  const enableEditMembers = company?.allows_proposal_updation_on_renewal === 1; // array of ICs for which edit members functionality should be displayed.

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

  const { activeIndex, proposalData, showErrorPopup, failedBmiBlockJourney } =
    useSelector(state => state.proposalPage);

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
              <MainTitle
                primaryColor={PrimaryColor}
                bg={`linear-gradient(90deg, ${PrimaryShade} 0%,rgb(255 255 255) 100%)`}
              >
                <span>{activeForm}</span>
                {activeForm === "Insured Details" &&
                  subJourneyType === "renewal" &&
                  enableEditMembers && (
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
                shouldFollowPath
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
                  insurersFor={cartEntries?.map(
                    cart => cart?.product?.company?.alias,
                  )}
                  stage="PROPOSAL"
                  sum_insured={sum_insured}
                  purpose="proposalDetail"
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
                    purpose="proposalDetail"
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
                    {form(active, proposalData[listOfForms[active]])}
                  </div>
                </div>
              </Row>
            </div>
          </div>
        </div>

        <PlanUnavailable />
        <BMI />
        <NSTP />

        {showErrorPopup.show && (
          <ErrorPopup
            show={showErrorPopup.show}
            head={showErrorPopup.head}
            msg={showErrorPopup.msg}
            handleClose={() => {
              dispatch(
                setShowErrorPopup({
                  show: false,
                  head: "",
                  msg: "",
                }),
              );
              showErrorPopup?.handleClose && showErrorPopup?.handleClose();
            }}
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
