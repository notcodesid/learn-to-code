const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.ydsjbfrajtkngbylpyix:y8SbK%23%21B%2AUs2R2Y@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres",
    },
  },
});

async function main() {
  console.log("Testing connection via Session Pooler...");
  try {
    const result = await prisma.$queryRawUnsafe('SELECT 1 as result');
    console.log("✅ Connected! Query result:", result);

    const userCount = await prisma.user.count();
    console.log(`Users in DB: ${userCount}`);
  } catch (error) {
    console.error("❌ Failed:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
