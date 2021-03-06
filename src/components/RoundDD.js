import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "../customHooks";
import useOutsiteClick from "../customHooks/useOutsideClick";
import { months2years } from "../utils/helper";

const RoundDD = ({
  disabled,
  list,
  handleChange,
  type,
  selected,
  redBorder,
  code,
  member,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [ageList, setAgeList] = useState(list);
  const { colors } = useTheme();
  const dropdownRef = useRef(null);
  useOutsiteClick(isOpen && dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    const array = list.filter(data =>
      data?.title?.toLowerCase().includes(searchText?.toLowerCase()),
    );
    setAgeList(array);
  }, [searchText, list]);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };
  const handleSelect = (value, data) => {
    const isMonth = data.title.search("Months");
    const newData = {
      title: data.title,
      id: months2years(data.title.split(" ")[0]),
    };
    handleChange(code, value, type, isMonth === -1 ? data : newData);

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
            onChange={e => {
              const value = e.target.value.replace(/\D/g, "");
              if (value <= list[list.length - 1].id) {
                setSearchText(value);
              }
            }}
          />
        )}
        <Header
          onClick={toggleList}
          css={`
            border: ${member?.isSelected &&
            redBorder &&
            "1px solid red !important"};
            box-shadow: ${member?.isSelected && redBorder
              ? "red 0px 0px 0.5px 0.9px"
              : null};
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
            <span
              css={`
                visibility: ${isOpen && "hidden"};
                user-select: none;
              `}
            >
              {selected}
            </span>
          </HeaderTitle>
        </Header>
        {isOpen && (
          <List
            style={{
              visibility: "visible",
              width: "174.562px",
              top: "42px",
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
            {ageList.map(data => {
              return (
                <ListItem
                  primaryColor={colors.primary_color}
                  className={`GreetingDD__ListItem`}
                  onClick={() => handleSelect(data.title, data)}
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
  position: absolute !important;
  top: -3px !important;
  left: -7px !important;
  z-index: 99;
  border: none !important;
  // box-shadow: unset important;
  margin: 13px 16px 20px !important;
  padding: 4px 8px !important;
  width: 58% !important;
  font-size: 12px;
  font-weight: 400 !important;
  background-color: #fff;
  color: #6b7789;

  @media screen and (max-width: 480px) {
    background-color: #fff;
    color: #6b7789;
  }

  &:focus {
    outline: none;
  }
  &:focus::placeholder {
    opacity: 1 !important;
  }
`;

export const Label = styled.label`
  position: absolute;
  z-index: -1;
  top: -10px;
  left: 18px;
  font-size: 12px;
`;

export const Wrapper = styled.div`
  position: relative;
  margin: 5px 0;
`;

export const Header = styled.a`
  cursor: pointer;
  background-color: #fff;
  position: relative;
  color: #6b7789;
  border: 1px solid #b0bed0;
  padding: ${props => (props.sortByDD ? "auto" : "12px 15px !important")};
  display: inline-block;
  width: ${props => (props.sortByDD ? "auto" : "175px")};
  // overflow: hidden;
  position: relative;
  z-index: 1;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  border-radius: 50px;

  &.active {
    border-radius: 3px 3px 0 0;
  }
  @media (max-width: 767px) {
    margin: unset;
    width: 130px;
    padding: ${props => (props.sortByDD ? "auto" : "10px 10px !important")};
  }
  @media (max-width: 480px) {
    background-color: #fff !important;
    width: 108px;
    border: 1px solid #b0bed0;
    padding: ${props => (props.sortByDD ? "auto" : "7px 10px !important")};
  }
`;

export const HeaderTitle = styled.div`
  position: relative;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: #6b7789;
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 20%;
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
    top: 37%;
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
  // border: 1px solid #d0d0d0;
  background: #fff;
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
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  padding: 5px 8px 8px 14px;
  background-color: #fff;

  &:hover,
  &.active {
    background-color: ${props => props.primaryColor};
    color: #fff;
  }
`;
