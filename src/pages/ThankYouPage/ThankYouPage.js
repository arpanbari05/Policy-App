import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import "./ThankYouPage.scss";
import Success from "../../assets/images/success.png";
import { Page } from "../../components/index";
import { useCart } from "../../customHooks/index";
import Correct from "../../assets/images/correct.png";
import Unsuccess from "../../assets/images/unsuccess.png";
import CurR from "../../assets/images/img_cut_r.png";
import CutL from "../../assets/images/img_cut.png";
import { policyPdf } from "./serviceApi";
import SecureLS from "secure-ls";
import {
  fetchPdf,
  getPaymentStatus,
} from "../ProposalPage/ProposalSections/ProposalSections.slice";
import CheckMark from "./components/CheckMark";
import Card from "./components/Card";
import styled from "styled-components";
import "styled-components/macro";
import { useFrontendBoot, useTheme } from "../../customHooks";
import { small } from "../../utils/mediaQueries";
import ShareQuoteModal from "../../components/ShareQuoteModal";
import {
  amount,
  getPolicyPremium,
  getTotalPremium,
  isSSOJourney,
} from "../../utils/helper";

const ThankYouPage = () => {
  const ls = new SecureLS();

  const history = useHistory();

  const { pathname } = useLocation();

  const [payment, SetPayment] = useState(true);

  const [timer, SetTimer] = useState(6);

  const {
    colors: {
      primary_color: PrimaryColor,
      secondary_color: SecondaryColor,
      primary_shade: PrimaryShade,
    },
  } = useTheme();

  const { policyStatus, policyLoading } = useSelector(
    state => state.proposalPage,
  );

  const total_premium = amount(getPolicyPremium(policyStatus));

  const {
    data: { tenant: tenantDetail, settings },
  } = useFrontendBoot();

  const accountLoginLink = settings.account_login_link || "";

  const shopMoreLink = settings.shop_more_link || "";

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPdf());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (
      policyStatus[0]?.pdf_path !== null &&
      policyStatus[0]?.pdf_path !== undefined
    ) {
      setLoading(false);
    }
  }, [policyStatus]);

  useEffect(() => {
    if (pathname === "/thankyou") {
      document.body.style.background = "rgb(248, 249, 251)";
    } else {
      document.body.style.background = "";
    }
  }, [pathname]);

  const htmlString = isSSOJourney()
    ? settings?.thank_you_banner_pos
    : settings?.thank_you_banner;

  const currentGroup =
    localStorage.getItem("groups") &&
    JSON.parse(localStorage.getItem("groups")).find(group => group.id);

  const Disclaimer = ({ htmlStringDisclaimer }) => {
    if (htmlStringDisclaimer) {
      return (
        <div
          css={`
            margin-top: 20px;
            margin-left: 52px;
            font-size: 20px !important;
            color: ${PrimaryColor};
            & a {
              font-weight: bold;
              text-decoration: underline;
            }
          `}
          dangerouslySetInnerHTML={{
            __html: htmlStringDisclaimer,
          }}
        />
      );
    } else if (
      policyStatus.every(
        item => item.underwriting_status === "underwriting_approval",
      )
    ) {
      return (
        <>
          <div
            className="policy__disclaimer"
            css={`
              color: ${PrimaryColor} !important;
            `}
          >
            You can track your policy status on{" "}
            <a href={accountLoginLink}>My Account Page.</a> at anytime.
          </div>
          <div>
            <a
              href={shopMoreLink}
              className="shopmore__button  btn-link"
              css={`
                color: ${PrimaryColor} !important;
                border-color: ${PrimaryColor} !important;
              `}
            >
              Shop More {">"}
            </a>
          </div>
        </>
      );
    } else if (policyStatus.every(item => item.status === "policy_issued"))
      return (
        <>
          {" "}
          <div
            className="policy__disclaimer"
            css={`
              color: ${PrimaryColor} !important;
            `}
          >
            Your policy document has been successfully saved in{" "}
            <a href={accountLoginLink}>My Account Page.</a> You can visit the My
            Account page to retrieve your policy copy at any time.
          </div>
          <div>
            <a
              href={shopMoreLink}
              className="shopmore__button  btn-link"
              css={`
                color: ${PrimaryColor} !important;
                border-color: ${PrimaryColor} !important;
              `}
            >
              Shop More {">"}
            </a>
          </div>
        </>
      );
    else
      return (
        <>
          <div
            className="policy__disclaimer"
            css={`
              color: ${PrimaryColor} !important;
            `}
          >
            You can visit the <a href={accountLoginLink}>My Account Page.</a> to
            retrieve your policy copy or track your policy status at any time.
          </div>
          <div>
            <a
              href={shopMoreLink}
              className="shopmore__button  btn-link"
              css={`
                color: ${PrimaryColor} !important;
                border-color: ${PrimaryColor} !important;
              `}
            >
              Shop More {">"}
            </a>
          </div>
        </>
      );
  };
  if (payment)
    return (
      <Page>
        <>
          <div
            css={`
              margin-top: 30px;
              margin-right: 80px;
              display: flex;
              justify-content: flex-end;
            `}
          >
            {/* <ShareQuoteModal
              insurersFor={cartEntries?.map(
                cart => cart?.product?.company?.alias,
              )}
              stage="THANK_YOU"
            /> */}
          </div>
          <div className="hideOnMobile">
            <div className="thankheading__wrapper">
              <div className="thankheading__message">
                Thank you for choosing{" "}
                {tenantDetail && tenantDetail.name
                  ? tenantDetail.name
                  : "Fyntune"}
                !
              </div>
              <div className="thankheading__right">Your Purchase</div>
            </div>
            <div className="thankmain__wrapper">
              <div className="row">
                <div className="col-lg-6">
                  <div
                    className="thankmain__message"
                    css={`
                      color: ${PrimaryColor} !important;
                      background: ${PrimaryShade};
                    `}
                  >
                    <div className="thankmain__check">
                      <CheckMark />
                    </div>
                    <span>Your Payment for {total_premium} was successful</span>
                  </div>
                  <div>
                    <div
                      className="yellow__line"
                      css={`
                        background-color: ${SecondaryColor} !important;
                      `}
                    />
                  </div>
                  <div>
                    {settings && (
                      <Disclaimer htmlStringDisclaimer={htmlString} />
                    )}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="thankcard__wrapper">
                    {loading ? (
                      <Card />
                    ) : (
                      policyStatus.map((item, index) => {
                        if (item.product)
                          return (
                            <Card
                              key={index}
                              values={item}
                              isLoading={policyLoading}
                              showTrackStatus={
                                isSSOJourney()
                                  ? !!+settings?.thank_you_keep_on_track_status_pos
                                  : !!+settings?.thank_you_keep_on_track_status
                              }
                            />
                          );
                        else return <Card></Card>;
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="showOnMobile">
            <Outer>
              <div
                style={{
                  marginTop: "50px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div style={{ padding: "20px 0px 30px" }}>
                  <img src={Success} alt="" className="img_success" />
                </div>
                <div
                  style={{
                    padding: "20px 0px",
                    marginTop: "20px",
                    fontWeight: "bold",
                    fontSize: "21px",
                  }}
                >
                  <span>Thankyou for choosing</span>
                  <br />
                  <span>
                    {" "}
                    {tenantDetail && tenantDetail.name
                      ? tenantDetail.name
                      : "Fyntune"}{" "}
                    !
                  </span>
                </div>
                <div
                  style={{
                    backgroundColor: `linear-gradient(90deg, ${PrimaryShade} 0%,rgb(255 255 255) 100%) `,
                    display: "flex",
                    alignItems: "center",
                    color: PrimaryColor,
                    padding: "8px 10px",
                    fontSize: "15px",
                    whiteSpace: "nowrap",
                    fontWeight: "bold",
                    backgroundColor: PrimaryShade,
                    borderRadius: "55px",
                    // letterSpacing: "1px"
                  }}
                  css={`
                    ${small} {
                      font-size: 11px !important;
                    }
                  `}
                >
                  <div
                    style={{
                      backgroundColor: "#fff",
                      color: "#e4fff0",
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                      marginRight: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    {
                      <img
                        src={Correct}
                        alt=""
                        css={`
                          width: 40px;
                        `}
                      ></img>
                    }
                  </div>
                  Your Payment for {total_premium} was successful
                </div>
                <div>
                  <div
                    className="yellow__line"
                    style={{
                      backgroundColor: SecondaryColor,
                      marginLeft: "0px",
                      width: "50px",
                      height: "9px",
                      marginTop: "20px",
                    }}
                  />
                </div>
              </div>
              <div>
                {loading ? (
                  <Card />
                ) : (
                  policyStatus.map((item, index) => {
                    if (item.product)
                      return (
                        <Card
                          values={item}
                          key={index}
                          isLoading={policyLoading}
                          showTrackStatus={
                            isSSOJourney()
                              ? !!+settings?.thank_you_keep_on_track_status_pos
                              : !!+settings?.thank_you_keep_on_track_status
                          }
                        />
                      );
                    else return <Card></Card>;
                  })
                )}
              </div>

              {htmlString && (
                <div
                  css={`
                    text-align: center;
                    margin-top: 20px;
                    font-size: 14px;
                    color: ${PrimaryColor};
                    & a {
                      font-weight: bold;
                      text-decoration: underline;
                    }
                  `}
                  dangerouslySetInnerHTML={{
                    __html: isSSOJourney()
                      ? settings?.thank_you_banner_pos
                      : settings?.thank_you_banner,
                  }}
                ></div>
              )}
              {!htmlString && (
                <div
                  style={{
                    margin: "10px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontSize: "14px", lineHeight: "1.3" }}>
                    Your policy document has been successfully saved in{" "}
                    <a
                      href={accountLoginLink}
                      style={{
                        color: PrimaryColor,
                        borderBottom: `1px dashed ${PrimaryColor}`,
                        fontWeight: "bold",
                      }}
                    >
                      My Account Page.
                    </a>{" "}
                    You can visit the My Account page to retrieve your policy
                    copy at any time.
                  </p>

                  <p style={{ fontSize: "14px", marginTop: "20px" }}>
                    <a
                      href={shopMoreLink}
                      style={{
                        color: PrimaryColor,
                        borderBottom: `1px dashed ${PrimaryColor}`,
                        fontWeight: "bold",
                      }}
                    >
                      Shop More {">"}
                    </a>
                  </p>
                </div>
              )}
            </Outer>
          </div>
        </>
      </Page>
    );

  if (!payment)
    return (
      <Page>
        <>
          <div className="hideOnMobile">
            <div className="agn-counter-section-pay">
              <Container className="">
                <Row>
                  <div className="bottom-banner" style={{ margin: "unset" }}>
                    {/* <div className="text"
                
                  >
                    
                    <img src={Unsuccess}  className="img_unsuccess"
                    alt="Unsuccess" 
                  
                    ></img>
                   

                
                    
                      <h3 className="title text-center unsuccess-text">
                        Uh-oh! We were unable to <br></br>
                        Process Your Payment{" "}
                      </h3>
                    
                    
                      <>
                        {" "}
                        <p className="text-p">
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout.
                        </p>
                      </>
                    
                  </div> */}
                    <div
                      css={`
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                      `}
                    >
                      <img
                        src={Unsuccess}
                        className="img_unsuccess"
                        alt="Unsuccess"
                        css={`
                          border-radius: 100px;
                        `}
                      ></img>
                      <h3
                        className="title text-center unsuccess-text"
                        css={`
                          margin: none;
                        `}
                      >
                        Uh OH! Payment Faiiled.
                      </h3>
                      <p className="text-p" style={{ textAlign: "center" }}>
                        {/* It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout. */}
                        Don't worry. Please try again.
                      </p>
                      <div>
                        <div
                          className="yellow__line"
                          style={{
                            backgroundColor: SecondaryColor,
                            marginLeft: "0px",
                            width: "50px",
                            height: "9px",
                            marginTop: "20px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Row>

                {/* <Row>

          </Row> */}
                {
                  <>
                    <div className="col-md-12 text-center margin_top_unsuccess">
                      <a
                        href="#"
                        className="btn_back_q_proposal"
                        css={`
                          display: inline-block;
                          background-color: #0a87ff;
                          border: 1px solid #0a87ff;
                          width: 158px;
                          &:hover {
                            color: #000;
                          }
                        `}
                        onClick={() => {
                          history.push({
                            pathname: "/quotes",
                            search: `enquiryId=${ls.get("enquiryId")}&pincode=${
                              currentGroup?.pincode
                            }&city=${currentGroup?.city}`,
                          });
                        }}
                      >
                        Back To Quotes
                      </a>
                      <a
                        href="#"
                        className="btn_start_proposal_back_t"
                        css={`
                          color: #0a87ff;
                          display: inline-block;
                          border: 1px solid #0a87ff;
                          width: 158px !important;
                          &:hover {
                            color: #000;
                          }
                        `}
                        onClick={() => {
                          history.push({
                            pathname: "/proposal",
                            search: `enquiryId=${ls.get("enquiryId")}&pincode=${
                              currentGroup?.pincode
                            }&city=${currentGroup?.city}`,
                          });
                        }}
                      >
                        Try Again
                      </a>

                      <p className="footer-text-unsuccess">
                        If you have any questions, please call us on{" "}
                        <span className="text_phone">
                          <b>1800263683898</b>
                        </span>
                      </p>
                    </div>
                  </>
                }
              </Container>
            </div>
          </div>
          <div className="showOnMobile">
            <Outer>
              <div
                style={{
                  marginTop: "50px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div style={{ padding: "20px 0px 30px" }}>
                  {<img src={Unsuccess} alt="" className="img_success"></img>}
                </div>
                <div style={{ padding: "20px 0px 0px" }}>
                  <h5> Uh OH! Payment Faiiled.</h5>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#595959",
                    }}
                  >
                    Don't worry. Please try again.
                  </p>
                </div>

                <div>
                  <div
                    className="yellow__line"
                    style={{
                      backgroundColor: SecondaryColor,
                      marginLeft: "0px",
                      width: "50px",
                      height: "9px",
                      marginTop: "20px",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px 0px",
                }}
              >
                <a
                  href="#"
                  style={{
                    borderRadius: "4px",
                    backgroundColor: "#0a87ff",
                    color: "#fff",
                    padding: "8px 16px",
                  }}
                  onClick={() => {
                    history.push({
                      pathname: "/proposal",
                      search: `enquiryId=${ls.get("enquiryId")}&pincode=${
                        currentGroup?.pincode
                      }&city=${currentGroup?.city}`,
                    });
                  }}
                >
                  Try Again
                </a>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#eaf0f3",
                }}
              >
                <p style={{ fontSize: "12px" }}>
                  Try making payment with a different bank account or card.
                </p>
              </div>
            </Outer>
          </div>
        </>
      </Page>
    );
};

const Outer = styled.div`
  margin: 10px;

  height: fit-content;
`;

export default ThankYouPage;
