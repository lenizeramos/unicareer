"use client";
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import "chart.js/auto";

interface CompanyChartProps {
  totalApplications: number;
  totalJobView: number;
}

export default function CompanyChart({ totalApplications, totalJobView }: CompanyChartProps) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: [
        "Total Applications",
        "Job View",
      ],
      datasets: [
        {
            data: [totalApplications, totalJobView],
            backgroundColor: [
                documentStyle.getPropertyValue('--yellow-500'), 
                documentStyle.getPropertyValue('--green-500')
            ],
            hoverBackgroundColor: [
                documentStyle.getPropertyValue('--yellow-400'), 
                documentStyle.getPropertyValue('--green-400')
            ]
        }
    ]
    };
    const options = {
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true
              }
          }
      }
  };

    setChartData(data);
    setChartOptions(options);
  }, [totalApplications, totalJobView]);

  return (
    <div className="card max-w-[300px] mx-auto" >
      <Chart type="pie" data={chartData} options={chartOptions}/>
    </div>
  );
}
