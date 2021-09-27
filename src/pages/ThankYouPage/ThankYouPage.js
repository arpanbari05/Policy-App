import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import "./ThankYouPage.scss";
import Success from "../../assets/images/success.png";

import Correct from "../../assets/images/correct.png";
import Unsuccess from "../../assets/images/unsuccess.png";
import CurR from "../../assets/images/img_cut_r.png";
import CutL from "../../assets/images/img_cut.png";
import SecureLS from "secure-ls";
import {
  fetchPdf,
  getPaymentStatus,
} from "../ProposalPage/ProposalSections/ProposalSections.slice";
import CheckMark from "./components/CheckMark";
import Card from "./components/Card";
import styled from "styled-components";
import "styled-components/macro"
//import CardMobile from "./components/CardMobile";

const ThankYouPage = () => {
  const ls = new SecureLS();
  const history = useHistory();
  const { pathname } = useLocation();
  const [payment, SetPayment] = useState(true);
  const [timer, SetTimer] = useState(6);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector(state => state.proposalPage);
  const { policyStatus, policyLoading } = useSelector(
    state => state.proposalPage,
  );
  const cart = useSelector(state => state.cart);

  // const callFetch = ()=>{
  //   count!== 0 &&    setTimeout(()=>setCount(count-1), 30000)
  // }()
  console.log(loading, policyStatus[0]?.pdf_path, 'hehehe2')
  useEffect(() => {
    setLoading(true);
    dispatch(fetchPdf());

    const getClear = setInterval(() => dispatch(fetchPdf()), 3000);
    setTimeout(() => {
      clearInterval(getClear);
      setLoading(false);
    }, 60000);
  }, []);

  useEffect(() => {

    if (policyStatus[0]?.pdf_path !== null && policyStatus[0]?.pdf_path !== undefined) {
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
  const Disclaimer = () => {
    if (policyStatus.every(item => item.status === "underwriting_approval")) {
      return (
        <>
          <div className="policy__disclaimer">
            You can track your policy status on{" "}
            <a href="https://cpprod.adityabirlainsurancebrokers.com/sign-in?rurl=https://cpprod.adityabirlainsurancebrokers.com/">
              My Account Page.
            </a>{" "}
            at anytime.
          </div>
        </>
      );
    } else if (policyStatus.every(item => item.status === "policy_issued"))
      return (
        <>
          {" "}
          <div className="policy__disclaimer">
            Your policy document has been successfully saved in{" "}
            <a href="https://cpprod.adityabirlainsurancebrokers.com/sign-in?rurl=https://cpprod.adityabirlainsurancebrokers.com/">
              My Account Page.
            </a>{" "}
            You can visit the My Account page to retrieve your policy copy at
            any time.
          </div>
        </>
      );
    else
      return (
        <>
          <div className="policy__disclaimer">
            You can visit the{" "}
            <a href="https://cpprod.adityabirlainsurancebrokers.com/sign-in?rurl=https://cpprod.adityabirlainsurancebrokers.com/">
              My Account Page.
            </a>{" "}
            to retrieve your policy copy or track your policy status at any
            time.
          </div>
        </>
      );
  };
  if (payment)
    return (
      <>
        <div className="hideOnMobile">
          <div className="thankheading__wrapper">
            <div className="thankheading__message">
              Thank you for choosing Fyntune!
            </div>
            <div className="thankheading__right">Your Purchase</div>
          </div>
          <div className="thankmain__wrapper">
            <div className="row">
              <div className="col-lg-6">
                <div className="thankmain__message">
                  <div className="thankmain__check">
                    <CheckMark />
                  </div>
                  <span
                  >Your Payment for ₹{" "}
                  {cart.totalPremium} was successful</span>
                </div>
                <div>
                  <div className="yellow__line" />
                </div>
                <div>
                  <Disclaimer />
                </div>
                <div>
                  <a
                    href="https://cpprod.adityabirlainsurancebrokers.com/"
                    className="shopmore__button  btn-link"
                  >
                    Shop More {">"}
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="thankcard__wrapper">
                  {loading ? (
                    <Card />
                  ) : (
                    policyStatus.map((item, index) => {
                      if (item.product)
                        return <Card values={item} isLoading={policyLoading} />;
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
                {<img src={Success} alt="" className="img_success"></img>}
              </div>
              <div style={{ padding: "20px 0px", marginTop: "20px" }}>
                <h5>Thankyou for choosing</h5>
                <h5>Fyntune!</h5>
              </div>
              <div
                style={{
                  backgroundColor: "linear-gradient(90deg, #eff7ff 0%,rgb(255 255 255) 100%) ",
                  display: "flex",
                  alignItems: "center",
                  color: "#0a87ff",
                  padding: "10px 10px",
                  fontSize: "15px",
                  whiteSpace: "nowrap",
                  // letterSpacing: "1px"
                }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    color: "#e4fff0",
                    borderRadius: "50%",
                    height: "40px",
                    width: "40px",
                    marginRight: "5px",
                  }}
                >
                  {<img

                    src={Correct} alt=""
                    css={`
                    width:40px;
                    `}
                  ></img>}
                </div>
                Your Payment for{" "}
                <i className="fa fa-inr" style={{ margin: "0px 2px" }} />
                {cart.totalPremium} was successful
              </div>
              <div>
                <div
                  className="yellow__line"
                  style={{
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
                    return <Card values={item} isLoading={policyLoading} />;
                  else return <Card></Card>;
                })
              )}
            </div>
            <div
              style={{
                margin: "10px",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "14px", lineHeight: "1.3" }}>
                Your policy document has been successfully saved in{" "}
                <a
                  href="https://cpprod.adityabirlainsurancebrokers.com/sign-in?rurl=https://cpprod.adityabirlainsurancebrokers.com/"
                  style={{
                    color: "#0a87ff",
                    borderBottom: "1px dashed #0a87ff",
                  }}
                >
                  My Account Page.
                </a>{" "}
                You can visit the My Account page to retrieve your policy copy
                at any time.
              </p>

              <p style={{ fontSize: "14px", marginTop: "20px" }}>
                <a
                  href="https://cpprod.adityabirlainsurancebrokers.com/"
                  style={{
                    color: "#0a87ff",
                    borderBottom: "1px dashed #0a87ff",
                  }}
                >
                  Shop More {">"}
                </a>
              </p>
            </div>
          </Outer>
        </div>
      </>
    );

  if (!payment)
    return (
      <>
        <div className="hideOnMobile">
          <div className="agn-counter-section-pay">
            <Container className="">
              <Row>
                <div className="bottom-banner">
                  <div className="text">
                    {<img src={Unsuccess} className="img_unsuccess"></img>}

                    <img src={CutL} className="img_left_cut"></img>
                    <img src={CurR} className={"img_right_cut_f"}></img>
                    {
                      <h3 className="title text-center unsuccess-text">
                        Uh-oh! We were unable to <br></br>
                        Process Your Payment{" "}
                      </h3>
                    }
                    {
                      <>
                        {" "}
                        <p className="text-p">
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout.
                        </p>
                      </>
                    }
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
                      background-color: #0a87ff;
                      border: 1px solid #0a87ff;
                      &:hover{
                        color:#000;
                      }
                      `}
                      onClick={() => {
                        history.push({
                          pathname: "/quotes",
                          search: `enquiryId=${ls.get("enquiryId")}`,
                        });
                      }}
                    >
                      Back To Quotes
                    </a>
                    <a
                      href="#"
                      className="btn_start_proposal_back_t"
                      css={`
                      color:#0a87ff;
                      border: 1px solid #0a87ff;
                      &:hover{
                        color:#000;
                      }`}
                      onClick={() => {
                        history.push({
                          pathname: "/proposal",
                          search: `enquiryId=${ls.get("enquiryId")}`,
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
                <h5>Oh no, your payment failed</h5>
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
                    search: `enquiryId=${ls.get("enquiryId")}`,
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
    );
};

const Outer = styled.div`
  margin: 10px;

  height: fit-content;
`;

export default ThankYouPage;
