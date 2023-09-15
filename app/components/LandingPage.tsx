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
  const options = patients.map((patient) => (
    <div>
      <input type="checkbox" name="patients" value={patient.client_id} />
      <label htmlFor={patient.client_id}>
        <Link href={`/patients/${patient.client_id}`}>{patient.client_id}</Link>
      </label>
    </div>
  ));
  return (
    <div className="landing-super-container">
      <CompareForm options={options} />
    </div>
  );
}
