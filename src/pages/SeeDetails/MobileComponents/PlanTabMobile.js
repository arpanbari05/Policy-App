import React, { Fragment, useState } from "react";
import styled from "styled-components";
import "styled-components/macro";
import useWindowSize from "../../../customHooks/useWindowSize";
import downarrow from "./../../../assets/images/downarrow.png";
import FeatureDefinitionMobile from "./FeatureDefinitionMobile";
import { useTheme } from "../../../customHooks";
import { mobile, tablet } from "../../../utils/mediaQueries";
const PlanTabMobile = ({ data, item }) => {
  const [windowWidth] = useWindowSize();
  const [toggle, setToggle] = useState(false);
  const { colors } = useTheme();
  if (windowWidth < 768)
    return (
      <PlanFeature toggle={toggle} activeBorderColor={colors.primary_color}>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <h5
                onClick={() => setToggle(!toggle)}
                css={`
                  font-size: 14px !important;
                  font-weight: 900;
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
                <Fragment key={i}>
                  {item.header === "Permanent Exclusions" && (
                    <div style={{ paddingLeft: "20px", margin: "10px" }}>
                      {item.value.split("\n").map(itemdata => {
                        return (
                          <li
                            key={itemdata}
                            style={{
                              fontSize: "11px",
                              borderRadius: "3px",
                              padding: "3px",
                              lineHeight: "1.1",
                            }}
                            css={`
                              list-style-type: disc;
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
                </Fragment>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </PlanFeature>
    );
  else
    return (
      <PlanFeature>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <h6
                css={`
                  font-weight: bold;
                  font-size: 16px;
                  margin-bottom: 8px;
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
                  <Fragment key={i}>
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
                              key={itemdata}
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
                  </Fragment>
                );
              })
            ) : (
              <></>
            )}
          </FeatureContainerTablet>
          {/* <p>{data[0].header}</p> */}
        </div>
      </PlanFeature>
    );
};

const PlanFeature = styled.div`
  background-color: ${"white"};
  border: 1px solid
    ${props => (props.toggle ? props.activeBorderColor : "white")};
  border-radius: 10px;
  margin: 15px;
  padding: 25px 10px;
  ${tablet} {
    padding: 12px 10px;
  }
  ${mobile} {
    margin: 8px 5px;
    padding: 15px 8px;
  }
`;

const FeatureContainerTablet = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default PlanTabMobile;
