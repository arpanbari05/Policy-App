import { useState } from "react";
import styled from "styled-components";
import "styled-components/macro";
import UpperModifier from "./components/UpperModifier";
import LowerModifier from "./components/LowerModifier";
import QuoteCard from "./components/QuoteCard";
import BuyNowModal from "./components/BuyNowModal";
import { BiLoaderCircle } from "react-icons/bi";
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
import SpinLoader from "../../components/Common/SpinLoader/SpinLoader";
import MobilePlansFor from "./quoteMobile/MobilePlansFor";
import MobileQuoteCard from "./quoteMobile/MobileQuoteCard";
import QuoteFilterMobile from "./quoteMobile/QuoteFilter/QuoteFilterMobile";
import { MobileQuoteFilterFooter } from "./quoteMobile/FilterFooter/FilterFooter";
import { removeQuoteFromCart } from "../Cart/cart.slice";

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
    imageSendQuote,
    quotesLength,
    member,
    setSortBy,
    recFilterdQuotes,
  } = useQuotesPage();

  const { memberGroups, proposerDetails } = useSelector(
    (state) => state.greetingPage
  );

  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade,SecondaryShade } = theme;

  const { groupCode } = useParams();
  const selectedGroup = groupCode;
  const { loadingQuotes, filters } = useSelector((state) => state.quotePage);
  console.log("Filters plantype on quote page", filters);
  const defaultfilters = {
    insurers: [],
    premium: "",
    cover: "3 to 5 Lacs",
    ownCover: "",
    planType:
      memberGroups?.[selectedGroup]?.length === 1
        ? "Individual"
        : proposerDetails.plan_type
        ? proposerDetails.plan_type === "Multi Individual"
          ? "Multi Individual"
          : "Family Floater"
        : "Family Floater",
    multiYear: "1 Year",
    basePlanType: "Base Health",
    moreFilters: {},
  };

  const dispatch = useDispatch();

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
    ({ frontendBoot }) => frontendBoot.frontendData.data.defaultfilters
  );

  const selectedPlanType =
    planType ||
    plantypes?.find((planType) => planType.code === proposerDetails.plan_type)
      ?.display_name ||
    "";
  const firstQuoteFound =
    filterQuotes.some((quotes) => quotes?.length > 0) || !loadingQuotes;

  console.log(
    "d32fasg",
    filters.premium === null || filters.premium === "",
    filters.cover === defaultfilters.cover,
    filters.basePlanType.toLowerCase() === "base health",
    filters.insurers.length < 1,
    filters.multiYear === defaultfilters.multiYear,
    Object.keys(filters.moreFilters).length === 0 ? true : false
  );

  const isFiltersDefault =
    (filters.premium === null || filters.premium === "") &&
    filters.cover === defaultfilters.cover &&
    filters.basePlanType.toLowerCase() === "base health" &&
    filters.insurers.length < 1 &&
    filters.multiYear === defaultfilters.multiYear &&
    Object.keys(filters.moreFilters).length === 0
      ? true
      : false;

  const handleClearFilters = () => {
    dispatch(setFilters(defaultfilters));
    console.log("fetchquotes QuotesPage");

    // dispatch(
    //   fetchQuotes(companies?.companies, {
    //     sum_insured: cover,
    //     tenure,
    //     member: selectedGroup,
    //     plan_type:
    //       memberGroups?.[selectedGroup].length === 1
    //         ? "I"
    //         : proposerDetails.plan_type
    //         ? proposerDetails.plan_type === "M"
    //           ? "M"
    //           : "F"
    //         : "F",
    //   })
    // );
  };

  return (
    <>
      <div
        css={`
          background-color: rgba(255, 255, 255);
          @media (max-width: 1023px) {
            display: none;
          }
        `}
        id="printQuotePage"
        className="noselect"
      >
        <UpperModifier sendQuote={imageSendQuote} />
        <LowerModifier />

        <div className="container">
          <div className="col-md-12 d-flex">
            <div
              className="col-md-9"
              style={{ padding: "0px 5px", marginBottom: "120px" }}
              css={`
                @media (max-width: 1200px) {
                  width: 100%;
                }
              `}
            >
              <div
                css={`
                  box-sizing: none !important;
                  padding: 1vh;
                `}
                className=" d-flex justify-content-between align-items-center"
              >
                <TextLabel>
                  {" "}
                  {loadingQuotes ? (
                    <div
                      css={`
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: flex-start;
                      `}
                    >
                      <span>Loading {selectedPlanType} Plans &nbsp;</span>
                      <SpinLoader
                        customWidth="fit-content"
                        customHeight="fit-content"
                        proposalpage={"used for styling purpose"}
                        zIndexGiven="0"
                      />
                    </div>
                  ) : (
                    `Showing ${selectedPlanType}
                  Plans`
                  )}
                </TextLabel>
                {/* <SortByButton>
                Sort By: relevance <i class="fas fa-chevron-down mx-2"></i>
              </SortByButton> */}
                {!isFiltersDefault && !loadingQuotes && (
                  <button
                    onClick={handleClearFilters}
                    className="btn"
                    style={{
                      backgroundColor: "#e2f0ff",
                      color: "#0a87ff",
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
              {console.log(filterQuotes.flat(), "13hagsd")}
              {quotes?.length ? (
                firstQuoteFound &&
                filterQuotes.map((item, index) =>
                  item.length ? (
                    <QuoteCard
                      key={index}
                      id={index}
                      item={item}
                      handleSeeDetails={(quote, clickedFrom) => {
                        dispatch(removeQuoteFromCart(groupCode));
                        setSeeDetailsQuote(quote);
                        setShowSeeDetails(clickedFrom || true);
                      }}
                      handleClick={() => setShowBuyNow(true)}
                    />
                  ) : (
                    <></>
                  )
                )
              ) : (
                <CardSkeletonLoader noOfCards={3} />
              )}
              {loadingQuotes && <CardSkeletonLoader noOfCards={1} />}
            </div>
            <div
              className="col-md-3"
              style={{ padding: "0px 5px" }}
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
              <AssistantCard PrimaryColor={PrimaryColor} SecondaryShade={SecondaryShade}>
                <span className="head">Health Insurance Assistance</span>
                <p className="my-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  eu nisl a lorem auctor ultrices auctor vel elit. Aliquam quis
                  consequat tellus. Aliquam pellentesque ligula massa, aliquet
                  fermentum nisl varius ac.
                </p>
                <div
                  css={`
                    display: flex;
                    justify-content: space-between;
                  `}
                >
                  <button
                    className="talk_to_us my-2"
                    style={{ padding: "8px 15px", height: "max-content" }}
                  >
                    Talk to us
                  </button>

                  <AssistantImage src={call} />
                </div>
              </AssistantCard>
            </div>
          </div>
        </div>
        {showBuyNow && (
          <BuyNowModal showBuyNow={showBuyNow} setShowBuyNow={setShowBuyNow} />
        )}
        <ComparePopup showPopup={showPopup} groupCode={groupCode} />
        {showSeeDetails && (
          <SeeDetails
            show={showSeeDetails}
            handleClose={() => {
              setShowSeeDetails(!showSeeDetails);
              setSeeDetailsQuote({
                quote: "",
                activeSum: "",
              });
            }}
            quote={seeDetailsQuote.quote}
            sum_insured={
              seeDetailsQuote.quote.sum_insured[seeDetailsQuote.activeSum]
            }
            tenure={seeDetailsQuote.quote.tenure[seeDetailsQuote.activeSum]}
            product={seeDetailsQuote.quote.product[seeDetailsQuote.activeSum]}
          />
        )}
      </div>

      <div
        css={`
          @media (min-width: 1024px) {
            display: none;
          }
        `}
      >
        <MobileHeader groupCode={groupCode} />
        <MobilePlansFor />
        <div
          css={`
            padding: 10px 15px;

            padding-bottom: 300px;
            @media (max-width: 768px) {
              display: none;
            }
          `}
        >
          {quotes?.length ? (
            firstQuoteFound &&
            filterQuotes.map((item, index) =>
              item.length ? (
                <QuoteCard
                  key={index}
                  id={index}
                  item={item}
                  handleSeeDetails={(quote, clickedFrom) => {
                    dispatch(removeQuoteFromCart(groupCode));
                    setSeeDetailsQuote(quote);
                    setShowSeeDetails(clickedFrom || true);
                  }}
                  handleClick={() => setShowBuyNow(true)}
                />
              ) : (
                <></>
              )
            )
          ) : (
            <CardSkeletonLoader noOfCards={3} />
          )}
          {loadingQuotes && <CardSkeletonLoader noOfCards={1} />}
        </div>
        <div
          css={`
            padding-bottom: 71px;

            @media (min-width: 769px) {
              display: none !important;
            }
          `}
        >
          {quotes.length ? (
            // filterQuotes.length > 1 ? (
            firstQuoteFound ? (
              filterQuotes.map(
                (item, index) =>
                  item.length > 0 && (
                    <MobileQuoteCard
                      key={index}
                      id={index}
                      item={item}
                      handleClick={() => setShowBuyNow(true)}
                      handleSeeDetails={(quote) => {
                        setSeeDetailsQuote(quote);
                        setShowSeeDetails(true);
                      }}
                    />
                  )
              )
            ) : (
              <></>
            )
          ) : (
            // filterQuotes.length > 1 && <p>No Quotes Found</p>
            <CardSkeletonLoader noOfCards={3} />
          )}
          {loadingQuotes && <CardSkeletonLoader noOfCards={1} />}
        </div>
        <MobileQuoteFilterFooter
          handleFilterClick={() => setFilterMobile(true)}
          sendQuote={imageSendQuote}
        />
        {/* <BuyNowModal showBuyNow={showBuyNow} setShowBuyNow={setShowBuyNow} /> */}

        <ComparePopup showPopup={showPopup} groupCode={groupCode} />
        {filterMobile && (
          <QuoteFilterMobile
            companies={arr}
            coverFilter={companies?.covers}
            setFilterMobile={setFilterMobile}
            premiumFilter={companies?.premiums}
            moreFilter={companies?.morefilters}
            planType={companies?.plantypes}
          />
        )}
      </div>
    </>
  );
}

export default QuotePage;

const AssistantCard = styled.div`
  background: ${props=>props.SecondaryShade};
  position: relative;
  top: 26px;
  @media (max-width: 1399px) {
    top: 7px;
  }
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
    color: ${props=>props.PrimaryColor};
    border: 2px solid  ${props=>props.PrimaryColor};
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
`;
