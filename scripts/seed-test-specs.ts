import { Prisma, PrismaClient } from "@prisma/client";
import { CHALLENGE_TEST_SPECS } from "../src/lib/challenge-test-specs";
import { generateRustTests } from "../src/lib/test-cases/generate-rust";

const prisma = new PrismaClient();

async function main() {
  const ids = Object.keys(CHALLENGE_TEST_SPECS).map(Number);
  console.log(`Seeding structured test specs for ${ids.length} challenges...`);

  for (const id of ids) {
    const spec = CHALLENGE_TEST_SPECS[id];
    await prisma.challenge.update({
      where: { id },
      data: {
        testCaseSpec: JSON.parse(JSON.stringify(spec)) as Prisma.InputJsonValue,
        testCases: generateRustTests(spec),
      },
    });
    console.log(`  ✓ Challenge ${id} (${spec.cases.length} cases)`);
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error("Error seeding test specs:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });