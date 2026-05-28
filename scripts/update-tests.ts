import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating challenge tests...');

  // Update challenge 1
  await prisma.challenge.update({
    where: { id: 1 },
    data: {
      test: `#[test]
fn test_hello_rust() {
    let output = "Hello, Rust!";
    assert_eq!(output, "Hello, Rust!");
}`,
    },
  });
  console.log('Updated challenge 1');

  // Update challenge 2
  await prisma.challenge.update({
    where: { id: 2 },
    data: {
      test: `#[test]
fn test_variables() {
    let x = 5;
    let mut y = 10;
    y = y + x;
    assert_eq!(x, 5);
    assert_eq!(y, 15);
}`,
    },
  });
  console.log('Updated challenge 2');

  // Update challenge 3
  await prisma.challenge.update({
    where: { id: 3 },
    data: {
      test: `#[test]
fn test_data_types() {
    let int_val: i32 = 42;
    let float_val: f64 = 3.14;
    let bool_val: bool = true;
    let char_val: char = 'R';
    assert_eq!(int_val, 42);
    assert_eq!(float_val, 3.14);
    assert_eq!(bool_val, true);
    assert_eq!(char_val, 'R');
}`,
    },
  });
  console.log('Updated challenge 3');

  console.log('Successfully updated tests');
}

main()
  .catch((e) => {
    console.error('Error updating tests:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
