import React, { useEffect, useState } from "react";
import wrong from "../../../../../assets/images/wrong2.png";
import right from "../../../../../assets/images/correct.png";
import { getFeaturesApi, getRidersApi } from "../../../../QuotesPage/ServiceApi/serviceApi";

const TableDataCell = ({
	flagType,
	iconFlag,
	selectValues,
	value,
	className,
}) => {
	const [features, setFeatures] = useState(null);

	const getRiders = async ({ productId, sum_insured }) => {
		try {
			const response = await getRidersApi({ productId, sum_insured });
			
			setFeatures(response?.data);
		} catch (error) {
			alert(error);
			console.error(error);
		}
	};
	const getFeatures = async (id) => {
		try {
			const response = await getFeaturesApi(id);
			console.log("fffffffffffffffffffff", response);
			setFeatures(response?.data);
		} catch (error) {
			alert(error);
			console.error(error);
		}
	};

	useEffect(() => {
		if (flagType === "features") {
			getRiders({
				productId: value.id,
				sum_insured: value.sum_insured,
			});
		}
		if (flagType === "Basicfeature") {
			getFeatures(value.id);
		}
	}, [flagType]);

	return (
		<>
			{flagType === "text" ? (
				<td className={className}> {value}</td>
			) : flagType === "features" && features ? (
				<td className={className}>
					{features?.map((data, i) => (
						<>
							<p
								style={{
									fontWeight: "900",
									fontSize: "13px",
									lineHeight: "16px",
								}}
							>
								{data.name}
							</p>
							<hr style={{ display: i === features.length - 1 && "none" }} />
						</>
					))}
				</td>
			) : flagType === "icon" ? (
				<td className={className}>
					<img
						src={iconFlag === "right" ? right : wrong}
						className="img_coorect"
					/>
				</td>
			) : flagType === "select" ? (
				<td className={className}>
					<select>
						{selectValues.map((data) => (
							<option>₹ {data}</option>
						))}
					</select>
				</td>
			) : (
				<td className={className}>
					<img src={wrong} className="img_coorect" />
				</td>
			)}
		</>
	);
};

export default TableDataCell;
