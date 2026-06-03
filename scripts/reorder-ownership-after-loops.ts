import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** Challenge ids 101–120: ownership & borrowing deep-dive set */
const OWNERSHIP_BLOCK_IDS = Array.from({ length: 20 }, (_, i) => 101 + i);

const INSERT_AFTER_ORDER = 21;
const BLOCK_SIZE = OWNERSHIP_BLOCK_IDS.length;
const NEW_START_ORDER = INSERT_AFTER_ORDER + 1; // 22

/** Legacy intro challenges (overlap with 101–120); park at end of curriculum */
const LEGACY_OWNERSHIP_IDS = [22, 23, 24];

async function main() {
  const ownership = await prisma.challenge.findMany({
    where: { id: { in: OWNERSHIP_BLOCK_IDS } },
    select: { id: true, title: true, order: true },
    orderBy: { id: 'asc' },
  });

  if (ownership.length !== BLOCK_SIZE) {
    throw new Error(
      `Expected ${BLOCK_SIZE} ownership challenges (ids 101–120), found ${ownership.length}`
    );
  }

  console.log(`Placing ${BLOCK_SIZE} ownership challenges at orders ${NEW_START_ORDER}–${NEW_START_ORDER + BLOCK_SIZE - 1}...`);

  // Stash the block and legacy intros so we can renumber without collisions
  for (const id of OWNERSHIP_BLOCK_IDS) {
    await prisma.challenge.update({
      where: { id },
      data: { order: 10_000 + id },
    });
  }
  for (const id of LEGACY_OWNERSHIP_IDS) {
    await prisma.challenge.update({
      where: { id },
      data: { order: 20_000 + id },
    });
  }

  const toBump = await prisma.challenge.findMany({
    where: {
      order: { gt: INSERT_AFTER_ORDER },
      id: { notIn: [...OWNERSHIP_BLOCK_IDS, ...LEGACY_OWNERSHIP_IDS] },
    },
    select: { id: true, order: true, title: true },
    orderBy: { order: 'desc' },
  });

  console.log(`Bumping ${toBump.length} challenges by +${BLOCK_SIZE}...`);
  for (const ch of toBump) {
    await prisma.challenge.update({
      where: { id: ch.id },
      data: { order: ch.order + BLOCK_SIZE },
    });
  }

  for (let i = 0; i < OWNERSHIP_BLOCK_IDS.length; i++) {
    const id = OWNERSHIP_BLOCK_IDS[i];
    await prisma.challenge.update({
      where: { id },
      data: {
        order: NEW_START_ORDER + i,
        category: 'Ownership & Borrowing',
      },
    });
    console.log(`  order ${NEW_START_ORDER + i}: id ${id} — ${ownership[i].title}`);
  }

  const maxOrder = await prisma.challenge.aggregate({ _max: { order: true } });
  const legacyStart = (maxOrder._max.order ?? 0) + 1;
  for (let i = 0; i < LEGACY_OWNERSHIP_IDS.length; i++) {
    await prisma.challenge.update({
      where: { id: LEGACY_OWNERSHIP_IDS[i] },
      data: {
        order: legacyStart + i,
        category: 'Ownership & Borrowing (Intro)',
      },
    });
  }

  const afterLoops = await prisma.challenge.findMany({
    where: { order: { gte: 20, lte: 45 } },
    select: { id: true, order: true, title: true, category: true },
    orderBy: { order: 'asc' },
  });

  console.log('\nCurriculum after loops (orders 20–45):');
  for (const c of afterLoops) {
    console.log(`  ${c.order.toString().padStart(3)} | id ${c.id.toString().padStart(3)} | ${c.category} | ${c.title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());