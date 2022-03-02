import { Modal, Tab, Tabs } from "react-bootstrap";
import { FaSearch, FaTimes } from "react-icons/fa";
import styled from "styled-components/macro";
import { Button, useGotoProductDetailsPage } from "..";
import { tabletAndMobile } from "../../utils/mediaQueries";
import "styled-components/macro";
import {
  useGetAboutCompanyQuery,
  useGetClaimProcessQuery,
  useGetNetworkHospitalsQuery,
  useGetProductBrochureQuery,
  useGetProductFeaturesQuery,
} from "../../api/api";
import {
  useCompanies,
  useFrontendBoot,
  useQuote,
  useTheme,
  useToggle,
} from "../../customHooks";
import ClaimProcess from "../../pages/SeeDetails/DataSet/ClaimProcess";
import {
  amount,
  calculateTotalPremium,
  getDisplayPremium,
  getPlanFeatures,
} from "../../utils/helper";
import CardSkeletonLoader from "../Common/card-skeleton-loader/CardSkeletonLoader";
import { some } from "lodash";
import AboutCompany from "../../pages/SeeDetails/DataSet/AboutCompany";
import PlanDetails from "../../pages/SeeDetails/DataSet/PlanDetails";
import { Riders } from "../../pages/ProductDetails/components/CustomizeYourPlan";
import { useParams } from "react-router-dom";
import { useState } from "react";
import CartSummaryModal from "../CartSummaryModal";
import {
  MobileProductHeader,
  MobileProductDetailsTabs,
  MobileProductDetailsFooter,
  MobileRenderPlanDetails,
  MobileSeeDetailsTop,
  MobileRidersSection,
  MobileRenderClaimProcess,
  MobileRenderAboutCompany,
  MobileRenderCashlessHospitals,
} from "./Mobile/MobileModalComponents";

function useRidersSlot() {
  const [selectedRiders, setSelectedRiders] = useState([]);

  function onChange(riders) {
    setSelectedRiders(riders);
  }

  return { selectedRiders, onChange };
}

