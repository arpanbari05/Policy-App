import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import useWindowSize from "../../../../customHooks/useWindowSize";
import { useCartProduct } from "../../../Cart";
import { CompanyName, PlanName, RemoveCross } from "../../ComparePage.style";
import CompareBtn from "../buttons/CompareBtn";
import "styled-components/macro";
import { images } from "../../../../assets/logos/logo.js";
import "../PlanContainer/PlanContainer";
// import { backgroundPosition } from "html2canvas/dist/types/css/property-descriptors/background-position";

const getYearsUsingTenure = (tenure) => {
  if (tenure == 1) {
    return "year";
  } else if (tenure == 2) {
    return "2 years";
  } else if (tenure == 3) {
    return "3 years";
  }
};
const PlanContainerM = ({
  plans,
  removePlan,
  setShowM,
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
  const [windowHeight, windowWidth] = useWindowSize();
  const { groupCode: selectedGroup } = useParams();
  const { addProduct, isCartProductLoading } = useCartProduct(selectedGroup);
  let additionalPremium = 0;

  mandatory_riders?.forEach((element) => {
    additionalPremium += element.total_premium;
  });

  return (
    <>
      {product?.name ? (
        <Row
          className="price_IC_box text-center position-relative"
          style={{ boxShadow: "none", width: "42%", minHeight: "180px" }}
          css={`
            margin: 0px !important;
            @media (max-width: 767px) {
              border: 1px solid #c2cbde;
            }
            @media (max-width: 420px) {
              width: 44%;
            }
          `}
        >
          <RemoveCross
            onClick={() => removePlan(`${product.id}${sum_insured}`)}
            className="remove-btn"
          >
            <span>
              <i class="fas fa-times"></i>
            </span>
          </RemoveCross>

          <div
            css={`
              width: 60px;
              height: 60px;
              padding: 0px !important;
              display: flex;
              margin: auto;
              justify-content: center;
              align-items: center;
            `}
          >
            <img src={images[company_alias]} className="w-100" />
          </div>

          {/* <ImageLogoWrapper style={{backgroundImage:`url(${IcLogo})`}}>
          </ImageLogoWrapper> */}

          <Col md={12}>
            {/* Dynamic ic name */}
            <WrapperCompanyDetails>
              <CompanyName style={{ textAlign: "center" }}>
                {plans.product.name}
              </CompanyName>
            </WrapperCompanyDetails>
          </Col>

          <CompareBtn
            windowWidth={windowWidth}
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
        </Row>
      ) : (
        <EmptyContainer
          className="IC_product_compare_card blank"
          style={{
            width: "42% !important",
            minHeight: "180px",
            borderRadius: "none",
          }}
          css={`
            @media (max-width: 420px) {
              width: 44%;
            }
          `}
        >
          <div className="plus mx-auto" onClick={() => setShowM(true)}>
            <i className="fa fa-plus"></i>
          </div>
          <div className="text-center mt-2">Add plans</div>
          {/* <select
            className="form-control_compare"
            style={{
              background: `url(${downarrow}) no-repeat 94% 53%`,
            }}
          >
            <option>Select Insurer</option>
            <option>Self</option>
            <option>Son</option>
          </select> */}
        </EmptyContainer>
      )}
    </>
  );
};

export default PlanContainerM;

const EmptyContainer = styled.div`
  border: 2px dashed #e2a6a9;
  color: #0d6efd;
  background: #f3f4f9;
  border-radius: 12px;
  height: 157px;
  /* margin: 10px; */

  display: flex;
  justify-content: center;
  & .plus {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ImageLogo = styled.img`
  width: 100%;
  height: auto;
`;

const ImageLogoWrapper = styled.div`
  border-radius: unset !important;
  margin-top: 8px;
  height: 50px;
  width: 100px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const WrapperCompanyDetails = styled.div`
  color: #111;
  text-align: left;
  padding-top: 8px;
`;
