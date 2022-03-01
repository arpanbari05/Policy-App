import { Modal, Tab, Tabs } from "react-bootstrap";
import { FaSearch, FaTimes } from "react-icons/fa";
import styled from "styled-components/macro";
import { Button, useGotoProductDetailsPage } from "../../../components";
import {
  useGetAboutCompanyQuery,
  useGetClaimProcessQuery,
  useGetNetworkHospitalsQuery,
  useGetProductBrochureQuery,
  useGetProductFeaturesQuery,
} from "../../../api/api";
import {
  useCompanies,
  useQuote,
  useTheme,
  useToggle,
} from "../../../customHooks";
import ClaimProcess from "../../../pages/SeeDetails/DataSet/ClaimProcess";
import {
  amount,
  calculateTotalPremium,
  getDisplayPremium,
  getPlanFeatures,
} from "../../../utils/helper";
import { mobile, small } from "../../../utils/mediaQueries";
import CardSkeletonLoader from "../../Common/card-skeleton-loader/CardSkeletonLoader";
import { some } from "lodash";
import AboutCompany from "../../../pages/SeeDetails/DataSet/AboutCompany";
import PlanDetails from "../../../pages/SeeDetails/DataSet/PlanDetails";
import { Riders } from "../../../pages/ProductDetails/components/CustomizeYourPlan";
import { useParams } from "react-router-dom";
import { useState } from "react";
import CartSummaryModal from "../../CartSummaryModal";
import MobilePlanDetails from "../../../pages/ProductDetails/components/Mobile/MobilePlanDetails";
import MobileAddOnCoverages from "../../../pages/ProductDetails/components/Mobile/MobileAddOnCoverages";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import MobileClaimProcess from "../../../pages/ProductDetails/components/Mobile/MobileClaimProcesses/MobileClaimProcesses";
import MobileAboutCompany from "../../../pages/ProductDetails/components/Mobile/MobileAboutCompany/MobileAboutCompany";
import MobileCashlessHospitals from "../../../pages/ProductDetails/components/Mobile/MobileCashlessHospitals/MobileCashlessHospitals";

export function MobileProductHeader({
  quote,
  selectedRiders = [],
  onClose,
  ...props
}) {
  const handleClose = () => {
    onClose && onClose();
  };

  const {
    product: { company, name },
    sum_insured,
    total_premium,
  } = quote;

  const { getCompany } = useCompanies();

  const { logo, csr } = getCompany(company.alias);

  return (
    <StickyTop>
      <ProductHeaderWrap className=" position-relative" {...props}>
        <UpperDiv>
          <CompLogo src={logo} alt={company?.alias} />
          <ProdName>{name}</ProdName>
        </UpperDiv>

        <MiddleDiv></MiddleDiv>

        <LowerDiv>
          <CoverDiv>
            <span>Cover : </span>
            <br />
            <span>
              <b>{amount(sum_insured)}</b>
            </span>
          </CoverDiv>
          <PremiumDiv>
            <span>Premium : </span>
            <br />
            <span>
              <b>{amount(total_premium)}</b>
            </span>
          </PremiumDiv>
          <ClaimSettlementDiv>
            <span>Claim Settlement Ratio : </span>
            <br />
            <span>
              <b>{csr}%</b>
            </span>
          </ClaimSettlementDiv>
        </LowerDiv>
      </ProductHeaderWrap>
    </StickyTop>
  );
}

const ProductHeaderWrap = styled.div`
  height: 120px;
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 16px 0px;
`;

const UpperDiv = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const CompLogo = styled.img`
  padding: 0px 18px;
  border-radius: 12px;
  width: 86px;
  margin: 13px 0px;
`;

const ProdName = styled.span`
  font-size: 18px;
`;

const MiddleDiv = styled.div`
  display: flex;
  padding: 0px 40px;
  justify-content: flex-end;
  height: 25px;
`;
const LowerDiv = styled.div`
  height: 40px;
  font-size: 12px;
  display: flex;
  ${small} {
    font-size: 10px;
  }
`;

const CoverDiv = styled.div`
  margin-left: 10px;
  width: 90px;
  height: 40px;
  border-right: 1px solid lightgray;
`;

const PremiumDiv = styled.div`
  margin-left: 10px;
  width: 90px;
  height: 40px;
  border-right: 1px solid lightgray;
`;

const ClaimSettlementDiv = styled.div`
  margin-left: 10px;
  width: 140px;
  height: 40px;
`;

