import React, { useEffect, useState } from "react";

const useMedicalQuestions = (schema, values, setValues, name,proposalData) => {
  const [noForAll, setNoForAll] = useState({});
  const [yesSelected, setYesSelected] = useState({});
  const [canProceed, setCanProceed] = useState({
    canProceed: false,
    canProceedArray: [],
  });

  const checkCanProceed = () => {
    const key = Object.keys(values || {});
    const key2 = Object.keys(noForAll || {});
    // const hasYes =
    //   values?.[key] &&
    //   Object.keys(values?.[key] || {})?.some(
    //     data => values?.[key]?.[data]?.[`is${data}`] === "Y",
    //   );

    if (key.length !== key2.length) {
      let noForAll2 = {};
      Object.keys(values || {}).forEach(element => {
        noForAll2[element] = noForAll[element] || false;
      });

      setNoForAll({ ...noForAll2 });
    } else {
      let isNotChecked = {};
      let hasYes = {};
      let checkCanProceed = [];
      key2.forEach(item => {
        if (noForAll[item] !== true) {
          isNotChecked[item] = false;
        } else {
          isNotChecked[item] = true;
        }
        const temp =
          values?.[item] &&
          Object.keys(values?.[item] || {})?.some(
            data => values?.[item]?.[data]?.[`is${data}`] === "Y",
          );
        if (temp === true) {
          hasYes[item] = true;
        } else {
          hasYes[item] = false;
        }
      });

      key.forEach(item => {
        if (hasYes[item] === isNotChecked[item]) {
          checkCanProceed.push(item);
        }
        if (
          Object.keys(values[item]).length &&
          !Object.keys(values[item]).every(el =>
            values[item][el] ? values[item][el].isValid : true,
          )
        ) {
          checkCanProceed.push(item);
        }
      });
      if (key2.length < 1) {
        isNotChecked = true;
      }

      if (checkCanProceed.length < 1) {
        setCanProceed({ canProceed: true, canProceedArray: [] });
      } else {
        setCanProceed({
          canProceed: false,
          canProceedArray: [...checkCanProceed],
        });
      }
    }
  };




// -----------------------------------------------------------------------------------------------------------------
//   -----------------------------  SIDE EFFECTS FOR MEDICAL QUESTIONS---------------------------------------------
// ----------------------------------------------------------------------------------------------------------------



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
              tempGroupVal[el.name] = {
                [`is${el.name}`]: "N",
                members: {},
                isValid: true,
              };
            }
          });
          customizedVal[key] = tempGroupVal;
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
