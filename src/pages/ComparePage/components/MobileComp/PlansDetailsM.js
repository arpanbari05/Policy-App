import React from "react";
import wrong from "../../../../assets/images/wrong2.png";
import right from "../../../../assets/images/correct.png";

const mapPlanDetails = (plans, valueFor, title) => {
  // const sumInsuredOfPlanOne = plans[i]?.data?.sum_insured;
  console.log("panstobe visible", plans);
  const array = [];
  if (title === "Sum insured") {
    for (let i = 0; i < 2; i++) {
      array.push(
        <div
          className={`col-xs-6 text-center ${i === 0 && "border_right_dark"}`}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {plans[i]?.data?.sum_insured}
        </div>,
      );
    }
  } else if (title === "Tenure") {
    for (let i = 0; i < 2; i++) {
      array.push(
        <div
          className={`col-xs-6 text-center ${i === 0 && "border_right_dark"}`}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {plans[i]?.data?.tenure}
          {plans[i]?.data?.tenure > 1 ? " Years" : " Year"}
        </div>,
      );
    }
  } else {
    for (let i = 0; i < 2; i++) {
      array.push(
        <div
          className={`col-xs-6 text-center ${i === 0 && "border_right_dark"}`}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {plans[i]?.features?.description}
        </div>,
      );
    }
  }
  return array;
};

const PlansDetailsM = ({ title, plans, valueFor, flagType }) => {
  return (
    <div class="col-xs-12 no-padding padding_vertical_10 border_top_dark">
      <div class="col-xs-12 text-center font-bold bg_row_table_c bg_row_table_c">
        <span class="tbody_bg_border_th_bor_bootom">{title}</span>
      </div>
      <div class="col-xs-12 padding_inner_row_c_t">
        {mapPlanDetails(plans, valueFor, title)}
      </div>
    </div>
  );
};

export default PlansDetailsM;
