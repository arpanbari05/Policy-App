import { useState } from "react";
import { numberToDigitWord } from "../../../../utils/helper";
//import BuyNowModal from "./../../../quotesPage/components/BuyNowModal/BuyNowModal";
import SecureLS from "secure-ls";
import { useSelector, useDispatch } from "react-redux";
// import {
//   addSelectedQuote,
//   createCartItem,
//   saveProductDiscountResponse,
//   saveSelectedPlan,
//   updateCartItem,
// } from "./../../../quotesPage/quotePage.slice";
import { useParams } from "react-router";
import { useCartProduct } from "../../../Cart";
import "styled-components/macro";
import BuyNowModal from "../../../quotePage/components/BuyNowModal/BuyNowModal";

function SeeDetailsFooter({
  logo,
  claim_settlement_ratio,
  companyName,
  sumInsured,
  premium,
  productName,
  selectedRiders,
  selectedPlan,
  quote,
  sum_insured,
  handleProceedClick = () => {},
}) {
  const [showBuyNow, setShowBuyNow] = useState(false);
  // const dispatch = useDispatch();
  // const { memberGroups } = useSelector(state => state.greetingPage);
  // const { selectedGroup, cartItems, selectedAddOns } = useSelector(
  //   state => state.quotePage,
  // );
  // const members = memberGroups[selectedGroup];
  // const ls = new SecureLS();
  // const totalAddOnsPremium = selectedAddOns[selectedGroup]
  //   ? selectedAddOns[selectedGroup].reduce(
  //       (sum, addOn) => parseInt(sum + addOn.gross_premium),
  //       0,
  //     )
  //   : 0;

  const { groupCode } = useParams();

  const sumInsuredIndex = quote.sum_insured.indexOf(sum_insured);

  const product = {
    premium: quote.premium[sumInsuredIndex],
    sum_insured: sum_insured,
    tax_amount: quote.tax_amount[sumInsuredIndex],
    tenure: quote.tenure[sumInsuredIndex],
    total_premium: quote.total_premium[sumInsuredIndex],
    product: {
      ...quote.product,
      company: {
        alias: quote.company_alias,
      },
    },
    health_riders: [],
    addons: [],
  };

  const {
    isCartProductLoading,
    totalPremium,
    addProduct,
    product: selectedProduct,
  } = useCartProduct(groupCode, product);

  const handleProceed = () => {
    handleProceedClick();
    setShowBuyNow(true);
    addProduct({
      ...selectedProduct,
      service_tax: selectedProduct.tax_amount,
      group_id: groupCode,
      product_id: selectedProduct.product.id,
      riders: selectedProduct.health_riders,
    });
  };

  console.log(product, "3333");
  return (
    <div
      className="modal-header bg_red showOnDesktop"
      style={{
        zIndex: "9999",
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "5px 10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", width: "25%" }}>
        <h5 className="modal-title">
          <img
            src={logo}
            style={{
              boxShadow: "none",
              width: "100%",
              maxWidth: "120px",
              minWidth: "100px",
            }}
            className="plan_details_ic"
            alt="plan_details_ic"
          />
        </h5>
        <div>
          <p
            className="care_popup_title"
            style={{ fontSize: "21px", margin: "0px", width: "100%" }}
          >
            {productName || quote.product.name}
          </p>
        </div>
      </div>

      <div
        style={{
          border: "1px dashed var(--border-gray)",
          borderRadius: "10px",
          width: "43%",
          padding: "2px 5px",
        }}
      >
        <div
          className="row"
          style={{
            justifyContent: "space-around",
            padding: "5px",
          }}
        >
          <div style={{ width: "30%", borderRight: "1px solid grey" }}>
            <h6
              className="color_white_font border_right_effect font_22"
              style={{ fontWeight: "bold" }}
              css={`
                & span {
                  font-size: 16px !important;
                  line-height: 0;
                }
              `}
            >
              <span className="font_20 color_fixed_title">Cover </span>
              <br />
              <span className="color_white_font font_20">
                <b>
                  {numberToDigitWord(
                    sumInsured?.toString() || sum_insured?.toString(),
                    "seeDetails",
                  )}
                </b>
              </span>
            </h6>
          </div>

          <div
            style={{
              width: "30%",
              borderRight: "1px solid grey",
              marginLeft: "7px",
            }}
          >
            <h6
              className="color_white_font border_right_effect_2 font_22"
              style={{ fontWeight: "bold" }}
              css={`
                & span {
                  font-size: 16px !important;
                  line-height: 0;
                }
              `}
            >
              <span className="font_20 color_fixed_title">Premium</span>
              <br />
              <span className="color_white_font font_20">
                <b>
                  <i className="fa fa-inr"></i>{" "}
                  {parseInt(selectedProduct.total_premium).toLocaleString(
                    "en-IN",
                  )}
                  / year
                </b>
              </span>
            </h6>
          </div>

          <div
            css={`
              display: ${product.product.company.alias === "star" && "none"};
            `}
            style={{ width: "30%", marginLeft: "7px" }}
          >
            <h6
              className="color_white_font  font_22"
              style={{ fontWeight: "bold" }}
              css={`
                & span {
                  font-size: 16px !important;
                  line-height: 0;
                }
              `}
            >
              <span className="font_20 color_fixed_title">
                Claim Settlement Ratio
              </span>
              <br />
              <span className="color_white_font font_20">
                {claim_settlement_ratio}%
              </span>
            </h6>
          </div>
        </div>
      </div>

      <div
        className="col-md-9 col-lg-4 bg_pink_f_f "
        style={{ borderRadius: "10px", maxWidth: "300px" }}
      >
        <div
          className="row"
          style={{
            margin: "20px auto",
            justifyContent: "space-evenly",
            width: "fit-content",
          }}
        >
          <div>
            <p
              className="color_black bg_premium_txt_btn_f_p_d"
              css={`
                font-size: 17px;
                line-height: 1.2;
              `}
            >
              Total Premium
            </p>
            <p
              className="color_red font_22"
              css={`
                font-size: 18px !important;
                line-height: 1.2;
              `}
            >
              {" "}
              <i className="fa fa-inr"></i> {totalPremium}
            </p>
          </div>

          <button
            type="button"
            // className="btn  btn_preoceed_product_fix"
            css={`
              border-radius: 2px;
              padding: 7px 21px;
              text-align: center;
              color: #fff;
              margin-left: 20px;
              text-transform: capitalize;
              box-shadow: 0px 13px 27px 0px rgb(163 48 53 / 25%);
              font-size: 18px;
              background: #c72229;
            `}
            data-dismiss="modal"
            // onClick={() => {
            //   handleProceedClick();
            //   setShowBuyNow(true);
            //   ls.set("cover", selectedPlan?.sum_insured);
            //   const selectePlan = {
            //     company_alias: selectedPlan?.company_alias,
            //     logo: selectedPlan?.logo,
            //     product: selectedPlan?.product,
            //     gross_premium: selectedPlan?.gross_premium,
            //     premium: selectedPlan?.premium,
            //     sum_insured: selectedPlan?.sum_insured,
            //     tax_amount: selectedPlan?.tax_amount,
            //     tenure: selectedPlan?.tenure,
            //   };

            //   if (cartItems.length > 0) {
            //     dispatch(
            //       updateCartItem(
            //         {
            //           ...selectedPlan,
            //           members,
            //           cartId: cartItems[0].id,
            //           riders: selectedRiders,
            //           product_id: selectedPlan.product?.id,
            //           premium: selectedPlan.gross_premium,
            //         },
            //         cartId => {
            //           dispatch(saveSelectedPlan(selectePlan));
            //           dispatch(
            //             addSelectedQuote({ cartId, ...selectedPlan }),
            //           );
            //           dispatch(saveProductDiscountResponse([]));
            //         },
            //       ),
            //     );
            //     return;
            //   }
            //   dispatch(modal-header
            //     createCartItem(
            //       {
            //         ...selectedPlan,
            //         members,
            //         riders: selectedRiders,
            //       },
            //       cartId => {
            //         dispatch(saveSelectedPlan(selectedPlan));
            //         dispatch(
            //           addSelectedQuote({ cartId, ...selectedPlan }),
            //         );
            //         dispatch(saveProductDiscountResponse([]));
            //       },
            //     ),
            //   );
            // }}
            onClick={handleProceed}
          >
            {/* {cartItems?.some(
                    item => item?.product?.id === selectedPlan?.product?.id,
                  )
                    ? "Update Cart"
                    : "Proceed to Buy"}{" "} */}
            {isCartProductLoading ? (
              <i className="fas fa-circle-notch rotate" />
            ) : (
              "Proceed to Buy"
            )}
          </button>
        </div>
      </div>

      {showBuyNow && (
        <BuyNowModal showBuyNow={showBuyNow} setShowBuyNow={setShowBuyNow} />
      )}
    </div>
  );
}

export default SeeDetailsFooter;
