"use client";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Prisma } from "@prisma/client";
//import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import LineChart from "../../components/LineChart";

Chart.register(CategoryScale);

export default function Page() {
  const path = usePathname();
  const clientId = path.split("/")[2];
  const [data, setData] = useState({ labels: null, data: null, unit: null });
  const [isLoading, setLoading] = useState(true);

  const getChre = (data: Prisma.TestResultSelect[]) => {
    return data.map((elem) => elem.creatine);
  };

  useEffect(() => {
    fetch(`/api/patients/${clientId}`)
      .then((res) => res.json())
      .then((data) => {
        setData({
          data: getChre(data.test_results),
          unit: data.test_results[0].creatine_unit,
          labels: data.test_results.map(
            (elem) => elem.date_testing.split("T")[0]
          ),
        });
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data.data) return <p>No patient data</p>;

  return (
    <>
      <h1>Patient {clientId}</h1>
      <LineChart
        chartData={{
          labels: data.labels,
          datasets: [{ id: 1, lablel: "", data: data.data }],
        }}
        title={`in ${data.unit}`}
        heading="Creatine"
      />
    </>
  );
}
