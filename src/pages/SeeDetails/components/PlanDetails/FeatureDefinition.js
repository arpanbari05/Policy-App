import React, { useState } from "react";
import { Collapse, Row } from "react-bootstrap";
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
            cursor: "pointer",
            alignItems: "center",
            width: "100%",
            position: "relative",
            fontSize: "30px",
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
                fontSize: "30px",
              }}
              onClick={() => setToggle(!toggle)}
              onKeyDown={() => setToggle(!toggle)}
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
              display: flex;
              align-items: center;
              padding-left: 25px;
              padding-top: 8px;
              padding-bottom: 12px;
            `}
          >
            {/* <div
              css={`
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                top: 45px;
                left: 27px;
                position: absolute;
              `}
            >
              <img src={heartImg} alt="heart_img" className="w-100" />
            </div> */}
            <div
              css={`
                /* margin-left: 5px; */
              `}
            >
              <h5
                className="title inline__header"
                style={{
                  padding: "20px 0 5px",
                }}
                css={`
                  color: #253858;
                  margin-bottom: 1rem;
                  font-weight: 900;
                  font-size: 16px;
                `}
              >
                {data.header} {": "}
                {data.value}
              </h5>

              <p
                className="feature-offer-box__p"
                css={`
                  font-size: 13px;
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
                    fontSize: "13px",
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
