import React from "react";
import styled from "styled-components";

const RadioBtn = ({ onChange, value, checked }) => {
	return (
		<>
			<label>
				<Input value={value} checked={checked === value} onChange={onChange} />
				<LabelSpan className="front-end box">
					<span>{value}</span>
				</LabelSpan>
			</label>
		</>
	);
};

export default RadioBtn;

const Input = styled.input.attrs(() => ({
	type: "radio",
}))`
	&:checked + .box span {
		color: white;
		transform: translateY(70px);
		top: -70px;
	}
	&:checked + .box {
		background-color: #c7222a;
	}
`;

const LabelSpan = styled.div`
	:active {
		transform: translateY(10px);
	}
	width: 90px;
	height: 46px;
	background-color: #ededed;
	transition: all 250ms ease;
	will-change: transition;
	display: inline-block;
	text-align: center;
	cursor: pointer;
	position: relative;
	font-family: "Dax", sans-serif;
	font-weight: 400;
	border-radius: 50px;
	line-height: 45px;
	font-size: 14px;
	margin: 0 8px;

	& span {
		position: absolute;
		transform: translate(0, 60px);
		left: 0;
		right: 0;
		transition: all 300ms ease;
		/* font-size: 1.5em; */
		user-select: none;
		color: #000;
		top: -60px;
		font-size: 15px;
	}
`;
