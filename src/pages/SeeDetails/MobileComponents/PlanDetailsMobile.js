import React from 'react'
import { Col } from 'react-bootstrap';
import styled from "styled-components"
import "styled-components/macro"
import PlanTabMobile from './PlanTabMobile';

import download from "../../../assets/images/download.png";
import { useSelector } from 'react-redux';
import SpinLoader from '../../../components/Common/SpinLoader/SpinLoader';

function PlanDetailsMobile({ ActiveMainTab, planDetails, brochureUrl, policyWordingUrl }) {
    
    const { loading } = useSelector(state => state.seeDetails);
    return (
        <div className={`z-content ${ActiveMainTab && "z-active"}`}
            style={{ display: ActiveMainTab ? "block" : "none" }}
        >
            {loading ? (
                <SpinLoader />
            ) : (
                <>
                    {planDetails.featureList &&
                        planDetails.featureList.map((data, i) => {

                            return (
                                <>

                                    <PlanFeature>
                                        <PlanTabMobile item={data} data={planDetails.innerData[data.title]} />
                                    </PlanFeature>

                                </>
                                //   onClick={() => handleActive(data.id, data.title)}
                                //   isActive={activeTab === data.id ? true : false}

                            );
                        })}
                    
                        <DownloadCardWrapper className="feature-img-box" style={{ marginBottom: "30px", backgroundColor: "#fff", padding: "10px", borderRadius: "10px", margin:"15px" }} >
                            <h2 className="title_h4 title_h4_download"
                                css={`
                    font-size:18px !important;
                    `}
                            >
                                Downloads
                            </h2>
                            <div className="sub-heading title_h4_download"
                                style={{ fontSize: "14px", lineHeight: "1.1" }}
                            >
                                To find out more about the company and it's
                                products, kindly refer the documents given below
                            </div>

                            <DownloadCard>
                                <div style={{ marginTop: "0px", fontSize: "16px" }}>
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
                                    
                                    <a target="_blank" rel="noopener noreferrer" href={brochureUrl}>
          <div
            css={`
              background-color: white;
              padding: 7px 12px;
              border-radius: 82px;
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
        </a>
                                    </DownloadImgWrapper>

                            </DownloadCard>
                            <DownloadCard>
                                <div style={{ marginTop: "0px", fontSize: "16px" }}>
                                    Product Policy Wordings
                                </div>
                                <DownloadImgWrapper className="icon-box float_left">

                                    {/* <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={policyWordingUrl}><img src={download} alt="download"
                                            style={{ height: "100%", marginRight: "10px",width:"100%" }}
                                        />

                                    </a>   */}
                                                                        <a target="_blank" rel="noopener noreferrer" href={policyWordingUrl}>
          <div
            css={`
              background-color: white;
              padding: 7px 12px;
              border-radius: 82px;
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
        </a>
                                    
                                    </DownloadImgWrapper>

                            </DownloadCard>
                        </DownloadCardWrapper>
                   
                </>)}
        </div>
    )
}

const DownloadCardWrapper = styled.div`
    @media (max-width:767px){
        margin:5px !important;
    }
`;

const DownloadImgWrapper =  styled.div`
    height:50px;
    width:50px;
    @media (max-width:400px){
        height:40px;
    width:40px;
}
`;

const PlanFeature = styled.div`
background-color: #fff;
border-radius: 10px;
margin:15px;
padding:25px 10px;
@media (max-width:1023px){
    padding: 12px 10px;
}
@media (max-width:767px){
    margin:8px 5px;
    padding: 15px 8px;
}

`
const DownloadCard = styled.div`

padding: 10px;
background-color: #fff;
display:flex;
justify-content: space-between;

align-items: center;
`

export default PlanDetailsMobile
