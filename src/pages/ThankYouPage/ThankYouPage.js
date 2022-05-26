import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import "./ThankYouPage.scss";
import Success from "../../assets/images/success.png";
import { Page } from "../../components/index";
import Correct from "../../assets/images/correct.png";
import Unsuccess from "../../assets/images/unsuccess.png";
import SecureLS from "secure-ls";
import { fetchPdf } from "../ProposalPage/ProposalSections/ProposalSections.slice";
import CheckMark from "./components/CheckMark";
import Card from "./components/Card";
import styled from "styled-components";
import "styled-components/macro";
import { useFrontendBoot, useTheme } from "../../customHooks";
import { small } from "../../utils/mediaQueries";
import { amount, getPolicyPremium, isSSOJourney } from "../../utils/helper";

const ThankYouPage = () => {
  const ls = new SecureLS();

  const history = useHistory();

  const { pathname } = useLocation();

  const [payment, SetPayment] = useState(true);

  const firstInterval = useRef(null);

  const secondInterval = useRef(null);

  const { colors } = useTheme();

  const SecondaryColor = colors.secondary_color;

  const { policyStatus, policyLoading } = useSelector(
    state => state.proposalPage,
  );

  const total_premium = amount(getPolicyPremium(policyStatus));

  const {
    data: { tenant: tenantDetail, settings },
  } = useFrontendBoot();

  const [loading, setLoading] = useState(false);
  const [isTransactionClicked, setIsTransactionClicked] = useState(false);

  document.querySelectorAll("#transaction_link")?.forEach(ele => {
    ele.addEventListener("click", () => {
      setIsTransactionClicked(true);
      window.isTransactionClicked = true;
      // const win = window?.open(settings.account_login_link, "_blank");
      // win?.focus();
    });
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      dispatch(fetchPdf());
      let firstCounter = 11;
      let secondCounter = 23;
      firstInterval.current = setInterval(() => {
        firstCounter -= 1;
        if (firstCounter === 0) {
          clearInterval(firstInterval.current);
          secondInterval.current = setInterval(() => {
            secondCounter -= 1;
            if (secondCounter === 0) {
              clearInterval(secondInterval.current);
            }
            dispatch(fetchPdf());
          }, 10000);
        }
        dispatch(fetchPdf());
      }, 5000);
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (
      policyStatus?.length &&
      policyStatus[0]?.pdf_path !== null &&
      policyStatus[0]?.pdf_path !== undefined
    ) {
      setLoading(false);
    }
    if (
      policyStatus?.length &&
      policyStatus[0]?.underwriting_status === "underwriting_approval"
    ) {
      clearInterval(firstInterval.current);
      clearInterval(secondInterval.current);
    }
  }, [policyStatus]);

  useEffect(() => {
    if (pathname === "/thankyou") {
      document.body.style.background = "rgb(248, 249, 251)";
    } else {
      document.body.style.background = "";
    }
  }, [pathname]);

  const thankYouBanner = isSSOJourney()
    ? settings?.thank_you_banner_pos
    : settings?.thank_you_banner;

  const currentGroup =
    localStorage.getItem("groups") &&
    JSON.parse(localStorage.getItem("groups")).find(group => group?.id);

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
          ></div>
          <div className="hideOnMobile">
            <div className="thankheading__wrapper">
              {!thankYouBanner && (
                <div className="thankheading__message">
                  Thank you for choosing{" "}
                  {tenantDetail && tenantDetail.name
                    ? tenantDetail.name
                    : "Fyntune"}
                  !
                </div>
              )}
              <div className="thankheading__right">Your Purchase</div>
            </div>
            <div className="thankmain__wrapper">
              <div className="row">
                <BannerArea
                  thankYouBanner={thankYouBanner}
                  settings={settings}
                  total_premium={total_premium}
                  colors={colors}
                  isTransactionClicked={isTransactionClicked}
                  setIsTransactionClicked={setIsTransactionClicked}
                  tenant={tenantDetail}
                />

                <div className="col-lg-6">
                  <div className="thankcard__wrapper">
                    {loading ? (
                      <Card />
                    ) : (
                      policyStatus?.map((item, index) => {
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
              </div>

              <MobileBanner
                colors={colors}
                settings={settings}
                tenantDetail={tenantDetail}
                thankYouBanner={thankYouBanner}
                total_premium={total_premium}
                isTransactionClicked={isTransactionClicked}
                setIsTransactionClicked={setIsTransactionClicked}
                tenant={tenantDetail}
              />

              <div>
                {loading ? (
                  <Card />
                ) : (
                  policyStatus?.map((item, index) => {
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
                        Don&lsquo;t worry. Please try again.
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
                      <span
                        role="button"
                        tabIndex={0}
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
                      </span>
                      <span
                        role="button"
                        tabIndex={0}
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
                      </span>

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
                    Dont worry. Please try again.
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

const BannerArea = ({
  thankYouBanner,
  total_premium,
  colors,
  settings,
  isTransactionClicked,
  setIsTransactionClicked,
  tenant,
}) => {
  return (
    <div className="col-lg-6">
      {!thankYouBanner && (
        <>
          <div
            className="thankmain__message"
            css={`
              color: ${colors?.primary_color} !important;
              background: ${colors?.primary_shade};
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
                background-color: ${colors?.secondary_color} !important;
              `}
            />
          </div>
          <div>
            {settings && tenant?.alias !== "robinhood" && (
              <Disclaimer
                shopMoreLink={settings.shop_more_link || ""}
                accountLoginLink={settings.account_login_link || ""}
                colors={colors}
                isTransactionClicked={isTransactionClicked}
                setIsTransactionClicked={setIsTransactionClicked}
              />
            )}
          </div>
        </>
      )}
      {thankYouBanner && (
        <div
          className="col-mg-6"
          css={`
            box-sizing: border-box;
            padding: 0px 30px;
            padding-top: 20px;
            position: relative;
            top: -58px;

            & p:first-child {
              font-size: 28px;
              line-height: 1.21;
              text-align: left;
              color: #000000;
              font-weight: bold;
            }

            & p:nth-child(2) {
              width: fit-content;
              color: ${colors?.primary_color};
              background: ${colors?.primary_shade};
              border-radius: 22px;
              font-weight: 700;
              padding: 14px 20px 14px 70px;
              font-size: 22px;
              min-height: 56px;
              position: relative;

              & span {
                font-weight: 700 !important;
                font-size: 22px !important;
                color: ${colors?.primary_color} !important;
              }

              &::before {
                content: "";
                height: 50px;
                width: 50px;
                position: absolute;
                margin-left: -57px;
                margin-top: -10px;
                border-radius: 100%;
                background-image: url(${Correct});
                background-size: cover;
              }
            }

            & p:nth-child(3) {
              font-size: 20px !important;
              color: ${colors?.primary_color};
              a {
                font-weight: bold;
                text-decoration: underline;
                border-bottom: ${colors?.primary_color} dashed 1px;
                &:focus,
                &:hover,
                &:link,
                &:visited {
                  text-decoration: none;
                  border-bottom: ${colors?.primary_color} dashed 1px;
                }
              }
              &::before {
                content: "";
                margin: 30px 0px;
                display: block;
                background: ${colors?.secondary_color};
                width: 84px;
                height: 14px;
                border-radius: 90px;
              }
            }

            & p:last-child {
              color: ${colors?.primary_color};
              font-size: 20px !important;
              a {
                font-weight: bold;
                text-decoration: underline;
                border-bottom: ${colors?.primary_color} dashed 1px;
                &:focus,
                &:hover,
                &:link,
                &:visited {
                  text-decoration: none;
                  border-bottom: ${colors?.primary_color} dashed 1px;
                }
              }
            }
          `}
          dangerouslySetInnerHTML={{
            __html: thankYouBanner?.split("₹X").join(total_premium),
          }}
        ></div>
      )}
    </div>
  );
};

const Disclaimer = ({
  colors,
  accountLoginLink,
  shopMoreLink,
  setIsTransactionClicked,
}) => {
  const { policyStatus } = useSelector(state => state.proposalPage);

  const onTransactionClickHandler = () => {
    setIsTransactionClicked(true);
    window.isTransactionClicked = true;
    const win = window.open(accountLoginLink, "_blank");
    win?.focus();
  };

  // console.log({ isTransactionClicked });

  if (
    policyStatus?.every(
      item => item.underwriting_status === "underwriting_approval",
    )
  ) {
    return (
      <>
        <div
          className="policy__disclaimer"
          css={`
            color: ${colors?.primary_color} !important;
          `}
        >
          You can track your policy status on{" "}
          <a
            css={`
              color: ${colors?.primary_color} !important;
              border-color: ${colors?.primary_color} !important;
            `}
            // href={accountLoginLink}
            onClick={onTransactionClickHandler}
          >
            My Account Page.
          </a>{" "}
          at anytime.
        </div>
        <div>
          <a
            href={shopMoreLink}
            className="shopmore__button  btn-link"
            css={`
              color: ${colors?.primary_color} !important;
              border-color: ${colors?.primary_color} !important;
            `}
          >
            Shop More {">"}
          </a>
        </div>
      </>
    );
  } else if (policyStatus?.every(item => item.status === "policy_issued"))
    return (
      <>
        {" "}
        <div
          className="policy__disclaimer"
          css={`
            color: ${colors?.primary_color} !important;
          `}
        >
          Your policy document has been successfully saved in{" "}
          <a
            // href={accountLoginLink}
            onClick={onTransactionClickHandler}
            css={`
              color: ${colors?.primary_color} !important;
              border-color: ${colors?.primary_color} !important;
            `}
          >
            My Account Page.
          </a>{" "}
          You can visit the My Account page to retrieve your policy copy at any
          time.
        </div>
        <div>
          <a
            href={shopMoreLink}
            className="shopmore__button  btn-link"
            css={`
              color: ${colors?.primary_color} !important;
              border-color: ${colors?.primary_color} !important;
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
            color: ${colors?.primary_color} !important;
          `}
        >
          You can visit the{" "}
          <a
            // href={accountLoginLink}
            onClick={onTransactionClickHandler}
            id="transaction_id"
            css={`
              color: ${colors?.primary_color} !important;
              border-color: ${colors?.primary_color} !important;
            `}
          >
            My Account Page.
          </a>{" "}
          to retrieve your policy copy or track your policy status at any time.
        </div>
        <div>
          <a
            href={shopMoreLink}
            className="shopmore__button  btn-link"
            css={`
              color: ${colors?.primary_color} !important;
              border-color: ${colors?.primary_color} !important;
            `}
          >
            Shop More {">"}
          </a>
        </div>
      </>
    );
};

const MobileBanner = ({
  thankYouBanner,
  total_premium,
  colors,
  settings,
  tenantDetail,
  setIsTransactionClicked = () => {},
  tenant,
}) => {
  const shopMoreLink = settings.shop_more_link || "";
  const accountLoginLink = settings.account_login_link || "";

  const onTransactionClickHandler = () => {
    setIsTransactionClicked(true);
    window.isTransactionClicked = true;
    const win = window.open(accountLoginLink, "_blank");
    win?.focus();
  };

  if (!thankYouBanner)
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
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
              backgroundColor: `linear-gradient(90deg, ${colors?.primary_shade} 0%,rgb(255 255 255) 100%) `,
              display: "flex",
              alignItems: "center",
              color: colors?.primary_color,
              padding: "8px 10px",
              fontSize: "15px",
              whiteSpace: "nowrap",
              fontWeight: "bold",
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
                backgroundColor: colors?.secondary_color,
                marginLeft: "0px",
                width: "50px",
                height: "9px",
                marginTop: "20px",
              }}
            />
          </div>
        </div>
        {tenant?.alias !== "robinhood" && (
          <div
            style={{
              margin: "10px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "14px", lineHeight: "1.3" }}>
              Your policy document has been successfully saved in{" "}
              <a
                // href={accountLoginLink}
                onClick={onTransactionClickHandler}
                style={{
                  color: colors?.primary_color,
                  borderBottom: `1px dashed ${colors?.primary_color}`,
                  fontWeight: "bold",
                }}
              >
                My Account Page.
              </a>{" "}
              You can visit the My Account page to retrieve your policy copy at
              any time.
            </p>

            <p style={{ fontSize: "14px", marginTop: "20px" }}>
              <a
                href={shopMoreLink}
                style={{
                  color: colors?.primary_color,
                  borderBottom: `1px dashed ${colors?.primary_color}`,
                  fontWeight: "bold",
                }}
              >
                Shop More {">"}
              </a>
            </p>
          </div>
        )}
      </>
    );
  if (thankYouBanner)
    return (
      <div
        css={`
          & p:first-child {
            font-size: 21px;
            line-height: 1.21;
            text-align: center;
            color: #000000;
            font-weight: bold;
          }

          & p:nth-child(2) {
            width: fit-content;
            color: ${colors?.primary_color};
            background: ${colors?.primary_shade};
            border-radius: 22px;
            font-weight: 700;
            padding: 10px 10px 10px 35px;
            font-size: 11px !important;
            position: relative;
            margin: 0 auto;

            & span {
              font-weight: 700 !important;
              font-size: 11px !important;
              color: ${colors?.primary_color} !important;
            }

            &::before {
              content: "";
              height: 20px;
              width: 20px;
              position: absolute;
              margin-left: -25px;
              margin-top: -2px;
              border-radius: 100%;
              background-image: url(${Correct});
              background-size: cover;
            }
          }

          & p:nth-child(3) {
            margin-top: 10px;
            text-align: center;
            font-size: 11px !important;
            a {
              font-weight: 700;
              text-decoration: underline;
              color: ${colors?.primary_color};
            }
          }

          & p:last-child {
            text-align: center;
            color: ${colors?.primary_color};
            font-size: 11px !important;
            a {
              font-weight: 700;
              text-decoration: underline;
            }
          }
        `}
        dangerouslySetInnerHTML={{
          __html: thankYouBanner?.split("₹X").join(total_premium),
        }}
      ></div>
    );
};

export default ThankYouPage;
