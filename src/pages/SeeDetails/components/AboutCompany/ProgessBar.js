import React from "react";
import "styled-components/macro"
const ProgessBar = ({ year, value, color }) => {
	return (
		<>
			<h3 className="progress-title">{year}</h3>
			<div className={`progress_chart `} >
				<div className="progress-bar" style={{ width: `${value - 21}%`, height: "0px", maxWidth:"195px" }}
					css={`
						 &:before{
							background-color: ${color};
							 border: 5px solid ${color} !important;
						 }
						 `}
				>
					<div className="progress-value">{`${value}%`}</div>
				</div>
			</div>
		</>
	);
};

export default ProgessBar;
