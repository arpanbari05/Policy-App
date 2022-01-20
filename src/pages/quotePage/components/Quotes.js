import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetEnquiriesQuery,
  useGetFrontendBootQuery,
  useGetQuotesQuery,
} from "../../../api/api";
import CardSkeletonLoader from "../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import QuoteCards from "./QuoteCards";
import { useEffect } from "react";
import { setQuotesForSortForIC } from "../quote.slice";
import { useCompanies, useFrontendBoot } from "../../../customHooks";

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
  const insurersToFetch = useInsurersToFetch();

  return insurersToFetch.map(insurer => (
    <FetchQuote insurer={insurer} key={insurer} />
  ));
}

function useInsurersToFetch() {
  const {
    data: {
      data: { groups },
    },
  } = useGetEnquiriesQuery();

  const { groupCode } = useParams();

  let filteredInsurers = [];

  let currentGroup = groups.find(group => group.id === parseInt(groupCode));

  if (currentGroup) {
    const { extras } = currentGroup;
    if (extras && extras.insurers) filteredInsurers = extras.insurers;
  }

  const { companies: allInsurers } = useCompanies();

  const insurersToFetch = filteredInsurers.length
    ? filteredInsurers.map(insurer => insurer.alias)
    : Object.keys(allInsurers);

  return insurersToFetch;
}
