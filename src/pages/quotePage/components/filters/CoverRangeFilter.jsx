import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  setFilters,
  fetchQuotes,
  replaceQuotes,
  replaceFilterQuotes,
} from "../../quote.slice";
import "styled-components/macro";
import { Filter, OptionWrapper, ApplyBtn } from "./Filter.style";

const FilterModal = ({ show, handleClose }) => {
  const { filters, selectedGroup } = useSelector((state) => state.quotePage);
  const coverRangeOptions = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data
  );
  const [ownCover, setOwnCover] = useState(filters.ownCover);

  const [inputCoverError, setinputCoverError] = useState(false);
  const companies = useSelector(
    (state) => state.frontendBoot.frontendData.data.companies
  );
  const [inputCover, setInputCover] = useState(false);
  const existingCoverCode = coverRangeOptions.covers.find(
    (filter) => filter.display_name === filters.cover
  )?.code;
  const existingCoverDisplayname = filters.cover;
  const dispatch = useDispatch();

  const [selectedCover, setselectedCover] = useState(
    filters.cover
      ? {
          code: existingCoverCode,
          displayName: existingCoverDisplayname,
        }
      : {}
  );

  useEffect(() => {
    if (inputCover) {
      if (inputCover < 200000) {
        setinputCoverError("Minimum should be 2 lac");
      } else if (inputCover > 200000 && inputCover < 300000) {
        setselectedCover({
          code: `${inputCover}-${300000}`,
          displayName: `₹ ${inputCover}`,
        });
      } else if (inputCover > 300000 && inputCover < 500000) {
        setselectedCover({
          code: `${300000}-${500000}`,
          displayName: `₹ ${inputCover}`,
        });
      } else if (inputCover > 1000000 && inputCover < 1500000) {
        setselectedCover({
          code: `${1500000}-${1500000}`,
          displayName: `₹ ${inputCover}`,
        });
      } else if (inputCover > 1500000 && inputCover < 2500000) {
        setselectedCover({
          code: `${1500000}-${2500000}`,
          displayName: `₹ ${inputCover}`,
        });
      }else if (inputCover > 2500000) {
        setselectedCover({
          code: `${2500000}-${10000000}`,
          displayName: `₹ ${inputCover}`,
        });
      }
       else if (inputCover > 10000000) {
        setinputCoverError("Maximum should be 1 Crore");
      } else if (inputCover % 100000 != 0) {
        setinputCoverError("Enter in multiples of 1 lac");
      } else {
        setinputCoverError(false);
      }
    } else {
      setinputCoverError(false);
    }
  }, [inputCover]);

  const handleChange = (code, displayName) => {
    setInputCover(false);
    if (displayName) {
      setselectedCover({
        code,
        displayName,
      });
    }
  };

  const handleApply = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(
      setFilters(
        
           { cover: selectedCover.displayName }
      )
    );

    dispatch(replaceQuotes([]));
    dispatch(replaceFilterQuotes([]));
    dispatch(
      fetchQuotes(companies, {
        plan_type:
          filters.planType === "Individual"
            ? "I"
            : filters.planType === "Family Floater"
            ? "F"
            : "M",
        tenure: parseInt(filters.multiYear),
        sum_insured: selectedCover.code,
        member: selectedGroup,
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
          margin: 0px !important;
          max-width: 440px;
        }
        .modal-content {
          top: 238px;
          left: 282px;
        }
        .modal-footer {
          padding: 0px !important;

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
          Choose Your Cover Range
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <OptionWrapper>
            {coverRangeOptions
              ? coverRangeOptions.covers.map((option, i) => {
                  return (
                    <li
                      className="option d-flex align-items-center justify-content-between"
                      key={i}
                    >
                      <label htmlFor={option.code}>{option.display_name}</label>
                      <input
                        type="radio"
                        id={option.code}
                        name="selectCover"
                        onChange={(e) => {
                          setInputCover("");
                          handleChange(option.code, option.display_name);
                        }}
                      />
                    </li>
                  );
                })
              : ""}
          </OptionWrapper>
          <div
            style={{
              fontWeight: "600",
            }}
            className="text-center w-100"
          >
            OR
          </div>

          {/* custom input range for plan */}
          <CustomInputWrapper>
            <input
              type="number"
              placeholder="Enter your own cover."
              className="w-100"
              value={inputCover}
              onChange={(e) => {
                setInputCover(e.target.value);
                setselectedCover("");
              }}
            />
            {inputCoverError ? (
              <div className="bottom_msg">{inputCoverError}</div>
            ) : (
              <></>
            )}
          </CustomInputWrapper>
        </div>
      </Modal.Body>
      <Modal.Footer className="text-center">
        <ApplyBtn
          className="btn apply_btn mx-auto h-100 w-100"
          onClick={(e) => handleApply(e)}
        >
          Apply
        </ApplyBtn>
      </Modal.Footer>
    </Modal>
  );
};

const CoverRangeFilter = () => {
  const [showModal, setShowModal] = useState(false);
  const filters = useSelector(({ quotePage }) => quotePage.filters);
  return (
    <>
      <Filter
        className="filter d-flex flex-column flex-fill"
        onClick={() => setShowModal(true)}
      >
        <span className="filter_head">Cover</span>
        <span className="filter_sub_head">
          {filters.cover ? filters.cover : "Select cover"}{" "}
          <i class="fas fa-chevron-down"></i>
        </span>
      </Filter>

      <FilterModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default CoverRangeFilter;

const CustomInputWrapper = styled.div`
  width: 100%;
  .bottom_msg {
    background-color: #d5ddea;
    font-size: 13px;
    margin: 5px 0px;
    padding: 10px;
  }
  input {
    border: none;
    border-bottom: 2px solid #0a87ff;
    padding: 5px 0px;
    :focus {
      outline: none;
    }
  }
`;
