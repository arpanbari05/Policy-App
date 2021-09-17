import { useState } from "react";
import styled from "styled-components";
import "styled-components/macro"
import UpperModifier from "./components/UpperModifier";
import LowerModifier from "./components/LowerModifier";
import QuoteCard from "./components/QuoteCard";
import BuyNowModal from "./components/BuyNowModal";


import { SortByButton, TextLabel } from "./Quote.style";
import { insurerFilter } from "./quote.slice";
import useQuotesPage from "./useQuotes";

import { useDispatch, useSelector } from "react-redux";
import SortByDD from "./components/SortBy/SortByDD";

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
  const dispatch = useDispatch();
  const { loadingQuotes, filters } = useSelector(state => state.quotePage);
  const [seeDetailsQuote, setSeeDetailsQuote] = useState({
    quote: "",
    activeSum: "",
  });
  const { memberGroups, proposerDetails } = useSelector(
    state => state.greetingPage,
  );
  const { groupCode } = useParams();
  const { planType } = useSelector(state => state.quotePage.filters);
  // const { selectedGroup } = useSelector(state => state.quotePage);
  const {
    plantypes,
    baseplantypes: basePlanTypes,
    covers,
  } = useSelector(state => state.frontendBoot.frontendData.data);


  const selectedPlanType =
    planType ||
    plantypes?.find(planType => planType.code === proposerDetails.plan_type)
      ?.display_name ||
    "";
  const firstQuoteFound =
    filterQuotes.some(quotes => quotes?.length > 0) || !loadingQuotes;

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
                <TextLabel className="my-2">
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
                <button className="talk_to_us my-2">Talk to us</button>
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
  p{
      color:#565758;
      font-size: 14px;
  }
  .talk_to_us{
      font-weight: 600;
      color: #0c88ff;
      border:2px solid #0c88ff;
      background: white;
      font-size: 18px;
      padding: 10px 20px;
      border-radius: 5px;
  }
`;
