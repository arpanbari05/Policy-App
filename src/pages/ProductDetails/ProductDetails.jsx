import React from "react";
import { Col, Row } from "react-bootstrap";
import CustomizeYourPlan from "./components/CustomizeYourPlan";
import CheckDiscount from "./components/CheckDiscount";
import ReviewCart from "./components/ReviewCart";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import AddOnsCoveragesSection from "./components/AddOnsCoveragesSection/AddOnsCoveragesSection";
import ProductCard from "./components/AddOnProductCard";
import { useCartProduct } from "../Cart";
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
import { setFilters, setShouldFetchQuotes } from "../quotePage/quote.slice";
//import { setFilters, setShouldFetchQuotes } from "../QuotesPage/quotePage.slice";

function GoBackButton({ groupCode, ...props }) {
  const urlQuery = useUrlQuery();
  const enquiryId = urlQuery.get("enquiryId");
  const history = useHistory();
  return (
    <button
      className="btn"
      type="button"
      onClick={() =>
        history.replace(`/quotes/${groupCode}?enquiryId=${enquiryId}`)
      }
      css={`
        width: max-content;
        margin-left: 6px;
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
          width: 35px;
          margin-right: 20px;
          border-radius: 100%;
          height: 35px;
          color: #707b8b;
        `}
      >
        <i className="fas fa-chevron-left"></i>
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

  const location = useLocation();

  const dispatch = useDispatch();

  const history = useHistory();

  const companies = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data
  );
  const { fetchFilters, shouldFetchQuotes } = useSelector(
    ({ quotePage }) => quotePage
  );

  const { product } = useCartProduct(groupCode);

  const urlQueries = useUrlQuery();

  const enquiryId = urlQueries.get("enquiryId");

  const [showNav, setShowNav] = useState(false);

  function scrollListener() {
    if (window.scrollY >= 80) setShowNav(true);
    else setShowNav(false);
  }

  useEffect(() => {
    document.addEventListener("scroll", scrollListener);
    return () => document.removeEventListener("scroll", scrollListener);
  }, []);

  useEffect(() => {
    if (shouldFetchQuotes) {
      let tempfilter;
      fetchFilters.forEach((data) => {
        if (`${data.id}` === groupCode) {
          tempfilter = data.extras;
        }
      });
      tempfilter !== null && dispatch(setFilters(tempfilter));
    }

    dispatch(setShouldFetchQuotes(false));
  }, [fetchFilters]);

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

  if (!enquiryId) return <p>Page Not Found!</p>;

  if (!product)
    return <Redirect to={`/quotes/${groupCode}?enquiryId=${enquiryId}`} />;

  return (
    <>
      <MobileHeader>
        <MobileHeaderText
          onClick={() => {
            history.goBack();
          }}
        >
          <i className="icon flaticon-back"></i> Go Back
        </MobileHeaderText>
      </MobileHeader>
      <main
        className="container"
        css={`
          ${mobile} {
            background-color: #fff;
          }
        `}
      >
        {showNav && <ProductDetailsNavbar />}
        <div className="d-flex align-items-center justify-content-between my-3">
          <GoBackButton groupCode={groupCode} />
          <div
            css={`
              width: 70%;
            `}
            className="flex-fill"
          >
            <ProductCard />
          </div>
        </div>
        <Row
          css={`
            justify-content: center;
          `}
        >
          <Col
            xl={3}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            css={`
              ${mobile} {
                display: none;
              }
            `}
          >
            <ReviewCart companies={companies} groupCode={groupCode} />
          </Col>
          <Col
            xl={9}
            lg={12}
            // className="wow fadeInLeft animated"
            // data-wow-delay="0.9s"
            // style={{
            //   visibility: "visible",
            //   animationDelay: "0.9s",
            //   animationName: "fadeInLeft",
            //   marginLeft: "50px",
            // }}
          >
            <Col
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              // className="margin_border_outline_product_addon"
              // style={{
              //   paddingTop: 0,
              // }}
              // id="customize-your-plan-section"
              css={`
                ${mobile} {
                  padding: 0;
                  margin-bottom: 127px;
                }
              `}
            >
              <CustomizeYourPlan groupCode={groupCode} />
              <hr />
              <CheckDiscount groupCode={groupCode} />
              <hr />
              <AddOnsCoveragesSection groupCode={groupCode} />
            </Col>
          </Col>
        </Row>
        <hr />
      </main>
      <div
        css={`
          display: none;
          ${mobile} {
            display: block;
            width: 100%;
          }
        `}
      >
        <ReviewCart companies={companies} groupCode={groupCode} />
      </div>
    </>
  );
};

export default ProductDetails;
