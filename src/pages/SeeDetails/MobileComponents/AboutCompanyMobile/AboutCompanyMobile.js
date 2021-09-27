import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "styled-components/macro";
import SpinLoader from "../../../../components/Common/SpinLoader/SpinLoader";
import ProgessBar from "../../components/AboutCompany/ProgessBar";
import BarGroupMobile from "./BarGroupMobile";
import BarMarketMobile from "./BarMarketMobile";
import ProgressBarMobile from "./ProgressBarMobile";
function AboutCompanyMobile({ ActiveMainTab, aboutCompany, company_name }) {
  const [activebtn, setActivebtn] = useState(1);

  const { loading } = useSelector(state => state.seeDetails);

  return (
    <div
      className={`z-content ${ActiveMainTab && "z-active"}`}
      style={{ display: ActiveMainTab ? "block" : "none" }}
    >
      <Outer>
        {loading ? (
          <SpinLoader />
        ) : (
          <>
            <CompanyDetails>
              <h2 style={{ fontSize: "19px", marginBottom: "16px" }}>
                About <span style={{ color: "#0a87ff" }}>{company_name}</span>{" "}
                insurance
              </h2>
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: "1.3",
                  color: "gray",

                }}
                css={`
                  & p {
                    line-height: 1.3;
                  }
                  & span {

                  }
                `}
                dangerouslySetInnerHTML={{
                  __html: aboutCompany?.data?.overview || "no data available",
                }}
              ></p>
            </CompanyDetails>
            <span
              css={`
                display: ${company_name === "Star Health" && "none"};
              `}
            >
              <TabFor>
                <button
                  css={`
                    font-size: 13px;
                    width: 100px;
                    border:none;
                  `}
                  onClick={() => setActivebtn(1)}
                  style={{
                    backgroundColor: activebtn === 1 && "#0a87ff",
                    color: activebtn === 1 && "#fff",
                  }}
                >
                  Market Size
                </button>
                <button
                  css={`
                    font-size: 13px;
                    width: 100px;
                    border:none;
                  `}
                  onClick={() => setActivebtn(2)}
                  style={{
                    backgroundColor: activebtn === 2 && "#0a87ff",
                    color: activebtn === 2 && "#fff",
                  }}
                >
                  Claim Ratio
                </button>
                <button
                  css={`
                    font-size: 13px;
                    width: 100px;
                    border:none;
                  `}
                  onClick={() => setActivebtn(3)}
                  style={{
                    backgroundColor: activebtn === 3 && "#0a87ff",
                    color: activebtn === 3 && "#fff",
                  }}
                >
                  Incurred Ratio
                </button>
              </TabFor>
              {activebtn === 1 && (
                <Inner>
                  <Graph>
                    {aboutCompany.data && (
                      <div>
                        <BarMarketMobile
                          data={aboutCompany.data.market_sizes}
                        />
                      </div>
                    )}
                  </Graph>

                  <Detail>
                    <p
                      css={`
                        & span {
                          font-size: 13px;
                        }
                      `}
                      style={{ fontSize: "13px" }}
                    >
                      <span
                        className="span_square_red"
                        css={`
                          background: #0a87ff;
                          border-radius: 6px;
                          padding: 4px 8px;
                        `}
                        style={{ marginRight: "10px", fontSize: "10px" }}
                      >
                        &nbsp;
                      </span>{" "}
                      {2020} &nbsp; &nbsp; &nbsp;
                      <span className="span_border_right_plan">|</span> &nbsp;
                      &nbsp; &nbsp;{" "}
                      <span
                        className="span_square_pink"
                        css={`
                        background: #ffe7e7;
                        border-radius: 6px;
                        padding: 4px 8px;
                      `}
                        style={{ marginRight: "10px", fontSize: "10px" }}
                      >
                        &nbsp;
                      </span>{" "}
                      Current Market Premium 2021
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--font-gray-two)",
                        maxWidth: "280px",
                        lineHeight: "1.3",
                      }}
                    >
                      <span className="text_red_title">
                        Why it is important:{" "}
                      </span>
                      Market size refers to measure of the consumers' preference
                      for a product over other similar products.{" "}
                    </p>
                  </Detail>
                </Inner>
              )}
              {activebtn === 2 && (
                <Inner>
                  <Graph>
                    <div>
                      {aboutCompany.data && (
                        <div>
                          <BarGroupMobile
                            data={aboutCompany.data.claim_settlement_ratios}
                          />
                        </div>
                      )}
                    </div>
                  </Graph>

                  <Detail>
                    <p
                      css={`
                        & span {
                          font-size: 13px;
                        }
                      `}
                      style={{ fontSize: "13px" }}
                    >
                      <span
                        className="span_square_red"
                        css={`
                        background: #0a87ff;
                        border-radius: 6px;
                        padding: 4px 8px;
                      `}
                        style={{ marginRight: "10px", fontSize: "10px" }}
                      >
                        &nbsp;
                      </span>{" "}
                      {2020} &nbsp; &nbsp; &nbsp;
                      <span className="span_border_right_plan">|</span> &nbsp;
                      &nbsp; &nbsp;{" "}
                      <span
                        className="span_square_pink"
                        css={`
                        background: #ffe7e7;
                        border-radius: 6px;
                        padding: 4px 8px;
                      `}
                        style={{ marginRight: "10px", fontSize: "10px" }}
                      >
                        &nbsp;
                      </span>{" "}
                      Current Market Premium 2021
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--font-gray-two)",
                        maxWidth: "280px",
                        lineHeight: "1.3",
                      }}
                    >
                      <span className="text_red_title">
                        Why it is important:{" "}
                      </span>
                      Claim Settlement Ratio of an Insurer is the number of
                      claims settled against the number of claims filed.{" "}
                    </p>
                  </Detail>
                </Inner>
              )}
              {activebtn === 3 && (
                <Inner>
                  <Graph>
                    <div
                      style={{
                        paddingTop: "50px",
                        margin: "10px",
                        marginBottom: "50px",
                      }}
                    >
                      {aboutCompany?.data?.claim_incured_ratios?.map(
                        (data, i) => {
                          return (
                            data.year !== null && (
                              // <ProgressBarMobile
                              //   year={data.year}
                              //   value={`${parseFloat(data.percent)}`}
                              //   color={data.color}
                              // />
                              <ProgessBar
                              year={data.year}
                              value={`${parseFloat(data.percent)}`}
                              color={data.color}
                            />
                            )
                          );
                        },
                      )}
                    </div>
                  </Graph>

                  <Detail>
                    <p
                      css={`
                        & span {
                          font-size: 13px;
                        }
                      `}
                      style={{ fontSize: "13px" }}
                    >
                      <span
                        className="span_square_red"
                        css={`
                        background: #0a87ff;
                        border-radius: 6px;
                        padding: 4px 8px;
                      `}
                        style={{ marginRight: "10px", fontSize: "10px" }}
                      >
                        &nbsp;
                      </span>{" "}
                      {2020} &nbsp; &nbsp; &nbsp;
                      <span className="span_border_right_plan">|</span> &nbsp;
                      &nbsp; &nbsp;{" "}
                      <span
                        className="span_square_pink"
                        css={`
                        background: #ffe7e7;
                        border-radius: 6px;
                        padding: 4px 8px;
                      `}
                        style={{ marginRight: "10px", fontSize: "10px" }}
                      >
                        &nbsp;
                      </span>{" "}
                      Current Market Premium 2021
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--font-gray-two)",
                        maxWidth: "280px",
                        lineHeight: "1.3",
                      }}
                    >
                      <span className="text_red_title">
                        Why it is important:{" "}
                      </span>
                      Claim Incurred Ratio refers to the net claims paid by an
                      insurance company as against the net premiums earned.{" "}
                    </p>
                  </Detail>
                </Inner>
              )}
            </span>
          </>
        )}
      </Outer>
    </div>
  );
}
const Outer = styled.div`
  background-color: #fff;
`;
const CompanyDetails = styled.div`
  margin: 0px 20px;
  padding-top: 20px;
  padding-bottom: 25px;
  text-align: center;
`;

const TabFor = styled.div`
  border: 1px solid #aaa;
  width: 300px;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
`;
const Inner = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
`;
const Graph = styled.div`
  background-color: #f3f4f9;
  height: fit-content;
  padding: 20px;
`;

const Detail = styled.div`
  padding-top: 10px;
`;

export default AboutCompanyMobile;
