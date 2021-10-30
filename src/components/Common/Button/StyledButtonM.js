import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
const StyledButtonM = ({
  type,
  value,
  noIcon,
  onClick,
  children,
  customClass,
}) => {
  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;

  return (
    <Button
      PrimaryColor={PrimaryColor}
      type={type}
      data-page="1"
      name="next"
      value={value}
      onClick={onClick}
      className={`styled__button ${customClass}`}
    >
      {value ? value : children}{" "}
      {!noIcon && <i className="icon flaticon-next"></i>}
    </Button>
  );
};

export default StyledButtonM;

const Button = styled.button.attrs((props) => ({
  type: props.type,
}))`
  box-sizing: border-box;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  font-family: inherit;
  overflow: visible;
  text-transform: none;
  outline: none;
  box-shadow: none;
  width: 95% !important;
  background: ${(props) => props.PrimaryColor};
  color: white;
  border: 0 none;
  cursor: pointer;
  padding: 10px 11px;
  margin: 10px auto;
  transition: all 0.3s linear 0s;
  display: block;
  border-radius: 2px;
  font-size: 20px;
  font-weight: 400;
  line-height: 35px;
  height: 58px;
  z-index: 9999;
  float: left;
  left: 4px;
  box-shadow: 0px 0px 2px grey;
  position: sticky;
  bottom: 10px;
`;
