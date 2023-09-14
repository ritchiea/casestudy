import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import CompareForm from "./CompareForm";

async function getPatients() {
  const prisma = new PrismaClient();
  const patients = await prisma.patient.findMany();

  return patients;
}

export default async function LandingPage() {
  const patients = await getPatients();
  const listItems = patients.map((patient) => (
    <li>
      <Link href={`/patients/${patient.clientId}`}>{patient.clientId}</Link>
    </li>
  ));

  const options = patients.map((patient) => (
    <option value={patient.clientId}>{patient.clientId}</option>
  ));
  return (
    <div className="landing-super-container">
      <div className="landing-container">
        <h1 className="page-heading">Patients by Client ID</h1>
        <ul>{listItems}</ul>
      </div>

      <CompareForm options={options} />
    </div>
  );
}
