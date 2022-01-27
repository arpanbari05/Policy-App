import { range } from "lodash";

export const formatCurrency = (number, decimals, recursiveCall) => {
  const decimalPoints = decimals || 2;
  const noOfLakhs = number / 100000;
  let displayStr;
  let isPlural;

  // Rounds off digits to decimalPoints decimal places
  function roundOf(integer) {
    return +integer.toLocaleString(undefined, {
      minimumFractionDigits: decimalPoints,
      maximumFractionDigits: decimalPoints,
    });
  }

  if (noOfLakhs >= 1 && noOfLakhs <= 99) {
    const lakhs = roundOf(noOfLakhs);
    isPlural = lakhs > 1 && !recursiveCall;
    displayStr = `${lakhs} Lakh${isPlural ? "s" : ""}`;
  } else if (noOfLakhs >= 100) {
    const crores = roundOf(noOfLakhs / 100);
    const crorePrefix =
      crores >= 100000 ? formatCurrency(crores, decimals, true) : crores;
    isPlural = crores > 1 && !recursiveCall;
    displayStr = `${crorePrefix} Crore${isPlural ? "s" : ""}`;
  } else {
    // displayStr = roundOf(+number);
    displayStr = amount(+number);
  }

  return displayStr;
};

export const numOnly = event => {
  let key = event.keyCode || event.which;
  if (
    (key >= 48 && key <= 58) ||
    (key >= 96 && key <= 105) ||
    key === 8 ||
    key === 9 ||
    key === 13 ||
    key === 37 ||
    key === 39 ||
    key === 46
  ) {
  } else {
    event.preventDefault();
  }
};

export const noSpclChars = event => {
  let key = event.keyCode;

  if (
    // !(key > 47 && key < 58) && // numeric (0-9)
    !(event.shiftKey && key > 64 && key < 91) &&
    !(key > 64 && key < 91) && // upper alpha (A-Z)
    !(key > 96 && key < 123) &&
    !(key === 8 || key === 46) &&
    !(key === 37 || key === 38 || key === 39 || key === 40) &&
    !(key === 191 || key === 189 || key === 32 || key === 9)
  ) {
    // lower alpha (a-z)
    event.preventDefault();
  }

  if (
    key === 106 ||
    key === 107 ||
    key === 110 ||
    key === 111 ||
    key === 109 ||
    key === 191 ||
    key === 189 ||
    (key >= 97 && key <= 111)
  ) {
    event.preventDefault();
  }

  if (
    event.shiftKey &&
    key > 96 &&
    key < 123 &&
    (key === 8 || key === 46 || key === 191) &&
    (key === 37 || key === 38 || key === 39 || key === 40) &&
    (key === 191 || key === 189 || key === 32 || key === 9)
  ) {
    event.preventDefault();
  }
};
export const numberToDigitWord = (
  number,
  type,
  multiple = 50000,
  roundTo = false,
) => {
  let rounded = Math.round(number / multiple) * multiple;
  const value = String(rounded);
  if (value === "1000000000") return `₹ 100 Crore`;
  if (value.length > 7) {
    let temp = rounded / Math.pow(10, 7);
    if (roundTo && !Number.isInteger(temp)) temp = temp.toFixed(roundTo);
    return temp === 1 ? `₹ ${temp} Crore` : `₹ ${temp} Crore`;
  }
  if (value.length > 5) {
    let temp = rounded / Math.pow(10, 5);
    if (roundTo && !Number.isInteger(temp)) temp = temp.toFixed(roundTo);
    return `${type !== "seeDetails" ? "₹" : ""} ${temp} Lakh`;
  }
  if (value.length > 3) {
    let temp = rounded / Math.pow(10, 3);
    if (roundTo && !Number.isInteger(temp)) temp = temp.toFixed(roundTo);
    return `₹ ${temp} Thousand`;
  }
};

