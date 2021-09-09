import React, { useState } from "react";

import planDetails from "../../../../assets/images/plan_details.png";
import claim from "../../../../assets/images/claims_p.png";
import cashless from "../../../../assets/images/cashless_p.png";
import addOn from "../../../../assets/images/add_on.png";
import styled from "styled-components";
import aboutCompany from "../../../../assets/images/about_company.png";
import windowSize from "../../../../customHooks/useWindowSize";
import "styled-components/macro";
import SeeDetailsTabContainer2 from "./SeeDetailsTabContainer2";
const SeeDetailsTab2 = ({ activeFieldset, setActiveFieldset }) => {
  const [windowHeight, windowWidth] = windowSize();
  return (
    <SeeDetailsTabT
      id="theme-tab-twlv"

      //	data-options='{"theme": "silver", "orientation": "horizontal", "animation": {"duration": 400, "effects": "slideH"}}'
    >
      <SeeDetailsTabWrapper className="tab_modal_product_d  tabs-menu clearfix z-tabs-nav z-tabs-desktop z-hide-menu see-details__tab-modal">
        <SeeDetailsTabContainer2
          title={"Plan Details"}
          id={1}
          onClick={(id) => setActiveFieldset(id)}
          activeFieldset={activeFieldset}
          image={planDetails}
        />
        <SeeDetailsTabContainer2
          title={"Add-on Coverages"}
          id={2}
          onClick={(id) => setActiveFieldset(id)}
          activeFieldset={activeFieldset}
          image={addOn}
        />
        <SeeDetailsTabContainer2
          title={"Cashless Hospitals"}
          id={3}
          onClick={(id) => setActiveFieldset(id)}
          activeFieldset={activeFieldset}
          image={cashless}
        />
        <SeeDetailsTabContainer2
          title={"Claim Process"}
          id={4}
          onClick={(id) => setActiveFieldset(id)}
          activeFieldset={activeFieldset}
          image={claim}
        />
        <SeeDetailsTabContainer2
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
  margin-top: 110px;
  @media (max-width: 1024px) {
    margin-top: 0px;
  }
`;

const SeeDetailsTabWrapper = styled.ul`
  display: flex;
  justify-content: center;
  padding-left: 0px;
  @media (max-width: 1023px) {
    border: none !important;
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
    width: 100% !important;
    padding: 11px 0px 8px 0px !important;
  }
`;

export default SeeDetailsTab2;
