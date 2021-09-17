import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CardModal from "../../../../components/Common/Modal/CardModal";
import arrow from "./../../../../assets/images/arrow.png";
import care from "./../../../../assets/images/Care_Health.png";
import correct from "./../../../../assets/images/correct_icon.png";
import "./ProductSummary.scss";
const removeTotalPremium = cart => {
  let { totalPremium, ...y } = cart;
  return y;
};
const numToString = value => value.toLocaleString("en-IN");
const ProductSummaryTab = ({ cart }) => {
  const [show, setShow] = useState(false);
  const { frontendData } = useSelector(state => state.frontendBoot);
  const { proposerDetails } = useSelector(state => state.greetingPage);
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
                        {numToString(item.total_premium)} / year
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
  return (
    <>
      <Wrapper className="col-lg-3 product__summary hideOnMobile">
        <Button onClick={() => setShow(true)}>
          <div>
            Total Premium
            <Price>
              <i class="fa fa-inr"></i> {cart?.totalPremium}
            </Price>
          </div>
          <ViewPlanDetails>
            View Plan Details <img alt="arrow" src={arrow} />
          </ViewPlanDetails>
        </Button>
      </Wrapper>
      <CardModal
        show={show}
        title={`Your Plan Details`}
        showButton={false}
        content={content}
        handleClose={() => {
          setShow(false);
        }}
        customClass="customClassModalDialog"
      ></CardModal>
    </>
  );
};

export default ProductSummaryTab;

const Wrapper = styled.div`
  width: 40%;
  min-width:300px;
  display: none;
  float: right;
 
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  @media (min-width:768px) and ( max-width:1200px){
    
  display:inline-block;
 
  }
  /*position: absolute;
   right: 68px;
   top: 240px;*/
`;

const Button = styled.button`
  margin-top: 10px;
  font-size: 18px !important;
  font-weight: 600;
  color: #000;
  
  margin-top: 2px !important;
  display: inline-block;

  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;

  padding: 10px 0px;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  background: #fff;
`;
const Price = styled.span`
  display: block;
  font-size: 21px;
  font-weight: 600;
  color: #c72229;
  
  margin-top: -3px;
`;
const ViewPlanDetails = styled.span`
  cursor: pointer;
  position: absolute;

  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  & img {
    display: inline-block;
    margin-left: 2px;
    cursor: pointer;
  }
`;