export const dateUtil = e => {
  if (e.which !== 8) {
    var numChars = e.target.value.length;
    if (numChars === 2 || numChars === 5) {
      var thisVal = e.target.value;
      thisVal += "/";
      e.target.value = thisVal;
    }
  }
};

// export function range(start, end) {
//   return Array(end - start + 1)
//     .fill()
//     .map((_, idx) => start + idx);
// }

export function amount(number = 0) {
  return `₹ ${parseInt(number).toLocaleString("en-In")}`;
}

export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function calculateTotalPremium({
  total_premium: basePlanPremium = 0,
  health_riders = [],
  addons = [],
} = {}) {
  const totalPremium = items =>
    items.reduce((totalPremium, item) => totalPremium + item.total_premium, 0);
  const ridersPremium = totalPremium(health_riders);
  const addOnsPremium = totalPremium(addons);

  return ridersPremium + addOnsPremium + basePlanPremium;
}

export function getAgeList({ min_age, max_age }) {
  const minAge = parseFloat(min_age);
  const maxAge = parseFloat(max_age);
  if (minAge < 1) {
    const startMonth = getMonthsForYear(minAge);
    if (maxAge < 1) {
      const endMonth = getMonthsForYear(maxAge);
      return range(startMonth, endMonth + 1).map(month => ({
        code: monthsPercentage(month),
        display_name: month + " Months",
      }));
    }
    return range(startMonth, 12)
      .map(month => ({
        code: monthsPercentage(month),
        display_name: month + " Months",
      }))
      .concat(
        range(1, maxAge + 1).map(year => ({
          code: year,
          display_name: year + " Years",
        })),
      );
  }

  return range(minAge, maxAge + 1).map(year => ({
    code: year,
    display_name: year + " Years",
  }));
}

export function getMonthsForYear(years) {
  return Math.floor(years * 12);
}

function monthsPercentage(months) {
  return months / 12;
}

export function getRiderCartData(rider) {
  return {
    alias: rider.alias,
    description: rider.description,
    name: rider.name,
    options_selected: rider.options_selected,
    premium: rider.premium,
    rider_id: rider.id,
    tax_amount: rider.tax_amount,
    total_premium: rider.total_premium,
    id: rider.id,
  };
}

export function getQuoteSendData(quote) {
  return {
    total_premium: quote.total_premium,
    sum_insured: quote.sum_insured,
    tax_amount: quote.tax_amount,
    tenure: quote.tenure,
    product_id: quote.product.id,
    premium: quote.premium,
    service_tax: quote.tax_amount,
  };
}

export function getPlanFeatures(features, sum_insured) {
  let featureList = [];
  let innerData = {};
  features?.forEach((item, index) => {
    featureList.push({
      id: index + 1,
      title: item.name,
      description: item.description,
    });
    item?.sum_insureds[sum_insured]?.features?.forEach(innerItem => {
      innerData[item.name] = [
        ...(innerData[item.name] ? innerData[item.name] : []),
        {
          header: innerItem.title,
          short_description: innerItem.short_description,
          description: innerItem.description,
          value: innerItem.feature_value,
          icon: innerItem.other_icon,
          is_visible: innerItem.is_visible,
        },
      ];
    });
  });

  return { featureList, innerData };
}

export function getReactSelectOption({ display_name, code }) {
  return { label: display_name, value: code };
}
export function getDisplayPremium({ total_premium, tenure }) {
  return `${amount(total_premium)} / ${
    parseInt(tenure) > 1 ? `${tenure} years` : "year"
  }`;
}

export function mergeQuotes(quotes) {
  const mergedQuotes = {};

  for (let quote of quotes) {
    const {
      product: { id },
    } = quote;

    if (mergedQuotes[id]) {
      mergedQuotes[id] = [...mergedQuotes[id], quote];
      continue;
    }
    mergedQuotes[id] = [quote];
  }

  return mergedQuotes;
}
