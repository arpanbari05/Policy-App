import React, { useState } from "react";
import styled from "styled-components";
import "styled-components/macro";
import { useCartProduct } from "./../../Cart";

import { useParams } from "react-router";
import BuyNowModal from "../../quotePage/components/BuyNowModal/BuyNowModal";
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
    <div style={{
      width: "100%"
      
    }}>
      <Outer>
        <div >
          <p
           // style={{ marginTop: "10px" }}
            className="color_black bg_premium_txt_btn_f_p_d"
            css={`
          
              font-size: 14px;
    line-height: 1.2;
            `}
          >
            Total Premium
          </p>
          <p
            className="color_red"
            css={`
              font-family: pf_handbook_probold !important;
              font-size: 17px;
    line-height: 1.2;
            `}
          >
            {" "}
            <i className="fa fa-inr"></i> {totalPremium}
          </p>
        </div>
        <div >
          <button
            css={`
              /* margin-top: 20px; */
              line-height: 32px;
              border-radius: 2px;
              padding: 7px 12px;
              text-align: center;
              color: #fff;
              text-transform: capitalize;
              box-shadow: 0px 13px 27px 0px rgb(163 48 53 / 25%);
              font-size: 18px;
              white-space: nowrap;
              background: #c72229;
              
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
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    border:2px dotted #c72229;
    border-radius:10px;
    padding:7px;
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
  @media (max-width:767px){
    height: 45px;
    p{
      font-size: 15px;
    }
    
  }
`;

export default SeedetailFooterMobile;
