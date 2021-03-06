import React, { useEffect, useState } from "react";
import tooltipImg from "../../../../assets/svg/tooltip-icon.js";
import PlansDetailsM from "./PlansDetailsM";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../../../customHooks/useWindowSize.js";
import { RiderName, RiderPremium, RiderWrapper } from "../../ComparePage.style";
import { numToLakh } from "../../useComparePage";
import TooltipMobileModal from "../../../../components/Common/Modal/TooltipMobileModal";
import { v4 as uuid } from "uuid";

import {
  addPremium,
  clearRiders,
  insertRider,
  removeRider,
  subtractPremium,
  updatePremiumQuote,
} from "../../compare.slice";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import wrong from "../../../../assets/images/wrong2.png";

import {
  getProductDiscount,
  removeQuotesForCompare,
  setQuotesForCompare,
} from "../../../quotePage/quote.slice.js";
import Checkbox from "../Checkbox/Checbox.js";
import Checkbox2 from "../Checkbox/checkBoxRider";
// tooltip show information on hover
const renderTooltipDesc = ({ props, desc }) => (
  <Tooltip {...props}>{desc}</Tooltip>
);

// for sum assured functionality
const SumAssured = ({
  plans,
  index,
  mergedCover,
  showDiffCbx,
  hideCells,
  setHideCells,
}) => {
  const dispatch = useDispatch();
  const { quotesForCompare } = useSelector(state => state.quotePage);
  const [showTooltipMobile, setShowTooltipMobile] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipTitle, setTooltipTitle] = useState("");

  return (
    <>
      <TooltipMobileModal
        title={tooltipTitle}
        show={showTooltipMobile}
        content={tooltipContent}
        handleClose={() => {
          setShowTooltipMobile(false);
          setTooltipContent("");
          setTooltipTitle("");
        }}
      />
      <div class="col-xs-12 no-padding padding_vertical_10 border_top_dark">
        <div class="col-xs-12 font-bold bg_row_table_c bg_row_table_c">
          <span
            class="tbody_bg_border_th_bor_bootom"
            onClick={() => {
              setShowTooltipMobile(true);
              setTooltipContent(
                "Cover Amount of the selected plan is the maximum pay out the Insurance company will offer",
              );
              setTooltipTitle("Sum insured");
            }}
          >
            Sum insured {tooltipImg()}
          </span>
        </div>
        <div class="col-xs-12 padding_inner_row_c_t">
          {[0, 1]?.map(item => {
            if (plans[item])
              return (
                <>
                  <div
                    className={`col-xs-6 ${item === 0 && "border_right_dark"}`}
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <select
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        background: "white !important",
                        color: "rgb(100, 113, 136)",
                      }}
                      onChange={e => {
                        dispatch(
                          removeQuotesForCompare(
                            `${plans[item]?.data?.product?.id}${plans[item]?.data?.sum_insured}`,
                          ),
                        );
                        dispatch(
                          setQuotesForCompare([
                            `${plans[item]?.data?.product.id}${e.target.selectedOptions[0].id}`,
                            2,
                          ]),
                        );
                      }}
                    >
                      <option id={plans[item]?.data?.sum_insured}>
                        ??? {numToLakh(plans[item]?.data?.sum_insured)}
                      </option>
                      {mergedCover.length > 0 &&
                        mergedCover[item]?.map(data => {
                          if (
                            plans[item]?.data.sum_insured !== data &&
                            !quotesForCompare.includes(
                              `${plans[item]?.data?.product.id}${data}`,
                            )
                          ) {
                            return (
                              <option id={data}>??? {numToLakh(data)}</option>
                            );
                          }
                        })}
                    </select>
                  </div>
                </>
              );
            else return <></>;
          })}
        </div>
      </div>
    </>
  );
};

