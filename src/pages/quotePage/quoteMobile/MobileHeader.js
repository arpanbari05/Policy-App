import React, { useState, useRef } from "react";
import styled from "styled-components/macro";
import { useSelector, useDispatch } from "react-redux";
import DownArrow from "../../../assets/images/downarrow.png";
import pencil_p from "../../../assets/images/pencil_p.png";
import { Link } from "react-router-dom";
import { fetchQuotes, setFilters } from "../quote.slice";
import useOutsiteClick from "../../../customHooks/useOutsideClick";
import MEditMember from "./EditMembersPopup/MEditMember";

const MobileHeader = ({ groupCode }) => {
  const dispatch = useDispatch();
  const { basePlanType, planType } = useSelector(
    state => state.quotePage.filters,
  );

  const { cover, tenure } = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data.defaultfilters,
  );
  const { memberGroups } = useSelector(state => state.greetingPage);

  const plansFor = memberGroups[groupCode]?.join(", ") || "";

  const [openArogyaDropdown, setOpenArogyaDropdown] = useState(false);
  const [editMembers, setEditMembers] = useState(false);
  const arogyaDropDownRef = useRef(null);

  useOutsiteClick(arogyaDropDownRef, () => setOpenArogyaDropdown(false));

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

  const handleClick = evt => {

    if (basePlanType !== evt.target.value) {
      dispatch(setFilters({ basePlanType: evt.target.value }));
      console.log("fetchquotes mobileHeader")
      dispatch(
        fetchQuotes(companies, {
          sum_insured: sendCover,
          tenure: parseInt(tenure),
          member: groupCode,
          plan_type: sendPlanType,
          basePlanType: evt.target.id,
        }),
      );
    }
    setOpenArogyaDropdown(false);
  };

  function PlanTypeCheckbox({ value, onChange, label, isSelected }) {
    return (
      <div>
        <input
          checked={isSelected}
          onChange={onChange}
          value={label}
          type="checkbox"
          name="dropdown-group"
          className="check checkbox-custom"
          id={value + "t"}
          css={`
          display: none;
          `}
        />
        <label
          htmlFor={value + "t"}
          css={`
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            cursor: pointer;
          `}
        >
          {label}
          <div
            css={`
              height: 20px;
              width: 20px;
              display: flex !important;
              border: 1px solid;
              border-radius: 50%;
              border-color: ${isSelected && "#0a87ff"};
              align-items: center;
              justify-content: center;

              &::after {
                display: ${isSelected ? "block" : "none"};
                content: "";
                height: 12px;
                width: 12px;
                background-color: #0a87ff;
                border-radius: 50%;
              }
            `}
          />
        </label>
      </div>
    );
  }

  return (
    <>
      <MobileStyledHeader>
        <div
          css={`
            display: flex;
            align-items: center;
          `}
        >
          <Link to="/" className="first-container">
            <i className="flaticon-back" />
          </Link>
          <span
            css={`
              display: flex;
              flex-direction: column;
              color: white;
              line-height: 20px;
              margin-left: 6px;
            `}
          >
            <span>Plan for</span>
            <span
              css={`
                font-weight: 900;
                display: flex;
                flex-direction: row;
                position: relative;
              `}
              onClick={() => {
                setOpenArogyaDropdown(true);
              }}
            >
              {basePlanType}
              <img
                src={DownArrow}
                css={`
                  filter: brightness(0) invert(1);
                  height: 20px;
                  position: relative;
                  left: 3px;
                  transform: ${openArogyaDropdown &&
                  "translateY(0%) rotate(-180deg)"};
                `}
              />
              <div
                ref={arogyaDropDownRef}
                style={{ paddingBottom: 0 }}
                className="dropdown-list"
                css={`
                  padding: 25px 20px;
                  display: ${openArogyaDropdown ? "block !important" : "none"};
                  background: #fff;
                  color: black;
                  font-weight: 100;
                  position: absolute;
                  max-height: 223px;
                  background: #fff;
                  top: 29px;
                  z-index: 10;
                  border-radius: 8px;
                  width: 190px !important;
                  box-shadow: 0px 6px 25px #869cd54d;

               
                `}
              >
                {basePlanTypes.map(thisBasePlanType =>
                  thisBasePlanType.code !== "arogya_sanjeevani" ? (
                    <PlanTypeCheckbox
                      key={thisBasePlanType.code}
                      value={thisBasePlanType.code}
                      label={thisBasePlanType.display_name}
                      onChange={handleClick}
                      isSelected={
                        basePlanType === thisBasePlanType.display_name
                      }
                    />
                  ) : null,
                )}
              </div>
            </span>
          </span>
        </div>
        <div
          css={`
            display: flex;
            align-items: center;
          `}
        >
          <span
            css={`
              display: flex;
              flex-direction: column;
              color: white;
              line-height: 23px;
              margin-right: 6px;
            `}
          >
            <span>Edit Members</span>
            <span
              css={`
                display: flex;
                flex-direction: row;
              `}
            >
              <span
                css={`
                 
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                      max-width: 87px;
                  text-transform: capitalize;
                `}
              >
                {plansFor}{" "}
              </span>
              <img
                onClick={() => setEditMembers(true)}
                src={pencil_p}
                css={`
                  height: 22px;
                `}
              />
            </span>
          </span>
        </div>
      </MobileStyledHeader>
      {editMembers && <MEditMember handleClose={() => setEditMembers(false)} />}
    </>
  );
};

export default MobileHeader;

const MobileStyledHeader = styled.div`
  display: none;
  @media (max-width: 1023px) {
    display: flex;
    height: 62px;
    background: #0a87ff;
    padding: 0 8px;
    align-items: center;
    justify-content: space-between;
    & a {
      color: white;
      display: flex;
      align-items: center;
      & i {
        height: unset;
      }
    }
    & .first-container {
      & i:before {
        margin: 0 4px 0px 0px !important;
        padding: unset !important;
      }
    }
    & .second-container {
      display: flex;
      width: 25%;
      align-items: center;
      justify-content: flex-end;
      & a {
        margin-right: 20px;
      }
      & img {
        max-width: unset;
      }
    }
  }
`;
