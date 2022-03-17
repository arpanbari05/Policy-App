import React, { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { RidersSection } from "./components/CustomizeYourPlan";
import CheckDiscount from "./components/CheckDiscount";
import { CartDetails } from "./components/ReviewCart";
import { useSelector } from "react-redux";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import ProductCard from "./components/AddOnProductCard";
import useUrlQuery from "../../customHooks/useUrlQuery";
import { useEffect } from "react";
import { useState } from "react";
import ProductDetailsNavbar from "./components/ProductDetailsNavbar";
import { mobile, small } from "../../utils/mediaQueries";
import {
  MobileHeader,
  MobileHeaderText,
} from "../ProposalPage/ProposalPage.style";
import "styled-components/macro";
import { Page } from "../../components";
import PageNotFound from "../PageNotFound";
import {
  useCart,
  useFrontendBoot,
  useTheme,
  useUrlEnquiry,
} from "../../customHooks";
import CartMobile from "./components/Mobile/CartMobile/CartMobile";
import FeatureSection from "./components/FeatureSection/FeatureSection";
import Select from "react-select";
import { numberToDigitWord } from "../../utils/helper";
import { FaArrowCircleLeft } from "react-icons/fa";
import SumInsuredSection from "./components/SumInsuredSection";
import AddOnSection from "./components/AddOnsSection/AddOnsSection";
import Benefit from "./components/Benefit";
import GoBackButton from "../../components/GoBackButton";

const ProductDetails = () => {
  const { groupCode } = useParams();

  const expand = useSelector(({ productPage }) => productPage.expandMobile);

  const location = useLocation();

  const { colors } = useTheme();

  const history = useHistory();

  const urlQueries = useUrlQuery();

  const enquiryId = urlQueries.get("enquiryId");

  const [showNav, setShowNav] = useState(false);

  const { getCartEntry } = useCart();

  const cartEntry = getCartEntry(parseInt(groupCode));

  const quotesRedirectUrl = useUrlEnquiry();

  const loaderRef = useRef(null);

  useEffect(() => {
    function scrollListener() {
      if (window.scrollY >= 80) setShowNav(true);
      else setShowNav(false);
    }

    document.addEventListener("scroll", scrollListener);
    return () => document.removeEventListener("scroll", scrollListener);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const scrollToRef = document.querySelector(location.hash);
      if (scrollToRef) {
        window.scrollTo({
          top: scrollToRef.offsetTop + 110,
          left: 0,
        });
      }
    }
  }, [location.hash]);

  useEffect(() => {
    window.location.hash = "";
  }, [groupCode]);

  const {
    journeyType,
    data: { settings, tenant },
  } = useFrontendBoot();

  if (!enquiryId) return <PageNotFound />;

  if (!cartEntry) {
    return (
      <Redirect
        to={`/quotes/${groupCode}?enquiryId=${quotesRedirectUrl.enquiryId}`}
      />
    );
  }

  return (
    <Page noNavbarForMobile={true}>
      {/* <Toploader loaderRef={loaderRef} /> */}
      <MobileHeader primary_color={colors?.primary_color}>
        <MobileHeaderText
          onClick={() => {
            history.goBack();
          }}
        >
          <FaArrowCircleLeft />
          <span className="mx-2"> Go Back</span>
        </MobileHeaderText>
      </MobileHeader>
      <main
        className="container noselect"
        css={
          expand
            ? `
        position:fixed;
        opacity:0.5;
        `
            : `

          ${mobile} {
            background-color: #fff;
          }
        `
        }
      >
        {showNav && <ProductDetailsNavbar />}
        <div
          className="d-flex align-items-center justify-content-between my-3"
          css={`
            @media (max-width: 1200px) {
              flex-direction: column;
              align-items: flex-start !important;
            }
          `}
        >
          <div
            css={`
              @media (max-width: 1200px) {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              ${mobile} {
                display: none;
              }
            `}
          >
            <GoBackButton
              backPath={`/quotes/${groupCode}?enquiryId=${quotesRedirectUrl.enquiryId}`}
            />
          </div>

          <div
            css={`
              width: 70%;
              @media (max-width: 1200px) {
                width: 100%;
              }
            `}
            className="flex-fill"
          >
            <ProductCard />
          </div>
        </div>
        <Row
          className="pb-3"
          css={`
            justify-content: center;
            @media (max-width: 1200px) {
              flex-direction: column;
            }
          `}
        >
          <div
            css={`
              width: 26%;
              @media (max-width: 1350px) {
                width: 30%;
              }
              @media (max-width: 1200px) {
                width: 100%;
              }
              ${mobile} {
                display: none;
              }
            `}
          >
            <CartDetails groupCode={parseInt(groupCode)} />
          </div>
          <div
            css={`
              width: 74%;
              @media (max-width: 1350px) {
                width: 70%;
              }
              @media (max-width: 1200px) {
                width: 100%;
              }
            `}
          >
            <Col
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              css={`
                @media (max-width: 1200px) {
                  margin-top: 15px;
                }
                ${mobile} {
                  padding: 0;
                  margin-bottom: 127px;
                }
              `}
            >
              {journeyType === "renewal" ? (
                <SumInsuredSection cartEntry={cartEntry} />
              ) : tenant.alias === "fyntune" ? (
                <SumInsuredOptionsSection cartEntry={cartEntry} />
              ) : null}
              <CheckDiscount
                groupCode={parseInt(groupCode)}
                cartEntry={cartEntry}
                // loaderStart={() => console.log(loaderRef?.current?.continuousStart())}
              />
              <Benefit cartEntry={cartEntry} groupCode={parseInt(groupCode)} />
              <RidersSection isProductDetailsPage={true} />
              {+settings.addons_visibilty === 1 && journeyType === "health" ? (
                <AddOnSection cartEntry={cartEntry} />
              ) : null}
            </Col>
          </div>
        </Row>
      </main>
      <CartMobile groupCode={parseInt(groupCode)} />
    </Page>
  );
};

export default ProductDetails;

function getSumInsuredOptions(arr = []) {
  return arr.map(item => ({ value: item, label: numberToDigitWord(item) }));
}

function SumInsuredOptionsSection({ cartEntry }) {
  const { updateCartEntry } = useCart();

  const { available_sum_insureds, group, sum_insured } = cartEntry;

  if (!available_sum_insureds) return null;

  const handleChange = option => {
    updateCartEntry(group.id, { sum_insured: option.value });
  };

  const sumInsuredOptions = getSumInsuredOptions(available_sum_insureds);

  return (
    <FeatureSection heading="Sum Insured" subHeading="Modify sum insured">
      <div className="w-50">
        <Select
          defaultValue={{
            value: sum_insured,
            label: numberToDigitWord(sum_insured),
          }}
          options={sumInsuredOptions}
          onChange={handleChange}
        />
      </div>
    </FeatureSection>
  );
}
