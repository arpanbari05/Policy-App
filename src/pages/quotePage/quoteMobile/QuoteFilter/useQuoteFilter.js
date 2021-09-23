import { useSelector } from "react-redux";
import { useParams } from "react-router";

const getMinOfArray = numArray => Math.max.apply(null, numArray);

const includesDigits = (str = "") => str.match(/(\d+)/);

const getNumberFromString = (str = "") =>
  includesDigits(str) ? parseInt(includesDigits(str)[0]) : null;

const findSelectedFilterObject = (filters, selectedFilter) => {
  if (typeof selectedFilter === "object")
    return selectedFilter.map(selected =>
      filters.options.find(filter => selected.includes(filter.display_name)),
    );
  if (typeof selectedFilter === "string")
    return filters.options.find(
      filter => filter.display_name === selectedFilter,
    );
};

const findFeature = quote => featureCode =>
  quote.features.find(feature => feature.code === featureCode);

const checkFeature = quote => featureObject => {
  const feature = findFeature(quote)(featureObject.code);

  if (!feature) return false;

  const { operator, value_to_compare } = featureObject;

  const value = feature.value.toUpperCase();
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
  const { insurers, premium, moreFilters } = useSelector(
    state => state.quotePage.filters,
  );

  const morefilters = useSelector(
    state => state.frontendBoot.frontendData.data.morefilters,
  );

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
    popularFilter: popularFiltersSelected,
    others,
    preExisting,
    renewalBonus,
  } = givenMoreFilters || moreFilters;

  const [
    popularFilters,
    preExistingFilters,
    renewalBonusFilters,
    otherFilters,
  ] = morefilters;

  const popularFilter = popularFiltersSelected
    ? popularFiltersSelected.filter(
        option => option !== "No Pre-policy Check up",
      )
    : popularFiltersSelected;

  const isNoPreMedicalSelected = popularFiltersSelected
    ? popularFiltersSelected.includes("No Pre-policy Check up")
    : false;

  const selectedPopularFilters = findSelectedFilterObject(
    {
      ...popularFilters,
      options: popularFilters.options.filter(
        option => option.code !== "no pre policy check up",
      ),
    },
    popularFilter,
  );

  const selectedPreExistingFilter = findSelectedFilterObject(
    preExistingFilters,
    preExisting,
  );

  const selectedRenewalBonusFilter = findSelectedFilterObject(
    renewalBonusFilters,
    renewalBonus,
  );

  const selectedOtherFilters = findSelectedFilterObject(otherFilters, others);

  const selectedPremiumCode = premium?.code;

  function filterQuote(quote) {
    let isCompanyMatch = false;
    let isPremiumMatch = false;
    const { company_alias, total_premium: premium } = quote;

    if (insurers.length) {
      if (insurers.some(i => i.alias === company_alias)) isCompanyMatch = true;
      else isCompanyMatch = false;
    } else isCompanyMatch = true;

    if (selectedPremiumCode) {
      if (selectedPremiumCode.includes("-")) {
        const lowest = selectedPremiumCode.split("-")[0];
        const highest = selectedPremiumCode.split("-")[1];
        if (premium > parseInt(lowest) && premium < parseInt(highest)) {
          isPremiumMatch = true;
        } else isPremiumMatch = false;
      }
    } else isPremiumMatch = true;

    const checkFeatureMatch = checkFeature(quote);

    const filterMatch = filter => (filter ? checkFeatureMatch(filter) : true);

    const filtersMatch = filters =>
      filters ? filters.every(filter => checkFeatureMatch(filter)) : true;

    const isPopularFiltersMatch = filtersMatch(selectedPopularFilters);
    const isOtherFiltersMatch = filtersMatch(selectedOtherFilters);
    const isRenewalBonusMatch = filterMatch(selectedRenewalBonusFilter);
    const isPreExistingMatch = filterMatch(selectedPreExistingFilter);

    const isNoPreMedicalMatch = isNoPreMedicalSelected
      ? minAge < quote.ppmc_age_limit
      : true;

    return (
      isCompanyMatch &&
      isPremiumMatch &&
      isPopularFiltersMatch &&
      isOtherFiltersMatch &&
      isPreExistingMatch &&
      isRenewalBonusMatch &&
      isNoPreMedicalMatch
    );
  }

  function filterQuotes(quotes) {
    return quotes?.filter(filterQuote);
  }

  return { filterQuote, filterQuotes };
}

export default useQuoteFilter;
