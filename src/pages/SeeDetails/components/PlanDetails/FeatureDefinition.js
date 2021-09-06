import React, { useState } from "react";
import { Col, Collapse, Row } from "react-bootstrap";
import downarrow from "../../../../assets/images/downarrow.png";
function FeatureDefinition({ data }) {
  const [toggle, setToggle] = useState(false);

  return (
    <div
      className="feature-offer-box_basic support-feature js-tilt"
      style={{
        padding: "0 25px 20px",
        borderRadius: "10px",
      }}
      onClick={() => setToggle(!toggle)}
    >
      <Row>
        <div style={{ display: "flex", alignItems: "center", width:'100%' }}>
          <Col md={2}>
            <div className="icon-box" style={{ height: "55px", width: "55px" }}>
              <img src={data.icon} />
            </div>
          </Col>
          <Col md={10} style={{ paddingTop: "10px" }}>
            <h4
              className="title inline__header"
              style={{
                lineHeight: "0px",
                padding: "20px 0 5px",
              }}
            >
              {data.header} :
            </h4>
            <p class="value__feature"> {data.value}</p>
            <p className="feature-offer-box__p" style={{ width: "100%" }}>
              {data.short_description}
            </p>
            <div>
              {toggle ? (
                <img
                  style={{
                    right: "0",
                    top:'25px',
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
                    right: "0",
                     top:'25px',
                    position: "absolute",
                  }}
                  src={downarrow}
                  alt=""
                  onClick={() => setToggle(!toggle)}
                />
              )}
            </div>

            <Collapse in={toggle}>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#000000",
                  fontWeight: "400",
                  marginTop: "10px",
                  width: "100%",
                }}
              >
                {data.description}
              </p>
            </Collapse>

            <ul></ul>
          </Col>
        </div>
      </Row>
    </div>
  );
}

export default FeatureDefinition;
