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
import { getQutoes, updatePlanTypeFilter } from "../../ServiceApi/serviceApi";
import "styled-components/macro";
import { CustomRadio } from "./MoreFilter";
import { useParams } from "react-router";

export const planTypeTenure = {
  Individual: "I",
  "Family Floater": "F",
  "Multi Individual": "M",
};

const Plan = ({
  setExpandSelected,
  planType,
  setSelectedFloater,
  selectedFloater,
  member,
}) => {
  const {
    covers,
    defaultfilters: { cover: sum_insured, tenure, plan_type },
  } = useSelector(({ frontendBoot }) => frontendBoot.frontendData.data);
  const [floater, setFloater] = useState(selectedFloater);
  const planRef = useRef();

  const { groupCode } = useParams();

  useOutsideClick(planRef, () => setExpandSelected(""));

  const { filters, selectedGroup } = useSelector(state => state.quotePage);
  const { memberGroups } = useSelector(state => state.greetingPage);

  const membersCount = memberGroups[groupCode]?.length;

  const dispatch = useDispatch();

  const companies = useSelector(
    state => state.frontendBoot.frontendData.data.companies,
  );

  const handlePlanUpdate = e => {
    setExpandSelected("");
    e.stopPropagation();
    e.preventDefault();
    setSelectedFloater(floater);
    dispatch(setFilters({ planType: floater }));

    if (planTypeTenure[floater]) {
      dispatch(replaceQuotes([]));
      dispatch(replaceFilterQuotes([]));
      console.log("fetchquotes plan")
      dispatch(
        fetchQuotes(companies, {
          plan_type: planTypeTenure[floater],
          tenure: parseInt(filters.multiYear) || tenure,
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
      //     planTypeCode: planTypeTenure[floater],
      //     plan_type: planTypeTenure[floater],
      //     alias: companyAlias,
      //     member: member.filter((m) => m.group === selectedGroup),
      //     sum_insured:
      //       covers.filter(
      //         (item) =>
      //           item.display_name.toLowerCase() === filters.cover.toLowerCase()
      //       )?.[0]?.code || sum_insured,
      //     tenure: filters?.tenure?.slice(0, 1) || tenure,
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

  const handlePlanReset = e => {
    setExpandSelected("");
    e.stopPropagation();
    e.preventDefault();
    setSelectedFloater("");
    dispatch(setFilters({ planType: "" }));

    if (planTypeTenure[floater]) {
      dispatch(replaceQuotes([]));
      dispatch(replaceFilterQuotes([]));

      Object.keys(companies).forEach(companyAlias =>
        getQutoes({
          planTypeCode: plan_type,
          alias: companyAlias,
          member: selectedGroup,
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
    }
  };

  const displayPlanTypes = planType.filter(planType => {
    if (membersCount > 1) return planType.display_name !== "Individual";
    return planType.display_name === "Individual";
  });

  return (
    <Modal>
      <div
        css={`
          position: absolute;
          top: 133%;
          left: 0;
          z-index: 99;
        `}
        ref={planRef}
      >
        <div>
          <div className="top_d">
            <div className="avatar-large me"></div>
            {/* <div className="name-large">Mikael Ainalem</div> */}
            <div
              className="x-touch"
              // onclick="document.querySelector('.email_plan').classList.remove('expand_plan');event.stopPropagation();"
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
            {/* <Row>
              <div className="link">
                <a href="#">Family Floater</a>
              </div>
            </Row>
            <Row>
              <div className="link">
                <a href="#">Multi-individual</a>
              </div>
            </Row> */}
            <form>
              <Row style={{ margin: "auto" }}>
                <Col md={10} className="product_title_p_bor_pop">
                  <p className="multi_text">Choose your Plan Type</p>
                </Col>

                <Col md={12}>
                  <hr className="hr_width_pop" />
                </Col>
                {displayPlanTypes?.map(item => (
                  <Col md={12}>
                    {/* <div
                      onClick={() => {
                        setFloater(item?.display_name);
                      }}
                      className="inputGroup"
                    >
                      <input
                        id={item.code}
                        name="radio"
                        type="radio"
                        checked={floater === item?.display_name}
                      />
                      <label
                        htmlFor={item.code}
                        style={{
                          background: "transparent",
                          border: "1px solid #d2d8e2",
                        }}
                      >
                        {item.display_name}
                      </label>
                    </div> */}
                    <CustomRadio
                      label={item.display_name}
                      onClick={() => {
                        setFloater(item?.display_name);
                      }}
                      isSelected={floater === item?.display_name}
                    />
                  </Col>
                ))}

                {/* <Col md={12}>
                  <div className="inputGroup">
                    <input
                      id="radio1_plan3"
                      name="radio"
                      type="radio"
                    />
                    <label htmlFor="radio1_plan3">individual</label>
                  </div>
                </Col> */}
                <Col md={12} className="text-center">
                  <button
                    onClick={handlePlanUpdate}
                    className="btn btn_brd_grey"
                    css={`
                      border-radius: 2px;
                    `}
                  >
                    Apply
                  </button>
                  {/* <button
                    onClick={handlePlanReset}
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

export default Plan;
