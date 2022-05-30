import React from "react";
import CustomCheckBox from "./customCheckBox";

function CheckBoxGroup({ item, onChange, value, error, innerMember }) {
  const { subQuestion } = item;

  return (
    <div className="w-100">
      {subQuestion.map(item => {
        return (
          <>
            <CustomCheckBox
              name={item.name}
              checkValidation={item.validate}
              innerMember={innerMember}
              width="100%"
              value={value[item.name] ? value[item.name] : "N"}
              onChange={e => {
                onChange("", {
                  ...value,
                  [item.name]: e.target.checked ? "Y" : "N",
                });
              }}
              {...item.additionalOptions}
            />
          </>
        );
      })}
      {error && <p className="formbuilder__error mt-3">{error}</p>}
    </div>
  );
}

export default CheckBoxGroup;
