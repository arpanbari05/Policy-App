import React, { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import CardSkeletonLoader from "../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import CardModal from "../../components/Common/Modal/CardModal";
import CardModalM from "../../components/Common/Modal/CardModelM";
import useWindowSize from "../../customHooks/useWindowSize";

import GoBack from "./components/GoBackBtn/GoBack";
import MobileHeader from "./components/MobileComp/Header";
import ShowDiffMobile from "./components/MobileComp/ShowDiffMobile";
import PlanContainerMobile from "./components/MobileComp/PlanContainerM";
import TBodyM from "./components/MobileComp/TBodyM";
import styled from "styled-components/macro";
import THeadM from "./components/MobileComp/THeadM";
import useUrlQuery from "../../customHooks/useUrlQuery";
import TBlank from "./components/tables/TBlank";
import TBody from "./components/tables/TBody";
import THead from "./components/tables/THead";
import useComparePage, { numToLakh } from "./useComparePage";
import "./Compare.scss";
import "styled-components/macro";
import mail from "./../../assets/images/whatsapp.png";
import whatsapp from "./../../assets/images/whatsapp01.png";
import BuyNowModal from "../quotePage/components/BuyNowModal/BuyNowModal";
import {
  AddPlan,
  CompanyName,
  CompareQuotes,
  CrossWrapper,
  DetailWrapper,
  DropDownWrapper,
  EmailSent,
  Line,
  LogoWrapper,
  MergedQuotes,
  NameWrapper,
  PlanDetails,
  PlanName,
  PlusWrapper,
  PopupWrapper,
  PopupWrapperM,
  QuoteName,
  QuoteNameM,
  QuoteWrapper,
  QuoteWrapperM,
  RemoveCross,
  SelectedProduct,
  Title,
  Value,
  ErrorAddPlan,
} from "./ComparePage.style";
import DropDown from "./components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import ShareQuoteModal from "../../components/ShareQuoteModal";


const sendContent = (
  type,
  name,
  imageSend,
  email,
  setEmail,
  emailStatus,
  sendRef
) => {

 
  return (
    <div className="text-center p-lg mb-50 sm-50 xs-50">
      <img
        src={type === "email" ? mail : whatsapp}
        alt="mail"
        className="img_whatsapp"
      ></img>
      <p className="mb-15 font_24">
        Hey {name}, please share your{" "}
        {type === "email" ? "e-mail address" : "phone number"} to get your
        compared plans
      </p>
      <form className="form">
        <input
          type={type === "email" ? "email" : "tel"}
          class="form__field"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={
            type === "email"
              ? "Enter Your Email Address"
              : "Enter Your Phone Number"
          }
        />
        {type === "email" && (
          <EmailSent status={emailStatus.status}>
            {emailStatus.message}
          </EmailSent>
        )}
        <button
          type="button"
          className="btn--primary btn--inside btn_call uppercase text-center"
          onClick={() => {
            if (type === "email") imageSend(email);
            else sendRef.current.click();
          }}
        >
          Share&nbsp;&nbsp;&nbsp;
          <i class="fa fa-share font_15"></i>
        </button>
        <a
          style={{
            display: "none",
            height: 0,
            opacity: 0,
            position: "absolute",
          }}
          target="_blank"
          ref={sendRef}
          rel="noreferrer"
          href={`https://api.whatsapp.com/send?phone=91${email}&text=${window.location.href}`}
        >
          Whatsapp
        </a>
      </form>
    </div>
  );
};

const getYearsUsingTenure = (tenure) => {
  if (tenure == 1) {
    return "year";
  } else if (tenure == 2) {
    return "2 years";
  } else if (tenure == 3) {
    return "3 years";
  } else return "year";
};
const popupContent = (
  fitlerQuotes,
  quotesForCompare,
  selectedAddPlan,
  setSelectedAddPlan,
  mergedQuotes,
  removePlan,
  value,
  setValue,
  errors,
  setErrors,
  discount,
  removePlan2point0
) => {
  let companies = [];
  let companyWisePlans = {};
  let companyWiseSumAssured = {};
  let companyWiseLogos = [];
  let ProductWiseId = {};
  let covers = {};
  fitlerQuotes.forEach((item) => {
    if (item[0]) {
      companies.push(item[0].product.company.name);
      companyWiseLogos.push(item[0].logo);

      item.forEach((innerItem) => {
        if (!(innerItem.product.name in covers)) {
          covers[innerItem.product.name] = [innerItem.sum_insured];
        } else {
          covers[innerItem.product.name].push(innerItem.sum_insured);
        }
      });

      item.forEach((innerItem) => {
        if (
          ((companyWisePlans[innerItem.product.company.name] &&
            !companyWisePlans[innerItem.product.company.name].includes(
              innerItem.product.name
            )) ||
            !companyWisePlans[innerItem.product.company.name]) &&
          !mergedQuotes.some(
            (item) => item.data.product.name === innerItem.product.name
          )
        ) {
          companyWisePlans = {
            ...companyWisePlans,
            [innerItem.product.company.name]: [
              ...(companyWisePlans[innerItem.product.company.name]
                ? companyWisePlans[innerItem.product.company.name]
                : []),
              innerItem.product.name,
            ],
          };
          ProductWiseId = {
            ...ProductWiseId,
            [innerItem.product.name]: [innerItem.product.id],
          };
        }
        if (
          (companyWiseSumAssured[innerItem.product.company.name] &&
            !companyWiseSumAssured[innerItem.product.company.name].includes(
              innerItem.sum_insured
            )) ||
          !companyWiseSumAssured[innerItem.product.company.name]
        )
          companyWiseSumAssured = {
            ...companyWiseSumAssured,
            [innerItem.product.company.name]: [
              ...(companyWiseSumAssured[innerItem.product.company.name]
                ? companyWiseSumAssured[innerItem.product.company.name]
                : []),
              innerItem.sum_insured,
            ],
          };
      });
    }
  });

  return (
    <>
      <PopupWrapper>
        <MergedQuotes className="row">
          {[0, 1, 2].map((item, index) => (
            <div className="col-lg-4">
              {mergedQuotes[index] ? (
                <SelectedProduct first={index === 0}>
                  <RemoveCross
                    onClick={() =>
                      removePlan(
                        `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`
                      )
                    }
                  >
                    <i class="fas fa-times"></i>
                  </RemoveCross>
                  <LogoWrapper className="logo_style_common">
                    <img src={mergedQuotes[index].data.logo} alt="logo"></img>
                  </LogoWrapper>
                  <NameWrapper>
                    <span
                      style={{
                        textAlign: "left",
                        fontWeight: "900",
                        fontFamily: "Inter-SemiBold",
                      }}
                    >
                      {mergedQuotes[index].data.product.name}
                    </span>
                    {/* <br/> */}
                    {/* <span style={{
                      color:"#505f79",
                      fontSize:"14px"
                    }}>
                      {" "}
                      {mergedQuotes[index].data.product.company.name}
                    </span> */}
                    <PlanDetails>
                      <DetailWrapper>
                        <Title>Sum Insured :</Title>
                        <Value>
                          ₹{" "}
                          {numToLakh(
                            mergedQuotes[index].data.sum_insured
                          ).toLocaleString("en-IN")}
                        </Value>
                      </DetailWrapper>
                      <DetailWrapper>
                        <Title>Premium :</Title>
                        <Value>
                          ₹{" "}
                          {(discount[
                            `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`
                          ]
                            ? discount[
                                `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`
                              ].premium
                            : mergedQuotes[index].data.premium
                          ).toLocaleString("en-IN") +
                            "/" +
                            getYearsUsingTenure(
                              discount[
                                `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`
                              ]?.tenure
                            )}
                        </Value>
                      </DetailWrapper>
                    </PlanDetails>
                  </NameWrapper>
                </SelectedProduct>
              ) : (
                <AddPlan>
                  <CrossWrapper>
                    <PlusWrapper>
                      <i class="fa fa-plus"></i>
                    </PlusWrapper>
                    <div>No Plans Added</div>
                  </CrossWrapper>
                </AddPlan>
              )}
            </div>
          ))}
        </MergedQuotes>
        <Line></Line>
        <CompareQuotes>
          <div className="row" style={{ padding: "10px" }}>
            {companies.map((item, index) => {
              if (companyWisePlans[item])
                return (
                  <>
                    <div className="col-lg-4">
                      <QuoteWrapper>
                        <div>
                          <LogoWrapper className="logo_style_common">
                            <img
                              src={companyWiseLogos[index]}
                              alt="logo"
                              css={`
                                width: 57px;
                                object-fit: contain;
                              `}
                            ></img>
                          </LogoWrapper>
                          <QuoteName>{item}</QuoteName>
                        </div>
                        <DropDownWrapper>
                          <DropDown
                            name={companyWisePlans[item]}
                            sum={companyWiseSumAssured[item]}
                            covers={covers}
                            onChange={(value) => {
                              setValue((prev) => {
                                return { ...prev, [item]: value };
                              });
                              if (mergedQuotes.length >= 3) {
                                setErrors((prev) => {
                                  return {
                                    ...prev,
                                    [item]: "You can add only upto 3 plans",
                                  };
                                });
                              } else if (value?.plan && value?.sumInsured) {
                                setSelectedAddPlan(
                                  `${ProductWiseId[value.plan]}${
                                    value?.sumInsured
                                  }`
                                );
                                setValue({});
                              }
                            }}
                            value={value[item]}
                          ></DropDown>
                        </DropDownWrapper>
                      </QuoteWrapper>
                    </div>
                    {/* <ErrorAddPlan>
                      {errors[item] ? errors[item] : ""}
                    </ErrorAddPlan> */}
                  </>
                );
              else return <></>;
            })}
          </div>
        </CompareQuotes>
      </PopupWrapper>
    </>
  );
};

// popup content for mobile view

const popupContentM = (
  fitlerQuotes,
  quotesForCompare,
  selectedAddPlan,
  setSelectedAddPlan,
  mergedQuotes,
  removePlan,
  value,
  setValue,
  errors,
  setErrors,
  discount,
  windowWidth,
  removePlan2point0
) => {
  let companies = [];
  let companyWisePlans = {};
  let companyWiseSumAssured = {};
  let companyWiseLogos = [];
  let ProductWiseId = {};
  let covers = {};

  fitlerQuotes.forEach((item) => {
    item.forEach((innerItem) => {
      if (!(innerItem.product.name in covers)) {
        covers[innerItem.product.name] = [innerItem.sum_insured];
      } else {
        covers[innerItem.product.name].push(innerItem.sum_insured);
      }
    });

    if (item[0]) {
      companies.push(item[0].product.company.name);
      companyWiseLogos.push(item[0].logo);
      item.forEach((innerItem) => {
        if (
          ((companyWisePlans[innerItem.product.company.name] &&
            !companyWisePlans[innerItem.product.company.name].includes(
              innerItem.product.name
            )) ||
            !companyWisePlans[innerItem.product.company.name]) &&
          !mergedQuotes.some(
            (item) => item.data.product.name === innerItem.product.name
          )
        ) {
          companyWisePlans = {
            ...companyWisePlans,
            [innerItem.product.company.name]: [
              ...(companyWisePlans[innerItem.product.company.name]
                ? companyWisePlans[innerItem.product.company.name]
                : []),
              innerItem.product.name,
            ],
          };
          ProductWiseId = {
            ...ProductWiseId,
            [innerItem.product.name]: [innerItem.product.id],
          };
        }
        if (
          (companyWiseSumAssured[innerItem.product.company.name] &&
            !companyWiseSumAssured[innerItem.product.company.name].includes(
              innerItem.sum_insured
            )) ||
          !companyWiseSumAssured[innerItem.product.company.name]
        )
          companyWiseSumAssured = {
            ...companyWiseSumAssured,
            [innerItem.product.company.name]: [
              ...(companyWiseSumAssured[innerItem.product.company.name]
                ? companyWiseSumAssured[innerItem.product.company.name]
                : []),
              innerItem.sum_insured,
            ],
          };
      });
    }
  });

  return (
    <>
      <PopupWrapperM>
        <MergedQuotes
          className="row"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "space-between",
          }}
        >
          {[0, 1].map((item, index) => (
            <div
              style={windowWidth < 400 ? { width: "50%" } : { width: "49%" }}
            >
              {mergedQuotes[index] ? (
                <SelectedProduct first={index === 0}>
                  <RemoveCross
                    onClick={() =>
                      removePlan(
                        `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`
                      )
                    }
                  >
                    <span>
                      <i class="fas fa-times"></i>
                    </span>
                  </RemoveCross>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <LogoWrapper
                      className="logo_style_commo_m"
                      style={{ marginRight: "0px" }}
                    >
                      <img
                        src={mergedQuotes[index].data.logo}
                        className="w-100"
                        alt="logo"
                      ></img>
                    </LogoWrapper>

                    <CompanyName
                      style={{ fontSize: "11px", textAlign: "center" }}
                    >
                      {mergedQuotes[index].data.product.name}
                    </CompanyName>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Title style={{ fontSize: "10px" }}>Sum Insured :</Title>
                      <Value style={{ fontSize: "10px" }}>
                        ₹{" "}
                        {numToLakh(
                          mergedQuotes[index].data.sum_insured
                        ).toLocaleString("en-IN")}
                      </Value>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Title style={{ fontSize: "10px" }}>Premium :</Title>
                      <Value style={{ fontSize: "10px" }}>
                        <i class="fa fa-inr"></i>{" "}
                        {(discount[
                          `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`
                        ]
                          ? discount[
                              `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`
                            ].premium
                          : mergedQuotes[index].data.premium
                        ).toLocaleString("en-IN") +
                          "/" +
                          getYearsUsingTenure(
                            discount[
                              `${mergedQuotes[index].data.product.id}${mergedQuotes[index].data.sum_insured}`
                            ]?.tenure
                          )}
                      </Value>
                    </div>
                  </div>
                </SelectedProduct>
              ) : (
                <AddPlan style={{ padding: "0px" }}>
                  <CrossWrapper>
                    <PlusWrapper>
                      <i class="fa fa-plus"></i>
                    </PlusWrapper>
                    <div
                      css={`
                        @media (max-width: 410px) {
                          font-size: 12px;
                        }
                      `}
                    >
                      No Plans Added
                    </div>
                  </CrossWrapper>
                </AddPlan>
              )}
            </div>
          ))}
        </MergedQuotes>
        <Line></Line>
        <div>
          <div className="row">
            {companies.map((item, index) => {
              if (companyWisePlans[item])
                return (
                  <div className="col-lg-4">
                    <QuoteWrapperM>
                      <LogoWrapper className="logo_style_common_m">
                        <img
                          src={companyWiseLogos[index]}
                          className="w-100"
                          alt="logo"
                        ></img>
                      </LogoWrapper>
                      <QuoteNameM>{item}</QuoteNameM>
                      <DropDownWrapper>
                        <DropDown
                          name={companyWisePlans[item]}
                          sum={companyWiseSumAssured[item]}
                          covers={covers}
                          onChange={(value) => {
                            setValue((prev) => {
                              return { ...prev, [item]: value };
                            });
                            if (mergedQuotes.length >= 2) {
                              setErrors((prev) => {
                                return {
                                  ...prev,
                                  [item]: "You can add only upto 2 plans",
                                };
                              });
                            } else if (value?.plan && value?.sumInsured) {
                              setSelectedAddPlan(
                                `${ProductWiseId[value.plan]}${
                                  value?.sumInsured
                                }`
                              );
                              setValue({});
                            }
                          }}
                          value={value[item]}
                        ></DropDown>
                      </DropDownWrapper>
                    </QuoteWrapperM>
                    {/* <ErrorAddPlan>
                      {errors[item] ? errors[item] : ""}
                    </ErrorAddPlan> */}
                  </div>
                );
            })}
          </div>
        </div>
      </PopupWrapperM>
    </>
  );
};

