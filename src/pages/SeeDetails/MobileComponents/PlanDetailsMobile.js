import React from 'react'
import { Col } from 'react-bootstrap';
import styled from "styled-components"
import "styled-components/macro"
import PlanTabMobile from './PlanTabMobile';

import download from "../../../assets/images/downloadclaim.png";
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
         <img src={download} css={`
            width:31px;
            height:31px;
            `} alt="" />
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
         <img src={download} css={`
            width:31px;
            height:31px;
            `} alt="" />
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
