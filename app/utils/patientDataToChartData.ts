import { Prisma } from "@prisma/client";

const BIOMARKERS = [
  "creatine",
  "chloride",
  "fasting_glucose",
  "potassium",
  "sodium",
  "total_calcium",
  "total_protein",
];

type BiomarkerName =
  | "creatine"
  | "chloride"
  | "fasting_glucose"
  | "potassium"
  | "sodium"
  | "total_calcium"
  | "total_protein";

export interface ChartData {
  data: any[];
  labels: any[];
  unit: any;
}

export interface AllChartData {
  creatine: ChartData;
  chloride: ChartData;
  fasting_glucose: ChartData;
  potassium: ChartData;
  sodium: ChartData;
  total_calcium: ChartData;
  total_protein: ChartData;
  clientId: any;
}

export const patientDataToChartData = (
  patientData: Prisma.TestResultSelect[]
): AllChartData => {
  let result = {} as AllChartData;
  BIOMARKERS.forEach((marker) => {
    const data = {} as ChartData;
    data.data = patientData.map(
      (elem) => elem[marker as keyof Prisma.TestResultSelect]
    );
    data.unit =
      patientData[0][`${marker}_unit` as keyof Prisma.TestResultSelect];
    //@ts-ignore
    data.labels = patientData.map((elem) => elem.date_testing.split("T")[0]);
    result[marker as BiomarkerName] = data;
  });
  result.clientId = patientData[0].clientId;

  return result;
};
