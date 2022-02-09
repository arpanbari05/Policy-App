import React from "react";
import { Bar } from "react-chartjs-2";
function BarGroupMobile({ data, colors = [] }) {
  return (
    <div>
      <Bar
        data={{
          labels: [data[0]?.year, data[1]?.year, data[2]?.year],
          datasets: [
            {
              label: "Claim Settelment Ratio",
              data: [data[0]?.percent, data[1]?.percent, data[2]?.percent],
              backgroundColor: colors,
            },
          ],
        }}
        height={300}
        width={200}
        options={{
          maintainAspectRatio: false,

          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              titleColor: "rgba(0,0,0,1)",
              bodyColor: "rgba(0,0,0,1)",
              backgroundColor: "rgba(255,255,255,1)",
            },
          },
        }}
      />
    </div>
  );
}

export default BarGroupMobile;
