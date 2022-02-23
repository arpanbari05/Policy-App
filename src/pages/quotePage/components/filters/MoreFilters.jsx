import { useState, useEffect } from "react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { selectQuotesForSort, setFilters } from "../../quote.slice";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import "styled-components/macro";
import useQuoteFilter from "./useQuoteFilter";
import { OptionWrapper, ApplyBtn } from "./Filter.style";
import tooltipImg from "../../../../assets/svg/tooltip-icon.js";
import { useFrontendBoot, useTheme, useGetQuotes } from "../../../../customHooks";
import { Filter, FilterHead } from ".";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { mergeQuotes } from "../../../../utils/helper";


const FilterModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.quotePage.filters);
  const {
    data: { morefilters: moreFilterData },
  } = useFrontendBoot();

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

  const tooltipDescSelector = name => {
    switch (name) {
      case "Popular Filters":
        return "Benefits that one should prefer to opt for while securing a health plan.";

      case "Pre existing Ailments":
        return "Select preferred waiting period for Pre-Existing diseases after which the diseases will be covered.";

      case "Others":
        return "Benefits that one could opt for as per requirement while securing a health plan.";

      case "No Claim Bonus":
        return "Select preferred percentage of increase in No Claim Bonus which will increase Sum Insured upto thatcertain amount after claim free years.";

      default:
        break;
    }
  };

  const renderTooltip = description => <Tooltip>{description}</Tooltip>;

  const handleReset = () => {
    setPopularFilter([]);
    setPreExisting("");
    setRenewalBonus("");
    setOthers([]);
  };
  useEffect(() => {
    if (
      Object.keys(filters.moreFilters).length < 1 &&
      (popularFilter.length > 0 ||
        preExisting !== "" ||
        renewalBonus !== "" ||
        others.length > 0)
    ) {
      console.log(filters.moreFilters, "3h32h32dffeg");
      handleReset();
    }
  }, [filters.moreFilters]);
  const { filterQuotes } = useQuoteFilter({
    givenMoreFilters: {
      preExisting,
      renewalBonus,
      others,
      popularFilter,
    },
  });

  const { colors } = useTheme();

  let { data } = useGetQuotes();
  let quotes = data;

  if (data) {
    quotes = data.filter(
      icQuotes => !!icQuotes?.data?.data[0]?.total_premium,
    );
    quotes = data.map(icQuotes => ({
      ...icQuotes,
      data: { data: mergeQuotes(icQuotes.data.data, { }) },
    }));
  }

  quotes = Object.values(quotes).map(quoteData => quoteData.data);
  console.log(quotes);

  const filteredQuotes = quotes.map(icQuotes => filterQuotes(icQuotes.data.data));

  console.log(filteredQuotes)

  let filteredPlans = [];
  filteredQuotes.forEach(data => {
    if (data)
      if (!filteredPlans?.includes(data.product.name)) {
        filteredPlans.push(data.product.name);
      }
  });

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
    onClose && onClose();
  };

  return (
    <Modal
      show={show}
      onHide={() => onClose && onClose()}
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
      <Modal.Header>
        <Modal.Title
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "black",
          }}
        >
          More Filters
        </Modal.Title>
        <button onClick={() => onClose && onClose()}>
          <FaTimes />
        </button>
      </Modal.Header>
      <Modal.Body>
        <MoreFilterWrapper>
          <OptionWrapper PrimaryColor={colors.primary_color}>
            {moreFilterData ? (
              moreFilterData.map((filter, i) => {
                return (
                  <>
                    <div className="morefilter_head" key={i}>
                      {console.log("filter.group_name", filter.group_name)}
                      <OverlayTrigger
                        placement="right"
                        overlay={renderTooltip(
                          tooltipDescSelector(filter.group_name),
                        )}
                      >
                        <span>
                          {filter.group_name} {tooltipImg()}
                        </span>
                      </OverlayTrigger>
                    </div>
                    <div className="morefilter_options">
                      <div
                        className="d-flex justify-content-between pb-2 mb-2 w-100 flex-wrap"
                        style={{
                          borderBottom: "1px solid #a1b2c8",
                        }}
                      >
                        {filter.options.map((option, optionIndex) => {
                          return ["popular_filters", "others"].includes(
                            filter.code,
                          ) ? (
                            <div
                              className="morefilter_option w-50 mb-3"
                              key={optionIndex}
                              css={`
                                width: 45% !important;
                                margin-left: auto;
                              `}
                            >
                              <input
                                type="checkbox"
                                id={`${option.display_name}_${filter.group_name}`}
                                className="d-none"
                                name={filter.group_name}
                                onChange={evt => {
                                  if (filter.code === "popular_filters") {
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

                                  if (filter.code === "others") {
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
                                checked={(() => {
                                  if (filter.code === "popular_filters")
                                    return popularFilter.includes(
                                      option.display_name,
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
                                  <OverlayTrigger
                                    placement="right"
                                    overlay={renderTooltip(option.description)}
                                  >
                                    <p
                                      css={`
                                        width: max-content;
                                        margin: auto 0;
                                      `}
                                    >
                                      {option.display_name} {tooltipImg()}
                                    </p>
                                  </OverlayTrigger>
                                </span>
                                <div className="custom_checkbox"></div>
                              </label>
                            </div>
                          ) : (
                            <div
                              className="morefilter_option w-50 mb-3"
                              key={optionIndex}
                              css={`
                                width: 45% !important;
                                margin-left: auto;
                              `}
                            >
                              <input
                                type="radio"
                                id={`${option.display_name}_${filter.group_name}`}
                                className="d-none"
                                name={filter.group_name}
                                onChange={evt => {
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
                                {" "}
                                <span className="option_name">
                                  <OverlayTrigger
                                    placement="right"
                                    overlay={renderTooltip(option.description)}
                                  >
                                    <p
                                      css={`
                                        width: max-content;
                                        margin: auto 0;
                                      `}
                                    >
                                      {option.display_name} {tooltipImg()}
                                    </p>
                                  </OverlayTrigger>
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
            PrimaryColor={colors.primary_color}
            className=" apply_btn mx-auto h-100 w-50"
            onClick={() => handleSubmit()}
          >
            Show {filteredPlans.length} plans
          </ApplyBtn>
        ) : (
          <span className="w-50 text-center h-100">No Plan available</span>
        )}
      </Modal.Footer>
    </Modal>
  );
};

const MoreFilters = () => {
  const { moreFilters } = useSelector(({ quotePage }) => quotePage.filters);
  const noOfSelectedFilters = Object.keys(moreFilters).reduce(
    (acc, item) => (moreFilters[item].length ? acc + 1 : acc + 0),
    0,
  );

  const display =
    noOfSelectedFilters > 0 ? (
      <>
        {`${
          noOfSelectedFilters === 1
            ? noOfSelectedFilters + " Filter"
            : noOfSelectedFilters + " Filters"
        } Selected`}{" "}
        <FaChevronDown />
      </>
    ) : (
      <>
        Select Filters
      </>
    );

  return (
    <Filter>
      <FilterHead label={"More Filters"}>{display}</FilterHead>
      <FilterModal show />
    </Filter>
  );
};

export default MoreFilters;

const MoreFilterWrapper = styled.div`
  font-weight: 600;
  max-height: 70vh;
  overflow: scroll;

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
