import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { PlanName } from "../ComparePage.style";
import down from "./../../../assets/images/down-arrow.svg";
import { v4 as uuid } from "uuid";
import useOutsiteClick from "../../../customHooks/useOutsideClick";

const DropDown = ({ name, sum, value, onChange, covers }) => {
  const [plan, setPlan] = useState(false);
  const [sumInsured, setSumInsured] = useState(false);
  const [show, setShow] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (show) {
      ref.current.scrollIntoView({ block: "end" });
    }
  }, [show]);
  useEffect(() => {
    onChange({ plan, sumInsured });
    setShow(false);
  }, [plan, sumInsured]);
  useOutsiteClick(ref, () => setShow(false));

  return (
    <>
      <div style={{ position: "relative", height: "fit-content" }}>
        <div
          className="compare-custom-select first"
          onClick={() => setShow("plans")}
        >
          <div className="custom-placeholder">
            <span>{value?.plan || "Select Plan"}</span>
            <DownArrow src={down} alt={down}></DownArrow>
          </div>
        </div>
        <div
          className="compare-custom-select second"
          onClick={() => {
            if (value?.plan) setShow("sum");
          }}
        >
          <div className="custom-placeholder">
            <span>{value?.sumInsured || "Select Sum Insured"}</span>
            <DownArrow src={down} alt={down}></DownArrow>
          </div>{" "}
        </div>
        {show && (
          <div className="options" ref={ref}>
            {show === "plans" ? (
              name ? (
                name.map((item, i) => (
                  <div
                    key={uuid()}
                    className={`options__item ${
                      item == value?.plan ? "checked" : ""
                    }`}
                    onClick={e => {
                      setPlan(e.target.innerText);
                    }}
                  >
                    {item}
                  </div>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "18%",
                    fontFamily: "pf_handbook_probold",
                  }}
                >
                  All plans are added
                </div>
              )
            ) : show === "sum" ? (
              name ? (
                covers[plan].map(item => (
                  <div
                    className={`options__item ${
                      item == value?.sumInsured ? "checked" : ""
                    }`}
                    onClick={e => {
                      setSumInsured(e.target.innerText);
                    }}
                  >
                    {item}
                  </div>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "18%",
                    fontFamily: "pf_handbook_probold",
                  }}
                >
                  All plans are added
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DropDown;

const DownArrow = styled.img`
  width: 25px;
  @media (max-width: 767px) {
    width: 17px;
  }
`;

const Select = styled.select`
  display: none;
`;
