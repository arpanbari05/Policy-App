import _, { range } from "lodash";
import clickSound from "../assets/audio/button-click.mp3";

// all on specific urls
export const allowOnWebsites = (sites = []) => {
  const renewBuyAll = ["rbstaging.in", "renewbuy.com"];
  const pincAll = ["pincinsurance.com", "pinctree.com"];
  const healthAll = [
    "https://healthdemo-gbk1bfj4vz7bg2mxwhgvlaws2uebzxb4.fynity.in",
    "https://topupdemo-gbk1bfj4vz7bg2mxwhgvlaws2uebzxb4.fynity.in",
  ];
  const allUat = [
    "https://uathealth.rbstaging.in",
    "https://renewbuy-health.fynity.in",
    "https://healthdemo-gbk1bfj4vz7bg2mxwhgvlaws2uebzxb4.fynity.in",
    "https://topupdemo-gbk1bfj4vz7bg2mxwhgvlaws2uebzxb4.fynity.in",
    "http://localhost:3000",
    "https://health-uat.nammacover.com",
    "https://uat-health.pincinsurance.com",
    "https://uat-topup.rbstaging.in",
    "https://uathealth.analahinsurance.com",
  ];
  const healthUat =
    "https://healthdemo-gbk1bfj4vz7bg2mxwhgvlaws2uebzxb4.fynity.in";
  const renewBuyUat = [
    "https://uathealth.rbstaging.in",
    "https://renewbuy-health.fynity.in",
  ];
  const renewBuyProd = "https://health.renewbuy.com";
  const topup = [
    "https://topupdemo-gbk1bfj4vz7bg2mxwhgvlaws2uebzxb4.fynity.in",
  ];
  const sriyahUat = "https://health-uat.nammacover.com";
  const pincUat = "https://uat-health.pincinsurance.com";
  const pincProd = "https://health.pinctree.com";
  const topupRB = "https://uat-topup.rbstaging.in";
  const origin = window.location.origin;

  let isPass = false;
  sites.map(site => {
    if (site === "topup") {
      if (origin.includes("http://localhost")) {
        isPass = true;
      }
      if (topup.includes(origin)) {
        isPass = true;
      }
    }
    if (site === "healthUat") {
      if (healthUat.includes(origin)) {
        isPass = true;
      }
    }
    if (site === "renewBuyProd") {
      if (renewBuyProd === origin) {
        isPass = true;
      }
    }

    if (site === "renewBuyUat") {
      if (renewBuyUat.includes(origin)) {
        isPass = true;
      }
    }

    if (site === "sriyahUat") {
      if (sriyahUat === origin) {
        isPass = true;
      }
    }
    if (site === "pincUat") {
      if (pincUat === origin) {
        isPass = true;
      }
    }
    if (site === "pincProd") {
      if (pincProd === origin) {
        isPass = true;
      }
    }
    if (site === "topupRB") {
      if (topupRB.includes(origin)) {
        isPass = true;
      }
    }
    if (site === "renewBuyAll") {
      renewBuyAll.forEach(value => {
        if (origin.includes(value)) {
          isPass = true;
        }
      });
    }
    if (site === "pincAll") {
      pincAll.forEach(value => {
        if (origin.includes(value)) {
          isPass = true;
        }
      });
    }
    if (site === "healthAll") {
      healthAll.forEach(value => {
        if (origin.includes(value)) {
          isPass = true;
        }
      });
    }
    if (site === "allUat") {
      allUat.forEach(value => {
        if (origin.includes(value)) {
          isPass = true;
        }
      });
    }
  });
  return isPass;
};

// allowOnSpecificPages
export function allowOnSpecificPages(pages = []) {
  let check = false;
  pages.forEach(page => {
    if (window.location.pathname.includes(page.toString())) {
      check = true;
    }
  });
  return check;
}

