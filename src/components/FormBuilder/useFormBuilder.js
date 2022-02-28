import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { performValidations, renderField } from "./formUtils";

const useFormBuilder = (
  schema,
  fetchValues,
  defaultValues = {},
  noForAll,
  setNoForAll,
  // noForAllCheckedFalse = () => {}
) => {
  const [values, setValues] = useState(defaultValues || {});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState();
  const memebers = useSelector(
    ({ greetingPage }) => greetingPage.proposerDetails.members,
  );
  const InsuredDetails = useSelector(
    ({ proposalPage }) => proposalPage.proposalData["Insured Details"],
  );
  const updateValue = (name, value) => {
    setValues({ ...values, [name]: value });
    fetchValues({ ...values, [name]: value });
    if (value instanceof Object) {
      if (value?.[`is${name}`] && value?.[`is${name}`] === "Y" && noForAll) {
        // noForAllCheckedFalse();
        setNoForAll(false);
      }
    }
  };
  const updateValues = (multipleValues = {}) => {
    setValues({ ...values, ...multipleValues });
    fetchValues({ ...values, ...multipleValues });
  };
  const insertValue = (parent, member, name, value) => {
    setValues({
      ...values,
      [parent]: {
        ...values[parent],
        [member]: {
          ...(values[parent][member] ? values[parent][member] : {}),
          [name]: value,
        },
      },
    });
    fetchValues({
      ...values,
      [parent]: {
        ...values[parent],
        [member]: {
          ...(values[parent][member] ? values[parent][member] : {}),
          [name]: value,
        },
      },
    });
  };
  const collectRefs = useRef({});

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length) {
      setValues(defaultValues);
      fetchValues(defaultValues);
    }
  }, [defaultValues]);

  const triggerValidation = name => {
    let errorsTemp = {};
    let tempIsValid = true;
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
                age: parseInt(
                  memebers.filter(m => m.type === name.member)[0].age,
                ),
                dob: InsuredDetails ? InsuredDetails[name.member]?.dob : "",
              }
            : name;
        let errorMsg =
          filteredItem.validate &&
          performValidations(filteredItem.validate, values, name);
        // filteredItem.validate.matches === "date" && typeof name === "object"
        if (renderField(filteredItem, values, member)) {
          errorsTemp[parent + member + variableName] = errorMsg;
          if (errorMsg) tempIsValid = false;
        }
      }
    } else if (name) {
      console.log("sbnsfljk", name);
      let [filteredItem] = schema.filter(item => item.name === name);
      if (filteredItem) {
        let errorMsg =
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
          let membersToMap = item[0].additionalOptions.members;
          if (item[0].render.when.includes("||")) {
            const parents = item[0].render.when.split("||");
            parents.forEach(parent => {
              if (values[parent]) {
                let selectedMembers = Object.keys(
                  values[parent].members,
                ).filter(el => values[parent].members[el]);
                if (selectedMembers.length) {
                  membersToMap = selectedMembers;
                }
              }
            });
          }
          membersToMap.forEach(member => {
            item.forEach(innerItem => {
              let errorMsg =
                innerItem.validate &&
                performValidations(innerItem.validate, values, {
                  variableName: innerItem.name,
                  parent: innerItem.parent,
                  member,
                });

              if (
                (renderField(innerItem, values, member) &&
                  !innerItem.visibleOn) ||
                (innerItem.visibleOn &&
                  values[innerItem.parent][`is${innerItem.parent}`] === "Y")
              ) {
                errorsTemp[innerItem.parent + member + innerItem.name] =
                  errorMsg;
                if (errorMsg) tempIsValid = false;
              }
            });
          });
        } else {
          let errorMsg;

          if (values[item.name] && !values[item.name].isValid) {
            errorMsg = "Select members";
          }
          if (item.validate)
            errorMsg = performValidations(item.validate, values, item.name);
          if (item.visibleOn) {
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
            console.log("wvbkwj mvbsdmvc", item, values);

            errorsTemp[item.name] = errorMsg;
            if (errorMsg) tempIsValid = false;
          }
        }
        setIsValid(tempIsValid);
      });
    }
    setErrors({ ...errors, ...errorsTemp });
  };

  const clearField = name => {
    setValues({ ...values, [name]: null });
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
  };
};
export default useFormBuilder;
