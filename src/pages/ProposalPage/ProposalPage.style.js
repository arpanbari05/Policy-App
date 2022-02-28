import styled from "styled-components";
export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;

  margin-top: 3px;
  width: 100%;
`;
export const MobileHeader = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    padding: 10px;
    height: 54px;
    background-color: #0a87ff;
  }
`;
export const MobileHeaderText = styled.p`
  color: #fff;
  font-size: 17px;
  margin: 0;
  display: flex;
  align-items: center;
`;
