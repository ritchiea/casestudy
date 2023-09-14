"use client";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import LineChart from "@/app/components/LineChart";
import { patientDataToChartData } from "@/app/utils/patientDataToChartData";
import { useSearchParams } from "next/navigation";

interface ChartData {
  id: number;
  label: string;
  data: number[];
}

Chart.register(CategoryScale);

const getMax = (data: ChartData[]) => {
  let max: number = 0;

  data.forEach((d) => {
    if (d.data.length > max) {
      max = d.data.length;
    }
  });
  return max;
};

export default function Page() {
  const params = useSearchParams();
  const clientIds = params.getAll("patients");
  const biomarker = params.get("biomarker");
  const [data, setData] = useState([] as ChartData[]);
  const [unit, setUnit] = useState("");
  const [labels, setLabels] = useState([] as string[]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetches = clientIds.map((clientId) =>
      fetch(`/api/patients/${clientId}`)
    );
    Promise.all(fetches)
      .then((values) => Promise.all(values.map((res) => res.json())))
      .then((values) => {
        const patients = values.map((pData) =>
          patientDataToChartData(pData.test_results)
        );
        const data = patients.map((p, i) => ({
          data: p[biomarker].data,
          id: i,
          label: `patient ${p.clientId}`,
        }));
        // @ts-ignore
        setData(data);
        setUnit(patients[0][biomarker].unit);
        const max = getMax(data);
        const a: string[] = [];
        for (let i = 1; i <= max; i++) {
          a.push(`t${i}`);
        }
        setLabels(a);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (data.length == 0) return <p>No patient data</p>;

  return (
    <div className="compare-patient-page-container">
      <h1 className="page-heading">Compare Patients</h1>
      <LineChart
        chartData={{
          labels: labels,
          datasets: data,
        }}
        title={unit}
        heading={`Comparing ${biomarker}`}
      />
    </div>
  );
}
