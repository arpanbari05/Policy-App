import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
function BarMarketMobile({ data, colors }) {
  let year = [];
  let premium = [];
  let color = [];
  data.map(item => {
    return (
      year.push(item.year), premium.push(item.premium), color.push(item.color)
    );
  });

  return (
    <div>
      <Bar
        data={{
          labels: year,
          datasets: [
            {
              label: "Market Size",
              data: premium,
              backgroundColor: colors,
            },
          ],
        }}
        height={260}
        width={260}
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

export default BarMarketMobile;
