import React from "react";
import { Chart } from "react-google-charts";
import type { HistoricalData } from "../crypto";

// Tuple type for HistoricalDataItem

interface LineChartProps {
  historicalData: HistoricalData;
}

const LineChart: React.FC<LineChartProps> = ({ historicalData }) => {
  const chartData = [
    ["Date", "Price (USD)", "Market Cap (USD)", "Total Volume (USD)"],
    ...historicalData.prices.map(([timestamp, price], i) => [
      new Date(timestamp),
      price,
      historicalData.market_caps[i][1],
      historicalData.total_volumes[i][1],
    ]),
  ];

  const options = {
    title: "Bitcoin Market Overview (Last 7 Days)",
    hAxis: {
      title: "Date",
      format: "MMM dd",
      textStyle: { color: "#ddd" },
      titleTextStyle: { color: "#fff", fontSize: 14 },
    },
    vAxis: {
      title: "Value (USD)",
      textStyle: { color: "#ddd" },
      titleTextStyle: { color: "#fff", fontSize: 14 },
    },
    legend: { position: "bottom", textStyle: { color: "#fff" } },
    colors: ["#8e44ad", "#3498db", "#e67e22"],
    backgroundColor: "transparent",
    chartArea: { width: "80%", height: "70%" },
    pointSize: 5,
    lineWidth: 2,
    animation: { startup: true, duration: 1000, easing: "linear" },
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 p-6 rounded-2xl shadow-2xl bg-gradient-to-r from-gray-900/90 to-gray-800/80">
      <Chart
        chartType="LineChart"
        width="100%"
        height="450px"
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default LineChart;
