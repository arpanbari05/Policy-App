import { useEffect, useState } from "react";
import { getMedicalUrlsRuleEngine } from "./ProposalSections.slice";

const useMedicalQuestions = ({
  schema,
  values,
  setValues,
  name,
  proposalData,
  defaultValue,
  dispatch,
  isVersionRuleEngine,
  medicalUrlsRuleEngine,
  underWritingStatus,
}) => {
  const [noForAll, setNoForAll] = useState({});
  const [preparingMQ, setPreparingMQ] = useState(false);
  const [yesSelected, setYesSelected] = useState({});
  const [canProceed, setCanProceed] = useState({
    canProceed: false,
    canProceedArray: {},
  });
  const noForAllHelper = groupKey => {
    let tempGroupVal = {};
    schema[groupKey].forEach(el => {
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
    return tempGroupVal;
  };

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
        if (typeof values[item] === "object" && values[item]) {
          if (noForAll[item] !== true) {
            isNotChecked[item] = false;
          } else {
            isNotChecked[item] = true;
          }
          const temp = Object.keys(values[item])?.some(
            data => values?.[item]?.[data]?.[`is${data}`] === "Y",
          );
          if (temp === true) {
            hasYes[item] = true;
          } else {
            hasYes[item] = false;
          }
        } else {
          hasYes[item] = true;
        }
      });

      key.forEach(item => {
        if (hasYes[item] === isNotChecked[item]) {
          checkCanProceed[item] = checkCanProceed[item]
            ? checkCanProceed[item]
            : [];
        }

        Object.keys(values[item]).length &&
          Object.keys(values[item])?.forEach(el => {
            let schemaOfEl = schema[key]?.find(({ name }) => name === el);

            if (schemaOfEl) {
              if (
                values[item][el] &&
                ((!values[item][el][`is${el}`] &&
                  !schemaOfEl?.additionalOptions?.disable_Toggle) ||
                  !values[item][el].isValid)
              )
                checkCanProceed[item] = Array.isArray(checkCanProceed[item])
                  ? [...checkCanProceed[item], el]
                  : [el];
            }
          });
      });

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

  const getScheamaOfValue = (key, mqname) => {
    return schema[key].find(({ name }) => name === mqname);
  };

  const getMUStatus = member => {
    return underWritingStatus
      ?.find(({ final_result }) =>
        final_result?.members?.find(
          singleMemberObj =>
            singleMemberObj?.member_id ===
            medicalUrlsRuleEngine[member].member_id,
        ),
      )
      ?.final_result?.members?.find(
        singleMemberObj =>
          singleMemberObj?.member_id ===
          medicalUrlsRuleEngine[member].member_id,
      )?.result;
  };

  // -----------------------------------------------------------------------------------------------------------------
  //   -----------------------------  SIDE EFFECTS FOR MEDICAL QUESTIONS---------------------------------------------
  // ----------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (name === "Medical Details") {
      if (defaultValue) {
        setValues(defaultValue);
      }
      let ruleEngineGroup = Object.keys(schema).filter(group =>
        isVersionRuleEngine(parseInt(group)),
      );
      if (ruleEngineGroup.length) {
        // if rule engine is true then set other MQ noFORALL
        ruleEngineGroup.forEach(group =>
          setValues(prev => ({ ...prev, [group]: noForAllHelper(group) })),
        );

        if (!medicalUrlsRuleEngine) {
          setPreparingMQ(true);
          dispatch(
            getMedicalUrlsRuleEngine(() => {
              setPreparingMQ(false);
            }),
          );
        }
      }
    }
  }, []);

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
      // getScheamaOfValue

      let temp = keys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: Object.keys(values[key])
            .filter(
              el =>
                !getScheamaOfValue(key, el)?.additionalOptions
                  ?.disable_Toggle &&
                !getScheamaOfValue(key, el)?.additionalOptions?.notAllowedIf,
            )
            .some(el => values[key][el][`is${el}`] === "Y"),
        }),
        {},
      );
      setYesSelected(temp);
    }
  }, [values, noForAll]);

  return {
    noForAll,
    setNoForAll,
    checkCanProceed,
    canProceed,
    yesSelected,
    preparingMQ,
    getMUStatus,
  };
};

export default useMedicalQuestions;
