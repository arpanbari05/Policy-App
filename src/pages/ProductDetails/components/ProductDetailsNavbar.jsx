import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { isInViewport } from "../../../utils/helper";
import { useCartProduct } from "../../Cart";
import { ReviewCartButton } from "./ReviewCart";
import "styled-components/macro";
import { mobile } from "../../../utils/mediaQueries";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSection } from "../productDetails.slice";
import { useFrontendBoot, useTheme } from "../../../customHooks";

function ProductDetailsNavbar() {
  const currentSection = useSelector(state => state.productPage.currentSection);
  const {
    data: {
      settings: { riders_visibilty, addons_visibilty },
    },
  } = useFrontendBoot();

  const [showReviewButton, setShowReviewbutton] = useState(false);

  const { groupCode } = useParams();

  const { product } = useCartProduct(groupCode);

  const reviewButton = document.querySelector("#review-cart-button");

  const handleScroll = () => {
    if (reviewButton) {
      if (!isInViewport(reviewButton)) setShowReviewbutton(true);
      else setShowReviewbutton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    handleScroll();
  }, [product]);

  return (
    <div
      css={`
        position: fixed;
        background-color: #fff;
        z-index: 99;
        height: 82px;
        top: 0;
        left: 0;
        width: 100%;
        box-shadow: 0 2px 15px 5px #e2e3ed;
        padding: 0 65px;

        ${mobile} {
          display: none;
        }
      `}
    >
      <div
        css={`
          height: 100%;
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <nav
          css={`
            position: relative;

            width: 47%;

            @media (max-width: 1200px) {
              width: 60%;
            }
          `}
        >
          <div
            css={`
              position: relative;
              display: flex;
              align-items: center;
            `}
          >
            <ClickToScroll
              label="Check Discounts"
              scrollToElementId="check-discounts"
              className="btn"
            />
            {riders_visibilty !== "0" ? (
              <ClickToScroll
                label="Additional Riders"
                scrollToElementId="additional-riders"
                className="btn"
              />
            ) : (
              <></>
            )}
            {addons_visibilty !== "0" ? (
              <ClickToScroll
                label="Add-on Coverages"
                scrollToElementId="add-on-coverages"
                className="btn"
              />
            ) : (
              <></>
            )}
          </div>
          <div
            css={`
              /* display: ${window.location.hash ? "block" : "none"}; */
              display: block;
              position: absolute;
              top: 100%;
              transition: all 0.33s cubic-bezier(0.38, 0.8, 0.32, 1.07);
              transform: ${currentSection === "additional-riders"
                ? "translate(0, -100%)"
                : currentSection === "check-discounts"
                ? "translate(100%, -100%)"
                : currentSection === "add-on-coverages"
                ? "translate(200%, -100%)"
                : "translate(0, -100%)"};
              width: 33.33%;
            `}
            id="scroll-to-slider"
          >
            <div
              css={`
                height: 5px;
                width: 100px;
                border-radius: 15px 15px 0 0;
                background-color: var(--abc-red);
                margin: auto;
              `}
            ></div>
          </div>
        </nav>

        {showReviewButton ? (
          <div
            css={`
              width: fit-content;
            `}
          >
            <ReviewCartButton />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProductDetailsNavbar;

function ClickToScroll({ label, scrollToElementId }) {
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const handleClick = () => {
    window.location.hash = scrollToElementId;
    const scrollToElement = document.getElementById(scrollToElementId);
    scrollToElement.scrollIntoView();
    dispatch(setCurrentSection(scrollToElementId));
  };
  const currentSection = useSelector(state => state.productPage.currentSection);
  const isSelected = currentSection === scrollToElementId;
  return (
    <button
      css={`
        flex: 1;
        text-align: center;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        cursor: pointer;
        border: none;
        background: none;

        font-weight: 900;
        font-size: 15px;

        color: ${!isSelected ? "#000" : colors.primary_color};
        &::after {
          content: "";
          opacity: 0;
          border-radius: 15px 15px 0 0;
          width: 100px;
          height: 5px;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%, -100%);
          background-color: var(--abc-red);
        }
        &:hover {
          color: ${!isSelected ? "grey" : colors.primary_color};
          /* &::after {
            opacity: 1;
          } */
        }
        @media (max-width: 1024px) {
          font-size: 12px;
        }
      `}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
