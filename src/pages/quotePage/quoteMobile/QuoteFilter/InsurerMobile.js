import React from "react";
import { Col, Row } from "react-bootstrap";
import "styled-components/macro";

const InsurerMobile = ({
  sortedCompanies,
  data,
  selected = [],
  setSelected,
}) => {
  const sortedCompaniesMobile = sortedCompanies
    .filter(
      comp =>
        data?.companies[comp].insurance_types.includes("top_up") ||
        data?.companies[comp].insurance_types.includes("health") ||
        data?.companies[comp].insurance_types.includes("cancer") ||
        data?.companies[comp].insurance_types.includes("critical_illness") ||
        data?.companies[comp].insurance_types.includes("personal_accident"),
    )
    .sort((a, b) => data?.companies[b].csr - data?.companies[a].csr);
  return (
    <>
      {" "}
      <article>
        <Row>
          {sortedCompaniesMobile?.map(item => (
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
                      display: flex !important;
                      flex-direction: column;
                    }
                  `}
                  htmlFor={data?.companies[item].short_name}
                  className="padding_ic_insure mobile-filter-label"
                  onClick={() => {
                    if (selected.includes(data?.companies[item]))
                      setSelected(
                        selected.filter(ins => ins !== data?.companies[item]),
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
                    <span
                      className="mobile-filter-title"
                      css={`
                        @media screen and (max-width: 463px) {
                          font-size: 11.5px;
                        }
                      `}
                    >
                      {data?.companies[item].short_name}
                    </span>
                  </div>
                  <span
                    className="mobile-filter-value"
                    css={`
                      margin-right: 15px !important;
                      @media screen and (max-width: 463px) {
                        font-size: 12px;
                      }
                    `}
                  >
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
