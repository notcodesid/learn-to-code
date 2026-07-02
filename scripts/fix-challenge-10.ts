import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const test = `#[test]
fn test_count_evens_in_range() {
    assert_eq!(count_evens_in_range(1, 10), 5);
    assert_eq!(count_evens_in_range(1, 1), 0);
    assert_eq!(count_evens_in_range(2, 3), 1);
}`;

async function main() {
  await prisma.challenge.update({
    where: { id: 10 },
    data: {
      expectedOutput: '5',
      instructions:
        'Use a for loop to count how many even numbers are between 1 and 10. Implement `count_evens_in_range(start, end)` and print the result from `main` as a single number (e.g. `5`).',
      starterCode: `fn count_evens_in_range(start: i32, end: i32) -> i32 {
    // Initialize a counter for even numbers
    let mut counter = 0;

    // Use a for loop from start to end (inclusive)
    for x in start..=end {
        // If x is even, increment the counter
    }

    counter
}

fn main() {
    let count = count_evens_in_range(1, 10);
    println!("{}", count);
}`,
      test,
    },
  });

  console.log('Updated challenge 10: expectedOutput=5, added tests');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());