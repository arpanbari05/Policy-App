import React from "react";
import useWindowSize from "../../../../customHooks/useWindowSize";
import styled from "styled-components";

const SeeDetailsTabContainer = ({
	title,
	id,
	onClick,
	activeFieldset,
	image,
}) => {
	const handleClick = (id) => {
		onClick(id);
	};
	const [windowHeight,windowWidth] = useWindowSize();
	return (
		<SeeDetailsTabContainerStyle>
			<li className={`z-tab z-first ${activeFieldset === id && "z-active"} `}>
				<a className="z-link see-details__z-link"
					style={{ paddingRight: "0px"}}
					onClick={() => handleClick(id)}>
					<img src={image} alt=""  />{" "}
					<span
						style={{ paddingRight: "15px"}}
					>{title}</span>
				</a>
			</li>
			</SeeDetailsTabContainerStyle>
	);
};


export default SeeDetailsTabContainer;

const SeeDetailsTabContainerStyle = styled.div`
	margin:0px auto;
	img{
		margin-right: 10px;
		padding-left: 8px; 
	}
	@media (max-width:1114px){
		
		img{
			width:40px;
			margin-top: 14px !important;
			
		}
		a span{
			font-size: 15px;
		}
	}
	
`;

