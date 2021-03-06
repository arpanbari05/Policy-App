import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import html2canvas from "html2canvas";
import { sendEmailAction } from "../ComparePage/compare.slice";
import useQuoteFilter from "./components/filters/useQuoteFilter";
import {
  clearFilterQuotes,
  setFilters,
  premiumFilterCards,
  setShouldFetchQuotes,
} from "./quote.slice";
import { useFrontendBoot } from "../../customHooks/index";

function useQuotesPage() {
  const { companies } = useFrontendBoot()?.data;

  const imageSendQuote = (email, stage) => {
    const input = document.getElementById("printQuotePage");

    html2canvas(input, {
      scrollX: 0,
      scrollY: -window.scrollY,
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");

      dispatch(
        sendEmailAction({
          email,
          image: imgData,
          group_id: groupCode,
          share_quote: "quote",
          stage,
        }),
      );
    });
  };

  const { fetchFilters, quotes, shouldFetchQuotes } = useSelector(
    state => state.quotePage,
  );

  const { member } = useSelector(
    ({ greetingPage }) => greetingPage.proposerDetails,
  );

  const [filterMobile, setFilterMobile] = useState(false);

  const arr = [];

  for (let company in companies?.companies) {
    arr.push(company);
  }

  const [showTalkModal, setShowTalkModal] = useState(false);

  const { filterQuotes: filterGivenQuotes } = useQuoteFilter();

  const filterQuotes = quotes.map(icQuotes => filterGivenQuotes(icQuotes));

  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [showPopup, setShowPopup] = useState(false);
  const [showSeeDetails, setShowSeeDetails] = useState(false);
  const [showBuyNow, setShowBuyNow] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [recFilterdQuotes, setRecFilterdQuotes] = useState([]);

  const { memberGroups } = useSelector(({ greetingPage }) => greetingPage);
  const { filters } = useSelector(({ quotePage }) => quotePage);

  const { groupCode } = useParams();

  const defaultfilters = {
    insurers: [],
    premium: "",
    cover: "3 to 5 Lacs",
    ownCover: "",
    multiYear: "1 Year",
    basePlanType: "Base health",
    moreFilters: {},
  };

  useEffect(() => {
    if (shouldFetchQuotes) {
      let tempfilter;
      fetchFilters.forEach(data => {
        if (`${data.id}` === +groupCode) {
          tempfilter = data.extras;
        }
      });
      tempfilter !== null &&
        dispatch(
          setFilters({
            ...tempfilter,
            cover: tempfilter?.cover || defaultfilters?.cover,
            multiYear: tempfilter?.multiYear || defaultfilters?.multiYear,
            planType:
              memberGroups?.[groupCode]?.length === 1
                ? "Individual"
                : tempfilter?.plan_type
                ? tempfilter?.plan_type === "M"
                  ? "Multi Individual"
                  : "Family Floater"
                : "Family Floater",
          }),
        );
    }

    dispatch(setShouldFetchQuotes(false));
  }, [fetchFilters]);

  useEffect(() => {
    dispatch(clearFilterQuotes());
  }, [groupCode]);

  useEffect(() => {
    if (memberGroups?.[groupCode]?.length === 1) {
      dispatch(
        setFilters({
          planType: "Individual",
        }),
      );
    } else {
      dispatch(
        setFilters({
          planType: filters.planType
            ? filters.planType === "Multi Individual"
              ? "Multi Individual"
              : "Family Floater"
            : "Family Floater",
        }),
      );
    }
  }, [groupCode, memberGroups]);

  useEffect(() => {
    if (
      filters.cover &&
      filters.multiYear &&
      memberGroups &&
      memberGroups?.[groupCode]
    ) {
      dispatch(clearFilterQuotes());
    }
  }, [
    filters.insurers,
    filters.ownCover,
    filters.planType,
    filters.multiYear,
    filters.basePlanType,
    // filters.moreFilters,
    filters.cover,
    groupCode,
    memberGroups,
  ]);

  useEffect(() => {
    if (filters.premium) {
      dispatch(premiumFilterCards(filters.premium));
    }
  }, [
    filters.premium,
    filters.cover,
    filters.ownCover,
    filters.planType,
    filters.multiYear,
    filters.basePlanType,
  ]);

  const sortByData = [
    { id: 1, title: `Relevance` },
    { id: 2, title: `Premium low to high` },
  ];

  const quotesLength = quotes.reduce(
    (length, quotes) => length + quotes?.length,
    0,
  );

  const [sortBy, setSortBy] = useState("Relevance");

  if (sortBy === "Premium low to high") {
    filterQuotes?.sort((a, b) => {
      if (!a[0] && !b[0]) return 0;
      if (a[0] && !b[0]) return 1;
      if (!a[0] && b[0]) return -1;
      if (a[0]?.total_premium > b[0]?.total_premium) {
        return 1;
      }
      return -1;
    });
  }
  if (sortBy === "Premium high to low") {
    filterQuotes?.sort((a, b) => {
      if (!a[0] && !b[0]) return 0;
      if (a[0] && !b[0]) return -1;
      if (!a[0] && b[0]) return 1;
      if (a[0]?.total_premium > b[0]?.total_premium) {
        return -1;
      }
      return 1;
    });
  }

  return {
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
  };
}

export default useQuotesPage;
