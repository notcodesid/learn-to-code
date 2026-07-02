import { PrismaClient } from '@prisma/client';
import { descriptionUpdates } from './ownership-descriptions-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating ownership & borrowing descriptions (22–41)...');

  for (const [id, description] of Object.entries(descriptionUpdates)) {
    await prisma.challenge.update({
      where: { id: Number(id) },
      data: { description },
    });
    console.log(`  ✓ ${id}`);
  }

  console.log('Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());