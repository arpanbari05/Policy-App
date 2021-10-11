import React, { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Common/Modal";
import useOutsideClick from "../../../../customHooks/useOutsiteClick";
import {
  fetchQuotes,
  replaceFilterQuotes,
  replaceQuotes,
  saveQuotes,
  setFilters,
} from "../../quotePage.slice";
import { getQutoes, updateMultiYearFilter } from "../../ServiceApi/serviceApi";
import "styled-components/macro";
import { CustomRadio } from "./MoreFilter";

export const yearPlan = [
  {
    year: "1 Year",
    code: 1,
  },
  {
    year: "2 Years",
    discount: "Save upto 10%",
    code: 2,
  },
  {
    year: "3 Years",
    discount: "Save upto 20%",
    code: 3,
  },
];

const Multiyear = ({
  setExpandSelected,
  setSelectedYear,
  selectedYear,
  member,
}) => {
  const {
    covers,
    plantypes,
    defaultfilters: { cover: sum_insured, tenure, plan_type },
  } = useSelector(({ frontendBoot }) => frontendBoot.frontendData.data);
  const companies = useSelector(
    state => state.frontendBoot.frontendData.data.companies,
  );
  const multiYearRef = useRef();

  const { filters, selectedGroup } = useSelector(state => state.quotePage);

  useOutsideClick(multiYearRef, () => setExpandSelected(""));

  const [year, setYear] = useState(selectedYear);

  const dispatch = useDispatch();

  const { memberGroups } = useSelector(state => state.greetingPage);

  const handleYearChange = e => {
    const thisSelectedYear = yearPlan.filter(yPlan => yPlan.year === year);
    setExpandSelected("");
    e.stopPropagation();
    e.preventDefault();
    setSelectedYear(year);
    dispatch(setFilters({ multiYear: year }));
   
    if (thisSelectedYear[0]) {
      dispatch(replaceQuotes([]));
      dispatch(replaceFilterQuotes([]));
      console.log("fetchquotes multiyear")
      dispatch(
        fetchQuotes(companies, {
          plan_type: plantypes.find(
            filter => filter.display_name === filters.planType,
          )?.code,
          tenure: thisSelectedYear[0].code,
          sum_insured:
            covers.filter(
              item =>
                item.display_name.toLowerCase() === filters.cover.toLowerCase(),
            )?.[0]?.code || sum_insured,
          member: selectedGroup,
        }),
      );

      // Object.keys(companies).forEach((companyAlias) =>
      //   getQutoes({
      //     member: member.filter((m) => m.group === selectedGroup),
      //     plan_type:
      //       plantypes.filter(
      //         (item) =>
      //           item.display_name.toLowerCase() ===
      //           filters.planType.toLowerCase()
      //       )?.[0]?.code || plan_type,
      //     alias: companyAlias,
      //     sum_insured:
      //       covers.filter(
      //         (item) =>
      //           item.display_name.toLowerCase() === filters.cover.toLowerCase()
      //       )?.[0]?.code || sum_insured,
      //     tenure: thisSelectedYear[0].code,
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

  const handleYearReset = e => {
    setExpandSelected("");
    e.stopPropagation();
    e.preventDefault();
    setYear(tenure);
    setSelectedYear(tenure);
    dispatch(setFilters({ multiYear: "" }));

    dispatch(replaceQuotes([]));
    dispatch(replaceFilterQuotes([]));

    Object.keys(companies).forEach(companyAlias =>
      getQutoes({
        plan_type,
        alias: companyAlias,
        member: member.filter(m => m.group === selectedGroup),
        sum_insured,
        tenure,
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
        ref={multiYearRef}
      >
        <div>
          <div className="top_d">
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
            style={{ paddingRight: "17px", paddingLeft: "17px" }}
          >
            <form>
              <Row style={{ margin: "auto" }}>
                <Col md={10} className="product_title_p_bor_pop">
                  <p className="multi_text">Multiyear Options</p>
                </Col>

                <Col md={12}>
                  <hr className="hr_width_pop" />
                </Col>
            
                {yearPlan.map(d => (
                  <Col md={12}>
                    {/* <div
                      onClick={() => {
                        setYear(d.year);
                      }}
                      className="inputGroup"
                    >
                      <input
                        id={d.code}
                        name="radio"
                        type="radio"
                        checked={year === d.year}
                      />
                      <label
                        htmlFor={d.code}
                        style={{
                          background: "transparent",
                          border: "1px solid #d2d8e2",
                          fontWeight: year === d.year ? "bold" : "normal",
                          fontSize: "14px",
                        }}
                      >
                        {d.year}
                        {d.discount && (
                          <span
                            className="save_upto_product"
                            style={{
                              // marginLeft: "10px",
                              color: "var(--green)",
                              textTransform: "lowercase",
                              background: "transparent",
                            }}
                          >
                            ({d.discount})
                          </span>
                        )}
                      </label>
                    </div> */}
                    <CustomRadio
                      label={
                        <span>
                        
                          {d.year}{" "}
                          {d.discount && (
                            <span
                              css={`
                                color: var(--abc-red);
                                margin-left: 6px;
                              `}
                            >
                              ({d.discount})
                            </span>
                          )}
                        </span>
                      }
                      onClick={() => {
                        setYear(d.year);
                      }}
                      isSelected={year === d.year}
                    />
                  </Col>
                ))}
                <Col md={12} className=" text-center">
                  <button
                    onClick={handleYearChange}
                    className="btn btn_brd_grey"
                    css={`
                      border-radius: 2px;
                    `}
                  >
                    Apply
                  </button>
                  {/* <button
                    onClick={handleYearReset}
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

export default Multiyear;
