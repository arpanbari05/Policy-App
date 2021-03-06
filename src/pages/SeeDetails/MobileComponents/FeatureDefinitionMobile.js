import React, { useState } from "react";
import useWindowSize from "../../../customHooks/useWindowSize";
import styled from "styled-components";
import "styled-components/macro";
import downarrow from "./../../../assets/images/downarrow.png";
function FeatureDefinitionMobile({
  description,

  header,
  short_description,
}) {
  const [toggle, setToggle] = useState(false);
  const [windowWidth] = useWindowSize();

  if (windowWidth > 767)
    return (
      <FeatureT onClick={() => setToggle(!toggle)}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h5
            css={`
              font-size: 14px;
            `}
          >
            {header}
          </h5>
          <div>
            <p
              style={{
                fontSize: "11px",
                lineHeight: "1.3",
                fontWeight: "300",
                width: "85%",
                color: "grey",
              }}
            >
              {short_description}
              {toggle ? (
                <div style={{ marginTop: "10px" }}>
                  <span
                    style={{
                      fontSize: "11px",

                      lineHeight: "1.3",
                      fontWeight: "300",
                      width: "85%",
                      color: "grey",
                    }}
                  >
                    {description}
                  </span>
                </div>
              ) : (
                <></>
              )}
            </p>
          </div>

          {toggle ? (
            <img
              style={{
                width: "12px",
                right: "20px",
                top: "42px",
                cursor: "pointer",
                position: "absolute",
                transform: "rotate(180deg)",
              }}
              src={downarrow}
              alt=""
              onClick={() => setToggle(!toggle)}
            />
          ) : (
            <img
              style={{
                width: "12px",
                right: "20px",
                top: "42px",
                cursor: "pointer",
                position: "absolute",
              }}
              src={downarrow}
              alt=""
              onClick={() => setToggle(!toggle)}
            />
          )}
        </div>
      </FeatureT>
    );
  else if (windowWidth < 767)
    return (
      <Feature onClick={() => setToggle(!toggle)}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h5
            css={`
              font-size: 14px;
            `}
          >
            {header}
          </h5>
          <div>
            <p
              style={{
                fontSize: "11px",
                lineHeight: "1.2",
                fontWeight: "300",
                width: "85%",
                color: "grey",
              }}
            >
              {short_description}
            </p>
          </div>
          <div>
            {toggle ? (
              <img
                style={{
                  width: "12px",
                  right: "20px",
                  top: "36px",
                  position: "absolute",
                  transform: "rotate(180deg)",
                }}
                src={downarrow}
                alt=""
                onClick={() => setToggle(!toggle)}
              />
            ) : (
              <img
                style={{
                  width: "12px",
                  right: "20px",
                  top: "36px",
                  position: "absolute",
                }}
                src={downarrow}
                alt=""
                onClick={() => setToggle(!toggle)}
              />
            )}

            {toggle ? (
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    lineHeight: "1.2",
                    fontWeight: "300",
                    width: "85%",
                    color: "grey",
                  }}
                >
                  {description}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </Feature>
    );
}

const Feature = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  border-top: 1px solid lightgray;
  padding-top: 10px;
  width: 100%;
  position: relative;
`;

const FeatureT = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  border-top: 1px solid lightgray;
  padding-top: 10px;
  width: 48%;
  position: relative;
`;

export default FeatureDefinitionMobile;
