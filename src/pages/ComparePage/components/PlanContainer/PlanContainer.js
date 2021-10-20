import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components/macro";
import { useCartProduct } from "../../../Cart";
import { CompanyName, PlanName, RemoveCross } from "../../ComparePage.style";
import CompareBtn from "../buttons/CompareBtn";
import "../PlanContainer/PlanContainer";
import { AiOutlinePlus } from "react-icons/ai";
import { images } from "../../../../assets/logos/logo.js";

const getYearsUsingTenure = (tenure) => {
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

  const { discount, ridersPremium, riders } = useSelector(
    (state) => state.comparePage
  );
  let additionalPremium = 0;

  mandatory_riders?.forEach((element) => {
    additionalPremium += element.total_premium;
  });

  const { groupCode: selectedGroup } = useParams();
  const { addProduct, isCartProductLoading } = useCartProduct(selectedGroup);
  
  return (
    <>
      {product?.name ? (
        <Row
          className="price_IC_box text-center"
          css={`
            display: flex;
            align-items: center;
            height: 210px;

            width: 270px;
            margin: 0 !important;
            justify-content: space-around;
            border: 2px solid white;
            box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.16);
            position: relative;
            :hover {
              border: 2px solid #0a87ff;
            }
            @media (max-width: 1200px) {
              width: unset;
            }
          `}
        >
          <RemoveCross
            onClick={() => removePlan(`${product.id}${sum_insured}`)}
          >
            <i class="fas fa-times"></i>
          </RemoveCross>
          <Col
            md={12}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span className="logo_style_common">
           {console.log(company_alias,"company_alias")}
              <img src={images[company_alias]} alt="" className="w-100" />
            </span>
            {/* Dynamic ic name */}
            {/* <WrapperCompanyDetails>
              
              <PlanName className="hideTBody">{product.name}</PlanName>
            </WrapperCompanyDetails> */}
          </Col>
          <Col md={12}>
            <CompanyName>{product?.name}</CompanyName>
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
                discount[`${product.id}${sum_insured}`]?.total_premium +
                  additionalPremium +
                  (ridersPremium[`${product.id}${sum_insured}`] || 0) ||
                total_premium +
                  additionalPremium +
                  (ridersPremium[`${product.id}${sum_insured}`] || 0)
              } /${getYearsUsingTenure(
                discount[`${product.id}${sum_insured}`]?.tenure || tenure
              )}`}
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <div>
            <button
              onClick={() => setShow(true)}
              css={`
                border: none;
                background: none;
                height: 210px;

                width: 270px;
                @media (max-width: 1200px) {
                  width: 100%;
                }
              `}
            >
              <div
                css={`
                  // border: 1px dashed #e2a6a9;
                  background-color: #ebf5ff;
                  box-shadow: none;
                  cursor: pointer;
                  display: block;
                  padding-top: 50px;
                  transition: 0.45s;
                  height: 100%;
                  width: 248px;
                  color: #0a87ff;
                  border-radius: 5px;
                  @media (max-width: 1200px) {
                    width: 100%;
                  }
                `}
              >
                <div
                  className="cross"
                  css={`
                    width: 100%;
                    display: flex;
                    justify-content: center;
                  `}
                >
                  <div
                    css={`
                      border: 1px dashed #0a87ff;
                      width: 83px;
                      background: #eaeff2;
                      height: 65px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 55px;
                      border-radius: 12px;
                    `}
                  >
                    <AiOutlinePlus></AiOutlinePlus>
                  </div>
                </div>
                <div
                  style={{ fontWeight: "900", marginTop: "15px" }}
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
          </div>
        </Row>
      )}
    </>
  );
};

export default PlanContainer;

const ImageLogo = styled.img`
  position: relative;
  top: 11px;
  object-fit: contain;
  height: 45px !important;
  width: 74px !important;

  padding: 2px 0px !important;
`;
const WrapperCompanyDetails = styled.div`
  color: #111;
  text-align: left;
  padding-top: 8px;
  margin-left: 10px;
`;
