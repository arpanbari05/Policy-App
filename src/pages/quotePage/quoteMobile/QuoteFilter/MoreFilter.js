import React, { useState } from "react";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Common/Modal";

import useQuoteFilter from "./useQuoteFilter";
import "styled-components/macro";
import { setFilters } from "../../quote.slice";
import { FaTimes } from "react-icons/fa";

export function CustomRadio({
  label,
  description = "",
  isSelected,
  onClick = () => {},
}) {
  const renderTooltip = props => <Tooltip {...props}>{description}</Tooltip>;
  return (
    <>
      {description === "" ? (
        <div
          css={`
            margin-bottom: 17px;
          `}
        >
          <input
            id={label}
            name={"radio" + label}
            type={"radio"}
            readOnly
            checked={isSelected}
          />
          <label
            htmlFor={label}
            style={{
              background: isSelected ? "#fff8f9" : "#fff",
              fontSize: "16px",
              fontWeight: "900",
            }}
            css={`
              width: 100%;
              padding: 17px;
              padding-right: 26px;
              padding-left: 20px;
              border-radius: 6px;
              display: flex !important;
              align-items: center;
              justify-content: space-between;
              border: 1px solid;
              border-color: ${isSelected ? "var(--abc-red)" : "#d2d8e2"};
              font-weight: ${isSelected ? "bold" : "normal"};
            `}
            onClick={onClick}
          >
            {label}
            <div
              css={`
                height: 20px;
                width: 20px;
                border: 1px solid;
                border-radius: 50%;
                border-color: ${isSelected ? "var(--abc-red)" : "#d2d8e2"};
                display: flex !important;
                align-items: center;
                justify-content: center;

                &::after {
                  display: ${isSelected ? "block" : "none"};
                  content: "";
                  height: 12px;
                  width: 12px;
                  background-color: var(--abc-red);
                  border-radius: 50%;
                }
              `}
            />
          </label>
        </div>
      ) : (
        <div
          css={`
            margin-bottom: 24px;
          `}
        >
          <input
            id={label}
            name={"radio" + label}
            type={"radio"}
            readOnly
            checked={isSelected}
          />
          <label
            htmlFor={label}
            style={{
              background: isSelected ? "#fff8f9" : "#fff",
              fontSize: "16px",
            }}
            css={`
              width: 100%;
              padding: 17px;
              padding-right: 26px;
              border-radius: 6px;
              display: flex !important;
              align-items: center;
              justify-content: space-between;
              border: 1px solid;
              border-color: ${isSelected ? "var(--abc-red)" : "#d2d8e2"};
              font-weight: ${isSelected ? "bold" : "normal"};
            `}
            onClick={onClick}
          >
            <OverlayTrigger placement="right" overlay={renderTooltip}>
              <span>{label}</span>
            </OverlayTrigger>
            <div
              css={`
                height: 20px;
                width: 20px;
                border: 1px solid;
                border-radius: 50%;
                border-color: ${isSelected ? "var(--abc-red)" : "#d2d8e2"};
                display: flex !important;
                align-items: center;
                justify-content: center;

                &::after {
                  display: ${isSelected ? "block" : "none"};
                  content: "";
                  height: 12px;
                  width: 12px;
                  background-color: var(--abc-red);
                  border-radius: 50%;
                }
              `}
            />
          </label>
        </div>
      )}{" "}
    </>
  );
}

