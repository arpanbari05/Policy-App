import { useState } from "react";
import { Modal } from "react-bootstrap";
import { setFilters } from "../../quote.slice";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import "styled-components/macro";
import useQuoteFilter from "./useQuoteFilter";
import { Filter, OptionWrapper, ApplyBtn } from "./Filter.style";

const FilterModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const moreFilterData = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data.morefilters
  );

  const [popularFilter, setPopularFilter] = useState(
    moreFilterData.popularFilter || []
  );
  const [preExisting, setPreExisting] = useState(
    moreFilterData.preExisting || ""
  );
  const [renewalBonus, setRenewalBonus] = useState(
    moreFilterData.renewalBonus || ""
  );

  const [others, setOthers] = useState(moreFilterData.others || []);

  const handleReset = () => {
    setPopularFilter([]);
    setPreExisting("");
    setRenewalBonus("");
    setOthers([]);
  };

  const { filterQuotes } = useQuoteFilter({
    givenMoreFilters: {
      preExisting,
      renewalBonus,
      others,
      popularFilter,
    },
  });

  const quotes = useSelector((state) => state.quotePage.quotes);

  const filteredQuotes = quotes
    .map((icQuotes) => filterQuotes(icQuotes))
    .flat();
  let filteredPlans=[];
  filteredQuotes.forEach((data) => {
    if (!filteredPlans?.includes(data.product.name)) {
      filteredPlans.push(data.product.name);
    }
  });
  console.log(filteredQuotes, filteredPlans,"h12dsga");
  const handleSubmit = () => {
    dispatch(
      setFilters({
        moreFilters: {
          popularFilter,
          preExisting,
          renewalBonus,
          others,
        },
      })
    );
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      css={`
        .modal-dialog {
          max-width: 650px;
        }
        .modal-footer {
          border-top: none !important;
        }
        .modal-footer > * {
          margin: 0px !important;
        }
      `}
    >
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "black",
          }}
        >
          More Filters
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MoreFilterWrapper>
          <OptionWrapper>
            {moreFilterData ? (
              moreFilterData.map((filter, i) => {
                return (
                  <>
                    <div className="morefilter_head" key={i}>
                      <span>{filter.group_name}</span>
                    </div>
                    <div className="morefilter_options">
                      <div
                        className="d-flex justify-content-between py-3 mb-2 w-100 flex-wrap"
                        style={{
                          borderBottom: "1px solid #a1b2c8",
                        }}
                      >
                        {filter.options.map((option, optionIndex) => {
                          return ["popular_filters", "others"].includes(
                            filter.code
                          ) ? (
                            <div
                              className="morefilter_option w-50 mb-3"
                              key={optionIndex}
                            >
                              <input
                                type="checkbox"
                                id={`${option.display_name}_${filter.group_name}`}
                                className="d-none"
                                name={filter.group_name}
                                onChange={(evt) => {
                                  if (filter.code === "popular_filters") {
                                    if (
                                      popularFilter.includes(
                                        option.display_name
                                      )
                                    ) {
                                      setPopularFilter(
                                        popularFilter.filter(
                                          (pf) => pf !== option.display_name
                                        )
                                      );
                                      return;
                                    }
                                    setPopularFilter([
                                      ...popularFilter,
                                      option.display_name,
                                    ]);
                                  }

                                  if (filter.code === "others") {
                                    if (others.includes(option.display_name)) {
                                      setOthers(
                                        others.filter(
                                          (pf) => pf !== option.display_name
                                        )
                                      );
                                      return;
                                    }
                                    setOthers([...others, option.display_name]);
                                  }
                                }}
                                checked={(() => {
                                  if (filter.code === "popular_filters")
                                    return popularFilter.includes(
                                      option.display_name
                                    );
                                  if (filter.code === "others")
                                    return others.includes(option.display_name);
                                })()}
                              />
                              <label
                                htmlFor={`${option.display_name}_${filter.group_name}`}
                                className="d-flex align-items-center"
                              >
                                <span className="option_name">
                                  {option.display_name}
                                </span>
                                <div className="custom_checkbox"></div>
                              </label>
                            </div>
                          ) : (
                            <div
                              className="morefilter_option w-50 mb-3"
                              key={optionIndex}
                            >
                              <input
                                type="radio"
                                id={`${option.display_name}_${filter.group_name}`}
                                className="d-none"
                                name={filter.group_name}
                                onChange={(evt) => {
                                  if (filter.code === "pre_existing_ailments") {
                                    if (preExisting === option.display_name) {
                                      setPreExisting("");
                                    } else setPreExisting(option.display_name);
                                  }
                                  if (filter.code === "no_claim_bonus") {
                                    if (renewalBonus === option.display_name)
                                      setRenewalBonus("");
                                    else setRenewalBonus(option.display_name);
                                  }
                                }}
                                checked={(() => {
                                  if (filter.code === "pre_existing_ailments")
                                    return preExisting === option.display_name;
                                  if (filter.code === "no_claim_bonus")
                                    return renewalBonus === option.display_name;
                                })()}
                              />
                              <label
                                htmlFor={`${option.display_name}_${filter.group_name}`}
                                className="d-flex align-items-center"
                              >
                                <span className="option_name">
                                  {option.display_name}
                                </span>
                                <div className="custom_radio"></div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <></>
            )}
          </OptionWrapper>
        </MoreFilterWrapper>
      </Modal.Body>
      <Modal.Footer
        className="text-center"
        style={{
          padding: "10px",
        }}
      >
        <ClearBtn
          className="text-center w-50 h-100"
          onClick={() => handleReset()}
        >
          <span>Clear Filters</span>
        </ClearBtn>
        {filteredPlans.length ? (
          <ApplyBtn
            className=" apply_btn mx-auto h-100 w-50"
            onClick={() => handleSubmit()}
          >
            Show {filteredPlans.length-1} plans
          </ApplyBtn>
        ) : (
          <span className="w-50 text-center h-100">No Plan available</span>
        )}
      </Modal.Footer>
    </Modal>
  );
};

const MoreFilters = () => {
  const [showModal, setShowModal] = useState(false);
  const { moreFilters } = useSelector(({ quotePage }) => quotePage.filters);
  const noOfSelectedFilters = Object.keys(moreFilters).reduce(
    (acc, item) => (moreFilters[item].length ? acc + 1 : acc + 0),
    0
  );
  return (
    <>
      <Filter
        className="filter d-flex flex-column flex-fill"
        onClick={() => setShowModal(true)}
      >
        <span className="filter_head">More Filters</span>
        <span className="filter_sub_head">
          {noOfSelectedFilters > 0 ? (
            <>
              {`${
                noOfSelectedFilters === 1
                  ? noOfSelectedFilters + " Filter"
                  : noOfSelectedFilters + " Filters"
              } Selected`}{" "}
              <i class="fas fa-chevron-down"></i>
            </>
          ) : (
            <>
              Select Filters <i class="fas fa-chevron-down"></i>
            </>
          )}
        </span>
      </Filter>

      <FilterModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default MoreFilters;

const MoreFilterWrapper = styled.div`
  font-weight: 600;

  .morefilter_head {
    color: #0a87ff;
    margin: 10px 0px;
    font-size: 15px;
  }
  .morefilter_option {
    width: 42%;
    cursor: pointer;
    .option_name {
      width: 80%;
    }
  }
`;

const ClearBtn = styled.div`
  span {
    cursor: pointer;
    color: #4c5a70;
    font-weight: 600;
    border-bottom: 2px dotted #4c5a70;
    width: fit-content;
  }
`;
