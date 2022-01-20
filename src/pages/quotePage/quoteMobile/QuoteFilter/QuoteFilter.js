/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import { Col, Row } from "react-bootstrap";
import Cover from "./Cover";
import Insurer from "./Insurer";
import MoreFilter from "./MoreFilter";
import Multiyear from "./Multiyear";
import Plan from "./Plan";
import Premium from "./Premium";
import filterImage from "../../../../assets/images/filter.png";
import saveImage from "./../../../../assets/images/save.png";
import { useDispatch, useSelector } from "react-redux";
import useQuoteFilter from "./useQuoteFilter";
import DownArrow from "../../../../assets/images/downarrow.png";
import "styled-components/macro";
import { useHistory, useParams } from "react-router";
import { setFilters } from "../../quotePage.slice";
import useUrlQuery from "../../../../customHooks/useUrlQuery";

function FilterTab({ label, value, children, onClick = () => {}, ...props }) {
  return (
    <div
      css={`
        position: relative;
        flex: 1;
        padding-left: 13px;
        padding: 10px 25px !important;

        &:hover {
          background: #f1f3f6 !important;
          border-radius: 36px;
          &:before {
            display: block !important;
          }
          &:first-child {
            &:after {
              display: none;
            }
          }
          &:not(:first-child) {
            &:after {
              content: "";
              position: absolute;
              left: -1% !important;
              border: 1px solid #fff !important;
              z-index: 15 !important;
              width: calc(6% - 12px);
              height: calc(100% - 27px);
              top: 12px;
            }
          }
        }
        &:first-child {
          padding-left: 13px;
        }

        &:not(:last-child) {
          &:after {
            content: "";
            position: absolute;
            top: 12px;
            left: 99%;

            /* z-index: -8; */
            width: calc(6% - 12px);
            height: calc(100% - 27px);
            border-right: 1px solid var(--border-gray);
            z-index: 0;
          }
          padding-right: 10px;
          // border-right: 1px solid var(--border-gray);
        }
      `}
      {...props}
    >
      <label
        css={`
          color: var(--abc-red);
          margin-bottom: 3px;
          font-size: 15px;
          font-weight: bold;
        `}
      >
        {label}
      </label>
      <div
        css={`
          color: #000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-size: 18px;
          font-weight: 900;
        `}
        onClick={onClick}
      >
        {value}
        <span>
          <img src={DownArrow} alt="down-arrow" />
        </span>
      </div>
      {children}
    </div>
  );
}

