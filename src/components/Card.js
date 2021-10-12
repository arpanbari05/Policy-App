import React from "react";
import styled from "styled-components/macro";

const Card = ({
  height,
  width,
  borderRadius,
  customClassName,
  padding,
  margin,
  color,
  BgColor,
  children,
  boxShadow,
  styledCss,
  onClick
}) => {
  return (
    <Container
      height={height}
      width={width}
      borderRadius={borderRadius}
      className={`${customClassName}`}
      padding={padding}
      margin={margin}
      color={color}
      BgColor={BgColor}
      boxShadow={boxShadow}
      css={styledCss}
      onClick={onClick}
    >
      {children}
    </Container>
  );
};

export default Card;

Card.defaultProps = {
  height: "auto",
  width: "100%",
  borderRadius: "0",
  padding: "10px",
  margin: "auto",
  color: "#000",
  BgColor: "#fff",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};

const Container = styled.div`
  ${(props) => `
height: ${props.height};
width: ${props.width};
padding: ${props.padding};
margin: ${props.margin};
color: ${props.color};
background: ${props.BgColor};
border-radius: ${props.borderRadius};
box-shadow: ${props.boxShadow};

`}
  position: relative;
`;
