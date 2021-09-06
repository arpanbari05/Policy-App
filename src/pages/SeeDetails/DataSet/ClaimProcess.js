import React from "react";
import "./claimHover.css"
import { Col, Row } from "react-bootstrap";
import telephone from "../../../assets/images/telephone.png";
import mail from "../../../assets/images/mail.png";
import mobile from "../../../assets/images/mobile.png";
import ClaimMain from "../components/ClaimProcess/ClaimProcessMain/ClaimMain";
import { useDispatch, useSelector } from "react-redux";
import CardSkeletonLoader from "../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import SpinLoader from "../../../components/Common/SpinLoader/SpinLoader";
const populateData = data => {
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

const dataSet = dataArray => {

  const array = [];
  const length = dataArray?.length;
  dataArray?.map((data, i) =>
    array.push(
      <span key={i}>
        {" "}
        <div
          className="feature-offer-box_basic support-feature js-tilt claimHover"
          style={{ 
            padding: "0px 40px 0px", 
            marginBottom:"0px"
          }}
        >
          <div className="row">
            <div className="col-md-2">
              <div className="img_icon_important_claim icon-box claim_width_img">
                <img src={data.image} />
              </div>
            </div>
            <div className="col-md-10">
              <h4
                className="font_20 title margin_bottom_claim"
                style={{
                  lineHeight: "0px",
                  padding: "20px 0px 11px",
                  whiteSpace: "normal",
                }}
              >
                {data.header}
              </h4>
              <p className="feature-offer-box__p break-on-overflow">
                {data.description}{" "}
              </p>
            </div>
          </div>
        </div>
        {i !== length - 1 && <hr className="hr_p_b_cliam" />}
      </span>,
    ),
  );
  return array;
};

const ClaimProcess = ({ ActiveMainTab, claimProccess }) => {
  const { loading } = useSelector(state => state.seeDetails);

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
            <div className="our-feature-app" style={{ padding: "47px 20px" }}>
              <div className="our-service-app">
                <div className="main-content hide-pr show-pr">
                  <Row className="margin_important_row" style={{ flexWrap:"nowrap" }}>
                    <Col lg={5} className="bg_white_plan" style={{ margin: 0, height: "fit-content", minWidth:'265px',padding:'8px' }}>
                      <div className="feature-box_basic support-feature js-tilt padding_imp_row">
                        <Row>
                          <Col md={12}>
                            <div className="imp_claim_p_bor">
                              <h4 className="title imp_title_row_l">
                                Important Number and Email Address
                              </h4>
                            </div>
                            <p className="p_important_sub">
                              Don't Hesitate to contact us for any information.
                            </p>{" "}
                          </Col>
                        </Row>
                        <hr className="hr_p_b_cliam" />

                        {dataSet(populateData(claimProccess))}
                      </div>
                    </Col>
                    {/* ============================================================ */}
                    <Col md={8} style={{
                      marginTop: "27px"
                    }}>
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
