const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAllImages() {
  console.log('=== EXPERTS ===');
  const experts = await prisma.expert.findMany({ select: { id: true, name: true, image: true } });
  console.log(JSON.stringify(experts, null, 2));

  console.log('\n=== SERVICES ===');
  const services = await prisma.service.findMany({ select: { id: true, name: true, image: true } });
  console.log(JSON.stringify(services, null, 2));

  console.log('\n=== INSIGHTS ===');
  const insights = await prisma.insight.findMany({ select: { id: true, title: true, image: true } });
  console.log(JSON.stringify(insights, null, 2));

  console.log('\n=== OFFICES ===');
  const offices = await prisma.office.findMany({ select: { id: true, name: true, image: true } });
  console.log(JSON.stringify(offices, null, 2));

  console.log('\n=== MEDIA ITEMS ===');
  const media = await prisma.mediaItem.findMany({ select: { id: true, title: true, image: true } });
  console.log(JSON.stringify(media, null, 2));

  await prisma.$disconnect();
}

checkAllImages();
