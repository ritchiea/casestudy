import { Prisma } from '@prisma/client'

async function getPatients() {
    const res = await fetch('http://localhost:3000/api/patients')
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

export default async function LandingPage() {
    const patients = await getPatients()
    const listItems = patients.map((patient: Prisma.PatientSelect) =>
            <li>
                {patient.clientId}
            </li>
        )
    return <ul>{listItems}</ul>
}
