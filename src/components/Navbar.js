import React from "react";
import { fyntune } from "../assets/images";
import Card from "./Card";
import "styled-components/macro";
const Navbar = () => {
  return (
    <div
      css={`
    @media (max-width: 769px){
      display: none;
    }
    `}
    >
      <Card width={"100%"} height={"80px"}    >
        <a css={`
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0px 100px;
          `}
          href="/">
          <img
            src={fyntune}
            alt={`companylogo`}
            css={`
            height: 34px;
            cursor: pointer;
          `}
          />
        </a>
      </Card>
    </div>
  );
};

export default Navbar;
