import React, { useState } from "react";
import styled from "styled-components";
import "styled-components/macro";
import useWindowSize from "../../../customHooks/useWindowSize";
import { Collapse } from "react-bootstrap";
import downarrow from "./../../../assets/images/downarrow.png";
import FeatureDefinitionMobile from "./FeatureDefinitionMobile";
const PlanTabMobile = ({ data, item }) => {
  const [windowHeight, windowWidth] = useWindowSize();
  const [toggle, setToggle] = useState(false);

  if (windowWidth < 768)
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <h5
              onClick={() => setToggle(!toggle)}
              css={`
                font-size: 14px !important;
              `}
            >
              {item.title}
            </h5>
            <p
              onClick={() => setToggle(!toggle)}
              style={{
                fontSize: "11px",
                fontWeight: "300",
                width: "240px",
                lineHeight: "1.3",
                color: "gray",
              }}
            >
              {item.description}
            </p>
          </div>
          {toggle ? (
            <img
              style={{
                right: "0",
                position: "absolute",
                padding: "4px",
                borderRadius: "50%",
                backgroundColor: "lightgray",
                marginRight: "30px",
                transform: "rotate(180deg)",
              }}
              src={downarrow}
              alt=""
              onClick={() => setToggle(!toggle)}
            />
          ) : (
            <img
              style={{
                right: "0",
                marginRight: "30px",
                padding: "4px",
                borderRadius: "50%",
                backgroundColor: "lightgray",
                position: "absolute",
              }}
              src={downarrow}
              alt=""
              onClick={() => setToggle(!toggle)}
            />
          )}
        </div>
        {toggle ? (
          data.map((item, i) => {
            return (
              <>
                {item.header === "Permanent Exclusions" && (
                  <div style={{ paddingLeft: "20px", margin: "10px" }}>
                    {item.value.split("\n").map(itemdata => {
                      return (
                        <li
                          style={{
                            fontSize: "11px",
                            borderRadius: "3px",
                            padding: "3px",
                            lineHeight: "1.1",
                          }}
                          css={`
                            text-indent: -0.8em;
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
                          {itemdata}
                        </li>
                      );
                    })}
                  </div>
                )}
                {item.header !== "Cashless Hospitals" &&
                  item.header !== "Unique Feature" &&
                  item.header !== "Permanent Exclusions" &&
                  item.header !== "Pre Policy Medical Screening" && (
                    <FeatureDefinitionMobile
                      description={item.description}
                      icon={item.icon}
                      header={item.header}
                      short_description={item.short_description}
                    />
                  )}
              </>
            );
          })
        ) : (
          <></>
        )}
        {/* <p>{data[0].header}</p> */}
      </div>
    );
  else
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <h6
              css={`
                font-weight: bold;
                font-size: 16px;
              `}
              onClick={() => setToggle(!toggle)}
            >
              {item.title}
            </h6>
            <p
              onClick={() => setToggle(!toggle)}
              style={{
                fontSize: "12px",
                fontWeight: "300",
                width: "240px",
                lineHeight: "1.1",
                color: "gray",
              }}
            >
              {item.description}
            </p>
          </div>
          {toggle ? (
            <img
              style={{
                right: "0",
                position: "absolute",
                padding: "4px",
                borderRadius: "50%",
                backgroundColor: "lightgray",
                marginRight: "30px",
                transform: "rotate(180deg)",
              }}
              src={downarrow}
              alt=""
              onClick={() => setToggle(!toggle)}
            />
          ) : (
            <img
              style={{
                right: "0",
                marginRight: "30px",
                padding: "4px",
                borderRadius: "50%",
                backgroundColor: "lightgray",
                position: "absolute",
              }}
              src={downarrow}
              alt=""
              onClick={() => setToggle(!toggle)}
            />
          )}
        </div>
        <FeatureContainerTablet>
          {toggle ? (
            data.map((item, i) => {
              return (
                <>
                  {item.header === "Permanent Exclusions" && (
                    <div
                      style={{
                        paddingLeft: "20px",
                        margin: "10px",
                        width: "50%",
                      }}
                    >
                      {item.value.split("\n").map(itemdata => {
                        return (
                          <li
                            style={{
                              fontSize: "14px",
                              borderRadius: "3px",
                              padding: "3px",
                              lineHeight: "1.1",
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
                            {itemdata}
                          </li>
                        );
                      })}
                    </div>
                  )}
                  {item.header !== "Cashless Hospitals" &&
                    item.header !== "Unique Feature" &&
                    item.header !== "Permanent Exclusions" &&
                    item.header !== "Pre Policy Medical Screening" && (
                      <FeatureDefinitionMobile
                        description={item.description}
                        icon={item.icon}
                        header={item.header}
                        short_description={item.short_description}
                      />
                    )}
                </>
              );
            })
          ) : (
            <></>
          )}
        </FeatureContainerTablet>
        {/* <p>{data[0].header}</p> */}
      </div>
    );
};

const FeatureContainerTablet = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default PlanTabMobile;
