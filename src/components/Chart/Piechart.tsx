import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

interface Data {
  male: any;
  female: any;
}

const PieChart = () => {
  const [students, setStudents] = useState( {} as Data);

  useEffect(() => {
    async function getDatas() {
      try {
        const studentData = await fetch("/api/students/gender");
        const stures = await studentData.json();
        setStudents(stures);
      } catch (error) {
        console.log(error);
      }
    }

    getDatas();
  }, []);


  const male=  students.male ? students.male.length: null
  const female=  students.female ? students.female.length: null
  

  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "My First Dataset",
        data: [male, female],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  const options: any = {
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
      legend: {
        position: "bottom",
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
