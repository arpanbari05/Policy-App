/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useOutsiteClick from "../../../../customHooks/useOutsiteClick";
import RemoveBtnIcon from "../../../../assets/images/remove_m.png";
import AddBtn from "../../../../assets/images/add_btn.png";
import SecureLS from "secure-ls";

import "./navDropdown.scss";
import { numberToDigitWord } from "../../../../utils/helper";
import { deleteCartItem } from "../../../../modules/QuotesPage/quotePage.slice";

const NavDropdown = ({ children, customClassName }) => {
  const ls = new SecureLS();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const cartArr = useSelector(({ quotePage }) => quotePage.cartItems);
  const quotes = useSelector(({ quotePage }) => quotePage.quotes);
  const { selectedRiders } = useSelector(state => state.quotePage);
  const { memberGroups } = useSelector(state => state.greetingPage);
  const { first_name } =
    useSelector(({ greetingPage }) => greetingPage?.proposerDetails) || {};

  const [show, setShow] = useState("");
  const total = cartArr.reduce(
    (sum, current) => sum + parseInt(current.premium),
    0,
  );

  useOutsiteClick(show === "show" && dropdownRef, () => setShow(false));

  const handleClick = () => {
    setShow(show === "show" ? false : "show");
  };

  const companies = useSelector(
    ({ frontendBoot }) => frontendBoot?.frontendData?.data,
  );

  const currentGroup =
    localStorage.getItem("groups") &&
    JSON.parse(localStorage.getItem("groups")).find(group => group?.id);

  return (
    <>
      <span onClick={handleClick} className="navdropdown">
        {children}
        <div
          ref={dropdownRef}
          className={`navdropdown__content ${
            cartArr.length > 0 ? show : false
          } ${customClassName && customClassName}`}
        >
          <div
            className="modal left wow fadeInright animated animated show"
            data-wow-delay="0.2s"
            id="myModal_cart"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            data-backdrop="false"
            style={{
              visibility: "visible",
              animationDelay: "0.2s",
              paddingRight: "9px",
              display: "block",
            }}
          >
            <div
              className="modal-dialog modal-dialog-test "
              role="document"
              style={{ right: "0px" }}
            >
              <div className="modal-content">
                <div
                  className="modal-header bg_more_header_filters"
                  style={{
                    borderBottom: "1px solid #fff",
                    margin: cartArr.length > 0 ? "auto" : "0",
                  }}
                >
                  <div className="product_title_p_bor_modal_filters">
                    <h5 className="modal-title  modal_title_margin_cart_p">
                      Hey {first_name || "Dev"}, Take a minute and review your
                      cart before you proceed
                    </h5>
                  </div>
                  <button
                    type="button"
                    className="btn close_modal_cart btn-white border_radius_modal"
                    data-dismiss="modal"
                  >
                    <i className="fa fa-close"></i>
                  </button>
                </div>

                <div
                  className="modal-body p-lg modal_body_padding_filters_product modal_scroll_filter_product"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="row">
                    <div className="col-xs-12" style={{ width: "100%" }}>
                      <section className="light section">
                        {cartArr.map(plan => (
                          <>
                            <div className="row">
                              <div
                                className="col-md-8"
                                style={{
                                  marginBottom: "-26px",
                                  marginTop: "15px",
                                }}
                              >
                                <h5
                                  className="text_title_filter p_modal_title_bg_filters_product_cart"
                                  style={{
                                    textAlign: "left",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {/* {memberGroups[0].join(", ")} */}
                                </h5>
                              </div>
                              <div
                                className="col-md-4 text-right"
                                style={{
                                  marginTop: "24px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  dispatch(deleteCartItem({ id: plan?.id }));
                                }}
                              >
                                <img
                                  src={RemoveBtnIcon}
                                  className="mar_cart_del_cart_p"
                                  alt="mar_cart_del_cart_p"
                                />
                              </div>
                            </div>

                            <div className=" rider-box_product_cart">
                              <div className="row mb-10">
                                <div className="col-md-2">
                                  <div className="logo_add float_left_addon_c_cart">
                                    <img
                                      className="contain border_radius_50_l"
                                      src={
                                        quotes
                                          .map(item => {
                                            return item?.filter(
                                              quote =>
                                                quote?.product?.id ===
                                                plan?.product.id,
                                            );
                                          })
                                          .filter(
                                            item => item?.length > 0,
                                          )?.[0]?.[0]?.logo ||
                                        companies?.companies[
                                          plan?.company_alias
                                        ]?.logo
                                      }
                                      width="34"
                                      alt="contain border_radius_50_l"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-8">
                                  <div
                                    className="float_left_addon_c_cart"
                                    style={{ textAlign: "left" }}
                                  >
                                    <p className="paln_name_t_product_f">
                                      {plan?.product?.name}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="row bg_cart">
                                <div
                                  className="col-md-4 text-left"
                                  style={{
                                    margin: "0 -18px 0 17px !important",
                                  }}
                                >
                                  <p className="text-black font_14 font_family_bold_quote">
                                    Cover
                                  </p>
                                  <div className="product_title_p_bor_pop_right_buy_f">
                                    <p className="text-black font_13 font_family_bold_quote_cart">
                                      <span className="color_red">
                                        {numberToDigitWord(
                                          plan?.sum_insured?.toString(),
                                        )}
                                      </span>{" "}
                                    </p>
                                  </div>
                                </div>

                                <div
                                  className="col-md-5 text-left"
                                  style={{
                                    margin: "0 14px 0 -13px !important",
                                  }}
                                >
                                  <p className="text-black font_14 font_family_bold_quote">
                                    Premium
                                  </p>
                                  <div className="product_title_p_bor_pop_right_buy_f_r">
                                    <p className="text-black font_13 font_family_bold_quote_cart">
                                      <span className="color_red">
                                        <i className="fa fa-inr"></i>{" "}
                                        {parseInt(plan?.premium)
                                          .toFixed(2)
                                          .toLocaleString("en-IN")}
                                      </span>{" "}
                                      / per year
                                    </p>
                                  </div>
                                </div>

                                <div
                                  className="col-md-3 text-left"
                                  style={{
                                    margin: "0 -46px 0 14px !important",
                                  }}
                                >
                                  <p className="text-black font_14 font_family_bold_quote">
                                    Tenure
                                  </p>
                                  <p className="font_13 font_family_bold_quote_cart color_red">
                                    {plan?.tenure} year
                                  </p>
                                </div>
                              </div>

                              {selectedRiders.group_code_1 &&
                                selectedRiders.group_code_1.map(
                                  ({ id, name, premium }) => (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <>
                                        <h6 style={{ fontSize: "14px" }}>
                                          {name}
                                        </h6>
                                        <span style={{ fontSize: "14px" }}>
                                          {" "}
                                          <i className="fa fa-inr"></i>{" "}
                                          {premium}
                                        </span>
                                      </>
                                    </div>
                                  ),
                                )}
                            </div>
                          </>
                        ))}
                        <br />
                        <div className="row">
                          {memberGroups.group_code_2 && (
                            <div className="col-md-8">
                              <h5 className="text_title_filter p_modal_title_bg_filters_product_cart text-left">
                                {memberGroups.group_code_2.join(", ")}
                              </h5>
                            </div>
                          )}
                          <br />
                          <br />
                          <br />
                          <div className="col-md-8 mt-2">
                            <a>
                              <button
                                className="btn btn-primary remove_review_btn-test"
                                onClick={() =>
                                  history.push({
                                    pathname: "/quotes",
                                    search: `enquiryId=${ls.get(
                                      "enquiryId",
                                    )}&pincode=${currentGroup?.pincode}&city=${
                                      currentGroup.city
                                    }`,
                                  })
                                }
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={AddBtn}
                                  alt="AddBtn"
                                  className="mr-2"
                                />
                                Add Plans
                              </button>
                            </a>
                          </div>
                        </div>
                        <br />
                        <div className="row row_bg_total_p_cart">
                          <div className="col-md-6">
                            <a className="text-black bg_total_p_r_l">
                              Total Premium
                            </a>
                          </div>
                          <div className="col-md-6">
                            <p className="p_total_premium_amount_p">
                              <i className="fa fa-inr"></i>{" "}
                              {total.toFixed(2).toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                        <br />
                        <div
                          className="col-md-10 mt-2 max-wi"
                          style={{ padding: "0.35rem" }}
                        >
                          <button
                            type="button"
                            name="Continue"
                            className="next action-button btn_con_cart test"
                            value="Continue"
                          >
                            Continue <i className="icon flaticon-next"></i>
                          </button>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>
    </>
  );
};

export default NavDropdown;
