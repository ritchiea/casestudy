import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request: Request) {
  const prisma = new PrismaClient();
  const patients = await prisma.patient.findMany();

  return NextResponse.json(patients);
}
