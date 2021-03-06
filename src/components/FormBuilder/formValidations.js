import moment from "moment";

function test_same_digit(num) {
  var first = num % 10;
  while (num) {
    if (num % 10 !== first) return false;
    num = Math.floor(num / 10);
  }
  return true;
}

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

export const validationIndex = {
  required: (param, values, name) => {
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
      if (typeof param === "string" && param.includes("above")) {
        const date = new Date();
        const { dob } = values;
        let ageLimit = parseInt(param.split("/")[1]);
        let inputAge =
          dob.length === 4
            ? date.getUTCFullYear() - parseInt(dob)
            : date.getUTCFullYear() - dob.split("-")[2];
        if (inputAge >= ageLimit)
          return {
            status: false,
            message: `This field is required.`,
          };
      } else
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
    // console.log("wojvnno", value, checkParam);

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
            return {
              status: false,
              message: `Please Enter Full Name. If last name not available enter "."(dot).`,
            };
          } else if (
            (value.trim().match(/\ /g) || []).length > 5 ||
            value.split("").length > 90
          ) {
            // console.log("wqefvbhcks", value.split("").length);
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
          var min = parseInt(param.split("/")[1]);
          var max = parseInt(param.split("/")[2]);

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

        // futures dates
        case "date/availNextNineMonths": {
          let currentDate = new Date();

          var maxDate = new Date();
          maxDate.setMonth(maxDate.getMonth() + 10);
          let maxDateNum = maxDate.getDate();
          let maxMonth = maxDate.getMonth();
          let maxYear = maxDate.getUTCFullYear();
          // console.log("qjhegcjheqf", maxYear);
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
          // console.log("dfnlsvv", input, userDOB);

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
              // console.log(
              //   "ibndfji",
              //   name.dob.split("-")[2],
              //   inputNumberOfYears,
              // );
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
          var currentDate = new Date();
          var inputDate = values[name.parent][name.member][name.variableName];
          var birthYear = name.dob ? name.dob.split("-")[2] : name.age;
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
          // console.log("cjhgvjvhjc", param, values, name);
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
            minDateLimit = minDateLimit.map(el => parseInt(el));
            let inputDate =
              typeof name === "object"
                ? `${
                    values[name.parent][name.member][name.variableName]
                  }`?.split("-")
                : values[name].split("-");
            inputDate = inputDate.map(el => parseInt(el));
            // console.log("sdvbnsdjvb",{minDateLimit,maxDateLimit,inputDate});
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
          var pass = false;
          if (value.toLowerCase().includes("@")) {
            acceptedEmailExtensions.map(ext => {
              if (
                ext ===
                value
                  .toLowerCase()
                  .slice(value.toLowerCase().lastIndexOf("."), value.length)
              ) {
                pass = true;
              }
            });
          }
          // console.log("bgwefhweg", pass);
          if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              value.toLowerCase(),
            ) ||
            !pass ||
            value.length > 64
          ) {
            return {
              status: false,
              message: "Please enter a valid email.",
            };
          } else break;
        case "pan": {
          if (!/([A-Z]){5}([0-9]){4}([A-Z]){1}$/.test(value.toUpperCase())) {
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
          } else if (parseInt(value) === 0) {
            return {
              status: false,
              message: "Please enter valid value",
            };
          } else break;
        case "annIncome":
          if (!/^[0-9]*$/.test(value) && parseInt(value) === 0) {
            return {
              status: false,
              message: "Please enter valid value",
            };
          } else break;
        case "address":
          if (!/^[A-Za-z0-9\s-./#&,"]{3,}$/.test(value)) {
            return {
              status: false,
              message: "Enter valid address",
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
