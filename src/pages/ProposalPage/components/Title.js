import React from "react";
import styled from "styled-components";
const Title = ({ name }) => {
  return <TitleWrapper>{name}</TitleWrapper>;
};

export default Title;
const TitleWrapper = styled.div`
  margin-bottom: 26px;
  font-size: 21px;
  color: #3b3838;
  font-weight: 900 !important;
  margin-top: -3px;
  background-image: linear-gradient(to right, #ffe7e7 5%, #fff 15%);
  padding: 5px 16px;
  border-radius: 6px;
  
  font-weight: 600;
  height: 40px;
  @media (max-width: 767px) {
    height: 29px;
    font-size: 16px;

    padding: 3px 12px;
    margin-bottom: 16px;
  }
`;
