const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateImages() {
  const updates = [
    { name: 'Financial Services', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800' },
    { name: 'Healthcare & Life Sciences', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800' },
    { name: 'Technology', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800' },
    { name: 'Manufacturing', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800' },
    { name: 'Energy', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800' },
    { name: 'Public Sector', image: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=800' },
    { name: 'Retail', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' },
    { name: 'Education', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800' }
  ];

  for (const update of updates) {
    await prisma.industry.updateMany({
      where: { name: update.name },
      data: { image: update.image }
    });
    console.log(`✓ Updated ${update.name}`);
  }

  console.log('✅ All images updated!');
  await prisma.$disconnect();
}

updateImages();
