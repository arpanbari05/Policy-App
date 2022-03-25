import React, { useEffect, useState } from "react";

function useAppropriateOptions({
  values,
  allValues,
  asyncOptions,
  options,
  label,
  name,
  directUpdateValue,
  value,
}) {
  const [selectOption, setSelectOption] = useState(asyncOptions || options);

  // -----------------------------------------------------------------------------------------------------------------
  //   -----------------------------  SIDE EFFECTS FOR MEDICAL QUESTIONS---------------------------------------------
  // ----------------------------------------------------------------------------------------------------------------

  // selutation determination
  useEffect(() => {
    console.log(
      "dbnjdfkbf",
      values,
      selectOption,
      label,
      options,
      value,
      allValues["Proposer Details"],
    );
    if (
      values &&
      values.gender &&
      values.gender === "F" &&
      label.toLowerCase().includes("title")
    ) {
      setSelectOption(
        Object.keys(options).reduce((acc, key) => {
          return key !== "mr" ? { ...acc, [key]: options[key] } : { ...acc };
        }, {}),
      );
    } else if (
      values &&
      values.gender &&
      values.gender === "M" &&
      label.toLowerCase().includes("title")
    ) {
      setSelectOption(
        Object.keys(options).reduce((acc, key) => {
          return key !== "ms" && key !== "mrs"
            ? { ...acc, [key]: options[key] }
            : { ...acc };
        }, {}),
      );
    }
  }, [values]);

  useEffect(() => {
    if (Object.keys(selectOption).length === 1 && !values[name])
      directUpdateValue(name, Object.keys(selectOption)[0]);
  }, [selectOption]);

  useEffect(() => {
    if (asyncOptions) {
      setSelectOption(asyncOptions);
    } else {
      if (allValues["Proposer Details"] && name === "nominee_relation") {
        if (allValues["Proposer Details"].gender === "M") {
          let { husband, ...validOptions } = options;
          setSelectOption(validOptions);
        } else if (allValues["Proposer Details"].gender === "F") {
          const { wife, ...validOptions } = options;
          setSelectOption(validOptions);
        }
        if (
          allValues["Proposer Details"].marital_status &&
          allValues["Proposer Details"].marital_status === "single"
        ) {
          const { wife, husband, spouse, ...validOptions } = options;
          setSelectOption(validOptions);
        }
      }
    }
  }, [asyncOptions]);

  return {
    selectOption,
  };
}

export default useAppropriateOptions;
