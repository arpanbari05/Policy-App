import React from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";
import "styled-components/macro";
import PlanTabMobile from "../../../SeeDetails/MobileComponents/PlanTabMobile";
import { BiDownload } from "react-icons/bi";
import { useSelector } from "react-redux";
import SpinLoader from "../../../../components/Common/SpinLoader/SpinLoader";
import { useTheme } from "../../../../customHooks/index";
import { mobile } from "../../../../utils/mediaQueries";

function MobilePlanDetails({
  ActiveMainTab,
  planDetails,
  brochureUrl,
  policyWordingUrl,
}) {
  const { loading } = useSelector(state => state.seeDetails);
  const { colors } = useTheme();
  return (
    <div
      className={`z-content ${ActiveMainTab && "z-active"}`}
      style={{ display: ActiveMainTab ? "block" : "none" }}
      css={`
        display: none !important;
        ${mobile} {
          display: block !important;
          padding-bottom: 100px !important;
        }
      `}
    >
      {loading ? (
        <SpinLoader />
      ) : (
        <>
          {planDetails.featureList &&
            planDetails.featureList.map((data, i) => {
              return (
                <>
                  <PlanTabMobile
                    item={data}
                    data={planDetails.innerData[data.title]}
                  />
                </>
                //   onClick={() => handleActive(data.id, data.title)}
                //   isActive={activeTab === data.id ? true : false}
              );
            })}
          {policyWordingUrl && brochureUrl ? (
            <DownloadCardWrapper
              className="feature-img-box"
              style={{
                marginBottom: "30px",
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "10px",
                margin: "15px",
              }}
            >
              <h2
                className="title_h4 title_h4_download"
                css={`
                  font-size: 16px !important;
                  font-weight: bold;
                `}
              >
                Downloads
              </h2>
              <div
                className="sub-heading title_h4_download"
                style={{ fontSize: "12px", lineHeight: "1.1" }}
              >
                To find out more about the company and it's products, kindly
                refer the documents given below
              </div>

              <DownloadCard>
                <div style={{ marginTop: "0px", fontSize: "14px" }}>
                  Product Brochure
                </div>
                <DownloadImgWrapper className="icon-box float_left">
                  {/* <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={brochureUrl}>
                                            
                                            <img src={download} alt="download"
                                            style={{  height: "100%", marginRight: "10px",width:"100%" }}
                                        />


                                    </a>   */}

                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={brochureUrl}
                  >
                    <div
                      css={`
                        padding: 7px 12px;
                        border-radius: 82px;
                      `}
                    >
                      <BiDownload color={colors.primary_color} size="31px" />
                    </div>
                  </a>
                </DownloadImgWrapper>
              </DownloadCard>
              <DownloadCard>
                <div style={{ marginTop: "0px", fontSize: "14px" }}>
                  Terms & Conditions
                </div>
                <DownloadImgWrapper className="icon-box float_left">
                  {/* <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={policyWordingUrl}><img src={download} alt="download"
                                            style={{ height: "100%", marginRight: "10px",width:"100%" }}
                                        />

                                    </a>   */}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={policyWordingUrl}
                  >
                    <div
                      css={`
                        padding: 7px 12px;
                        border-radius: 82px;
                        margin-right: 10px;
                      `}
                    >
                      <BiDownload color={colors.primary_color} size="31px" />
                    </div>
                  </a>
                </DownloadImgWrapper>
              </DownloadCard>
            </DownloadCardWrapper>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

const DownloadCardWrapper = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: block;
    margin: 5px !important;
  }
`;

const DownloadImgWrapper = styled.div`
  height: 50px;
  width: 50px;
  @media (max-width: 400px) {
    height: 40px;
    width: 40px;
  }
`;


const DownloadCard = styled.div`
  padding: 3px 10px;
  background-color: rgb(238, 241, 244);
  display: flex;
  border-radius: 5px;
  justify-content: space-between;
  margin: 5px 0px;
  align-items: center;
`;

export default MobilePlanDetails;