// input page visibility
export function inputEnquiryVisibility(settings, section) {
  if (localStorage.SSO_user) {
    return !settings?.b2b_enquiry_visibility?.includes(section);
  } else {
    return !settings?.b2c_enquiry_visibility?.includes(section);
  }
}

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
    // something has to come
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
  if (value === "1000000000") return `??? 100 Crore`;
  if (value.length > 7) {
    let temp = rounded / Math.pow(10, 7);
    if (roundTo && !Number.isInteger(temp)) temp = temp.toFixed(roundTo);
    return temp === 1 ? `??? ${temp} Crore` : `??? ${temp} Crore`;
  }
  if (value.length > 5) {
    let temp = rounded / Math.pow(10, 5);
    if (roundTo && !Number.isInteger(temp)) temp = temp.toFixed(roundTo);
    return `${type !== "seeDetails" ? "???" : ""} ${temp} Lakh`;
  }
  // if (value.length > 3) {
  //   let temp = rounded / Math.pow(10, 3);
  //   if (roundTo && !Number.isInteger(temp)) temp = temp.toFixed(roundTo);
  //   return `??? ${temp} Thousand`;
  // }
  if (number.toString().length > 3) return `??? ${number / 1000} Thousand`;
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

export function amount(number = 0) {
  return `??? ${parseInt(number).toLocaleString("en-In")}`;
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
  fixed_discount_value,
  { roundOf = true } = {},
) {
  let percentageAmount = amount * (percentage / 100);

  if (fixed_discount_value) percentageAmount = fixed_discount_value;

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
    fixed_discount_value,
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

  if (fixed_discount_value) {
    discountedAmount = +fixed_discount_value;
  }

  if (
    !applied_on_discounts &&
    !applied_on_riders &&
    !applied_on_total_premium &&
    !fixed_discount_value
  ) {
    discountedAmount = getPercentageAmount(basePlanPremium, percent);
  }

  return discountedAmount;
}

function getTotalDiscount(additionalDiscounts, product) {
  let totalPremium = null;
  let totalPremiumWithoutAddons = null;
  let totalRidersPremium = null;
  let totalAddOnsPremium = null;
  let totalDiscount = 0;

  if (product) {
    const {
      total_premium,
      health_riders,
      addons,
      discounts: discountsApplied,
    } = product;

    totalRidersPremium = health_riders?.reduce(
      (sum, rider) => sum + parseInt(rider?.total_premium),
      0,
    );

    totalAddOnsPremium = addons?.reduce(
      (sum, addon) => sum + parseInt(addon.total_premium || addon.premium),
      0,
    );

    totalPremiumWithoutAddons = parseInt(total_premium) + totalRidersPremium;

    totalPremium = totalPremiumWithoutAddons + totalAddOnsPremium;

    const findAdditionalDiscount = alias =>
      additionalDiscounts.find(discount => discount.alias === alias);

    if (discountsApplied) {
      discountsApplied.forEach(discountAlias => {
        const discount = findAdditionalDiscount(discountAlias);
        if (!discount) return;

        if (!discount?.applied_on_riders && !discount?.applied_on_discounts) {
          const discountAmount = getPercentageAmount(
            totalPremium,
            discount?.percent,
            discount?.fixed_discount_value,
          );

          totalPremium -= discountAmount;

          totalDiscount += discountAmount;
          return;
        }

        if (
          discount.applied_on_discounts &&
          discount.applied_on_discounts.some(applied_on_discount =>
            discountsApplied.includes(applied_on_discount),
          )
        ) {
          let discountAmount = 0;
          let thisTotalPremium = product.total_premium;

          discount.applied_on_discounts.forEach(applied_on_discount => {
            const appliedOnDiscount =
              findAdditionalDiscount(applied_on_discount);

            if (appliedOnDiscount.applied_on_riders) {
              const thisDiscountAmount = Math.round(
                (product.total_premium +
                  (product.health_riders
                    ? product.health_riders
                        .filter(rider =>
                          appliedOnDiscount.applied_on_riders.includes(
                            rider.alias,
                          ),
                        )
                        .reduce((sum, rider) => {
                          thisTotalPremium += rider.total_premium;
                          return sum + rider.total_premium;
                        }, 0)
                    : 0)) *
                  (appliedOnDiscount.percent / 100),
              );
              discountAmount += thisDiscountAmount;
            }
          });

          totalPremium -= getPercentageAmount(
            thisTotalPremium - discountAmount,
            discount.percent,
          );
          totalDiscount += getPercentageAmount(
            thisTotalPremium - discountAmount,
            discount.percent,
          );
          return;
        }

        if (discount.applied_on_riders) {
          const discountAmount = Math.round(
            (product.total_premium +
              (product.health_riders
                ? product.health_riders
                    .filter(rider =>
                      discount.applied_on_riders.includes(rider.alias),
                    )
                    .reduce((sum, rider) => sum + rider.total_premium, 0)
                : 0)) *
              (discount.percent / 100),
          );
          totalPremium -= discountAmount;
          totalDiscount += discountAmount;
        }
      });
    }
  }
  return totalDiscount;
}

