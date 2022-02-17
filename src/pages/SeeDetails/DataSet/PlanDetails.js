import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PlansTab from "../components/PlanDetails/PlansTab";
import roomRent from "../../../assets/images/room_r.png";
import FeaturesTab from "../components/PlanDetails/FeaturesTab";
import download from "../../../assets/images/downloadclaim.png";
import { useSelector } from "react-redux";
import CardSkeletonLoader from "../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import SpinLoader from "../../../components/Common/SpinLoader/SpinLoader";
import "styled-components/macro";
import { FaDownload } from "react-icons/fa";
import { mobile } from "../../../utils/mediaQueries";

const PlanDetails = ({
  ActiveMainTab,
  planDetails,
  brochureUrl,
  policyWordingUrl,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [activeDelayedTab, setActiveDelayedTab] = useState(1);

  const { loading } = useSelector(state => state.seeDetails);
  const handleActive = (id, selected) => {
    setActiveTab(id);
    setTimeout(() => setActiveDelayedTab(id), 500);
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
        css={`
          ${mobile} {
            display: none !important;
          }
        `}
      >
        {loading ? (
          <SpinLoader />
        ) : (
          <div className="z-content-inner">
            <section className="header">
              <Container className="py-4">
                <Row
                  className="margin_row_plan_basic"
                  css={`
                    justify-content: space-between;
                    padding: 0px;
                  `}
                >
                  <Col md={6} className="text-left">
                    <div className="nav flex-column nav-pills nav-pills-custom border_left_tab_plan">
                      {planDetails.featureList &&
                        planDetails.featureList.map((data, i) => {
                          return (
                            <PlansTab
                              key={i}
                              title={data.title}
                              description={data.description}
                              onClick={() => handleActive(data.id, data.title)}
                              isActive={activeTab === data.id ? true : false}
                            />
                          );
                        })}
                    </div>
                    <div
                      style={{
                        width: "92%",
                        marginTop: "30px",

                        borderRadius: "4px",
                        background: "#fff",
                      }}
                      css={`
                        padding: 18px 0px;
                        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
                        ${mobile} {
                          display: none;
                        }
                      `}
                    >
                      {brochureUrl && policyWordingUrl ? (
                        <Container>
                          <Row>
                            <Col lg={12}>
                              <div
                                className="feature-img-box"
                                style={{ marginBottom: "15px" }}
                              >
                                <h2
                                  css={`
                                    font-size: 20px;
                                    color: #253858;
                                    font-weight: 900;
                                  `}
                                >
                                  Downloads
                                </h2>
                                <div
                                  css={`
                                    color: #505f79;
                                  `}
                                >
                                  To find out more about the company and it's
                                  products, kindly refer the documents given
                                  below
                                </div>
                              </div>
                            </Col>
                            <Col lg={12}>
                              {brochureUrl && (
                                <DownloadCard
                                  url={brochureUrl}
                                  title={"Product Brochure"}
                                />
                              )}
                            </Col>

                            <Col lg={12}>
                              {policyWordingUrl && (
                                <DownloadCard
                                  url={policyWordingUrl}
                                  title={"Terms & Conditions"}
                                />
                              )}
                            </Col>
                          </Row>
                        </Container>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Col>
                  <Col md={6} className="tab-content">
                    {planDetails.featureList &&
                      planDetails.featureList.map((data, i) => {
                        return (
                          <FeaturesTab
                            key={i}
                            id={i + 1}
                            activeTab={activeTab}
                            activeDelayedTab={activeDelayedTab}
                            data={planDetails.innerData[data.title]}
                            type="container"
                          />
                        );
                      })}
                  </Col>
                </Row>
              </Container>
            </section>
            {/* =================================================================================== */}

            {/* =================================================================================== */}
          </div>
        )}
      </div>
    </>
  );
};

export default PlanDetails;

function DownloadCard({ url, title }) {
  return (
    <div
      css={`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 10px;
        background-color: #eaeef27a;
        padding: 15px;
        margin-bottom: 1rem;
      `}
    >
      <h4
        css={`
          font-size: 20px;
          color: #253858;
          font-weight: 900;
          margin: 0;
        `}
      >
        {title}
      </h4>
      {url ? (
        <a target="_blank" rel="noopener noreferrer" href={url}>
          <div
            css={`
              background-color: white;
              /* padding: 7px 12px; */
              border-radius: 82px;
            `}
          >
            <img
              src={download}
              css={`
                width: 31px;
                height: 31px;
              `}
              alt=""
            />
          </div>
        </a>
      ) : (
        <span>Loading document...</span>
      )}
    </div>
  );
}
