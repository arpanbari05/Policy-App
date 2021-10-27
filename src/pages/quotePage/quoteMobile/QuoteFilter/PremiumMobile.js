import React from "react";
import { Row, Col } from "react-bootstrap";
import "styled-components/macro";
import { useSelector } from "react-redux";
const PremiumMobile = ({ premiumFilter, selected, setSelected }) => {
  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
  return (
    <>
      <article>
        <Row className="mt--38">
          {premiumFilter?.map((item, index) => (
            <Col md={6} key={index} className="padding-none">
              <div
                className="inputGroup"
               
              >
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
                  css={`
                    font-size: 10px !important;
                    font-weight: 900 !important;
                    &:after {
                      right: 7px;
                    }
                 
                  `}
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
