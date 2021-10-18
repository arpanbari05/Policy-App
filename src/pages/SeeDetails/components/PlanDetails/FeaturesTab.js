import React, { useState } from "react";
import { Col, Row, Collapse } from "react-bootstrap";
import roomRent from "../../../../assets/images/room_r.png";
import styled from "styled-components/macro";
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
                {data.value.split("\n").map((item) => {
                  return (
                    <li
                      style={{
                        fontSize: "13px",
                        borderRadius: "3px",
                        padding: "5px 8px",
                      }}
                      css={`
                        &::marker {
                          color: #f7a600;

                          font-size: 14px;
                        }
                        &:hover {
                          background-color: #eff9fc;
                        }
                      `}
                    >
                      {" "}
                      {item}
                    </li>
                  );
                })}
              </div>
            )}
            {data.header !== "Co-Payment" &&
              data.header !== "Permanent Exclusions" && (
                <div>
                  <FeatureDefinition data={data} />
               </div>
              )}
          </span>
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
    <FeatureTabContainer
      style={{
        display: activeDelayedTab !== id ? "none" : "block",
      }}
      className={`${activeTab === id && "show"}`}
    >
      {type === "container" ? (
        <Col lg={12}>{dataSet(data, type)}</Col>
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
    </FeatureTabContainer>
  );
};

export default FeaturesTab;

const FeatureTabContainer = styled.div``;
