import { Line } from "react-chartjs-2";

function LineChart({ chartData, title, heading }) {
  return (
    <div className="chart-container">
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
}
export default LineChart;
