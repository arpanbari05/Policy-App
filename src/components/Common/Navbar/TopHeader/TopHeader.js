import React, { useState } from "react";
import { profileSvg } from "../../../../assets/svg/svg";
import NavDropdown from "../NavDropdown/NavDropdown";
import "./topHeader.scss";

const TopHeader = () => {
	const items2 = [
		{ name: "link 1", link: "#" },
		{ name: "link 2", link: "#" },
		{ name: "link 3", link: "#" },
	];

	const corporates = [
		{ name: "PROTECTING", link: "#" },
		{ name: "INVESTING", link: "#" },
		{ name: "FINANCING", link: "#" },
	];
	return (
		<div className="topHeader">
			<NavDropdown items={corporates} customClassName={"topHeader__btn1"}>
				<button className="topHeader__button">CORPORATES</button>
			</NavDropdown>

			<NavDropdown items={items2} customClassName={"topHeader__btn2"}>
				<button className="topHeader__button topHeader__profileBtn">
					{profileSvg}
					<span> Profile</span>
				</button>
			</NavDropdown>
		</div>
	);
};

export default TopHeader;
