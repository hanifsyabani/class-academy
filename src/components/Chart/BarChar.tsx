"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({
  data1,
  data2,
  data3,
  title1,
  title2,
  title3,
}: {
  data1: any;
  data2: any;
  data3?: any;
  title1: string;
  title2: string;
  title3?: string;
}) => {
  const data = {
    labels: [title1, title2, title3],
    datasets: [
      {
        label: "# of Votes",
        data: [data1, data2, data3],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Class Academy",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
