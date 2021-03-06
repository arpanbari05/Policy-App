import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import "styled-components/macro";
import ViewPlanDetailModal from "./ViewPlanDetailModal";
import {
  setPlanDetails,
  setCanSendSummaryPdf,
} from "../ProposalSections.slice";

import "./ProductSummary.scss";
import { useHistory, Link } from "react-router-dom";
import Card from "../../../../components/Card";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { RiArrowRightSLine } from "react-icons/ri";
import { BackgroundBorderTitle } from "../../../ProductDetails/components/ReviewCart";
import {
  useCart,
  useFrontendBoot,
  useMembers,
  useTheme,
  useAdditionalDiscount,
  useRider,
} from "../../../../customHooks";
import {
  amount,
  getDisplayPremium,
  numberToDigitWord,
  premiumWithAddons,
} from "../../../../utils/helper";
import { useGetCartQuery } from "../../../../api/api";
import { images } from "../../../../assets/logos/logo";

const removeTotalPremium = cart => {
  let { ...y } = cart;
  return y;
};

const numToString = value => value.toLocaleString("en-IN");

const ProductSummary = ({ setActive = () => {}, totalPremium = 0 }) => {
  const [, setShow] = useState(false);

  const history = useHistory();

  const { data: cartData } = useGetCartQuery();

  const [collapse, setCollapse] = useState(false);

  let planUnavailableGroups = cartData.data.filter(
    key => key.unavailable_message !== "",
  );

  const { planDetails } = useSelector(state => state.proposalPage);

  const { groups } = useMembers();

  const { getCartEntry, cartEntries } = useCart();

  const tenure = getCartEntry(+groups[0]?.id)?.tenure;

  const revisedNetPremium = totalPremium;

  const allAddons = cartEntries
    ?.map(singleCartEntry => singleCartEntry.addons)
    .flat();

  const dispatch = useDispatch();
  useEffect(() => {
    setShow(planDetails.show);
  }, [planDetails]);

  const { colors } = useTheme();

  const PrimaryColor = colors.primary_color;

  const PrimaryShade = colors.primary_shade;

  const content = (
    <>
      <span
        css={`
          width: 100px;
          height: 100px;
          border-radius: 100%;
          background: ${PrimaryShade};
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
          <i className="fas fa-chevron-right"></i>
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
              padding-bottom: 0px !important;
            `}
          >
            {cartData?.data?.map((item, index) => (
              <CartSummary
                key={index}
                item={item}
                index={index}
                groupCode={item?.group?.id}
              />
            ))}
          </section>
        </div>
      </div>
    </>
  );

  const contentForModal = (
    <>
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
          <i className="fas fa-chevron-right"></i>
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
              padding-bottom: 0px !important;
            `}
          >
            {cartData?.data?.map((item, index) => (
              <CartSummary
                key={index}
                item={item}
                index={index}
                groupCode={item?.group?.id}
              />
            ))}
            {planDetails.isRenewed ? (
              <>
                <div className="row padding_filter_footer_medical">
                  {/* <div className="col-md-12">
                      <p className="font_grey">Total Premium</p>
                    </div> */}
                  {parseInt(planDetails.prevCart.discounted_total_premium) !==
                    0 && parseInt(revisedNetPremium) !== 0 ? (
                    <>
                      <div className="col-md-4">
                        <button
                          type="button"
                          name="Continue"
                          className="next text-left btn"
                          value="Continue"
                        >
                          <span className="color_span_total_revise">
                            Previous Premium
                          </span>
                          <br />
                          <span
                            className="color_span_total_blck_medical text_decoration_line_through addon_plan_d_inter_1_product_pro_f_mediacl_btn revised-premium"
                            css={`
                              @media (max-width: 767px) {
                                font-size: 16px !important;
                                font-weight: bold !important;
                              }
                            `}
                          >
                            ???{" "}
                            {parseInt(
                              planDetails.prevCart.discounted_total_premium,
                            ).toLocaleString("en-IN")}{" "}
                            / year
                          </span>
                        </button>
                      </div>
                      <div className="col-md-4">
                        <button
                          type="button"
                          name="Continue"
                          className="next text-left btn"
                          value="Continue"
                        >
                          <span
                            css={`
                              color: green;
                            `}
                            className="color_span_total_revise revised-premium-title"
                          >
                            Revised Premium
                          </span>
                          <br />
                          <span
                            className="color_span_total_blck_medical"
                            css={`
                              @media (max-width: 767px) {
                                font-size: 16px !important;
                                font-weight: bold !important;
                              }
                            `}
                          >
                            {getDisplayPremium({
                              total_premium: premiumWithAddons(
                                revisedNetPremium,
                                allAddons,
                              ),
                              tenure: tenure,
                            })}
                          </span>
                        </button>
                      </div>
                      <div className="col-md-4" style={{ float: "right" }}>
                        <button
                          css={`
                            background: ${PrimaryColor};
                            color: #fff;
                            width: 91%;
                            padding: 12px;
                            margin-top: 1px;
                            border-radius: 9px;
                            border: none;
                          `}
                          type="button"
                          name="Continue"
                          className=" btn btn_continue_medi_revise_pop next"
                          value="Continue"
                          onClick={() => {
                            setActive(prev => prev + 1);
                            dispatch(
                              setPlanDetails({
                                title: "Your Plan Details",
                                show: false,
                                prevCart: {},
                                isRenewed: false,
                              }),
                            );
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-100 d-flex align-items-center justify-content-center">
                        <div className="col-md-4">
                          <button
                            css={`
                              background: ${PrimaryColor};
                              color: #fff;
                              width: 91%;
                              padding: 12px;
                              margin-top: 1px;
                              border-radius: 9px;
                              border: none;
                              &:hover {
                                background-image: linear-gradient(
                                  rgba(0, 0, 0, 0.2),
                                  rgba(0, 0, 0, 0.2)
                                );
                                color: #fff !important;
                              }
                            `}
                            type="button"
                            name="Continue"
                            className=" btn btn-default"
                            value="Continue"
                            onClick={() => {
                              setActive(prev => prev + 1);
                              dispatch(
                                setPlanDetails({
                                  title: "Your Plan Details",
                                  show: false,
                                  prevCart: {},
                                  isRenewed: false,
                                }),
                              );
                            }}
                          >
                            Close
                          </button>
                        </div>

                        <div className="col-md-4">
                          <Link
                            to={`/quotes/${planUnavailableGroups[0]}${history.location.search}`}
                            css={`
                              background: ${PrimaryColor};
                              color: #fff;
                              width: 91%;
                              padding: 12px;
                              margin-top: 1px;
                              border-radius: 9px;
                              border: none;
                              text-align: center;
                              &:hover {
                                background-image: linear-gradient(
                                  rgba(0, 0, 0, 0.2),
                                  rgba(0, 0, 0, 0.2)
                                );
                                color: #fff !important;
                              }
                            `}
                            type="button"
                            name="Continue"
                            className=" btn btn_continue_medi_revise_pop next"
                            value="Continue"
                          >
                            View Quotes <RiArrowRightSLine size={25} />
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
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
            padding: 7px 20px 7px 20px;
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
            {amount(premiumWithAddons(revisedNetPremium, allAddons))}
          </Price>
        </div>
      </Card>

      <ViewPlanDetailModal
        show={planDetails.show}
        title={planDetails.title}
        showButton={false}
        content={contentForModal}
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
      />
    </>
  );
};

export default ProductSummary;

const Price = styled.span`
  display: block;
  font-size: 21px;
  font-weight: 600;
  color: #0a87ff;
  margin-top: -3px;
`;

function CartSummary({ item, index, groupCode }) {
  const { data: frontendData, journeyType } = useFrontendBoot();

  const dispatch = useDispatch();

  const { colors } = useTheme();

  const { planDetails } = useSelector(state => state.proposalPage);

  const prevCart = Object.values(
    removeTotalPremium(planDetails.prevCart || {}),
  );

  const displayRiders = useRider(item?.group?.id).getSelectedRiders();

  const [showRiders, setShowRiders] = useState(false);

  const [showDiscounts, setShowDiscounts] = useState(false);

  const [showAddOns, setShowAddOns] = useState(false);

  const { getMembersText } = useMembers();

  const { policyTypes } = useSelector(state => state.quotePage);

  const {
    query: { isLoading, isUninitialized },
    getSelectedAdditionalDiscounts,
  } = useAdditionalDiscount(groupCode);

  const alias = item?.product?.company?.alias;

  const selectedAdditionalDiscounts = getSelectedAdditionalDiscounts();

  // checks all cart items renders and can pdf is ready to send
  useEffect(() => {
    if (!isLoading) dispatch(setCanSendSummaryPdf(true));
  }, [isLoading]);

  if (isLoading || isUninitialized) return <p>Loading cart summary...</p>;
  if (!item) return <></>;

  return (
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
            {getMembersText({ id: groupCode })}
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
            <img src={images[alias]} alt="product pic" />{" "}
          </span>

          <span>{item?.product?.name}</span>
        </div>

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
            <p className="p_cover_medical_pop">Plan type: </p>
            <span
              className="p_cover_medical_pop_span addon_plan_d_inter_1_product_pro_f_mediacl"
              css={`
                padding-left: 10px;
              `}
            >
              {policyTypes[item?.group?.id]}
            </span>
          </div>

          {journeyType === "top_up" ? (
            <div
              css={`
                display: flex;
                flex-direction: row;
                align-items: end;
                justify-content: space-between;

                /* border-right: 1px solid #dce2ec; */
              `}
            >
              <p className="p_cover_medical_pop">Deductible: </p>
              <span
                className="p_cover_medical_pop_span addon_plan_d_inter_1_product_pro_f_mediacl"
                css={`
                  padding-left: 10px;
                `}
              >
                {amount(item?.deductible)}
              </span>
            </div>
          ) : null}
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
              {numberToDigitWord(item?.sum_insured)}
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
              ???{" "}
              {planDetails.isRenewed
                ? numToString(prevCart[index].premium)
                : numToString(item.premium)}{" "}
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
              <div className="col-md-12 d-flex justify-content-between">
                <p className="p_cover_medical_pop revised-premium-title">
                  Revised Premium:{" "}
                </p>
                <span className="p_cover_medical_pop_span ">
                  ??? {numToString(item.premium)} /{" "}
                  {item.tenure > 1 ? item.tenure + " years" : "year"}{" "}
                </span>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        {displayRiders.length > 0 && (
          <>
            {" "}
            <hr
              css={`
                border-bottom: #ddd;
              `}
            />
            <div
              css={`
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                top: -5px;
              `}
            >
              <BackgroundBorderTitle title="Riders:" />

              {!showRiders && (
                <AiOutlineDown
                  color="gray"
                  size={"2.5vh"}
                  onClick={setShowRiders.bind(null, true)}
                />
              )}
              {showRiders && (
                <AiOutlineUp
                  color="gray"
                  size={"2.5vh"}
                  onClick={setShowRiders.bind(null, false)}
                />
              )}
            </div>
          </>
        )}
        {displayRiders.length && showRiders ? (
          <div
            className="row bg_medical_box_row"
            css={`
              // padding: 0 10px;
            `}
          >
            {displayRiders.map(riders => (
              <div
                key={riders.total_premium.toString() + riders.name}
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
                  ??? {riders.total_premium}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
        {selectedAdditionalDiscounts && selectedAdditionalDiscounts.length > 0 && (
          <>
            {" "}
            <hr
              css={`
                border-bottom: #ddd;
              `}
            />
            <div
              css={`
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                top: -5px;
              `}
            >
              <BackgroundBorderTitle title="Discounts:" />

              {!showDiscounts && (
                <AiOutlineDown
                  color="gray"
                  size={"2.5vh"}
                  onClick={setShowDiscounts.bind(null, true)}
                />
              )}
              {showDiscounts && (
                <AiOutlineUp
                  color="gray"
                  size={"2.5vh"}
                  onClick={setShowDiscounts.bind(null, false)}
                />
              )}
            </div>
          </>
        )}

        {selectedAdditionalDiscounts &&
        selectedAdditionalDiscounts?.length &&
        showDiscounts ? (
          <div
            className="row bg_medical_box_row"
            css={`
              // padding: 0 10px;
            `}
          >
            {selectedAdditionalDiscounts.map(singleDiscountObj => (
              <DiscountDetail
                key={singleDiscountObj?.nam}
                title={singleDiscountObj?.name}
                groupCode={groupCode}
                additionalDiscount={singleDiscountObj}
              ></DiscountDetail>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>

      {item.addons.length ? (
        <>
          {" "}
          <hr
            css={`
              border-bottom: #ddd;
              position: relative;
              top: -15px;
            `}
          />
          <div
            css={`
              display: flex;
              position: relative;
              top: -17px;
              align-items: center;
              justify-content: center;
            `}
          >
            <BackgroundBorderTitle title="Add-ons Coverages:" />
            {!showAddOns && (
              <AiOutlineDown
                size={"2.5vh"}
                color="grey"
                onClick={setShowAddOns.bind(null, true)}
              />
            )}
            {showAddOns && (
              <AiOutlineUp
                size={"2.5vh"}
                color="grey"
                onClick={setShowAddOns.bind(null, false)}
              />
            )}
          </div>
        </>
      ) : (
        <></>
      )}

      {/* <br /> */}
      {showAddOns &&
        item.addons.map((addOns, addOnIndex) => (
          <div
            className="rider-box_product_pro_medical"
            key={addOns.product.name + addOnIndex.toString()}
          >
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
                      frontendData.companies[addOns.product.company.alias].logo
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
                  ??? {numToString(addOns.sum_insured)}
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
                  ???{" "}
                  {numToString(
                    prevCart[index]
                      ? prevCart[index].addons[addOnIndex].total_premium
                      : addOns.premium,
                  )}{" "}
                  / year
                </span>
              </div>

              {prevCart[index]?.addons[addOnIndex]?.total_premium !==
                addOns.total_premium && planDetails.isRenewed ? (
                <>
                  <div className="col-md-12"></div>
                  <div className="col-md-12">
                    <p className="p_cover_medical_pop revised-premium-title">
                      Revised Premium:{" "}
                    </p>
                    <span className="p_cover_medical_pop_span ">
                      ??? {numToString(addOns.total_premium)} /{" "}
                      {item.tenure > 1 ? item.tenure + " years" : "year"}{" "}
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
                    ??? {numToString(addOns.deductible)}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      <div
        css={`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 12px 0;
          border-top: 1px solid #ddd;
          margin-top: -10px;
        `}
      >
        <p
          css={`
            color: ${colors.primary_color};
            font-weight: bold;
            font-size: 14px;
          `}
          className="p_cover_medical_pop"
        >
          {"GST"}
        </p>
        <span
          className="p_cover_medical_pop_span addon_plan_d_inter_1_product_pro_f_mediacl"
          css={`
            padding-left: 10px;
          `}
        >
          {amount(item?.service_tax)}
        </span>
      </div>
    </>
  );
}

const DiscountDetail = ({
  groupCode,
  title,

  additionalDiscount,
}) => {
  const { getDiscountAmount } = useAdditionalDiscount(groupCode);

  const discountAmount = getDiscountAmount(additionalDiscount);
  return (
    <div
      css={`
        display: flex;
        flex-direction: row;

        justify-content: space-between;
      `}
    >
      <p className="p_cover_medical_pop">{title}</p>
      <span
        className="p_cover_medical_pop_span addon_plan_d_inter_1_product_pro_f_mediacl"
        css={`
          padding-left: 10px;
        `}
      >
        {amount(discountAmount)}
      </span>
    </div>
  );
};
