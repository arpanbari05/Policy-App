import moment from "moment";
import { date } from "yup";

import { checkAllChar } from "../../utils/formUtils";
function test_same_digit(num) {
  var first = num % 10;
  while (num) {
    if (num % 10 !== first) return false;
    num = Math.floor(num / 10);
  }
  return true;
}
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
  "#",
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

const acceptedEmailExtensions = [
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
    console.log(name, values, param, "heheheh3");
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
  // allow: (param, values, name) => {
  //   const { parent, member, variableName } = name;
  //   let value =
  //     parent && member && variableName && values
  //       ? values?.[parent]?.[member]?.[variableName]
  //       : parent && member && values
  //       ? values?.[parent]?.[member]
  //       : values?.[name];
  //   if (param === "onlyNumbers") {
  //     console.log(
  //       "sghsdfjkv",value
  //     )
  //   }
  //   let message = {
  //     onlyNumbers: "Input should be number",
  //   };
  //   if (message[param]) {
  //     return {
  //       status: false,
  //       message: message[param],
  //     };
  //   }
  // },
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
    console.log("wojvnno", value, checkParam);

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
          if (!value.trim().includes(" ")) {
            return { status: false, message: "Please enter full name." };
          } else if (
            (value.trim().match(/\ /g) || []).length > 5 ||
            value.split("").length > 90
          ) {
            console.log("wqefvbhcks", value.split("").length);
            return { status: false, message: "Please enter valid name." };
          } else break;
        case "mobile":
          if (!/^[6-9]\d{9}$/.test(value)) {
            return {
              status: false,
              message: "Please enter a valid mobile number.",
            };
          } else break;
        case "alt":
          if (!/^[6-9]\d{9}$/.test(value) || test_same_digit(parseInt(value))) {
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
              message: `Please enter 1 to 200 weight`,
              // between ${
              //   param.split("/")[1]
              // } and ${param.split("/")[2]}`,
            };
          } else break;
        case "validYear":
          if (typeof value === "string" || value instanceof String) {
            console.log("sknslkfn", value);
            let month = value?.split("-")[0];
            let year = value?.split("-")[1];
            console.log("qcbib", param, value);
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

        // futures dates
        case "date/availNextNineMonths": {
          let currentDate = new Date();

          var maxDate = new Date();
          maxDate.setMonth(maxDate.getMonth() + 10);
          let maxDateNum = maxDate.getDate();
          let maxMonth = maxDate.getMonth();
          let maxYear = maxDate.getUTCFullYear();
          console.log("qjhegcjheqf", maxYear);
          if (
            value.split("-")[2] &&
            (currentDate.getUTCFullYear() > parseInt(value.split("-")[2]) ||
              (currentDate.getUTCFullYear() === parseInt(value.split("-")[2]) &&
                currentDate.getUTCMonth() + 1 > parseInt(value.split("-")[1])))
          ) {
            return {
              status: false,
              message: "Please enter a future date",
            };
          }
          if (
            parseInt(value.split("-")[2]) &&
            (maxYear < parseInt(value.split("-")[2]) ||
              (maxYear === parseInt(value.split("-")[2]) &&
                parseInt(value.split("-")[1]) > maxMonth) ||
              (maxYear === parseInt(value.split("-")[2]) &&
                parseInt(value.split("-")[1]) === maxMonth &&
                maxDateNum < parseInt(value.split("-")[0])))
          ) {
            return {
              status: false,
              message: `Enter valid date`,
            };
          } else break;
        }

        // validation for - dates who having MM-YYYY format
        case "date-MM-YYYY": {
          let currentDate = new Date();
          let input =
            typeof name === "object"
              ? values[name.parent][name.member][name.variableName].split("-")
              : values[name].split("-");
          let userDOB = name.dob
            ? name.dob.split("-")
            : [
                currentDate.getUTCDate(),
                currentDate.getUTCMonth() + 1,
                currentDate.getUTCFullYear() - name.age,
              ];
          if (
            (parseInt(input[1]) === currentDate.getUTCFullYear() &&
              parseInt(input[0]) > currentDate.getUTCMonth() + 1) ||
            parseInt(input[1]) > currentDate.getUTCFullYear() ||
            (parseInt(input[1]) === parseInt(userDOB[2]) &&
              parseInt(input[0]) < parseInt(userDOB[1])) ||
            parseInt(input[1]) < parseInt(userDOB[2])
          ) {
            return {
              status: false,
              message: "Please enter valid date.",
            };
          } else break;
        }

        case "numberOfYears":
          {
            let currentDate = new Date();
            let inputNumberOfYears = parseInt(
              values[name.parent][name.member][name.variableName],
            );
            if (name.dob && name.dob.split("-")[2]) {
              console.log(
                "ibndfji",
                name.dob.split("-")[2],
                inputNumberOfYears,
              );
              if (
                currentDate.getUTCFullYear() - inputNumberOfYears <
                  parseInt(name.dob.split("-")[2]) ||
                parseInt(name.dob.split("-")[2]) + inputNumberOfYears >
                  currentDate.getUTCFullYear()
              ) {
                return {
                  status: false,
                  message: "Please enter valid number of years.",
                };
              }
            } else if (name.age && name.age < inputNumberOfYears) {
              return {
                status: false,
                message: "Please enter valid number of years.",
              };
            } else break;
          }
          break;
        case "onlyYear":
          let currentDate = new Date();
          let inputDate = values[name.parent][name.member][name.variableName];
          let birthYear = name.dob ? name.dob.split("-")[2] : name.age;
          if (
            currentDate.getUTCFullYear() < parseInt(inputDate) ||
            parseInt(inputDate) < parseInt(birthYear)
          ) {
            return {
              status: false,
              message: "Please enter a valid date.",
            };
          } else break;

        case "date":
          // values[name.parent][name.member][name.variableName]
          console.log("cjhgvjvhjc", param, values, name);
          {
            let currentDate = new Date();

            // if(name.dob && (parseInt(name.dob.split("-")[2])){

            // }
            let maxDateLimit = [
              currentDate.getUTCDate(),
              currentDate.getUTCMonth() + 1,
              currentDate.getUTCFullYear(),
            ];
            let minDateLimit;
            if (typeof name === "object") {
              minDateLimit = name.dob
                ? name.dob.split("-")
                : [
                    currentDate.getUTCDate(),
                    currentDate.getUTCMonth() + 1,
                    currentDate.getUTCFullYear() - name.age,
                  ];
            } else if (values && values.dob) {
              minDateLimit = values.dob.split("-");
            } else {
              minDateLimit = ["00", "00", "0000"];
            }
            let inputDate =
              typeof name === "object"
                ? `${
                    values[name.parent][name.member][name.variableName]
                  }`?.split("-")
                : values[name].split("-");
            // console.log("sdvbnsdjvb",minDateLimit);
            if (
              (inputDate[2] &&
                inputDate[0] > maxDateLimit[0] &&
                parseInt(inputDate[1]) === parseInt(maxDateLimit[1]) &&
                parseInt(inputDate[2]) === parseInt(maxDateLimit[2])) ||
              (inputDate[0] < minDateLimit[0] &&
                parseInt(inputDate[1]) === parseInt(minDateLimit[1]) &&
                parseInt(inputDate[2]) === parseInt(minDateLimit[2]))
            ) {
              return {
                status: false,
                message: "Please enter a valid date.",
              };
            }
            if (
              inputDate[2] &&
              (parseInt(inputDate[2]) > parseInt(maxDateLimit[2]) ||
                parseInt(inputDate[2]) < parseInt(minDateLimit[2]))
            ) {
              return {
                status: false,
                message: "Please enter a valid date.",
              };
            }
            if (
              (inputDate[0] &&
                inputDate[1] &&
                parseInt(inputDate[1]) > parseInt(maxDateLimit[1]) &&
                parseInt(inputDate[2]) === parseInt(maxDateLimit[2])) ||
              (parseInt(inputDate[1]) < parseInt(minDateLimit[1]) &&
                parseInt(inputDate[2]) === parseInt(minDateLimit[2]))
            ) {
              return {
                status: false,
                message: "Please enter a valid date.",
              };
            }
          }

          if (
            // inputDate[0] && inputDate[1] && inputDate[2] &&
            !/^(0?[1-9]|[12][0-9]|3[01])[\-](0?[1-9]|1[012])[\-]\d{4}$/.test(
              value,
            )
          ) {
            return {
              status: false,
              message: "Please enter a valid date.",
            };
          } else break;
        case "email":
          let pass = false;
          if (value.includes("@")) {
            acceptedEmailExtensions.map(ext => {
              if (ext === value.slice(value.lastIndexOf("."), value.length)) {
                pass = true;
              }
            });
          }
          console.log("bgwefhweg", pass);
          if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              value,
            ) ||
            !pass ||
            value.length > 64
          ) {
            return {
              status: false,
              message: "Please enter a valid email.",
            };
          } else break;
        case "pan":{

          if (
            !/([A-Z]){5}([0-9]){4}([A-Z]){1}$/.test(value.toUpperCase())
            // pancard number's 5th char must be equal to the first char of last name of the user
            || (value[4] && values.name[values.name.lastIndexOf(" ")+1] !== value[4])
          ) {
            return {
              status: false,
              message: "Please enter a valid pan number.",
            };
          } else break;
        }
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
              value,
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
          if (!/^[A-Za-z0-9\s-./#&,"]{3,}$/.test(value)) {
            return {
              status: false,
              message: "Enter valid address",
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
          } else return;
        // {
        //   status: false,
        //   message:
        //     "No Regex specified for the combination remove matches or change the param",
        // };
      }
    }
  },
  selectAtLeastOne: (param, values, name) => {
    if (values[name] || values[name] instanceof Object) {
      if (!values[name].isValid)
        return {
          status: false,
          message: "Please select one",
        };
    }
  },
  selectAtLeastOneCheckbox: (param, values, name) => {
    const { parent, member, variableName } = name;

    if (
      !values[parent] ||
      !values[parent][member] ||
      !values[parent][member][variableName] ||
      Object.values(values[parent][member][variableName]).length === 0 ||
      !Object.values(values[parent][member][variableName]).some(
        val => val === "Y",
      )
    )
      return {
        status: false,
        message: "Please select atleast one",
      };
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
