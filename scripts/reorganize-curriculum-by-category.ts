import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const TEMP_OFFSET = 100_000;

/**
 * Curriculum section order: basics → loops → ownership → structs → enums →
 * errors → collections → traits → … → capstone → legacy duplicates at end.
 */
const SECTION_SEQUENCE: Array<{ categories: string[]; sidebarCategory: string }> = [
  { categories: ['Basics'], sidebarCategory: 'Basics' },
  { categories: ['Control Flow - For Loops'], sidebarCategory: 'Control Flow - For Loops' },
  { categories: ['Ownership & Borrowing'], sidebarCategory: 'Ownership & Borrowing' },
  {
    categories: [
      'Structs & Enums',
      'Structs - Basic Definition',
      'Structs - Methods',
      'Structs - Associated Functions',
      'Structs - Mutable Methods',
      'Structs - Tuple Structs',
      'Structs - Update Syntax',
      'Structs - References',
      'Structs - Combined',
      'Structs - Option Fields',
      'Structs - Collections',
      'Chapter 5 - Structs',
    ],
    sidebarCategory: 'Structs & Enums',
  },
  {
    categories: [
      'Enums - Basic Definition',
      'Enums - Pattern Matching',
      'Chapter 6 - Enums and Pattern Matching',
    ],
    sidebarCategory: 'Enums & Pattern Matching',
  },
  {
    categories: [
      'Error Handling',
      'Error Handling - Result Basics',
      'Error Handling - Error Propagation',
      'Error Handling - Custom Errors',
      'Error Handling - Panic vs Result',
      'Error Handling - From Trait',
      'Error Handling - Error Chaining',
      'Error Handling - Unwrap Methods',
      'Error Handling - Combinators',
      'Chapter 9 - Error Handling',
    ],
    sidebarCategory: 'Error Handling',
  },
  {
    categories: [
      'Collections',
      'Chapter 8 - Common Collections',
      'Collections - Vectors',
      'Collections - Strings',
      'Collections - HashMap',
    ],
    sidebarCategory: 'Collections',
  },
  {
    categories: [
      'Traits & Generics',
      'Chapter 10 - Generic Types, Traits, and Lifetimes',
    ],
    sidebarCategory: 'Traits & Generics',
  },
  {
    categories: ['Functional Patterns', 'Chapter 13 - Iterators and Closures'],
    sidebarCategory: 'Functional Patterns',
  },
  { categories: ['Chapter 7 - Packages, Crates, Modules'], sidebarCategory: 'Modules & Crates' },
  { categories: ['Chapter 11 - Testing'], sidebarCategory: 'Testing' },
  { categories: ['Chapter 12 - I/O Project'], sidebarCategory: 'I/O Project' },
  { categories: ['Chapter 14 - Cargo and Crates.io'], sidebarCategory: 'Cargo' },
  { categories: ['Chapter 15 - Smart Pointers'], sidebarCategory: 'Smart Pointers' },
  { categories: ['Chapter 16 - Fearless Concurrency'], sidebarCategory: 'Concurrency' },
  { categories: ['Chapter 17 - OOP'], sidebarCategory: 'OOP' },
  { categories: ['Chapter 18 - Patterns and Matching'], sidebarCategory: 'Advanced Patterns' },
  { categories: ['Chapter 19 - Advanced Features'], sidebarCategory: 'Advanced Features' },
  { categories: ['Chapter 20 - Web Server'], sidebarCategory: 'Web Server' },
  { categories: ['Capstone'], sidebarCategory: 'Capstone' },
  // Legacy / duplicate content — after main path
  { categories: ['Chapter 4 - Ownership'], sidebarCategory: 'Ownership & Borrowing (Review)' },
  { categories: ['Ownership & Borrowing (Intro)'], sidebarCategory: 'Ownership & Borrowing (Intro)' },
];

function buildCaseSql(column: string, pairs: Array<{ from: number; to: number }>): string {
  const whens = pairs.map(({ from, to }) => `WHEN ${from} THEN ${to}`).join(' ');
  return `${column} = CASE ${column} ${whens} ELSE ${column} END`;
}

async function main() {
  const all = await prisma.challenge.findMany({
    orderBy: [{ id: 'asc' }],
  });

  const byCategory = new Map<string, typeof all>();
  for (const ch of all) {
    const list = byCategory.get(ch.category) ?? [];
    list.push(ch);
    byCategory.set(ch.category, list);
  }

  const used = new Set<number>();
  const ordered: Array<{ ch: (typeof all)[0]; sidebarCategory: string }> = [];

  for (const section of SECTION_SEQUENCE) {
    for (const cat of section.categories) {
      const list = byCategory.get(cat) ?? [];
      list.sort((a, b) => a.id - b.id);
      for (const ch of list) {
        if (used.has(ch.id)) continue;
        used.add(ch.id);
        ordered.push({ ch, sidebarCategory: section.sidebarCategory });
      }
    }
  }

  const leftover = all.filter((ch) => !used.has(ch.id)).sort((a, b) => a.id - b.id);
  for (const ch of leftover) {
    ordered.push({ ch, sidebarCategory: ch.category });
    console.warn(`Unmapped category (appended at end): ${ch.category} id=${ch.id}`);
  }

  const oldToNew = new Map<number, number>();
  ordered.forEach(({ ch }, index) => {
    oldToNew.set(ch.id, index + 1);
  });

  console.log(`Reorganizing ${ordered.length} challenges into ${SECTION_SEQUENCE.length} topic blocks...`);
  console.log('\nNew curriculum outline:');
  let lastCat = '';
  for (const { ch, sidebarCategory } of ordered) {
    const newId = oldToNew.get(ch.id)!;
    if (sidebarCategory !== lastCat) {
      console.log(`\n── ${sidebarCategory} ──`);
      lastCat = sidebarCategory;
    }
    console.log(`  ${String(newId).padStart(3)} (was ${ch.id}) ${ch.title}`);
  }

  const toTemp = [...oldToNew.entries()].map(([oldId]) => ({
    from: oldId,
    to: TEMP_OFFSET + oldId,
  }));
  const toFinal = [...oldToNew.entries()].map(([oldId, newId]) => ({
    from: TEMP_OFFSET + oldId,
    to: newId,
  }));

  const categoryUpdates = ordered.map(({ ch, sidebarCategory }, index) => ({
    tempId: TEMP_OFFSET + ch.id,
    newId: index + 1,
    category: sidebarCategory,
  }));

  await prisma.$transaction(
    async (tx) => {
      await tx.$executeRawUnsafe(`UPDATE "Challenge" SET ${buildCaseSql('id', toTemp)}`);
      await tx.$executeRawUnsafe(
        `UPDATE "Progress" SET ${buildCaseSql('"challengeId"', toTemp)}`
      );

      for (const { tempId, newId, category } of categoryUpdates) {
        await tx.$executeRawUnsafe(
          `UPDATE "Challenge" SET id = ${newId}, "order" = ${newId}, category = '${category.replace(/'/g, "''")}' WHERE id = ${tempId}`
        );
      }

      await tx.$executeRawUnsafe(
        `UPDATE "Progress" SET ${buildCaseSql('"challengeId"', toFinal)}`
      );
    },
    { timeout: 120_000 }
  );

  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"Challenge"', 'id'), (SELECT MAX(id) FROM "Challenge"))`
  );

  console.log('\nDone. Refresh the app — each topic block is now contiguous with matching sidebar labels.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());