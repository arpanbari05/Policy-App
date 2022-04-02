import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecureLS from "secure-ls";
import styled from "styled-components/macro";
import { useHistory, useParams, Link } from "react-router-dom";
import FormGrid from "../../components/Common/FormGrid/FormGrid";
import ProposalSummary from "../../components/Common/ProposalSummary/ProposalSummary";
import { getCart } from "../Cart/cart.slice";
import { FaChevronLeft, FaPen, FaRegEdit } from "react-icons/fa";
import { MdOutlineArrowBackIos } from "react-icons/md";
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
  setSelectedIcs,
  setActiveIndex,
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
import {
  useTheme,
  useUrlEnquiry,
  useCart,
  useShareFunctionality,
  useRevisedPremiumModal,
} from "../../customHooks";
import { Page } from "../../components";
import GoBackButton from "../../components/GoBackButton";
import ShareQuoteModal from "../../components/ShareQuoteModal";
import useComparePage from "../ComparePage/useComparePage";
import { mobile } from "../../utils/mediaQueries";
import { useGetCartQuery } from "../../api/api";
// import dummy from "./dumySchema";
/* ===============================test================================= */

/* ===============================test================================= */
const ProposalPage = () => {
  const history = useHistory();

  const [continueBtnClick, setContinueBtnClick] = useState(false);

  const [memberGroups, setMemberGroups] = useState([]);

  const [bmiFailBlock, setBmiFailBlock] = useState(false);

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const [active, setActive] = useState(0);

  const [proposerDactive, setProposerDactive] = useState(true);

  const { currentSchema } = useSelector(state => state.schema);
  // const currentSchema = dummy;

  const queryStrings = useUrlQuery();

  const enquiryId = queryStrings.get("enquiryId");

  const [activateLoader, setActivateLoader] = useState(false);

  let { cartEntries } = useCart();

  const [listOfForms, setListOfForms] = useState([]);

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
  } = useSelector(state => state.proposalPage);

  const {
    colors: { primary_color, primary_shade },
  } = useTheme();

  const PrimaryColor = primary_color;

  const PrimaryShade = primary_shade;

  const backButtonForNav = (
    <Link
      className="back_btn_navbar"
      style={{ color: primary_color }}
      to={getUrlWithEnquirySearch(
        `/productdetails/${Math.max(...memberGroups)}`,
      )}
    >
      <MdOutlineArrowBackIos />
    </Link>
  );

  useEffect(() => {
    if (
      failedBmiData &&
      Object.keys(proposalData["Insured Details"]).length === 1
    ) {
      setBmiFailBlock(true);
      setActive(1);
    } else setBmiFailBlock(false);
  }, [failedBmiData]);

  useEffect(() => {
    dispatch(getProposalFields());
    dispatch(getProposalData());
    dispatch(getCart());
    setMemberGroups(cartEntries.map(cartItem => cartItem.group.id));
  }, []);

  useEffect(() => {
    setActive(activeIndex);
  }, [activeIndex]);
  const revisedPremiumPopupUtilityObject = useRevisedPremiumModal();
  // to get unfilled form

  useEffect(() => {
    console.log(continueBtnClick, activeIndex, "test");
    if (
      Object.keys(proposalData).length &&
      continueBtnClick &&
      activeIndex === false
    ) {
      let unfilledInfoTabIndex;

      listOfForms.find(e => {
        if (!proposalData[e] || !Object.keys(proposalData[e]).length) {
          return (unfilledInfoTabIndex = listOfForms.indexOf(e));

          // setActive((prev) => prev + 1)
        }
      });

      if (!unfilledInfoTabIndex && !isPopupOn) {
        setActivateLoader(true);
        dispatch(
          submitProposalData(() => {
            history.replace("/proposal_summary?enquiryId=" + enquiryId);
            setContinueBtnClick(false);
            setActivateLoader(false);
          }),
        );
      } else {
        setActive(unfilledInfoTabIndex);
      }
      dispatch(setActiveIndex(unfilledInfoTabIndex || activeIndex));
    } else {
      setActive(activeIndex);
    }
  }, [activeIndex, proposalData, isPopupOn]);

  // to stop loader on cancle cta error popup
  useEffect(() => {
    if (!showErrorPopup.show) {
      setActivateLoader(false);
    }
  }, [showErrorPopup]);

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
            // position: absolute;
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
              </MainTitle>
              <ProposerDetails
                key={activeForm}
                schema={
                  currentSchema ? Object.values(currentSchema[activeForm]) : []
                }
                active={active}
                setActive={setActive}
                name={activeForm}
                continueSideEffects={() => {
                  setContinueBtnClick(true);
                }}
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
                continueSideEffects={() => {
                  setContinueBtnClick(true);
                }}
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
          {activeForm === "Medical Details" && !bmiFailBlock ? (
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
                continueSideEffects={() => {
                  setContinueBtnClick(true);
                }}
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
                proposalData["Insured Details"] &&
                  !bmiFailBlock &&
                  setActive(2);
              }}
            >
              <MainTitle PrimaryColor={PrimaryColor}>Medical Details</MainTitle>
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
                continueSideEffects={() => {
                  setContinueBtnClick(true);
                }}
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
              {proposalData[listOfForms[2]] && (
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
    <Page
      noNavbarForMobile={true}
      id="proposalPage"
      backButton={backButtonForNav}
    >
      <MobileHeader
        css={`
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
