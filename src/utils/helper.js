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

export function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

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
