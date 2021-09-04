import React from "react";
import styled from "styled-components";
import Checbox from "../Checkbox/Checbox";

const ShowDiffMobile = ({ setshowDiffCbx, showDiffCbx }) => {
	return (
		<StyledDiv>
			<Checbox
				checked={showDiffCbx}
				onChange={() => setshowDiffCbx(!showDiffCbx)}
			/>
		</StyledDiv>
	);
};

export default ShowDiffMobile;

const StyledDiv = styled.div`
	background: #f3f4f9;
	height: 32px;
	& .agreement-checkbox_compare {
		position: relative;
		left: 45px;
		top: 4px;
		width: 118px;
		& label {
			padding: unset;
			margin: unset;
			&:before {
				left: -25px;
				top: 1px;
			}
		}
	}
`;
