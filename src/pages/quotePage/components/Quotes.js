import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetCustomQuotesQuery,
  useGetEnquiriesQuery,
  useGetFrontendBootQuery,
  useGetQuotesQuery,
} from "../../../api/api";
import CardSkeletonLoader from "../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import QuoteCards from "./QuoteCards";
import { useEffect } from "react";
import { setQuotesForSortForIC } from "../quote.slice";
import {
  useCompanies,
  useFrontendBoot,
  useGetQuotes,
} from "../../../customHooks";
import useFilters from "./filters/useFilters";

function Quotes() {
  const { isLoading, isUninitialized } = useGetEnquiriesQuery();

  if (isLoading || isUninitialized) return <p>Loading enquiries</p>;

  return <FetchQuotes />;
}

export default Quotes;

function useQuote(insurer) {
  const dispatch = useDispatch();
  const { groupCode } = useParams();
  const {
    data: {
      defaultfilters: { cover, tenure, plan_type },
    },
  } = useGetFrontendBootQuery();
  let {
    data: {
      data: {
        groups,
        input: { deductible },
      },
    },
  } = useGetEnquiriesQuery();

  let currentGroup = groups.find(group => group.id === parseInt(groupCode));

  let tenureFilter = tenure;
  let coverFilter = cover;
  let base_plan_type = "base_health";
  let planTypeFilter = plan_type;

  if (currentGroup && currentGroup.extras) {
    const { extras } = currentGroup;
    if (extras.tenure) tenureFilter = extras.tenure.code;
    if (extras.cover) coverFilter = extras.cover.code;
    if (extras.baseplantype) base_plan_type = extras.baseplantype.code;
    if (extras.plantype) planTypeFilter = extras.plantype.code;
    if (extras.deductible) deductible = extras.deductible.code;
  }

  const { journeyType } = useFrontendBoot();

  const { data, ...getQuoteQuery } = useGetQuotesQuery({
    alias: insurer,
    group: groupCode,
    sum_insured_range: coverFilter,
    tenure: tenureFilter,
    plan_type: planTypeFilter,
    base_plan_type,
    journeyType,
    deductible,
  });

  useEffect(() => {
    dispatch(
      setQuotesForSortForIC({
        company_alias: insurer,
        quotes: { ...data, insurer },
      }),
    );
  }, [dispatch, data, insurer]);

  return { ...getQuoteQuery, data };
}

function FetchQuote({ insurer, ...props }) {
  const { isLoading, isUninitialized, isFetching, data } = useQuote(insurer);

  if (isLoading || isUninitialized || isFetching) return <CardSkeletonLoader />;

  if (!data || !data.data.length) return null;

  return <QuoteCards quotesData={data} {...props} />;
}

function FetchQuotes() {
  const { data, isLoading, isNoQuotes } = useGetQuotes();

  if (isNoQuotes) return <p>No Quotes Found!</p>;

  return (
    <div className="pb-3">
      {data?.map(insurersQuotes => (
        <QuoteCards
          key={insurersQuotes.company_alias}
          quotesData={insurersQuotes.data}
        />
      ))}
      {isLoading ? <CardSkeletonLoader /> : null}
      {/* {getCustomQuotesQuery?.data?.map((i, idx) => (
        <h1 key={idx}>{i}</h1>
      ))} */}
      {/* {insurersToFetch.map(insurer => (
        <FetchQuote insurer={insurer} key={insurer} />
      ))} */}
    </div>
  );
}
