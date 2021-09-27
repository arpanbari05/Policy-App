import { useState } from "react";
import { numberToDigitWord } from "../../../../utils/helper";
//import BuyNowModal from "./../../../quotesPage/components/BuyNowModal/BuyNowModal";
import SecureLS from "secure-ls";
import { AiOutlineClose } from "react-icons/ai";
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
import StyledButton from "../../../../components/StyledButton";

function SeeDetailsFooter({
  logo,
  claim_settlement_ratio,
  handleClose,
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

  return (
    <div
      className="modal-header bg_red showOnDesktop"
      css={`
        position: fixed;
        top: 0;
        height: 115px;
        left: 0;
        background: white;
      `}
      style={{
        zIndex: "9999",
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "5px 4%",
        boxShadow: "0 3px 16px 0 rgba(0, 0, 0, 0.16)",
      }}
    >
      <div
        css={`
          position: absolute;
          right: 26px;
          top: 25px;
          font-size: 34px;
        `}
        onClick={handleClose}
      >
        <AiOutlineClose />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "25%",
          position: "relative",
        }}
      >
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
            style={{
              fontSize: "15px",
              margin: "10px",
              width: "100%",
              lineHeight: "20px",
              fontWeight: "900",
            }}
          >
            {productName || quote.product.name}
          </p>
        </div>
      </div>
      <div
        css={`
          border: solid 1px #bac3cf;
          padding: 0 5px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          width: 45%;
          height: 75px;
          justify-content: space-around;
        `}
      >
        <div
          css={`
            display: flex;
            flex-direction: column;
            border-right: 1px solid grey;
            padding: 0 20px;
            @media (max-width: 1320px) {
              flex-direction: column;
            }
          `}
        >
          <span>Cover: </span>
          <span
            css={`
              font-weight: bold;
            `}
          >
            {" "}
            {numberToDigitWord(
              sumInsured?.toString() || sum_insured?.toString(),
              "seeDetails"
            )}
          </span>
        </div>
        <div
          css={`
            display: flex;
            flex-direction: column;
            border-right: 1px solid grey;
            padding: 0 20px;
            padding-left: 10px;
            @media (max-width: 1320px) {
              flex-direction: column;
            }
          `}
        >
          <span>Premium:</span>
          <span
            css={`
              font-weight: bold;
            `}
          >
            {" "}
            <i className="fa fa-inr"></i> ₹{" "}
            {parseInt(totalPremium).toLocaleString("en-IN")}
          </span>
        </div>
        <div
          css={`
            display: flex;
            flex-direction: column;
            @media (max-width: 1320px) {
              flex-direction: column;
            }
          `}
        >
          <span>Claim settlement ratio: </span>
          <span
            css={`
              font-weight: bold;
            `}
          >
            {" "}
            {claim_settlement_ratio}%
          </span>
        </div>
      </div>
      {/* <div
        css={`
          border: solid 1px #bac3cf;
        `}
        style={{
          borderRadius: "10px",
          width: "43%",
          padding: "14px 5px",
        }}
      >
        <div
          className="row"
          style={{
            justifyContent: "space-around",
            padding: "5px",
          }}
          css={`
            display: flex;
            align-items: center;
          `}
        >
          <div style={{ width: "30%", borderRight: "1px solid grey" }}>
            <h6
              className="color_white_font border_right_effect font_22"
              css={`
                & span {
                  font-size: 16px !important;
                  line-height: 0;
                }
                margin-bottom: 0;
              `}
            >
              <span>Cover: </span>
              <br />
              <span className="color_white_font font_20">
                <b>
                  {numberToDigitWord(
                    sumInsured?.toString() || sum_insured?.toString(),
                    "seeDetails"
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
            css={`
              display: flex;
              align-items: center;
            `}
          >
            <h6
              className="color_white_font border_right_effect_2 font_22"
              css={`
                & span {
                  font-size: 16px !important;
                  line-height: 0;
                }
                margin-bottom: 0;
              `}
            >
              <span>Premium:</span>
              <br />
              <span className="color_white_font font_20">
                <b>
                  <i className="fa fa-inr"></i> ₹{" "}
                  {parseInt(selectedProduct.total_premium).toLocaleString(
                    "en-IN"
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
            css={`
              display: flex;
              align-items: center;
            `}
          >
            <h6
              className="color_white_font  font_22"
              css={`
                & span {
                  font-size: 16px !important;
                  line-height: 0;
                }
                margin-bottom: 0;
              `}
            >
              <span>Claim Settlement Ratio:</span>
              <br />
              <span className="color_white_font font_20">
                <b>{claim_settlement_ratio}%</b>
              </span>
            </h6>
          </div>
        </div>
      </div> */}

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
          {/* <div>
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
          </div> */}

          <StyledButton
            styledCss={`font-size: 12px;    font-size: 15px;
    padding: 12px 51px;`}
            onClick={handleProceed}
            noIcon
          >
            Proceed to Buy
          </StyledButton>
        </div>
      </div>

      {showBuyNow && (
        <BuyNowModal showBuyNow={showBuyNow} setShowBuyNow={setShowBuyNow} />
      )}
    </div>
  );
}

export default SeeDetailsFooter;
