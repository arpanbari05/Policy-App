import { useRef, useState } from "react";
import styled from "styled-components";
import { fetchQuotes, setFilters } from "../../quote.slice";

import { useParams } from "react-router";
import useOutsiteClick from "../../../../customHooks/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";

const PlanTypeFilter = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef();
  useOutsiteClick(ref, () => setShowDropdown(false));

  const {
    basePlanType,
    multiYear: tenure,
    cover,
    planType,
  } = useSelector(state => state.quotePage.filters);

  const { groupCode } = useParams();

  const dispatch = useDispatch();

  const {
    baseplantypes: basePlanTypes,
    companies,
    covers,
    plantypes,
  } = useSelector(state => state.frontendBoot.frontendData.data);

  const sum_insured = covers.find(cov => cov.code === cover);

  const pt = plantypes.find(p => p.display_name === planType);

  const sendPlanType = pt ? pt.code : "F";

  const sendCover = sum_insured ? sum_insured.code : "";
  console.log("bes", basePlanType);
  const handleClick = evt => {
    if (basePlanType !== evt.target.value) {

      console.log("heee", evt.target.value, basePlanType);
      dispatch(setFilters({ basePlanType: evt.target.value }));
      dispatch(
        fetchQuotes(companies, {
          sum_insured: sendCover,
          tenure: parseInt(tenure),
          member: groupCode,
          plan_type: sendPlanType,
          basePlanType: evt.target.value,
        }),
      );
      setShowDropdown(false);
    }
  };
  return (

    <>
      <button className="btn select_plan_btn d-flex align-items-center position-relative" style={{
        fontWeight: "600"
      }}
        onClick={() => setShowDropdown(true)}
      >
        {basePlanType}{" "}
        <DownArrowWrapper>
          <i class="fas fa-chevron-down"></i>
        </DownArrowWrapper>

        <Dropdown className={showDropdown ? "d-block" : "d-none"} ref={ref}>
          {basePlanTypes.map(thisPlanType => {
            return (
              <li className="option d-flex justify-content-between align-items-center"

              >
                <label htmlFor="base_plan">{thisPlanType.display_name}</label>
                <input type="radio" name="select_plan_type" id="base_plan"
                  value={thisPlanType.display_name}

                  onClick={handleClick}
                />
              </li>
            )
          })}



        </Dropdown>
      </button>
    </>
  );
};

export default PlanTypeFilter;

const DownArrowWrapper = styled.div`
  background-color: #eff7ff;
  color: #0a87ff;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin: 0px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dropdown = styled.ul`
  position: absolute;
  width: 100%;

  background-color: white;
  box-shadow: 0 3px 9px 0 rgba(193, 203, 218, 0.52);
  z-index: 99;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  list-style: none;
  padding: 10px 15px;
  margin: 0;
font-size: 14px;
font-weight: 600;
  input[type="radio"] {
    width: 18px;
    height: 18px;
  }
  li{
      margin-bottom: 10px;
  }
`;
