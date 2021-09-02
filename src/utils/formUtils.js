
export const forbiddedSymbols = [
  "#",
  "!",
  "%",
  "$",
  "&",
  "=",
  "^",
  "*",
  "(",
  ")",
  "{",
  "}",
  "?",
  "|",
  "~",
  "`",
  "'",
  "/",
];

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

export const forbiddedSymbols2 = [...forbiddedSymbols, "@",'"',">","<","/"];

  export const checkPreviousChar = (value, checkValue, stateValue) => {
    let check = true;

    if (value[0] === checkValue) {
      check = false;
    }
    if (
      check &&
      value[value.length - 1] === checkValue &&
      stateValue[stateValue.length - 1] === checkValue
    ) {
      check = false;
    }
    return check;
  };

  export const checkAllChar = (value, checkValue) => {
    let check = true;
    let valueArr = value.split("");
    let atTheRateNo = 0;
    let dotCount = 0;
    let doubleInvertedCount = 0;

    valueArr.map(i => {
      return i === "@"
        ? (atTheRateNo += 1)
        : i === "."
        ? (dotCount += 1)
        : i === '"'
        ? (doubleInvertedCount += 1)
        : doubleInvertedCount + 0;
    });

    //  let checkDotContinuity = ;
    if (dotCount > 1) {
      if (
        value[valueArr.lastIndexOf(".") - 1] ===
          value[valueArr.lastIndexOf(".")] ||
        value[valueArr.lastIndexOf(".") + 1] ===
          value[valueArr.lastIndexOf(".")] 
        
      ) {
        return false;
      }
    }

    if( doubleInvertedCount > 0){
      if(
        value[valueArr.lastIndexOf('"') + 1] ===
          value[valueArr.lastIndexOf('"')] ||
          
        value[valueArr.lastIndexOf('"') - 1] ===
          value[valueArr.lastIndexOf('"')]
      ){
        return false;
      }
    }

    if (atTheRateNo > 0) {
      if (
        value[valueArr.lastIndexOf(".") - 1] === "@" ||
        value[valueArr.lastIndexOf(".") + 1] === "@"
      )
        return false;
    }

    check =
      value[0] !== "." &&
      value[0] !== "#" &&
      value[0] !== "@" &&
      atTheRateNo < 2;
    // value.indexOf(".")>0?
    // value[value.indexOf(".") + 1] !== value[value.indexOf(".")]?
    // value[value.indexOf(".") - 1] !== value[value.indexOf(".")]?true:false

    for (let i in value) {
      if (checkValue.includes(value[i])) {
        check = false;
      }
    }
    return check;
  };

  export const checkDoubleChar = (e,stateValue) => {
    if (e.keyCode === 190 && stateValue[stateValue.length - 1] === " ") {
      e.preventDefault();
    }
    if (e.keyCode === 32 && stateValue.length < 1) {
      e.preventDefault();
    }
  };