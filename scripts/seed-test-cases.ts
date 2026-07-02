import { PrismaClient } from "@prisma/client";
import { CHALLENGE_TEST_CASES } from "../src/lib/challenge-test-cases";

const prisma = new PrismaClient();

async function main() {
  const ids = Object.keys(CHALLENGE_TEST_CASES).map(Number);
  console.log(`Seeding test cases for ${ids.length} challenges...`);

  for (const id of ids) {
    const existing = await prisma.challenge.findUnique({
      where: { id },
      select: { testCaseSpec: true },
    });

    if (existing?.testCaseSpec) {
      console.log(`  ⊘ Challenge ${id} (skipped — uses testCaseSpec)`);
      continue;
    }

    const testCases = CHALLENGE_TEST_CASES[id];
    await prisma.challenge.update({
      where: { id },
      data: { testCases },
    });
    console.log(`  ✓ Challenge ${id}`);
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error("Error seeding test cases:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });