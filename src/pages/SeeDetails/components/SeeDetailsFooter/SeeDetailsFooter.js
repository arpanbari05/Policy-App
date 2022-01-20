import { useState, useEffect } from "react";
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
// import BuyNowModal from "../../../quotePage/components/BuyNowModal/BuyNowModal";
import StyledButton from "../../../../components/StyledButton";
import BuyNowModal from "../../../quotePage/components/BuyNowModal/BuyNowModal";
import { removeQuoteFromCart } from "../../../Cart/cart.slice";
import { object } from "yup/lib/locale";

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
  const dispatch = useDispatch();
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

  console.log(quote, "sadg323126");

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

  let additionalPremium = 0;

  quote.mandatory_riders?.[sumInsuredIndex]?.forEach(element => {
    console.log(additionalPremium, "sadg31");
    additionalPremium += parseInt(element.total_premium);
    console.log(additionalPremium, element.total_premium, "sadg32");
  });
  const { updateProductRedux, product: cartItem } = useCartProduct(
    groupCode,
    product,
  );

  useEffect(() => {
    const newRiders = quote.mandatory_riders?.[sumInsuredIndex]?.filter(
      element => element !== null && element,
    );
    console.log(newRiders, "sagd3223g23g23g23g");

    updateProductRedux({
      ...cartItem,
      page: "seedetails",
      health_riders: [...newRiders],
    });
  }, []);
  const {
    isCartProductLoading,
    totalPremium,
    addProduct,
    product: selectedProduct,
  } = useCartProduct(groupCode, product);

  let riderPremium =
    selectedProduct.health_riders.reduce(
      (acc, obj) => obj?.total_premium !== NaN && acc + obj?.total_premium,
      0,
    ) || 0;

  console.log(selectedProduct, riderPremium, quote, "sadg32521");

  const handleProceed = () => {
    handleProceedClick();
    setShowBuyNow(true);
    dispatch(removeQuoteFromCart(groupCode));
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
          right: 9px;
          cursor: pointer;
          /* top: 35px; */
          font-size: 18px;
          /* background-color: #eff2f5; */
          /* border-radius:50px; */
          padding: 3px 8px;
          @media (max-width: 1250px) {
            right: 5px;
          }
        `}
      >
        <i
          onClick={handleClose}
          style={{ cursor: "pointer" }}
          class="fas fa-times"
        ></i>
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
          <div className="logo_style_common" style={{ marginBottom: "0px" }}>
            <img
              src={logo}
              style={{
                boxShadow: "none",
                width: "100%",
              }}
              alt="plan_details_ic"
            />
          </div>
        </h5>
        <div>
          <p
            className="care_popup_title"
            style={{
              fontSize: "17px",
              margin: "10px",
              width: "100%",
              lineHeight: "20px",
              fontWeight: "900",
            }}
            css={`
              @media (max-width: 1200px) {
                font-size: 15px !important;
              }
              @media (max-width: 1100px) {
                font-size: 13px !important;
              }
            `}
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
          width: 46%;
          height: 75px;
          justify-content: space-around;
          @media (max-width: 1190px) {
            width: 50%;
          }
          @media (max-width: 1050px) {
            width: 60%;
          }
        `}
      >
        <div
          css={`
            display: flex;
            /* flex-direction: column; */
            border-right: 1px solid grey;
            padding: 0 20px;
            @media (max-width: 1485px) {
              font-size: 14px;
            }
            @media (max-width: 1325px) {
              font-size: 12px;
            }
          `}
        >
          <span>Cover: </span>
          <span
            css={`
              font-weight: bold;
              margin-left: 5px;
            `}
          >
            {" "}
            ₹{" "}
            {numberToDigitWord(
              sumInsured?.toString() || sum_insured?.toString(),
              "seeDetails",
            )}
          </span>
        </div>
        <div
          css={`
            display: flex;
            /* flex-direction: column; */
            border-right: 1px solid grey;
            padding: 0 20px;
            padding-left: 10px;
            @media (max-width: 1485px) {
              font-size: 14px;
            }
            @media (max-width: 1325px) {
              font-size: 12px;
            }
          `}
        >
          <span>Premium: </span>
          <span
            css={`
              font-weight: bold;
            `}
          >
            {" "}
            <i className="fa fa-inr"></i> ₹{" "}
            {parseInt(product.total_premium) + riderPremium}/{" "}
            {product.tenure >= 2 ? `${product.tenure} Years` : "Year"}
          </span>
        </div>
        <div
          css={`
            display: flex;
            /* flex-direction: column; */
            @media (max-width: 1485px) {
              font-size: 14px;
            }
            @media (max-width: 1325px) {
              font-size: 12px;
            }
          `}
        >
          <span>Claim settlement ratio:</span>
          <span
            css={`
              font-weight: bold;
              margin-left: 5px;
            `}
          >
            {claim_settlement_ratio}%
          </span>
        </div>
      </div>

      <div
        className="col-md-9 col-lg-4 bg_pink_f_f "
        style={{ borderRadius: "10px", maxWidth: "300px" }}
        css={`
          @media (max-width: 1200px) {
            max-width: 220px !important;
          }
        `}
      >
        <div
          className="row"
          style={{
            margin: "20px auto",
            justifyContent: "space-evenly",
            width: "fit-content",
          }}
        >
          <StyledButton
            styledCss={`font-size: 12px;    font-size: 15px;
    padding: 12px 51px;
    border-radius:6px;
    `}
            onClick={handleProceed}
            noIcon
          >
            Proceed to Buy
          </StyledButton>
        </div>
      </div>

      {showBuyNow && (
        <BuyNowModal
          showBuyNow={showBuyNow}
          setShowBuyNow={setShowBuyNow}
          handleCloseSeeDetail={handleClose}
        />
      )}
    </div>
  );
}

export default SeeDetailsFooter;
