import React, { useState, Fragment } from "react";
import styled from "styled-components/macro";
import {} from "../ProposalSections/ProposalSections.slice";
const RadioButtons = ({ label, customOptions, value, onChange }) => {
  const [boolean, setBoolean] = useState(!value ? customOptions[0] : value);

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
                <label key={data}>
                  <input
                    type="radio"
                    name={`is${data}`}
                    onChange={e => {
                      onChange(e);
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
