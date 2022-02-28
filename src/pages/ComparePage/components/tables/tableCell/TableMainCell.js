import React from "react";
import TableDataCell from "./TableDataCell";

const tableDataset = (value, valueFor, flagType) => {
  const array = [];

  for (let i = 0; i < 3; i++) {
    array.push(
      <TableDataCell
        className={`${i === 2 && "showOnDesktop"}`}
        key={i}
        flagType={value[i] ? flagType : "wrong"}
        value={
          flagType === "text" && value[i]
            ? value[i][valueFor]
            : flagType === "features" && value[i]
            ? {
                id: value[i]["product"].id,
                sum_insured: value[i]["sum_insured"],
              }
            : flagType === "Basicfeature" && value[i]
            ? {
                id: value[i]["product"].id,
              }
            : undefined
        }
        iconFlag={flagType === "icon" && value[i]}
      />,
    );
  }

  return array;
};

const TableMainCell = ({ title, flagType, value, valueFor }) => {
  return (
    <tr>
      <th scope="row">
        <span className="tbody_bg_border_th">{title}</span>
      </th>

      {tableDataset(value, valueFor, flagType)}
    </tr>
  );
};

export default TableMainCell;
