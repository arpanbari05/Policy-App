import { useState } from "react";
import styled from "styled-components";
import "styled-components/macro";
import UpperModifier from "./components/UpperModifier";
import LowerModifier from "./components/LowerModifier";
import QuoteCard from "./components/QuoteCard";
import BuyNowModal from "./components/BuyNowModal";

import { SortByButton, TextLabel } from "./Quote.style";
import { insurerFilter } from "./quote.slice";
import useQuotesPage from "./useQuotes";
import call from "../../assets/images/call-center-service.png";
import { useDispatch, useSelector } from "react-redux";
import SortByDD from "./components/SortBy/SortByDD";
import { fetchQuotes, setFilters } from "./quote.slice";
import SeeDetails from "../SeeDetails/SeeDetails";
import CardSkeletonLoader from "../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import ComparePopup from "./components/ComparePopup/ComparePopup";
import { useParams } from "react-router";
import MobileHeader from "./quoteMobile/MobileHeader";

function QuotePage() {
  const {
    quotes,
    filterMobile,
    arr,
    companies,
    setFilterMobile,
    filterQuotes,
    showTalkModal,
    setShowTalkModal,
    setShowBuyNow,
    setShowSeeDetails,
    showPopup,
    showBuyNow,
    showSeeDetails,
    sortByData,
    quotesLength,
    member,
    setSortBy,
    recFilterdQuotes,
  } = useQuotesPage();
  console.log("quotes", quotes);


  const { memberGroups, proposerDetails } = useSelector(
    (state) => state.greetingPage
  );

  const { groupCode } = useParams();
  const selectedGroup = groupCode;

  const defaultfilters = {
    insurers: [],
    premium: "",
    cover: "3 to 5 Lacs",
    ownCover: "",
    planType:
      memberGroups[selectedGroup].length === 1
        ? "Individual"
        : proposerDetails.plan_type
          ? proposerDetails.plan_type === "M"
            ? "Multi Individual"
            : "Family Floater"
          : "Family Floater",
    multiYear: "1 Year",
    basePlanType: "Base health",
    moreFilters: {},
  };

  const dispatch = useDispatch();
  const { loadingQuotes, filters } = useSelector((state) => state.quotePage);
  const [seeDetailsQuote, setSeeDetailsQuote] = useState({
    quote: "",
    activeSum: "",
  });


  const { planType } = useSelector((state) => state.quotePage.filters);
  // const { selectedGroup } = useSelector(state => state.quotePage);
  const {
    plantypes,
    baseplantypes: basePlanTypes,
    covers,
  } = useSelector((state) => state.frontendBoot.frontendData.data);

  const { cover, tenure, plan_type } = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data.defaultfilters,
  );

  const selectedPlanType =
    planType ||
    plantypes?.find((planType) => planType.code === proposerDetails.plan_type)
      ?.display_name ||
    "";
  const firstQuoteFound =
    filterQuotes.some((quotes) => quotes?.length > 0) || !loadingQuotes;

  const isFiltersDefault =
    filters.premium === defaultfilters.premium &&
      filters.cover === defaultfilters.cover &&
      filters.basePlanType === defaultfilters.basePlanType &&
      filters.insurers.length < 1 &&
      filters.multiYear === defaultfilters.multiYear &&
      Object.keys(filters.moreFilters).length === 0
      ? true
      : false;

  const handleClearFilters = () => {
    dispatch(setFilters(defaultfilters));
    dispatch(
      fetchQuotes(companies?.companies, {
        sum_insured: cover,
        tenure,
        member: selectedGroup,
        plan_type:
          memberGroups?.[selectedGroup].length === 1
            ? "I"
            : proposerDetails.plan_type
              ? proposerDetails.plan_type === "M"
                ? "M"
                : "F"
              : "F",
      }),
    );
  };

  return (
    <>
      <div
        css={`
    @media (max-width:1023px) {
      display: none;
    }
    `}>
        <UpperModifier />
        <LowerModifier />


        <div className="container">
          <div className="col-md-12 d-flex">
            <div className="col-md-9" style={{ padding: "0px 5px", marginBottom: "120px" }}
              css={`
                     @media (max-width: 1200px) {
           width: 100%;
                     }
                     `}
            >
              <div className=" d-flex justify-content-between align-items-center">
                <TextLabel> Showing {selectedPlanType} Plan</TextLabel>
                {/* <SortByButton>
                Sort By: relevance <i class="fas fa-chevron-down mx-2"></i>
              </SortByButton> */}
                {!isFiltersDefault && (
                  <button
                    onClick={handleClearFilters}
                    className="btn"
                    style={{
                      background: "white",
                      color: "#000",
                      fontWeight: "bold",
                      width: "max-content",
                      padding: "8px 12px",
                      borderRadius: "24px",
                      display: "flex",
                      border: "1px solid #0a87ff",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "12px",

                    }}

                  >
                    Clear all filters
                    <i class="fas fa-sync mx-2"></i>
                  </button>
                )}
                {true && (
                  <SortByDD
                    list={sortByData}
                    title="Sort By"
                    onSortByChange={setSortBy}
                  />
                )}
              </div>
              {quotes?.length ?
                (
                  firstQuoteFound && (
                    filterQuotes.map(
                      (item, index) =>
                        item.length ? (
                          <QuoteCard
                            key={index}
                            id={index}
                            item={item}
                            handleSeeDetails={quote => {
                              setSeeDetailsQuote(quote);
                              setShowSeeDetails(true);
                            }}
                            handleClick={() => setShowBuyNow(true)}
                          />
                        ) : <></>
                    )
                  )
                ) : <CardSkeletonLoader noOfCards={3} />
              }

            </div>
            <div className="col-md-3" style={{ padding: "0px 5px" }}
              css={`
          @media (max-width: 1200px) {
display: none;
          }
          `}
            >
              <div className="d-flex justify-content-between align-items-center ">
                <TextLabel className="my-2" style={{ fontSize: "17px" }}>
                  All Premium Plans are GST Inclusive
                </TextLabel>
              </div>
              <AssistantCard>
                <span className="head">Health Insurance Assistance</span>
                <p className="my-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu
                  nisl a lorem auctor ultrices auctor vel elit. Aliquam quis
                  consequat tellus. Aliquam pellentesque ligula massa, aliquet
                  fermentum nisl varius ac.
                </p>
                <div
                  css={`
                display:flex;
                justify-content:space-between;
                
                `}
                >
                  <button className="talk_to_us my-2" style={{ padding: "8px 15px", height: "max-content" }}>Talk to us</button>

                  <AssistantImage src={call} />
                </div>
              </AssistantCard>

            </div>
          </div>
        </div>
        {showBuyNow && (
          <BuyNowModal
            showBuyNow={showBuyNow}
            setShowBuyNow={setShowBuyNow}
          />
        )}
        <ComparePopup showPopup={showPopup} groupCode={groupCode} />
        {showSeeDetails && (
          <SeeDetails
            show={showSeeDetails}
            handleClose={() => setShowSeeDetails(!showSeeDetails)}
            quote={seeDetailsQuote.quote}
            sum_insured={
              seeDetailsQuote.quote.sum_insured[seeDetailsQuote.activeSum]
            }
            tenure={seeDetailsQuote.quote.tenure[seeDetailsQuote.activeSum]}
            product={
              seeDetailsQuote.quote.product[seeDetailsQuote.activeSum]
            }
          />
        )}
      </div>

      <div
        css={`
      @media (min-width:1023px) {
display:block;
      }
      `}
      >
        <MobileHeader groupCode={groupCode} />
      </div>
    </>


  );
}

export default QuotePage;

const AssistantCard = styled.div`
  background: #eef1f4;
  margin-top: 10px;
  padding: 25px;
  .head {
    font-weight: 600;
  }
  p {
    color: #565758;
    font-size: 14px;
  }
  .talk_to_us {
    font-weight: 600;
    color: #0c88ff;
    border: 2px solid #0c88ff;
    background: white;
    font-size: 18px;
    padding: 10px 20px;
    border-radius: 5px;
  }
`;

const AssistantImage = styled.img`
width: 80px;
height: 80px;

margin-top: 20px;

`