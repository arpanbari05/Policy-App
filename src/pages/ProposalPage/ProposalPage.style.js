import styled from "styled-components";
export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;

  margin-top: 3px;
  width: 100%;
`;
export const MobileHeader = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: block;
    width: 101%;
    height: 54px;
    background-color: #c7222a;
  }
`;
export const MobileHeaderText = styled.p`
  color: #fff;
  padding-top: 10px;
  font-size: 16px;
`;
