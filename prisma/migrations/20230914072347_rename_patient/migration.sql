/*
  Warnings:

  - You are about to drop the column `clientId` on the `TestResult` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `patientId` to the `TestResult` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_clientId_fkey";

-- AlterTable
ALTER TABLE "TestResult" DROP COLUMN "clientId",
ADD COLUMN     "patientId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Client";

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "gender" INTEGER NOT NULL,
    "ethnicity" INTEGER NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_clientId_key" ON "Patient"("clientId");

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;
