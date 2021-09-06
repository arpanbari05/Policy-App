import React from "react";
import styled from "styled-components";

import { useCartProduct } from "./../../Cart";

import { useParams } from "react-router";
import { numberToDigitWord } from "./../../../utils/helper";
function SeeDetailsTop({
  logo,
  companyName,
  sumInsured,
  quote,
  sum_insured,
  claim_settlement_ratio,
}) {
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
  return (
    <Outer>
      <Company>
        <div
          style={{
            height: "100%",
            width: "100%",
            maxHeight: "60px",
            maxWidth: "90px",
          }}
        >
          <img
            src={logo}
            style={{ boxShadow: "none" }}
            className="plan_details_ic"
            alt="plan_details_ic"
          />
        </div>
        <div>
          <p
            className="care_popup_title"
            style={{ fontSize: "18px", marginTop: "0px" }}
          >
            {companyName}
          </p>
        </div>
      </Company>

      <Details>
        <Inner>
          <span>Cover </span>
          <br />
          <span>
            <b>
              <i className="fa fa-inr"></i>{" "}
              {numberToDigitWord(sumInsured?.toString(), "seeDetails")}
            </b>
          </span>
        </Inner>
        <Inner>
          <span>Premium </span>
          <br />
          <span>
            <b>
              <i className="fa fa-inr"></i>{" "}
              {parseInt(selectedProduct.total_premium).toLocaleString("en-IN")}/
              year
            </b>
          </span>
        </Inner>
        <LastInner>
          <span>Claim Settlement Ratio </span>
          <br />
          <span>
            <b>{claim_settlement_ratio} % </b>
          </span>
        </LastInner>
      </Details>
    </Outer>
  );
}
const Outer = styled.div`
margin-top:0px;
box-shadow: 0px 0px 10px #d8d8d8;
height: 100px;
background-color:#fff;
position: sticky;
z-index: 9999;
top:57px;
@media (max-width:1023px){
    top:0px;
}
@media (min-width:767px) and (max-width:1023px){
  box-shadow: none;
}
`
const Company = styled.div`
  display: flex;
  align-items: center;
  height: 50px;


  /* justify-content:space-evenly; */
  /* border-bottom: 0.75px solid lightgray; */
`;
const Details = styled.div`
  display: flex;
  font-size: 12px;
  margin-left: 10px;
`;
const Inner = styled.div`
  margin-left: 10px;
  width: 90px;
  height: 40px;
  border-right: 1px solid lightgray;
`;
const LastInner = styled.div`
  margin-left: 10px;
  width: 140px;
  height: 40px;
`;

export default SeeDetailsTop;
