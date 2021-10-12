import React from "react";
import { fyntune } from "../assets/images";
import { useSelector } from "react-redux";
import Card from "./Card";
import "styled-components/macro";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const { trace_id } = useSelector((state) => state.greetingPage);
  const location = useLocation();
  return (
    <div
      css={`
        @media (max-width: 769px) {
          display: none;
        }
      `}
    >
      <Card width={"100%"} height={"80px"}>
        <a
          css={`
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0px 100px;
          `}
          href="/"
        >
          <img
            src={fyntune}
            alt={`companylogo`}
            css={`
              height: 34px;
              cursor: pointer;
            `}
          />
        </a>

        {location.pathname !== "/" && trace_id && (
          <div
            css={`
            position: absolute;
            right: 14px;
            bottom: 2px;
            font-size: 12px;
        
            `}
          >
            Trace Id: <span>{trace_id}</span>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Navbar;