function GoBackButton({ groupCode, ...props }) {
  const groupCodes = Object.keys(
    useSelector(({ greetingPage }) => greetingPage.memberGroups)
  );
  const urlQuery = useUrlQuery();
  const enquiryId = urlQuery.get("enquiryId");

  const history = useHistory();
  return (
    <button
      className="btn"
      type="button"
      onClick={() => {
        groupCodes[1] && groupCodes[1] === groupCode
          ? history.replace(
              `/productdetails/${groupCodes[0]}?enquiryId=${enquiryId}`
            )
          : history.replace(`/quotes/${groupCode}?enquiryId=${enquiryId}`);
      }}
      css={`
        width: max-content;
        padding: 0 !important;
        margin-right: 10px;
        margin-bottom: 10px;
        color: var(--abc-red);
        font-size: 17px;
        display: flex;
        align-items: center;
      `}
      {...props}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        css={`
          background: #f1f4f8;
          width: 45px;
          margin-right: 20px;
          border-radius: 100%;
          height: 45px;
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
  );
}

const ComparePage = () => {
  const {
    loading,
    mergedQuotes,
    showDiffCbx,
    setshowDiffCbx,
    removePlan,
    QuotesToAdd,
    handleCompare,
    quotesForCompare,
    mergedCover,
    selectedAddPlan,
    setSelectedAddPlan,
    show,
    setShow,
    showM,
    setShowM,
    hideCells,
    setHideCells,
    showBuyNowPopup,
    setShowBuyNowPopup,
    imageSend,
    imageSendM,
    emailStatus,
    errors,
    setErrors,
    discount,
    removePlan2point0,
  } = useComparePage();


  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
  const [windowHeight, windowWidth] = useWindowSize();
  const [showShareQuoteModal, setShowShareQuoteModal] = useState(false);
  const [email, setEmail] = useState();
  const { groupCode } = useParams();
  const [send, setSend] = useState(false);
  const [value, setValue] = useState({});

  const sendRef = useRef();
  const dispatch = useDispatch();

  const { proposerDetails } = useSelector((state) => state.greetingPage);

  const [width, setWidth] = useState(window.innerWidth);
  return (
    <>
      {showBuyNowPopup && (
        <BuyNowModal
          showBuyNow={showBuyNowPopup}
          setShowBuyNow={setShowBuyNowPopup}
        />
      )}

      {loading ? (
        <div>
          <Container style={{ marginTop: "10px" }}>
            <GoBackButton groupCode={groupCode} />
            <CardSkeletonLoader noOfCards={3} />
          </Container>
        </div>
      ) : (
        <>
          {" "}
          {/*Mobile header - will visible only on mobie screen*/}
          <div className="mobile-view" className="showOnMobile">
            <MobileHeader
              emailStatus={emailStatus}
              EmailSent={EmailSent}
              imageSend={imageSendM}
              sendContent={sendContent}
              groupCode={groupCode}
              path={"/quotes"}
            />
            <ShowDiffMobile
              showDiffCbx={showDiffCbx}
              setshowDiffCbx={setshowDiffCbx}
            />
          </div>
          <div className="agn-our-pricing pb-200 mgt-5 ">
            {/* will visible only on desktop screen*/}
            <div className="desktop-header hideOnMobile">
              <ul
                className="menu topRight"
                css={`
                  display: none;
                `}
              >
                <li class="share bottom">
                  <i class="fa fa-share-alt share"></i>
                  <ul class="submenu">
                    <li>
                      <button
                        onClick={() => {
                          setSend("email");
                        }}
                      >
                        <i class="fa fa-envelope-o"></i>
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setSend("whatsapp")}>
                        <i class="fa fa-whatsapp"></i>
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* mobile content ( visible on mobile screen )*/}
            <div id="printCompareM">
              <div className="table-wrapper showOnMobile">
                <table className="table table-hover">
                  <THeadM
                    setShowM={setShowM}
                    plans={mergedQuotes}
                    removePlan={removePlan2point0}
                    setshowDiffCbx={setshowDiffCbx}
                    showDiffCbx={showDiffCbx}
                    setShowBuyNowPopup={setShowBuyNowPopup}
                  />
                  <TBlank />
                  <TBodyM
                    title={"Plan Details"}
                    showDiffCbx={showDiffCbx}
                    plans={mergedQuotes}
                    mergedCover={mergedCover}
                  />

                  <TBodyM
                    title={"Key Benefits"}
                    plans={mergedQuotes}
                    showDiffCbx={showDiffCbx}
                  />

                  {mergedQuotes.length > 0 &&
                    mergedQuotes[0].features?.map(
                      (features, i) =>
                        !hideCells.includes(features?.name) && (
                          <>
                            <TBodyM
                              showDiffCbx={showDiffCbx}
                              title={features?.name}
                              plans={mergedQuotes}
                              index={i}
                              setHideCells={setHideCells}
                              hideCells={hideCells}
                            />
                          </>
                        )
                    )}

                  <TBodyM
                    title={"Permanent Exclusions"}
                    plans={mergedQuotes}
                    showDiffCbx={showDiffCbx}
                  />
                </table>
              </div>
            </div>

            {/* desktop conetent ( visible on desktop screen only ) */}
            <Container
              className="tab-content tab-content_mt_comapre hideOnMobile"
              id="printCompare"
              css={`
                @media (max-width: 1300px) {
                  max-width: unset;
                }
              `}
            >
              <div
                css={`
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  width: 100% !important;
                  padding-right: 15px;
                  margin-top: 10px;
                `}
              >
                <GoBackButton groupCode={groupCode} />
                <UpperModifier PrimaryColor={PrimaryColor}>
                  <div    className="right_midifiers d-flex justify-content-between align-items-center ">
                    <button
                      className="btn share_Quote_btn "
                      onClick={() => setShowShareQuoteModal(true)}
                      css={`
                        border: solid 2 px ${PrimaryColor} !important;
                        color:${PrimaryColor};
                      `}
                    >
                      <i class="fas fa-share "></i>{" "}
                      <span
                        css={`
                          margin-left: 10px;
                        `}
                      >
                        Share
                      </span>
                    </button>
                  </div>
                </UpperModifier>
              </div>
              <div>
                <div className="table-wrapper">
                  <table className="table table-hover">
                    {console.log(mergedQuotes, "mergedQuotes")}
                    <THead
                      plans={mergedQuotes}
                      setshowDiffCbx={setshowDiffCbx}
                      showDiffCbx={showDiffCbx}
                      removePlan={removePlan2point0}
                      setShow={setShow}
                      setShowBuyNowPopup={setShowBuyNowPopup}
                    />
                    <TBlank />
                    <TBody
                      title={"Plan Details"}
                      plans={mergedQuotes}
                      mergedCover={mergedCover}
                    />
                    <TBlank />
                    <TBody title={"Key Benefits"} plans={mergedQuotes} />
                    <TBlank />
                    {mergedQuotes.length > 0 &&
                      mergedQuotes[0].features?.map(
                        (features, i) =>
                          !hideCells.includes(features?.name) && (
                            <>
                              <TBody
                                showDiffCbx={showDiffCbx}
                                title={features?.name}
                                plans={mergedQuotes}
                                index={i}
                                setHideCells={setHideCells}
                                hideCells={hideCells}
                              />
                              <TBlank />
                            </>
                          )
                      )}
                  </table>
                </div>
              </div>
            </Container>
          </div>
        </>
      )}

      <CardModalM
        show={showM}
        title={"Add upto 2 plans to compare"}
        customClass={"addToCompare__Modal"}
        buttonValue={"Compare"}
        content={popupContentM(
          QuotesToAdd,
          quotesForCompare,
          selectedAddPlan,
          setSelectedAddPlan,
          mergedQuotes,
          removePlan2point0,
          value,
          setValue,
          errors,
          setErrors,
          discount,
          windowWidth
        )}
        errorsFromCompare={
          Object.keys(errors).length ? "You can add only upto 2 plans" : ""
        }
        handleClose={() => {
          setShowM(false);
          setSelectedAddPlan("");
        }}
        handleClick={() => {
          setShowM(false);
          setSelectedAddPlan("");
        }}
      />

      <CardModal
        CompareBtnOnTop={true}
        className="hideOnMobile"
        show={show}
        title={"Add upto 3 plans to compare"}
        customClass={"addToCompare__Modal"}
        buttonValue={"Compare"}
        content={popupContent(
          QuotesToAdd,
          quotesForCompare,
          selectedAddPlan,
          setSelectedAddPlan,
          mergedQuotes,
          removePlan2point0,
          value,
          setValue,
          errors,
          setErrors,
          discount
        )}
        errorsFromCompare={
          Object.keys(errors).length ? "You can add only upto 3 plans" : ""
        }
        handleClose={() => {
          setShow(false);
          setSelectedAddPlan("");
        }}
        handleClick={() => {
          setShow(false);
          setSelectedAddPlan("");
        }}
      />
      <CardModal
        show={send}
        content={sendContent(
          send,
          proposerDetails?.name?.split(" ")[0],
          imageSend,
          email,
          setEmail,
          emailStatus,
          sendRef
        )}
        showButton={false}
        handleClose={() => setSend(false)}
      />
      <ShareQuoteModal
        show={showShareQuoteModal}
        handleClose={() => setShowShareQuoteModal(false)}
        imageSend={imageSend}
        emailStatus={emailStatus}
      />
    </>
  );
};

export default ComparePage;

const ImageLogo = styled.img`
  border-radius: unset !important;
  margin-top: 8px;
  height: 40px;
  width: 40px;
`;
const UpperModifier = styled.div`
  .right_midifiers {
    .btn {
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 25px;
      margin-left: 7px;
      border-radius: 31px;
      font-weight: 500;
      border: solid 2px ${props=>props.PrimaryColor} !important;
    }
    .share_Quote_btn {
      // border: solid 2px #0a87ff !important;
      // color: #0a87ff;

      :focus {
        border: solid 2px #0a87ff !important;
      }
      :active {
        border: solid 2px #0a87ff !important;
      }
      :hover {
        border: solid 2px #0a87ff !important;
      }
    }
  }
`;
