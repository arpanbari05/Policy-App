import React, { useState, useEffect } from "react";
import { Col, Collapse, Row } from "react-bootstrap";
import ProposalCheckBox from "./summaryCheckBox";
import "./proposalSummary.scss";
import { useLocation } from "react-router";
import care from "./../../../assets/images/Care_Health.png";
import { useDispatch, useSelector } from "react-redux";
import { getCartItem } from "../../../pages/quotePage/quote.slice";

const ProposalSummary = ({ checked, onChange, setTotalPremium, onPayment }) => {
  const [show, setShow] = useState(false);
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
          <div className="terms-summary-card"
          css={`
          display: flex !important;
          align-items: center !important;
          `}
          >
            {/* <label class="cbx" for="self1">
						 <svg width="12px" height="10px">
							<use xlinkHref="#check"></use>
						</svg> 
						<span></span>
					</label> */}
            <ProposalCheckBox
              title={"checked"}
              type={"checkbox"}
              value={checked}
              onChange={onChange}
            />
            <div>
            <span className="iaccept-text-proposal">I Accept the </span>
            <span class="p_dark_f_a_check terms-propposal-card">
              Terms &amp; Conditions
            </span>
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
                  <i className="fa fa-angle-right"></i>
                </button>
              </li>
            </>
          )}
          {riders.length ? (
            <div className="additional-plan-wrapper">
              <div class="line-div"></div>
              <p className="addon_cover_btn_proposal_form_summary">
                Additional Riders
              </p>
              {riders.map(item => (
                <div className="addonWrap">
                  <div className="addonWrap__name">{item.rider.name}</div>
                  <div className="addonWrap__premium">{item.premium}</div>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
          {/* <div className="additional-plan-wrapper">
            <div class="line-div"></div>
            <p className="addon_cover_btn_proposal_form_summary">
              Additional Plans
            </p>

            <li className="proposal-card-accordian theme-sidebar-widget-proposal">
              <a
                onClick={() => {
                  setShow(!show);
                }}
              >
                <div className="close-button-additional">
                  <i class="fa fa-close close_proposal_form_addon "></i>
                </div>
                <i className="additional_header_proposal">
                  {" "}
                  Supra Super Topup(1)
                </i>

                <button type="button" class="expander-button-proposal">
                  <i class="fa fa-chevron-down"></i>
                </button>
              </a>
              <Collapse in={show}>
                <div id="collapseOne">
                  <div className="card-body card_body_padding margin_bottom_more_plan_card ">
                    <Col md={12}>
                      <div className="additional_accordian">
                        <div className="text-accordion-card">
                          Base Plan Premium{" "}
                        </div>
                        <span>
                          <i className="amount-accordion-card"></i> 5,212
                        </span>
                      </div>{" "}
                    </Col>
                  </div>
                </div>
              </Collapse>
            </li>
          </div> */}
        </ul>
      </div>
    </>
  );
};

export default ProposalSummary;
