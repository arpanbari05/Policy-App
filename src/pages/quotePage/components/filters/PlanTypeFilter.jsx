import { useRef, useState } from "react";
import styled from "styled-components";
import { setFilters } from "../../quote.slice";
import useOutsiteClick from "../../../../customHooks/useOutsideClick";

const PlanTypeFilter = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef()

  useOutsiteClick(ref, () => setShowDropdown(false)); return (  
    <>
      <button className="btn select_plan_btn d-flex align-items-center position-relative" style={{
        fontWeight: "600"
      }}
        onClick={() => setShowDropdown(true)}
      >
        Base Health{" "}
        <DownArrowWrapper>
          <i class="fas fa-chevron-down"></i>
        </DownArrowWrapper>

        <Dropdown className={showDropdown ? "d-block" : "d-none"} ref={ref}>
          <li className="option d-flex justify-content-between align-items-center">
            <label htmlFor="base_plan">Base plan</label>
            <input type="radio" name="select_plan_type" id="base_plan" />
          </li>

          <li className="option d-flex justify-content-between align-items-center">
            <label htmlFor="base_plan">Base plan</label>
            <input type="radio" name="select_plan_type" id="base_plan" />
          </li>

          <li className="option d-flex justify-content-between align-items-center">
            <label htmlFor="base_plan">Base plan</label>
            <input type="radio" name="select_plan_type" id="base_plan" />
          </li>
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
