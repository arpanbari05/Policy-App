import React from "react";
import { Row, Col } from "react-bootstrap";
const PopularFilterMobile = ({
  selected,
  setSelected,
  moreFilter,
  codeIndexMapMoreFilter,
}) => {
  return (
    <>
      <article>
        <Row className=" mt--38">
          {moreFilter[codeIndexMapMoreFilter["popular_filters"]]?.options.map(
            (item, index) => (
              <Col md={12} className="padding-none">
                <div className="inputGroup">
                  <input
                    id={"radio" + index + item.display_name}
                    name={"radio-popular"}
                    type="checkbox"
                    checked={selected.includes(item.display_name)}
                  />
                  <label
                    htmlFor={"radio" + index + item.display_name}
                    className=" padding_ic_insure mobile-filter-label  more-padding"
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

export default PopularFilterMobile;
