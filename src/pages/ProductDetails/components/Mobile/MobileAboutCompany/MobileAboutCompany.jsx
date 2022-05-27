import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "styled-components/macro";
import SpinLoader from "../../../../../components/Common/SpinLoader/SpinLoader";
import ProgessBar from "../../../../SeeDetails/components/AboutCompany/ProgessBar";
import BarGroupMobile from "./BarGroupMobile";
import BarMarketMobile from "./BarMarketMobile";
import { tabletAndMobile } from "../../../../../utils/mediaQueries";
import { useTheme } from "../../../../../customHooks";

function MobileAboutCompany({ ActiveMainTab, aboutCompany, company_name }) {
  const [activebtn, setActivebtn] = useState(1);

  const { loading } = useSelector(state => state.seeDetails);
  const { colors } = useTheme();

  return (
    <div
      className={`z-content ${ActiveMainTab && "z-active"}`}
      style={{ display: ActiveMainTab ? "block" : "none" }}
      css={`
        display: none !important;
        ${tabletAndMobile} {
          display: block !important;
          padding-bottom: 70px !important;
        }
      `}
    >
      <Outer>
        {loading ? (
          <SpinLoader />
        ) : (
          <>
            <CompanyDetails>
              <h2 style={{ fontSize: "19px", marginBottom: "16px" }}>
                About{" "}
                <span style={{ color: colors.primary_color }}>
                  {company_name}
                </span>{" "}
                insurance
              </h2>
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: "1.3",
                  color: "black",
                  fontFamily: "unset",
                }}
                css={`
                  & p {
                    line-height: 1.3;
                    font-family: unset !important;
                  }
                  & span {
                    font-family: unset !important;
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
                    border: none;
                    font-weight: bold;
                  `}
                  onClick={() => setActivebtn(1)}
                  style={{
                    backgroundColor: activebtn === 1 && colors.primary_color,
                    color: activebtn === 1 && "#fff",
                  }}
                >
                  Market Size
                </button>
                <button
                  css={`
                    font-size: 13px;
                    width: 100px;
                    border: none;
                    font-weight: bold;
                  `}
                  onClick={() => setActivebtn(2)}
                  style={{
                    backgroundColor: activebtn === 2 && colors.primary_color,
                    color: activebtn === 2 && "#fff",
                  }}
                >
                  Claim Ratio
                </button>
                <button
                  css={`
                    font-size: 13px;
                    width: 100px;
                    border: none;
                    font-weight: bold;
                  `}
                  onClick={() => setActivebtn(3)}
                  style={{
                    backgroundColor: activebtn === 3 && colors.primary_color,
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
                          colors={aboutCompany.data.group_color
                            .map(group_color => Object.values(group_color)[0])
                            .slice(0, 3)
                            .reverse()}
                        />
                      </div>
                    )}
                  </Graph>

                  <Detail>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--font-gray-two)",
                        maxWidth: "280px",
                        lineHeight: "1.3",
                      }}
                    >
                      <span style={{ color: colors.primary_color }}>
                        Why it is important:{" "}
                      </span>
                      Market size refers to measure of the consumers&#39;
                      preference for a product over other similar products.{" "}
                    </p>
                  </Detail>
                </Inner>
              )}
              {activebtn === 2 && (
                <Inner>
                  <Graph>
                    <div>
                      {aboutCompany.data && (
                        <BarGroupMobile
                          data={aboutCompany.data.claim_settlement_ratios}
                          colors={aboutCompany.data.group_color
                            .map(group_color => Object.values(group_color)[0])
                            .slice(0, 3)
                            .reverse()}
                        />
                      )}
                    </div>
                  </Graph>

                  <Detail>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--font-gray-two)",
                        maxWidth: "280px",
                        lineHeight: "1.3",
                      }}
                    >
                      <span style={{ color: colors.primary_color }}>
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
                        margin: "10px",
                      }}
                    >
                      {aboutCompany?.data?.claim_incured_ratios?.map(
                        (data, i) => {
                          return (
                            data.year !== null && (
                              <ProgessBar
                                year={data.year}
                                value={`${parseFloat(data.percent)}`}
                                color={
                                  aboutCompany.data.group_color
                                    .map(
                                      group_color =>
                                        Object.values(group_color)[0],
                                    )
                                    .reverse()[i + 1]
                                }
                              />
                            )
                          );
                        },
                      )}
                    </div>
                  </Graph>

                  <Detail>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--font-gray-two)",
                        maxWidth: "280px",
                        lineHeight: "1.3",
                      }}
                    >
                      <span style={{ color: colors.primary_color }}>
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
  /* border: 1px solid #aaa; */
  font-weight: bold;
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

export default MobileAboutCompany;
