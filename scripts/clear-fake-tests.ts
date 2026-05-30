import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing fake test values from challenges 1-3...');

  const result = await prisma.challenge.updateMany({
    where: {
      id: { in: [1, 2, 3] },
    },
    data: {
      test: null,
    },
  });

  console.log(`Updated ${result.count} challenges (test field set to NULL).`);
  console.log('Done. These challenges now only use expectedOutput + Run for verification.');
}

/*
Equivalent raw SQL (if you prefer to run it directly in Supabase SQL editor):

  UPDATE "Challenge"
  SET "test" = NULL
  WHERE id IN (1, 2, 3);

Then verify:
  SELECT id, title, test IS NOT NULL as has_test FROM "Challenge" WHERE id IN (1,2,3);
*/

main()
  .catch((e) => {
    console.error('Error clearing fake tests:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
