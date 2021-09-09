import React, { useState } from "react";
import { Col, Collapse, Row } from "react-bootstrap";
import { BiChevronDown } from "react-icons/bi";
import styled from "styled-components/macro";
function FeatureDefinition({ data }) {
  const [toggle, setToggle] = useState(false);

  return (
    <FeatureDefinitionContainer onClick={() => setToggle(!toggle)}>
      <Row>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            position: "relative",
          }}
        >
          {/* <Col md={2}>
            <div className="icon-box" style={{ height: "55px", width: "55px" }}>
              <img src={data.icon} />
            </div>
          </Col> */}
          {toggle ? (
            <span
              style={{
                right: "23px",
                top: "6px",
                position: "absolute",
                transform: "rotate(180deg)",
              }}
              onClick={() => setToggle(!toggle)}
            >
              <BiChevronDown />
            </span>
          ) : (
            <span
              style={{
                right: "23px",
                top: "6px",
                position: "absolute",
              }}
              onClick={() => setToggle(!toggle)}
            >
              <BiChevronDown />
            </span>
          )}
          <div
            css={`
              padding: 15px;
              position: relative;
              width: 100%;
            `}
          >
            <h4
              className="title inline__header"
              style={{
                lineHeight: "0px",
                padding: "20px 0 5px",
              }}
              css={`
                color: #253858;
                margin-bottom: 1rem;
               
              `}
            >
              {data.header} {": "}
              {data.value}
            </h4>

            <p
              className="feature-offer-box__p"
              css={`
                width: 100%;
                color: #253858;
                opacity: 0.96;
              `}
            >
              {data.short_description}
            </p>

            <Collapse in={toggle}>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: "400",
                  marginTop: "10px",
                  width: "100%",
                }}
                css={`
                  color: #253858;
                  opacity: 0.96;
                `}
              >
                {data.description}
              </p>
            </Collapse>

            <ul></ul>
          </div>
        </div>
      </Row>
    </FeatureDefinitionContainer>
  );
}

export default FeatureDefinition;

const FeatureDefinitionContainer = styled.div`
  position: relative;
  background-color: #eaeef2bf;
  margin: 10px;
  border-radius: 18px;
`;
