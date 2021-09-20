import React from "react";
import styled from "styled-components/macro";
import { IoArrowBackSharp } from "react-icons/io5";

const BackButton = ({
  type,
  value,
  onClick,
  children,
  customClass,
  width,
  height,
  bg,
  icon,
  color,

  styledCss,
}) => {
  return (
    <Button
      type={type}
      data-page="1"
      name="next"
      value={value}
      onClick={onClick}
      className={`styled__button ${customClass}`}
      width={width}
      height={height}
      bg={bg}
      color={color?color:`#253858`}
      css={styledCss}
    >
      {icon ? icon : <IoArrowBackSharp />} {value ? value : children}
    </Button>
  );
};

BackButton.defaultProps = {
  height: "58px",
  width: "100%",
  bg: 'unset'
};

export default BackButton;

const Button = styled.button.attrs((props) => ({
  type: props.type,
}))`
  ${(props) => `
height: ${props.height};
width: ${props.width};
background: ${props.bg};
color: ${props.color};
`}
  font-weight: 900;
  box-sizing: border-box;
  user-select: none;
  touch-action: manipulation;
  font-family: inherit;
  overflow: visible;
  text-transform: none;
  outline: none;
  box-shadow: none;
  border: 0 none;
  cursor: pointer;
  padding: 10px 11px;
  margin: 10px auto;
  transition: all 0.3s linear 0s;
  display: block;
  border-radius: 2px;
  font-size: 20px;
 
  line-height: 35px;
  z-index: 9999;
  float: left;
  left: 4px;
  position: inherit;
`;
