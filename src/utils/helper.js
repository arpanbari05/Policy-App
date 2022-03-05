import _, { range } from "lodash";

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

export const numToLakh = SItoConvert => {
  if (SItoConvert > 9999999) {
    let calculated = Number(SItoConvert) / Number(10000000);
    return `${calculated} ${calculated > 1 ? "Crores" : "Crore"}`;
  } else if (SItoConvert > 99999) {
    let calculated = Number(SItoConvert) / Number(100000);
    return `${calculated} ${calculated > 1 ? "Lakhs" : "Lakh"}`;
  } else {
    return SItoConvert;
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

export function getPercentageAmount(
  amount,
  percentage,
  { roundOf = true } = {},
) {
  const percentageAmount = amount * (percentage / 100);
  if (roundOf) return Math.round(percentageAmount);
  return percentageAmount;
}

export function getDiscountAmountForRiders(additionalDiscount, riders = []) {
  const { percent } = additionalDiscount;
  const discountedAmount = riders.reduce((sum, rider) => {
    const discountedAmountOfRider = getPercentageAmount(
      rider.total_premium,
      percent,
    );
    return (sum += discountedAmountOfRider);
  }, 0);

  return discountedAmount;
}

export function getRidersTotalPremium(riders = []) {
  const ridersTotalPremium = riders.reduce(
    (sum, rider) => (sum += rider.total_premium),
    0,
  );
  return ridersTotalPremium;
}

export function getDiscountAmount(additionalDiscount, cartEntry) {
  const { health_riders, riders, total_premium: basePlanPremium } = cartEntry;

  let discountedAmount = 0;

  const totalPremium = calculateTotalPremium(cartEntry);

  const {
    applied_on_riders,
    applied_on_total_premium,
    applied_on_discounts,
    percent,
  } = additionalDiscount;

  if (applied_on_total_premium) {
    const discountedAmountOnTotalPremium = getPercentageAmount(
      totalPremium,
      percent,
    );
    return discountedAmountOnTotalPremium;
  }

  if (applied_on_riders) {
    const ridersList = health_riders || riders || [];
    const applicableRiders = ridersList.filter(rider =>
      applied_on_riders.includes(rider.alias),
    );
    const ridersTotalPremium = getRidersTotalPremium(applicableRiders);
    const discountedAmount = getPercentageAmount(
      ridersTotalPremium + basePlanPremium,
      percent,
    );

    return discountedAmount;
  }

  if (applied_on_discounts) {
  }
  return discountedAmount;
}

export function calculateTotalPremium(
  cartEntry,
  { additionalDiscounts = [] } = {},
) {
  const { total_premium: basePlanPremium = 0, health_riders = [] } = cartEntry;
  const totalPremium = items =>
    items.reduce((totalPremium, item) => totalPremium + item.total_premium, 0);
  const ridersPremium = totalPremium(health_riders);

  const total_premium = ridersPremium + basePlanPremium;

  let discountedAmount = 0;

  for (let additionalDiscount of additionalDiscounts) {
    discountedAmount += getDiscountAmount(additionalDiscount, cartEntry);
  }

  const totalPremiumAfterDiscount = total_premium - discountedAmount;

  const addOnsTotalPremium = getAddOnsTotalPremium(cartEntry.addons);

  return totalPremiumAfterDiscount + addOnsTotalPremium;
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
  return Number(months / 12).toFixed(1);
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

export function mergeQuotes(quotes, { sortBy = "relevance" } = {}) {
  const mergedQuotes = {};

  for (let quote of quotes) {
    const {
      product: { name },
    } = quote;

    if (mergedQuotes[name]) {
      mergedQuotes[name] = [...mergedQuotes[name], quote];
      continue;
    }
    mergedQuotes[name] = [quote];
  }

  let sortedMergeQuotes = Object.values(mergedQuotes);

  if (sortBy === "premium-low-to-high") {
    sortedMergeQuotes = Object.values(mergedQuotes).sort();
    sortedMergeQuotes = sortedMergeQuotes.map(quotes =>
      quotes.sort((quoteA, quoteB) =>
        quoteA?.total_premium > quoteB?.total_premium ? 1 : -1,
      ),
    );

    sortedMergeQuotes = sortedMergeQuotes.sort((quotesA, quotesB) =>
      quotesA[0]?.total_premium > quotesB[0]?.total_premium ? 1 : -1,
    );
  }

  return sortedMergeQuotes;
}

export function capitalize(sentence = "") {
  return sentence.split(" ").map(_.capitalize).join(" ");
}

export function figureToWords(amount) {
  return `${parseInt(amount) / 100000} Lakhs`;
}

export function matchQuotes(
  quote1,
  quote2,
  { sum_insured = true, deductible = true } = {},
) {
  return _.every([
    quote1.product.id === quote2.product.id,
    sum_insured
      ? parseInt(quote1.sum_insured) === parseInt(quote2.sum_insured)
      : true,
    deductible ? quote1.deductible === quote2.deductible : true,
  ]);
}

export function matchGroupCodes(groupCode1, groupCode2) {
  return parseInt(groupCode1) === parseInt(groupCode2);
}

export function tenureInWords(tenure) {
  return `${tenure} ${tenure > 1 ? "Years" : "Year"}`;
}

export function getSumInsureds(quotes = []) {
  return quotes.map(quote => quote.sum_insured);
}

export function getFeature(quote, featureCode) {
  return quote.features.find(feature => feature.code === featureCode);
}

export function getFeatureForQuotes(quotes, featureCode) {
  return quotes.map(quote => {
    return getFeature(quote, featureCode);
  });
}

export function getTotalPremium(cartEntries = []) {
  let totalPremium = 0;

  for (let cartEntry of cartEntries) {
    totalPremium += +cartEntry.discounted_total_premium;
  }

  return totalPremium;
}

export function getFirstName(name = "") {
  return name.split(" ")[0];
}

export const autoCapitalizationHandler = value => {
  var splitStr = value.split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" "); /* Firstword Secondword */
};

export function getAddOnSendData(addOn) {
  const addOnCartItem = {
    deductible: addOn.deductible,
    members: addOn.members,
    premium: addOn.premium,
    product_id: addOn.product.id,
    sum_insured: addOn.sum_insured,
    tax_amount: addOn.tax_amount,
    tenure: addOn.tenure,
    total_premium: addOn.total_premium,
  };
  return addOnCartItem;
}

export function isAddOnPresent(addOn, cartEntry, { members } = {}) {
  const { addons } = cartEntry;

  if (!addons || !addons.length) return false;

  return addons.some(addOnAdded =>
    matchQuotes(addOnAdded, addOn, { sum_insured: false, deductible: false }) &&
    members
      ? _.isEqual(addOnAdded.members, members)
      : true,
  );
}

export function getInsuranceType(quote) {
  return quote.product.insurance_type.alias;
}

export function isTopUpQuote(quote) {
  const insurance_type = getInsuranceType(quote);

  return insurance_type === "top_up";
}

export function getAddOnsTotalPremium(addOns = []) {
  return addOns.reduce((sum, addOn) => (sum += addOn.total_premium), 0);
}

export function getQuoteKey(quote) {
  const { product, sum_insured } = quote;

  return `${product.id}+${sum_insured}`;
}
