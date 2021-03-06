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
    justify-content: space-between;
    padding: 10px;
    height: 54px;
    background-color: ${({ primary_color }) => primary_color};
  }
`;
export const MobileHeaderText = styled.p`
  color: #fff;
  font-size: 17px;
  margin: 0;
  display: flex;
  align-items: center;
`;
