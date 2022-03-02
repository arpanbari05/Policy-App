import React from "react";
import "./claimHover.css";
import { Col, Row } from "react-bootstrap";
import {
  RiDownload2Line,
  RiPhoneLine,
  RiMailLine,
  RiLink,
} from "react-icons/ri";
import mobile from "../../../assets/images/mobile.png";
import ClaimMain from "../components/ClaimProcess/ClaimProcessMain/ClaimMain";
import { useSelector } from "react-redux";
import "styled-components/macro";
import SpinLoader from "../../../components/Common/SpinLoader/SpinLoader";
import { useTheme } from "../../../customHooks";
import { tabletAndMobile } from "../../../utils/mediaQueries";
const populateData = (data, colors) => {
  return [
    {
      header: "Toll Free number",
      description: data?.toll_free_number || "no data",
      Image: <RiPhoneLine size={28} color={colors.primary_color} />,
    },
    {
      header: "Drop Us An Email",
      description: data?.email || "no data",
      Image: <RiMailLine size={28} color={colors.primary_color} />,
    },
  ];
};

const dataSet = dataArray => {
  const array = [];

  dataArray?.map((data, i) =>
    array.push(
      <div
        css={`
          border: solid 1px #c9c9c9;
          border-radius: 9px;
          margin: 0 auto 10px auto;
          padding: 15px;
          width: 96%;
        `}
      >
        <div
          css={`
            display: flex;
            align-items: center;
          `}
        >
          <div
            className="col-md-10"
            css={`
              margin-right: 14px;
            `}
          >
            <h4
              css={`
                color: #253858;
                font-weight: 900;
                font-size: 19px;
              `}
            >
              {data.header}
            </h4>
            <p
              css={`
                color: #253858;
                margin-bottom: 0px;
                margin-top: 8px;
                word-wrap: break-word;
              `}
            >
              {data.description}{" "}
            </p>
          </div>
          <div
            className="col-md-2"
            css={`
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 100%;
              width: 42px;
              height: 42px;
              @media (max-width: 1200px) {
                width: 31px;
                height: 31px;
              }
            `}
          >
            <a target="_blank" rel="noreferrer" href="#nothing">
              {data.Image}
            </a>
          </div>
        </div>
      </div>,
    ),
  );
  <div
    css={`
      border: solid 1px #c9c9c9;
      border-radius: 9px;
      margin: 0 auto 10px auto;
      padding: 15px;
      width: 96%;
    `}
  >
    <div className="row">
      <div className="col-md-10">
        <h4
          css={`
            color: #253858;
            font-weight: 900;
            font-size: 19px;
          `}
        >
          Claim Form
        </h4>
        <p
          css={`
            color: #253858;
            margin-bottom: 0px;
          `}
        >
          description{" "}
        </p>
      </div>
      <div
        className="col-md-2"
        css={`
          justify-content: center;
          align-items: center;
          display: flex;
          border-radius: 100%;
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="22"
          fill="currentColor"
          className="bi bi-download"
          viewBox="0 0 16 16"
        >
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
        </svg>
      </div>
    </div>
  </div>;
  return array;
};

const ClaimProcess = ({ ActiveMainTab, claimProccess, claimform }) => {
  const { loading } = useSelector(state => state.seeDetails);

  const { colors } = useTheme();

  return (
    <>
      <div
        className={`z-content ${ActiveMainTab && "z-active"}`}
        style={{
          position: "relative",
          display: ActiveMainTab ? "block" : "none",
          left: ActiveMainTab ? "0px" : "1296px",
          top: "10px",
        }}
        css={`
          ${tabletAndMobile} {
            display: none !important;
          }
        `}
      >
        {loading ? (
          <SpinLoader />
        ) : (
          <div
            className="tab_inner_product_detail z-content-inner"
            css={`
              display: flex;
              justify-content: center;
            `}
          >
            <div
              className="our-feature-app"
              css={`
                max-width: 1347px;
              `}
              style={{ padding: "0px 20px" }}
            >
              <div className="our-service-app">
                <div className="main-content hide-pr show-pr">
                  <Row
                    className="margin_important_row"
                    style={{ flexWrap: "nowrap" }}
                  >
                    <Col
                      lg={4}
                      className="bg_white_plan"
                      style={{
                        margin: 0,
                        height: "fit-content",
                        minWidth: "265px",
                        padding: "8px",
                      }}
                    >
                      <div className="feature-box_basic support-feature js-tilt padding_imp_row">
                        <div
                          css={`
                            background-color: ${colors.secondary_shade};
                            color: #253858;
                            padding: 22px;
                            /* padding-right: 82px; */
                            & h2 {
                              font-weight: 900;
                              font-size: 21px;
                            }
                          `}
                        >
                          <h2>
                            {" "}
                            Please reach out on details below for further
                            queries.
                          </h2>
                        </div>
                        <hr className="hr_p_b_cliam" />
                        {claimform?.claim_url ? (
                          <div
                            css={`
                              border: solid 1px #c9c9c9;
                              border-radius: 9px;
                              margin: 0 auto 10px auto;
                              padding: 15px;
                              width: 96%;
                            `}
                          >
                            <div
                              css={`
                                display: flex;
                                align-items: center;
                              `}
                            >
                              <div
                                className="col-md-10"
                                css={`
                                  margin-right: 14px;
                                `}
                              >
                                <h4
                                  css={`
                                    color: #253858;
                                    font-weight: 900;
                                    font-size: 19px;
                                  `}
                                >
                                  Claim Form
                                </h4>
                                <p
                                  css={`
                                    color: #253858;
                                    margin-bottom: 0px;
                                    margin-top: 8px;
                                  `}
                                >
                                  Download Claim Form here.{" "}
                                </p>
                              </div>
                              <div
                                className="col-md-2"
                                css={`
                                  display: flex;
                                  justify-content: center;
                                  align-items: center;
                                  border-radius: 100%;
                                  width: 42px;
                                  height: 42px;
                                  @media (max-width: 1200px) {
                                    width: 31px;
                                    height: 31px;
                                  }
                                `}
                              >
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href={claimform?.claim_url}
                                >
                                  {claimform?.claim_url
                                    .toLowerCase()
                                    .includes(".pdf") ? (
                                    <RiDownload2Line
                                      color={colors.primary_color}
                                      size={28}
                                    />
                                  ) : (
                                    <RiLink
                                      color={colors.primary_color}
                                      size={28}
                                    />
                                  )}
                                </a>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}

                        {claimProccess
                          ? dataSet(populateData(claimProccess, colors))
                          : null}
                      </div>
                    </Col>
                    {/* ============================================================ */}
                    <Col
                      md={8}
                      style={{
                        marginTop: "27px",
                      }}
                    >
                      <ClaimMain claimProccess={claimProccess} />
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ClaimProcess;
