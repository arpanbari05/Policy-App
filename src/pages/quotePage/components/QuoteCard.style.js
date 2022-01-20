import styled from "styled-components";

export const Outer = styled.div`
  margin-top: 13px;
  box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.16);
  padding-bottom: 5px;
  background-color: #fff;
  &:hover {
    box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.21);
  }
`;

export const EachWrapper = styled.div`
  width: 100%;
  margin: 5px 0px 0px;
  padding: 0px;
  height: 110px;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 23px;
    left: 13px;
    z-index: 0;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    border-right: 1px solid #c5c2c254;
  }
`;
export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export const Logo = styled.img`
  width: 100%;
`;
export const PlanName = styled.span`
  font-size: 14px;
  text-align: center;
  font-weight: bold;
`;
export const RadioButton = styled.button`
  margin: 20px 0px;
  height: 55px;
  width: 160px;
  padding: 10px;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  font-weight: 900 !important;
  border: none;
  background-color: ${props => props.PrimaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SmallLabel = styled.span`
  font-size: 13px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #808080;
  margin-bottom: 4px;
  @media (max-width: 1400px) and (min-width: 1200px) {
    width: 120px;
    font-size: 12px;
  }
  @media (max-width: 950px) {
    width: 120px;
    font-size: 12px;
  }
`;
export const ValueText = styled.span`
  font-size: 11px !important;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  margin-bottom: 16px;
  width: 146px;
  @media (max-width: 1400px) and (min-width: 1200px) {
    width: 120px;
    font-size: 13px;
  }
  @media (max-width: 950px) {
    width: 120px;
    font-size: 13px;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 146px;
  z-index: 88;
  margin-right: 5px;
  @media (max-width: 1400px) and (min-width: 1200px) {
    min-width: 120px;
  }
  @media (max-width: 950px) {
    min-width: 120px;
  }
`;
export const SeeText = styled.span`
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  cursor: pointer;
  line-height: normal;
  letter-spacing: normal;
  color: ${props => props.PrimaryColor};
  margin-bottom: 5px;
  border-bottom: 2px dotted ${props => props.PrimaryColor};
`;
export const CenterBottomStyle = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;
export const CenterBottomToggle = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 13px 20px 0px;
  margin: auto;
  background-color: #e2f0ff;
`;
export const RadioInput = styled.input`
  display: none;
  & label:before {
    content: "";
    width: 20px;
    height: 20px;
    line-height: 19px;
    border-radius: 50px;
    font-size: 11px;
    text-align: center;
    position: absolute;
    left: 0px;
    visibility: hidden;
    transition: all 0.1s ease-in-out;
  }
  &:checked + label:before {
    content: "\u2713";
    font-family: "font-awesome";
    background: ${props => props.PrimaryColor};
    color: #fff;
    border-color: ${props => props.PrimaryColor};
  }
`;
export const RadioLabel = styled.label`
  position: relative;
  font-size: 12px;
  font-weight: 900;
  color: #000;
  cursor: pointer;
  padding-left: 30px;
  /* margin: 30px 0 35px; */
  transition: all 0.1s ease-in-out;
  // font-family: PFEncoreSansProblck;
  top: -2px;
  margin-top: 5px;
  &:before {
    content: "";
    width: 17px;
    height: 17px;
    line-height: 17px;
    border-radius: 50px;
    border: 1px solid ${props => props.PrimaryColor};
    font-size: 11px;
    text-align: center;
    position: absolute;
    left: 8px;
    top: -1px;
    transition: all 0.1s ease-in-out;
  }
  @media (max-width: 1023px) {
    left: 33px;
    padding: unset !important;
    &:before {
      left: -28px !important;
    }
  }
`;
