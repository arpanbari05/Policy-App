import { useEffect, useRef, useState } from "react";
import { performValidations, renderField } from "./formUtils";

const useFormBuilder = (
  schema,
  fetchValues,
  defaultValues = {},
  noForAll = false,
  setNoForAll,
  formName,
  insuredDetails,
  canProceed,
  yesSelected,
  proposalDetails,
  setErrorInField,
  fetchErrors,
  fetchValid,
  isPanelVisible,
  keyStr,
) => {
  console.log("edtbdbjhl", defaultValues);
  const [blockScrollEffect, setBlockScrollEffect] = useState(true);

  const [values, setValues] = useState(defaultValues || {});

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState();

  const updateValue = (name, value, removeOtherValues = false) => {
    console.log("sdfgdzfgvdf", name, value, values, removeOtherValues);
    if (formName === "Medical Details" && !value) {
      return;
    }

    if (removeOtherValues) {
      setValues({ [name]: value });
      fetchValues(() => ({ [name]: value }));
    } else {
      setValues(prev => ({ ...prev, [name]: value }));
      fetchValues(prev => ({ ...prev, [name]: value }));
    }

    if (value instanceof Object) {
      if (value?.[`is${name}`] && value?.[`is${name}`] === "Y" && noForAll) {
        setNoForAll(false);
      }
    }
  };

  const updateValidateObjSchema = item => {
    return item.visibleOn && renderField(item, values)
      ? { ...item.validate, required: true }
      : item.validate;
  };

  const checkReadOnly = (name, formName) => {
    if (formName === "Other Details") {
      let nomineeRelation = values.nominee_relation;

      let dataTocheck = {};
      if (insuredDetails) {
        if (insuredDetails[nomineeRelation] && nomineeRelation === "self") {
          dataTocheck = {
            ...proposalDetails,
            ...insuredDetails["self"],
          };
        } else if (insuredDetails[nomineeRelation]) {
          dataTocheck = insuredDetails[nomineeRelation];
        }
      }
      let nameWithoutNominee =
        name.slice(name.indexOf("_") + 1, name.length) === "contact"
          ? "mobile"
          : name.slice(name.indexOf("_") + 1, name.length);
      if (nameWithoutNominee.includes("address"))
        nameWithoutNominee = Object.keys(dataTocheck).find(key =>
          key.includes(nameWithoutNominee),
        );
      if (name.includes("pincode"))
        nameWithoutNominee = Object.keys(dataTocheck).find(key =>
          key.includes("pincode"),
        );
      return dataTocheck[nameWithoutNominee] ? true : false;
    }
    return false;
  };

  const updateValues = (multipleValues = {}, action) => {

    if (action === "SAVE_AS_IT_IS") {
    console.log("sdfgdzfgvdf 9", multipleValues, action);

      setValues(multipleValues);
      fetchValues(() => multipleValues);
    } else {
      setValues(prev => ({ ...prev, ...multipleValues }));
      fetchValues((prev) => ({ ...prev, ...multipleValues }));
    }
  };
  const insertValue = (parent, member, name, value) => {
    setValues({
      ...values,
      [parent]: {
        ...values[parent],
        [member]: {
          ...(values[parent]?.[member] ? values[parent]?.[member] : {}),
          [name]: value,
        },
      },
    });
    fetchValues(() => ({
      ...values,
      [parent]: {
        ...values[parent],
        [member]: {
          ...(values[parent]?.[member] ? values[parent]?.[member] : {}),
          [name]: value,
        },
      },
    }));
  };
  const collectRefs = useRef({});

  useEffect(() => {
    console.log("fgvsdjvnsdk", defaultValues, values);
    if (
      defaultValues &&
      Object.keys(defaultValues).length &&
      Object.keys(values).length !== Object.keys(defaultValues).length
    ) {
      setValues(prev => ({...prev,...defaultValues}));
      fetchValues((prev) => ({...prev,...defaultValues}));
    }
  }, [defaultValues]);

  const triggerValidation = name => {
    console.log("bfkjf", name);
    let errorsTemp = {};
    let tempIsValid = true;
    console.log("sgbjhsfk", name);
    if (typeof name === "object") {
      const { parent, member, variableName } = name;
      let findGroup = schema.findIndex(el => el.name === parent);
      let [filteredItem] = schema[findGroup + 1].filter(
        item => item.name === variableName,
      );

      if (filteredItem) {
        name =
          typeof name === "object"
            ? {
                ...name,

                dob:
                  insuredDetails && insuredDetails[name.member]
                    ? insuredDetails[name.member]?.dob
                    : "",
              }
            : name;
        let errorMsg =
          filteredItem.validate &&
          performValidations(filteredItem.validate, values, name);

        if (renderField(filteredItem, values, member)) {
          errorsTemp[parent + member + variableName] = errorMsg;
          if (errorMsg) tempIsValid = false;
        }
      }
    } else if (name) {
      let [filteredItem] = schema.filter(item => item.name === name);

      if (filteredItem) {
        let errorMsg;

        errorMsg =
          filteredItem.validate &&
          performValidations(filteredItem.validate, values, name);

        if (renderField(filteredItem, values)) {
          errorsTemp[filteredItem.name] = errorMsg;

          if (errorMsg) tempIsValid = false;
        }
      }
    } else {
      schema.forEach(item => {
        if (item instanceof Array) {
          item[0].additionalOptions.members.forEach(member => {
            item.forEach(innerItem => {
              let errorMsg =
                innerItem?.validate &&
                values?.[innerItem.parent] &&
                values?.[innerItem.parent]?.members?.[member] &&
                performValidations(innerItem.validate, values, {
                  variableName: innerItem.name,
                  parent: innerItem.parent,
                  member,
                });
              if (renderField(innerItem, values, member)) {
                errorsTemp[innerItem.parent + member + innerItem.name] =
                  errorMsg;
                if (errorMsg) tempIsValid = false;
              }
            });
          });
        } else {
          let errorMsg =
            item?.validate &&
            performValidations(item.validate, values, item.name);

          if (item.visibleOn) {
            console.log("dfbjhdf", item, values);

            if (
              values[Object.keys(item.visibleOn)[0]] ===
              item.visibleOn[Object.keys(item.visibleOn)[0]]
            )
              errorMsg = performValidations(
                { required: true },
                values,
                item.name,
              );
          }

          if (renderField(item, values)) {
            errorsTemp[item.name] = errorMsg;
            console.log("wfvbkjv", errorMsg);
            if (errorMsg) tempIsValid = false;
          }
        }
        setIsValid(tempIsValid);
        fetchValid(tempIsValid);
      });
    }

    setErrors({ ...errors, ...errorsTemp });
    fetchErrors({ ...errors, ...errorsTemp });
  };

  const clearField = name => {
    setValues({ ...values, [name]: null });
  };

  useEffect(() => {
    if (noForAll && formName === "Medical Details") {
      let tempGroupVal = {};
      schema.forEach(el => {
        if (!Array.isArray(el)) {
          if (el.additionalOptions.notAllowedIf === "N") {
            tempGroupVal[el.name] = {
              [`is${el.name}`]: "Y",
              members: {},
              isValid: true,
            };
          } else if (!el.additionalOptions.disable_Toggle) {
            tempGroupVal[el.name] = {
              [`is${el.name}`]: "N",
              members: {},
              isValid: true,
            };
          }
        }
      });
      if (Object.keys(tempGroupVal).length) {
        updateValues({ ...values, ...tempGroupVal }, "SAVE_AS_IT_IS");
      }
    }
  }, [noForAll]);

  // to scroll page as per error
  // useEffect(() => {
  //   console.log("toggle", errors);
  //   if (Object.values(errors).length && Object.values(errors).some(val => val))
  //     setErrorInField(true);
  //   else setErrorInField(false);
  //   if (blockScrollEffect) {
  //     let filteredKey = Object.keys(errors).filter(key => errors[key]);
  //     // if (canProceed && !canProceed.canProceed)
  //     //   filteredKey = canProceed.canProceedArray;
  //     console.log("srgvshfvjkl", errors, filteredKey, yesSelected, canProceed);
  //     if (filteredKey.length) {
  //       let scrollPositions = filteredKey.map(key => {
  //         let element = document.getElementById(key);
  //         if (element) {
  //           let y = element.getBoundingClientRect().top - 100 + window.scrollY;
  //           return y;
  //         }
  //       });
  //       console.log("svbkjsbnv", scrollPositions);
  //       window.scroll({
  //         top: Math.min(...scrollPositions),
  //         behavior: "smooth",
  //       });
  //     }
  //   }
  // }, [errors]);
  // , canProceed,blockScrollEffect

  const scrollToErrors = () => {
    if (isPanelVisible) {
      if (
        Object.values(errors).length &&
        Object.values(errors).some(val => val)
      )
        setErrorInField(true);
      else setErrorInField(false);

      if (blockScrollEffect) {
        let filteredKey = Object.keys(errors).filter(key => errors[key]);

        if (filteredKey.length) {
          let scrollPositions = filteredKey.map(key => {
            let element = document.getElementById(key);
            if (element) {
              let y =
                element.getBoundingClientRect().top - 100 + window.scrollY;
              return y;
            }
          });
          window.scroll({
            top: Math.min(...scrollPositions),
            behavior: "smooth",
          });
        }
      }
    }
  };

  return {
    values,
    updateValue,
    clearField,
    errors,
    triggerValidation,
    collectRefs,
    isValid,
    setValues,
    insertValue,
    setErrors,
    updateValues,
    checkReadOnly,
    updateValidateObjSchema,
    setBlockScrollEffect,
    scrollToErrors,
  };
};
export default useFormBuilder;
