import React from "react";
import { useTheme } from "../../../customHooks";
import { RiShareForwardFill } from "react-icons/ri";
import styled from "styled-components";

const Sharebutton = ({ onClick = () => {} }) => {
  const { colors } = useTheme();

  return (
    <ShareButton onClick={onClick} color={colors.primary_color}>
      <span style={{marginRight: 5}}>Share</span>
      <RiShareForwardFill color={colors.primary_color} />
    </ShareButton>
  );
};

export default Sharebutton;

const ShareButton = styled.button`
  background-color: #fff;
  display: flex;
  align-items: center;
  border-radius: 100px;
  border: 2px solid ${props => props.color};
  color: ${props => props.color};
  padding: 5px 15px;
  font-size: 16px;
  margin: 0 15px;

  @media (max-width: 1499px) {
    font-size: 14px;
  }
`;
