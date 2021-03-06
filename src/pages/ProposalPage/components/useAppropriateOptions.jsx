import { useEffect, useState } from "react";

function useAppropriateOptions({
  values,
  allValues,
  asyncOptions,
  options,
  label,
  name,
  directUpdateValue,
  value,
  deleteValue,
}) {
  const [selectOption, setSelectOption] = useState(asyncOptions || options);

  // -----------------------------------------------------------------------------------------------------------------
  //   -----------------------------  SIDE EFFECTS FOR MEDICAL QUESTIONS---------------------------------------------
  // ----------------------------------------------------------------------------------------------------------------

  // selutation determination
  useEffect(() => {
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
    if (
      Object.keys(selectOption).length === 1 &&
      !value &&
      !Array.isArray(selectOption)
    ) {
      directUpdateValue(name, Object.keys(selectOption)[0]);
    }
  }, [selectOption]);

  useEffect(() => {
    if (asyncOptions) {
      setSelectOption(asyncOptions);
      if (value && !asyncOptions[value]) {
        deleteValue();
      }
    } else {
      if (allValues["Proposer Details"] && name === "nominee_relation") {
        if (allValues["Proposer Details"].gender === "M") {
          let { ...validOptions } = options;
          setSelectOption(validOptions);
        } else if (allValues["Proposer Details"].gender === "F") {
          const { ...validOptions } = options;
          setSelectOption(validOptions);
        }
        if (
          allValues["Proposer Details"].marital_status &&
          allValues["Proposer Details"].marital_status.toLowerCase() ===
            "single"
        ) {
          const { ...validOptions } = options;
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
