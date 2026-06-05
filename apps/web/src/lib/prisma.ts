import { PrismaClient } from '@prisma/client';

// Prisma client singleton for Next.js (hot reload safe).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // keep defaults; tune later for production
  });

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}

