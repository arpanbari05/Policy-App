import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "styled-components/macro";
import { PieChart } from "react-minimal-pie-chart";
import BarGroup from "../components/AboutCompany/BarGroup";
import DataContainer from "../components/AboutCompany/DataContainer";
import ProgessBar from "../components/AboutCompany/ProgessBar";
import { useDispatch, useSelector } from "react-redux";
import CardSkeletonLoader from "../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import SpinLoader from "../../../components/Common/SpinLoader/SpinLoader";
import BarMarketMobile from "../MobileComponents/AboutCompanyMobile/BarMarketMobile";
import BarGroupMobile from "../MobileComponents/AboutCompanyMobile/BarGroupMobile";
const AboutCompany = ({ ActiveMainTab, aboutCompany, company_name }) => {
  const { loading } = useSelector((state) => state.seeDetails);

  const addPremium = (premiums) => {
    let sum = 0;
    premiums?.map((data) => {
      if (data.premium !== null) {
        sum += parseFloat(data.premium);
      }
    });
    return sum;
  };

  return (
    <>
      <div
        className={`z-content ${ActiveMainTab && "z-active"}`}
        style={{
          position: "relative",
          display: ActiveMainTab ? "block" : "none",
          left: ActiveMainTab ? "0px" : "1296px",
          top: "0px",
        }}
      >
        {loading ? (
          <SpinLoader />
        ) : (
          <div className="tab_inner_product_detail z-content-inner">
            <div className="tab_inner_product_detail z-content-inner">
              <div className="our-feature-app" id="feature">
                {/* ====================================Main Header========================================= */}
                <Container>
                  <Row
                    className="single-feature-box_main"
                    style={{
                      padding: "47px 20px ",
                    }}
                  >
                    <Col lg={12} className="order-lg-first">
                      <div className="feature-img-box">
                        <h2 className="title_h4_p plan_a_t">
                          About{" "}
                          <span style={{ color: "#0d6efd" }}>
                            {company_name}
                          </span>{" "}
                          Insurance {/* Health Insurance */}
                        </h2>
                        <p
                          className="p_titltle_sub_plan"
                          css={`
                            & span {
                              font-family: "Inter-Regular" !important;
                              color:#253858;
                            }
                          `}
                          dangerouslySetInnerHTML={{
                            __html:
                              aboutCompany?.data?.overview ||
                              "no data available",
                          }}
                        ></p>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  {/* ============================================================================= */}

                  <Row
                    className="single-feature-box mb-44"
                    css={`
                      display: ${company_name === "Star Health" && "none"};
                    `}
                  >
                    <Col md={12}>
                      <div className="feature-img-box">
                        <Row
                          css={`
                            align-items: center;
                          `}
                        >
                          {/* ====================================Market size col========================================= */}
                          <Col md={8} className="margin_market_row">
                            <DataContainer
                              title={"Market Size"}
                              description={`Why it is important: Market size refers to measure of the consumers' preference for a product over other similar products.`}
                            />
                          </Col>
                          <Col md={4} className="margin_row_pie">
                            {/* <div
                              id="myChart"
                              className="chart--container"
                              style={{ overflow: "hidden" }}
                            > */}

                            {aboutCompany.data && (
                              <div>
                                <BarMarketMobile
                                  data={aboutCompany.data.market_sizes}
                                />
                              </div>
                            )}
                          </Col>
                          {/* ============================================================================= */}
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  {/* ============================================================================= */}
                  <Row
                    css={`
                      display: ${company_name === "Star Health" && "none"};
                    `}
                    className="single-feature-box mb-44"
                  >
                    <Col md={12}>
                      <div className="feature-img-box">
                        <Row
                          style={{ justifyContent: "space-between" }}
                          css={`
                            align-items: center;
                          `}
                        >
                          <Col md={4}>
                            <div>
                              {aboutCompany.data && (
                                <BarGroupMobile
                                  data={
                                    aboutCompany.data.claim_settlement_ratios
                                  }
                                />
                              )}
                            </div>
                            {/* <div id="bar-chart">
                              <div className="graph">
                                <ul className="x-axis">
                                  {aboutCompany?.data?.claim_settlement_ratios?.map(
                                    data => {
                                      return (
                                        data.year !== null && (
                                          <li>
                                            <span>{data.year}</span>
                                          </li>
                                        )
                                      );
                                    },
                                  )}
                                </ul>
                                <div className="bars">
                                  {aboutCompany?.data?.claim_settlement_ratios?.map(
                                    data => {
                                      return (
                                        data.year !== null && (
                                          <BarGroup
                                            value={`${parseFloat(
                                              data.percent,
                                            )}`}
                                          />
                                        )
                                      );
                                    },
                                  )}
                                </div>
                              </div>
                            </div> */}
                          </Col>
                          <Col md={6} className="margin_market_row">
                            <DataContainer
                              title={"Claim Settlement Ratio"}
                              description={`Why it is important: Claim Settlement Ratio of an Insurer is the number of claims settled against the number of claims filed.`}
                            />
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  {/* ============================================================================= */}
                  <Row
                    className="single-feature-box mb-44"
                    css={`
                      display: ${company_name === "Star Health" && "none"};
                    `}
                  >
                    <Col md={12}>
                      <div className="feature-img-box">
                        <Row
                          css={`
                            align-items: center;
                          `}
                        >
                          <Col md={6} className="margin_market_row">
                            <DataContainer
                              title={"Claim Incurred ratio"}
                              description={`Why it is important: Claim Incurred Ratio refers to the net claims paid by an insurance company as against the net premiums earned.`}
                            />
                          </Col>
                          <Col md={6} className="row_progress_padding">
                            <Col md={12}>
                              {aboutCompany?.data?.claim_incured_ratios?.map(
                                (data, i) => {
                                  return (
                                    data.year !== null && (
                                      <ProgessBar
                                        year={data.year}
                                        value={`${parseFloat(data.percent)}`}
                                        color={data.color}
                                      />
                                    )
                                  );
                                }
                              )}
                              {/* <ProgessBar year={"2020-2021"} value={"52%"} />
                      <ProgessBar
                        year={"2020-2021"}
                        value={"62%"}
                        color={"yellow"}
                      />
                      <ProgessBar
                        year={"2020-2021"}
                        value={"32%"}
                        color={"blue"}
                      />
                      <ProgessBar
                        year={"2020-2021"}
                        value={"72%"}
                        color={"yellow"}
                      /> */}
                            </Col>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  {/* ============================================================================= */}
                </Container>
                {/* ============================================================================= */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AboutCompany;
