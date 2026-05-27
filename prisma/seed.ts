import { PrismaClient } from '@prisma/client';
import { staticChallenges as challenges } from '../src/data/challenges';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed challenges...');

  // Clear existing challenges
  await prisma.challenge.deleteMany({});
  console.log('Cleared existing challenges');

  // Insert challenges from the static file
  for (const challenge of challenges) {
    await prisma.challenge.create({
      data: {
        id: challenge.id,
        title: challenge.title,
        difficulty: challenge.difficulty,
        category: challenge.category,
        description: challenge.description,
        instructions: challenge.instructions,
        starterCode: challenge.starterCode,
        hint: challenge.hint,
        expectedOutput: challenge.expectedOutput || null,
        order: challenge.id, // Use ID as order for now
      },
    });
    console.log(`Inserted challenge: ${challenge.title}`);
  }

  console.log(`Successfully seeded ${challenges.length} challenges`);
}

main()
  .catch((e) => {
    console.error('Error seeding challenges:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });