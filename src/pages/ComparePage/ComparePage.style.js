import styled from "styled-components";
export const PopupWrapper = styled.div`
  padding: 0 24px;
  @media (max-width:1170px){
    padding: 0px;
  }
`;
export const PopupWrapperM = styled.div`
  padding: 0;
  width:100%;
`;
export const MergedQuotes = styled.div`
  margin-bottom: 18px;
`;
export const SelectedProduct = styled.div`
  padding: 19px 12px 32px 12px;
  border-radius: 4px;
  position: relative;
  height: 150px;
  box-shadow: ${props =>
    props.first
      ? " 0 10px 20px 0 #ffe7e8"
      : "0 10px 20px 0 rgba(143, 143, 143, 0.16)"};
  border: ${props => (props.first ? "solid 2px #c7222a" : "none")};
  background-color: #ffffff;
`;
export const LogoWrapper = styled.div`
  width: 50px;
  height: 50px;
  float: left;
`;
export const AddPlan = styled.div`
  padding: 30px 220px 53px 27px;
  border-radius: 4px;
  background-color: #f4f4f4;
  height: 150px;
  position: relative;
`;
export const Line = styled.div`
  border-bottom: dashed 1px #74778a;
  width: 100%;
  margin-bottom: 18px;
`;
export const CompareQuotes = styled.div`
  height: 344px;
  overflow-y: auto;
  overflow-x: hidden;
`;
export const QuoteNameM = styled.div`
  margin-left: 60px;
  font-family: pf_handbook_proregular;
  font-size: 15px;
`;
export const QuoteName = styled.div`
  margin-left: 60px;
  font-family: pf_handbook_proregular;
  font-size: 18px;
`;
export const DropDownWrapper = styled.div`
  position: absolute;
  width: calc(100% - 24px);
  & > div {
    height: 50px;
  }
  bottom: 30px;
  left: 12px;
`;
export const ErrorAddPlan = styled.div`
  color: #bd2b2b;
  font-size: 16px;
  position: absolute;
  bottom: -6px;
`;
export const QuoteWrapperM  = styled.div`
  height: 117px;
  margin-bottom: 10px;
  padding: 10px 15px ;
  border-radius: 4px;
  position: relative;
  box-shadow: 0 10px 20px 0 rgba(143, 143, 143, 0.16);
  background-color: #ffffff;
`;
export const QuoteWrapper = styled.div`
  height: 145px;
  margin-bottom: 20px;
  padding: 20px 12px 25px;
  border-radius: 4px;
  position: relative;
  box-shadow: 0 10px 20px 0 rgba(143, 143, 143, 0.16);
  background-color: #ffffff;
`;
export const EmailSent = styled.div`
  margin-top: -20px;
  width: max-content;
  display: inline-block;
  width: 421px;
  border-radius: 7px;
  background-color: ${props => (props.status ? " #f0fff2" : "#fff")};
  padding: 8px 16px 8px;

  color: ${props => (props.status ? "#1f874c" : "#bd2b2b")};
`;
export const RemoveCross = styled.div`
  cursor: pointer;
  position: absolute;
  padding: 12.2px 12.1px 12.1px 12.2px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  color: #000;
  font-size: 14px;

  right: 0;
  top: 0;
  border-radius: 50%;
  transform: translate(50%, -50%);
  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  & @media (max-width: 768px) {
    top:12px;
    right:12px;
  }
`;
export const CrossWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  color: #9b9b9b;
`;
export const PlusWrapper = styled.div`
  background-color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  display: inline-block;
  & i {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }
`;
export const NameWrapper = styled.div`
  margin-left: 60px;
`;
export const PlanDetails = styled.div`
  width: calc(100% - 60px);
  margin-top: 18px;
  position: absolute;
  bottom: 18px;
`;
export const DetailWrapper = styled.div`
  display: inline-block;
  width: calc(50% - 28px);
  &:first-child {
    border-right: 1px solid #a4a4a4;
    margin-right: 40px;
  }
  &:nth-child(2) {
    width: calc(50% - 12px);
  }
`;
export const Title = styled.div`
  font-size: 16px;
`;
export const Value = styled.div`
  font-family: pf_handbook_probold;
  font-size: 18px;
`;
export const CompanyName = styled.div`
  font-family: pf_handbook_probold;
  font-size: 17px;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.7;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-bottom: 5px;
`;
export const PlanName = styled.div`
  font-family: pf_handbook_proregular;
  font-size: 14px;
  line-height: 1.19;
`;
export const RiderWrapper = styled.div`
  &:before,
  &:after {
    content: "";
    clear: both;
    display: table;
  }
  display: ${props => !props.show && "none"};
  position: relative;
  padding: 6px 14px 6px 10px;
  border-radius: 10px;
  background-color: #fff1f2;
  margin-bottom: 32px;
  min-height: fit-content;
  & @media (max-width: 768px){
    margin-bottom: 4px !important;
  }
`;
export const RiderName = styled.div`
  display: inline-block;

  max-width: 64%;
  float: left;
`;
export const RiderPremium = styled.div`
  display: inline-block;
  position: absolute;
  right: 10px;
  top: 6px;
  & > div {
    display: inline-block;
  }
`;
