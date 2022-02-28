import React from "react";
import styled from "styled-components";

import { useParams } from "react-router";

import { useSelector } from "react-redux";
import SpinLoader from "../../../../components/Common/SpinLoader/SpinLoader";
function AddOnCoverageMobile({
  ActiveMainTab,
  // riders,
  quote,
  sum_insured,
}) {
  const { loading } = useSelector(state => state.seeDetails);

  const { groupCode } = useParams();
  const sumInsuredIndex = quote.sum_insured.indexOf(sum_insured);

  const product = {
    premium: quote.premium[sumInsuredIndex],
    sum_insured: sum_insured,
    tax_amount: quote.tax_amount[sumInsuredIndex],
    tenure: quote.tenure[sumInsuredIndex],
    total_premium: quote.total_premium[sumInsuredIndex],
    product: {
      ...quote.product,
      company: {
        alias: quote.company_alias,
      },
    },
    health_riders: [],
    addons: [],
  };
  return (
    <div
      className={`z-content ${ActiveMainTab && "z-active"}`}
      style={{ display: ActiveMainTab ? "block" : "none" }}
    >
      <Outer>
        {loading ? (
          <SpinLoader />
        ) : (
          <>
            {/* <FeatureSection>
              <div>
                <h6 style={{ fontWeight: "600" }}>Customize your Plan</h6>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "300",
                    color: "gray",
                    lineHeight: "1.4",
                  }}
                >
                  You can add ‘Riders’ to you basic health insurance plan for
                  additional benefits.
                </p>
              </div>
            </FeatureSection> */}
            <div style={{ padding: "10px" }}>
              {/* <CustomizeYourPlan groupCode={groupCode} product={product} /> */}
            </div>
          </>
        )}
      </Outer>
    </div>
  );
}
const Outer = styled.div`
  background-color: #fff;
`;
const FeatureSection = styled.div`
  padding: 10px;
  padding-top: 20px;
  margin-left: 20px;
  display: flex;
  &::before {
    content: "--";
    color: var(--yellow-one);
    height: 39px;
    width: 9px;
    padding-right: 10px;
    margin-right: 10px;
    /* top: -7px; */
    /* left: -20px; */
    /* position: absolute; */
    /* background-color: #de9b9e; */
    background-color: var(--yellow-one);
    border-radius: 0 15px 15px 0;
  }
`;

export default AddOnCoverageMobile;
