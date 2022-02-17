import { useParams } from "react-router-dom";
import {
  useGetEnquiriesQuery,
  useGetFrontendBootQuery,
} from "../../../../api/api";
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

const defaultFilters = {
  baseplantype: "base_health",
  plantype: "F",
};

function useFilters() {
  const { groupCode } = useParams();
  let {
    data: { defaultfilters, morefilters, ...filters },
  } = useGetFrontendBootQuery();
  const {
    data: {
      data: {
        groups,
        input: { deductible },
      },
    },
  } = useGetEnquiriesQuery();

  let currentGroup = groups.find(group => group.id === parseInt(groupCode));

  const { extras } = currentGroup;

  defaultfilters = { ...defaultfilters, ...defaultFilters };

  function getSelectedFilter(code) {
    if (extras) {
      if (code === "insurers") {
        if (extras["insurers"]) return extras["insurers"];
        return [];
      }
      if (code === "tenure") {
        if (extras["tenure"]) return extras["tenure"];
        return tenures.find(tenure => tenure.code === defaultfilters["tenure"]);
      }
      if (extras[code]) {
        if (code === "cover") {
          const selectedFilterCode = extras[code].code;
          if (extras[code].custom) {
            return {
              code: selectedFilterCode,
              display_name: displayNameSelector(extras[code].custom),
              custom: extras[code].custom,
            };
          }
        }
        if (code === "deductible") return extras[code];
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
    return filters[CODE_FILTERS[code]].find(
      filter => filter.code === defaultfilters[code],
    );
  }

  const isFiltersDefault = !!!extras;

  return { getSelectedFilter, isFiltersDefault };
}

export default useFilters;
