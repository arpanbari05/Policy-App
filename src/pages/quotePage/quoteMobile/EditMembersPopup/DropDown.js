import React, { useState, useRef } from "react";
import useOutsiteClick from "../../../../customHooks/useOutsideClick";
import { v4 as uuidv4 } from "uuid";
import {
  Header,
  HeaderTitle,
  List,
  ListItem,
  Wrapper,
} from "../../../../components/Common/DropDownComponents/DropDownComponents";
import "styled-components/macro";
import { useSelector } from "react-redux";
const GreetingFormDropdown = ({
  disabled,
  title,
  list,
  handleChange,
  type,
  selected,
  code,
  editM,
  redBorder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;

  const dropdownRef = useRef(null);
  useOutsiteClick(isOpen && dropdownRef, () => setIsOpen(false));

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    handleChange(code, value, type);
    setIsOpen(!isOpen);
  };

  return (
    <label htmlFor={disabled && title}>
      <Wrapper editM ref={dropdownRef} className="GreetingDD__Wrapper">
        <Header
          css={`
            border: ${redBorder && "1px solid red !important"};
          `}
          onClick={toggleList}
          className={`${isOpen && "active"} GreetingDD__Header ${
            disabled && "disabled"
          }`}
        >
          <HeaderTitle
            className={`${isOpen && "active"} GreetingDD__Title ${
              disabled && "font-gray"
            }`}
          >
            {selected?.toString().startsWith("0")
              ? selected?.split(" ")[0].split(".")[1] + " months"
              : selected}
          </HeaderTitle>
        </Header>
        {isOpen && (
          <List
            style={{
              visibility: "visible",
              width: "174.562px",
              top: "44px",
            }}
            className="GreetingDD__List"
            css={`
              left: 0px;
              @media (max-width: 767px) {
                width: 129.562px !important;
                left: -1px;
              }
            `}
          >
            {list.map((data) => {
              return (
                <ListItem
                PrimaryShade={PrimaryShade}
                  className={`${
                    data.title === selected && "active"
                  } GreetingDD__ListItem`}
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
export default GreetingFormDropdown;
