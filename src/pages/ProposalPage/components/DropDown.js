import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { setAsyncOptions } from "../../../components/FormBuilder/FormBuilder.slice";
import down from "./../../../assets/images/down-arrow.svg";
import up from "./../../../assets/images/up-arrow.svg";
const DropDown = ({
  label,
  onChange,
  height = false,
  borderR = false,
  reference,
  options = { value: "key" },
  value,
  error,
  asyncOptions,
  dropPlaceholder,
  readOnly,
}) => {
  const [selectOption, setSelectOption] = useState({});
  const [dataValue, setDataValue] = useState();
  useEffect(() => {
    if (asyncOptions) {
      setSelectOption(asyncOptions);
    } else setSelectOption(options);
  }, [asyncOptions]);

  return (
    <SelectContainer
      height={height}
    >
      <Select
        onChange={e => {
          onChange(e, selectOption[e.target.value]);
        }}
        value={value}
        disabled={readOnly}
        error={error}
        height={height}
        borderR={borderR}
      >
        <option value={""}>{dropPlaceholder || "- Select -"}</option>
        {Object.keys(selectOption).map(item => (
          <option key={item + selectOption[item]} value={item}>
            {selectOption[item]}
          </option>
        ))}
      </Select>
      <Label height={height}>{label}</Label>
      {error && <p className="formbuilder__error">{error}</p>}
    </SelectContainer>
  );
};

export default DropDown;
const SelectContainer = styled.div`
  margin-top:${props => (!props.height ? "0.3rem !important" : "9px !important")};
  position: relative;

  margin-bottom: ${props => (!props.height ? "12px !important" : "9px !important")};
  
  @media (max-width: 767px) {
    margin-bottom: 12px !important;
  }
`;

const Select = styled.select`
  appearance: none;
  background: url(${down}) no-repeat 98%;
  list-style: none;
  list-style-type: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  margin: 0;
  font-family: inherit;
  line-height: inherit;
  overflow: visible;
  outline: none;
  box-shadow: none;
  transition: border 0.3s ease-in-out;
  touch-action: manipulation;
  width: 100%;

  border: ${props => !props.height && "1px solid #ced4da"};

  border: ${props => (props.error && "solid 1px #c7222a")};
  border-radius: 8px;
  background-color: ${props => props.error && "#fff6f7"};

  height: ${props => (!props.height ? "55px" : "35px")};
  border-right: ${props => props.borderR && "1px solid #ced4da"};

  font-size: 16px;
  color: #939393;
  position: relative;
  padding: 0 25px;
  &:focus {
    
  border: ${props => (props.error && "solid 1px #c7222a")};
    color: black;
    background: url(${up}) no-repeat 98%;
  }

  @media (max-width: 767px) {
    font-size: 14px;
    height: ${props => (!props.height ? "42px" : "24px")};
    padding: 0 16px;
    border-radius: 6px;
  }
`;
const Label = styled.label`
  text-align: left;
  list-style: none;
  list-style-type: none;
  user-select: none;

  box-sizing: border-box;
  touch-action: manipulation;
  display: inline-block;
  font-size: 18px;
  color: #000;
  line-height: 14px;
  position: absolute;
  left: 20px;
  top: ${props => (!props.height ? "-8px" : "-18px")};
  margin: 0;
  background: #fff;
  transition: all 0.3s ease-in-out;
  font-weight: 900;
  padding: 0 5px;
  
  @media (max-width: 767px) {
    font-size: 14px;
    left: 10px;
  }
`;
