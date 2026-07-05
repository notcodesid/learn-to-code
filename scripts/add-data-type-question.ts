import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding new Data Types challenge (Tuples & Arrays) after the existing "Data Types" challenge...');

  // Find the existing Data Types challenge (by title, taking the first match)
  const dataTypes = await prisma.challenge.findFirst({
    where: {
      title: {
        contains: 'Data Types',
      },
    },
    orderBy: { id: 'asc' },
  });

  if (!dataTypes) {
    console.error('❌ Could not find a challenge with "Data Types" in the title.');
    console.error('   Please check your database or adjust the search.');
    process.exit(1);
  }

  console.log(`Found: id=${dataTypes.id}, order=${dataTypes.order}, "${dataTypes.title}"`);

  const insertOrder = dataTypes.order + 1;

  // Bump the order of all challenges that come after the insertion point
  const challengesToBump = await prisma.challenge.findMany({
    where: { order: { gte: insertOrder } },
    select: { id: true, order: true, title: true },
    orderBy: { order: 'asc' },
  });

  if (challengesToBump.length > 0) {
    console.log(`Bumping order for ${challengesToBump.length} subsequent challenges...`);
    for (const ch of challengesToBump) {
      await prisma.challenge.update({
        where: { id: ch.id },
        data: { order: ch.order + 1 },
      });
    }
  } else {
    console.log('No subsequent challenges to bump.');
  }

  // Create the new challenge
  const newChallenge = await prisma.challenge.create({
    data: {
      title: 'Tuples and Arrays',
      difficulty: 'beginner',
      category: 'Basics',
      description:
        'Tuples group a fixed number of values (different types allowed). Arrays hold a fixed number of the *same* type with size known at compile time. Destructure tuples with pattern matching and index into arrays with `[n]`.',
      instructions:
        'Create a tuple `info` containing an i32 (42), a char (\'R\'), and a bool (true). Destructure it into three variables. Create an array `nums` of type [i32; 4] with the values [5, 10, 15, 20]. Print the char from the tuple, the third element of the array, and the array length — each on its own line.',
      starterCode: `fn main() {
    // Create the info tuple: (42, 'R', true)
    
    // Destructure it into num, ch, flag
    
    // Create the nums array: [5, 10, 15, 20]
    
    // Print: the char, the 3rd element (15), and the length (4)
    
}`,
      hint: 'Tuple literal + destructuring: `let t = (42, \'R\', true); let (n, c, f) = t;`. Array: `let a: [i32; 4] = [5,10,15,20];` then `a[2]` (0-based) and `a.len()`.',
      expectedOutput: 'R\n15\n4',
      explanation:
        'Tuples are perfect for ad-hoc grouping of a few related values without creating a full struct. They can be destructured directly in let bindings. Arrays have their length encoded in the type ([T; N]), so the compiler knows the exact size. Both live on the stack and are very fast. When you need a growable list, reach for Vec<T> instead.',
      testCases: `#[test]
fn test_tuples_and_arrays() {
    let info = (42i32, 'R', true);
    let (num, ch, flag) = info;
    assert_eq!(num, 42);
    assert_eq!(ch, 'R');
    assert_eq!(flag, true);

    let nums: [i32; 4] = [5, 10, 15, 20];
    assert_eq!(nums[2], 15);
    assert_eq!(nums.len(), 4);
}`,
      order: insertOrder,
    },
  });

  console.log(`\n✅ Successfully created new challenge!`);
  console.log(`   id: ${newChallenge.id}`);
  console.log(`   title: ${newChallenge.title}`);
  console.log(`   order: ${newChallenge.order}`);
  console.log(`   category: ${newChallenge.category}`);
  console.log('\nNext steps:');
  console.log('  1. Run `bun run dev`');
  console.log('  2. The new "Tuples and Arrays" challenge should now appear right after "Data Types"');
  console.log('  3. Test it end-to-end (compile + run + test button)');
}

main()
  .catch((e) => {
    console.error('Error adding challenge:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
