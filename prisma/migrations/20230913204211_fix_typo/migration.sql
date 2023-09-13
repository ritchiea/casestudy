/*
  Warnings:

  - You are about to drop the column `creattine_unit` on the `TestResult` table. All the data in the column will be lost.
  - Added the required column `creatine_unit` to the `TestResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestResult" DROP COLUMN "creattine_unit",
ADD COLUMN     "creatine_unit" TEXT NOT NULL;
