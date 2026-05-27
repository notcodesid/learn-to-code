// Grandfathers all existing users (created before the paywall ships).
// Marks them as hasPaid=true so they keep full access.
import { prisma } from "../src/lib/prisma";

async function main() {
  const result = await prisma.user.updateMany({
    where: { hasPaid: false },
    data: { hasPaid: true, paidAt: new Date() },
  });
  console.log(`Grandfathered ${result.count} existing users.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
