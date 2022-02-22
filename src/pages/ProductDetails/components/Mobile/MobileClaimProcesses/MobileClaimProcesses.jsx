import React, { useState } from "react";

import "./MobileClaimProcesses.css";
import styled from "styled-components";
import "styled-components/macro";
import { useSelector } from "react-redux";
import SpinLoader from "../../../../../components/Common/SpinLoader/SpinLoader";
import { RiDownload2Line, RiMailLine, RiPhoneLine } from "react-icons/ri";
import { useTheme } from "../../../../../customHooks";

import { mobile } from "../../../../../utils/mediaQueries";
// import "../ClaimProcessMobile/ClaimProcessMobile.css"

function MobileClaimProcess({ ActiveMainTab, claimProccess, claimform }) {
  const [activebtn, setActivebtn] = useState(1);
  const { loading } = useSelector(state => state.seeDetails);

  const { colors } = useTheme();

  return (
    <div
      className={`z-content ${ActiveMainTab && "z-active"}`}
      style={{
        display: ActiveMainTab ? "block" : "none",
      }}
      css={`
        display: none;
        ${mobile} {
          display: block;
          padding-bottom: 90px !important;
        }
      `}
    >
      <Outer>
        {loading ? (
          <SpinLoader />
        ) : (
          <>
            <FeatureSection>
              <div>
                <h6 style={{ fontWeight: "600", marginTop: "10px" }}>
                  How do I file a claim?
                </h6>
              </div>
            </FeatureSection>
            <ActiveBar>
              <TabButton
                onClick={() => setActivebtn(1)}
                style={{
                  textAlign: "center",
                  backgroundColor: activebtn === 1 && "#0a87ff",
                  color: activebtn === 1 && "#fff",
                }}
                className={`tab ${activebtn === 1 && "tab__active"} `}
              >
                <span
                  css={`
                    @media (max-width: 350px) {
                      white-space: pre-line !important;
                    }
                  `}
                >
                  {" "}
                  Cashless Claim
                </span>
              </TabButton>
              <TabButton
                onClick={() => setActivebtn(2)}
                style={{
                  backgroundColor: activebtn === 2 && "#0a87ff",
                  color: activebtn === 2 && "#fff",
                }}
                className={`tab ${activebtn === 2 && "tab__active"} `}
              >
                <span
                  css={`
                    @media (max-width: 350px) {
                      white-space: pre-line !important;
                    }
                  `}
                >
                  {" "}
                  Document Required
                </span>
              </TabButton>
              <TabButton
                onClick={() => setActivebtn(3)}
                style={{
                  backgroundColor: activebtn === 3 && "#0a87ff",
                  color: activebtn === 3 && "#fff",
                }}
                className={`tab ${activebtn === 3 && "tab__active"} `}
              >
                <span
                  css={`
                    @media (max-width: 350px) {
                      white-space: pre-line !important;
                    }
                  `}
                >
                  Reimbursement Claim
                </span>
              </TabButton>
            </ActiveBar>
            {activebtn === 1 && (
              <Inner>
                {/* <img src={cashlessImg} style={{ width: "110px" }} alt="" /> */}
                <h3
                  className="text-left cashless_t_r_t_main"
                  style={{ marginBottom: "0px", fontFamily: "unset" }}
                >
                  Cashless Claim
                </h3>
                <Paragraph
                  className="leade_p"
                  style={{
                    textAlign: "justify",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: claimProccess.cashless_claim,
                  }}
                ></Paragraph>
              </Inner>
            )}
            {activebtn === 2 && (
              <Inner>
                {/* <img src={cashlessImg} style={{ width: "110px" }} alt="" /> */}
                <h3
                  className="text-left cashless_t_r_t_main"
                  style={{ marginBottom: "0px", fontFamily: "unset" }}
                >
                  Document Required
                </h3>
                <Paragraph
                  className="leade_p"
                  style={{
                    textAlign: "justify",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: claimProccess.document_required,
                  }}
                ></Paragraph>
              </Inner>
            )}
            {activebtn === 3 && (
              <Inner>
                {/* <img src={cashlessImg} style={{ width: "110px" }} alt="" /> */}
                <h3
                  className="text-left cashless_t_r_t_main"
                  style={{ marginBottom: "0px", fontFamily: "unset" }}
                >
                  Reimbursement Claim
                </h3>
                <Paragraph
                  className="leade_p"
                  style={{
                    textAlign: "justify",
                    fontSize: "14px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: claimProccess.reimbursement_claim,
                  }}
                ></Paragraph>
              </Inner>
            )}

            <Info>
              <div>
                <h4
                  className="title imp_title_row_l"
                  style={{ fontSize: "21px" }}
                  css={`
                    @media (max-width: 600px) {
                      font-size: 16px !important;
                    }
                  `}
                >
                  Please reach out on details below for further queries.
                </h4>
              </div>
              {/* <p className="p_important_sub" 
                            css={`
                            margin-top:0px !important;
                            `}
                            >
                                Don't Hesitate to contact us for any information.
                            </p>{" "} */}
              <div
                style={{
                  padding: "18px 0px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {claimform.claim_url ? (
                  <div style={{ display: "flex", marginBottom: "20px" }}>
                    <div>
                      <div
                        className="col-md-2"
                        css={`
                          justify-content: center;
                          align-items: center;
                          background-color: #fff;
                          display: flex;
                          border-radius: 100%;
                          width: 40px;
                          height: 40px;
                          margin-right: 10px;
                        `}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={claimform.claim_url}
                        >
                          <RiDownload2Line
                            size="26px"
                            color={colors.primary_color}
                          />
                        </a>
                      </div>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <h4
                        style={{
                          lineHeight: "0px",
                          padding: " 0px ",
                          whiteSpace: "nowrap",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        Claim Form
                      </h4>
                      <p
                        className="feature-offer-box__p break-on-overflow "
                        style={{ marginTop: "10px", fontSize: "12px" }}
                      >
                        Download Claim Form here.{" "}
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {claimProccess.toll_free_number ? (
                  <>
                    <div style={{ display: "flex", marginBottom: "20px" }}>
                      <div>
                        <div
                          className="col-md-2"
                          css={`
                            justify-content: center;
                            align-items: center;
                            background-color: #fff;
                            display: flex;
                            border-radius: 100%;
                            width: 40px;
                            height: 40px;
                            margin-right: 10px;
                          `}
                        >
                          <a
                            href={`tel:${claimProccess?.toll_free_number}`}
                            target={"_blank"}
                            rel="noreferrer"
                          >
                            <RiPhoneLine
                              size="26px"
                              color={colors.primary_color}
                            />
                          </a>
                        </div>
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        <h4
                          style={{
                            lineHeight: "0px",
                            padding: " 0px ",
                            whiteSpace: "nowrap",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Toll Free No.
                        </h4>
                        <p
                          className="feature-offer-box__p break-on-overflow "
                          style={{ marginTop: "10px", fontSize: "12px" }}
                        >
                          {claimProccess.toll_free_number}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {claimProccess?.email ? (
                  <>
                    <div style={{ display: "flex" }}>
                      <div>
                        <div
                          className="col-md-2"
                          css={`
                            justify-content: center;
                            align-items: center;
                            background-color: #fff;
                            display: flex;
                            border-radius: 100%;
                            width: 40px;
                            height: 40px;
                            margin-right: 10px;
                          `}
                        >
                          <a
                            href={`mailto:${claimProccess?.email}`}
                            target={"_blank"}
                            rel="noreferrer"
                          >
                            <RiMailLine
                              size="26px"
                              color={colors.primary_color}
                            />
                          </a>
                        </div>
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        <h4
                          style={{
                            lineHeight: "0px",
                            padding: " 0px ",
                            whiteSpace: "nowrap",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Drop Us An Email
                        </h4>
                        <p
                          className="feature-offer-box__p break-on-overflow "
                          style={{ marginTop: "10px", fontSize: "12px" }}
                        >
                          {claimProccess?.email}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </Info>
          </>
        )}
      </Outer>
    </div>
  );
}

const Outer = styled.div`
  background-color: #fff;
`;
const FeatureSection = styled.div`
  padding: 10px;
  padding-top: 20px;
  margin-left: 20px;
  display: flex;
  &::before {
    content: "";
    color: #2cd44a;
    height: 39px;
    width: 9px;
    padding-right: 10px;
    margin-right: 10px;
    @media (max-width: 767px) {
      padding-right: 5px;
      width: 5px;
    }
    /* top: -7px; */
    /* left: -20px; */
    /* position: absolute; */
    /* background-color: #de9b9e; */
    background-color: #2cd44a;
    border-radius: 0 15px 15px 0;
  }
  @media (max-width: 1022px) {
    padding: 0px !important;
    padding-top: 20px !important;
  }
`;

const ActiveBar = styled.div`
  width: fit-content;
  box-shadow: 0px 0px 10px #d8d8d8;
  @media (max-width: 400px) {
    width: 90%;
  }
  display: flex;
  justify-content: space-evenly;
  /* background-color:#f3f4f9; */
  margin: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  height: 40px;
`;
const TabButton = styled.button`
  /* width:100px; */
  font-size: 12px;
  border: none;
  font-weight: bold;
  @media (max-width: 400px) {
    font-size: 11px !important;
    padding: 5px !important;
    width: 100%;
  }
  white-space: nowrap;
  padding: 10px;
  /* &:after{
    content: "";
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 11px solid#0d6efd;
  position: relative;
  bottom: -36px;
  left: -40%;
  transform: translateX(-50%);
}
  */
  /* border-right: 1px solid black; */
`;

const Inner = styled.div`
  margin: 20px;
  margin-top: 20px;
`;
const Paragraph = styled.p`
  & div {
    font-size: 14px;
    line-height: 1.2;
    @media (max-width: 600px) {
      font-size: 12px !important;
    }
  }
  & p {
    font-size: 14px;
    line-height: 1.2;
    @media (max-width: 600px) {
      font-size: 12px !important;
    }
    & span {
      font-size: 14px;
      line-height: 1.2;
      @media (max-width: 600px) {
        font-size: 12px !important;
      }
    }
  }
  & b {
    font-size: 16px;
    line-height: 1.3;
    @media (max-width: 600px) {
      font-size: 14px !important;
    }
  }
  & u {
    color: black;
    line-height: 4;
  }
  & a {
    color: blue;
  }
`;

const Info = styled.div`
  border-top: 1px solid lightgray;

  padding: 10px;
  padding-top: 20px;
  padding-bottom: 40px;
`;

export default MobileClaimProcess;
