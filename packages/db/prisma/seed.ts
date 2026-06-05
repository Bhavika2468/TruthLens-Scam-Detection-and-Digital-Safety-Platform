import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Placeholder seed. Threat categories are currently a Prisma enum.
  // When/if ThreatCategory becomes a table, we will seed it here.
  console.log('Seed placeholder: threat categories are enums in schema.prisma');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

