import React, { useState, useEffect, Fragment } from "react";
import plusImg from "../../../assets/images/plus.png";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowNSTP,
  setShowPlanNotAvail,
} from "../ProposalSections/ProposalSections.slice";
const RadioButtons = ({
  label,
  customOptions,
  members = [],
  name,
  value,
  error,
  onChange,
  notAllowed,
  showMembers,
  customMembers,
}) => {
  const [boolean, setBoolean] = useState(!value ? customOptions[0] : value);
  console.log(value, boolean, "fdsa23");
  const [membersStatus, setMembersStatus] = useState({});
  const { mediUnderwritting } = useSelector(
    state => state.proposalPage.proposalData,
  );
  const membersToMap = customMembers instanceof Array ? customMembers : members;
  // const membersToMap = members;

  const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (!value) {
  //       setBoolean("N");
  //     }
  //     onChange({
  //       ...value,
  //       [`is${name}`]: boolean,
  //     });
  //   }, [value]);

  return (
    <>
      <div className="container no-padding-mobile">
        <div className="box_shadow_box_card_medical">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <Question className="mb-10 p_propsal_form_r_q_m toggle_question">
                {label}
              </Question>
            </div>
            <div className="col-lg-4 col-md-12 middle no-padding mobile-left">
              {customOptions?.map(data => (
                <label>
                  <input
                    type="radio"
                    name={`is${data}`}
                    //   onChange={e => {
                    //     if (notAllowed && mediUnderwritting) {
                    //       dispatch(setShowPlanNotAvail(true));
                    //     } else {
                    //       setBoolean(e.target.value);
                    //     }
                    //   }}
                    onChange={e => {
                      onChange(e.target.value);
                      setBoolean(e.target.value);
                    }}
                    value={data}
                    checked={boolean === data}
                  />
                  <div
                    className="front-end box capitalize-mobile"
                    css={`
                      width: ${customOptions?.[0]?.length > 4 &&
                      "144px !important"};
                      line-height: 42px !important;
                      height: 34px !important;
                    `}
                  >
                    <span>{data}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RadioButtons;

const PlusImg = styled.img`
  float: left;
  margin: 0 12px 0 2px;
`;
const Question = styled.p`
  &:after {
    content: "";
    height: 22px;
    width: 6px;
    position: absolute;
    left: -2px;
    top: 2px;
    background-color: #fecc28;
    border-radius: 50px;
    @media (max-width: 767px) {
      height: calc(100% - 6px);
    }
  }
  @media (max-width: 767px) {
    font-size: 14px !important;
  }
`;
const Group = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 16px 17px;
  & input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    z-index: -1;
    & + label {
      text-transform: capitalize;
      padding-left: 1em;
      color: #000000;
      border: 1px solid #e7ebf0;
      border-radius: 50px;
      padding: 9px 19px;
      font-size: 16px;
      font-weight: 900;
      width: 140px;
      text-align: center;
      margin-right: 11px;
      box-shadow: 0 3px 6px 0 #004b8326 !important;
      transition: 0.25s all ease;
      cursor: pointer;
      background: #fff;
      @media (max-width: 767px) {
        width: 66px;
        padding: 4px 10px;

        font-size: 14px;
      }
    }
    &:checked + label {
      padding-left: 1em;
      color: #000000;
      border: 2px solid #0a87ff;
      border-radius: 50px;
      padding: 7px 19px;
      font-size: 16px;
      font-weight: 900;
      width: 140px;
      text-align: center;
      margin-right: 11px;
      background: #fff5f5;
      @media (max-width: 767px) {
        width: 66px;
        padding: 4px 10px;
        font-size: 14px;
      }
    }
  }
  @media (max-width: 767px) {
    padding: 12px 12px 6px;
    background-color: #f7f9fa;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }
`;
