-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "gender" INTEGER NOT NULL,
    "ethnicity" INTEGER NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_testing" TIMESTAMP(3) NOT NULL,
    "client_id" TEXT NOT NULL,
    "creatine" DOUBLE PRECISION NOT NULL,
    "creatine_unit" TEXT NOT NULL,
    "chloride" DOUBLE PRECISION NOT NULL,
    "chloride_unit" TEXT NOT NULL,
    "fasting_glucose" DOUBLE PRECISION NOT NULL,
    "fasting_glucose_unit" TEXT NOT NULL,
    "potassium" DOUBLE PRECISION NOT NULL,
    "potassium_unit" TEXT NOT NULL,
    "sodium" DOUBLE PRECISION NOT NULL,
    "sodium_unit" TEXT NOT NULL,
    "total_calcium" DOUBLE PRECISION NOT NULL,
    "total_calcium_unit" TEXT NOT NULL,
    "total_protein" DOUBLE PRECISION NOT NULL,
    "total_protein_unit" TEXT NOT NULL,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_client_id_key" ON "Patient"("client_id");

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Patient"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;
