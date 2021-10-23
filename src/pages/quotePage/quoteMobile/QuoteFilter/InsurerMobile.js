import React from "react";
import { Col, Row } from "react-bootstrap";
import "styled-components/macro";

const InsurerMobile = ({
  sortedCompanies,
  data,
  selected = [],
  setSelected,
}) => {
  return (
    <>
      {" "}
      <article>
        <Row>
          {sortedCompanies?.map((item) => (
            <Col md={12} className="padding-none">
              <div className="inputGroup">
                <input
                  id={data?.companies[item].short_name}
                  name="checkbox"
                  type="checkbox"
                  checked={selected.includes(data?.companies[item])}
                />
                <label
                  css={`
                    @media (max-width: 375px) {
                      &:after {
                        top: 40px !important;
                        right: 13px  !important;
                      }
                      display: flex !important;
                      flex-direction: column;
                    }
                  `}
                  htmlFor={data?.companies[item].short_name}
                  className="padding_ic_insure mobile-filter-label"
                  onClick={() => {
                    if (selected.includes(data?.companies[item]))
                      setSelected(
                        selected.filter((ins) => ins !== data?.companies[item])
                      );
                    else setSelected([...selected, data?.companies[item]]);
                  }}
                >
                  <div className="mobile-filter-wrapper-inner">
                    <img
                      alt="logo"
                      className="mobile-filter-logo"
                      src={data?.companies[item].logo}
                    ></img>
                    <span className="mobile-filter-title">
                      {data?.companies[item].short_name}
                    </span>
                  </div>
                  <span className="mobile-filter-value">
                    {data?.companies[item].csr}% CSR
                  </span>{" "}
                </label>
              </div>
            </Col>
          ))}
        </Row>
        {/* <!-- </section> --> */}
      </article>
    </>
  );
};

export default InsurerMobile;
