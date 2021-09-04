import React from "react";
import "./SecondaryNavbar.scss";
import "styled-components/macro";

const SecondaryNavbar = () => {
  return (
    <div className="secondaryNavbar">
      <h1
        className="secondaryNavbar__header"
        css={`
          @media (max-width: 767px) {
            padding-left: 18px !important;
          }
        `}
      >
        Insurance Advisory
      </h1>
      {/* <ul className="secondaryNavbar__infoList">
					<li><a href="#" className="text-white">Insurance Advisory</a></li>
				<li><a href="#" className="text-white">Insurances</a></li>
					<li><a href="#" className="text-white">About Us</a></li> 
				</ul> */}
    </div>
  );
};

export default SecondaryNavbar;
