import React, { useEffect, useState } from "react";

const useMedicalQuestions = (schema, values, setValues, name,proposalData,defaultValue) => {
  const [noForAll, setNoForAll] = useState({});
  const [yesSelected, setYesSelected] = useState({});
  const [canProceed, setCanProceed] = useState({
    canProceed: false,
    canProceedArray: {},
  });
console.log("sgvksdgv",defaultValue)
  const checkCanProceed = () => {
    const key = Object.keys(values || {});
    const key2 = Object.keys(noForAll || {});

    if (key.length !== key2.length) {
      let noForAll2 = {};
      Object.keys(values || {}).forEach(element => {
        noForAll2[element] = noForAll[element] || false;
      });

      setNoForAll({ ...noForAll2 });
    } else {
      let isNotChecked = {};
      let hasYes = {};
      let checkCanProceed = {};
      
      key2.forEach(item => {
        console.log("wkfbwkd",typeof values[item] )
        if(typeof values[item] === "object" && values[item]){
          if (noForAll[item] !== true) {
            isNotChecked[item] = false;
          } else {
            isNotChecked[item] = true;
          }
          const temp =
            Object.keys(values[item])?.some(
              data => values?.[item]?.[data]?.[`is${data}`] === "Y",
            );
          if (temp === true) {
            hasYes[item] = true;
          } else {
            hasYes[item] = false;
          }
        }else{
          hasYes[item] = true;
        }
      });

      key.forEach(item => {
        console.log("wfkwbhdkf",{checkCanProceed,hasYes,item,isNotChecked,values})
        if (hasYes[item] === isNotChecked[item]) {
          checkCanProceed[item] = checkCanProceed[item]?checkCanProceed[item]:[];
        }

        Object.keys(values[item]).length && Object.keys(values[item])?.forEach(el => {
          let schemaOfEl = schema[key]?.find(({name}) => name === el)
          console.log("ehdhdkfgl",schemaOfEl)
          if(schemaOfEl){
            if(values[item][el] && ((!values[item][el][`is${el}`] && !schemaOfEl?.additionalOptions?.disable_Toggle) || !values[item][el].isValid)) checkCanProceed[item] = Array.isArray(checkCanProceed[item])?[...checkCanProceed[item],el]:[el];
          }
        })
      });

      console.log("wfkwbhdkf",{checkCanProceed,hasYes,isNotChecked,values})
      if (key2.length < 1) {
        isNotChecked = true;
      }

      if (!Object.values(checkCanProceed).some(el => el.length)) {
        setCanProceed({ canProceed: true, canProceedArray: {} });
      } else {
        setCanProceed({
          canProceed: false,
          checkCanProceed,
        });
      }
    }
  };



// -----------------------------------------------------------------------------------------------------------------
//   -----------------------------  SIDE EFFECTS FOR MEDICAL QUESTIONS---------------------------------------------
// ----------------------------------------------------------------------------------------------------------------

useEffect(() => {
if(defaultValue && name === "Medical Details"){
  setValues(defaultValue)
}
},[])


  useEffect(() => {
    if (name === "Medical Details") {
      const key = Object.keys(values || {});
      let tempObj = JSON.parse(JSON.stringify(values || {}));
      key.forEach(keyValue => {
        schema?.[keyValue]?.forEach(element => {
          //'nominee_relation=self/Proposer Details.name'
          if (
            element?.populate &&
            tempObj[keyValue][element.populate.split("/")[0].split("=")[0]] ===
              element.populate.split("/")[0].split("=")[1] &&
            tempObj[keyValue][element.name] !==
              proposalData[element.populate.split("/")[1].split(".")[0]][
                element.populate.split("/")[1].split(".")[1]
              ]
          ) {
            tempObj[keyValue][element.name] =
              proposalData[element.populate.split("/")[1].split(".")[0]][
                element.populate.split("/")[1].split(".")[1]
              ];
          }
        });
      });
      if (JSON.stringify(values) !== JSON.stringify(tempObj)) {
        setValues({ ...tempObj });
      }
    }
  }, [values]);

  useEffect(() => {
    if (name === "Medical Details") {
      checkCanProceed();
      const keys = Object.keys(values || {});

      let temp = keys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: Object.keys(values[key]).some(
            el => values[key][el][`is${el}`] === "Y",
          ),
        }),
        {},
      );
      setYesSelected(temp);
      console.log("skbjvkvb", temp, values, keys);
    }
  }, [values, noForAll]);

  // when no for all click
  useEffect(() => {
    if (name === "Medical Details") {
        console.log("sgsjghjskl",noForAll)
      let customizedVal = {};
      Object.keys(noForAll)
        .filter(key => noForAll[key])
        .forEach(key => {
          let tempGroupVal = {};
          schema[key].forEach(el => {
           if (!Array.isArray(el)) {
            if(el.additionalOptions.notAllowedIf === "N") {
          
              tempGroupVal[el.name] = {
                [`is${el.name}`]: "Y",
                members: {},
                isValid: true,
              };
            }else if(!el.additionalOptions.disable_Toggle){
              tempGroupVal[el.name] = {
                [`is${el.name}`]: "N",
                members: {},
                isValid: true,
              };
            }
              
            }
          });
          customizedVal[key] = {
            ...values?.[key],
            ...tempGroupVal,
          };
        });

      if (Object.keys(customizedVal).length)
        setValues({ ...values, ...customizedVal });
    }
  }, [noForAll]);

  return {
    noForAll,
    setNoForAll,
    checkCanProceed,
    canProceed,
    yesSelected,
  };
};

export default useMedicalQuestions;
