import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useFrontendBoot } from "../../../../customHooks";
import useFilters from "./useFilters";

const noClaimBonusRange = {
  50: [0, 50],
  100: [51, 100],
  150: [101, 150],
  200: [151, 200],
};

const getMinOfArray = numArray => Math.max.apply(null, numArray);

const includesDigits = (str = "") => str.match(/(\d+)/);

const getNumberFromString = (str = "") =>
  includesDigits(str) ? parseInt(includesDigits(str)[0]) : null;

const findSelectedFilterObject = (filters, selectedFilter) => {
  if (typeof selectedFilter === "object") {
    return selectedFilter.map(selected =>
      filters.options.find(filter => selected.includes(filter.display_name)),
    );
  }
  if (typeof selectedFilter === "string") {
    return filters.options.find(
      filter => filter.display_name === selectedFilter,
    );
  }
}; // RETURNS SELECTED OPTIONS ARRAY [{}..] or OBJECT FOR EACH FILTER

const findFeature = quote => featureCode =>
  quote.features.find(feature => feature.code === featureCode);

const checkFeature = quote => featureObject => {
  const feature = findFeature(quote)(featureObject.code);
  console.log("The quote and featureObject", quote, featureObject);
  if (!feature) return false;

  const { operator, value_to_compare, code } = featureObject;

  const value = feature.value.toUpperCase();

  if (code === "no_claim_bonus" && operator === "equals") {
    const upto = getNumberFromString(value);
    const valueToCompare = getNumberFromString(value_to_compare);

    const [min, max] = noClaimBonusRange[valueToCompare];

    return upto >= min && upto <= max;
  }

  const valueToCompare =
    typeof value_to_compare === "string"
      ? value_to_compare.toUpperCase()
      : value_to_compare.map(val => val.toUpperCase());

  if (operator === "equals") return value === valueToCompare;
  if (operator === "not_equals") return value !== valueToCompare;
  if (operator === "in_array") return valueToCompare.includes(value);
  if (operator === "less_than_equals")
    return getNumberFromString(value) <= getNumberFromString(valueToCompare);
  return true;
};

function useQuoteFilter({ givenMoreFilters } = {}) {
  const {
    // insurers,
    // premium,
    moreFilters,
  } = useSelector(state => state.quotePage.filters);

  const { getSelectedFilter } = useFilters();

  const insurers = getSelectedFilter("insurers");

  const {
    data: { morefilters },
  } = useFrontendBoot();

  const proposerDetailsMembers = useSelector(
    state => state.greetingPage.proposerDetails.members,
  );

  const memberGroups = useSelector(state => state.greetingPage.memberGroups);

  const { groupCode } = useParams();

  const currentGroupMembersAge = memberGroups[groupCode]?.map(
    member => proposerDetailsMembers?.find(m => m.type === member)?.age,
  );

  const minAge = getMinOfArray(currentGroupMembersAge);

  const {
    popular_filters: popularFiltersSelected,
    pre_existing_ailments: preExisting,
    no_claim_bonus: noClaim,
    others,
  } = givenMoreFilters || moreFilters; // SELECTED FILTER OPTIONS

  const [popularFilters, preExistingFilters, noClaimFilters, otherFilters] =
    morefilters; // ALL AVAILABLE FILTER OPTIONS

  const popularFiltersSelectedNameArray = popularFiltersSelected
    ? popularFiltersSelected.map(
        singleSelectedOption => singleSelectedOption.display_name,
      )
    : [];

  const popularFiltersSelectedNameArrayAlt = popularFiltersSelectedNameArray
    ? popularFiltersSelectedNameArray.filter(
        option => option !== "No Pre-policy Check up",
      )
    : popularFiltersSelected;

  const isNoPreMedicalSelected = popularFiltersSelectedNameArray
    ? popularFiltersSelectedNameArray.includes("No Pre-policy Check up")
    : false;

  const selectedPopularFiltersArray = findSelectedFilterObject(
    {
      ...popularFilters,
      options: popularFilters.options.filter(
        option => option.code !== "no pre policy check up",
      ),
    },
    popularFiltersSelectedNameArrayAlt,
  );

  const selectedPreExistingFilterObject = findSelectedFilterObject(
    preExistingFilters,
    preExisting,
  );

  const selectedNoClaimFilterObject = findSelectedFilterObject(
    noClaimFilters,
    noClaim,
  );

  const selectedOtherFiltersArray = findSelectedFilterObject(
    otherFilters,
    others,
  );

  // const selectedPremiumCode = premium?.code;

  const selectedPremiumCode = getSelectedFilter("premium")?.code;

  function filterQuote(quote) {
    let isCompanyMatch = false;
    let isPremiumMatch = false;
    const { company_alias, total_premium: premiumOriginal } = quote;
    let premium = premiumOriginal;

    if (insurers.length) {
      if (insurers.some(i => i.alias === company_alias)) isCompanyMatch = true;
      else isCompanyMatch = false;
    } else isCompanyMatch = true;

    // will calulate the total overall premium.
    if (quote.mandatory_riders.length > 0) {
      premium =
        premium +
        quote.mandatory_riders
          .map(item => item.total_premium)
          .reduce((acc, item) => (acc += item));
    }

    if (selectedPremiumCode) {
      if (selectedPremiumCode.includes("<")) {
        const tempPremium = selectedPremiumCode.split("<")[1];
        if (premium <= parseInt(tempPremium)) {
          isPremiumMatch = true;
        } else isPremiumMatch = false;
      } else if (selectedPremiumCode.includes(">")) {
        const tempPremium = selectedPremiumCode.split(">")[1];
        if (parseInt(premium) >= parseInt(tempPremium)) {
          isPremiumMatch = true;
        } else isPremiumMatch = false;
      } else if (selectedPremiumCode.includes("-")) {
        const lowest = selectedPremiumCode.split("-")[0];
        const highest = selectedPremiumCode.split("-")[1];
        if (premium > parseInt(lowest) && premium < parseInt(highest)) {
          isPremiumMatch = true;
        } else isPremiumMatch = false;
      }
    } else isPremiumMatch = true;
    const checkFeatureMatch = checkFeature(quote);

    const filterMatch = filter =>
      filter ? checkFeatureMatch(...filter) : true; //Accepts {} Returns BOOL

    const filtersMatch = filters => {
      console.log("The filters", filters);
      return filters
        ? filters.every(filter => checkFeatureMatch(filter))
        : true; //Accepts [{}..] Returns BOOL
    };

    const isPopularFiltersMatch = filtersMatch(selectedPopularFiltersArray);
    const isOtherFiltersMatch = filtersMatch(selectedOtherFiltersArray);
    const isNoClaimsMatch = filterMatch(selectedNoClaimFilterArray);
    const isPreExistingMatch = filterMatch(selectedPreExistingFilterArray);

    const isNoPreMedicalMatch = isNoPreMedicalSelected
      ? minAge < quote.ppmc_age_limit
      : true;

    return (
      isCompanyMatch &&
      isPremiumMatch &&
      isPopularFiltersMatch &&
      isOtherFiltersMatch &&
      isPreExistingMatch &&
      isNoClaimsMatch &&
      isNoPreMedicalMatch
    );
  }

  function filterQuotes(quotes) {
    return quotes?.filter(filterQuote);
  }

  return { filterQuote, filterQuotes };
}

export default useQuoteFilter;
