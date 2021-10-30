import React from "react";
import "./claimHover.css";
import { Col, Row } from "react-bootstrap";
import telephone from "../../../assets/images/landline_old_phone.png";
// import telephone from "../../../assets/images/landline_old_phone.png";
import mail from "../../../assets/images/message_mail_blue_2.1.png";
import download from "../../../assets/images/downloadclaim.png";
import mobile from "../../../assets/images/mobile.png";
import ClaimMain from "../components/ClaimProcess/ClaimProcessMain/ClaimMain";
import { useDispatch, useSelector } from "react-redux";
import "styled-components/macro";
import CardSkeletonLoader from "../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import SpinLoader from "../../../components/Common/SpinLoader/SpinLoader";
const populateData = (data) => {
  return [
    {
      header: "Toll Free number",
      description: data?.toll_free_number || "no data",
      image: telephone,
    },
    {
      header: "Drop Us An Email",
      description: data?.email || "no data",
      image: mail,
    },
    // {
    //   header: "Manager Number:",
    //   description: data?.spoc_number || "no data",
    //   image: mobile,
    // },
  ];
};

const dataSet = (dataArray) => {
  const array = [];
  const length = dataArray?.length;
  
  dataArray?.map((data, i) =>
    array.push(
      <span key={i} css={``}>
        {" "}
        <div
          css={`
            border: solid 1px #c9c9c9;
            border-radius: 9px;
            margin: 0 auto 10px auto ;
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
                {data.header}
              </h4>
              <p
                css={`
                  color: #253858;
                  margin-bottom: 0px;
                `}
              >
                {data.description}{" "}
              </p>
            </div>
            <div
              className="col-md-2"
              css={`
                justify-content: center;
                align-items: center;
                /* background-color: #eff7ff; */
                display: flex;
                border-radius:100%;
                /* width: 66px;
              height:66px; */
              `}
            >
            
                <img src={data.image}  
                  className="w-100"
                />
             
            </div>
          </div>
        </div>
      </span>
    )
  );
  <div
  css={`
    border: solid 1px #c9c9c9;
    border-radius: 9px;
    margin: 0 auto 10px auto ;
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
        /* background-color: #eff7ff; */
        display: flex;
        border-radius:100%;
        /* width: 66px;
      height:66px; */
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
</div>
  return array;
};

const ClaimProcess = ({ ActiveMainTab, claimProccess,claimform }) => {
  const { loading } = useSelector((state) => state.seeDetails);
  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade,SecondaryShade } = theme;
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
              style={{ padding: "47px 20px" }}
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
                            background-color:${SecondaryShade};
                            color: #253858;
                            padding: 22px;
                            /* padding-right: 82px; */
                            & h2 {
                              font-weight: 900;
                              font-size: 21px;
                            }
                          `}
                        >
                          <h2> Please reach out on details below for further queries.</h2>
                          {/* <p className="p_important_sub">
                            Don't Hesitate to contact us for any information.
                          </p>{" "} */}
                        </div>
                        <hr className="hr_p_b_cliam" />
                        <div
        css={`
          border: solid 1px #c9c9c9;
          border-radius: 9px;
          margin: 0 auto 10px auto ;
          padding: 15px;
          width: 96%;

        `}
      >
        <div className="row">
          <div className="col-md-10"
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
              `}
            >
            Download Claim Form here.{" "}
            </p>
          </div>
          <div
            className="col-md-2"
            css={`
              justify-content: center;
              align-items: center;
              background-color: #eff7ff;
              display: flex;
              border-radius:100%;
              width: 42px;
            height:42px; 
            color:#0a837f;
            @media (max-width:1200px){
              width:31px;
               height: 31px;
            }
          
            `}
          >
            {claimform.claim_url ? (
              <a target="_blank" rel="noopener noreferrer" href={claimform.claim_url}>
          
          {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-download"
              viewBox="0 0 16 16"
            >
              <path  d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg> */}
            <img src={download} css={`
            width:31px;
            height:31px;
            `} alt="" />
            </a>)
            :
            <span>Loading...</span>}
     
    </div>
  </div>
      
</div>
                        {dataSet(populateData(claimProccess))}

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
