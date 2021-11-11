import React, { useEffect, useState } from "react";
import useWindowSize from "../../../../customHooks/useWindowSize";
import wrong from "../../../../assets/images/wrong2.png";
import { useDispatch, useSelector } from "react-redux";
import "styled-components/macro";
import { numToLakh } from "../../useComparePage";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useCartProduct } from "./../../../Cart/index";
import {
  addPremium,
  clearRiders,
  insertRider,
  removeRider,
  subtractPremium,
  updatePremiumQuote,
} from "../../compare.slice";
import { RiderName, RiderPremium, RiderWrapper } from "../../ComparePage.style";

import "./TBody.css";
import Checkbox from "../../../../components/Checkbox";
import {
  getProductDiscount,
  removeQuotesForCompare,
  setQuotesForCompare,
} from "../../../quotePage/quote.slice";
import Checkbox2 from "../Checkbox/checkBoxRider";

const renderTooltipDesc = ({ props, desc }) => (
  <Tooltip {...props}>{desc}</Tooltip>
);

const keyBenefits = (plans, title, windowWidth, PrimaryShade) => {
  return (
    <>
      {" "}
      <tr
        css={`
          border-bottom: 1px solid ${PrimaryShade} !important;
          &:hover {
            box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.16) !important;
          }
        `}
      >
        <th scope="row">
          <OverlayTrigger
            placement={"right"}
            overlay={renderTooltipDesc({
              desc: "Your health cover will have the above unqiue selling propositions",
            })}
          >
            <span className="tbody_bg_border_th">Unique Features</span>
          </OverlayTrigger>
        </th>

        {[0, 1, 2].map((item) => {
          if (!plans[item] && item === 1) return <td></td>;
          else if (!plans[item]) return windowWidth > 1023 ? <td></td> : "";
          else
            return (
              <td
                style={{ whiteSpace: "break-spaces" }}
                className={`${item === 2 && "showOnDesktopF"}`}
                css={`
                  border-bottom: 1px solid ${PrimaryShade} !important;
                  color: #647188;
                `}
              >
                {plans[item]?.data?.features[1]?.value}
              </td>
            );
        })}
      </tr>
    </>
  );
};
const dataset = (
  plans,
  index,
  showDiffCbx,
  hideCells,
  setHideCells,
  title,
  windowWidth,
  PrimaryShade,
  PrimaryColor
) => {
  // console.log("21", plans);
  const dataArray = [];

  let count = -1;

  for (var i = 0; i < 1; i++) {
    dataArray.push(
      plans?.length > 0 &&
        plans[i]?.features[index]?.sum_insureds[
          plans[i]?.data?.sum_insured
        ]?.features?.map((data, i) => {
          if (
            data?.title === "Permanent Exclusions" &&
            (!showDiffCbx ||
              (showDiffCbx &&
                plans.length < 3 &&
                plans[0]?.features[index]?.sum_insureds[
                  plans[0]?.data?.sum_insured
                ]?.features[i]?.is_compariable === 1 &&
                !(
                  plans[0]?.features[index]?.sum_insureds[
                    plans[0]?.data?.sum_insured
                  ]?.features[i]?.feature_value ===
                  plans[1]?.features[index]?.sum_insureds[
                    plans[1]?.data?.sum_insured
                  ]?.features[i]?.feature_value
                )) ||
              (showDiffCbx &&
                plans.length === 3 &&
                !(
                  plans[0]?.features[index]?.sum_insureds[
                    plans[0]?.data?.sum_insured
                  ]?.features[i]?.is_compariable === 1 &&
                  plans[0]?.features[index]?.sum_insureds[
                    plans[0]?.data?.sum_insured
                  ]?.features[i]?.feature_value ===
                    plans[1]?.features[index]?.sum_insureds[
                      plans[1]?.data?.sum_insured
                    ]?.features[i]?.feature_value &&
                  plans[1]?.features[index]?.sum_insureds[
                    plans[1]?.data?.sum_insured
                  ]?.features[i]?.feature_value ===
                    plans[2]?.features[index]?.sum_insureds[
                      plans[2]?.data?.sum_insured
                    ]?.features[i]?.feature_value &&
                  plans[0]?.features[index]?.sum_insureds[
                    plans[0]?.data?.sum_insured
                  ]?.features[i]?.feature_value ===
                    plans[2]?.features[index]?.sum_insureds[
                      plans[2]?.data?.sum_insured
                    ]?.features[i]?.feature_value
                )))
          ) {
            count++;
            return (
              <tr
                style={{ display: data?.is_compariable !== 1 && "none" }}
                css={`
                  border-bottom: 1px solid ${PrimaryShade} !important;
                  &:hover {
                    box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.16) !important;
                  }
                `}
              >
                <th scope="row">
                  <OverlayTrigger
                    placement={"right"}
                    overlay={renderTooltipDesc({ desc: data?.description })}
                  >
                    <span className="tbody_bg_border_th">{data?.title}</span>
                  </OverlayTrigger>
                </th>

                <>
                  {[0, 1, 2].map((item) => {
                    if (!plans[item] && item === 1) return <td></td>;
                    else if (!plans[item])
                      return windowWidth > 1023 ? <td></td> : "";
                    if (plans[item])
                      return (
                        <td
                          style={{ whiteSpace: "break-spaces" }}
                          className={`${item === 2 && "showOnDesktopF"}`}
                          css={`
                            border-bottom: 1px solid ${PrimaryShade} !important;
                            color: #647188;
                          `}
                        >
                          <>
                            <input
                              id={"exclusions" + item}
                              name={"exclusions" + item}
                              type="checkbox"
                              style={{ display: "none" }}
                            ></input>
                            <div
                              className="exclusions__showmore"
                              css={`
                                white-space: initial;
                              `}
                            >
                              {(
                                <>
                                  {
                                    plans[item]?.features[index]?.sum_insureds[
                                      plans[item]?.data?.sum_insured
                                    ]?.features[i]?.feature_value
                                  }
                                </>
                              ) || (
                                <img
                                  src={wrong}
                                  style={{ margin: "auto", display: "none" }}
                                />
                              )}
                            </div>
                            <label
                              htmlFor={"exclusions" + item}
                              className="showmore__button"
                              css={`color:${PrimaryColor} !important;`}
                            >
                              Show More
                            </label>
                            <div
                              className="exclusions__showless"
                              css={`
                                white-space: initial;
                              `}
                            >
                              {(
                                <>
                                  {
                                    plans[item]?.features[index]?.sum_insureds[
                                      plans[item]?.data?.sum_insured
                                    ]?.features[i]?.feature_value
                                  }
                                </>
                              ) || (
                                <img
                                  src={wrong}
                                  style={{ margin: "auto", display: "none" }}
                                />
                              )}
                            </div>
                            <label
                              htmlFor={"exclusions" + item}
                              className="showless__button"
                            >
                              Show less
                            </label>
                          </>
                        </td>
                      );
                    else return <></>;
                  })}
                </>
              </tr>
            );
          }
          if (
            !showDiffCbx ||
            (showDiffCbx &&
              plans.length < 3 &&
              plans[0]?.features[index]?.sum_insureds[
                plans[0]?.data?.sum_insured
              ]?.features[i]?.is_compariable === 1 &&
              !(
                plans[0]?.features[index]?.sum_insureds[
                  plans[0]?.data?.sum_insured
                ]?.features[i]?.feature_value ===
                plans[1]?.features[index]?.sum_insureds[
                  plans[1]?.data?.sum_insured
                ]?.features[i]?.feature_value
              )) ||
            (showDiffCbx &&
              plans.length === 3 &&
              !(
                plans[0]?.features[index]?.sum_insureds[
                  plans[0]?.data?.sum_insured
                ]?.features[i]?.is_compariable === 1 &&
                plans[0]?.features[index]?.sum_insureds[
                  plans[0]?.data?.sum_insured
                ]?.features[i]?.feature_value ===
                  plans[1]?.features[index]?.sum_insureds[
                    plans[1]?.data?.sum_insured
                  ]?.features[i]?.feature_value &&
                plans[1]?.features[index]?.sum_insureds[
                  plans[1]?.data?.sum_insured
                ]?.features[i]?.feature_value ===
                  plans[2]?.features[index]?.sum_insureds[
                    plans[2]?.data?.sum_insured
                  ]?.features[i]?.feature_value &&
                plans[0]?.features[index]?.sum_insureds[
                  plans[0]?.data?.sum_insured
                ]?.features[i]?.feature_value ===
                  plans[2]?.features[index]?.sum_insureds[
                    plans[2]?.data?.sum_insured
                  ]?.features[i]?.feature_value
              ))
          ) {
            count++;
            // console.log(data?.is_compariable !== 1);
            return (
              <tr
                style={{ display: data?.is_compariable !== 1 && "none" }}
                css={`
                  border-bottom: 1px solid ${PrimaryShade} !important;
                  &:hover {
                    box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.16) !important;
                  }
                `}
              >
                <OverlayTrigger
                  placement={"right"}
                  overlay={renderTooltipDesc({ desc: data?.description })}
                >
                  <th scope="row">
                    <span className="tbody_bg_border_th">{data?.title}</span>
                  </th>
                </OverlayTrigger>

                <td
                  style={{ whiteSpace: "break-spaces" }}
                  css={`
                    border-bottom: 1px solid ${PrimaryShade} !important;
                    color: #647188;
                  `}
                >
                  <OverlayTrigger
                    placement={"right"}
                    overlay={renderTooltipDesc({
                      desc: plans[0]?.features[index]?.sum_insureds[
                        plans[0]?.data?.sum_insured
                      ]?.features[i]?.short_description,
                    })}
                  >
                    <div style={{ display: "inline-block" }}>
                      {plans[0]?.features[index]?.sum_insureds[
                        plans[0]?.data?.sum_insured
                      ]?.features[i]?.feature_value || (
                        <img
                          src={wrong}
                          style={{ margin: "auto", display: "none" }}
                        />
                      )}
                    </div>
                  </OverlayTrigger>
                </td>

                <td
                  style={{ whiteSpace: "break-spaces" }}
                  css={`
                    border-bottom: 1px solid ${PrimaryShade} !important;
                    color: #647188;
                  `}
                >
                  <OverlayTrigger
                    placement={"right"}
                    overlay={renderTooltipDesc({
                      desc: plans[1]?.features[index]?.sum_insureds[
                        plans[1]?.data?.sum_insured
                      ]?.features[i]?.short_description,
                    })}
                  >
                    <div style={{ display: "inline-block" }}>
                      {plans[1]?.features[index]?.sum_insureds[
                        plans[1]?.data?.sum_insured
                      ]?.features[i]?.feature_value || (
                        <img
                          src={wrong}
                          style={{ margin: "auto", display: "none" }}
                        />
                      )}
                    </div>
                  </OverlayTrigger>
                </td>

                <td
                  className="showOnDesktopF"
                  style={{ whiteSpace: "break-spaces" }}
                  css={`
                    border-bottom: 1px solid ${PrimaryShade} !important;
                    color: #647188;
                  `}
                >
                  <OverlayTrigger
                    placement={"left"}
                    overlay={renderTooltipDesc({
                      desc: plans[2]?.features[index]?.sum_insureds[
                        plans[2]?.data?.sum_insured
                      ]?.features[i]?.short_description,
                    })}
                  >
                    <div style={{ display: "inline-block" }}>
                      {plans[2]?.features[index]?.sum_insureds[
                        plans[2]?.data?.sum_insured
                      ]?.features[i]?.feature_value || (
                        <img
                          src={wrong}
                          style={{ margin: "auto", display: "none" }}
                        />
                      )}
                    </div>
                  </OverlayTrigger>
                </td>
              </tr>
            );
          }
        })
    );
  }
  if (count < 0) {
    setHideCells([...hideCells, title]);
  }
  return dataArray;
};
const AdditionalBenefits = ({ plans, title, index, windowWidth,PrimaryShade }) => {
  const dispatch = useDispatch();
  const riders = useSelector(({ comparePage }) => comparePage.riders);

  return (
    <>
      {" "}
      <tr
        className="nohover"
        css={`
          border-bottom: 1px solid ${PrimaryShade} !important;
        `}
        css={`
          border-bottom: 1px solid ${PrimaryShade} !important;
        `}
      >
        <th scope="row">
          <OverlayTrigger
            placement={"right"}
            overlay={renderTooltipDesc({
              desc: "Your health cover will have the above unqiue selling propositions",
            })}
          >
            <span className="tbody_bg_border_th">Optional Covers</span>
          </OverlayTrigger>
        </th>

        {[0, 1, 2]?.map((item) => {
          if (!plans[item] && item === 1) return <td></td>;
          else if (!plans[item]) return windowWidth > 1023 ? <td></td> : "";
          else
            return (
              <td
                style={{ whiteSpace: "break-spaces", color: "#647188" }}
                className={`${item === 2 ? "showOnDesktopF" : ""}`}
              >
                {plans[item]?.features[index]?.riders?.map((innerItem) => {
                  return innerItem.total_premium ? (
                    <RiderWrapper show={innerItem.total_premium}>
                      <OverlayTrigger
                        placement={"right"}
                        overlay={renderTooltipDesc({
                          desc: innerItem.description,
                        })}
                      >
                        <RiderName>{innerItem.name}</RiderName>
                      </OverlayTrigger>
                      <RiderPremium>
                        <i className="fa fa-inr"></i>{" "}
                        <div style={{ fontWeight: "900", fontSize: "14px" }}>
                          ₹ {innerItem.total_premium}{" "}
                        </div>{" "}
                        <div>
                     
                          <Checkbox2
                            showTitle={false}
                            title={innerItem.name + plans[item].data.product.id}
                            checked={riders[
                              `${plans[item].data.product.id}${plans[item].data.sum_insured}`
                            ]?.some((item) => item.name === innerItem.name)}
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
                  ) : (
                    ""
                  );
                })}
              </td>
            );
        })}
      </tr>
    </>
  );
};
const TBody = ({
  title,
  plans,
  mergedCover,
  index,
  showDiffCbx,
  setHideCells,
  hideCells,
}) => {
  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
  const dispatch = useDispatch();
  const { discount, riders } = useSelector((state) => state.comparePage);
  const { quotesForCompare, selectedGroup, productDiscounts } = useSelector(
    (state) => state.quotePage
  );
  const [windowHeight, windowWidth] = useWindowSize();
  const [tenureData, setTenureData] = useState([
    plans.map((item) => item.data.tenure),
  ]);
  const { memberGroups } = useSelector((state) => state.greetingPage);
  const [trigger, setTrigger] = useState(false);
  const members = memberGroups[selectedGroup].join(",");

  const [tenureChangedFor, setTenureChangedFor] = useState(-1);
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
          plans[tenureChangedFor].data.sum_insured
        )
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
          `${plans[tenureChangedFor].data.product.id}${plans[tenureChangedFor].data.sum_insured}`
        )
      );
    }
  }, [productDiscounts]);

  return (
    <>
      <tbody
        className={`tbody_bg ${title === "Additional Benefits" && "hideTBody"}`}
        css={`
        tr{
          :hover{
            background: white !important;
          }
        }
        `}
      >
        <tr
          className="table__title-compare"
          css={`
            border-bottom: 1px solid ${PrimaryShade} !important;
          `}
        >
          <th
            colSpan={windowWidth > 1023 ? "4" : "3"}
            className="title_compare_t"
            css={`
              background-color: ${PrimaryShade} !important;
              font-size: 20px;
              padding: 12px 16px !important;
              position: relative;
              color: #505f79;
              z-index: -1;
            `}
          >
            <div
              css={`
                &:after {
                  content: "";
                  height: 54px;
                  width: 5px;
                  position: absolute;
                  left: 1px;
                  top: 0px;
                  background-color: ${SecondaryColor};
                }
              `}
            >
              <span>{title}</span>
            </div>
          </th>
        </tr>
        {title === "Plan Details" ? (
          <>
            <tr
              css={`
                border-bottom: 1px solid ${PrimaryShade} !important;
                &:hover {
                  box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.16) !important;
                }
              `}
            >
              <OverlayTrigger
                placement={"right"}
                overlay={renderTooltipDesc({
                  desc: " Cover Amount of the selected plan is the maximum pay out the Insurance company will offer",
                })}
              >
                <th scope="row ">
                  <span className="tbody_bg_border_th">Sum Insured</span>
                </th>
              </OverlayTrigger>
              
              
              {
                [0,1,2].map((i) => {
                  return(
                    <td>
                {" "}
                {plans[i]?.data?.sum_insured ? (
                  <select
                    style={{ color: "#647188", background: "white" }}
                    onChange={(e) => {
                      dispatch(
                        removeQuotesForCompare(
                          `${plans[i]?.data?.product.id}${plans[i]?.data?.sum_insured}`
                        )
                      );
                      dispatch(
                        setQuotesForCompare([
                          `${plans[i]?.data?.product.id}${e.target.selectedOptions[0].id}`,
                          3,
                        ])
                      );
                    }}
                  >
                    <option id={plans[i]?.data?.sum_insured}>
                      {" "}
                      ₹ {numToLakh(plans[i]?.data?.sum_insured)}
                    </option>
                    {
                      mergedCover[`${plans[i]?.data?.product.id}${plans[i]?.data.sum_insured}`]?.map((data) => {
                        if (
                          plans[i]?.data.sum_insured !== data 
                        ) {
                          return (
                            <option id={data}> ₹ {numToLakh(data)}</option>
                          );
                        }
                      })}
                  </select>
                ) : (
                  <img
                    src={wrong}
                    style={{ margin: "auto", display: "none" }}
                  />
                )}
              </td>)
                })
              }
              
              
            </tr>

            <tr
              css={`
                border-bottom: 1px solid ${PrimaryShade} !important;
                &:hover {
                  box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.16) !important;
                }
              `}
            >
              <OverlayTrigger
                placement={"right"}
                overlay={renderTooltipDesc({
                  desc: " Policy term for which you can buy this policy",
                })}
              >
                <th scope="row">
                  <span className="tbody_bg_border_th">Tenure</span>
                </th>
              </OverlayTrigger>
              {[0, 1, 2].map((item, index) =>
                plans[index] ? (
                  <td
                    key={index}
                    className={`${item === 2 && "showOnDesktopF"}`}
                  >
                    <select
                      style={{ color: "#647188", background: "white" }}
                      value={
                        discount[
                          `${plans[index].data.product.id}${plans[index].data.sum_insured}`
                        ]?.tenure
                      }
                      onChange={(e) => {
                        setTenureData((prev) => {
                          prev[index] = e.target.value;

                          return prev;
                        });
                        setTenureChangedFor(index);
                        setTrigger(true);
                      }}
                    >
                      {plans[index].data.product.name ===
                        "Health Companion Variant 1 (Individual)" ||
                      plans[index].data.product.name ===
                        "Health Companion Family First (Family)" ? (
                        <>
                          <option value="1">1 year</option>
                          <option value="2">2 years</option>
                        </>
                      ) : (
                        <>
                          <option value="1">1 year</option>
                          <option value="2">2 years</option>
                          <option value="3">3 years</option>
                        </>
                      )}
                    </select>
                  </td>
                ) : !plans[item] && item === 1 ? (
                  <td></td>
                ) : windowWidth > 1023 ? (
                  <td></td>
                ) : (
                  ""
                )
              )}
            </tr>
          </>
        ) : title === "Key Benefits" ? (
          keyBenefits(plans, title, windowWidth, PrimaryShade)
        ) : title === "Additional Benefits" ? (
          <AdditionalBenefits
            plans={plans}
            title={title}
            index={index}
            windowWidth={windowWidth}
            PrimaryShade={PrimaryShade}
          />
        ) : (
          dataset(
            plans,
            index,
            showDiffCbx,
            hideCells,
            setHideCells,
            title,
            windowWidth,
            PrimaryShade,
            PrimaryColor
          )
        )}
        <tr>
          <td colSpan={windowWidth > 1023 ? "4" : "3"}></td>
        </tr>
      </tbody>
    </>
  );
};

export default TBody;
