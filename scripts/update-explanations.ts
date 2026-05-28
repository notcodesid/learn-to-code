import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating challenge descriptions...');

  // Update challenge 1 - Printing
  await prisma.challenge.update({
    where: { id: 1 },
    data: {
      description: "Use `println!` to print text to the console. Example: `println!(\"Hello, World!\");`",
    },
  });
  console.log('Updated challenge 1');

  // Update challenge 2 - Variables
  await prisma.challenge.update({
    where: { id: 2 },
    data: {
      description: "Variables are immutable by default. Use `let` for immutable, `let mut` for mutable. Example: `let x = 5; let mut y = 10; y = 15;`",
    },
  });
  console.log('Updated challenge 2');

  // Update challenge 3 - Data Types
  await prisma.challenge.update({
    where: { id: 3 },
    data: {
      description: "Common types: `i32` (integers), `f64` (decimals), `bool` (true/false), `char` (single character). Example: `let x: i32 = 42;`",
    },
  });
  console.log('Updated challenge 3');

  console.log('Successfully updated descriptions');
}

main()
  .catch((e) => {
    console.error('Error updating explanations:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
