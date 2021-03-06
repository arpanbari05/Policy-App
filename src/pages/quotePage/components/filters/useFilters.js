import { useParams } from "react-router-dom";
import { useGetEnquiriesQuery } from "../../../../api/api";
import { useFrontendBoot } from "../../../../customHooks";
import { formatCurrency } from "../../../../utils/helper";

const displayNameSelector = str => {
  if (str.includes("Lac")) {
    return str;
  } else {
    let inputCover = Number(str);
    return inputCover < 9999999
      ? `upto ${inputCover / 100000} ${
          inputCover / 100000 === 1 ? "lac" : "lacs"
        }`
      : `upto ${inputCover / 10000000} ${
          inputCover / 10000000 === 1 ? "cr." : "crs."
        }`;
  }
};

const CODE_FILTERS = {
  cover: "covers",
  premium: "premiums",
  plantype: "plantypes",
  baseplantype: "baseplantypes",
};

const tenures = [
  { code: "1", display_name: "1 Year" },
  { code: "2", display_name: "2 Year" },
  { code: "3", display_name: "3 Year" },
];

function useFilters() {
  const { groupCode } = useParams();

  const { data } = useGetEnquiriesQuery();

  let {
    data: { defaultfilters, morefilters, ...filters },
    journeyType,
    subJourneyType,
  } = useFrontendBoot();

  const defaultFilters = {
    baseplantype:
      journeyType === "top_up"
        ? "topup_plan"
        : subJourneyType === "port"
        ? "port_plan"
        : "base_health", //logic for default plan type filter
    plantype: "F",
  };

  let {
    data: {
      data: { input, groups },
    },
  } = useGetEnquiriesQuery();

  const reduxGroup =
    localStorage.getItem("groups") &&
    JSON.parse(localStorage.getItem("groups"));

  const defaultPolicyTypeFilter = localStorage.getItem("default_filters")
    ? JSON.parse(localStorage.getItem("default_filters"))?.plan_type
    : "F";

  if (reduxGroup?.length) {
    const updatedGroup = data.data?.groups?.map(group => {
      const reduxGroupMatch = reduxGroup?.find(reGrp => {
        return reGrp?.members?.some(mem => group?.members?.includes(mem));
      });
      return {
        ...group,
        city: group?.city || reduxGroupMatch?.city,
        pincode: group?.pincode || reduxGroupMatch?.pincode,
        extras: {
          ...group?.extras,
          ...reduxGroupMatch?.extras,
          plantype:
            group?.members?.length === 1
              ? group?.extras?.plantype
              : reduxGroupMatch?.extras?.plantype,
        },
        plan_type:
          group?.members?.length === 1
            ? "I"
            : reduxGroupMatch?.plan_type !== "I"
            ? reduxGroupMatch?.plan_type || defaultPolicyTypeFilter
            : defaultPolicyTypeFilter,
        // reduxGroupMatch?.plan_type || group?.members?.length === 1
        //   ? group?.plan_type
        //   : defaultPolicyTypeFilter,
      };
    });

    groups = updatedGroup;
    localStorage.setItem("groups", JSON.stringify(updatedGroup));
  }

  let currentGroup = groups.find(group => group?.id === parseInt(groupCode));

  const extras = currentGroup?.extras || {};

  const deductible = input?.deductible;

  defaultfilters = { ...defaultfilters, ...defaultFilters };

  function getSelectedFilter(code) {
    if (extras) {
      if (code === "insurers") {
        if (extras["insurers"]) return extras["insurers"];
        return [];
      }
      if (code === "tenure") {
        // if (extras["tenure"]) return extras["tenure"];
        if (extras["tenure"])
          return (
            tenures.find(tenure => tenure.code === extras["tenure"]) ||
            extras["tenure"]
          );
        return tenures.find(tenure => tenure.code === defaultfilters["tenure"]);
      }
      if (extras[code]) {
        if (code === "cover") {
          const selectedFilterCode = extras[code].code || extras[code];
          if (extras[code].custom) {
            return {
              code: selectedFilterCode,
              display_name: displayNameSelector(extras[code].custom),
              custom: extras[code].custom,
            };
          }
        }
        if (code === "deductible") return extras[code];
        const moreFilter = morefilters?.find(filter => filter.code === code);

        if (moreFilter) {
          return extras ? extras[code] : undefined;
        }
        const selectedFilterCode = extras[code].code;
        return filters[CODE_FILTERS[code]].find(
          filter => filter.code === selectedFilterCode,
        );
      }
    }
    if (code === "insurers") return [];
    if (code === "tenure")
      return tenures.find(tenure => tenure.code === defaultfilters["tenure"]);
    if (code === "deductible")
      return { code: deductible, display_name: formatCurrency(deductible) };
    const moreFilter = morefilters.find(filter => filter.code === code);

    if (moreFilter) {
      return extras ? extras[code] : undefined;
    }

    if (code === "baseplantype") {
      return filters[CODE_FILTERS[code]].find(
        filter => filter.code === defaultfilters[code],
      );
    }

    if (code === "plantype") {
      const currGroup = groups?.find(
        singleGroup => singleGroup.id === +groupCode,
      );
      return filters[CODE_FILTERS[code]].find(
        filter => filter.code === currGroup?.plan_type,
      );
    }

    return filters[CODE_FILTERS[code]].find(
      filter => filter?.code === defaultfilters[code],
    );
  }

  const { cover, baseplantype, tenure } = defaultfilters;
  const selectedCover = getSelectedFilter("cover");
  const selectedPlanType = getSelectedFilter("plantype");
  const selectedTenure = getSelectedFilter("tenure");
  const selectedBasePlanType = getSelectedFilter("baseplantype");
  const selectedInsurers = getSelectedFilter("insurers");
  const selectedDeductible = getSelectedFilter("deductible");
  const selectedPremium = getSelectedFilter("premium");

  const isFiltersDefault =
    selectedCover?.code === cover &&
    Boolean(!selectedPremium) &&
    (selectedPlanType?.code === defaultPolicyTypeFilter ||
      selectedPlanType?.code === "I") &&
    selectedBasePlanType?.code === baseplantype &&
    selectedTenure?.code === tenure &&
    selectedInsurers?.length < 1 &&
    (selectedDeductible?.code
      ? selectedDeductible?.code === deductible
      : true) &&
    !extras?.others?.length &&
    !extras?.pre_existing_ailments?.length &&
    !extras?.popular_filters?.length &&
    !extras?.no_claim_bonus?.length;

  return { getSelectedFilter, isFiltersDefault };
}

export default useFilters;