function ProductDetailsModal({
  quote,
  onClose,
  defaultActiveKey = "plan-details",
  defaultActiveKeyMobile = "mobile-plan-details",
  ...props
}) {
  const handleClose = () => onClose && onClose();

  const { selectedRiders, ...ridersSlot } = useRidersSlot();

  return (
    <Modal
      show
      className="noPadding"
      onHide={handleClose}
      dialogClassName="m-0 mw-100 "
      contentClassName="border-0 rounded-0"
      {...props}
    >
      <Modal.Body
        css={`
          padding: unset;
        `}
      >
        <div
          css={`
            padding-top: 7.27em;
            min-height: 100vh !important;
            ${tabletAndMobile} {
              padding-top: unset !important;
              background-color: rgb(243, 244, 249);
            }
          `}
        >
          <MobileSeeDetailsTop onClose={handleClose} />

          <ProductHeader
            quote={quote}
            selectedRiders={selectedRiders}
            onClose={handleClose}
          />
          <MobileProductHeader
            quote={quote}
            selectedRiders={selectedRiders}
            onClose={handleClose}
          />
          <ProductDetailsTabs defaultActiveKey={defaultActiveKey}>
            <Tab eventKey="plan-details" title="Plan Details">
              <RenderPlanDetails quote={quote} />
            </Tab>
            <Tab eventKey="add-on-coverages" title="Add-on Coverages">
              <DetailsSectionWrap className="mt-3">
                <RidersSection quote={quote} {...ridersSlot} />
              </DetailsSectionWrap>
            </Tab>
            <Tab eventKey="cashless-hospitals" title="Cashless Hospitals">
              <CashlessHospitals quote={quote} />
            </Tab>
            <Tab eventKey="claim-process" title="Claim Process">
              <RenderClaimProcess quote={quote} />
            </Tab>
            <Tab eventKey="about-company" title="About Company">
              <RenderAboutCompany quote={quote} />
            </Tab>
          </ProductDetailsTabs>

          <MobileProductDetailsTabs defaultActiveKey={defaultActiveKeyMobile}>
            <Tab eventKey="mobile-plan-details" title="Plan Details">
              <MobileRenderPlanDetails quote={quote} />
            </Tab>
            <Tab eventKey="mobile-add-on-coverages" title="Add-on Coverages">
              <MobileRidersSection quote={quote} {...ridersSlot} />
            </Tab>
            <Tab
              eventKey="mobile-cashless-hospitals"
              title="Cashless Hospitals"
            >
              <MobileRenderCashlessHospitals quote={quote} />
            </Tab>
            <Tab eventKey="mobile-claim-process" title="Claim Process">
              <MobileRenderClaimProcess quote={quote} />
            </Tab>
            <Tab eventKey="mobile-about-company" title="About Company">
              <MobileRenderAboutCompany quote={quote} />
            </Tab>
          </MobileProductDetailsTabs>
        </div>
      </Modal.Body>
      <Modal.Footer
        css={`
          display: none;
          ${tabletAndMobile} {
            display: block;
            min-height: 83px;
            width: 100%;
            position: fixed;
            bottom: 0px;
            background: #fff;
            box-sizing: border-box;
            padding: 12px;
          }
        `}
      >
        <MobileProductDetailsFooter
          quote={quote}
          selectedRiders={selectedRiders}
          onClose={handleClose}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default ProductDetailsModal;

function ProductDetailsTabs({ children, ...props }) {
  const { colors } = useTheme();
  return (
    <StyledTabs
      defaultActiveKey="plan-details"
      id="product-details-tabs"
      className="align-items-center justify-content-between"
      css={`
        background-color: ${colors.secondary_shade};
        & .nav-item .nav-link {
          color: #000;
          &.active {
            color: ${colors.primary_color};
          }
        }
        ${tabletAndMobile} {
          display: none !important;
        }
      `}
      unmountOnExit
      {...props}
    >
      {children}
    </StyledTabs>
  );
}

const StyledTabs = styled(Tabs)`
  box-shadow: rgb(0 75 131 / 13%) 0px 3px 6px 0px;
  height: 4.67em;
  padding: 0 6%;
  & .nav-item {
    height: 100%;
    & .nav-link {
      border: none;
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
          background: rgb(10, 135, 255);
        }
      }
    }
  }
  ${tabletAndMobile} {
    display: none;
  }
`;

function RidersSection({ quote, ...props }) {
  let { groupCode } = useParams();

  groupCode = parseInt(groupCode);

  return <Riders groupCode={groupCode} quote={quote} {...props} />;
}

function RenderPlanDetails({ quote, ...props }) {
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
      <DetailsSectionWrap>
        <CardSkeletonLoader />
      </DetailsSectionWrap>
    );

  if (productBrochureQuery.isError)
    return (
      <DetailsSectionWrap>
        {productBrochureQuery.error.data.message}
      </DetailsSectionWrap>
    );

  const planDetails = getPlanFeatures(data, sum_insured);

  const { brochure_url, policy_wording_url } = (productBrochureQuery.data ||
    [])[0];

  return (
    <PlanDetails
      ActiveMainTab
      planDetails={planDetails}
      brochureUrl={brochure_url}
      policyWordingUrl={policy_wording_url}
      {...props}
    />
  );
}

function RenderClaimProcess({ quote, ...props }) {
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

  // const isError = some([
  //   claimProcessQuery.isError,
  //   productBrochureQuery.isError,
  // ]);

  if (isLoading)
    return (
      <DetailsSectionWrap>
        <CardSkeletonLoader />
      </DetailsSectionWrap>
    );

  return (
    <DetailsSectionWrap {...props}>
      <ClaimProcess
        ActiveMainTab
        claimProccess={claimProcessQuery.data}
        claimform={(productBrochureQuery.data || [])[0]}
      />
    </DetailsSectionWrap>
  );
}

function RenderAboutCompany({ quote, ...props }) {
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
      <DetailsSectionWrap>
        <CardSkeletonLoader />
      </DetailsSectionWrap>
    );

  return (
    <AboutCompany ActiveMainTab aboutCompany={data} company_name={short_name} />
  );
}

function CashlessHospitals({ quote, ...props }) {
  const { colors } = useTheme();
  const {
    product: { company },
  } = quote;
  const { isLoading, isUninitialized, isError, data } =
    useGetNetworkHospitalsQuery(company.alias);

  const [search, setSearch] = useState("");

  if (isLoading || isUninitialized)
    return (
      <DetailsSectionWrap>
        <CardSkeletonLoader />
      </DetailsSectionWrap>
    );

  if (isError) return <p>Cannot get hosiptals.</p>;

  const { data: networkHospitals } = data;

  const nearNetworkHospitals = networkHospitals.slice(0, 6);

  const filteredHospitals = networkHospitals.filter(hospital =>
    hospital.name.toLowerCase().startsWith(search.toLowerCase()),
  );

  const handleSearchChange = evt => setSearch(evt.target.value);

  return (
    <DetailsSectionWrap
      {...props}
      css={`
        margin-top: 20px;
      `}
    >
      <h1
        className="my-4"
        css={`
          font-size: 1.39rem;
          color: rgb(37, 56, 88);
          font-weight: 900;
          margin-top: unset !important;
        `}
      >
        Hospitals Near You
      </h1>
      <div
        className="d-flex flex-wrap justify-content-between"
        css={`
          gap: 1.2em;
        `}
      >
        {nearNetworkHospitals.map(networkHospital => (
          <NetworkHospitalCard
            networkHospital={networkHospital}
            key={networkHospital.name + networkHospital.pincode}
          />
        ))}
      </div>
      <div className="mt-5 position-relative">
        <FaSearch
          className="position-absolute"
          css={`
            right: 1em;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.2rem;
          `}
        />
        <div className="d-flex">
          <div
            className="d-flex align-items-center justify-content-center px-5"
            css={`
              background-color: ${colors.primary_shade};
              border: 1px solid;
              border-color: ${colors.primary_color};
              border-radius: 0.6em 0 0 0.6em;
              font-weight: 900;
            `}
          >
            Mumbai
          </div>
          <input
            className="w-100 px-3"
            placeholder="Search Hospitals"
            css={`
              height: 3.7em;
              border: 1px solid ${colors.font.two};
              border-radius: 0 0.6em 0.6em 0;
            `}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <table className="table margin_p_r_table table_pro_search mt-4">
        <tbody
          css={`
            & td {
              border-bottom: 1px solid #d5ddea6e !important;
              padding: 15px;
            }
          `}
        >
          <tr
            className="tr_table_search_hospital"
            css={`
              background-color: #d5ddea6e;
              font-size: 20px;
              & th {
                padding: 13px 14px !important;
              }
            `}
          >
            <th style={{ paddingTop: "unset" }}>Hospital Name</th>
            <th>Address</th>
            {company !== "max_bupa" && company !== "aditya_birla" && (
              <th>Phone Number</th>
            )}
          </tr>
          {filteredHospitals.map(networkHospital => (
            <NetworkHospitalRow
              networkHospital={networkHospital}
              key={networkHospital.name + networkHospital.pincode}
            />
          ))}
        </tbody>
      </table>
    </DetailsSectionWrap>
  );
}

