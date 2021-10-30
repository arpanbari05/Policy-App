import React, { useState } from "react";
import styled from "styled-components";
import "styled-components/macro";
import { useCartProduct } from "./../../Cart";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import BuyNowModal from "../../quotePage/components/BuyNowModal";
// import BuyNowModal from "../../quotePage/components/BuyNowModal/BuyNowModal";
//import BuyNowModal from "../../QuotesPage/components/BuyNowModal/BuyNowModal";

function SeedetailFooterMobile({
  logo,
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
  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
  const [showBuyNow, setShowBuyNow] = useState(false);
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
  console.log(totalPremium, "asdg3");
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
      style={{
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <Outer>
        <div>
          <p
            // style={{ marginTop: "10px" }}
            className="color_black bg_premium_txt_btn_f_p_d"
            css={`
              font-size: 14px;
              line-height: 1.2;
              margin-bottom: 5px;
              font-weight: bold;
            `}
          >
            Total Premium
          </p>
          <p
            css={`
              font-size: 17px;
              line-height: 1.2;
              color: ${PrimaryColor};
              font-weight: bold;
            `}
          >
            {" "}
            ₹ {totalPremium}
          </p>
        </div>
        <div>
          <button
            css={`
              /* margin-top: 20px; */
              line-height: 32px;
              border-radius: 2px;
              padding: 7px 12px;
              text-align: center;
              color: #fff;
              text-transform: capitalize;
              box-shadow: 0px 13px 27px 0px rgb(48 67 163 / 25%);
              font-size: 18px;
              white-space: nowrap;
              background: ${PrimaryColor};
              border-radius: 4px;
              border: none;
            `}
            onClick={handleProceed}
          >
            {" "}
            Proceed to Buy
            {/* {isCartProductLoading ? (
              <i className="fas fa-circle-notch rotate" />
            ) : (
              "Proceed to Buy"
            )} */}
          </button>
        </div>
      </Outer>

      {showBuyNow && (
        <BuyNowModal showBuyNow={showBuyNow} setShowBuyNow={setShowBuyNow} />
      )}
    </div>
  );
}

const TotalPremium = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 2px dotted #c72229;
  border-radius: 10px;
  padding: 7px;
`;

const Outer = styled.div`
  background-color: #fff;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 119999;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 767px) {
    height: 45px;
    p {
      font-size: 15px;
    }
  }
`;

export default SeedetailFooterMobile;