const StickyTop = styled.div`
  display: none;
  ${mobile} {
    display: block;
    position: sticky;
    top: 0px;
    width: 100%;
    background-color: #fff;
    z-index: 99;
    height: 120px;
  } ;
`;

export function MobileProductDetailsTabs({ children, defaultActiveKey, ...props }) {
  const { colors } = useTheme();
  return (
    <StyledTabs
      defaultActiveKey={defaultActiveKey}
      id="product-details-tabs"
      className="align-items-center justify-content-between"
      css={`
        background-color: ${colors.secondary_shade};
        & .nav-item .nav-link {
          color: #000;
          font-size: 13px;
          font-weight: bold;
          &.active {
            color: ${colors.primary_color};
          }
        }
      `}
      primary_color={colors.primary_color}
      unmountOnExit
      {...props}
    >
      {children}
    </StyledTabs>
  );
}

const StyledTabs = styled(Tabs)`
  display: none;
  ${mobile} {
    display: block;
    display: flex;
    box-shadow: rgb(0 75 131 / 13%) 0px 3px 6px 0px;
    height: 40px;
    padding: 0px 10px;
    & .nav-item {
      height: 100%;
      & .nav-link {
        border: none;
        width: fit-content;
        margin: 0 auto;
        height: 100%;
        &.active {
          position: relative;
          background: none;
          font-weight: 900;
          &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 5px;
            top: 100%;
            left: 0px;
            transform: translateY(-100%);
            border-radius: 1.27em 1.27em 0 0;
            background: ${({ primary_color }) => primary_color};
          }
        }
      }
    }
  }
  @media (max-width: 673px) {
    & .nav-item {
      & .nav-link {
        font-size: 12px !important;
        padding: 8px 2px;
        &.active {
          &::after {
            height: 2px;
          }
        }
      }
    }
  }
  ${small} {
    height: 50px;
    & .nav-item {
      & .nav-link {
        width: min-content;
      }
    }
  }
`;

