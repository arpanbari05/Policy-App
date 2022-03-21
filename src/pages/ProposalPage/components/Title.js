import React from "react";
import styled from "styled-components";

const Title = ({ name }) => {
  return <TitleWrapper>{name.includes("_")?name.replaceAll("_"," "):name}</TitleWrapper>;
};

export default Title;
const TitleWrapper = styled.div`
  margin-bottom: 26px;
  font-size: 21px;
  color: #3b3838;
  font-weight: 900 !important;
  margin-top: -9px;
  margin-bottom: 22px;
  padding: 15px 4px;
  font-weight: 600;
  border-bottom: 1px dashed #ced4da;
  height: 54px;
  text-transform: capitalize;
  @media (max-width: 767px) {
    height: 29px;
    font-size: 16px;

    padding: 3px 12px;
    margin-bottom: 16px;
  }
`;
