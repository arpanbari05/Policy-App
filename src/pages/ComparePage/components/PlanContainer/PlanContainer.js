import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components/macro";
import { useCartProduct } from "../../../Cart";
import { CompanyName, PlanName, RemoveCross } from "../../ComparePage.style";
import CompareBtn from "../buttons/CompareBtn";
import "../PlanContainer/PlanContainer";

import { images } from "../../../../assets/logos/logo.js";



const getYearsUsingTenure = tenure => {
  if (tenure == 1) {
    return "year";
  } else if (tenure == 2) {
    return "2 years";
  } else if (tenure == 3) {
    return "3 years";
  }
};
const PlanContainer = ({
  plans,
  removePlan,
  setShow,
  index,
  setShowBuyNowPopup,
}) => {
  const {
    product,
    premium,
    sum_insured,
    logo: IcLogo,
    total_premium,
    mandatory_riders,
    tax_amount,
    company_alias,
    tenure,
  } = plans || {};

  console.log(plans, "121");
  const { discount, ridersPremium, riders } = useSelector(
    state => state.comparePage,
  );
  let additionalPremium = 0;

  mandatory_riders?.forEach(element => {
    additionalPremium += element.total_premium;
  });

  const { groupCode: selectedGroup } = useParams();
  const { addProduct, isCartProductLoading } = useCartProduct(selectedGroup);
  return (
    <>
      {product?.name ? (
        <Row className="price_IC_box text-center ">
          <RemoveCross
            onClick={() => removePlan(`${product.id}${sum_insured}`)}
          >
            <span>
              <i class="fa fa-close"></i>
            </span>
          </RemoveCross>
          <Col
            md={12}
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <span
              css={`
                width: 72px;
              `}
            >
              <ImageLogo src={images[company_alias]} alt="" />
              
            </span>
            {/* Dynamic ic name */}
            <WrapperCompanyDetails>
              <CompanyName>{product.company.name}</CompanyName>
              <PlanName className="hideTBody">{product.name}</PlanName>
            </WrapperCompanyDetails>
          </Col>
          <Col md={12}>
            <CompareBtn
              onClick={() => {
                const selectedPlan = {
                  // company_alias: mergedQuotes[0]?.company_alias,
                  // logo: mergedQuotes[0]?.logo,
                  product: product,
                  total_premium:
                    discount[`${product.id}${sum_insured}`]?.total_premium +
                      additionalPremium || total_premium + additionalPremium,
                  // premium: mergedQuotes[0]?.premium[activeCover],
                  sum_insured:
                    discount[`${product.id}${sum_insured}`]?.sum_insured ||
                    sum_insured,
                  tax_amount:
                    discount[`${product.id}${sum_insured}`]?.tax_amount ||
                    tax_amount,
                  tenure:
                    discount[`${product.id}${sum_insured}`]?.tenure || tenure,
                };
                addProduct({
                  ...selectedPlan,
                  product_id: selectedPlan.product?.id,
                  premium: selectedPlan.total_premium + additionalPremium,
                  group_id: parseInt(selectedGroup),
                  service_tax: selectedPlan.tax_amount,
                  riders: riders[`${product.id}${sum_insured}`],
                }).then(() => setShowBuyNowPopup(true));
              }}
              value={`${
                total_premium +
                additionalPremium +
                (ridersPremium[`${product.id}${sum_insured}`] || 0)
              } /${getYearsUsingTenure(tenure)}`}
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={12}>
            <button onClick={() => setShow(true)}>
              <div
                className="IC_product_compare_card blank"
                // modal on Click
              >
                <div className="cross">
                  <i className="fa fa-plus"></i>
                </div>
                <div
                  style={{ fontWeight: "900" }}
                  className="add-compare text-center"
                >
                  Add plans
                </div>
                {/* 
							<selectx
							className="form-control_compare"
								style={{
									background: `url(${downarrow}) no-repeat 94% 53%`,
								}}
							>
							<option>Select Insurer</option>
								<option>Self</option>
								<option>Son</option>
							</select> */}
              </div>
            </button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PlanContainer;

const ImageLogo = styled.img`
  position: unset !important;
  object-fit: contain;
  height: 45px !important;
  width: 90px !important;
  border-radius: unset !important;
  margin-top: unset !important;
  padding: 2px 0px !important;
`;
const WrapperCompanyDetails = styled.div`
  color: #111;
  text-align: left;
  padding-top: 8px;
  margin-left: 10px;
`;
