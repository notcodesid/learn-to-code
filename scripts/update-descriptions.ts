import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const descriptionUpdates: Record<number, string> = {
  7: 'Use `for i in start..=end` to iterate over inclusive ranges. Example: `for i in 1..=5 { println!("{}", i); }`',
  8: 'Range bounds can be variables, not just literals. Example: `let start = 3; let end = 7; for i in start..=end { println!("{}", i); }`',
  9: "Use `let mut` to update state inside a loop; use `_` when you don't need the loop variable. Example: `let mut count = 0; for _ in 1..=5 { count += 1; }`",
  10: 'Use `%` (modulus) to test divisibility inside a loop. Example: `if i % 2 == 0 { evens += 1; }`',
  11: 'Accumulate a running total in a mutable variable while looping. Example: `let mut sum = 0; for i in 1..=10 { if i % 2 == 0 { sum += i; } }`',
  12: 'Multiply by adding one number repeatedly in a loop. Example: `let mut product = 0; for _ in 0..b { product += a; }`',
  13: 'Raise a number to a power by multiplying in a loop. Example: `let mut result = 1; for _ in 0..exp { result *= base; }`',
  14: 'A prime has no divisors except 1 and itself — test with a loop from 2 upward. Example: `for d in 2..n { if n % d == 0 { return false; } }`',
  15: 'Iterate a range in reverse with `.rev()`. Example: `for i in (1..=5).rev() { println!("{}", i); }`',
  16: 'The largest proper divisor is the biggest number less than n that divides n evenly. Example: `for d in (1..n).rev() { if n % d == 0 { return Some(d); } }`',
  17: 'Each Fibonacci number is the sum of the two before it; track the last two values in a loop. Example: `let (mut a, mut b) = (0, 1); for _ in 0..n { let next = a + b; a = b; b = next; }`',
  18: 'Factorial multiplies every integer from 1 to n. Example: `let mut fact = 1; for i in 1..=n { fact *= i; }`',
  19: 'An inner loop runs completely for each outer iteration. Example: `for i in 1..=3 { for j in 1..=3 { print!("{}x{}={} ", i, j, i * j); } }`',
  20: '`break` exits a loop as soon as a condition is met. Example: `for i in 1..=100 { if i % 7 == 0 && i > 50 { println!("Found: {}", i); break; } }`',
  21: '`continue` skips the rest of the current iteration and moves to the next. Example: `for i in 1..=20 { if i % 3 == 0 { continue; } println!("{}", i); }`',
};

async function main() {
  console.log('Updating challenge descriptions (7–21)...');

  for (const [id, description] of Object.entries(descriptionUpdates)) {
    await prisma.challenge.update({
      where: { id: Number(id) },
      data: { description },
    });
    console.log(`Updated challenge ${id}`);
  }

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