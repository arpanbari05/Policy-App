import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import "styled-components/macro";
import { BackButtonMobile, Page } from "../../components";
import GoBackButton from "../../components/GoBackButton";
import ShareQuoteModal from "../../components/ShareQuoteModal";
import { useCart, useFrontendBoot, useUSGIDiscounts } from "../../customHooks";
import useUrlQuery from "../../customHooks/useUrlQuery";
import { isSSOJourney, numberToDigitWord } from "../../utils/helper";
import { mobile } from "../../utils/mediaQueries";
import PageNotFound from "../PageNotFound";
import ErrorPopup from "../ProposalPage/ProposalSections/components/ErrorPopup";
import { setPosPopup } from "../quotePage/quote.slice";
import ProductCard from "./components/AddOnProductCard";
import AddOnSection from "./components/AddOnsSection/AddOnsSection";
import Benefit from "./components/Benefit";
import CheckDiscount from "./components/CheckDiscount";
import { RidersSection } from "./components/CustomizeYourPlan";
import FeatureSection from "./components/FeatureSection/FeatureSection";
import CartMobile from "./components/Mobile/CartMobile/CartMobile";
import ProductDetailsNavbar from "./components/ProductDetailsNavbar";
import { CartDetails } from "./components/ReviewCart";
import SumInsuredSection from "./components/SumInsuredSection";

const ProductDetails = () => {
  const { groupCode } = useParams();

  const expand = useSelector(({ productPage }) => productPage.expandMobile);

  const history = useHistory();

  const urlQueries = useUrlQuery();

  const enquiryId = urlQueries.get("enquiryId");

  const [showNav, setShowNav] = useState(false);

  const { getCartEntry } = useCart();

  const cartEntry = getCartEntry(parseInt(groupCode));

  const { pos_popup } = useSelector(({ quotePage }) => quotePage);

  const dispatch = useDispatch();
  const {
    data: {
      settings: { pos_nonpos_switch_message },
    },
  } = useFrontendBoot();

  useUSGIDiscounts(); //! to get the discounts logic of usgi.

  useEffect(() => {
    function scrollListener() {
      if (window.scrollY >= 80) setShowNav(true);
      else setShowNav(false);
    }

    document.addEventListener("scroll", scrollListener);
    return () => document.removeEventListener("scroll", scrollListener);
  }, []);

  const {
    journeyType,
    subJourneyType,
    data: { settings },
  } = useFrontendBoot();

  if (!enquiryId) return <PageNotFound />;

  if (!cartEntry) {
    alert(`Product not found against group code ${groupCode}.`);
    return history.replace(`/quotes/${groupCode}?enquiryId=${enquiryId}`);
  }

  const { sum_insured } = cartEntry;

  return (
    <>
      {pos_popup && (
        <ErrorPopup
          handleClose={() => dispatch(setPosPopup(false))}
          htmlProps={pos_nonpos_switch_message}
        />
      )}
      <Page
        backButton={
          <BackButtonMobile
            path={`/quotes/${groupCode}?enquiryId=${enquiryId}`}
          />
        }
      >
        <main
          className="container noselect"
          css={
            expand
              ? `
        position:fixed;
        opacity:0.5;
        `
              : `


          @media (min-width : 1200px){
            max-width: 95% !important;
          }
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
            {subJourneyType !== "renewal" && (
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
                  backPath={`/quotes/${groupCode}?enquiryId=${enquiryId}`}
                  shouldFollowPath
                />
              </div>
            )}

            {subJourneyType === "renewal" && (
              <div
                css={`
                  margin-right: 10px;
                `}
              >
                <ShareQuoteModal
                  insurersFor={[cartEntry?.product?.company?.alias]}
                  stage="RENEWAL_PRODUCT_DETAILS"
                  sum_insured={sum_insured}
                />
              </div>
            )}
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
                {subJourneyType === "renewal" && <SumInsuredSection />}
                <div
                  css={`
                    display: none;
                    @media (max-width: 768px) {
                      display: block;
                    }
                  `}
                >
                  <SumInsuredOptionsSection cartEntry={cartEntry} />
                </div>

                <CheckDiscount
                  groupCode={parseInt(groupCode)}
                  cartEntry={cartEntry}
                />
                <Benefit
                  cartEntry={cartEntry}
                  groupCode={parseInt(groupCode)}
                />
                <RidersSection isProductDetailsPage={true} />

                {+settings?.addons_visibilty === 1 &&
                journeyType === "health" ? (
                  <AddOnSection cartEntry={cartEntry} />
                ) : null}
              </Col>
            </div>
          </Row>
        </main>
        <CartMobile groupCode={parseInt(groupCode)} />
      </Page>
    </>
  );
};

export default ProductDetails;

function getSumInsuredOptions(arr = []) {
  return arr?.map(item => ({ value: item, label: numberToDigitWord(item) }));
}

function SumInsuredOptionsSection({ cartEntry }) {
  const { updateCartEntry } = useCart();

  const {
    data: {
      settings: { pos_nonpos_switch_message, restrict_posp_quotes_after_limit },
    },
  } = useFrontendBoot();

  const dispatch = useDispatch();

  const { available_sum_insureds, group, sum_insured } = cartEntry;

  if (!available_sum_insureds) return null;

  const handleChange = option => {
    if (isSSOJourney() && pos_nonpos_switch_message && option.value > 500000)
      dispatch(setPosPopup(true));
    updateCartEntry(group?.id, { sum_insured: option?.value });
  };

  let sumInsuredOptions = getSumInsuredOptions(available_sum_insureds);

  if (isSSOJourney() && restrict_posp_quotes_after_limit === `${1}`) {
    sumInsuredOptions = sumInsuredOptions.filter(si => si.value <= 500000);
  }

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
