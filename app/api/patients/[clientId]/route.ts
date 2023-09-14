import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Context } from "../../../types";

export async function GET(request: Request, context: Context) {
  const { clientId } = context.params;
  const prisma = new PrismaClient();
  const patient = await prisma.patient.findUnique({
    where: { clientId },
    include: { test_results: true },
  });

  return NextResponse.json(patient);
}