const QuoteFilter = ({
  setShowBuyNow,
  companies,
  premiumFilter,
  coverFilter,
  planType,
  moreFilter,
  setFilterMobile,
  setShowTalkModal,
}) => {
  const history = useHistory();
  const urlQuery = useUrlQuery();
  const enquiryId = urlQuery.get("enquiryId");
  const {
    insurers,
    premium,
    cover,
    ownCover,
    planType: planTypeFilter,
    multiYear,
    moreFilters,
    basePlanType,
  } = useSelector(state => state.quotePage.filters);
  const { toggleUi } = useSelector(state => state.quotePage);

  const selectedMoreFiltersCount = Object.keys(moreFilters).reduce(
    (count, filter) => {
      if (moreFilters[filter] && typeof moreFilters[filter] === "object") {
        return count + moreFilters[filter].length;
      }
      if (moreFilters[filter] && typeof moreFilters[filter] === "string") {
        return count + 1;
      }
      return count;
    },
    0,
  );

  const { member } = useSelector(
    ({ greetingPage }) => greetingPage.proposerDetails,
  );
  const { memberGroups } = useSelector(({ greetingPage }) => greetingPage);

  const [expandSelected, setExpandSelected] = useState("");
  const [selectedInsurer, setSelectedInsurer] = useState(insurers);
  const [selectedPremium, setSelectedPremium] = useState(premium);
  const [selectedCover, setSelectedCover] = useState(ownCover || cover);
  const [selectedFloater, setSelectedFloater] = useState(planTypeFilter);
  const [selectedYear, setSelectedYear] = useState(multiYear);

  const memberGroupsList = Object.keys(memberGroups);

  const { groupCode } = useParams();

  const membersCount = memberGroups[groupCode]?.length;

  const showPlanTypeFilter = membersCount > 1;

  const dispatch = useDispatch();

  // useEffect(() => {

  //   if (showPlanTypeFilter && planTypeFilter === "Individual") {
  //     dispatch(setFilters({ planType: "Family Floater" }));
  //   }
  //   if (!showPlanTypeFilter) dispatch(setFilters({ planType: "Individual" }));
  // }, [dispatch, groupCode, planTypeFilter, showPlanTypeFilter]);

  if (!memberGroupsList[0]) return null;

  return (
    <>
      {" "}
      <div
        // className="shrt-menu display-none-at_992 shrt-menu-three light-bg text-dark mb-3 bg_white__shrt_product"
        // style={{ backgroundColor: "#fff" }}
        // //actual
        // css={`
        //   background-color: #fff;
        //   padding: 10px 0;
        //   box-shadow: 0 5px 20px 0 rgba(0, 75, 131, 0.09);
        //   margin-bottom: 20px;
        //   @media (max-width: 1200px) {
        //     padding: 10px 32px;
        //   }
        //   @media (max-width: 1023px) {
        //     display: none !important;
        //   }
        // `}
        //temp
        css={`
          ${!toggleUi
            ? ` background-color: #fff;
      //  padding: 4px 25px;
        box-shadow: 0 5px 20px 0 rgb(0 75 131 / 9%);
        margin-bottom: 20px;
        margin: 20px auto;
        max-width: 1140px;
        border-radius: 40px;`
            : `   background-color: #fff;
        padding: 10px 0;
           box-shadow: 0 5px 20px 0 rgba(0, 75, 131, 0.09);
          margin-bottom: 20px;
          @media (max-width: 1200px) {
            padding: 10px 32px;
          }
         `}
          @media (max-width: 1023px) {
            display: none !important;
          }
        `}
      >
        {/* <div className="container-fluid mt_6_h"> */}
        {/* <Row> */}
        {/* <Col md={12} className=" btn_filter_shadow"> */}
        {/* <Row> */}
        <div
          css={`
            display: flex;
            align-items: center;
            border: ${toggleUi && "1px dashed var(--border-gray)"};
            border-radius: 4px;
            z-index: 20;
            // padding: 6px 6px;
            // margin: auto;
            //  max-width: 1131px;
          `}
        >
          {/* <Col md={2}> */}
          {/* <div
                    className={`form-group dropdown_product_m_t_b email ${
                      expandSelected === "insurer" ? "expand" : ""
                    }`}
                    onClick={() => setExpandSelected("insurer")}
                  >
                    {/* <input
                      style={{
                        marginRight: "16px",
                      }}
                      css={`
                        &::placeholder {
                          color: #000;
                        }
                      `}
                      className="border_right_filter form-control"
                      value={
                        selectedInsurer.length === 0
                          ? "Please Select Insurers"
                          : selectedInsurer.map(i => i.short_name).join(", ")
                      }
                      readOnly="readonly"
                      autoComplete="off"
                    /> */}
          {/* {expandSelected === "insurer" && (
                      <Insurer
                        setExpandSelected={setExpandSelected}
                        setSelected={setSelectedInsurer}
                        selected={selectedInsurer}
                        companies={companies}
                      />
                    )} */}

          {/* <label
                      className="over_border_txt"
                      style={{
                        background: "transparent",
                      }}
                    >
                      Insurers
                      <img
                        style={{
                          position: "absolute",
                          top: "26px",
                          right: "-102px",
                        }}
                        src={}
                        alt="down-arrow"
                      />
                    </label>
                    <div className="help-block with-errors"></div>
                  </div>
                </Col> */}

          <FilterTab
            label="Insurers"
            value={
              selectedInsurer.length === 0
                ? "Select Insurers"
                : `${selectedInsurer.length} Insurers Selected`
            }
            onClick={() => setExpandSelected("insurer")}
          >
            {expandSelected === "insurer" && (
              <Insurer
                setExpandSelected={setExpandSelected}
                setSelected={setSelectedInsurer}
                selected={selectedInsurer}
                companies={companies}
              />
            )}
          </FilterTab>

          <FilterTab
            label="Premium"
            value={
              selectedPremium ? selectedPremium.display_name : "Select Premium"
            }
            onClick={() => setExpandSelected("premium")}
          >
            {expandSelected === "premium" && (
              <Premium
                setExpandSelected={setExpandSelected}
                setSelected={setSelectedPremium}
                selected={selectedPremium}
                premiumFilter={premiumFilter}
              />
            )}
          </FilterTab>

          {basePlanType !== "1 crore plan" && (
            <FilterTab
              label="Cover"
              value={selectedCover}
              onClick={() => setExpandSelected("cover")}
            >
              {expandSelected === "cover" && (
                <Cover
                  setExpandSelected={setExpandSelected}
                  coverFilter={coverFilter}
                  setSelectedCover={setSelectedCover}
                  selectedCover={selectedCover}
                  member={member}
                />
              )}
            </FilterTab>
          )}

          {showPlanTypeFilter && (
            <FilterTab
              label="Plan Type"
              value={selectedFloater}
              onClick={() => setExpandSelected("plan")}
            >
              {expandSelected === "plan" && (
                <Plan
                  setExpandSelected={setExpandSelected}
                  planType={planType}
                  setSelectedFloater={setSelectedFloater}
                  selectedFloater={selectedFloater}
                  member={member}
                />
              )}
            </FilterTab>
          )}

          <FilterTab
            label="Multiyear Options"
            value={selectedYear}
            onClick={() => setExpandSelected("multiyear")}
          >
            {expandSelected === "multiyear" && (
              <Multiyear
                setSelectedYear={setSelectedYear}
                selectedYear={selectedYear}
                setExpandSelected={setExpandSelected}
                member={member}
              />
            )}
          </FilterTab>

          <FilterTab
            label="More Filters"
            value={
              selectedMoreFiltersCount === 0
                ? "Select Filters"
                : `${selectedMoreFiltersCount} Filters Selected`
            }
            onClick={() => setExpandSelected("moreFilter")}
          >
            {expandSelected === "moreFilter" && (
              <MoreFilter
                moreFilter={moreFilter}
                expandSelected={expandSelected}
                setExpandSelected={setExpandSelected}
              />
            )}
          </FilterTab>

          {/* <Col md={2} className=" padding_left_zero">
                  <div
                    className={`form-group dropdown_product_m_t_b email1 ${
                      expandSelected === "premium" ? "expand" : ""
                    }`}
                    // onClick="this.classList.add('expand1')"
                    onClick={() => {
                      setExpandSelected("premium");
                    }}
                  >
                    <input
                      style={{
                        marginRight: "16px",
                      }}
                      css={`
                        &::placeholder {
                          color: #000;
                        }
                      `}
                      className="border_right_filter form-control"
                      // placeholder="Please Select Premium"
                      value={
                        selectedPremium
                          ? selectedPremium.display_name
                          : "Please Select Premium"
                      }
                      readOnly="readonly"
                      autoComplete="off"
                    />
                    {expandSelected === "premium" && (
                      <Premium
                        setExpandSelected={setExpandSelected}
                        setSelected={setSelectedPremium}
                        selected={selectedPremium}
                        premiumFilter={premiumFilter}
                      />
                    )}
                    <label className="over_border_txt">
                      Premium
                      <img
                        style={{
                          position: "absolute",
                          top: "26px",
                          right: "-102px",
                        }}
                        src={DownArrow}
                        alt="down-arrow"
                      />
                    </label>
                    <div className="help-block with-errors"></div>
                  </div>
                </Col> */}
          {/* <Col md={2}>
                  <div
                    className={`form-group dropdown_product_m_t_b email_cover ${
                      expandSelected === "cover" ? "expand_cover" : ""
                    }`}
                    onClick={() => {
                      setExpandSelected("cover");
                    }}
                  >
                    <input
                      style={{
                        marginRight: "16px",
                      }}
                      className="border_right_filter form-control"
                      placeholder="Please Select Cover"
                      value={selectedCover}
                      readOnly="readonly"
                      autoComplete="off"
                    />
                    {expandSelected === "cover" && (
                      <Cover
                        setExpandSelected={setExpandSelected}
                        coverFilter={coverFilter}
                        setSelectedCover={setSelectedCover}
                        selectedCover={selectedCover}
                        member={member}
                      />
                    )}

                    <label className="over_border_txt">
                      Cover{" "}
                      <img
                        style={{
                          position: "absolute",
                          top: "26px",
                          right: "-102px",
                        }}
                        src={DownArrow}
                        alt="down-arrow"
                      />
                    </label>
                    <div className="help-block with-errors"></div>
                  </div>
                </Col> */}

          {/* {showPlanTypeFilter && (
                  <Col md={2}>
                    <div
                      className={`form-group dropdown_product_m_t_b email_plan ${
                        expandSelected === "plan" ? "expand_plan" : ""
                      }`}
                      onClick={() => {
                        setExpandSelected("plan");
                      }}
                    >
                      <input
                        style={{
                          marginRight: "16px",
                        }}
                        className="border_right_filter form-control"
                        placeholder="Please Select Plan"
                        value={selectedFloater}
                        readOnly="readonly"
                        autoComplete="off"
                      />
                      {expandSelected === "plan" && (
                        <Plan
                          setExpandSelected={setExpandSelected}
                          planType={planType}
                          setSelectedFloater={setSelectedFloater}
                          selectedFloater={selectedFloater}
                          member={member}
                        />
                      )}
                      <label className="over_border_txt">
                        Plan Type{" "}
                        <img
                          style={{
                            position: "absolute",
                            top: "26px",
                            right: "-80px",
                          }}
                          src={DownArrow}
                          alt="down-arrow"
                        />
                      </label>
                      <div className="help-block with-errors"></div>
                    </div>
                  </Col>
                )} */}
          {/* <Col md={2}>
                  <div
                    className={`form-group dropdown_product_m_t_b email_year ${
                      expandSelected === "multiyear" ? "expand_year" : ""
                    }`}
                    onClick={() => {
                      setExpandSelected("multiyear");
                    }}
                  >
                    <input
                      style={{
                        marginRight: "16px",
                      }}
                      className="border_right_filter form-control"
                      placeholder="Please Select Year"
                      value={selectedYear}
                      readOnly="readonly"
                      autoComplete="off"
                    />
                    {expandSelected === "multiyear" && (
                      <Multiyear
                        setSelectedYear={setSelectedYear}
                        selectedYear={selectedYear}
                        setExpandSelected={setExpandSelected}
                        member={member}
                      />
                    )}

                    <label className="over_border_txt">
                      Multiyear Options{" "}
                      <img
                        style={{
                          position: "absolute",
                          top: "26px",
                          right: "-30px",
                        }}
                        src={DownArrow}
                        alt="down-arrow"
                      />
                    </label>
                    <div className="help-block with-errors"></div>
                  </div>
                </Col> */}
          {/* <Col md={2}>
                  <div
                    className="form-group dropdown_product_m_t_b"
                    data-toggle="modal"
                    data-target="#m-md-filter"
                    onClick={() => setExpandSelected("moreFilter")}
                  >
                    <input
                      style={{
                        marginRight: "16px",
                      }}
                      className="border_right_filter form-control"
                      placeholder="Please Select Filters"
                      value="Please Select Filters"
                      readOnly="readonly"
                      autoComplete="off"
                    />
                    <label className="over_border_txt">
                      More Filters{" "}
                      <img
                        style={{
                          position: "absolute",
                          top: "26px",
                          right: "-80px",
                        }}
                        src={DownArrow}
                        alt="down-arrow"
                      />
                    </label>
                    <div className="help-block with-errors"></div>
                  </div>
                </Col> */}
        </div>
        {/* </Row> */}
        {/* </Col> */}
        {/* </Row> */}
        {/* </div> */}
      </div>
      <div className="container-fluid product_title_p_bor_pop_r"></div>
      {/* <MoreFilter
        moreFilter={moreFilter}
        expandSelected={expandSelected}
        setExpandSelected={setExpandSelected}
      /> */}
      {/* mobile and ipad */}
      <div className="mobileViewStaticChat d-md-none hidden-lg">
        <div className="nw-chat-card">
          <div className="chat-div-containers">
            <button
              className="btn btn_recommend_plan_btn"
              data-toggle="modal"
              data-target="#mb-3-w"
              style={{ cursor: "pointer" }}
              onClick={() =>
                history.push(`/recommend/${groupCode}?enquiryId=${enquiryId}`)
              }
            >
              Recommend a Plan&nbsp;&nbsp; <i className="fa fa-angle-right"></i>
            </button>
          </div>

          <div className="chat-div-containers">
            <div onClick={prop => setFilterMobile(true)}>
              <div className="nw-img-with-content">
                <img
                  style={{ width: 24 }}
                  src={filterImage}
                  alt="filter-icon"
                />
              </div>
              <span className="clr_span_footer_fixed">Filter</span>
            </div>
          </div>
          <div className="chat-div-containers">
            <a onClick={setShowBuyNow}>
              <div className="nw-img-with-content">
                <img
                  style={{ width: 24 }}
                  src={filterImage}
                  alt="filter-icon"
                />
              </div>
              <span className="clr_span_footer_fixed">Cart</span>
            </a>
          </div>
          <div
            onClick={() => {
              setShowTalkModal(true);
            }}
            className="chat-div-containers"
          >
            <a data-toggle="modal" data-target="#myModal">
              <div className="nw-img-with-content">
                <img
                  style={{ width: 24, marginLeft: 12 }}
                  src={saveImage}
                  alt="save-icon"
                />
              </div>
              <span className="clr_span_footer_fixed">
                Talk&nbsp;to&nbsp;Us
              </span>
            </a>
          </div>
        </div>
        <div className="nw-cht-border-btn"></div>
      </div>
    </>
  );
};

export default QuoteFilter;
