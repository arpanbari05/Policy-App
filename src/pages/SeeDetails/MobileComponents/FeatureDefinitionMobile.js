import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import useWindowSize from "../../../customHooks/useWindowSize";
import styled from "styled-components";
import downarrow from "./../../../assets/images/downarrow.png";
function FeatureDefinitionMobile({
  description,
  icon,
  header,
  short_description,
}) {
  const [toggle, setToggle] = useState(false);
  const [windowHeight, windowWidth] = useWindowSize();

  if (windowWidth > 767)
    return (
      <FeatureT onClick={() => setToggle(!toggle)}>
        <div
          className="icon-box"
          style={{
            top: "4px",
            padding: "10px",
            backgroundColor: "#fff5f5",
            height: "100%",
            width: "100%",
            maxWidth: "50px",
            maxHeight: "50px",
            borderRadius: "50%",
            marginRight: "20px",
          }}
          
        >
          <img style={{width:'100%'}} src={icon} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }} >
          <h6>{header}</h6>
          <div>
            <p
              style={{
                fontSize: "12px",
                lineHeight: "1.2",
                fontWeight: "300",
                width: "85%",
                color:"grey"
              }}
            >
              {short_description}
              {toggle ? (
                <div>
                  <span
                    style={{
                      fontSize: "12px",
                      lineHeight: "1.2",
                      fontWeight: "300",
                      width: "85%",
                      color:"grey"
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

    else if(windowWidth < 767)  return (
    <Feature onClick={() => setToggle(!toggle)}>
      <div
        className="icon-box"
        style={{
          top: "4px",
          padding: "10px",
          backgroundColor: "#fff5f5",
          height: "100%",
          width: "100%",
          maxWidth: "50px",
          maxHeight: "50px",
          borderRadius: "50%",
          marginRight: "10px",
          marginLeft: "4px",
        }}

      >
        <img style={{width:'100%'}} src={icon} alt="" />
      </div>
      <div
        style={{ display: "flex", flexDirection: "column" }}
        
      >
        <h6>{header}</h6>
        <div>
          <p
            style={{
              fontSize: "12px",
              lineHeight: "1",
              fontWeight: "300",
              width: "85%",
              color:"grey"
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
                    top: "32px",
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
                    top: "32px",
                    position: "absolute",
                position: "absolute",
              }}
              src={downarrow}
              alt=""
              onClick={() => setToggle(!toggle)}
            />
          )}

          {toggle ? (
            <div
            >
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: "1",
                  fontWeight: "300",
                  width: "85%",
                  color:"grey"
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
  padding-top: 5px;
  width:100%;
  position:relative;
`;

const FeatureT = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  border-top: 1px solid lightgray;
  padding-top: 10px;
  width:48%;
  position:relative;
`;

export default FeatureDefinitionMobile;
