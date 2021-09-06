import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
// import { updateQuotes } from "../ComparePage/compare.slice";
// import { updateUser } from "../InputPage/ServiceApi/serviceApi";
// import { getRecommendedQuotesOnMount } from "../RecommendedPage/recommendedPage.slice";
import useQuoteFilter from "./components/filters/useQuoteFilter";
import {
    clearFilterQuotes,
    fetchQuotes,
    getCartItem,
    saveQuotesData,
    setFilters,
    setShouldFetchQuotes,
    insurerFilter
} from "./quote.slice";
import { updateGroups } from "./serviceApi";

function useQuotesPage() {
    const companies = useSelector(
        ({ frontendBoot }) => frontendBoot.frontendData.data,
    );

    const {
        fetchFilters,
        quotes,
        filterQuotes: QuotesToAdd,
        shouldFetchQuotes,
    } = useSelector(state => state.quotePage);

    const { cover, tenure, plan_type } = useSelector(
        ({ frontendBoot }) => frontendBoot.frontendData.data.defaultfilters,
    );
    const { data } = useSelector(({ frontendBoot }) => frontendBoot.frontendData);

    const findCode = (fitlerName, fitlerValue) => {
        let code;
        data[fitlerName].forEach(data => {
            if (data.display_name === fitlerValue) {
                code = data.code;
            }
        });
        return code;
    };

    const { member, plan_type: proposerPlanType } = useSelector(
        ({ greetingPage }) => greetingPage.proposerDetails,
    );

    useEffect(() => {

        if (shouldFetchQuotes) {
            let tempfilter;
            fetchFilters.forEach(data => {
                if (`${data.id}` === groupCode) {
                    tempfilter = data.extras;
                }
            });

            tempfilter !== null && dispatch(setFilters(tempfilter));
            console.log("company", companies, "cover", cover, "tenure", tenure, "pro", proposerDetails, "ses", selectedGroup);
            dispatch(
                fetchQuotes(companies?.companies, {
                    sum_insured:
                        // tempfilter?.cover !== null
                        //     ? findCode("covers", tempfilter?.cover)
                        //     : 
                        cover,
                    tenure,
                    member: selectedGroup,
                    plan_type:
                        memberGroups[selectedGroup].length === 1
                            ? "I"
                            : proposerDetails.plan_type
                                ? proposerDetails.plan_type === "M"
                                    ? "M"
                                    : "F"
                                : "F",
                }),
            );
        }

        dispatch(setShouldFetchQuotes(false));
    }, [fetchFilters]);

    const [filterMobile, setFilterMobile] = useState(false);

    const arr = [];

    for (let company in companies?.companies) {
        arr.push(company);
    }

    const [showTalkModal, setShowTalkModal] = useState(false);

    const { filterQuotes: filterGivenQuotes } = useQuoteFilter();

    const filterQuotes = quotes.map(icQuotes => filterGivenQuotes(icQuotes));

    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const [showSeeDetails, setShowSeeDetails] = useState(false);
    const [showBuyNow, setShowBuyNow] = useState(false);
    const [recFilterdQuotes, setRecFilterdQuotes] = useState([]);

    const { memberGroups, proposerDetails } = useSelector(
        ({ greetingPage }) => greetingPage,
    );
    const { selectedGroup, filters } = useSelector(({ quotePage }) => quotePage);

    const initRef = useRef(true);

    const { groupCode } = useParams();

    // const recommendedQuotes = useSelector(
    //     ({ recommendedPage }) => recommendedPage.recommendedQuotes[groupCode],
    // );

    const updateFilter = async filters => {
        try {
            await updateGroups({
                groupCode,
                data: {
                    // id: groupCode,
                    // //format
                    // // sum_insured: "1500000",
                    // tenure: filters.multiYear.slice(0, 1),
                    // sum_insured_range: findCode("covers", filters.cover),
                    // plan_type: findCode("plantypes", filters.planType),
                    // premium_range: filters.premium.code,
                    // base_plan_type: "arogya_sanjeevani",
                    // // company_aliases: ["star", "icici_lombard"],
                    extras: filters,
                    plan_type: findCode("plantypes", filters.planType),
                },
            });
        } catch { }
    };

    useEffect(() => {
        updateFilter(filters);
    }, [filters]);


    /////////////////////////////////////////////////////////////////=====>compare

    //   useEffect(() => {
    //     dispatch(
    //       //  updateQuotes({ product_id: quotesForCompare, group_id: groupCode }),
    //       updateQuotes({
    //         products: {},
    //       }),
    //     );

    //   }, []);



    //   useEffect(() => {
    //     const tempArray = [];
    //     if (recommendedQuotes?.length) {
    //       recommendedQuotes.forEach(element => {
    //         filterQuotes.forEach(data => {
    //           data.forEach(dataSecond => {
    //             if (
    //               element.product.id === dataSecond.product.id &&
    //               `${element.sum_insured}` === `${dataSecond.sum_insured}`
    //             ) {
    //               tempArray.push([{ ...dataSecond, score: element.score }]);
    //             }
    //           });
    //         });
    //       });
    //     }
    //     setRecFilterdQuotes(tempArray);
    //   }, [recommendedQuotes, quotes]);

    //   const defaultfilters = {
    //     insurers: [],
    //     premium: "",
    //     cover: "3 to 5 Lacs",
    //     ownCover: "",
    //     multiYear: "1 Year",
    //     basePlanType: "Base health",
    //     moreFilters: {},
    //   };

    //   useEffect(() => {
    //     dispatch(clearFilterQuotes());
    //   }, [groupCode]);
    //   useEffect(() => {
    //     if (Object.keys(memberGroups) && !initRef.current) {
    //       dispatch(
    //         fetchQuotes(companies?.companies, {
    //           sum_insured: cover,
    //           tenure,
    //           member: selectedGroup,
    //           plan_type:
    //             memberGroups[selectedGroup].length === 1
    //               ? "I"
    //               : proposerDetails.plan_type
    //               ? proposerDetails.plan_type === "M"
    //                 ? "M"
    //                 : "F"
    //               : "F",
    //         }),
    //       );

    //       // if (filterQuotes.length < 2) {
    //       //   arr?.forEach((item) =>
    //       //     dispatch(
    //       //       saveQuotesData({
    //       //         alias: item,
    //       //         type: "normal",
    //       //         sum_insured: cover,
    //       //         tenure,
    //       //         member: member.filter(m => m.group === "group_code_1"),
    //       //         plan_type,
    //       //       })
    //       //     )
    //       //   );
    //       // }
    //     }
    //     if (fetchFilters.length < 1) {
    //       if (initRef.current) {
    //         dispatch(setFilters(defaultfilters));
    //       }
    //       initRef.current = false;
    //     }
    //   }, [memberGroups]);

    //   useEffect(() => {
    //     dispatch(getRecommendedQuotesOnMount(groupCode));
    //     dispatch(getCartItem());
    //   }, []);

    //   useEffect(() => {
    //     if (filterMobile) {
    //       setdisplayNavbar(false);
    //     } else {
    //       setdisplayNavbar(true);
    //     }
    //   }, [filterMobile]);

    const sortByData = [
        { id: 1, title: `Relevance` },
        { id: 2, title: `Premium low to high` }
        // { id: 2, title: `Premium high to low` },
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
        quotesLength,
        member,
        setSortBy,
        recFilterdQuotes,
    };
}

export default useQuotesPage;
