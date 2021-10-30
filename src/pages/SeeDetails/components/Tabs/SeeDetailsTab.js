import React, { useState } from "react";
import SeeDetailsTabContainer from "./SeeDetailsTabContainer";
import planDetails from "../../../../assets/images/plan_details.png";
import claim from "../../../../assets/images/claims_p.png";
import cashless from "../../../../assets/images/cashless_p.png";
import addOn from "../../../../assets/images/add_on.png";
import styled from "styled-components";
import aboutCompany from "../../../../assets/images/about_company.png";
import windowSize from "../../../../customHooks/useWindowSize";
import "styled-components/macro";
import { useSelector } from "react-redux";

const SeeDetailsTab = ({ activeFieldset, setActiveFieldset }) => {
  const [windowHeight, windowWidth] = windowSize();

  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;

  return (
    <SeeDetailsTabT
      id="theme-tab-twlv"
      className="theme-tab-basic tab-dark theme-tab hover contained medium z-icons-dark z-shadows z-bordered z-tabs horizontal top top-left silver"
      data-role="z-tabs"
      //	data-options='{"theme": "silver", "orientation": "horizontal", "animation": {"duration": 400, "effects": "slideH"}}'
    >
      <SeeDetailsTabWrapper
        className="tab_modal_product_d  tabs-menu clearfix z-tabs-nav z-tabs-desktop z-hide-menu see-details__tab-modal"
        style={{ display: "flex", justifyContent: "space-between" }}
        SecondaryShade={SecondaryShade}
      >
        <SeeDetailsTabContainer
          title={"Plan Details"}
          id={1}
          onClick={(id) => setActiveFieldset(id)}
          activeFieldset={activeFieldset}
          image={planDetails}
        />
        <SeeDetailsTabContainer
          title={"Add-on Coverages"}
          id={2}
          onClick={(id) => setActiveFieldset(id)}
          activeFieldset={activeFieldset}
          image={addOn}
        />
        <SeeDetailsTabContainer
          title={"Cashless Hospitals"}
          id={3}
          onClick={(id) => setActiveFieldset(id)}
          activeFieldset={activeFieldset}
          image={cashless}
        />
        <SeeDetailsTabContainer
          title={"Claim Process"}
          id={4}
          onClick={(id) => setActiveFieldset(id)}
          activeFieldset={activeFieldset}
          image={claim}
        />
        <SeeDetailsTabContainer
          title={"About Company"}
          id={5}
          onClick={(id) => setActiveFieldset(id)}
          activeFieldset={activeFieldset}
          image={aboutCompany}
        />
      </SeeDetailsTabWrapper>
    </SeeDetailsTabT>
  );
};

const SeeDetailsTabT = styled.div`
  margin: 0 -15px;
  margin-top: 97px;
  @media (max-width: 1024px) {
    margin-top: 0px;
  }
`;

const SeeDetailsTabWrapper = styled.ul`
  background: ${props=>props.SecondaryShade} !important;
  box-shadow: 0 3px 6px 0 #004b8321 !important;
  height: 70px;
  padding-left: 0px;
  @media (max-width: 1023px) {
    border: none !important;
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
    width: 100% !important;
    padding: 11px 0px 8px 0px !important;
  }
`;

export default SeeDetailsTab;
