import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Only load .env manually in development (Vercel injects env vars automatically in production)
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { config } = require('dotenv');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { resolve } = require('path');
  config({ path: resolve(process.cwd(), '.env') });
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}