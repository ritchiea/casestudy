import { PrismaClient, TestResult } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    for (let i = 0; i <= 10; i++) {
      console.log("getting data from API");
      const data = await fetch("https://mockapi-furw4tenlq-ez.a.run.app/data");
      const json = await data.json();
      console.log(json);
      const client = await prisma.client.create({
        data: {
          clientId: json[0].client_id,
          birthdate: new Date(json[0].date_birthdate).toISOString(),
          gender: json[0].gender,
          ethnicity: json[0].ethnicity,
        },
      });
      console.log(client);
      json.forEach(async (element: any) => {
        const testResult = await prisma.testResult.create({
          data: {
            clientId: element.client_id,
            date_testing: new Date(element.date_testing).toISOString(),
            creatine: element.creatine,
            creatine_unit: element.creatine_unit,
            chloride: element.chloride,
            chloride_unit: element.chloride_unit,
            fasting_glucose: element.fasting_glucose,
            fasting_glucose_unit: element.fasting_glucose_unit,
            potassium: element.potassium,
            potassium_unit: element.potassium_unit,
            sodium: element.sodium,
            sodium_unit: element.sodium_unit,
            total_calcium: element.total_calcium,
            total_calcium_unit: element.total_calcium_unit,
            total_protein: element.total_protein,
            total_protein_unit: element.total_protein_unit,
          },
        });
        console.log(testResult);
      });
    }
  } catch (e) {
    console.log(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
