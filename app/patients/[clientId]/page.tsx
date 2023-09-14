"use client";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Prisma } from "@prisma/client";
//import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import LineChart from "../../components/LineChart";
import {
  patientDataToChartData,
  AllChartData,
} from "../../utils/patientDataToChartData";

Chart.register(CategoryScale);

export default function Page() {
  const path = usePathname();
  const clientId = path.split("/")[2];
  const [data, setData] = useState({} as AllChartData);
  const [isLoading, setLoading] = useState(true);

  //   const getChre = (data: Prisma.TestResultSelect[]) => {
  //     return data.map((elem) => elem.creatine);
  //   };

  useEffect(() => {
    fetch(`/api/patients/${clientId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(patientDataToChartData(data.test_results)), setLoading(false);
      });
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  // if (!data.data) return <p>No patient data</p>;

  return (
    <>
      <h1>Patient {clientId}</h1>
      <LineChart
        chartData={{
          labels: data.creatine.labels,
          datasets: [{ id: 1, lablel: "", data: data.creatine.data }],
        }}
        title={data.creatine.unit}
        heading="Creatine"
      />
      <LineChart
        chartData={{
          labels: data.chloride.labels,
          datasets: [{ id: 1, lablel: "", data: data.chloride.data }],
        }}
        title={data.chloride.unit}
        heading="Chloride"
      />
      <LineChart
        chartData={{
          labels: data.fasting_glucose.labels,
          datasets: [{ id: 1, lablel: "", data: data.fasting_glucose.data }],
        }}
        title={data.fasting_glucose.unit}
        heading="Fasting Glucose"
      />
      <LineChart
        chartData={{
          labels: data.potassium.labels,
          datasets: [{ id: 1, lablel: "", data: data.potassium.data }],
        }}
        title={data.potassium.unit}
        heading="Potassium"
      />
      <LineChart
        chartData={{
          labels: data.sodium.labels,
          datasets: [{ id: 1, lablel: "", data: data.sodium.data }],
        }}
        title={data.sodium.unit}
        heading="Sodium"
      />
      <LineChart
        chartData={{
          labels: data.total_calcium.labels,
          datasets: [{ id: 1, lablel: "", data: data.total_calcium.data }],
        }}
        title={data.total_calcium.unit}
        heading="Total Calcium"
      />
      <LineChart
        chartData={{
          labels: data.total_protein.labels,
          datasets: [{ id: 1, lablel: "", data: data.total_protein.data }],
        }}
        title={data.total_protein.unit}
        heading="Total Protein"
      />
    </>
  );
}
