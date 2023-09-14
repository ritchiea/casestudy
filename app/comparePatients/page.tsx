"use client";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import LineChart from "@/app/components/LineChart";
import { patientDataToChartData } from "@/app/utils/patientDataToChartData";
import { isEmpty } from "@/app/utils/isEmpty";
import { useParams } from "next/navigation";

Chart.register(CategoryScale);

export default function Page() {
  //const params = useParams();
  const clientIds = ["e21f304d", "207b9763"];
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetches = clientIds.map((clientId) =>
      fetch(`/api/patients/${clientId}`)
    );
    console.log(fetches);
    Promise.all(fetches)
      .then((values) => Promise.all(values.map((res) => res.json())))
      .then((values) => {
        console.log(values);
        const patients = values.map((pData) =>
          patientDataToChartData(pData.test_results)
        );
        const data = patients.map((p, i) => ({
          data: p.creatine.data,
          id: i + 1,
          label: `patient ${i}`,
        }));
        console.log(data);
        setData(data);
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
          labels: [
            "t1",
            "t2",
            "t3",
            "t4",
            "t5",
            "t6",
            "t7",
            "t8",
            "t9",
            "t10",
            "t11",
          ],
          datasets: data,
        }}
        title="unit"
        heading="Comparing"
      />
    </div>
  );
}
