import { Line } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import { FC } from "react";

interface LineChartProps {
  title: string;
  heading: string;
  chartData: ChartData<"line">;
}

const LineChart: FC<LineChartProps> = ({ chartData, title, heading }) => {
  return (
    <div style={{ width: "33%" }} className="chart-container">
      <h2 style={{ textAlign: "center" }}>{heading}</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: title,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};
export default LineChart;
