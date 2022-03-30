import { useEffect, useRef, useState } from "react";
import { performValidations, renderField } from "./formUtils";

const useFormBuilder = (
  schema,
  fetchValues,
  defaultValues = {},
  noForAll,
  setNoForAll,
  formName,
  insuredDetails,
  canProceed,
  yesSelected,
  proposalDetails
) => {
  const [values, setValues] = useState(defaultValues || {});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState();
  const updateValue = (name, value, removeOtherValues = false) => {
    if (removeOtherValues) {
      setValues({ [name]: value });
      fetchValues({ [name]: value });
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

  const updateValidateObjSchema = (item) => {
    return item.visibleOn && renderField(item,values) ?{...item.validate,required:true}:item.validate
  }

  const checkReadOnly = (name) => {
    let nomineeRelation = values.nominee_relation;
    let nameWithOutNominee = name.slice(
            name.indexOf("_") + 1,
            name.length,
          ) === "contact"?"mobile":name.slice(
            name.indexOf("_") + 1,
            name.length,
          );
    let dataTocheck = {}
    if(insuredDetails){
      if (insuredDetails[nomineeRelation] && nomineeRelation === "self") {
        dataTocheck = {
          ...proposalDetails,
          ...(insuredDetails["self"]),
        };
      } else if (insuredDetails[nomineeRelation]) {
        dataTocheck = insuredDetails[nomineeRelation]
      }
    }
    return  dataTocheck[nameWithOutNominee]?true:false
  }

  const updateValues = (multipleValues = {}) => {
    setValues({ ...values, ...multipleValues });
    fetchValues({ ...values, ...multipleValues });
  };
  const insertValue = (parent, member, name, value) => {
    console.log("qdjbjics", parent, member, name, value);
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
    console.log("sgbmkfbmk", name, values);
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
      // setIsValid(tempIsValid);
    } else if (name) {
      let [filteredItem] = schema.filter(item => item.name === name);
      // console.log("wfvwfdghr",name,filteredItem.additionalOptions.showMembersIf)

      if (filteredItem) {
        let errorMsg;
        // if(filteredItem.additionalOptions.showMembersIf){
        //   let parents = filteredItem.additionalOptions.showMembersIf.split("||");
        //   let isChildSelected = parents.some(el => values[el] && values[el][`is${el}`] === "Y")
        //   if(isChildSelected && !Object.values(values[name].members).includes(true)){
        //     errorMsg = "Select parent";
        //   }

        // }else{

        errorMsg =
          filteredItem.validate &&
          performValidations(filteredItem.validate, values, name);
        // }

        if (renderField(filteredItem, values)) {
          errorsTemp[filteredItem.name] = errorMsg;

          if (errorMsg) tempIsValid = false;
        }
      }

      // setIsValid(tempIsValid);
    } else {
      schema.forEach(item => {
        if (item instanceof Array) {
          item[0].additionalOptions.members.forEach(member => {
            item.forEach(innerItem => {
              console.log(
                "wrgvhwrjv",
                values,
                innerItem.parent,
                values[innerItem.parent],
              );
              let errorMsg =
                innerItem.validate &&
                values[innerItem.parent] &&
                values[innerItem.parent].members[member] &&
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
            item.validate &&
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
            if (errorMsg) tempIsValid = false;
            console.log("bfsfnbjkls", tempIsValid);
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

  // to scroll page as per error
  useEffect(() => {
    let filteredKey = Object.keys(errors).filter(key => errors[key]);
    if (canProceed && !canProceed.canProceed)
      filteredKey = canProceed.canProceedArray;
    console.log("srgvshfvjkl", errors, filteredKey, yesSelected,canProceed);
    if (filteredKey.length) {
      let scrollPositions = filteredKey.map(key => {
        let element = document.getElementById(key);
        if (element) {
          let y = element.getBoundingClientRect().top - 100 + window.scrollY;
          return y;
        }
      });
console.log("svbkjsbnv",scrollPositions)
      window.scroll({
        top: Math.min(...scrollPositions),
        behavior: "smooth",
      });
    }
  }, [errors, canProceed]);

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
  };
};
export default useFormBuilder;
