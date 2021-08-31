import React, { useState, useRef, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

import styled from "styled-components/macro";
import useOutsiteClick from "../customHooks/useOutsideClick";

const RoundDD = ({
  disabled,
  title,
  list,
  handleChange,
  type,
  selected,
  redBorder,
  code,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [ageList, setAgeList] = useState(list);

  const dropdownRef = useRef(null);
  useOutsiteClick(isOpen && dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    const array = list.filter((data) =>
      data?.title?.toLowerCase().includes(searchText?.toLowerCase())
    );
    setAgeList(array);
  }, [searchText,list]);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };
  const handleSelect = (value) => {
    handleChange(code, value, type);

    setIsOpen(!isOpen);
  };

  return (
    <label htmlFor={disabled && code} {...props}>
      <Wrapper ref={dropdownRef} className="GreetingDD__Wrapper">
        {isOpen && (
          <InputField
            style={{ position: "absolute" }}
            value={searchText}
            placeholder={"type here..."}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              console.log(list[list.length - 1]);
              if (value <= list[list.length - 1].id) {
                setSearchText(value);
              }
            }}
          />
        )}
        <Header
          onClick={toggleList}
          css={`
            border: ${redBorder && "1px solid red !important"};
          `}
          className={`${isOpen && "active"} GreetingDD__Header ${
            disabled && "disabled"
          }`}
        >
          <HeaderTitle
            className={`${isOpen && "active"} GreetingDD__Title ${
              disabled && "font-gray"
            }`}
          >
            {selected}
          </HeaderTitle>
        </Header>
        {isOpen && (
          <List
            style={{
              visibility: "visible",
              width: "174.562px",
              top: "44px",
              left: "0px",
            }}
            css={`
              @media (max-width: 767px) {
                left: -2px !important;
                width: 130px !important;
              }
            `}
            className="GreetingDD__List"
          >
            {ageList.map((data) => {
              return (
                <ListItem
                  className={`GreetingDD__ListItem`}
                  onClick={() => handleSelect(data.title)}
                  key={uuidv4()}
                >
                  {data.title}
                </ListItem>
              );
            })}
          </List>
        )}
      </Wrapper>
    </label>
  );
};

export default RoundDD;

const InputField = styled.input`
  poistion: absolute !important;
  top: -8px !important;
  left: -7px !important;
  z-index: 99;
  border: none !important;
  // box-shadow: unset important;
  margin: 13px 16px 20px !important;
  padding: 4px 8px !important;
  width: 58% !important;
  font-size: 17px !important;
  font-weight: 400 !important;

  color: #000 !important;
  &:focus::placeholder {
    opacity: 1 !important;
  }
`;

export const Label = styled.label`
  position: absolute;
  z-index: -1;
  top: -10px;
  background: #fff;
  left: 18px;
  font-size: 13px;
`;

export const Wrapper = styled.div`
  position: relative;
  margin: 10px 0;
`;

export const Header = styled.a`
  cursor: pointer;
  background-color: #fff;
  position: relative;
  border: 0.2px solid #dfe1f2;
  padding: ${(props) => (props.sortByDD ? "auto" : "12px 15px !important")};
  display: inline-block;
  width: ${(props) => (props.sortByDD ? "auto" : "175px")};
  overflow: hidden;
  position: relative;
  z-index: 1;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 10%);
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 10%);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 50px;
  box-shadow: 0 12px 12px -11px #004b8347;
  margin: 0px 53px 0 2px;

  &.active {
    border-radius: 3px 3px 0 0;
    box-shadow: inset 0 1px 2px rgb(0 0 0 / 15%);
  }
  @media (max-width: 767px) {
    margin: unset;
    width: 130px;
  }
`;

export const HeaderTitle = styled.div`
  position: relative;
  font-size: 17px;
  font-weight: 400;
  line-height: 18px;
  color: #000;
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 37%;
    right: 7px;
    /* margin-top: -3px; */
    width: 0;
    height: 0;
    /* border: solid #7b7b7b; */
    border: solid #000;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
  &.active:after {
    top: 43%;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }
  & input {
    position: absolute;
    border: none;
    outline: none;
  }
`;
export const List = styled.div`
  position: absolute;
  z-index: 10000;
  border: 1px solid #d0d0d0;
  background: #fff;
  margin: 0px 0px 0 2px;
  border-top: 0 none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
  -webkit-border-radius: 0 0 3px 3px;
  -moz-border-radius: 0 0 3px 3px;
  border-radius: 0 0 3px 3px;

  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100px;
  -webkit-overflow-scrolling: touch;
`;
export const ListItem = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  padding: 5px 8px 8px 14px;

  &:hover,
  &.active {
    background-color: #fff5f6;
    color: #495c68;
  }
`;
