const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const industries = await prisma.industry.findMany({
    select: { id: true, name: true, image: true }
  });
  console.log(JSON.stringify(industries, null, 2));
  await prisma.$disconnect();
}

test();
