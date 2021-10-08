import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "styled-components/macro";
import arrow from "./../../../../assets/images/arrow.png";
import CardModalM from "./../../../../components/Common/Modal/CardModelM.js";

import correct from "./../../../../assets/images/correct_icon.png";
import { useLocation } from "react-router";
import ProposalCheckBox from "../../../../components/Common/ProposalSummary/summaryCheckBox";
import CheckBox from "../../components/Checkbox/Checkbox";
import useUrlQuery from "../../../../customHooks/useUrlQuery";
import SecureLS from "secure-ls";



const removeTotalPremium = cart => {
  let { totalPremium, ...y } = cart;
  return y;
};

const numToString = value => value.toLocaleString("en-IN");
function ProductSummaryMobile({ cart, payNow }) {
  const location = useLocation();

  const [show, setShow] = useState(false);
  const [showP, setShowP] = useState(false);

  const { frontendData } = useSelector(state => state.frontendBoot);
  const ls = new SecureLS();
  const url = useUrlQuery();
  const { proposalData, policyStatus, policyLoading } = useSelector(
    state => state.proposalPage,
  );
const enquiryId = url.get("enquiryId");
  const onClick = mobile => {
    if (
      frontendData?.data?.settings?.journey_type === "single" &&
      (checked || mobile)
    ) {
      setShowP(prev => !prev);
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
                      <div className="col-md-6">
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
                  <div class="row">
                    <div class="col-md-12">
                      <p class="bottom_addon_cover_medical">
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
                  <div className="rider-box_product_pro_medical">
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

          border-top: 1px solid #f3f4f9;
        `}
      >
        {location.pathname === "/proposal_summary" && (
          <div
            css={`
              padding-top: 10px;
              padding-left: 20px;
              position: absolute;
              top:20px;
              @media(max-width:768px){
                position:unset;
              }
            `}
          >
            <div>
              <ProposalCheckBox
                title={"check2"}
                type={"checkbox"}
                value={checked}
                extraPadding
                onChange={() => setChecked(!checked)}
              />{" "}
              <span className="Iaccept">I Accept the&nbsp;</span>
              <span class="TermsAndConditions"> Terms &amp; Conditions </span>
            </div>
          </div>
        )}
        {/* <img
          alt="arrow"
          src={arrow}
          onClick={() => setShow(true)}
          css={`
            position: absolute;
            left: 45%;
            margin-top: -10px;
            transform: rotate(-90deg);
            cursor: pointer;
            background: transparent;
          `}
        /> */}
        <Outer>
          {/* <Premium onClick={() => setShow(true)}>
            <h6
              style={{
                fontSize: "14px",
              }}
              css={`
                @media (min-width: 768px) {
                  font-size: 18px !important;
                }
              `}
            >
              Total Premium
            </h6>

            <p
              css={`
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                font-weight: 600;
                color: #c72229;
            
                @media (min-width: 768px) {
                  font-size: 21px !important;
                }
              `}
            >
              {" "}
              <i class="fa fa-inr"></i> {cart?.totalPremium}
            </p>
          </Premium> */}

          {location.pathname === "/proposal_summary" ? (
            <View
            onClick={() => checked && onClick()}
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
                    <PayItem>
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

      <CardModalM
        show={show}
        title={`Your Plan Details`}
        showButton={false}
        content={content}
        handleClose={() => {
          setShow(false);
        }}
      />
    </>
  );
}

const Outer = styled.div`
  /* border-top: 1px solid #f3f4f9; */
  padding: 15px 30px;

  display: flex;
  justify-content: flex-end;
`;
const Premium = styled.button`
  text-align: left;
`;
const View = styled.button`
  background-color: #0a87ff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  @media (min-width: 768px) {
    font-size: 21px !important;
  }
`;

export default ProductSummaryMobile;

const MultipleWrapper = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  background-color: #fff;
  right: 60px;
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

  font-size: 20px;
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
