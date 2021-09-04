import React from "react";
import "./BottomHeader.scss";
import "styled-components/macro";
import { useSelector,useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ChangeUi } from "../../../../modules/QuotesPage/quotePage.slice";

const BottomHeader = () => {
  const location = useLocation();
  const { trace_id } = useSelector(state => state.greetingPage);
  const dispatch = useDispatch();
  return (
    <div
      className="BottomHeader"
      css={`
        @media (max-width: 767px) {
          padding: 0 18px;
        }
      `}
    >
      <h1 className="BottomHeader__header">
        {" "}
        Aditya Birla Insurance Brokers Limited{" "}
      </h1>
      {location.pathname !== "/" && trace_id && (
        <p
          css={`
            color: #fff;
            position: absolute;
            right: 14px;
            font-weight: 100;
            font-size: 15px;
            line-height: 1px;
            & span {
              user-select: all;
            }
            @media (max-width: 767px) {
              display: none;
            }
          `}
        >
          Trace ID- <span onClick={()=>dispatch(ChangeUi())}>{trace_id}</span>
        </p>
      )}
      {/* <ul className="BottomHeader__infoList">
        <li>
          <a href="#" className="text-white">
            Aditya Birla Insurance Brokers Limited
          </a>
        </li>
      </ul> */}
    </div>
  );
};

export default BottomHeader;
