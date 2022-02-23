import React from "react";
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
import { mobile } from "../../utils/mediaQueries";
import {
  MobileHeader,
  MobileHeaderText,
} from "../ProposalPage/ProposalPage.style";
import "styled-components/macro";
import { LoadCart, Page } from "../../components";
import PageNotFound from "../PageNotFound";
import { FaChevronLeft } from "react-icons/fa";
import { useCart, useMembers, useUrlEnquiry } from "../../customHooks";
import { setIsOnProductDetails } from "../quotePage/quote.slice";
import CartMobile from "./components/Mobile/CartMobile/CartMobile";

function GoBackButton({ ...props }) {
  const { groupCode } = useParams();

  const { getPreviousGroup } = useMembers();

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const prevoiusGroup = getPreviousGroup(parseInt(groupCode));

  const history = useHistory();

  const getLink = () => {
    if (!prevoiusGroup) return getUrlWithEnquirySearch(`/quotes/${groupCode}`);

    return getUrlWithEnquirySearch(`/productdetails/${prevoiusGroup.id}`);
  };

  const handleClick = () => {
    history.replace(getLink());
    setIsOnProductDetails(true);
  };

  return (
    <button
      className="btn"
      type="button"
      onClick={handleClick}
      css={`
        width: max-content;
        padding: 0 !important;
        margin-right: 10px;
        margin-bottom: 10px;
        color: var(--abc-red);
        font-size: 17px;
        display: flex;
        align-items: center;
        ${mobile} {
          display: none;
        }
      `}
      {...props}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        css={`
          background: #f1f4f8;
          width: 45px;
          margin-right: 20px;
          border-radius: 100%;
          height: 45px;
          color: #707b8b;
        `}
      >
        <FaChevronLeft />
      </div>
      <span
        css={`
          color: #3b4c69;
          font-weight: 600;
        `}
      >
        Go Back
      </span>
    </button>
  );
}

const ProductDetails = () => {
  const { groupCode } = useParams();
  const expand = useSelector(({ productPage }) => productPage.expandMobile);
  const location = useLocation();

  const history = useHistory();

  const urlQueries = useUrlQuery();

  const enquiryId = urlQueries.get("enquiryId");

  const [showNav, setShowNav] = useState(false);

  const { getCartEntry } = useCart();

  const cartEntry = getCartEntry(parseInt(groupCode));

  const quotesRedirectUrl = useUrlEnquiry();

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

  if (!enquiryId) return <PageNotFound />;

  //? REDIRECT CODE IF PRODUCT IS NOT IN CART.
  if (!cartEntry) {
    return (
      <Redirect
        to={`/quotes/${groupCode}?enquiryId=${quotesRedirectUrl.enquiryId}`}
      />
    );
  }

  return (
    <Page noNavbarForMobile={true}>
      <MobileHeader>
        <MobileHeaderText
          onClick={() => {
            history.goBack();
          }}
        >
          <i class="fas fa-arrow-circle-left"></i>{" "}
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
          {/* <GoBackButton groupCode={groupCode} /> */}
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
              <CheckDiscount groupCode={parseInt(groupCode)} />
              <RidersSection />
            </Col>
          </div>
        </Row>
      </main>
      <CartMobile groupCode={parseInt(groupCode)} />
    </Page>
  );
};

export default ProductDetails;
