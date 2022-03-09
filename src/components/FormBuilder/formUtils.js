import { schemaIndex } from "../../pages/ProposalPage/schemaIndex";
import { validationIndex } from "./formValidations";
export const renderField = (item, value, member) => {
  if (item.render) {
    const { when, is } = item.render;

    // console.log('item3',item.parent,item.name)
    // if (item.parent && item.parent.includes("||") && member) {
    //   let check = false;

    //   const temp = item.parent.split("||");
    //   check = temp.some(
    //     data =>
    //       value[data] &&
    //       value[data].members instanceof Object &&
    //       value[data].members[member],
    //   );
    //   if (check) return true;
    //   else return false;
    // } else
    if (item.parent && member && !when.includes("||")) {
      if (
        value[item.parent] &&
        value[item.parent].members instanceof Object &&
        value[item.parent].members[member]
      ) {
        return true;
      } else return false;
    } else {
      if (is && is.constructor === Object) {
        const { minAge, maxAge } = is;
        const today = new Date();
        const age = today.getFullYear() - value?.[when]?.split("-")[2];
        console.log("heheh", age, today.getFullYear());
        if (minAge && age < minAge && minAge !== -1) return true;
        if (maxAge && age > maxAge && maxAge !== -1) return true;
      }
      if (typeof is === "object" && is instanceof Array) {
        const [min, max] = is;

        if (value[when] >= min && min !== -1) return true;
        if (value[when] <= max && max !== -1) return true;
      }
      if (when.includes("||")) {
        const temp = when.split("||");
        let check = false;
        check = temp.some(
          data => value[data] && value[data][`is${data}`] === is,
        );
        console.log(item);
        if (check) return true;
        else return false;
      } else if (when.includes(".")) {
        let temp = when.split(".");
        if (temp?.[2] && value[temp[0]]?.[temp[1]]?.[temp[2]] === is) {
          console.log("asda312", is, value[temp[0]]?.[temp[1]]?.[temp[2]]);
          return true;
        } else if (value && value[temp[0]] && value[temp[0]][temp[1]] === is) {
          return true;
        } else {
          return false;
        }
      }
      if (when.includes("||")) {
        const temp = when.split("||");
        let check = false;
        check = temp.some(
          data => value[data] && value[data][`is${data}`] === is,
        );
        console.log("wvhsrjvh",item);
        return check;
      }
      if (value[when] === is) return true;
      else return false;
    }
  } else return true;
};
export const generateRange = (param, values) => {
  if (!param instanceof Array && values?.RelationToProposerCode) {
    const [min, max, text] =
      param[values?.RelationToProposerCode.toLowerCase()];
    let object = {};
    for (let i = min; i <= max; ++i) {
      object[i] = i + " " + text;
    }
    return object;
  }

  const [min, max, text] = param;
  let object = {};
  for (let i = min; i <= max; ++i) {
    object[i] = i + " " + text;
  }
  return object;
};
export const mergeSchema = (schemasToMerge = []) => {
  if (schemasToMerge.length === 1) return schemaIndex[schemasToMerge[0]];
  let mergedSchemas = [];
  let collectedSchemas = schemasToMerge.map(item => schemaIndex[item]);
  let flatSchemas = collectedSchemas.flat();
  mergedSchemas = flatSchemas.filter(
    (item, index, self) => index === self.findIndex(_ => _.name === item.name),
  );
  return mergedSchemas;
};
export const fetchMembers = (when, values) => {
  const variable = when.split(".")[0];
  const members = values[variable].members;

  return Object.keys(members).filter(item => members[item]);
};
export const performValidations = (validate, values, name) => {
  const validationArray = Object.keys(validate);
console.log("sgvnnv",validate, values, name)
  for (let i = 0; i < validationArray.length; ++i) {
    console.log("hgeddd", validationIndex[validationArray[i]], name);
    let result = validationIndex[validationArray[i]](
      validate[validationArray[i]],
      values,
      name,
    );

    if (result && !result.status) {
      return result.message;
    }
  }
};
export const fillingUtility = (fill, updateValue, checkValue, checkName) => {
  const { fieldName, type } = fill;
  switch (type) {
    case "relation":
      if (checkValue && checkValue.includes("M_"))
        updateValue(prev => {
          return { ...prev, [fieldName]: "M", [checkName]: checkValue };
        });
      break;
    default:
      updateValue(fieldName, null);
  }
};
const checkValue = (str, max) => {
  if (str.charAt(0) !== "0" || str === "00") {
    var num = parseInt(str);
    if (isNaN(num) || num <= 0 || num > max) num = 1;
    str =
      num > parseInt(max.toString().charAt(0)) && num.toString().length === 1
        ? "0" + num
        : num.toString();
  }
  return str;
};
export const checkAllow = (type, event, eventType) => {
  console.log("sgbsjkk",event)

  // if (type === "address" && eventType === "down") {
  //   let key = event.keyCode;
  //   if (
  //     (key >= 65 && key <= 90) ||
  //     (key <= 48 && key >= 57) ||
  //     key === 50 ||
  //     key === 191 ||
  //     key === 190 ||
  //     key === 188 ||
  //     key === 186 ||
  //     key === 222 ||
  //     key === 189
  //   ) {
  //   } else {
  //     event.preventDefault();
  //   }
  // }
  // if (type === "address" && eventType === "down") {
  //   let key = event.keyCode;

  //   if (
  //     (key >= 65 && key <= 90) ||
  //     key === 8 ||
  //     key === 9 ||
  //     key === 20 ||
  //     key === 16 ||
  //     key === 13 ||
  //     key === 37 ||
  //     key === 39 ||
  //     key === 46 ||
  //     key === 32
  //   ) {
  //   } else {
  //     event.preventDefault();
  //   }
  // }
  if (type === "onlyAlphabets" && eventType === "down") {
    let key = event.keyCode;

    if (
      (key >= 65 && key <= 90) ||
      key === 8 ||
      key === 9 ||
      key === 20 ||
      key === 16 ||
      key === 13 ||
      key === 37 ||
      key === 39 ||
      key === 46 ||
      key === 190 ||
      key === 32
    ) {
    } else {
      event.preventDefault();
    }
  }
  if (type === "noSpecial" && eventType === "press") {
    var code = "charCode" in event ? event.charCode : event.keyCode;
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      event.preventDefault();
    }
  }
  if (type === "onlyNumbers" && eventType === "press") {
    let charCode = event.which ? event.which : event.keyCode;
    if (
      !(charCode > 31 && (charCode < 48 || charCode > 57)) ||
      charCode === 46
    ) {
    } else event.preventDefault();
  }
  if (type === "dob" && eventType === "input") {
    event.preventDefault();
    var input = event.target.value;
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split("-").map(function (v) {
      return v.replace(/\D/g, "");
    });
    if (values[0]) values[0] = checkValue(values[0], 31);
    if (values[1]) values[1] = checkValue(values[1], 12);
    var output = values.map(function (v, i) {
      return v.length === 2 && i < 2 ? v + "-" : v;
    });
    event.target.value = output.join("").substr(0, 14);
  }
  if (type === "month" && eventType === "input") {
    event.preventDefault();
    let input = event.target.value;
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
    let values = input.split("-").map(function (value) {
      return value.replace(/\D/g, "");
    });
    if (values[0]) values[0] = checkValue(values[0], 12);
    let output;
    output = values.map((v, i) => {
      return v.length === 2 && i < 1 ? v + "-" : v;
    });
    event.target.value = output.join("").substr(0, 9);
  }
};
