import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ProposalCheckBox from "./summaryCheckBox";
import "./proposalSummary.scss";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCartItem } from "../../../pages/quotePage/quote.slice";
import TermModal from "../../../pages/ProposalSummary/TermsModal";
import { FaAngleRight } from "react-icons/fa";

const ProposalSummary = ({ checked, onChange, setTotalPremium, onPayment }) => {
  const [termShow, setTermShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItem());
  }, []);
  const { cartItems } = useSelector(state => state.quotePage);
  const riders = cartItems[0].health_riders;
  const totalPremium =
    Number(cartItems[0].premium) +
    (riders.length
      ? riders.reduce((prev, cur) => prev + Number(cur.premium), 0)
      : 0);

  const frontendBoot = useSelector(state => state.frontendBoot);
  const { pathname } = useLocation();
  const [summary, setSummary] = useState(false);
  useEffect(() => {
    if (pathname === "/proposal") setSummary(false);
    else setSummary(true);
  }, []);
  useEffect(() => {
    if (setTotalPremium) setTotalPremium(totalPremium);
  }, []);

  return (
    <>
      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-8 col-12 box-shadow_plan_box_p_s_s_proposal_form proposal-card-summary">
        <Row>
          <Col md={12}>
            <div className="addon_plan_a_t_addon_cover_r_cart_proposal_form">
              <p className="text-left plan_ic_name_y">Summary</p>
            </div>
          </Col>
        </Row>
        <Col md={12}>
          <p className="font_17 plan_right_member_e_c_proposal_form">
            <img
              className="contain img_right_panel_addon_add_proposal_form"
              src={
                cartItems.length &&
                frontendBoot.frontendData.data.companies[
                  cartItems[0].product.company.alias
                ].logo
              }
              alt="care_health"
            />{" "}
            <span className="span_proposal_form_i">
              {cartItems.length ? cartItems[0].product.name : ""}
            </span>
          </p>
        </Col>
        <div className="margin_top_proposal_summary_r_b">
          <Row>
            <Col md={6}>
              <p className="color_cover_p_r_b">Cover Amount</p>
              <p className="p_c_r_b_p amountText">
                <i className="fa fa-inr"></i>{" "}
                {cartItems.length
                  ? cartItems[0].sum_insured.toLocaleString("en-IN")
                  : ""}
              </p>
            </Col>
            <Col md={6}>
              <p className="color_cover_p_r_b">Total Premium</p>
              <p className="p_c_r_b_p amountText">
                <i className="fa fa-inr "></i>{" "}
                {cartItems.length
                  ? Number(totalPremium).toLocaleString("en-IN")
                  : ""}
              </p>
            </Col>
            <Col md={6}>
              <p className="color_cover_p_r_b">Policy Tenure</p>
              <p className="p_c_r_b_p amountText">
                {cartItems.length ? cartItems[0].tenure : ""} Year
              </p>
            </Col>
          </Row>
        </div>
        {summary && (
          <div
            className="terms-summary-card"
            css={`
              display: flex !important;
              align-items: center !important;
            `}
          >
            <ProposalCheckBox
              title={"checked"}
              type={"checkbox"}
              value={checked}
              onChange={onChange}
            />
            <div>
              <span className="iaccept-text-proposal">I Accept the </span>
              <span
                className="p_dark_f_a_check terms-propposal-card"
                style={{ cursor: "pointer" }}
                onClick={() => setTermShow(true)}
              >
                Terms &amp; Conditions
              </span>
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
        <ul>
          {summary && (
            <>
              {" "}
              <li className="total_premium_btn_proposal_summary">
                <button
                  className="addon_font_s_s_pro_s_s font_17"
                  onClick={onPayment}
                >
                  Pay Now
                  <span className="font_bold total_premium_btn_addon_r_summary">
                    <p className="total_p_text_proposal_summary">
                      Total Premium
                    </p>
                    <i className="fa fa-inr "></i>
                    {cartItems
                      ? Number(totalPremium).toLocaleString("en-IN")
                      : ""}
                  </span>
                </button>
              </li>
              <li style={{ textAlign: "center" }}>
                <button
                  href=""
                  className="btn btn_proposal_s_email margin_bottom_23_email_p_s "
                  data-toggle="modal"
                  data-target="#email_m"
                  data-toggle-class="fade-right"
                  data-toggle-class-target="#animate"
                >
                  Email to Proposal Form &nbsp;&nbsp;
                  <FaAngleRight />
                </button>
              </li>
            </>
          )}
          {riders.length ? (
            <div className="additional-plan-wrapper">
              <div className="line-div"></div>
              <p className="addon_cover_btn_proposal_form_summary">
                Additional Riders
              </p>
              {riders.map(item => (
                <div className="addonWrap" key={item.rider.name}>
                  <div className="addonWrap__name">{item.rider.name}</div>
                  <div className="addonWrap__premium">{item.premium}</div>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </>
  );
};

export default ProposalSummary;
