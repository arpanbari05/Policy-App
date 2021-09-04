import React from "react";
import styled from "styled-components";

const StyledButton = ({
	type,
	value,
	noIcon,
	onClick,
	children,
	customClass,
}) => {
	return (
		<Button
			type={type}
			data-page="1"
			name="next"
			value={value}
			onClick={onClick}
			className={`styled__button ${customClass}`}
		>
			{value ? value : children}{" "}
			{!noIcon && <i className="icon flaticon-next"></i>}
		</Button>
	);
};

export default StyledButton;

const Button = styled.button.attrs((props) => ({
	type: props.type,
}))`
	box-sizing: border-box;
	user-select: none;
	-webkit-tap-highlight-color: transparent;
	touch-action: manipulation;
	font-family: inherit;
	overflow: visible;
	text-transform: none;
	outline: none;
	box-shadow: none;
	width: 194px !important;
	background: #c7222a;
	color: white;
	border: 0 none;
	cursor: pointer;
	padding: 10px 11px;
	margin: 10px auto;
	transition: all 0.3s linear 0s;
	display: block;
	border-radius: 2px;
	font-size: 20px;
	font-weight: 400;
	line-height: 35px;
	height: 58px;
	z-index: 9999;
	float: left;
	left: 4px;
	position: inherit;
`;