export const MobileProductDetailsFooter = ({
  quote,
  selectedRiders = [],
  onClose,
  ...props
}) => {
  const {
    buyQuote,
    queryState: { isLoading },
  } = useQuote();

  const cartSummaryModal = useToggle();

  const { total_premium } = quote;

  const handlePremiumClick = () => {
    buyQuote(quote, selectedRiders).then(cartSummaryModal.on);
  };

  const { gotoProductPage } = useGotoProductDetailsPage();

  const { colors } = useTheme();
  return (
    <FooterOuter>
      <div>
        <p
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
            color: ${colors.primary_color};
            font-weight: bold;
          `}
        >
          {amount(total_premium)}
        </p>
      </div>
      <div>
        {" "}
        <Button
          onClick={handlePremiumClick}
          className="rounded"
          css={`
            width: 12.97em;
            height: 3.97em;
            font-size: 0.939rem;
            box-shadow: rgb(48 67 163 / 25%) 0px 13px 27px 0px;
          `}
          loader={isLoading}
        >
          Proceed To Buy
        </Button>
      </div>

      {cartSummaryModal.isOn && (
        <CartSummaryModal
          onClose={cartSummaryModal.off}
          onContine={gotoProductPage}
          allClose={onClose}
        />
      )}
    </FooterOuter>
  );
};

const FooterOuter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export function MobileRenderPlanDetails({ quote, ...props }) {
  const { product, sum_insured } = quote;

  const { isLoading, isUninitialized, data } = useGetProductFeaturesQuery(
    product.id,
  );

  const productBrochureQuery = useGetProductBrochureQuery(product.id);

  if (
    some([
      isLoading,
      isUninitialized,
      productBrochureQuery.isLoading,
      productBrochureQuery.isUninitialized,
    ])
  )
    return (
      <MobileDetailsSectionWrap>
        <CardSkeletonLoader />
      </MobileDetailsSectionWrap>
    );

  if (productBrochureQuery.isError)
    return (
      <MobileDetailsSectionWrap>
        {productBrochureQuery.error.data.message}
      </MobileDetailsSectionWrap>
    );

  const planDetails = getPlanFeatures(data, sum_insured);

  const { brochure_url, policy_wording_url } = (productBrochureQuery.data ||
    [])[0];

  return (
    <MobilePlanDetails
      ActiveMainTab
      planDetails={planDetails}
      brochureUrl={brochure_url}
      policyWordingUrl={policy_wording_url}
      {...props}
    />
  );
}

export const MobileDetailsSectionWrap = styled.section`
  display: none;
  ${mobile} {
    display: block;
    padding: 0 6%;
    margin: auto;
    padding-top: 40px;
  }
`;

export const MobileSeeDetailsTop = ({ onClose }) => {
  const { colors } = useTheme();
  const handleClose = () => {
    onClose && onClose();
  };
  return (
    <MobileSeeDetailsTopOuter primary_color={colors.primary_color}>
      <IoArrowBackCircleSharp
        onClick={handleClose}
        color="#fff"
        size={"16px"}
      />
      <span
        css={`
          margin-left: 10px;
          color: rgb(255, 255, 255);
        `}
      >
        See Details
      </span>
    </MobileSeeDetailsTopOuter>
  );
};

export const MobileSeeDetailsTopOuter = styled.div`
  display: none;
  ${mobile} {
    display: flex;
    color: rgb(255, 255, 255);
    z-index: 9999;
    top: 0px;
    height: 57px;
    width: 100%;
    background: #0a87ff;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    padding: 0px 10px;
  }
`;

export function MobileRidersSection({ quote, ...props }) {
  let { groupCode } = useParams();

  groupCode = parseInt(groupCode);

  return (
    <MobileAddOnCoverages groupCode={groupCode} quote={quote} {...props} />
  );
}

export function MobileRenderClaimProcess({ quote, ...props }) {
  const {
    product: { company, id },
  } = quote;

  const claimProcessQuery = useGetClaimProcessQuery(company.id);

  const productBrochureQuery = useGetProductBrochureQuery(id);

  const isLoading = some([
    claimProcessQuery.isLoading,
    claimProcessQuery.isUninitialized,
    productBrochureQuery.isLoading,
    productBrochureQuery.isUninitialized,
  ]);

  const isError = some([
    claimProcessQuery.isError,
    productBrochureQuery.isError,
  ]);

  if (isLoading)
    return (
      <MobileDetailsSectionWrap>
        <CardSkeletonLoader />
      </MobileDetailsSectionWrap>
    );

  return (
    <MobileClaimProcess
      ActiveMainTab
      claimProccess={claimProcessQuery.data}
      claimform={(productBrochureQuery.data || [])[0]}
    />
  );
}

export function MobileRenderAboutCompany({ quote, ...props }) {
  const {
    product: { company },
  } = quote;

  const { getCompany } = useCompanies();

  const { short_name } = getCompany(company.alias);

  const { isLoading, isUninitialized, data } = useGetAboutCompanyQuery(
    company.id,
  );

  if (some([isLoading, isUninitialized]))
    return (
      <MobileDetailsSectionWrap>
        <CardSkeletonLoader />
      </MobileDetailsSectionWrap>
    );

  return (
    <MobileAboutCompany
      ActiveMainTab
      aboutCompany={data}
      company_name={short_name}
    />
  );
}

export function MobileRenderCashlessHospitals({ quote, ...props }) {
  const {
    product: { company },
  } = quote;
  const { isLoading, isUninitialized, isError, data } =
    useGetNetworkHospitalsQuery(company.alias);

  if (isLoading || isUninitialized)
    return (
      <MobileDetailsSectionWrap>
        <CardSkeletonLoader />
      </MobileDetailsSectionWrap>
    );

  if (isError)
    return (
      <MobileDetailsSectionWrap>
        <p>Cannot get hosiptals.</p>
      </MobileDetailsSectionWrap>
    );

  let hospitals = data?.data || [];
  let searchByName = {};
  let searchByPincode = {};
  const displayHospitals = hospitals.slice(0, 6);
  hospitals.forEach(item => {
    searchByName = {
      ...searchByName,
      ...{
        [item.name]: [
          ...(searchByName[item.name] ? searchByName[item.name] : []),
          item,
        ],
      },
    };
    searchByPincode = {
      ...searchByPincode,
      ...{
        [item.pincode]: [
          ...(searchByPincode[item.pincode]
            ? searchByPincode[item.pincode]
            : []),
          item,
        ],
      },
    };
  });
  const rows = displayHospitals.reduce(function (rows, key, index) {
    return (
      (index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows
    );
  }, []);

  return (
    <MobileCashlessHospitals
      ActiveMainTab
      hospitals={{
        displayHospitals: rows,
        searchByName,
        searchByPincode,
        hospitals,
      }}
    />
  );
}
