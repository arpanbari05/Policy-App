import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DropDown from "./DropDown";
const feet = {
  12: "1 feet",
  24: "2 feet",
  36: "3 feet",
  48: "4 feet",
  60: "5 feet",
  72: "6 feet",
  84: "7 feet",
  96: "8 feet",
};
const inches = {
  0: "0 inches",
  1: "1 inches",
  2: "2 inches",
  3: "3 inches",
  4: "4 inches",
  5: "5 inches",
  6: "6 inches",
  7: "7 inches",
  8: "8 inches",
  9: "9 inches",
  10: "10 inches",
  11: "11 inches",
};
const Height = ({ onChange, value, error, readOnly }) => {
  const [combinedValue, setValue] = useState({
    feet: Math.floor(value / 12) * 12,
    inches: value % 12,
  });
  useEffect(() => {
    value &&
      setValue({
        feet: Math.floor(value / 12) * 12,
        inches: value % 12,
      });
  }, [value]);
  const [first, setFirst] = useState(true);
  useEffect(() => {
    if (!first) {
      onChange(
        parseInt(combinedValue.feet) + parseInt(combinedValue.inches) ||
          undefined,
      );
    } else setFirst(false);
  }, [combinedValue]);
  return (
    <>
      <Wrapper error={error}>
        <DropDown
          label="Height"
          dropPlaceholder="Feet"
          options={feet}
          height={true}
          borderR={true}
          readOnly={readOnly}
          onChange={e =>
            setValue(prev => {
              return {
                ...prev,
                feet: e.target.value,
                inches: !combinedValue.inches ? "0" : combinedValue.inches,
              };
            })
          }
          value={combinedValue.feet}
          checkValidation={{ required: true }}
        />
        <DropDown
          label="Inches"
          dropPlaceholder="inches"
          options={inches}
          readOnly={readOnly}
          height={true}
          onChange={e =>
            setValue(prev => {
              return { ...prev, inches: e.target.value };
            })
          }
          value={combinedValue.inches}
        />
      </Wrapper>
      <p className="formbuilder__error">{error}</p>
    </>
  );
};

export default Height;

const Wrapper = styled.div`
  // border-radius: 8px;
  margin-top: 5px;
  @media (max-width: 1023px) {
    margin-bottom: 8px;
  }
  // background: ${props => (props.error ? "#fff6f7" : "transparent")};
  border: ${props => (props.error ? "solid 1px #c7222a" : "solid 1px #ced4da")};

  & > div {
    width: 50%;
    display: inline-block;
    &:first-child > select {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    &:nth-child(2) > select {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }
`;
