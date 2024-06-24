import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Custom Pie Chart Title",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return tooltipItem.label + ": " + tooltipItem.raw;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
