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
    const findObj = filters.options.find(
      filter => filter.display_name === selectedFilter,
    );
    return findObj
      ? {
          ...findObj,
          code: findObj.code
            .split("_")
            .slice(0, findObj.code.split("_").length - 1)
            .join("_"), // ALTERS code KEY [ Remove when code key is same for all options ]
        }
      : undefined;
  }
}; // RETURNS SELECTED OPTIONS ARRAY [{}..] or OBJECT FOR EACH FILTER

const findFeature = quote => featureCode => {
  return quote.features.find(feature => feature.code === featureCode);
};

const checkFeature = quote => featureObject => {
  const feature = findFeature(quote)(featureObject.code);

  if (!feature) return false;

  const { operator, value_to_compare, code } = featureObject;

  console.log(
    "Thhe operater , value_to_compare , code",
    operator,
    value_to_compare,
    code,
  );

  const value = feature?.value?.toUpperCase()?.trim();

  if (code === "no_claim_bonus" && operator === "equals") {
    const upto = getNumberFromString(value);
    const valueToCompare = getNumberFromString(value_to_compare);

    const [min, max] = noClaimBonusRange[valueToCompare];

    return upto >= min && upto <= max;
  }

  const valueToCompare =
    typeof value_to_compare === "string"
      ? value_to_compare.toUpperCase().trim()
      : value_to_compare.map(val => val.toUpperCase().trim());

  if (operator === "equals") return value === valueToCompare;
  if (operator === "not_equals") return value !== valueToCompare;
  if (operator === "in_array") return valueToCompare.includes(value);
  if (operator === "less_than_equals")
    return getNumberFromString(value) <= getNumberFromString(valueToCompare);
  return true;
};

function useQuoteFilter({ givenMoreFilters } = {}) {
  const { getSelectedFilter } = useFilters();

  const insurers = getSelectedFilter("insurers");

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
    // insurers,
    // premium,
    moreFilters,
  } = useSelector(state => state.quotePage.filters);

  const {
    data: { morefilters },
  } = useFrontendBoot();

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

  const othersFiltersNameArray = others
    ? others.map(singleSelectedOption => singleSelectedOption.display_name)
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
    popularFiltersSelectedNameArrayAlt, // NAMES ARRAY
  );

  const selectedOtherFiltersArray = findSelectedFilterObject(
    otherFilters,
    othersFiltersNameArray, // NAMES ARRAY
  );

  const selectedPreExistingFilterObject = findSelectedFilterObject(
    preExistingFilters,
    preExisting ? preExisting[0].display_name : "", // NAME
  );

  const selectedNoClaimFilterObject = findSelectedFilterObject(
    noClaimFilters,
    noClaim ? noClaim[0].display_name : "", // NAME
  );

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

    const filterMatch = filter => {
      return filter ? checkFeatureMatch(filter) : true;
    }; //Accepts {} Returns BOOL

    const filtersMatch = filters => {
      return filters
        ? filters.every(filter => checkFeatureMatch(filter))
        : true; //Accepts [{}..] Returns BOOL
    };

    const isPopularFiltersMatch = filtersMatch(selectedPopularFiltersArray);
    const isOtherFiltersMatch = filtersMatch(selectedOtherFiltersArray);
    const isNoClaimsMatch = filterMatch(selectedNoClaimFilterObject);
    const isPreExistingMatch = filterMatch(selectedPreExistingFilterObject);

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
