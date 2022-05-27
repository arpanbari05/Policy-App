import React from "react";
import TextInput from "./TextInput";

const TextGroup = ({ members, label, checkValidation }) => {
  return (
    <>
      {members.map((member, index) => {
        return (
          <TextInput
            key={index}
            label={`${label} for ${member}`}
            checkValidation={checkValidation}
          />
        );
      })}
    </>
  );
};

export default TextGroup;
