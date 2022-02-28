import React from "react";
import { Row, Col } from "react-bootstrap";
const MultiyearMobile = ({ selected, setSelected }) => {
  return (
    <>
      <article>
        <Row>
          <Col md={12} className="padding-none">
            <div className="inputGroup">
              <input
                id="radio1_1year"
                checked={selected === "1 Year"}
                name="radio-multiyear"
                type="radio"
              />
              <label
                className="label--before mobile-filter-label"
                htmlFor="radio1_1year"
                onClick={() => {
                  setSelected("1 Year");
                }}
              >
                1 Year
                <div className="checkbox--button"></div>
              </label>
            </div>
          </Col>
          <Col md={12} className="padding-none">
            <div className="inputGroup">
              <input
                id="radio2_2year"
                name="radio-multiyear"
                type="radio"
                checked={selected === "2 Year"}
              />
              <label
                htmlFor="radio2_2year"
                className="label--before mobile-filter-label"
                onClick={() => {
                  setSelected("2 Year");
                }}
              >
                2 Years{" "}
                <span className="save_upto_product">(Save upto 10%)</span>
                <div className="checkbox--button"></div>
              </label>
            </div>
          </Col>
          <Col md={12} className="padding-none">
            <div className="inputGroup">
              <input
                checked={selected === "3 Year"}
                id="radio2_3year"
                name="radio-multiyear"
                type="radio"
              />
              <label
                htmlFor="radio2_3year"
                className="label--before mobile-filter-label"
                onClick={() => {
                  setSelected("3 Year");
                }}
              >
                3 Years{" "}
                <span className="save_upto_product">(Save upto 20%)</span>
                <div className="checkbox--button"></div>
              </label>
            </div>
          </Col>
        </Row>
      </article>
    </>
  );
};

export default MultiyearMobile;
