import styled from "styled-components";
export const PopupWrapper = styled.div`
  padding: 0 24px;
  @media (max-width: 1170px) {
    padding: 0px;
  }
`;
export const PopupWrapperM = styled.div`
  padding: 0;
  width: 100%;
`;
export const MergedQuotes = styled.div`
  margin-bottom: 18px;
`;
export const SelectedProduct = styled.div`
  padding: 19px 12px 32px 12px;
  border-radius: 4px;
  position: relative;
  height: 150px;
  box-shadow: 0 10px 20px 0 rgba(143, 143, 143, 0.16);
  border: solid 2px white;
  &:hover {
    border: solid 2px #0a87ff;
  }
  background-color: #ffffff;
  @media (max-width:400px){
    padding: 19px 3px 32px 3px !important;
  }
          
`;
export const LogoWrapper = styled.div`
  width: 50px;
  height: 50px;
  padding:2px;
  float: left;
  margin-right:5px;
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

  font-size: 15px;
`;
export const QuoteName = styled.div`
  margin-left: 60px;
height:45px;
display:flex;
align-items: center;
  font-size: 15px;
`;
export const DropDownWrapper = styled.div`
  position: absolute;
  width: calc(100% - 24px);
  & > div {
    height: 50px;
  }
  bottom: 15px;
  left: 12px;
 
`;
export const ErrorAddPlan = styled.div`
  color: #bd2b2b;
  font-size: 16px;
  position: absolute;
  bottom: -6px;
`;
export const QuoteWrapperM = styled.div`
  height: 110px;
  margin-bottom: 10px;
  padding: 10px 15px;
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
  margin-top: 10px;
  width: max-content;
  display: inline-block;
  width: 100%;
  text-align: center;
  border-radius: 7px;
  background-color: ${(props) => (props.status ? " #f0fff2" : "#fff")};
  padding: 8px 16px 8px;

  color: ${(props) => (props.status ? "#1f874c" : "#bd2b2b")};
`;
export const RemoveCross = styled.div`
  cursor: pointer !important;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 16%) !important;
  background-color: white !important;
  color: #000;
  font-size: 14px;
  width: 25px;
  height: 25px;
  right: 1px;
  top: -1px;
  border-radius: 100%;
  transform: translate(50%, -50%);

  @media (max-width: 768px) {
    top: 0px;
    right: 0px;
  }
  @media (max-width: 500px) {
    font-size: 10px;
    width: 20px;
    height: 20px;
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
    margin-right: 15px;
  }
  &:nth-child(2) {
    width: calc(50% - 12px);
  }
`;
export const Title = styled.div`
  color: #505f79;
  font-size: 14px;
  @media (max-width:400px){
    font-size: 10px;
  }
`;
export const Value = styled.div`
  font-weight: 900;
  font-size: 16px;
  font-family:"Inter-SemiBold";
  @media (max-width:400px){
    font-size: 10px;
  }
`;
export const CompanyName = styled.div`
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
 justify-content:center;
    height: 30px;
    display: flex;
    text-align: center;
    align-items: center;
  letter-spacing: normal;
  text-align: center;
  color: #253858;
  margin-bottom: 5px;
  @media (max-width: 767px) {
    font-size: 12px;
  }
`;
export const PlanName = styled.div`
  font-size: 14px;
  line-height: 1.19;
`;
export const RiderWrapper = styled.div`
cursor: pointer;
  &:before,
  &:after {
    content: "";
    clear: both;
    display: table;
  }
  display: ${(props) => !props.show && "none"};
  position: relative;
  padding: 10px;
  border-radius: 10px;
  background-color: #eff7ff;
  margin-bottom: 32px;
  min-height: fit-content;
  display: flex;
  @media (max-width: 768px) {
    margin-bottom: 4px !important;
  }
`;
export const RiderName = styled.div`
  display: inline-block;
font-size:15px;
  max-width: 64%;
  float: left;

  @media (max-width:767px){
font-size:12px;
  }
`;
export const RiderPremium = styled.div`
 
  position: absolute;
  display: flex;
    align-items: center;
  right: 10px;
  top: -1px;
  bottom: 0;
  height: 27px;
  margin: auto 0;
  & > div {
    display: inline-block;
  }
`;
