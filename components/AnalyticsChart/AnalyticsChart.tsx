// components/AnalyticsChart.tsx
"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsChartProps {
  analyticsData: {
    categoryData: Record<string, number>;
    weeklyData: Array<{ date: string; count: number }>;
  };
}

const AnalyticsChart = ({ analyticsData }: AnalyticsChartProps) => {
  const pieChartData = {
    labels: Object.keys(analyticsData.categoryData),
    datasets: [
      {
        data: Object.values(analyticsData.categoryData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const lineChartData = {
    labels: analyticsData.weeklyData.map((d) => d.date),
    datasets: [
      {
        label: "Completed Habits",
        data: analyticsData.weeklyData.map((d) => d.count),
        fill: false,
        borderColor: "#36A2EB",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Habits by Category</h2>
        <Pie data={pieChartData} />
      </div>
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
        <Line
          data={lineChartData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AnalyticsChart;
