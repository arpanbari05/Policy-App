import moment from "moment";
import { date } from "yup";



export const acceptedEmailExtensions = [
  ".com",
  ".org",
  ".in",
  ".outlook",
  ".co.in",
  ".rediff",
  ".net",
  ".co",
  ".co.jp",
  ".info",
  ".local",
  ".bike",
  ".jll.com",
];

const forbiddedSymbols = [
  "!",
  "%",
  "$",
  "&",
  "+",
  "=",
  "^",
  "*",
  "`",
  "~",
  "_",
  "(",
  ")",
  "{",
  "}",
  ";",
  "?",
  '"',
  "'",
  "@",
  ">",
  "\\",
  "[",
  "]",
  "<",
  "|",
];

function contains(target, pattern) {
  var value = false;
  pattern.forEach(function (letter) {
    if (target.indexOf(letter) > -1) {
      value = true;
    }
  });
  return value;
}

export const validationIndex = {
  required: (param, values, name) => {
    console.log(name, param, "heheheh3");
    if (typeof name === "object") {
      const { parent, member, variableName } = name;

      if (
        (!values ||
          !values[parent] ||
          !values[parent][member] ||
          !values[parent][member][variableName]) &&
        param !== false
      )
        return {
          status: false,
          message: `This field is required.`,
        };
    } else if ((!values || !values[name]) && param !== false)
      return {
        status: false,
        message: `This field is required.`,
      };
  },
  length: (param, values, name) => {
    if (typeof param === "object") {
      const [min, max] = param;
      const [minInt, maxInt] = [parseInt(min), parseInt(max)];

      if (maxInt !== -1) {
        if (values[name].length > maxInt)
          return {
            status: false,
            message: `Maximum Character limit is ${maxInt}`,
          };
      }
      if (minInt !== -1) {
        if (values[name].length < minInt)
          return {
            status: false,
            message: `Minimum Character limit is ${minInt}`,
          };
      }
    }
  },
  age: (param, values, name) => {
    if (typeof param === "object") {
      const [min, max] = param;
      const [minInt, maxInt] = [parseInt(min), parseInt(max)];

      let endDate = moment(values[name], "DD-MM-YYYY");
      let calculatedValue = moment().diff(endDate, "y");

      if (maxInt !== -1) {
        if (calculatedValue > maxInt)
          return {
            status: false,
            message: `Maximum Age limit is ${maxInt}`,
          };
      }
      if (minInt !== -1) {
        if (calculatedValue < minInt)
          return {
            status: false,
            message: `Minimum Age limit is ${minInt}`,
          };
      }
    }
  },
  matches: (param, values, name) => {
    const { parent, member, variableName } = name;
    let compareTo;
    const checkParam =
      param.split("/")[0] === "validYear"
        ? "validYear"
        : param.split("/")[0] === "validDigits"
        ? "validDigits"
        : param.split("/")[0] === "alt"
        ? "alt"
        : param;

    let value =
      parent && member && variableName && values
        ? values?.[parent]?.[member]?.[variableName]
        : parent && member && values
        ? values?.[parent]?.[member]
        : values?.[name];

    if (checkParam === "alt") {
      compareTo =
        parent && member && variableName && values
          ? values[parent][member][param.split("/")[1]]
          : parent && member && values
          ? values[parent][member]
          : values[param.split("/")[1]];
    }

    if (value) {
      switch (checkParam) {
        case "name":
          if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(value)) {
            return { status: false, message: "Please enter full name." };
          } else break;
        case "mobile":
          if (!/^[6-9]\d{9}$/.test(value)) {
            return {
              status: false,
              message: "Please enter a valid mobile number.",
            };
          } else break;
        case "alt":
          if (!/^[6-9]\d{9}$/.test(value)) {
            return {
              status: false,
              message: "Please enter a valid mobile number.",
            };
          } else if (value === compareTo) {
            return {
              status: false,
              message: "Please enter a different mobile number.",
            };
          } else break;
        case "validDigits":
          let min = parseInt(param.split("/")[1]);
          let max = parseInt(param.split("/")[2]);

          if (!/^[0-9]*$/.test(value) || !(value >= min && value <= max)) {
            return {
              status: false,
              message: `Please enter a valid value between ${
                param.split("/")[1]
              } and ${param.split("/")[2]}`,
            };
          } else break;
        case "validYear":
          if (typeof value === "string" || value instanceof String) {
            let month = value?.split("-")[0];
            let year = value?.split("-")[1];
            if (
              !(
                month > 0 &&
                month <= 31 &&
                year <= new Date().getFullYear() - param.split("/")[1] &&
                year > new Date().getFullYear() - param.split("/")[2]
              )
            ) {
              return {
                status: false,
                message: "Please enter a valid date.",
              };
            } else break;
          } else break;
        case "alphanum":
          if (!/^[A-Za-z0-9 ]+$/.test(value)) {
            return {
              status: false,
              message: "Please enter a valid value",
            };
          } else break;
        case "date":
          if (
            !/^(0?[1-9]|[12][0-9]|3[01])[\-](0?[1-9]|1[012])[\-]\d{4}$/.test(
              value
            )
          ) {
            return {
              status: false,
              message: "Please enter a valid date.",
            };
          } else break;
        case "email":
          let passCase = true;
          for (let index = 0; index < acceptedEmailExtensions.length; index++) {
            const element = acceptedEmailExtensions[index];
            if(value.includes(element)) {
              passCase = false;
              break;
            }
          }
          if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              value
            ) || passCase
          ) {
            return {
              status: false,
              message: "Please enter a valid email.",
            };
          } else break;
        case "pan":
          if (
            !/^([a-zA-Z]{3}[P]{1}[a-zA-Z]{1})([0-9]{4})([a-zA-Z]{1})$/.test(
              value
            )
          ) {
            return {
              status: false,
              message: "Please enter a valid pan number.",
            };
          } else break;
        case "aadhar":
          if (!/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/.test(value)) {
            return {
              status: false,
              message: "Please enter a valid aadhar number.",
            };
          } else break;
        case "gst":
          if (
            !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
              value
            )
          ) {
            return {
              status: false,
              message: "Please enter a valid value.",
            };
          } else break;
        case "pincode":
          if (!/^[1-9][0-9]{5}$/.test(value)) {
            return {
              status: false,
              message: "Please enter a valid pincode.",
            };
          } else break;
        case "onlyDigits":
          if (!/^[0-9]*$/.test(value)) {
            return {
              status: false,
              message: "Please enter only digits",
            };
          } else break;
        case "address":
          if (!/\w{3,15}/.test(value)) {
            return {
              status: false,
              message: "Please enter more than 3 characters",
            };
          } else if (contains(value, forbiddedSymbols)) {
            return {
              status: false,
              message: "Please enter a valid address",
            };
          } else break;
        case "name":
          if (!/^[a-zA-Z. ]{3,30}$/.test(value)) {
            return {
              status: false,
              message: "Please enter fullname.",
            };
          } else break;
        default:
          if (param.startsWith("^") && param.endsWith("$")) {
            const reg = new RegExp(param);
            if (!reg.test(value)) {
              return {
                status: false,
                message: "Please enter a valid value.",
              };
            } else break;
          } else
            return 
            // {
            //   status: false,
            //   message:
            //     "No Regex specified for the combination remove matches or change the param",
            // };
      }
    }
  },
  selectAtLeastOne: (param, values, name) => {
    if (values[name] && values[name] instanceof Object) {
      if (!values[name].isValid)
        return {
          status: false,
          message: "Please select one",
        };
    }
  },
  customMedicalRequired: (param, values, name) => {
    if (values[name] && values[name] instanceof Object) {
      if (!values[name].isValid)
        return {
          status: false,
          message: "Please select one",
        };
    }
  },
  difference: (param, values, name) => {
    if (values[name] && param instanceof Object) {
      const { from, type } = param;
      if (values[from]) {
        if (type === "date") {
          let startDate = moment(values[from], "DD-MM-YYYY");
          let endDate = moment(values[name], "DD-MM-YYYY");
          let calculatedValue = endDate.diff(startDate, "days");

          if (param.minDiff && calculatedValue < param.minDiff) {
            return {
              status: false,
              message: "Minimum difference should be " + param.minDiff,
            };
          }
          if (param.maxDiff && calculatedValue > param.maxDiff) {
            return {
              status: false,
              message: "Minimum difference should be " + param.maxDiff,
            };
          }
        }
      }
    }
  },
};
