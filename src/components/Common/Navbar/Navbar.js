import React, { useState } from "react";
import BottomHeader from "./BottomHeader/BottomHeader";
import MainNavbar from "./MainNavbar/MainNavbar";
import SecondaryNavbar from "./SecondaryNavbar/SecondaryNavbar";
import TopHeader from "./TopHeader/TopHeader";


const Navbar = ({ displayNavbar, className }) => {

  return (
    <div
      style={{
        display: displayNavbar ? "block" : "none",
        //white-edges v
        // padding: "15px 15px 0px",
      }}
      className={`${className}`}
    >
      {/* <TopHeader /> */}
      <MainNavbar />
      <SecondaryNavbar />
      <BottomHeader />
    </div>
  );
};

export default Navbar;
