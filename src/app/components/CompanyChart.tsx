"use client";
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import "chart.js/auto";

interface CompanyChartProps {
  totalApplications?: number;
  totalJobView?: number;
  inReview?: number;
  Interviewed?: number;
  Unsuitable?: number;
  Hired?: number;
  Cancelled?: number;
}

export default function CompanyChart({
  totalApplications,
  totalJobView,
  inReview,
  Interviewed,
  Unsuitable,
  Hired,
  Cancelled,
}: CompanyChartProps) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const Data =
    totalApplications && totalJobView
      ? [totalApplications, totalJobView]
      : [inReview, Interviewed, Unsuitable, Hired, Cancelled];
  const labels =
    totalApplications && totalJobView
      ? ["Total Applications", "Job View"]
      : ["In Review", "Interviewed", "Unsuitable", "Hired", "Job Unavailable"];
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: labels,
      datasets: [
        {
          data: Data,
          backgroundColor: [
            "#f29100",
            "#39a934",
            "#1f70b7",
            "#61246c",
            "#027d73",
          ],
          hoverBackgroundColor: [
            "#f8b133",
            "#95c022",
            "#019ee2",
            "#81358a",
            "#01a099",
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
            font: {
              family: "shafarik",
              size: 14,
            },
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [
    totalApplications,
    totalJobView,
    inReview,
    Interviewed,
    Unsuitable,
    Hired,
  ]);

  return (
    <div className="card max-w-[300px] mx-auto">
      <Chart type="pie" data={chartData} options={chartOptions} />
    </div>
  );
}
