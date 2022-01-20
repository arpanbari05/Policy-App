import { useState } from "react";
import "./addOnCoverage.scss";
import AilmentPopup from "./AilmentPopup";
import careImage from "./../../../assets/images/Care_Health.png";
// import edit from "./../../../assets/images/edit_pencil.png";
import { useSelector } from "react-redux";
import "styled-components/macro";
const AddOnCoverages = () => {
  const { theme } = useSelector(state => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;

  const [ailmentModalOpen, setAilmentModalOpen] = useState(false);
  return (
    <>
      <span className="addon-coverageParent">
        <div
          className="col-xl-12 col-lg-8 col-12 margin_border_outline_product_addon_re"
          id="add-on-coverages-section"
        >
          <div className="addon_plan_a_t_addon_cover_r">
            <br />
            <p className="plan_details_cus_title">Add-Ons Coverages</p>
            <p className="mb-12 color_g_addon_sub">
              Save upto 20% on your premium
            </p>
          </div>
          <div
            id="theme-tab-two"
            className="theme-tab-basic icon-style theme-tab hover contained medium z-icons-dark z-shadows z-bordered z-tabs horizontal top responsive silver"
            data-role="z-tabs"
            data-options='{"theme": "silver", "orientation": "horizontal", "animation": {"duration": 400, "effects": "slideH"}}'
          >
            <ul
              className="z-tabs-nav z-tabs-mobile"
              style={{ display: "none" }}
            >
              <li>
                <a className="z-link" style={{ textAlign: "left" }}>
                  <span className="z-title">Recommended </span>
                  <span className="flaticon-setup drp-icon"></span>
                </a>
              </li>
            </ul>
            <i className="z-dropdown-arrow"></i>
            <ul className="tabs-menu clearfix z-tabs-nav z-tabs-desktop">
              <li
                className="z-tab z-first z-active z-first-col z-first-row"
                data-link="tab1"
                style={{ width: "33.3333%" }}
              >
                <a className="z-link">Recommended </a>
              </li>
              <li
                className="z-tab z-first-row"
                data-link="tab2"
                style={{ width: "33.3333%" }}
              >
                <a className="z-link">Cancers</a>
              </li>
              <li
                className="z-tab z-right z-last-col z-first-row"
                data-link="tab3"
                style={{ width: "33.3333%" }}
              >
                <a className="z-link">Super Top-up</a>
              </li>
              <li
                className="z-tab z-last z-first-col z-last-col z-last-row"
                data-link="tab4"
                style={{ width: "100%" }}
              >
                <a className="z-link">Personal Accident</a>
              </li>
            </ul>

            <div className="tab-container z-container">
              <div
                className="z-content z-active"
                style={{ position: "relative", display: "block" }}
              >
                <div className="z-content-inner">
                  <div className="rider-box">
                    <div className="logo_add float_left_addon_c">
                      <img
                        className="contain"
                        src={careImage}
                        alt="care_health"
                      />
                    </div>

                    <div className="float_left_addon_c addon_plan_d_inter">
                      <p className="paln_name_t">
                        Supra Super Topup (I)
                        <br />
                        <span className="view_d_plan">View Details</span>
                      </p>
                    </div>
                    <div className="float_left_addon_c ">
                      <p className="label-add">
                        Cover
                        <br />
                        <span
                          className="blk edit_css addon_plan_d_inter_1"
                          data-toggle="modal"
                          data-target="#mb-3-w_c"
                        >
                          ₹ 5450{" "}
                          <i className="fa fa-pencil font_size_pencil_icon_addon"></i>
                        </span>
                      </p>
                    </div>

                    <div className="float_left_addon_c">
                      <div className="si_add si_add2">
                        <span className="label-add">Insured</span>
                        <span
                          className="blk edit_css"
                          data-toggle="modal"
                          data-target="#mb-3-w_c"
                        >
                          All
                        </span>
                      </div>
                    </div>
                    <div className="float_left_addon_c">
                      <div className="si_add si_add2">
                        <span className="label-add">Deductable</span>
                        <span
                          className="blk edit_css addon_plan_d_inter_2"
                          data-toggle="modal"
                          data-target="#mb-3-w_c_details"
                        >
                          ₹ 1400{" "}
                          <i className="fa fa-pencil font_size_pencil_icon_addon"></i>
                        </span>
                      </div>
                    </div>
                    <div className="rider-box1">
                      <button
                        className=""
                        id="toggle"
                        data-toggle="modal"
                        data-target="#mb-3-w"
                        onClick={() => setAilmentModalOpen(true)}
                      >
                        ₹ 678
                      </button>
                    </div>
                  </div>

                  <div className="rider-box">
                    <div className="logo_add float_left_addon_c">
                      <img
                        className="contain"
                        src={careImage}
                        alt="care_image"
                      />
                    </div>

                    <div
                      className="float_left_addon_c addon_plan_d_inter2"
                      style={{ width: "16%" }}
                    >
                      <p className="paln_name_t">
                        Personal accident
                        <br />
                        <span className="view_d_plan">View Details</span>
                      </p>
                    </div>
                    <div className="float_left_addon_c ">
                      <p className="label-add">
                        Cover
                        <br />
                        <span
                          className="blk edit_css addon_plan_d_inter_1_p"
                          data-toggle="modal"
                          data-target="#mb-3-w_c"
                        >
                          ₹ 5450{" "}
                          <i className="fa fa-pencil font_size_pencil_icon_addon"></i>
                        </span>
                      </p>
                    </div>

                    <div className="float_left_addon_c">
                      <div className="si_add si_add2">
                        <span className="label-add">Insured</span>
                        <span
                          className="blk edit_css"
                          data-toggle="modal"
                          data-target="#mb-3-w_c"
                        >
                          All
                        </span>
                      </div>
                    </div>

                    <div className="rider-box1">
                      <button
                        className=""
                        id="toggle"
                        data-toggle="modal"
                        data-target="#mb-3-w"
                        onClick={() => setAilmentModalOpen(true)}
                      >
                        ₹ 678
                      </button>
                    </div>
                  </div>

                  <div className="rider-box">
                    <div className="logo_add float_left_addon_c">
                      <img className="contain" src={careImage} alt="logo" />
                    </div>

                    <div
                      className="float_left_addon_c addon_plan_d_inter3"
                      style={{ width: "16%" }}
                    >
                      <p className="paln_name_t">
                        Cancer Protect
                        <br />
                        <span className="view_d_plan">View Details</span>
                      </p>
                    </div>
                    <div className="float_left_addon_c ">
                      <p className="label-add">
                        Cover
                        <br />
                        <span
                          className="blk edit_css addon_plan_d_inter_1_p_c"
                          data-toggle="modal"
                          data-target="#mb-3-w_c"
                        >
                          ₹ 5450{" "}
                          <i className="fa fa-pencil font_size_pencil_icon_addon"></i>
                        </span>
                      </p>
                    </div>

                    <div className="float_left_addon_c">
                      <div className="si_add si_add2">
                        <span className="label-add">Insured</span>
                        <span
                          className="blk edit_css"
                          data-toggle="modal"
                          data-target="#mb-3-w_c"
                        >
                          All
                        </span>
                      </div>
                    </div>

                    <div className="rider-box1">
                      <button
                        className=""
                        id="toggle"
                        data-toggle="modal"
                        data-target="#mb-3-w"
                        onClick={() => setAilmentModalOpen(true)}
                      >
                        ₹ 678
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="z-content" style={{ display: "none" }}>
                <div className="z-content-inner">
                  <div className="rider-box">
                    <div className="row">
                      <div className="col-md-2">
                        <div className="logo_add">
                          <img
                            className="contain"
                            src="images/logo/care_health.png"
                            alt="care_health"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <p className="paln_name_t">Supra Super Topup (I)</p>
                      </div>
                      <div className="col-md-2 margin_top_2">
                        <span className="label-add">Cover</span>
                        <span
                          className="blk edit_css"
                          data-toggle="modal"
                          data-target="#mb-3-w_c"
                        >
                          Edit
                        </span>
                      </div>

                      <div className="col-md-2 margin_top_2">
                        <div className="si_add si_add2">
                          <span className="label-add">Insured</span>
                          <span
                            className="blk edit_css"
                            data-toggle="modal"
                            data-target="#mb-3-w-m"
                          >
                            Edit
                          </span>
                        </div>
                      </div>
                      <div className="col-md-1 margin_top_2">
                        <div className="si_add si_add2">
                          <span className="label-add">Premium</span>
                          <span className="blk edit_css">
                            <i className="fa fa-inr"></i> 1400
                          </span>
                        </div>
                      </div>
                      <div className="col-md-2 toggel_mt_right">
                        <label htmlFor="toggle" className="label_t">
                          <input
                            className="input"
                            type="checkbox"
                            id="toggle"
                            data-toggle="modal"
                            data-target="#mb-3-w"
                          />
                          <div className="toggle-wrapper">
                            <span className="selector"></span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="rider-box">
                    <div className="row">
                      <div className="col-md-2">
                        <div className="logo_add">
                          <img
                            className="contain"
                            src="images/logo/care_health.png"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <p className="paln_name_t">Supra Super Topup (I)</p>
                      </div>
                      <div className="col-md-2 margin_top_2">
                        <span className="label-add">Cover</span>
                        <span
                          className="blk edit_css"
                          data-toggle="modal"
                          data-target="#mb-3-w_c"
                        >
                          Edit
                        </span>
                      </div>

                      <div className="col-md-2 margin_top_2">
                        <div className="si_add si_add2">
                          <span className="label-add">Insured</span>
                          <span
                            className="blk edit_css"
                            data-toggle="modal"
                            data-target="#mb-3-w-m"
                          >
                            Edit
                          </span>
                        </div>
                      </div>
                      <div className="col-md-1 margin_top_2">
                        <div className="si_add si_add2">
                          <span className="label-add">Premium</span>
                          <span className="blk edit_css">
                            <i className="fa fa-inr"></i> 1400
                          </span>
                        </div>
                      </div>
                      <div className="col-md-2 toggel_mt_right">
                        <label htmlFor="toggle2" className="label_t">
                          <input
                            className="input"
                            type="checkbox"
                            id="toggle2"
                          />
                          <div className="toggle-wrapper">
                            <span className="selector"></span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="rider-box">
                    <div className="row">
                      <div className="col-md-2">
                        <div className="logo_add">
                          <img
                            className="contain"
                            src="images/logo/care_health.png"
                            alt="healh"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <p className="paln_name_t">Supra Super Topup (I)</p>
                      </div>
                      <div className="col-md-2 margin_top_2">
                        <span className="label-add">Cover</span>
                        <span
                          className="blk edit_css"
                          data-toggle="modal"
                          data-target="#mb-3-w_c"
                        >
                          Edit
                        </span>
                      </div>

                      <div className="col-md-2 margin_top_2">
                        <div className="si_add si_add2">
                          <span className="label-add">Insured</span>
                          <span
                            className="blk edit_css"
                            data-toggle="modal"
                            data-target="#mb-3-w-m"
                          >
                            Edit
                          </span>
                        </div>
                      </div>
                      <div className="col-md-1 margin_top_2">
                        <div className="si_add si_add2">
                          <span className="label-add">Premium</span>
                          <span className="blk edit_css">
                            <i className="fa fa-inr"></i> 1400
                          </span>
                        </div>
                      </div>
                      <div className="col-md-2 toggel_mt_right">
                        <label htmlFor="toggle1" className="label_t">
                          <input
                            className="input"
                            type="checkbox"
                            id="toggle1"
                          />
                          <div className="toggle-wrapper">
                            <span className="selector"></span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="z-container">
              <div className="rider-box z-content" style={{ display: "none" }}>
                <div className="z-content-inner">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="logo_add">
                        <img
                          className="contain"
                          src="images/logo/care_health.png"
                          alt="contain"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <p className="paln_name_t">Supra Super Topup (I)</p>
                    </div>
                    <div className="col-md-2 margin_top_2">
                      <span className="label-add">Cover</span>
                      <span
                        className="blk edit_css"
                        data-toggle="modal"
                        data-target="#mb-3-w_c"
                      >
                        Edit
                      </span>
                    </div>

                    <div className="col-md-2 margin_top_2">
                      <div className="si_add si_add2">
                        <span className="label-add">Insured</span>
                        <span
                          className="blk edit_css"
                          data-toggle="modal"
                          data-target="#mb-3-w-m"
                        >
                          Edit
                        </span>
                      </div>
                    </div>
                    <div className="col-md-1 margin_top_2">
                      <div className="si_add si_add2">
                        <span className="label-add">Premium</span>
                        <span className="blk edit_css">
                          <i className="fa fa-inr"></i> 1400
                        </span>
                      </div>
                    </div>
                    <div className="col-md-2 toggel_mt_right">
                      <label htmlFor="toggle" className="label_t">
                        <input
                          className="input"
                          type="checkbox"
                          id="toggle"
                          data-toggle="modal"
                          data-target="#mb-3-w"
                        />
                        <div className="toggle-wrapper">
                          <span className="selector"></span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rider-box z-content" style={{ display: "none" }}>
                <div className="z-content-inner">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="logo_add">
                        <img
                          className="contain"
                          src="images/logo/care_health.png"
                          alt="logo"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <p className="paln_name_t">Supra Super Topup (I)</p>
                    </div>
                    <div className="col-md-2 margin_top_2">
                      <span className="label-add">Cover</span>
                      <span
                        className="blk edit_css"
                        data-toggle="modal"
                        data-target="#mb-3-w_c"
                      >
                        Edit
                      </span>
                    </div>

                    <div className="col-md-2 margin_top_2">
                      <div className="si_add si_add2">
                        <span className="label-add">Insured</span>
                        <span
                          className="blk edit_css"
                          data-toggle="modal"
                          data-target="#mb-3-w-m"
                        >
                          Edit
                        </span>
                      </div>
                    </div>
                    <div className="col-md-1 margin_top_2">
                      <div className="si_add si_add2">
                        <span className="label-add">Premium</span>
                        <span className="blk edit_css">
                          <i className="fa fa-inr"></i> 1400
                        </span>
                      </div>
                    </div>
                    <div className="col-md-2 toggel_mt_right">
                      <label htmlFor="toggle" className="label_t">
                        <input
                          className="input"
                          type="checkbox"
                          id="toggle"
                          data-toggle="modal"
                          data-target="#mb-3-w"
                        />
                        <div className="toggle-wrapper">
                          <span className="selector"></span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rider-box z-content" style={{ display: "none" }}>
                <div className="z-content-inner">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="logo_add">
                        <img
                          className="contain"
                          src="images/logo/care_health.png"
                          alt="logo/care"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <p className="paln_name_t">Supra Super Topup (I)</p>
                    </div>
                    <div className="col-md-2 margin_top_2">
                      <span className="label-add">Cover</span>
                      <span
                        className="blk edit_css"
                        data-toggle="modal"
                        data-target="#mb-3-w_c"
                      >
                        Edit
                      </span>
                    </div>

                    <div className="col-md-2 margin_top_2">
                      <div className="si_add si_add2">
                        <span className="label-add">Insured</span>
                        <span
                          className="blk edit_css"
                          data-toggle="modal"
                          data-target="#mb-3-w-m"
                        >
                          Edit
                        </span>
                      </div>
                    </div>
                    <div className="col-md-1 margin_top_2">
                      <div className="si_add si_add2">
                        <span className="label-add">Premium</span>
                        <span className="blk edit_css">
                          <i className="fa fa-inr"></i> 1400
                        </span>
                      </div>
                    </div>
                    <div className="col-md-2 toggel_mt_right">
                      <label htmlFor="toggle" className="label_t">
                        <input
                          className="input"
                          type="checkbox"
                          id="toggle"
                          data-toggle="modal"
                          data-target="#mb-3-w"
                        />
                        <div className="toggle-wrapper">
                          <span className="selector"></span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="z-container">
              <div className="rider-box z-content" style={{ display: "none" }}>
                <div className="z-content-inner">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="logo_add">
                        <img
                          className="contain"
                          src="images/logo/care_health.png"
                          alt="logo/care"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <p className="paln_name_t">Supra Super Topup (I)</p>
                    </div>
                    <div className="col-md-2 margin_top_2">
                      <span className="label-add">Cover</span>
                      <span
                        className="blk edit_css"
                        data-toggle="modal"
                        data-target="#mb-3-w_c"
                      >
                        Edit
                      </span>
                    </div>

                    <div className="col-md-2 margin_top_2">
                      <div className="si_add si_add2">
                        <span className="label-add">Insured</span>
                        <span
                          className="blk edit_css"
                          data-toggle="modal"
                          data-target="#mb-3-w-m"
                        >
                          Edit
                        </span>
                      </div>
                    </div>
                    <div className="col-md-1 margin_top_2">
                      <div className="si_add si_add2">
                        <span className="label-add">Premium</span>
                        <span className="blk edit_css">
                          <i className="fa fa-inr"></i> 1400
                        </span>
                      </div>
                    </div>
                    <div className="col-md-2 toggel_mt_right">
                      <label htmlFor="toggle_A" className="label_t">
                        <input
                          className="input"
                          type="checkbox"
                          id="toggle_A"
                          data-toggle="modal"
                          data-target="#mb-3-w_c_a"
                        />
                        <div className="toggle-wrapper">
                          <span className="selector"></span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rider-box z-content" style={{ display: "none" }}>
                <div className="z-content-inner">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="logo_add">
                        <img
                          className="contain"
                          src="images/logo/care_health.png"
                          alt="logo/care"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <p className="paln_name_t">Supra Super Topup (I)</p>
                    </div>
                    <div className="col-md-2 margin_top_2">
                      <span className="label-add">Cover</span>
                      <span
                        className="blk edit_css"
                        data-toggle="modal"
                        data-target="#mb-3-w_c"
                      >
                        Edit
                      </span>
                    </div>

                    <div className="col-md-2 margin_top_2">
                      <div className="si_add si_add2">
                        <span className="label-add">Insured</span>
                        <span
                          className="blk edit_css"
                          data-toggle="modal"
                          data-target="#mb-3-w-m"
                        >
                          Edit
                        </span>
                      </div>
                    </div>
                    <div className="col-md-1 margin_top_2">
                      <div className="si_add si_add2">
                        <span className="label-add">Premium</span>
                        <span className="blk edit_css">
                          <i className="fa fa-inr"></i> 1400
                        </span>
                      </div>
                    </div>
                    <div className="col-md-2 toggel_mt_right">
                      <label htmlFor="toggle_B" className="label_t">
                        <input
                          className="input"
                          type="checkbox"
                          id="toggle_B"
                          data-toggle="modal"
                          data-target="#mb-3-w_c_a"
                        />
                        <div className="toggle-wrapper">
                          <span className="selector"></span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rider-box z-content" style={{ display: "none" }}>
                <div className="z-content-inner">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="logo_add">
                        <img
                          className="contain"
                          src="images/logo/care_health.png"
                          alt="logo/care"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <p className="paln_name_t">Supra Super Topup (I)</p>
                    </div>
                    <div className="col-md-2 margin_top_2">
                      <span className="label-add">Cover</span>
                      <span
                        className="blk edit_css"
                        data-toggle="modal"
                        data-target="#mb-3-w_c"
                      >
                        Edit
                      </span>
                    </div>

                    <div className="col-md-2 margin_top_2">
                      <div className="si_add si_add2">
                        <span className="label-add">Insured</span>
                        <span
                          className="blk edit_css"
                          data-toggle="modal"
                          data-target="#mb-3-w-m"
                        >
                          Edit
                        </span>
                      </div>
                    </div>
                    <div className="col-md-1 margin_top_2">
                      <div className="si_add si_add2">
                        <span className="label-add">Premium</span>
                        <span className="blk edit_css">
                          <i className="fa fa-inr"></i> 1400
                        </span>
                      </div>
                    </div>
                    <div className="col-md-2 toggel_mt_right">
                      <label htmlFor="toggle_c" className="label_t">
                        <input
                          className="input"
                          type="checkbox"
                          id="toggle_c"
                          data-toggle="modal"
                          data-target="#mb-3-w_c_a"
                        />
                        <div className="toggle-wrapper">
                          <span className="selector"></span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="z-container">
              <div
                className="signUp-page signUp-minimal pb-100 z-content"
                style={{ display: "none" }}
              >
                <div className="z-content-inner">
                  <div className="-wrapper pad_proposal_s">
                    <form action="#" id="login-form">
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="form-group dropdown_product_m_t_b_p">
                            <select
                              className="form-control-age"
                              required="required"
                              data-error="Valid email is required."
                            >
                              <option value="">- Select -</option>
                              <option value="method1">
                                Other Details as per your age
                              </option>
                              <option value="method2">
                                Other Details as per your choice
                              </option>
                              <option value="method3">
                                Target asset allocation strategy
                              </option>
                              <option value="method4">
                                Trigger portfolio strategy 2
                              </option>
                            </select>
                            <label className="over_border_txt_proposal">
                              Other Details Method
                            </label>
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-12 col-md-12">
                          <div className="acType-content padding_bottom_0">
                            <h4 className="padding_bottom_0">
                              Other Details as per your age
                            </h4>
                            <p>
                              This is lifecycle based strategy, Generally,
                              younger individuals have a higher appetite for
                              risk, hence the fund is allocated accordingly,
                              automatically. You don't have to actively managed
                              your funds.
                            </p>
                            <h4 className="padding_bottom_0">
                              Multicap Growth Fund
                            </h4>
                            <p>
                              An equity fund aimed at generating superior
                              long-tern returns, from a diversified portfolio of
                              equity related instruments of large, mid and small
                              companies.
                            </p>
                            <h4 className="padding_bottom_0">Income Fund</h4>
                            <p>
                              A debt fund tha lets you accumulate income through
                              investment in various fixed income securities.
                              This fund also seeks to offer capital appreciation
                              while maintaining a suitable balance between
                              return, safely and liquidity.
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-md-12">
                          <table className="table table-striped table-bordered">
                            <thead>
                              <tr>
                                <th>Age</th>
                                <th>Multicap Growth Fund</th>
                                <th>Income Fund</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="row1">
                                <td>0-25</td>
                                <td>80%</td>
                                <td>20%</td>
                              </tr>
                              <tr className="row2 highlight">
                                <td>26-35</td>
                                <td>75%</td>
                                <td>25%</td>
                              </tr>
                              <tr className="row3">
                                <td>36-45</td>
                                <td>65%</td>
                                <td>35%</td>
                              </tr>
                              <tr className="row4">
                                <td>46-55</td>
                                <td>55%</td>
                                <td>45%</td>
                              </tr>
                              <tr className="row5">
                                <td>56-65</td>
                                <td>45%</td>
                                <td>55%</td>
                              </tr>
                              <tr className="row6">
                                <td>66-80</td>
                                <td>35%</td>
                                <td>65%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <a
                        href="product.html"
                        className="text-right"
                        style={{ float: "right" }}
                      >
                        Continue
                        <i
                          className="fa fa-angle-right icon-right"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>
      <AilmentPopup
        setAilmentModalOpen={setAilmentModalOpen}
        ailmentModalOpen={ailmentModalOpen}
      />
    </>
  );
};

export default AddOnCoverages;
