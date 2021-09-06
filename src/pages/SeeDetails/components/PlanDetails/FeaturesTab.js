import React, { useState } from "react";
import { Col, Row, Collapse } from "react-bootstrap";
import roomRent from "../../../../assets/images/room_r.png";
import "styled-components/macro";
import FeatureDefinition from "./FeatureDefinition";
import "./FeatureTab.css";

const dataSet = (dataArray, type) => {

  const array = [];
  let sentences = [];
  let pargraph = "";
 

  const length = dataArray?.length;
  if (type === "container") {
    dataArray?.map((data, i) => {
      data.is_visible === 1 &&
        array.push(
          <span key={i}>
            {data.header === "Permanent Exclusions" && (
              <div className="featureExclusion">
                {data.value.split("\n").map(item => {
                  return (
                    <li
                      style={{
                        fontSize: "14px",
                        borderRadius: "3px",
                        padding: "5px 8px",
                      }}
                      css={`
                        &::marker {
                          color: #f7a600;

                          font-size: 14px;
                        }
                        &:hover {
                          background-color: #de9b9e29;
                        }
                      `}
                    >
                      {" "}
                      {item}
                    </li>
                  );
                })}

                {/* <ul> */}
                {/* <li className="featureNotCovered"> */}
                {/* Any pre existing injury that was diagnosed within 48 months
                    prior to issuance of first policy
                  </li> */}
                {/* <li className="featureNotCovered">
                    Any diseases contracted during first 30 days of policy start
                  </li>
                  <li className="featureNotCovered">
                    Expenses attributable to self injury to alcohol/drug
                    use/misuse/abuse
                  </li>
                  <li className="featureNotCovered">Cost of spectacles</li>
                  <li className="featureNotCovered">
                    External congential disease
                  </li> */}
                {/* </ul> */}
              </div>
            )}
            {data.header !== "Co-Payment" &&
              data.header !== "Permanent Exclusions" && (
                <div>
                  <FeatureDefinition data={data} />
                  {i !== length - 1 && i !== length - 2 && (
                    <hr className="hr_p_b" />
                  )}
                </div>
              )}
          </span>,
        );
    });
  } else {
    dataArray.map((data, i) => {
      array.push(<li key={i}>{data}</li>);
    });
  }

  return array;
};

const FeaturesTab = ({ id, activeDelayedTab, activeTab, data, type }) => {
  
  return (
    <div
      style={{
        display: activeDelayedTab !== id ? "none" : "block",
      }}
      className={`tab-pane fade shadow rounded p-5 ${
        activeTab === id && "show"
      }`}
    >
      {type === "container" ? (
        <Col lg={12} className="bg_pink_plan">
          <hr className="hr_p_b_w" />
          {dataSet(data, type)}
          <hr className="hr_p_b_w" />
        </Col>
      ) : (
        <Row
          className="our-feature-app bg_pink_plan"
          style={{ padding: "47px 20px" }}
        >
          <Col lg={12} className="order-lg-last">
            <div className="text-wrapper">
              <ul>{dataSet(data, type)}</ul>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FeaturesTab;
