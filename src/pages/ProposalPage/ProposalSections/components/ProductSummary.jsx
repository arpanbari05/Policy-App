import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import "styled-components/macro";
import ViewPlanDetailModal from "./ViewPlanDetailModal";
import { setActiveIndex, setPlanDetails } from "../ProposalSections.slice";
import arrow from "./../../../../assets/images/arrow.png";
import care from "./../../../../assets/images/Care_Health.png";
import correct from "./../../../../assets/images/correct_icon.png";
import { AiOutlineCheckCircle } from "react-icons/ai";
import "./ProductSummary.scss";
import Card from "../../../../components/Card";
const removeTotalPremium = (cart) => {
  let { totalPremium, ...y } = cart;
  return y;
};
const numToString = (value) => value.toLocaleString("en-IN");
const ProductSummary = ({ cart, setActive }) => {
  const [show, setShow] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const { frontendData } = useSelector((state) => state.frontendBoot);
  const { proposerDetails } = useSelector((state) => state.greetingPage);
  const { planDetails } = useSelector((state) => state.proposalPage);
  const dispatch = useDispatch();
  useEffect(() => {
    setShow(planDetails.show);
  }, [planDetails]);
  console.log(collapse, "sadgsadg3");
  const prevCart = Object.values(removeTotalPremium(planDetails.prevCart));

  const content = (
    <>
      <span
        css={`
          width: 100px;
          height: 100px;
          border-radius: 100%;
          background: #eff7ff;
          position: absolute;
          top: -41px;
          z-index: -3;
          left: -38px;
        `}
      ></span>
      <span
        onClick={() => {
          setCollapse(!collapse);
        }}
        css={`
          display: flex;
          justify-content: space-between;
          flex-direction: row;
        `}
      >
        <h2
          css={`
            font-size: 20px;
            font-weight: 900;
            position: relative;
            color: #2d3f5e;
            padding: 12px 0px;
            margin-bottom: -1px;
            /* border-bottom: 1px solid #ddd; */
          `}
        >
          {" "}
          Your Plan Details
        </h2>
        <span
          css={`
            display: none;
            @media (max-width: 767px) {
              display: block;
              position: absolute;
              right: 27px;
              top: 19px;
              transform: rotate(${collapse ? "-90deg" : "90deg"});
            }
          `}
        >
          <i class="fas fa-chevron-left"></i>
        </span>
      </span>
      <div
        className="row"
        css={`
          display: block;
          @media (max-width: 767px) {
            display: ${collapse ? "block" : "none"};
            transition: all 2s linear;
          }
        `}
      >
        <div className="col-md-12 padding-none">
          <section
            className="light"
            css={`
              padding: 10px !important;
            `}
          >
            {Object.values(removeTotalPremium(cart)).map((item, index) => (
              <>
                <div className="row" key={index}>
                  <div className="col-md-9">
                    <h5
                      css={`
                        display: inline-block;
                        text-transform: capitalize;
                        color: #616161;
                        margin-bottom: 0;
                        margin-right: 12px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: 12px;
                        font-weight: 900;
                      `}
                      className="text_title_filter p_modal_title_bg_filters_product "
                      style={{ textTransform: "capitalize", fontSize: "14px" }}
                    >
                      {item.group.members.join(" , ")}
                    </h5>
                  </div>
                  <div className="col-md-3 text-right"></div>
                </div>
                <div className="rider-box_product_pro_medical">
                  <div
                    className="row_display_pro_review"
                    css={`
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      & img {
                        height: 45px;
                        // width: 83px;
                        margin-right: 11px;
                        // margin-left: 5px;
                        object-fit: contain;
                      }
                      & span {
                        font-size: 16px;
                        font-weight: 900;
                        line-height: 1.2;
                      }
                    `}
                  >
                    <span>
                      <img
                        src={
                          frontendData.data.companies[
                            item.product.company.alias
                          ].logo
                        }
                      />{" "}
                    </span>

                    <span>{item.product.name}</span>
                    {/* <div className="logo_add_review float_left_addon_c">
                      <img
                        css={`
                          width: 74px;
                        `}
                        src={
                          frontendData.data.companies[
                            item.product.company.alias
                          ].logo
                        }
                        className="img_top_m_custom_medical"
                        alt="logo"
                      />
                    </div> */}
                    {/* <div
                      css={`
                        font-size: 20px;
                      `}
                    >
                      <p>{item.product.name}</p>
                    </div> */}
                  </div>
                  {/* <hr /> */}
                  <div
                    className="row"
                    css={`
                      margin-top: 10px;
                      display: flex;
                      flex-direction: column;
                    `}
                  >
                    <div
                      css={`
                        display: flex;
                        flex-direction: row;
                        align-items: end;
                        justify-content: space-between;

                        /* border-right: 1px solid #dce2ec; */
                      `}
                    >
                      <p className="p_cover_medical_pop">Cover: </p>
                      <span
                        className="p_cover_medical_pop_span addon_plan_d_inter_1_product_pro_f_mediacl"
                        css={`
                          padding-left: 10px;
                        `}
                      >
                        ₹ {numToString(item.sum_insured)}
                      </span>
                    </div>
                    <div
                      css={`
                        display: flex;
                        flex-direction: row;
                        align-items: end;
                        justify-content: space-between;
                      `}
                    >
                      <p className={`p_cover_medical_pop `}>Premium: </p>
                      <span
                        css={`
                          padding-left: 10px;
                        `}
                        className={`p_cover_medical_pop_span ${
                          planDetails.isRenewed ? "revised-premium" : ""
                        }`}
                      >
                        ₹{" "}
                        {planDetails.isRenewed
                          ? numToString(prevCart[index].total_premium)
                          : numToString(item.total_premium)}{" "}
                        / {item.tenure > 1 ? item.tenure + " years" : "year"}{" "}
                      </span>
                    </div>
                    <div
                      css={`
                        display: flex;
                        flex-direction: row;
                        align-items: end;
                        justify-content: space-between;

                        /* border-right: 1px solid #dce2ec; */
                      `}
                    >
                      <p className="p_cover_medical_pop">Policy Term: </p>
                      <span
                        className="p_cover_medical_pop_span addon_plan_d_inter_1_product_pro_f_mediacl"
                        css={`
                          padding-left: 10px;
                        `}
                      >
                        {item.tenure > 1 ? item.tenure + " years" : "1 year"}
                      </span>
                    </div>

                    {planDetails.isRenewed ? (
                      <>
                        <div className="col-md-12"></div>
                        <div className="col-md-12">
                          <p className="p_cover_medical_pop revised-premium-title">
                            Revised Premium:{" "}
                          </p>
                          <span className="p_cover_medical_pop_span ">
                            ₹ {numToString(item.total_premium)} /{" "}
                            {item.tenure > 1 ? item.tenure + " years" : "year"}{" "}
                          </span>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* <div className="col-md-6">
                  <p className="p_cover_medical_pop color_green">
                    Revised Premium:{" "}
                  </p>
                  <span className="p_cover_medical_pop_span">
                  ₹ 15,225 / year
                  </span>
                </div> */}
                  </div>
                  {item.health_riders.length > 0 && (
                    <>
                      {" "}
                      <hr
                        css={`
                          border-bottom: #ddd;
                        `}
                      />
                      <p
                        className="p_cover_medical_pop"
                        css={`
                          width: 100%;
                          color: #0a87ff;
                          font-weight: 900;
                          margin-bottom: 5px;
                        `}
                      >
                        Riders:{" "}
                      </p>
                    </>
                  )}
                  {item.health_riders.length ? (
                    <div
                      className="row bg_medical_box_row"
                      css={`
                        // padding: 0 10px;
                      `}
                    >
                      {item.health_riders.map((riders) => (
                        <div
                          css={`
                            display: flex;
                            flex-direction: row;

                            justify-content: space-between;
                          `}
                        >
                          <p className="p_cover_medical_pop">{riders.name}</p>
                          <span
                            className="p_cover_medical_pop_span addon_plan_d_inter_1_product_pro_f_mediacl"
                            css={`
                              padding-left: 10px;
                            `}
                          >
                            ₹ {riders.premium}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {/* <br /> */}
                {item.addons.length ? (
                  <>
                    {" "}
                    <hr
                      css={`
                        border-bottom: #ddd;
                      `}
                    />
                    <p
                      className="p_cover_medical_pop"
                      css={`
                        width: 100%;
                        color: #0a87ff;
                        font-weight: 900;
                        margin-bottom: 5px;
                      `}
                    >
                      Add-ons Coverages:
                    </p>
                  </>
                ) : (
                  <></>
                )}

                {/* <br /> */}
                {item.addons.map((addOns, addOnIndex) => (
                  <div className="rider-box_product_pro_medical">
                    <div
                      className="row_display_pro_review"
                      css={`
                        @media (max-width: 767px) {
                          margin-bottom: 10px !important;
                        }
                      `}
                    >
                      <div
                        css={`
                          // display: flex;
                          // flex-direction: row;
                          // align-items: center;
                          & img {
                            height: 45px;
                            // width: 83px;
                            margin-right: 11px;
                            // margin-left: 5px;
                            object-fit: contain;
                          }
                          & span {
                            font-size: 16px;
                            font-weight: 900;
                            line-height: 1.2;
                          }
                        `}
                      >
                        <span>
                          <img
                            src={
                              frontendData.data.companies[
                                addOns.product.company.alias
                              ].logo
                            }
                            className="img_top_m_custom_medical"
                            alt="logo"
                          />
                        </span>

                        <span> {addOns.product.name}</span>
                      </div>
                    </div>
                    <hr
                      css={`
                        border-bottom: #ddd;
                      `}
                    />

                    <div
                      className="row"
                      css={`
                        margin-top: -9px;
                      `}
                    >
                      <div
                        css={`
                          display: flex;
                          flex-direction: row;
                          align-items: end;
                          justify-content: space-between;

                          /* border-right: 1px solid #dce2ec; */
                        `}
                      >
                        <p className="p_cover_medical_pop">Cover: </p>
                        <span
                          className="p_cover_medical_pop_span addon_plan_d_inter_1_product_pro_f_mediacl"
                          css={`
                            padding-left: 10px;
                          `}
                        >
                          ₹ {numToString(addOns.sum_insured)}
                        </span>
                      </div>
                      <div
                        css={`
                          display: flex;
                          flex-direction: row;
                          align-items: end;
                          justify-content: space-between;

                          /* border-right: 1px solid #dce2ec; */
                        `}
                      >
                        <p className="p_cover_medical_pop">Premium: </p>
                        <span
                          className="p_cover_medical_pop_span addon_plan_d_inter_1_product_pro_f_mediacl"
                          css={`
                            padding-left: 10px;
                          `}
                        >
                          ₹{" "}
                          {numToString(
                            prevCart[index]
                              ? prevCart[index].addons[addOnIndex].total_premium
                              : addOns.premium
                          )}{" "}
                          / year
                        </span>
                      </div>

                      {/* <div
                        className="col-md-6"
                        css={`
                          display: flex;
                          flex-direction: column;
                        `}
                        css={`
                          padding-left: 10px;
                        `}
                      >
                        <p className="p_cover_medical_pop">Premium: </p>
                        <span
                          css={`
                            padding-left: 10px;
                          `}
                          className={`p_cover_medical_pop_span text_decoration_line_through ${
                            planDetails.isRenewed &&
                            prevCart[index]?.addons[addOnIndex]
                              .total_premium !== addOns.total_premium
                              ? "revised-premium"
                              : ""
                          }`}
                        >
                          ₹{" "}
                          {numToString(
                            prevCart[index]
                              ? prevCart[index].addons[addOnIndex].total_premium
                              : addOns.premium
                          )}{" "}
                          / year
                        </span>
                      </div> */}
                      {prevCart[index]?.addons[addOnIndex]?.total_premium !==
                        addOns.total_premium && planDetails.isRenewed ? (
                        <>
                          <div className="col-md-12"></div>
                          <div className="col-md-12">
                            <p className="p_cover_medical_pop revised-premium-title">
                              Revised Premium:{" "}
                            </p>
                            <span className="p_cover_medical_pop_span ">
                              ₹ {numToString(addOns.total_premium)} /{" "}
                              {item.tenure > 1
                                ? item.tenure + " years"
                                : "year"}{" "}
                            </span>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {addOns.product.insurance_type.alias === "top_up" && (
                        <div
                          css={`
                            display: flex;
                            flex-direction: row;
                            align-items: end;
                            justify-content: space-between;

                            /* border-right: 1px solid #dce2ec; */
                          `}
                        >
                          <p className="p_cover_medical_pop">Deductable: </p>
                          <span
                            className="p_cover_medical_pop_span addon_plan_d_inter_1_product_pro_f_mediacl"
                            css={`
                              padding-left: 10px;
                            `}
                          >
                            ₹ {numToString(addOns.deductible)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ))}
            {planDetails.isRenewed ? (
              <>
                <div class="rider-box_product_pro_medical_box">
                  <div class="row padding_filter_footer_medical">
                    <div class="col-md-12">
                      <p class="font_grey">Total Premium</p>
                    </div>
                    <div class="col-md-4">
                      <button
                        type="button"
                        name="Continue"
                        class="next text-left"
                        value="Continue"
                      >
                        <span class="color_span_total_revise">
                          Previous Premium
                        </span>
                        <br />
                        <span
                          class="color_span_total_blck_medical text_decoration_line_through addon_plan_d_inter_1_product_pro_f_mediacl_btn revised-premium"
                          css={`
                            @media (max-width: 767px) {
                              font-size: 16px !important;
                              font-weight: bold !important;
                            }
                          `}
                        >
                          ₹ {planDetails.prevCart.totalPremium} / year
                        </span>
                      </button>
                    </div>
                    <div class="col-md-4">
                      <button
                        type="button"
                        name="Continue"
                        class="next text-left"
                        value="Continue"
                      >
                        <span class="color_span_total_revise revised-premium-title">
                          Revised Premium
                        </span>
                        <br />
                        <span
                          class="color_span_total_blck_medical"
                          css={`
                            @media (max-width: 767px) {
                              font-size: 16px !important;
                              font-weight: bold !important;
                            }
                          `}
                        >
                          ₹ {cart.totalPremium} / year
                        </span>
                      </button>
                    </div>
                    <div class="col-md-4" style={{ float: "right" }}>
                      <button
                        type="button"
                        name="Continue"
                        class="btn btn_continue_medi_revise_pop next"
                        value="Continue"
                        onClick={() => {
                          setActive((prev) => prev + 1);
                          dispatch(
                            setPlanDetails({
                              title: "Your Plan Details",
                              show: false,
                              prevCart: {},
                              isRenewed: false,
                            })
                          );
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </section>
        </div>
      </div>
    </>
  );
  return (
    <>
      <Card
        styledCss={`   
    position: sticky;
    top: 0;
    width: 100%;
    padding: 10px 20px;
    overflow: hidden;
    
    `}
      >
        {content}
        <div
          css={`
            font-weight: 900;
            border: 1px dashed #dce2ec;
            display: flex;
            padding: 7px 20px;
            background-color: #f7f7f7;
            justify-content: space-between;
            align-items: center;
            margin: 0 -20px;
            margin-bottom: -10px;
          `}
        >
          <span
            css={`
              color: #6d798f;
            `}
          >
            Total Premium <br />
            <small>*Inc. GST</small>
          </span>
          <Price
            css={`
              color: black;
            `}
          >
            ₹ {cart?.totalPremium}
          </Price>
        </div>
      </Card>
      {/* <ViewPlanDetailModal
        show={true}
        title={planDetails.title}
        showButton={false}
        content={content}
        handleClose={() => {
          setShow(false);
          dispatch(
            setPlanDetails({
              title: "Your Plan Details",
              show: false,
              prevCart: {},
              isRenewed: false,
            }),
          );
        }}
        customClass="customClassModalDialog"
        revised={true}

      /> */}
    </>
  );
};

export default ProductSummary;

const Wrapper = styled.div`
  width: 22%;
  display: inline-block;
  float: right;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  padding-left: 10px;
  @media (min-width: 768px) and (max-width: 1200px) {
    display: none;
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

  text-align: left !important;
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
  color: #0a87ff;

  margin-top: -3px;
`;
const ViewPlanDetails = styled.span`
  cursor: pointer;
  position: absolute;

  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  & img {
    display: inline-block;
    margin-left: 2px;
    cursor: pointer;
  }
`;