export function calculateTotalPremium(
  cartEntry,
  { additionalDiscounts = [] } = {},
  journeyType = "health",
) {
  const {
    total_premium: basePlanPremium = 0,
    health_riders = [],
    top_up_riders = [],
  } = cartEntry;

  const totalPremium = items =>
    items.reduce((totalPremium, item) => totalPremium + item.total_premium, 0);

  let ridersPremium = totalPremium(
    journeyType === "health" ? health_riders : top_up_riders,
  );

  const total_premium = basePlanPremium;

  //? different function is used to calculate discountedAmount
  const discountedAmount = getTotalDiscount(additionalDiscounts, cartEntry);

  let totalPremiumAfterDiscount = total_premium - discountedAmount;

  const addOnsTotalPremium = getAddOnsTotalPremium(cartEntry.addons);

  // if (cartEntry?.product?.company?.alias === "royal_sundaram") {

  totalPremiumAfterDiscount += ridersPremium + addOnsTotalPremium;

  return totalPremiumAfterDiscount;
}

function getMonthsForYearFloor(years) {
  return Math.floor(years * 12);
}

export function getAgeList({ min_age, max_age }) {
  const minAge = parseFloat(min_age);
  const maxAge = parseFloat(max_age);
  if (minAge < 1) {
    const startMonth = getMonthsForYearFloor(minAge);

    if (maxAge < 1) {
      const endMonth = getMonthsForYearFloor(maxAge);
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
  return Math.round(years * 12);
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
      displayType: item.display_type[0],
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

export const getCustomIcOptions = ({
  display_name,
  code,
  dobRequire,
  expiryDateRequire,
  policyNumberRegex,
}) => {
  return {
    label: display_name,
    value: code,
    dobRequire,
    expiryDateRequire,
    policyNumberRegex,
  };
};

export function getDisplayPremium({ total_premium, tenure }) {
  return `${amount(total_premium)} / ${
    parseInt(tenure) > 1 ? `${tenure} years` : "year"
  }`;
}

export function mergeQuotes(quotes = [], { sortBy = "relevance" } = {}) {
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

  if (sortBy === "premium_low_to_high") {
    sortedMergeQuotes = Object.values(mergedQuotes).sort();
    sortedMergeQuotes = sortedMergeQuotes.map(quotes =>
      quotes.sort((quoteA, quoteB) =>
        quoteA?.total_premium > quoteB?.total_premium ? 1 : -1,
      ),
    );

    sortedMergeQuotes = sortedMergeQuotes.sort((quotesA, quotesB) =>
      quotesA[0]?.total_premium > quotesB[0]?.total_premium ? 1 : -1,
    );
  } else if (sortBy === "relevance") {
    sortedMergeQuotes = Object.values(mergedQuotes).sort();
    sortedMergeQuotes = sortedMergeQuotes.map(quotes =>
      quotes.sort((quoteA, quoteB) =>
        quoteA?.total_premium > quoteB?.total_premium ? 1 : -1,
      ),
    );

    sortedMergeQuotes = sortedMergeQuotes.sort((quotesA, quotesB) =>
      +quotesA[0]?.features
        .find(f => f?.code === "pre_existing_disease_cover")
        ?.value?.split(" ")[0] >
      +quotesB[0]?.features
        .find(f => f?.code === "pre_existing_disease_cover")
        ?.value?.split(" ")[0]
        ? 1
        : -1,
    );
  }

  return sortedMergeQuotes;
}

export function capitalize(sentence = "") {
  return sentence.split(" ").map(_.capitalize).join(" ");
}

export function figureToWords(amount) {
  const countInLakhs = parseInt(amount) / 100000;
  const countInCrores = countInLakhs / 100;
  if (countInLakhs < 100) {
    return countInLakhs > 1 ? `${countInLakhs} Lakhs` : `${countInLakhs} Lakhs`;
  } else {
    return countInCrores > 1
      ? `${countInCrores} Crores`
      : `${countInCrores} Crore`;
  }
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
    totalPremium += +cartEntry?.total_premium;
  }

  return totalPremium;
}

export function getFirstName(name = "") {
  return name?.split(" ")[0];
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
  // const { product, sum_insured } = quote;
  return `${quote?.product.id}+${quote?.sum_insured}`;
}

export function isRiderPresent(riderAlias, riders = []) {
  const isPresent = riders.some(rider => rider.alias === riderAlias);

  return isPresent;
}

export function parseJson(serialized) {
  if (typeof serialized === "string") return JSON.parse(serialized);
  return serialized;
}

//? CARE RIDERS VALIDATIONS
export const careRidersConditionChecker = (quote, riderAlias, riders) => {
  const isDisabled =
    quote?.product?.company?.name === "Care Health Insurance" &&
    riderAlias === "REDPEDWAITPRD" &&
    !riders?.find(singleRider => singleRider?.alias === "CAREWITHNCB")
      ?.isSelected;

  const showPEDRiderWarning =
    quote?.product?.company?.name === "Care Health Insurance" &&
    riderAlias === "REDPEDWAITPRD";

  return {
    isDisabled,
    showPEDRiderWarning,
  };
};

export const premiumWithAddons = (netPremium, addons = []) => {
  if (addons.length) {
    return (
      netPremium +
      addons
        .map(singleAddon => singleAddon.total_premium)
        .reduce((acc, amount) => (acc += amount))
    );
  }
  return netPremium;
};

//? year to month
export function months2years(months) {
  var dur1 = parseInt(months) / 12;
  return dur1.toFixed(2);
}

// disclaimer text
export function renderDisclaimer({ tenantName, settings }) {
  if (localStorage.SSO_user) {
    if (
      settings?.disclaimer_pos &&
      settings?.disclaimer_pos !== "" &&
      settings?.disclaimer_pos !== "<p><br></p>"
    ) {
      return settings.disclaimer_pos;
    } else {
      return `By clicking on Get Started, I hereby authorise ${
        tenantName.toLowerCase() === "sriyah" ? "Nammacover" : tenantName
      }. and all of
        its affiliates, subsidiaries, group companies and related parties to
        access the details such as my name, address, telephone number, e-mail
        address, birth date and / or anniversary date shared by me, and contact
        me to provide information on the various products and services offered.
        I understand that this consent will override my NDNC registration, if
        any. I also understand that at any point of time, I wish to stop
        receiving such communications from ${
          tenantName.toLowerCase() === "sriyah" ? "Nammacover" : tenantName
        }, I can withdraw such
        consent anytime on (to provide a contact number or email id or both)`;
    }
  } else {
    if (
      settings?.disclaimer &&
      settings?.disclaimer !== "" &&
      settings?.disclaimer !== "<p><br></p>"
    ) {
      return settings.disclaimer;
    } else {
      return `By clicking on Get Started, I hereby authorise ${
        tenantName.toLowerCase() === "sriyah" ? "Nammacover" : tenantName
      }. and all of
        its affiliates, subsidiaries, group companies and related parties to
        access the details such as my name, address, telephone number, e-mail
        address, birth date and / or anniversary date shared by me, and contact
        me to provide information on the various products and services offered.
        I understand that this consent will override my NDNC registration, if
        any. I also understand that at any point of time, I wish to stop
        receiving such communications from ${
          tenantName.toLowerCase() === "sriyah" ? "Nammacover" : tenantName
        }, I can withdraw such
        consent anytime on (to provide a contact number or email id or both)`;
    }
  }
}

// export function isThemeApp() {
//   const domain = window.location.host;
//   if (
//     domain.includes("localhost:") ||
//     domain === "renewbuy-health.fynity.in" ||
//     domain === "topupdemo-gbk1bfj4vz7bg2mxwhgvlaws2uebzxb4.fynity.in" ||
//     domain === "uat-health.pincinsurance.com"
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }

export const isSSOJourney = () => {
  return localStorage.SSO_user ? true : false;
};

export const isRelianceInfinityPlan = cartEntry =>
  cartEntry?.product?.name === "Health Infinity Individual";

export const isUsgiLifestyleDiscount = ({ discount = {} }) => {
  return discount?.alias === "usgilifestyle";
};

export const featureOptionsValidValue = featureOptions => {
  if (
    featureOptions === null ||
    featureOptions === undefined ||
    featureOptions === "[]" ||
    Array.isArray(featureOptions)
  ) {
    return {};
  }
  return JSON.parse(featureOptions);
};

export const getPolicyPremium = (policyStatus = []) => {
  if (policyStatus.length) {
    return policyStatus
      ?.map(singlePolicy => +singlePolicy?.total_premium)
      ?.reduce((acc = 0, curr) => (acc += curr));
  }
  return 0;
};

export const getTotalPremiumWithDiscount = ({
  netPremiumWithoutDiscount,
  totalDiscountAmount,
}) => {
  return +netPremiumWithoutDiscount - +totalDiscountAmount;
};

export const ClickSound = () => {
  const audio = new Audio(clickSound);
  audio.play();
};

export const regexStringToRegex = (regexString = "/^[S]*") => {
  return new RegExp(regexString);
};

export const dateObjectToLocaleString = (dateObject = new Date()) => {
  let date = dateObject?.getDate();
  let month = dateObject?.getMonth() + 1;
  const year = dateObject?.getFullYear();

  if (date < 10) {
    date = "0" + date;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${date}/${month}/${year}`;
};

export function number2text(value) {
  var fraction = Math.round(frac(value) * 100);
  var f_text = "";

  if (fraction > 0) {
    f_text = "AND " + convert_number(fraction) + " PAISE";
  }

  return "RUPEES " + convert_number(value) + f_text;
}

function frac(f) {
  return f % 1;
}

function convert_number(number) {
  if (number < 0 || number > 999999999) {
    return "NUMBER OUT OF RANGE!";
  }
  var Gn = Math.floor(number / 10000000); /* Crore */
  number -= Gn * 10000000;
  var kn = Math.floor(number / 100000); /* lakhs */
  number -= kn * 100000;
  var Hn = Math.floor(number / 1000); /* thousand */
  number -= Hn * 1000;
  var Dn = Math.floor(number / 100); /* Tens (deca) */
  number = number % 100; /* Ones */
  var tn = Math.floor(number / 10);
  var one = Math.floor(number % 10);
  var res = "";

  if (Gn > 0) {
    res += convert_number(Gn) + " CRORE";
  }
  if (kn > 0) {
    res += (res == "" ? "" : " ") + convert_number(kn) + " LAKH";
  }
  if (Hn > 0) {
    res += (res == "" ? "" : " ") + convert_number(Hn) + " THOUSAND";
  }

  if (Dn) {
    res += (res == "" ? "" : " ") + convert_number(Dn) + " HUNDRED";
  }

  var ones = Array(
    "",
    "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN",
    "ELEVEN",
    "TWELVE",
    "THIRTEEN",
    "FOURTEEN",
    "FIFTEEN",
    "SIXTEEN",
    "SEVENTEEN",
    "EIGHTEEN",
    "NINETEEN",
  );
  var tens = Array(
    "",
    "",
    "TWENTY",
    "THIRTY",
    "FOURTY",
    "FIFTY",
    "SIXTY",
    "SEVENTY",
    "EIGHTY",
    "NINETY",
  );

  if (tn > 0 || one > 0) {
    if (!(res == "")) {
      res += " AND ";
    }
    if (tn < 2) {
      res += ones[tn * 10 + one];
    } else {
      res += tens[tn];
      if (one > 0) {
        res += "-" + ones[one];
      }
    }
  }

  if (res == "") {
    res = "zero";
  }
  return res;
}

export const getAge = (birthYear = "2000") => {
  if (birthYear.length > 4) {
    birthYear = birthYear?.split("-")[2];
  }
  const currentYear = new Date().getFullYear();
  return +currentYear - +birthYear;
};

export const renewalSumInsuredGenerator = (
  currentSumInsured = 100000,
  available_sum_insureds,
) => {
  const currentSumInsuredIndex = available_sum_insureds?.indexOf(
    +currentSumInsured,
  );

  return available_sum_insureds?.slice(
    currentSumInsuredIndex,
    currentSumInsuredIndex + 3,
  );
};
