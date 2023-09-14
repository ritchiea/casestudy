"use client";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import LineChart from "@/app/components/LineChart";
import {
  patientDataToChartData,
  AllChartData,
} from "@/app/utils/patientDataToChartData";
import { isEmpty } from "@/app/utils/isEmpty";

Chart.register(CategoryScale);

export default function Page() {
  const path = usePathname();
  const clientId = path.split("/")[2];
  const [data, setData] = useState({} as AllChartData);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/patients/${clientId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(patientDataToChartData(data.test_results)), setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isEmpty(data)) return <p>No patient data</p>;

  return (
    <div className="patient-page-container">
      <h1 className="page-heading">Patient {clientId}</h1>
      <LineChart
        chartData={{
          labels: data.creatine.labels,
          datasets: [{ data: data.creatine.data }],
        }}
        title={data.creatine.unit}
        heading="Creatine"
      />
      <LineChart
        chartData={{
          labels: data.chloride.labels,
          datasets: [{ data: data.chloride.data }],
        }}
        title={data.chloride.unit}
        heading="Chloride"
      />
      <LineChart
        chartData={{
          labels: data.fasting_glucose.labels,
          datasets: [{ data: data.fasting_glucose.data }],
        }}
        title={data.fasting_glucose.unit}
        heading="Fasting Glucose"
      />
      <LineChart
        chartData={{
          labels: data.potassium.labels,
          datasets: [{ data: data.potassium.data }],
        }}
        title={data.potassium.unit}
        heading="Potassium"
      />
      <LineChart
        chartData={{
          labels: data.sodium.labels,
          datasets: [{ data: data.sodium.data }],
        }}
        title={data.sodium.unit}
        heading="Sodium"
      />
      <LineChart
        chartData={{
          labels: data.total_calcium.labels,
          datasets: [{ data: data.total_calcium.data }],
        }}
        title={data.total_calcium.unit}
        heading="Total Calcium"
      />
      <LineChart
        chartData={{
          labels: data.total_protein.labels,
          datasets: [{ data: data.total_protein.data }],
        }}
        title={data.total_protein.unit}
        heading="Total Protein"
      />
    </div>
  );
}
