import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testCases = `#[test]
fn i32_copy_allows_both_bindings() {
    let x = 5;
    let y = x;
    assert_eq!(x, 5);
    assert_eq!(y, 5);
}

#[test]
fn string_move_transfers_to_new_owner() {
    let s1 = String::from("hello");
    let s2 = s1;
    assert_eq!(s2, "hello");
}`;

const starterCode = `fn main() {
    let x = 5;
    let y = x; // i32 is Copy — both x and y stay valid

    println!("x: {}, y: {}", x, y);

    let s1 = String::from("hello");
    let s2 = s1; // String moves — s1 is no longer valid after this line

    // This would not compile: println!("{}", s1);
    println!("s2: {}", s2);
}`;

async function main() {
  await prisma.challenge.update({
    where: { id: 25 },
    data: {
      testCases,
      starterCode,
      expectedOutput: 'x: 5, y: 5\ns2: hello',
      instructions:
        'Create both a stack-allocated type (`i32`) and a heap-allocated type (`String`). Show that assignment copies `i32` (both variables stay usable) but moves `String` (only the new binding is valid). Print `x` and `y`, then print `s2`. Use the **Test** button to verify your understanding.',
    },
  });

  console.log('Updated challenge 25: added tests, cleaned starter code');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());