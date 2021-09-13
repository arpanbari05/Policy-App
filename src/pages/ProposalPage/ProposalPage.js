import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecureLS from "secure-ls";
import "styled-components/macro";
import FormGrid from "../../components/Common/FormGrid/FormGrid";
import ProposalSummary from "../../components/Common/ProposalSummary/ProposalSummary";
import { getCart } from "../Cart/cart.slice";
import { getCartItem } from "../QuotesPage/quotePage.slice";
import { starSchema } from "./ProposalDetailsSchema";
import { InsuredDetails, ProposerDetails } from "./ProposalSections";
import BMI from "./ProposalSections/components/BMI";
import NSTP from "./ProposalSections/components/NSTP";
import ProductSummary from "./ProposalSections/components/ProductSummary";
import { MobileHeader, MobileHeaderText } from "./ProposalPage.style";
import {
  clearProposalData,
  getProposalData,
  setIsLoading,
  submitProposalData,
} from "./ProposalSections/ProposalSections.slice";
import { getProposalFields } from "./schema.slice";
import useUrlQuery from "../../customHooks/useUrlQuery";
import ProductSummaryMobile from "./ProposalSections/components/ProductSummaryMobile";
import ProductSummaryTab from "./ProposalSections/components/ProductSummaryTab";
import PlanUnavailable from "./ProposalSections/components/PlanUnavailable";

/* ===============================test================================= */

/* ===============================test================================= */
const ProposalPage = ({ history }) => {
  const [active, setActive] = useState(0);
  const { currentSchema } = useSelector(state => state.schema);
  const queryStrings = useUrlQuery();
  const enquiryId = queryStrings.get("enquiryId");
  //const currentSchema = starSchema;
  const cart = useSelector(state => state.cart);
  const [listOfForms, setListOfForms] = useState([]);
  useEffect(() => {
    if (currentSchema instanceof Object)
      setListOfForms(Object.keys(currentSchema));
  }, [currentSchema]);
  const dispatch = useDispatch();
  const { activeIndex, proposalData } = useSelector(
    state => state.proposalPage,
  );
  useEffect(() => {
    if (listOfForms.length && active >= listOfForms.length) {
      dispatch(
        submitProposalData(() => {
          history.push("/proposal_summary?enquiryId=" + enquiryId);
        }),
      );
    }
  }, [active]);

  useEffect(() => {
    dispatch(getProposalFields());
    if (!Object.keys(proposalData).length) dispatch(getProposalData());
    dispatch(getCart());
  }, []);
  useEffect(() => {
    setActive(activeIndex);
  }, [activeIndex]);
  const form = (active, defaultData) => {
    let activeForm = listOfForms[active];

    if (active >= listOfForms.length && listOfForms.length) {
      return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <span className="lds-dual-ring colored--loader"></span>
          <p>Submitting Proposal, Please Wait</p>
        </div>
      );
    }
    if (!listOfForms.length) {
      <div style={{ textAlign: "center" }}>
        <p>Proposal Page not found against this IC</p>
      </div>;
    }
    switch (activeForm) {
      case "Proposer Details":
        return (
          <ProposerDetails
            key={activeForm}
            schema={
              currentSchema ? Object.values(currentSchema[activeForm]) : []
            }
            setActive={setActive}
            name={activeForm}
            defaultValue={defaultData}
          />
        );
      case "Insured Details":
        return (
          <InsuredDetails
            key={activeForm}
            schema={currentSchema ? currentSchema[activeForm] : {}}
            setActive={setActive}
            name={activeForm}
            defaultValue={defaultData}
          />
        );
      case "Medical Details":
        return (
          <InsuredDetails
            key={activeForm}
            schema={currentSchema ? currentSchema[activeForm] : {}}
            setActive={setActive}
            name={activeForm}
            defaultValue={defaultData}
          />
        );
      case "Other Details":
        return (
          <InsuredDetails
            key={activeForm}
            schema={currentSchema ? currentSchema[activeForm] : {}}
            setActive={setActive}
            name={activeForm}
            defaultValue={defaultData}
          />
        );
      default:
        return (
          <ProposerDetails
            key={activeForm}
            schema={currentSchema ? currentSchema[activeForm] : []}
            setActive={setActive}
            name={activeForm}
            defaultValue={defaultData}
          />
        );
    }
  };
  return (
    <>
      <MobileHeader>
        <MobileHeaderText
          onClick={() => {
            history.goBack();
          }}
        >
          <i className="icon flaticon-back"></i> Proposal Form
        </MobileHeaderText>
      </MobileHeader>
      <div className="container-fluid mt-20 pb-100 ">
        <div className="element-section mb-30">
          <p
            className="go_back_prposal_p"
            onClick={() => {
              history.goBack();
            }}
          >
            <i className="icon flaticon-back" style={{ width: "27px" }}></i> Go
            Back
          </p>
          <div
            className="element-tile-two"
            style={{ width: "100%" }}
            css={`
              @media (min-width: 768px) and (max-width: 1200px) {
                font-size: 18px;
              }
            `}
          >
            You are Just 5 minutes away from investing for your future
          </div>
          <div className="row margin_top_tab_proposal">
            <div class="col-lg-12 col-md-12 no-padding-mobile">
              <FormGrid
                active={active}
                setActive={setActive}
                listOfForms={listOfForms}
              />

              <ProductSummary cart={cart} setActive={setActive} />
            </div>
          </div>
          {form(active, proposalData[listOfForms[active]])}
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <ProductSummaryTab cart={cart} />
          </div> */}
        </div>
      </div>

      <div
        css={`
       @media (max-width: 1199px) {
       display:block;
       }
       @media (min-width: 1200px) {
       display:none;
       }
     `}


      >
        <ProductSummaryMobile cart={cart} />
      </div>
      <PlanUnavailable />
      <BMI />
      <NSTP />
    </>
  );
};

export default ProposalPage;
