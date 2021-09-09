import React, { useState } from 'react'

import "./ClaimProcessMobile.css"
import styled from 'styled-components'
import "styled-components/macro"
import cashlessImg from "./../../../../assets/images/cashless_m.png";
import telephone from "../../../../assets/images/telephone.png";
import mail from "../../../../assets/images/mail.png";
import mobile from "../../../../assets/images/mobile.png";
import { useSelector } from 'react-redux';
import SpinLoader from '../../../../components/Common/SpinLoader/SpinLoader';
// import "../ClaimProcessMobile/ClaimProcessMobile.css"

function ClaimprocessMobile({
    ActiveMainTab, claimProccess
}) {
    const [activebtn, setActivebtn] = useState(1)
    const { loading } = useSelector(state => state.seeDetails);


    return (
        <div className={`z-content ${ActiveMainTab && "z-active"}`}
            style={{ display: ActiveMainTab ? "block" : "none" }}
        >
            <Outer>
                {loading ? (
                    <SpinLoader />
                ) : (
                    <>
                        <FeatureSection>
                            <div>
                                <h6 style={{ fontWeight: "600", marginTop: "10px" }}>How do I file a claim?</h6>
                            </div>
                        </FeatureSection>
                        <ActiveBar>

                            <TabButton
                                onClick={() => setActivebtn(1)}
                                style={{ textAlign: 'center', backgroundColor: activebtn === 1 && "#c7222a", color: activebtn === 1 && "#fff" }}
                                className={`tab ${activebtn === 1 && "tab__active"} `}

                            >
                                Cashless Claim
                            </TabButton>
                            <TabButton
                                onClick={() => setActivebtn(2)}
                                style={{ backgroundColor: activebtn === 2 && "#c7222a", color: activebtn === 2 && "#fff" }}
                                className={`tab ${activebtn === 2 && "tab__active"} `}
                             
                            >
                                Document Required
                            </TabButton>
                            <TabButton
                                onClick={() => setActivebtn(3)}
                                style={{ backgroundColor: activebtn === 3 && "#c7222a", color: activebtn === 3 && "#fff" }}
                                className={`tab ${activebtn === 3 && "tab__active"} `}
                             
                            >
                                Reimbursement Claim
                            </TabButton>
                        </ActiveBar>
                        {activebtn === 1 &&
                            <Inner>
                                <img src={cashlessImg} style={{ width: "110px" }} alt="" />
                                <h3 className="text-left cashless_t_r_t_main" style={{ marginBottom: "0px", fontFamily: "unset" }}>Cashless Claim</h3>
                                <Paragraph
                                    className="leade_p"
                                    style={{
                                        textAlign: "justify",


                                    }}
                                    dangerouslySetInnerHTML={{ __html: claimProccess.cashless_claim }}
                                ></Paragraph>
                            </Inner>
                        }
                        {activebtn === 2 &&
                            <Inner>
                                <img src={cashlessImg} style={{ width: "110px" }} alt="" />
                                <h3 className="text-left cashless_t_r_t_main" style={{ marginBottom: "0px", fontFamily: "pf_handbook_proregular" }}>Document Required</h3>
                                <Paragraph
                                    className="leade_p"
                                    style={{
                                        textAlign: "justify",


                                    }}
                                    dangerouslySetInnerHTML={{ __html: claimProccess.document_required }}
                                ></Paragraph>
                            </Inner>
                        }
                        {activebtn === 3 &&
                            <Inner>
                                <img src={cashlessImg} style={{ width: "110px" }} alt="" />
                                <h3 className="text-left cashless_t_r_t_main" style={{ marginBottom: "0px", fontFamily: "unset" }}>Reimbursement Claim</h3>
                                <Paragraph
                                    className="leade_p"
                                    style={{
                                        textAlign: "justify",
                                        fontSize: "14px"


                                    }}



                                    dangerouslySetInnerHTML={{ __html: claimProccess.reimbursement_claim }}
                                ></Paragraph>
                            </Inner>
                        }

                        <Info>
                            <div>
                                <h4 className="title imp_title_row_l" >
                                    Important Number and email address
                                </h4>
                            </div>
                            <p className="p_important_sub">
                                Don't Hesitate to contact us for any information.
                            </p>{" "}
                            <div style={{ padding: "30px 15px", display: "flex" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div className='icon-box' style={{ top: "4px", padding: "15px", marginRight: "10px", backgroundColor: "#fff5f5", height: "100%", width: "100%", maxWidth: "50px", maxHeight: "50px", borderRadius: "50%", }}>
                                        <img src={telephone} alt="" />
                                    </div>
                                    <div style={{ marginTop: "10px", }}>
                                        <h4
                                            style={{
                                                lineHeight: "0px",
                                                padding: " 0px ",
                                                whiteSpace: "nowrap",
                                                fontSize: "unset",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            Toll Free No.
                                        </h4>
                                        <p className="feature-offer-box__p break-on-overflow " style={{ marginTop: "15px" }} >
                                            {claimProccess.toll_free_number}
                                        </p>
                                    </div>

                                </div>
                                {/* <div style={{ display: "flex", alignItems: "center", marginLeft: "15px" }}>
                            <div className='icon-box' style={{ top: "4px", padding: "15px", backgroundColor: "#fff5f5", height: "100%", width: "100%", maxWidth: "50px", maxHeight: "50px", borderRadius: "50%", }}>
                                <img src={mobile} alt="" />
                            </div>
                            <div style={{ marginTop: "10px", }}>
                                <h4

                                    style={{
                                        lineHeight: "0px",
                                        padding: " 0px ",
                                        whiteSpace: "nowrap",
                                        fontSize: "unset",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Manager Number:
                                </h4>
                                <p className="feature-offer-box__p break-on-overflow " style={{ marginTop: "15px" }} >
                                    {claimProccess.spoc_number}
                                </p>
                            </div>

                        </div> */}


                            </div>

                            <div style={{ display: "flex", alignItems: "center", padding: "0px 15px", }}>
                                <div className='icon-box' style={{ top: "4px", padding: "15px", backgroundColor: "#fff5f5", height: "100%", width: "100%", maxWidth: "50px", maxHeight: "50px", borderRadius: "50%", marginRight: "10px" }}>
                                    <img src={mail} alt="" />
                                </div>
                                <div style={{ marginTop: "10px", }}>
                                    <h4
                                        style={{
                                            lineHeight: "0px",
                                            padding: " 0px ",
                                            whiteSpace: "nowrap",
                                            fontSize: "unset",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Drop Us an Email
                                    </h4>
                                    <p className="feature-offer-box__p break-on-overflow " style={{ marginTop: "15px" }} >
                                        {claimProccess.email}
                                    </p>
                                </div>

                            </div>

                        </Info>
                    </>)}


            </Outer>


        </div >
    )
}

const Outer = styled.div`
background-color: #fff;

`
const FeatureSection = styled.div`
padding: 10px;
padding-top:20px;
margin-left: 20px;
display: flex;
&::before {
    content: "--";
    color:var(--yellow-one);
    height: 39px;
    width: 9px;
    padding-right: 10px;
    margin-right: 10px;
    @media (max-width:767px){
      padding-right: 5px;
      width: 5px;
    }
    /* top: -7px; */
    /* left: -20px; */
    /* position: absolute; */
    /* background-color: #de9b9e; */
    background-color: var(--yellow-one);
    border-radius: 0 15px 15px 0;
  }
  @media (max-width:1022px){
    padding: 0px !important;
    padding-top:20px !important;
  }
`

const ActiveBar = styled.div`
width:fit-content;
box-shadow:0px 0px 10px #d8d8d8;
@media (max-width:400px){
    width:90%;
}
display:flex;
justify-content: space-evenly;
/* background-color:#f3f4f9; */
margin: 10px;
margin-left: auto;
margin-right: auto;
text-align: center;
height: 40px;
`
const TabButton = styled.button`
/* width:100px; */
font-size:12px;
@media (max-width:400px){
    font-size:11px !important;
    padding:5px !important;
    width: 100%;
}
white-space: nowrap;
padding:10px;

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
`

const Inner = styled.div`
margin: 20px;
margin-top: 20px;

`
const Paragraph = styled.p`
& div{
    font-size:14px;
    line-height:1.2;
}
& p{
    font-size:14px;
    line-height:1.2;

    & span{
        font-size:14px !important;
    line-height:1.2;
    }
}
& b{
    font-size:16px;
    line-height:1.3;
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
border-top:1px solid lightgray;

padding:10px;
padding-top:20px;
padding-bottom: 40px;
`


export default ClaimprocessMobile
