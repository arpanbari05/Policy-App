import React, { useRef, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Common/Modal";
import useOutsideClick from "../../../../customHooks/useOutsiteClick";
import {
  replaceQuotes,
  saveQuotes,
  replaceFilterQuotes,
  setFilters,
  fetchQuotes,
} from "../../quotePage.slice";
import { updateCoverFilter, getQutoes } from "../../ServiceApi/serviceApi";
import "styled-components/macro";
import { CustomRadio } from "./MoreFilter";

const Cover = ({
  setExpandSelected,
  coverFilter,
  setSelectedCover,
  selectedCover,
  member,
}) => {
  const [cover, setCover] = useState(selectedCover);

  useEffect(() => setCover(selectedCover), [selectedCover]);

  const coverRef = useRef();

  useOutsideClick(coverRef, () => setExpandSelected(""));

  const companies = useSelector(
    state => state.frontendBoot.frontendData.data.companies,
  );

  const {
    covers,
    defaultfilters: { cover: sum_insured, tenure, plan_type },
    plantypes,
  } = useSelector(state => state.frontendBoot.frontendData.data);

  const dispatch = useDispatch();

  const { filters, selectedGroup } = useSelector(state => state.quotePage);

  const [ownCover, setOwnCover] = useState(filters.ownCover);
  const [inputCover, setInputCover] = useState(false);
  const [inputCoverError, setinputCoverError] = useState(false);

  const { memberGroups } = useSelector(state => state.greetingPage);

  const handleCoverUpdate = e => {
    const thisSelectedCover = covers.filter(
      thisCover => thisCover.display_name === cover,
    );

    setExpandSelected("");
    e.stopPropagation();
    e.preventDefault();
    setSelectedCover(ownCover ? "" : cover);
    dispatch(setFilters({ ownCover, cover: ownCover ? "" : cover }));

    if (ownCover || thisSelectedCover[0]) {
      dispatch(replaceQuotes([]));
      dispatch(replaceFilterQuotes([]));
      console.log("I executed");
      dispatch(
        fetchQuotes(companies, {
          plan_type: plantypes.find(
            filter => filter.display_name === filters.planType,
          )?.code,
          tenure: parseInt(filters.multiYear) || tenure,
          sum_insured: ownCover
            ? `${ownCover}-${ownCover}`
            : thisSelectedCover[0].code,
          member: selectedGroup,
        }),
      );

      // Object.keys(companies).forEach((companyAlias) =>
      //   getQutoes({
      //     sum_insured: ownCover
      //       ? `${ownCover}-${ownCover}`
      //       : thisSelectedCover[0].code,
      //     alias: companyAlias,
      //     member: member.filter((m) => m.group === selectedGroup),
      //     tenure: filters["multiYear"].slice(0, 1) || tenure,
      //     plan_type:
      //       plantypes.filter(
      //         (item) =>
      //           item.display_name.toLowerCase() ===
      //           filters.planType.toLowerCase()
      //       )?.[0]?.code || plan_type,
      //   }).then((response) => {
      //     const newData = response?.data?.data.map((data) => {
      //       return { ...data, logo: companies[data.company_alias].logo };
      //     });

      //     if (response?.data) {
      //       dispatch(saveQuotes(newData));
      //     }
      //   })
      // );
    }
  };
  //cover Validation

  useEffect(() => {
    if (inputCover) {
      if (inputCover < 200000) {
        setinputCoverError("Minimum should be 2 lac");
      } else if (inputCover > 10000000) {
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

  const handleCoverReset = e => {
    setExpandSelected("");
    e.stopPropagation();
    e.preventDefault();
    setOwnCover(sum_insured);
    setCover(sum_insured);

    setSelectedCover(sum_insured);
    dispatch(setFilters({ ownCover: "", cover: "" }));

    dispatch(replaceQuotes([]));
    dispatch(replaceFilterQuotes([]));

    Object.keys(companies).forEach(companyAlias =>
      getQutoes({
        sum_insured,
        alias: companyAlias,
        member: member.filter(m => m.group === selectedGroup),
        tenure,
        plan_type,
      }).then(response => {
        const newData = response?.data?.data.map(data => {
          return { ...data, logo: companies[data.company_alias].logo };
        });

        if (response?.data) {
          dispatch(saveQuotes(newData));
        }
      }),
    );
  };

  return (
    <Modal>
      <div
        css={`
          position: absolute;
          top: 133%;
          left: 0;
          z-index: 99;
        `}
        ref={coverRef}
      >
        <div>
          <div className="top_d" style={{ width: 500 }}>
            <div className="avatar-large me"></div>
            <div
              className="x-touch"
              onClick={event => {
                setExpandSelected("");
                event.stopPropagation();
              }}
            >
              <div className="x">
                <div className="line1"></div>
                <div className="line2"></div>
              </div>
            </div>
          </div>
          <div
            className="bottom_d"
            style={{ width: 500, paddingRight: "17px", paddingLeft: "17px" }}
          >
            <form>
              <Row style={{ margin: "auto" }}>
                <Col md={10} className="product_title_p_bor_pop">
                  <p className="multi_text">Choose your Cover Range</p>
                </Col>

                <Col md={12}>
                  <hr className="hr_width_pop" />
                </Col>
                {coverFilter?.map(item => (
                  <Col
                    md={6}
                    css={`
                      padding-right: 9px !important;
                      padding-left: 9px !important;
                    `}
                    onClick={() => {
                      setCover(item?.display_name);
                      setOwnCover("");
                      dispatch(setFilters({ ownCover: "" }));
                      setInputCover(false);
                    }}
                  >
                    {/* <div
                      onClick={() => {
                        setCover(item?.display_name);
                        setOwnCover("");
                        dispatch(setFilters({ ownCover: "" }));
                        setInputCover(false);
                      }}
                      className="inputGroup"
                    >
                      <input
                        id={item.code}
                        name="radio"
                        type="radio"
                        checked={cover === item?.display_name}
                      />
                      <label
                        htmlFor={item.code}
                        style={{
                          background: "transparent",
                          border: "1px solid #d2d8e2",
                        }}
                      >
                        {item?.display_name}
                      </label>
                    </div> */}
                    <CustomRadio
                      label={item?.display_name}
                      isSelected={cover === item?.display_name}
                    />
                  </Col>
                ))}

                <Col md={12} className=" text-center">
                  <p className="mb-10">OR</p>
                </Col>

                <Col md={12} id="myDIV">
                  {/* <p className="p_title_cover">
              Enter value of your choice
            </p> */}
                  <input
                    type="text"
                    placeholder="e.g Enter Your Own Cover"
                    className="form-control_product_pop mb_12"
                    value={ownCover}
                    maxLength="8"
                    onChange={e => {
                      setOwnCover(e.target.value);
                      setInputCover(e.target.value);
                      setCover("");
                    }}
                  />
                  {inputCoverError && (
                    <p className="formbuilder__error">{inputCoverError}</p>
                  )}
                  <span
                    className="text-left float_value"
                    style={{ marginLeft: "3px" }}
                  >
                    Enter value between 2 Lac to 1 Crore in multiples of 1 Lac{" "}
                  </span>
                </Col>
                <Col md={12} className="text-center">
                  <button
                    onClick={handleCoverUpdate}
                    className="btn btn_brd_grey"
                    disabled={inputCoverError ? true : false}
                    style={{ borderRadius: "2px" }}
                  >
                    Apply
                  </button>
                  {/* <button
                    onClick={handleCoverReset}
                    className="btn btn_brd_grey ml-4"
                  >
                    Reset
                  </button> */}
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Cover;
