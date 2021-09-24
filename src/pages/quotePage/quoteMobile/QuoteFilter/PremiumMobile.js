import React from "react";
import { Row, Col } from "react-bootstrap";
const PremiumMobile = ({ premiumFilter, selected, setSelected }) => {
  return (
    <>
      <article>
        <Row className=" mt--38">
          {premiumFilter?.map((item, index) => (
            <Col md={6} key={index} className="padding-none">
              <div className="inputGroup">
                <input
                  id={item.code}
                  name="radio-premium-mobile"
                  type="radio"
                  checked={selected?.code === item?.code}
                />
                <label
                  className="label--before mobile-filter-label"
                  htmlFor={item.code}
                  onClick={() => setSelected(item)}
                >
                  {`${item.display_name}`}
                  <div className="checkbox--button"></div>
                </label>
              </div>
            </Col>
          ))}
        </Row>
      </article>
    </>
  );
};

export default PremiumMobile;
