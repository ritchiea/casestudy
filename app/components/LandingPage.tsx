import { PrismaClient } from "@prisma/client";
import Link from "next/link";

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
  return (
    <>
      <h1>Patients</h1>
      <ul>{listItems}</ul>
    </>
  );
}
