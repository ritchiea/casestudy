/*
  Warnings:

  - You are about to drop the column `patientId` on the `TestResult` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `TestResult` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_patientId_fkey";

-- AlterTable
ALTER TABLE "TestResult" DROP COLUMN "patientId",
ADD COLUMN     "clientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Patient"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;
