import React from "react";
import { Row, Col } from "react-bootstrap";
const Others = ({
  moreFilter,
  codeIndexMapMoreFilter,
  selected,
  setSelected,
}) => {
  return (
    <>
      <article>
        <Row className=" mt--38">
          {moreFilter[codeIndexMapMoreFilter["others"]]?.options.filter(option => option?.code !== "no_claim_bonus_2").map(
            (item, index) => (
              <Col md={12} className="padding-none">
                <div className="inputGroup">
                  <input
                    id={"radio" + index + item.display_name}
                    name="radio-more-other"
                    type="checkbox"
                  />
                  <label
                    htmlFor={"radio" + index + item.display_name}
                    className="padding_ic_insure more-padding mobile-filter-label"
                    onClick={() => {
                      if (selected.includes(item.display_name)) {
                        setSelected(
                          selected.filter(pf => pf !== item.display_name),
                        );
                        return;
                      }
                      setSelected([...selected, item.display_name]);
                    }}
                  >
                    {item.display_name}
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

export default Others;