function NetworkHospitalCard({ networkHospital, ...props }) {
  return (
    <div
      css={`
        box-shadow: 0 3px 13px 0 rgb(0 0 0 / 16%);
        min-height: 125px;
        color: #253858;
        padding: 15px;
        flex: 1 0 calc(100% / 3 - 0.8em);
      `}
      {...props}
    >
      <h2
        css={`
          font-size: 17px;
          font-weight: 900;
          margin-bottom: 8px;
        `}
      >
        {networkHospital.name}
      </h2>
      <p
        css={`
          font-size: 13px;
          margin-bottom: 8px;
        `}
      >
        {networkHospital.address}
      </p>
      <p
        css={`
          margin-bottom: unset;
        `}
      >
        Phone number: {networkHospital.phone}
      </p>
    </div>
  );
}

function NetworkHospitalRow({ networkHospital, ...props }) {
  return (
    <tr {...props}>
      <td>{networkHospital.name}</td>
      <td>{networkHospital.address}</td>
      <td>{networkHospital.phone}</td>
    </tr>
  );
}

export const DetailsSectionWrap = styled.section`
  padding: 0 6%;
  margin: auto;
  margin-top: 40px;
  ${tabletAndMobile} {
    display: none !important;
  }
`;

function ProductHeader({ quote, selectedRiders = [], onClose, ...props }) {
  const {
    buyQuote,
    queryState: { isLoading },
  } = useQuote();

  const { journeyType } = useFrontendBoot();

  const cartSummaryModal = useToggle();

  const handleClose = () => {
    onClose && onClose();
  };

  const {
    product: { company, name },
    sum_insured,
    total_premium,
    tenure,
  } = quote;

  const { getCompany } = useCompanies();

  const { logo, csr } = getCompany(company.alias);

  const netPremium = calculateTotalPremium({
    total_premium,
    health_riders: selectedRiders,
  });

  const handlePremiumClick = () => {
    buyQuote(quote, selectedRiders).then(cartSummaryModal.on);
  };

  const { gotoProductPage } = useGotoProductDetailsPage();

  return (
    <FixedTop>
      <ProductHeaderWrap
        className="d-flex align-items-center justify-content-between position-relative"
        {...props}
      >
        <div
          className="d-flex align-items-center"
          css={`
            gap: 1em;
          `}
        >
          <LogoWrap>
            <img className="w-100" src={logo} alt={company.alias} />
          </LogoWrap>
          <ProductName>{name}</ProductName>
        </div>

        <QuoteInfoWrap>
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
              {amount(sum_insured)}
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
              {amount(total_premium)} / Year
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
              {csr}%
            </span>
          </div>
        </QuoteInfoWrap>

        <Button
          onClick={handlePremiumClick}
          className="rounded"
          css={`
            width: 12.97em;
            height: 3.97em;
            font-size: 0.939rem;
            font-weight: normal;
          `}
          loader={isLoading}
        >
          {journeyType === "top_up"
            ? getDisplayPremium({ total_premium: netPremium, tenure })
            : "Proceed to Buy"}
        </Button>

        <CloseButton className="p-0" onClick={handleClose}>
          <FaTimes />
        </CloseButton>

        {cartSummaryModal.isOn && (
          <CartSummaryModal
            onClose={cartSummaryModal.off}
            onContine={gotoProductPage}
            allClose={handleClose}
          />
        )}
      </ProductHeaderWrap>
    </FixedTop>
  );
}

const QuoteInfoWrap = styled.div`
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
`;

const ProductHeaderWrap = styled.div`
  height: 7.27em;
  padding: 5px 4%;
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 16px 0px;
`;

const FixedTop = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 99;
  ${tabletAndMobile} {
    display: none;
  } ;
`;

const ProductName = styled.div`
  font-size: 1.1rem;
  font-weight: 900;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  line-height: 1;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-100%, -50%);
`;

const LogoWrap = styled.div`
  max-width: 3.89em;
`;
