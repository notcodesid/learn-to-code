import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding disabled - challenges should already be in the database');
  console.log('To re-seed challenges, restore prisma/seed-data.ts.bak and update seed.ts');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });