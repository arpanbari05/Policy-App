import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PlansTab from "../components/PlanDetails/PlansTab";
import roomRent from "../../../assets/images/room_r.png";
import FeaturesTab from "../components/PlanDetails/FeaturesTab";
import download from "../../../assets/images/download.png";
import { useSelector } from "react-redux";
import CardSkeletonLoader from "../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import SpinLoader from "../../../components/Common/SpinLoader/SpinLoader";
import "styled-components/macro";
import useWindowSize from '../../../customHooks/useWindowSize';

const PlanDetails = ({ ActiveMainTab, planDetails, brochureUrl, policyWordingUrl }) => {
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
      >
        {loading ? (
          <SpinLoader />
        ) : (
          <div className="z-content-inner">
            <section className="header">
              <Container className="py-4">
                <Row className="margin_row_plan_basic" style={{padding:'0px'}}>
                  <Col md={5} className="text-left">
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
                        padding: "10px",
                        borderRadius: "4px",
                        background: "#fff",
                        boxShadow: "0px 10px 20px rgb(134 156 213 / 15%)",
                      }}
                    >
                      <Container>
                        <Row>
                          <Col lg={12}>
                            <div className="feature-img-box" style={{ marginBottom: "15px" }} >
                              <h2 className="title_h4 title_h4_download">
                                Downloads
                              </h2>
                              <div className="sub-heading title_h4_download"

                              >
                                To find out more about the company and it's
                                products, kindly refer the documents given below
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
                          <hr className="hr_p_b_g"/>
                          <Col lg={12}>
                            {policyWordingUrl && (
                              <DownloadCard
                                url={policyWordingUrl}
                                title={"Policy Wordings"}
                              />
                            )}
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </Col>
                  <Col md={7} className="tab-content">
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
    <Row>
      <Col lg={12}>
        <div className="feature-offer-box support-feature js-tilt">
          <div
            css={`
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0px 10px;
            `}
          >

            <h4
              className="title newTitle"
              css={`
                margin: 0;
              `}
            >
              {title}
            </h4>
            {url ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={url}
              // className="next btn btn_download_plan"
              // css={`

              //   display: inline-block;

              //   text-align: center;
              //   white-space: nowrap;
              //   border-radius: 12px !important;
              //   line-height: 40px !important;
              //   padding: 0px 16px !important;
              //   color: #c7222a !important;
              //   font-weight: 900 !important;
              //   font-size: 16px !important;
              //   width: 132px;
              //   height: 47px;

              //   border: 2px solid #c72229;
              //   text-align: center;

              //   text-transform: capitalize;
              //   /* box-shadow: 0px 13px 27px 0px rgb(163 48 53 / 25%); */

              //   background: #fff;
              //   margin-right: 10px;

              //   &:hover {
              //     color: #fff !important;
              //     background: #c72229;
              //   }
              // `}
              >
                <div className="icon-box float_left">
                  <img src={download} alt="download" style={{
                    width: "40px",
                    height:'auto'
                  }}/>
                </div>
                {/* Download
                <i className="icon flaticon-next"></i> */}
              </a>
            ) : (
              <span>Loading document...</span>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
}
