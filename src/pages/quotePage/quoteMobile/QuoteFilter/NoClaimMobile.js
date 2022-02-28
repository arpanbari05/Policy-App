import React from "react";
import { Row, Col } from "react-bootstrap";
const NoClaimMobile = ({
  moreFilter,
  codeIndexMapMoreFilter,
  selected,
  setSelected,
}) => {
  return (
    <>
      <article>
        <Row className=" mt--38">
          {moreFilter[codeIndexMapMoreFilter["no_claim_bonus"]]?.options.map(
            (item, index) => (
              <Col md={12} className="padding-none">
                <div className="inputGroup">
                  <input
                    id={"radio" + index + item.display_name}
                    name="radio-more-no-claim"
                    type="radio"
                    checked={selected === item.display_name}
                  />
                  <label
                    htmlFor={"radio" + index + item.display_name}
                    className="label--before mobile-filter-label"
                    onClick={() => {
                      if (selected === item.display_name) setSelected("");
                      else setSelected(item.display_name);
                    }}
                  >
                    {item.display_name}
                    <div className="checkbox--button"></div>
                  </label>
                </div>
              </Col>
            ),
          )}
        </Row>
      </article>
    </>
  );
};

export default NoClaimMobile;