const MoreFilter = ({ expandSelected, setExpandSelected, moreFilter }) => {
  const filters = useSelector(state => state.quotePage.filters);

  const renderTooltip = description => <Tooltip>{description}</Tooltip>;

  const [popularFilter, setPopularFilter] = useState(
    filters.moreFilters.popularFilter || [],
  );
  const [preExisting, setPreExisting] = useState(
    filters.moreFilters.preExisting || "",
  );
  const [renewalBonus, setRenewalBonus] = useState(
    filters.moreFilters.renewalBonus || "",
  );

  const [others, setOthers] = useState(filters.moreFilters.others || []);

  const handleReset = () => {
    setPopularFilter([]);
    setPreExisting("");
    setRenewalBonus("");
    setOthers([]);
  };

  const dispatch = useDispatch();

  const { filterQuotes } = useQuoteFilter({
    givenMoreFilters: {
      preExisting,
      renewalBonus,
      others,
      popularFilter,
    },
  });

  const quotes = useSelector(state => state.quotePage.quotes);

  const filteredQuotes = quotes.map(icQuotes => filterQuotes(icQuotes)).flat();

  const handleSubmit = () => {
    dispatch(
      setFilters({
        moreFilters: {
          popularFilter,
          preExisting,
          renewalBonus,
          others,
        },
      }),
    );
    setExpandSelected("");
  };
  return (
    // <div
    //   id="m-md-filter"
    //   className="modal show"
    //   databackdrop={"true"}
    //   style={
    //     expandSelected === "moreFilter"
    //       ? { display: "block", backgroundColor: "rgba(0,0,0,0.3)" }
    //       : { display: "none" }
    //   }
    //   aria-hidden={true}
    // >
    <Modal>
      {/* <div className="modal-dialog modal-md" style={{  }}> */}
      <div
        css={`
          max-width: 943px;
          height: 1000px;
          transform: translate(-50%);
          position: fixed;
          top: 10%;
          left: 50%;
          z-index: 99;
        `}
      >
        <div className="modal-content">
          <div className="modal-header bg_more_header_filters">
            <div
              className="product_title_p_bor_modal_filters"
              css={`
                margin-left: 1px;
              `}
            >
              <h5 className="modal-title modal_title_margin">More Filters</h5>
            </div>
            <button
              type="button"
              className="btn btn-white border_radius_modal_filter"
              data-dismiss="modal"
              onClick={() => {
                setExpandSelected("");
              }}
            >
              <FaTimes />
            </button>
          </div>
          <div className="modal-body p-lg modal_scroll_filter">
            <Row>
              <Col md={12}>
                <section
                  className="light"
                  css={`
                    margin: 0 7px;
                  `}
                >
                  {moreFilter?.map((item, idx, thisArray) => (
                    <Col md={12}>
                      <h5
                        className="text_title_filter p_modal_title_bg_filters"
                        css={`
                          margin-bottom: 19px;
                          // margin-left: 1px;
                          width: max-content;
                          margin-left: -4px;
                        `}
                      >
                        {item.group_name}
                      </h5>

                      <Row className="row_mb_mt">
                        {item.options.map(option => (
                          <Col
                            md={6}
                            css={`
                              padding-right: 9px !important;
                              padding-left: 9px !important;
                            `}
                          >
                            {["popular_filters", "others"].includes(
                              item.code,
                            ) ? (
                              <div
                                className="inputGroup"
                                css={`
                                  margin-bottom: 24px;
                                `}
                              >
                                <input
                                  id={option.display_name}
                                  name={"radio" + idx}
                                  type={
                                    ["popular_filters", "others"].includes(
                                      item.code,
                                    )
                                      ? "checkbox"
                                      : "radio"
                                  }
                                  readOnly
                                  onClick={evt => {
                                    if (item.code === "popular_filters") {
                                      if (
                                        popularFilter.includes(
                                          option.display_name,
                                        )
                                      ) {
                                        setPopularFilter(
                                          popularFilter.filter(
                                            pf => pf !== option.display_name,
                                          ),
                                        );
                                        return;
                                      }
                                      setPopularFilter([
                                        ...popularFilter,
                                        option.display_name,
                                      ]);
                                    }
                                    if (item.code === "pre_existing_ailments") {
                                      if (preExisting === option.display_name) {
                                        setPreExisting("");
                                      } else
                                        setPreExisting(option.display_name);
                                    }
                                    if (item.code === "no_claim_bonus") {
                                      if (renewalBonus === option.display_name)
                                        setRenewalBonus("");
                                      else setRenewalBonus(option.display_name);
                                    }
                                    if (item.code === "others") {
                                      if (
                                        others.includes(option.display_name)
                                      ) {
                                        setOthers(
                                          others.filter(
                                            pf => pf !== option.display_name,
                                          ),
                                        );
                                        return;
                                      }
                                      setOthers([
                                        ...others,
                                        option.display_name,
                                      ]);
                                    }
                                  }}
                                  checked={(() => {
                                    if (item.code === "popular_filters")
                                      return popularFilter.includes(
                                        option.display_name,
                                      );
                                    if (item.code === "pre_existing_ailments")
                                      return (
                                        preExisting === option.display_name
                                      );
                                    if (item.code === "no_claim_bonus")
                                      return (
                                        renewalBonus === option.display_name
                                      );
                                    if (item.code === "others")
                                      return others.includes(
                                        option.display_name,
                                      );
                                  })()}
                                />

                                <label
                                  htmlFor={option.display_name}
                                  style={{
                                    background: "transparent",
                                    fontSize: "16px",
                                    border: "1px solid #d2d8e2",
                                  }}
                                >
                                  {" "}
                                  <OverlayTrigger
                                    placement="right"
                                    overlay={renderTooltip(option.description)}
                                  >
                                    <span> {option.display_name}</span>
                                  </OverlayTrigger>
                                  <div className="radio-custom" />
                                </label>
                              </div>
                            ) : (
                              <CustomRadio
                                label={option.display_name}
                                description={option.description}
                                onClick={evt => {
                                  if (item.code === "popular_filters") {
                                    if (
                                      popularFilter.includes(
                                        option.display_name,
                                      )
                                    ) {
                                      setPopularFilter(
                                        popularFilter.filter(
                                          pf => pf !== option.display_name,
                                        ),
                                      );
                                      return;
                                    }
                                    setPopularFilter([
                                      ...popularFilter,
                                      option.display_name,
                                    ]);
                                  }
                                  if (item.code === "pre_existing_ailments") {
                                    if (preExisting === option.display_name) {
                                      setPreExisting("");
                                    } else setPreExisting(option.display_name);
                                  }
                                  if (item.code === "no_claim_bonus") {
                                    if (renewalBonus === option.display_name)
                                      setRenewalBonus("");
                                    else setRenewalBonus(option.display_name);
                                  }
                                  if (item.code === "others") {
                                    if (others.includes(option.display_name)) {
                                      setOthers(
                                        others.filter(
                                          pf => pf !== option.display_name,
                                        ),
                                      );
                                      return;
                                    }
                                    setOthers([...others, option.display_name]);
                                  }
                                }}
                                isSelected={(() => {
                                  if (item.code === "popular_filters")
                                    return popularFilter.includes(
                                      option.display_name,
                                    );
                                  if (item.code === "pre_existing_ailments")
                                    return preExisting === option.display_name;
                                  if (item.code === "no_claim_bonus")
                                    return renewalBonus === option.display_name;
                                  if (item.code === "others")
                                    return others.includes(option.display_name);
                                })()}
                              />
                            )}
                          </Col>
                        ))}
                      </Row>
                      {idx !== thisArray.length - 1 && (
                        <hr
                          className="hr_width_pop"
                          css={`
                            margin: 0 0 10px 0;
                          `}
                        />
                      )}
                    </Col>
                  ))}
                </section>
              </Col>
            </Row>
          </div>
          <div
            className="modal-footer modal_footer_css_pad_m"
            style={{ backgroundColor: "#ededed", height: "82px" }}
          >
            <div className="container">
              <Row
                className="padding_filter_footer"
                css={`
                  align-items: center;
                `}
              >
                <Col md={6}>
                  <button
                    className="clear_filetr_c"
                    css={`
                      color: var(--dark-green);
                    `}
                    onClick={handleReset}
                  >
                    Clear Filters
                  </button>
                </Col>
                <Col md={6} className="text-right">
                  {filteredQuotes.length === 0 ? (
                    <p>No Plans Available</p>
                  ) : (
                    <button
                      type="button"
                      className="btn btn_show_modal_filters"
                      data-dismiss="modal"
                      onClick={handleSubmit}
                      css={`
                        border-radius: 2px !important;
                        font-weight: bold;
                        width: 150px;
                      `}
                    >
                      Show {filteredQuotes.length + 1} Plans
                    </button>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    // </div>
  );
};

export default MoreFilter;
