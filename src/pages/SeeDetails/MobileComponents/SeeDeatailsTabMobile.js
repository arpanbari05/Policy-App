import React from "react";
import styled from "styled-components";
import planDetails from "../../../assets/images/plan_details.png";
import claim from "../../../assets/images/claims_p.png";
import useWindowSize from '../../../customHooks/useWindowSize'
import cashless from "../../../assets/images/cashless_p.png";
import addOn from "../../../assets/images/add_on.png";
import aboutCompany from "../../../assets/images/about_company.png";
import "./SeeDetailsTab.css";
function SeeDeatailsTabMobile({ activeFieldset, setActiveFieldset }) {
  const [windowHeight, windowWidth] = useWindowSize();
  return (
    <Outer>
      <div className="scroll">
        <div className={` plan ${activeFieldset === 1 && "plan__active"}`}>
          {/* <img src={planDetails} alt="" />{" "} */}
          <span onClick={() => setActiveFieldset(1)}>Plan Details</span>
        </div>
        <div className={` plan ${activeFieldset === 2 && "plan__active"}`}>
          {/* <img src={addOn} alt="" />{" "} */}
          <span onClick={() => setActiveFieldset(2)}>Add-on Coverages</span>
        </div>
        <div className={` plan ${activeFieldset === 3 && "plan__active"}`}>
          {/* <img src={cashless} alt="" />{" "} */}
          <span onClick={() => setActiveFieldset(3)}>Cashless Hospital</span>
        </div>
        <div className={` plan ${activeFieldset === 4 && "plan__active"}`}>
          {/* <img src={claim} alt="" />{" "} */}
          <span onClick={() => setActiveFieldset(4)}>Claim Process</span>
        </div>
        <div className={` plan ${activeFieldset === 5 && "plan__active"}`}>
          {/* <img src={aboutCompany} alt="" />{" "} */}
          <span onClick={() => setActiveFieldset(5)}>About Company</span>
        </div>
      </div>
    </Outer>
  );
}

const Outer = styled.div`
.scroll{
  margin-top: 10px;
  padding: 0px 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: fit-content;
  .plan {
    display: flex;
    align-items: center;
    padding-bottom: 5px;
    border-bottom: 5px solid #f4f5f7;
  }
  .plan__active{
    border-bottom: 5px solid#0d6efd;
  border-radius: 2px;
  }
  img {
    width: 30px;
    height: auto;
    margin: auto;
  }
  span {
    font-size: 13px;
    margin-left: 3px;
  }
  @media (max-width:700px){
    .plan__active{
    border-bottom: 2px solid#0d6efd;
  border-radius: 1px;
  }
    padding: 0px 2px;
    img {
    display: none;
  }
  span {
    font-size: 14px;
    margin-left: 1px;
  }
  }
  @media (max-width:500px){
    .plan__active{
    border-bottom: 3px solid#0d6efd;
  border-radius: 1px;
   }
    
  span{
    font-size:12px;
  }
    .plan {
    display: flex;
    align-items: center;
    padding-bottom: 5px;
    flex-direction: column;
    width: 50px;
    text-align: center;
    
  }
  }
  @media (max-width:400px){
    padding: 0px 1px;
  }
}
`;

export default SeeDeatailsTabMobile;
