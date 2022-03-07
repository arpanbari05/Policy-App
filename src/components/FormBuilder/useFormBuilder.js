import { useEffect, useRef, useState } from "react";
import { performValidations, renderField } from "./formUtils";

const useFormBuilder = (
  schema,
  fetchValues,
  defaultValues = {},
  noForAll,
  setNoForAll,
  formName,
  insuredDetails
) => {
  const [values, setValues] = useState(defaultValues || {});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState();
  const updateValue = (name, value) => {

    setValues(prev => ({ ...prev, [name]: value }));
    fetchValues(prev => ({ ...prev, [name]: value }));
    if (value instanceof Object) {
      if (value?.[`is${name}`] && value?.[`is${name}`] === "Y" && noForAll) {
        setNoForAll(false);
      }
    }
  };
  

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
      
            dob: insuredDetails && insuredDetails[name.member] ? insuredDetails[name.member]?.dob : "",
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
    } else {
      schema.forEach(item => {
        if (item instanceof Array) {
          item[0].additionalOptions.members.forEach(member => {
            item.forEach(innerItem => {
              let errorMsg =
                innerItem.validate &&
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
          if (renderField(item, values)) {
            errorsTemp[item.name] = errorMsg;
            if (errorMsg) tempIsValid = false;
          }
        }

        
      });
    }
    console.log("akfvbkadjvb",errorsTemp,tempIsValid)
    setIsValid(tempIsValid);
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