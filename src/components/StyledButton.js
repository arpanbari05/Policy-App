import React from "react";
import styled from "styled-components/macro";
import { IoArrowForwardSharp } from "react-icons/io5";

const StyledButton = ({
  type,
  value,
  noIcon,
  onClick,
  children,
  customClass,
  width,
  height,
  bg,
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
      color={color}
      css={styledCss}
    >
      {value ? value : children} {!noIcon && <IoArrowForwardSharp />}
    </Button>
  );
};

StyledButton.defaultProps = {
  height: "58px",
  width: "100%",
  bg: "#0a87ff",
  color: "white",
};

export default StyledButton;

const Button = styled.button.attrs((props) => ({
  type: props.type,
}))`
  ${(props) => `
height: ${props.height};
width: ${props.width};
background: ${props.bg};
color: ${props.color};
`}

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
  /* padding: 10px 11px; */
  margin: 10px auto;
  transition: all 0.3s linear 0s;
  display: block;
  border-radius: 2px;
  font-size: 20px;
  font-weight: 400;

  float: left;
  left: 4px;
  position: inherit;
  @media (max-width: 480px) {
    font-size: 13px;
    width: 100%;
    padding: 5px 11px;
  }
`;
