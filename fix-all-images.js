const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixAllImages() {
  // Fix Experts
  const expertUpdates = [
    { name: 'Sarah Chen', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400' },
    { name: 'Michael Rodriguez', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' }
  ];
  
  for (const update of expertUpdates) {
    await prisma.expert.updateMany({ where: { name: update.name }, data: { image: update.image } });
    console.log(`✓ Expert: ${update.name}`);
  }

  // Fix Services
  const serviceUpdates = [
    { name: 'Digital Transformation', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' },
    { name: 'Strategy & Operations', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800' }
  ];
  
  for (const update of serviceUpdates) {
    await prisma.service.updateMany({ where: { name: update.name }, data: { image: update.image } });
    console.log(`✓ Service: ${update.name}`);
  }

  // Fix Insights
  const insightUpdates = [
    { title: 'The Future of Banking: AI-Powered Customer Experience', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800' },
    { title: 'Healthcare Digital Transformation: A Comprehensive Guide', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800' }
  ];
  
  for (const update of insightUpdates) {
    await prisma.insight.updateMany({ where: { title: update.title }, data: { image: update.image } });
    console.log(`✓ Insight: ${update.title}`);
  }

  // Fix Offices
  const officeUpdates = [
    { name: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800' },
    { name: 'London', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800' }
  ];
  
  for (const update of officeUpdates) {
    await prisma.office.updateMany({ where: { name: update.name }, data: { image: update.image } });
    console.log(`✓ Office: ${update.name}`);
  }

  // Fix Media Items
  const mediaUpdates = [
    { title: 'JAS.COM Announces New AI Practice', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800' },
    { title: 'JAS.COM Named Leader in Digital Transformation', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800' }
  ];
  
  for (const update of mediaUpdates) {
    await prisma.mediaItem.updateMany({ where: { title: update.title }, data: { image: update.image } });
    console.log(`✓ Media: ${update.title}`);
  }

  console.log('\n✅ All images fixed!');
  await prisma.$disconnect();
}

fixAllImages();
