import React from "react";
import styled from "styled-components";

const ToggleFont = () => {


	return <Button>F</Button>;
};

export default ToggleFont;

const Button = styled.button`
	width: 25px;
	height: 25px;
	position: fixed;
	bottom: 50px;
	right: 5px;
	z-index: 99;
	text-align: center;
	color: #fff;
	font-size: 18px;
	background: Green;
	cursor: pointer;
	border-radius: 3px;
	&:after {
		position: absolute;
		z-index: -1;
		content: "";
		top: 100%;
		left: 5%;
		height: 10px;
		width: 90%;
		opacity: 1;
		background: radial-gradient(
			ellipse at center,
			rgba(0, 0, 0, 0.25) 0%,
			rgba(0, 0, 0, 0) 80%
		);
	}
`;
