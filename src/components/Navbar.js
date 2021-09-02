import React from "react";
import { fyntune } from "../assets/images";
import Card from "./Card";
import "styled-components/macro";
const Navbar = () => {
  return (
    <Card width={"100%"} height={"80px"}>
      <div css={`
            display: flex;
            align-items: center;
            height: 100%;
          `}>
        <img
          src={fyntune}
          alt={`companylogo`}
          css={`
            height: 34px;
          `}
        />
      </div>
    </Card>
  );
};

export default Navbar;
