import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating challenge descriptions...');

  // Update challenge 4 - Functions
  await prisma.challenge.update({
    where: { id: 4 },
    data: {
      description: "Define functions with `fn name(params) -> ReturnType { }`. Return value is the last expression without semicolon. Example: `fn add(a: i32, b: i32) -> i32 { a + b }`",
    },
  });
  console.log('Updated challenge 4');

  // Update challenge 5 - if/else
  await prisma.challenge.update({
    where: { id: 5 },
    data: {
      description: "Use `if`, `else if`, and `else` for conditional logic. Example: `if x > 0 { println!(\"positive\"); } else if x < 0 { println!(\"negative\"); } else { println!(\"zero\"); }`",
    },
  });
  console.log('Updated challenge 5');

  // Update challenge 6 - Loops
  await prisma.challenge.update({
    where: { id: 6 },
    data: {
      description: "Use `for i in 1..=5` for inclusive ranges, `while condition { }` for conditional loops. Example: `for i in 1..=5 { println!(\"{}\", i); }`",
    },
  });
  console.log('Updated challenge 6');

  console.log('Successfully updated descriptions');
}

main()
  .catch((e) => {
    console.error('Error updating descriptions:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
