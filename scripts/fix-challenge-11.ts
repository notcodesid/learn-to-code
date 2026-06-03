import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.challenge.update({
    where: { id: 11 },
    data: {
      expectedOutput: '30',
      instructions:
        'Use a for loop to calculate the sum of all even numbers between 1 and 10. Print the result as a single number (e.g. `30`).',
      starterCode: `fn main() {
    // Initialize a sum variable
    let mut sum = 0;

    // Use a for loop to iterate from 1 to 10
    for x in 1..=10 {
        // Check if each number is even and add it to the sum
    }

    // Print the sum of even numbers
    println!("{}", sum);
}`,
    },
  });

  console.log('Updated challenge 11: expectedOutput=30');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());