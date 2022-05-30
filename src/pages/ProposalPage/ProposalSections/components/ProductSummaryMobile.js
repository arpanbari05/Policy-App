import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "styled-components/macro";
import CardModalM from "./../../../../components/Common/Modal/CardModelM.js";

import correct from "./../../../../assets/images/correct_icon.png";
import { useLocation } from "react-router";
import ProposalCheckBox from "../../../../components/Common/ProposalSummary/summaryCheckBox";
import useUrlQuery from "../../../../customHooks/useUrlQuery";
import SecureLS from "secure-ls";
import TermModal from "../../../ProposalSummary/TermsModal";
import { useFrontendBoot, useTheme } from "../../../../customHooks";

const removeTotalPremium = cart => {
  let { ...y } = cart;
  return y;
};

const numToString = value => value.toLocaleString("en-IN");

function ProductSummaryMobile({ cart }) {
  const location = useLocation();

  const [show, setShow] = useState(false);
  const showP = false;
  // const { theme } = useSelector(state => state.frontendBoot);

  const { colors } = useTheme();

  const PrimaryColor = colors.primary_color;

  // const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
  const [termShow, setTermShow] = useState(false);

  const frontendBoot = useFrontendBoot();

  const frontendData = { data: frontendBoot.data };

  // const { frontendData } = useSelector(state => state.frontendBoot);
  const ls = new SecureLS();
  const url = useUrlQuery();
  const { policyStatus } = useSelector(state => state.proposalPage);
  const enquiryId = url.get("enquiryId");
  const onClick = mobile => {
    if (
      frontendData?.data?.settings?.journey_type === "single" &&
      (checked || mobile)
    ) {
      if (policyStatus?.length > 1) {
        setShow(prev => !prev);
      } else {
        singlePay(policyStatus[0]?.proposal_id);
      }
    } else if (checked || mobile) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = process.env.REACT_APP_API_BASE_URL + "payments";
      form.style.display = "none";
      const input = document.createElement("input");
      input.name = "enquiry_id";
      input.value = enquiryId || ls.get("enquiryId");
      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    }
  };
  const singlePay = id => {
    if (checked) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = process.env.REACT_APP_API_BASE_URL + "payments";
      form.style.display = "none";
      const input = document.createElement("input");
      input.name = "proposal_id";
      input.value = id;
      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    }
  };

  const content = (
    <>
      <div className="row">
        <div className="col-md-12 padding-none">
          <section className="margin_top_14 light">
            {Object.values(removeTotalPremium(cart)).map((item, index) => (
              <>
                <div className="row" key={index}>
                  <div className="col-md-9">
                    <h5
                      className="text_title_filter p_modal_title_bg_filters_product product_summary__title"
                      style={{ textTransform: "capitalize" }}
                    >
                      {item.group.members.join(" + ")}
                    </h5>
                  </div>
                  <div className="col-md-3 text-right"></div>
                </div>
                <div className="rider-box_product_pro_medical">
                  <div className="row_display_pro_review">
                    <div className="logo_add_review float_left_addon_c">
                      <img
                        src={
                          frontendData.data.companies[
                            item.product.company.alias
                          ].logo
                        }
                        className="img_top_m_custom_medical"
                        alt="logo"
                      />
                    </div>

                    <div className="float_left_addon_c ">
                      <p className="paln_name_t_product_pro_medical">
                        {item.product.name}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-6">
                      <p className="p_cover_medical_pop">Cover: </p>
                      <span className="p_cover_medical_pop_span addon_plan_d_inter_1_product_pro_f_mediacl">
                        <i className="fa fa-inr"></i>{" "}
                        {numToString(item.sum_insured)}
                      </span>
                    </div>
                    <div className="col-md-6">
                      <p className="p_cover_medical_pop">Premium: </p>
                      <span className="p_cover_medical_pop_span text_decoration_line_through">
                        <i className="fa fa-inr"></i>{" "}
                        {numToString(item.total_premium)} /{" "}
                        {item.tenure > 1 ? item.tenure + " years" : "year"}{" "}
                      </span>
                    </div>

                    {/* <div className="col-md-6">
                  <p className="p_cover_medical_pop color_green">
                    Revised Premium:{" "}
                  </p>
                  <span className="p_cover_medical_pop_span">
                    <i className="fa fa-inr"></i> 15,225 / year
                  </span>
                </div> */}
                  </div>
                  <div className="row bg_medical_box_row">
                    {item.health_riders.map(riders => (
                      <div className="col-md-6" key={riders.name}>
                        <img
                          src={correct}
                          className="display_in_m_medical"
                          alt="correct"
                        />{" "}
                        <span className="font_weight_normal_mediacl">
                          {riders.name}
                        </span>
                        <p></p>
                      </div>
                    ))}
                  </div>
                </div>
                <br />
                {item.addons.length ? (
                  <div className="row">
                    <div className="col-md-12">
                      <p className="bottom_addon_cover_medical">
                        Add-ons Coverages
                      </p>
                      <hr />
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <br />
                {item.addons.map(addOns => (
                  <div
                    className="rider-box_product_pro_medical"
                    key={addOns.product.name + addOns.sum_insured.toString()}
                  >
                    <div className="row_display_pro_review">
                      <div className="logo_add_review float_left_addon_c">
                        <img
                          src={
                            frontendData.data.companies[
                              addOns.product.company.alias
                            ].logo
                          }
                          className="img_top_m_custom_medical"
                          alt="logo"
                        />
                      </div>

                      <div className="float_left_addon_c ">
                        <p className="paln_name_t_product_pro_medical">
                          {addOns.product.name}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-6">
                        <p className="p_cover_medical_pop">Cover: </p>
                        <span className="p_cover_medical_pop_span addon_plan_d_inter_1_product_pro_f_mediacl">
                          <i className="fa fa-inr"></i>{" "}
                          {numToString(addOns.sum_insured)}
                        </span>
                      </div>
                      <div className="col-md-6">
                        <p className="p_cover_medical_pop">Premium: </p>
                        <span className="p_cover_medical_pop_span text_decoration_line_through">
                          <i className="fa fa-inr"></i>{" "}
                          {numToString(addOns.total_premium)}
                        </span>
                      </div>
                      {addOns.product.insurance_type.alias === "top_up" && (
                        <div className="col-md-6">
                          <p className="p_cover_medical_pop">Deductable: </p>
                          <span className="p_cover_medical_pop_span">
                            <i className="fa fa-inr"></i>{" "}
                            {numToString(addOns.deductible)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ))}
          </section>
        </div>
      </div>
    </>
  );

  const [checked, setChecked] = useState(false);
  return (
    <>
      <div
        css={`
          bottom: 0;
          position: fixed;
          background-color: #fff;
          left: 0;
          right: 0;
          z-index: 9999;
          border-top: 1px solid #ddd;
        `}
      >
        {location.pathname === "/proposal_summary" && (
          <div
            css={`
              padding-top: 10px;
              padding-left: 20px;
              position: absolute;
              top: 20px;
              @media (max-width: 768px) {
                padding-top: 0;
              }
              @media (max-width: 400px) {
                padding-left: 10px !important;
              }
            `}
          >
            <div
              css={`
                display: flex;
                align-items: baseline;
                justify-content: flex-start;
                @media screen and (max-width: 440px) {
                  font-size: 13px !important;
                  max-width: 70%;
                }
              `}
            >
              <span>
                <ProposalCheckBox
                  title={"check2"}
                  type={"checkbox"}
                  value={checked}
                  extraPadding
                  onChange={e => setChecked(e.target.checked)}
                />
              </span>

              <p>
                <span
                  className="Iaccept"
                  css={`
                    @media screen and (max-width: 440px) {
                      font-size: 12px !important;
                    }
                  `}
                >
                  {"I have read & accepted the Insurance Company's"}&nbsp;
                </span>
                <span
                  className="TermsAndConditions"
                  css={`
                    color: ${PrimaryColor};
                  `}
                  style={{ cursor: "pointer" }}
                  onClick={() => setTermShow(true)}
                >
                  {"Terms & Conditions"}
                </span>
              </p>
              {termShow && (
                <TermModal
                  show={termShow}
                  handleClose={() => {
                    setTermShow(false);
                  }}
                />
              )}
            </div>
          </div>
        )}

        <Outer>
          {location.pathname === "/proposal_summary" ? (
            <View
              css={`
                background: ${PrimaryColor};
                z-index: 10000;
              `}
              onClick={() => {
                checked && onClick();
              }}
              // style={{ color: checked ? "white" : "lightgray" }}
            >
              Pay Now
            </View>
          ) : (
            <View onClick={() => setShow(true)}>View detail</View>
          )}
          {showP && (
            <MultipleWrapper>
              <PayList>
                {policyStatus &&
                  policyStatus.map(item => (
                    <PayItem key={item.total_premium}>
                      <ItemName>{item?.product?.name}</ItemName>
                      <PayButton
                        onClick={() => {
                          singlePay(item.proposal_id);
                        }}
                      >
                        <span>Pay Now </span>
                        <div>{item.total_premium}</div>
                      </PayButton>
                    </PayItem>
                  ))}
              </PayList>
            </MultipleWrapper>
          )}
        </Outer>
      </div>
      {show && (
        <CardModalM
          show={show}
          title={`Your Plan Details`}
          showButton={false}
          content={content}
          handleClose={() => {
            setShow(false);
          }}
        />
      )}
    </>
  );
}

const Outer = styled.div`
  /* border-top: 1px solid #f3f4f9; */
  padding: 15px 30px;

  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 440px) {
    padding: 21px 20px !important;
  }
`;

const View = styled.button`
  background-color: #0a87ff;
  color: #fff;
  padding: 7px 10px;
  border-radius: 10px;
  font-size: 15px !important;
  border: none;
  @media (min-width: 768px) {
    font-size: 21px !important;
    padding: 10px 20px !important;
  }
  @media (max-width: 400px) {
    font-size: 11px !important;
    padding: 5px 7px !important;
  }
`;

export default ProductSummaryMobile;

const MultipleWrapper = styled.div`
  width: 300px;
  height: 100px;
  position: absolute;
  background-color: #fff;
  right: 10px;
  border-radius: 8px;
  bottom: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 6px 12px #d4d8e4b5 !important;
`;
const PayList = styled.ul`
  padding: 10px;
`;
const PayItem = styled.li`
  margin-bottom: 12px;
  display: flex;
`;
const ItemName = styled.div`
  font-size: 15px;
  background-color: #f6f7f9;
  padding: 12px;
  border-radius: 8px;
  display: inline-block;
  width: 60%;
`;
const PayButton = styled.div`
  width: 40%;
  color: #fff;
  display: inline-block;
  padding: 6px;
  background-color: #0a87ff;
  text-align: center;
  border-radius: 0 6px 6px 0px;
  & span {
    display: inline-block;
  }
`;
