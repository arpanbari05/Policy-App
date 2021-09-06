import React from "react";

const PlansTab = ({ isActive, title, description, onClick }) => {
	return (
		<a
			onClick={onClick}
			className={`nav-link mb-3 p-3 shadow ${isActive && "active"}`}
		>
			<span className="font-weight-bold" >
				{title}
			</span>
			<p className={`${isActive && "active"}`}>{description}</p>
		</a>
	);
};

export default PlansTab;