// additional banefits section
const AdditionalBenefits = ({
  index,
  showDiffCbx = true,
  hideCells,
  setHideCells,
  title,
  dispatch,
  windowWidth,
}) => {
  const plans = useSelector(({ comparePage }) => comparePage.quotes);
  const [showTooltipMobile, setShowTooltipMobile] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipTitle, setTooltipTitle] = useState("");

  return (
    <>
      <TooltipMobileModal
        title={tooltipTitle}
        show={showTooltipMobile}
        content={tooltipContent}
        handleClose={() => {
          setShowTooltipMobile(false);
          setTooltipContent("");
          setTooltipTitle("");
        }}
      />
      <div class="col-xs-12 no-padding padding_vertical_10 border_top_dark">
        <div class="col-xs-12 font-bold bg_row_table_c bg_row_table_c">
          <span
            class="tbody_bg_border_th_bor_bootom"
            onClick={() => {
              setShowTooltipMobile(true);
              setTooltipContent(
                "You can add ???Riders??? to your basic health insurance plan for additional benefits.",
              );
              setTooltipTitle("Optional Covers");
            }}
          >
            Optional Covers {tooltipImg()}
          </span>
        </div>

        <div class="col-xs-12 d-flex padding_inner_row_c_t">
          {plans.length &&
            plans.map((plan, planIndex) => {
              let riders = plan.features.filter(
                feature => feature.name === "Additional Benefits",
              )[0].riders;
              console.log(riders, "ridersronak");
              return (
                <div
                  className={`col-xs-6 ${
                    planIndex === 0 && "border_right_dark"
                  }`}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    padding: "0px 10px 0px 5px",
                    color: "rgb(100, 113, 136)",
                  }}
                >
                  {riders && riders.length ? (
                    riders.map(rider => {
                      return (
                        <RiderWrapper
                          show={rider.total_premium}
                          className="rider-wrapper"
                        >
                          <RiderName
                            onClick={() => {
                              setShowTooltipMobile(true);
                              setTooltipContent(rider.description);
                              setTooltipTitle(rider.name);
                            }}
                          >
                            {rider.name} {tooltipImg()}
                          </RiderName>

                          <RiderPremium>
                            <div>???{rider.total_premium}</div>{" "}
                            <div>
                              <Checkbox2
                                showTitle={false}
                                title={rider.name + plan.data.product.id}
                                onChange={e => {
                                  if (e.target.checked) {
                                    dispatch(
                                      insertRider(
                                        plan.data.product.id,
                                        plan.data.sum_insured,
                                        rider,
                                      ),
                                    );
                                  } else {
                                    dispatch(
                                      removeRider(
                                        plan.data.product.id,
                                        plan.data.sum_insured,
                                        rider,
                                      ),
                                    );
                                  }
                                }}
                              />
                            </div>
                          </RiderPremium>
                        </RiderWrapper>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          {/* {[0, 1]?.map((item) => {
            if (!plans[item]) return "";
            else
              return (
                <div
                  className={`col-xs-6 ${item === 0 && "border_right_dark"}`}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    padding: "0px 10px 0px 5px",
                  }}
                >
                  {plans[item]?.features[index]?.riders?.map((innerItem) => (
                    <RiderWrapper
                      show={innerItem.total_premium}
                      className="rider-wrapper"
                    >
                      <RiderName
                        onClick={() => {
                          setShowTooltipMobile(true);
                          setTooltipContent(innerItem.description);
                          setTooltipTitle(innerItem.name);
                        }}
                        style={{ width: windowWidth < 420 ? "40%" : "" }}
                      >
                        {innerItem.name} {tooltipImg()}
                      </RiderName>

                      <RiderPremium>
                      ??? {" "}
                        <div>{innerItem.total_premium} </div>{" "}
                        <div>
                          <Checkbox2
                            showTitle={false}
                            title={innerItem.name + plans[item].data.product.id}
                            onChange={(e) => {
                              if (e.target.checked) {
                                
                                dispatch(
                                  insertRider(
                                    plans[item].data.product.id,
                                    plans[item].data.sum_insured,
                                    innerItem
                                  )
                                );
                              } else {
                                dispatch(
                                  removeRider(
                                    plans[item].data.product.id,
                                    plans[item].data.sum_insured,
                                    innerItem
                                  )
                                );
                              }
                            }}
                          />
                        </div>
                      </RiderPremium>
                    </RiderWrapper>
                  ))}
                </div>
              );
          })} */}
        </div>
      </div>
    </>
  );
};

// tbodyM major content
const TBodyM = ({
  title,
  plans,
  mergedCover,
  index,
  showDiffCbx,
  setHideCells,
  hideCells,
}) => {
  console.log(plans, "plansforcompaare");
  const dispatch = useDispatch();
  const [showTooltipMobile, setShowTooltipMobile] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipTitle, setTooltipTitle] = useState("");
  const [windowHeight, windowWidth] = useWindowSize();
  const [tenureData, setTenureData] = useState([
    plans.map(item => item.data.tenure),
  ]);
  const { quotesForCompare, selectedGroup, productDiscounts } = useSelector(
    state => state.quotePage,
  );
  const { discount, riders } = useSelector(state => state.comparePage);
  const [tenureChangedFor, setTenureChangedFor] = useState(-1);
  const [trigger, setTrigger] = useState(false);
  const { memberGroups } = useSelector(state => state.greetingPage);
  const members = memberGroups[selectedGroup].join(",");
  const { theme } = useSelector(state => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
  useEffect(() => {
    if (tenureChangedFor !== -1 && trigger) {
      dispatch(
        getProductDiscount({
          alias: plans[tenureChangedFor].data.company_alias,
          product_id: plans[tenureChangedFor].data.product.id,
          member: members,
          sum_insured: plans[tenureChangedFor].data.sum_insured,
          group: selectedGroup,
        }),
        clearRiders(
          plans[tenureChangedFor].data.product.id,
          plans[tenureChangedFor].data.sum_insured,
        ),
      );
    }
    setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (productDiscounts.length && tenureChangedFor !== -1) {
      dispatch(
        updatePremiumQuote(
          tenureChangedFor,
          tenureData[tenureChangedFor],
          `${plans[tenureChangedFor].data.product.id}${plans[tenureChangedFor].data.sum_insured}`,
        ),
      );
    }
  }, [productDiscounts]);

  if (title === "Plan Details") {
    return (
      <>
        <TooltipMobileModal
          title={tooltipTitle}
          show={showTooltipMobile}
          content={tooltipContent}
          handleClose={() => {
            setShowTooltipMobile(false);
            setTooltipContent("");
            setTooltipTitle("");
          }}
        />
        <SumAssured
          plans={plans}
          index={index}
          mergedCover={mergedCover}
          showDiffCbx={showDiffCbx}
          hideCells={hideCells}
          setHideCells={setHideCells}
        />

        {/* for tenure functionalityy */}
        <div class="col-xs-12 no-padding padding_vertical_10 border_top_dark">
          <div class="col-xs-12 font-bold bg_row_table_c bg_row_table_c">
            <span
              class="tbody_bg_border_th_bor_bootom"
              onClick={() => {
                setShowTooltipMobile(true);
                setTooltipContent(
                  " Policy term for which you can buy this policy",
                );
                setTooltipTitle("Tenure");
              }}
            >
              Tenure {tooltipImg()}
            </span>
          </div>
          <div class="col-xs-12 padding_inner_row_c_t">
            {[0, 1].map((item, index) =>
              plans[index] ? (
                <div
                  key={uuid()}
                  className={`col-xs-6 ${item === 0 && "border_right_dark"}`}
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <select
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      background: "white",
                      color: "rgb(100, 113, 136)",
                    }}
                    value={
                      discount[
                        `${plans[index].data.product.id}${plans[index].data.sum_insured}`
                      ]?.tenure
                    }
                    onChange={e => {
                      setTenureData(prev => {
                        prev[index] = e.target.value;
                        return prev;
                      });

                      setTenureChangedFor(index);
                      setTrigger(true);
                    }}
                  >
                    <option value="1">1 year</option>
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                  </select>
                </div>
              ) : (
                ""
              ),
            )}
          </div>
        </div>
      </>
    );
  }
  if (title === "Key Benefits") {
    return (
      <>
        {/* key banefits content raea */}
        <TooltipMobileModal
          title={tooltipTitle}
          show={showTooltipMobile}
          content={tooltipContent}
          handleClose={() => {
            setShowTooltipMobile(false);
            setTooltipContent("");
            setTooltipTitle("");
          }}
        />
        <div class="col-xs-12 no-padding padding_vertical_10 border_top_dark">
          <div class="col-xs-12 font-bold bg_row_table_c bg_row_table_c">
            <span
              className="tbody_bg_border_th_bor_bootom"
              onClick={() => {
                setShowTooltipMobile(true);
                setTooltipContent("Benefits which are unique to this policy");
                setTooltipTitle("Unique Features");
              }}
            >
              Unique Features {tooltipImg()}
            </span>
          </div>
          <div class="col-xs-12 padding_inner_row_c_t">
            {[0, 1].map(item => {
              if (!plans[item]) return "";
              else
                return (
                  <div
                    key={uuid()}
                    className={`col-xs-6 ${item === 0 && "border_right_dark"}`}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      whiteSpace: "pre-wrap",
                      padding: "0px 10px",
                      color: "rgb(100, 113, 136)",
                    }}
                  >
                    {plans[item].data.features[1].value}
                  </div>
                );
            })}
          </div>
        </div>
      </>
    );
  }

  if (title === "Additional Benefits") {
    return (
      <AdditionalBenefits
        plans={plans}
        title={title}
        index={index}
        dispatch={dispatch}
        windowWidth={windowWidth}
      />
    );
  }
  if (title === "Permanent Exclusions") {
    return (
      <PermanentExclusion
        plans={plans}
        index={index}
        title={title}
        primaryColor={PrimaryColor}
      />
    );
  } else {
    return (
      <>
        <TooltipMobileModal
          title={tooltipTitle}
          show={showTooltipMobile}
          content={tooltipContent}
          handleClose={() => {
            setShowTooltipMobile(false);
            setTooltipContent("");
            setTooltipTitle("");
          }}
        />
        <Other
          plans={plans}
          index={index}
          showDiffCbx={showDiffCbx}
          hideCells={hideCells}
          setHideCells={setHideCells}
          title={title}
        />
      </>
    );
  }
};

const ExclusionDescModifier = ({ desc, index, PrimaryColor }) => {
  const [showMore, setShowMore] = useState(false);
  const showMoreDesc = desc;
  const showLessDesc = desc.slice(0, 100);
  return (
    <div
      key={uuid()}
      className={`col-xs-6 ${index === 0 && "border_right_dark"}`}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        whiteSpace: "pre-wrap",
        padding: "0px 10px",
        flexDirection: "column",
        color: "rgb(100, 113, 136)",
      }}
    >
      <p>
        <span id={"exclusionValue" + index}>
          {showMore ? showMoreDesc : showLessDesc + "..."}
        </span>

        <span
          style={{ color: PrimaryColor }}
          id={`${"exclusionBtn" + index}`}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "Show More"}
        </span>
      </p>
    </div>
  );
};

