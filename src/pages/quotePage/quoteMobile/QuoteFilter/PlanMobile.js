import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
const planTypeTenure = {
  Individual: "I",
  "Family Floater": "F",
  "Multi Individual": "M",
};
const PlanMobile = ({ planType, selected, setSelected }) => {
  const { memberGroups } = useSelector(state => state.greetingPage);
  const { groupCode } = useParams();
  const membersCount = memberGroups[groupCode]?.length;
  const displayPlanTypes = planType.filter(planType => {
    if (membersCount > 1) return planType.display_name !== "Individual";
    return planType.display_name === "Individual";
  });
  return (
    <>
      <article>
        <Row className=" mt--38">
          {displayPlanTypes?.map(item => (
            <Col md={12} className="padding-none">
              <div className="inputGroup">
                <input
                  id={item.code}
                  name="radio-plan-type"
                  type="radio"
                  checked={selected === item?.display_name}
                />
                <label
                  htmlFor={item.code}
                  className="label--before  mobile-filter-label"
                  onClick={() => {
                    setSelected(item?.display_name);
                  }}
                >
                  {item.display_name} <div className="checkbox--button"></div>
                </label>
              </div>
            </Col>
          ))}
        </Row>
      </article>
    </>
  );
};

export default PlanMobile;
