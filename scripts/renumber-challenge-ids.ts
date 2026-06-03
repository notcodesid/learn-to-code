import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const TEMP_OFFSET = 100_000;

function buildCaseSql(column: string, pairs: Array<{ from: number; to: number }>): string {
  const whens = pairs.map(({ from, to }) => `WHEN ${from} THEN ${to}`).join(' ');
  return `${column} = CASE ${column} ${whens} ELSE ${column} END`;
}

async function main() {
  const challenges = await prisma.challenge.findMany({
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
    select: { id: true, title: true },
  });

  const toTemp = challenges.map((ch) => ({ from: ch.id, to: TEMP_OFFSET + ch.id }));
  const toFinal = challenges.map((ch, index) => ({
    from: TEMP_OFFSET + ch.id,
    to: index + 1,
  }));

  const changed = challenges.filter((ch, i) => ch.id !== i + 1).length;
  console.log(`Renumbering ${challenges.length} challenges (${changed} ids will change)...`);

  await prisma.$transaction(
    async (tx) => {
      await tx.$executeRawUnsafe(
        `UPDATE "Challenge" SET ${buildCaseSql('id', toTemp)}`
      );
      await tx.$executeRawUnsafe(
        `UPDATE "Progress" SET ${buildCaseSql('"challengeId"', toTemp)}`
      );
      await tx.$executeRawUnsafe(
        `UPDATE "Challenge" SET id = CASE id ${toFinal.map(({ from, to }) => `WHEN ${from} THEN ${to}`).join(' ')} ELSE id END, "order" = CASE id ${toFinal.map(({ from, to }) => `WHEN ${from} THEN ${to}`).join(' ')} ELSE "order" END`
      );
      await tx.$executeRawUnsafe(
        `UPDATE "Progress" SET ${buildCaseSql('"challengeId"', toFinal)}`
      );
    },
    { timeout: 120_000 }
  );

  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"Challenge"', 'id'), (SELECT MAX(id) FROM "Challenge"))`
  );

  const verify = await prisma.challenge.findMany({
    where: { id: { gte: 20, lte: 45 } },
    select: { id: true, order: true, title: true },
    orderBy: { id: 'asc' },
  });

  console.log('\nCurriculum ids 20–45:');
  for (const c of verify) {
    console.log(`  ${c.id} | ${c.title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());