const PermanentExclusion = ({
  plans,
  index,
  showDiffCbx = true,
  hideCells,
  setHideCells,
  title,
  PrimaryColor,
}) => {
  const [showTooltipMobile, setShowTooltipMobile] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipTitle, setTooltipTitle] = useState("");
  const [showExclusion, setShowExclusion] = useState(true);

  return (
    <>
      <TooltipMobileModal
        title={tooltipTitle}
        show={showTooltipMobile}
        content={tooltipContent}
        handleClose={() => {
          setShowTooltipMobile(false);
          setTooltipContent("");
          setTooltipTitle("");
        }}
      />
      <div class="col-xs-12 no-padding padding_vertical_10 border_top_dark">
        <div class="col-xs-12 font-bold bg_row_table_c bg_row_table_c">
          <span
            className="tbody_bg_border_th_bor_bootom"
            onClick={() => {
              setShowTooltipMobile(true);
              setTooltipContent(plans[1]?.features[4]?.description);
              setTooltipTitle(title);
            }}
          >
            {title} {tooltipImg()}
          </span>
        </div>
        <div class="col-xs-12 padding_inner_row_c_t font-bold">
          {[0, 1].map(index => {
            if (!plans[index]) return "";
            else {
              {
                /* const showMoreExclusion = (index, id, btnId) => {
                setShowExclusion(!showExclusion);
                let elId = document.getElementById(id);
                let elBtnId = document.getElementById(btnId);
                const exclusion =
                  plans[index]?.features[4]?.fsum_insureds[
                    plans[index]?.data?.sum_insured
                  ]?.features[0]?.feature_value;
                let pollutedExclusionValue = exclusion.slice(0, 100) + "...";
                
                if (showExclusion) {
                  elId.innerHTML = exclusion;
                  elBtnId.innerHTML = "Show Less";
                } else {
                  elBtnId.innerHTML = "Show More";
                  elId.innerHTML = pollutedExclusionValue;
                }
              }; */
              }
              return (
                <ExclusionDescModifier
                  desc={
                    plans[index]?.features[4]?.sum_insureds[
                      plans[index]?.data?.sum_insured
                    ]?.features[0]?.feature_value
                  }
                  index={index}
                  primaryColor={PrimaryColor}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

const Other = ({
  plans,
  index,
  showDiffCbx,
  hideCells,
  setHideCells,
  title,
}) => {
  console.log("Other", plans, index);
  const [showTooltipMobile, setShowTooltipMobile] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipTitle, setTooltipTitle] = useState("");

  return (
    <>
      <TooltipMobileModal
        title={tooltipTitle}
        show={showTooltipMobile}
        content={tooltipContent}
        handleClose={() => {
          setShowTooltipMobile(false);
          setTooltipContent("");
          setTooltipTitle("");
        }}
      />
      {plans?.length > 0 &&
        plans[0]?.features[index]?.sum_insureds[
          plans[0]?.data?.sum_insured
        ]?.features?.map((data, i) => {
          // covered uncovered functionality
          if (
            data?.title !== "Unique Feature" &&
            data?.title !== "Permanent Exclusions" &&
            data?.title !== "Co-Payment" &&
            data?.title !== "Cashless Hospitals" &&
            data?.title !== "Pre Policy Medical Screening" &&
            (!showDiffCbx ||
              (showDiffCbx &&
                plans.length < 3 &&
                !(
                  plans[0]?.features[index]?.sum_insureds[
                    plans[0]?.data?.sum_insured
                  ]?.features[i]?.is_compariable === 1 &&
                  plans[0]?.features[index]?.sum_insureds[
                    plans[0]?.data?.sum_insured
                  ]?.features[i]?.feature_value ===
                    plans[1]?.features[index]?.sum_insureds[
                      plans[1]?.data?.sum_insured
                    ]?.features[i]?.feature_value
                )))
          )
            return (
              <>
                {" "}
                <div class="col-xs-12 no-padding padding_vertical_10 border_top_dark">
                  <div class="col-xs-12 font-bold bg_row_table_c bg_row_table_c">
                    <span
                      className="tbody_bg_border_th_bor_bootom"
                      onClick={() => {
                        setShowTooltipMobile(true);
                        setTooltipContent(data?.description);
                        setTooltipTitle(data?.title);
                      }}
                    >
                      {data?.title} {tooltipImg()}
                    </span>
                  </div>
                  <div class="col-xs-12 padding_inner_row_c_t font-bold">
                    {[0, 1].map(item => {
                      if (!plans[item]) return "";
                      else
                        return (
                          <div
                            key={uuid()}
                            className={`col-xs-6 ${
                              item === 0 && "border_right_dark"
                            }`}
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              whiteSpace: "pre-wrap",
                              padding: "0px 10px",
                              color: "rgb(100, 113, 136) !important",
                            }}
                          >
                            {
                              plans[item]?.features[index]?.sum_insureds[
                                plans[item]?.data?.sum_insured
                              ]?.features[i]?.feature_value
                            }
                          </div>
                        );
                    })}
                  </div>
                </div>
              </>
            );
        })}
    </>
  );
};

export default TBodyM;
